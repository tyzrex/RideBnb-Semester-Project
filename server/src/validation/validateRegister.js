// Import the necessary modules
const { body, validationResult } = require('express-validator');

// Define the validation middleware
exports.validateUserDetails = [
  // Check the username
  body('username')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),

  // Check the email
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  // Check the password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  // Check the phone number
  body('phone_number')
    .isMobilePhone()
    .withMessage('Please enter a valid phone number'),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
