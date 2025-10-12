const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'library-secret-key-2024', // Change this to a secure random string in production
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes

// Home page
app.get('/', (req, res) => {
  res.render('home', { user: req.session.user || null });
});

// Login page
app.get('/login', (req, res) => {
  // If already logged in, redirect to profile
  if (req.session.user) {
    return res.redirect('/profile');
  }
  res.render('login', { error: null });
});

// Handle login
app.post('/login', (req, res) => {
  const { username, email } = req.body;

  // Validate inputs
  if (!username || username.trim() === '') {
    return res.render('login', { error: 'Username is required' });
  }

  if (!email || email.trim() === '') {
    return res.render('login', { error: 'Email is required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.render('login', { error: 'Please enter a valid email address' });
  }

  // Create session
  const loginTime = new Date();
  req.session.user = {
    username: username.trim(),
    email: email.trim(),
    loginTime: loginTime.toLocaleString(),
    loginTimestamp: loginTime.getTime()
  };

  // Redirect to profile
  res.redirect('/profile');
});

// Profile page (protected route)
app.get('/profile', isAuthenticated, (req, res) => {
  // Calculate session duration
  const currentTime = new Date().getTime();
  const sessionDuration = Math.floor((currentTime - req.session.user.loginTimestamp) / 1000 / 60); // in minutes

  res.render('profile', { 
    user: req.session.user,
    sessionDuration: sessionDuration,
    sessionId: req.sessionID.substring(0, 8) // Show first 8 characters of session ID
  });
});

// Logout
app.get('/logout', (req, res) => {
  const username = req.session.user ? req.session.user.username : 'User';
  
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.redirect('/profile');
    }
    
    // Clear cookie
    res.clearCookie('connect.sid');
    
    // Redirect to home with logout message
    res.redirect('/?logout=true&username=' + encodeURIComponent(username));
  });
});

// Handle logout confirmation on home page
app.get('/', (req, res) => {
  const loggedOut = req.query.logout === 'true';
  const username = req.query.username || '';
  
  res.render('home', { 
    user: req.session.user || null,
    loggedOut: loggedOut,
    logoutUsername: username
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Library Portal running on http://localhost:${PORT}`);
  console.log('Session management active');
});