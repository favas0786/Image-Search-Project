// server/server.js
require('dotenv').config(); // Load .env variables at the very top
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// --- Import your new config and routes ---
require('./config/passport'); // Loads passport strategies (needs to be run)
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
// We will create apiRoutes in the next step
// const apiRoutes = require('./routes/apiRoutes'); 

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors({
  origin: 'http://localhost:3000', // Allow your React app
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Session Middleware ---
// This must come BEFORE Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // In production, you'd use MongoStore to save sessions in the DB
}));

// --- Passport Middleware ---
app.use(passport.initialize());
app.use(passport.session()); // Allows persistent logins

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// --- Routes ---
app.use('/auth', authRoutes); // Mount auth routes
app.use('/api', apiRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Image Search API is running...');
});

// --- Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});