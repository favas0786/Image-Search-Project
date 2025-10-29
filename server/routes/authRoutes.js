const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:3000'; // Your React app URL

// --- Google Auth ---
// When user clicks "Login with Google", they are sent to this route
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL, // Redirect to React app on success
    failureRedirect: CLIENT_URL + '/login/failed'
  })
);

// --- GitHub Auth ---
router.get('/github',
  passport.authenticate('github', { scope: ['read:user', 'user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL + '/login/failed'
  })
);

// --- Facebook Auth ---
router.get('/facebook',
  passport.authenticate('facebook')
);

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL + '/login/failed'
  })
);

// --- General Auth Routes ---

// Route to check if user is logged in
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'User authenticated',
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'User not authenticated'
    });
  }
});

// Route for failed login
router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login failure'
  });
});

// Route for logging out
router.get('/logout', (req, res) => {
  req.logout((err) => { // req.logout() is now async
    if (err) { return next(err); }
    res.redirect(CLIENT_URL); // Redirect to client
  });
});

module.exports = router;