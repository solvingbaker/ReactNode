const { body, validationResult } = require('express-validator');

const validateTask = [
  body('text').notEmpty().withMessage('Task text is required'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean value'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateTask;