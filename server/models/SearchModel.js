const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  // This links the search to a specific user in our User collection
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This 'ref' must match the model name: 'User'
    required: true,
  },
  term: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create an index to quickly find searches by user
SearchSchema.index({ user: 1 });

// Create an index to quickly find top search terms
SearchSchema.index({ term: 1 });

module.exports = mongoose.model('Search', SearchSchema);