const { body, validationResult } = require('express-validator');

const bookValidation = [
    body('title')
        .optional()
        .trim()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),

    body('author')
        .optional()
        .trim()
        .notEmpty().withMessage('Author cannot be empty')
        .isLength({ min: 3 }).withMessage('Author must be at least 3 characters'),

    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];

const createBookValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),

    body('author')
        .trim()
        .notEmpty().withMessage('Author is required')
        .isLength({ min: 3 }).withMessage('Author must be at least 3 characters'),

    body('stock')
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
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
    bookValidation,
    createBookValidation,
    validate
};
