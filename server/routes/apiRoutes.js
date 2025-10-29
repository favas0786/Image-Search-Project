const router = require('express').Router();
const { createApi } = require('unsplash-js');
const Search = require('../models/SearchModel');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Initialize Unsplash API
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

// --- PROTECTED ROUTES ---
// All routes in this file will require a user to be logged in
// We apply our middleware at the router level
router.use(ensureAuthenticated);

/**
 * @route   POST /api/search
 * @desc    Search for images
 * @access  Private
 */
router.post('/search', async (req, res) => {
  const { term } = req.body;
  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    // 1. Save the search to our database
    const newSearch = new Search({
      user: req.user._id, // req.user is available thanks to Passport
      term: term.toLowerCase(),
    });
    await newSearch.save();

    // 2. Call the Unsplash API
    const result = await unsplash.search.getPhotos({
      query: term,
      page: 1,
      perPage: 20,
    });

    if (result.errors) {
      return res.status(500).json({ message: 'Unsplash API error' });
    }

    const images = result.response.results.map(img => ({
      id: img.id,
      url: img.urls.regular,
      description: img.alt_description,
    }));

    res.status(200).json({
      term: term,
      count: images.length,
      images: images,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/history
 * @desc    Get the current user's search history
 * @access  Private
 */
router.get('/history', async (req, res) => {
  try {
    const history = await Search.find({ user: req.user._id })
      .sort({ timestamp: -1 }) // Sort by newest first
      .limit(10); // Get last 10 searches
    
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/top-searches
 * @desc    Get top 5 most frequent searches across all users
 * @access  Private
 */
router.get('/top-searches', async (req, res) => {
  try {
    // This is a MongoDB Aggregation Pipeline
    const topSearches = await Search.aggregate([
      // 1. Group documents by the 'term' field and count occurrences
      { $group: {
          _id: '$term', // Group by the search term
          count: { $sum: 1 } // Count how many times each term appears
      }},
      // 2. Sort the results by count in descending order
      { $sort: { count: -1 } },
      // 3. Limit the output to the top 5
      { $limit: 5 }
    ]);

    // Rename '_id' to 'term' for a cleaner API response
    const formattedSearches = topSearches.map(s => ({
      term: s._id,
      count: s.count
    }));

    res.status(200).json(formattedSearches);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;