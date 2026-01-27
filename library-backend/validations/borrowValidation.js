const { body, validationResult } = require('express-validator');

const borrowValidation = [
    body('bookId')
        .trim()
        .notEmpty().withMessage('Book ID is required')
        .isInt({ min: 1 }).withMessage('Book ID must be a positive integer'),

    body('latitude')
        .trim()
        .notEmpty().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),

    body('longitude')
        .trim()
        .notEmpty().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    borrowValidation,
    validate
};
