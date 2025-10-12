const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/calculate', (req, res) => {
  const { income1, income2 } = req.body;

  // Validate inputs
  const errors = [];

  // Check if inputs exist
  if (!income1 || income1.trim() === '') {
    errors.push('Income Source 1 is required');
  }
  if (!income2 || income2.trim() === '') {
    errors.push('Income Source 2 is required');
  }

  // Convert to numbers
  const num1 = parseFloat(income1);
  const num2 = parseFloat(income2);

  // Validate that inputs are valid numbers
  if (income1 && isNaN(num1)) {
    errors.push('Income Source 1 must be a valid number');
  }
  if (income2 && isNaN(num2)) {
    errors.push('Income Source 2 must be a valid number');
  }

  // Validate that numbers are not negative
  if (!isNaN(num1) && num1 < 0) {
    errors.push('Income Source 1 cannot be negative');
  }
  if (!isNaN(num2) && num2 < 0) {
    errors.push('Income Source 2 cannot be negative');
  }

  // If there are validation errors, re-render form with errors
  if (errors.length > 0) {
    return res.render('index', { error: errors.join('. ') });
  }

  // Calculate total income (server-side calculation)
  const totalIncome = num1 + num2;

  // Render result page
  res.render('result', {
    income1: num1.toFixed(2),
    income2: num2.toFixed(2),
    totalIncome: totalIncome.toFixed(2)
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});