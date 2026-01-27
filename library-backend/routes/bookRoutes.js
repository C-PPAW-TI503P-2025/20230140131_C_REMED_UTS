const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authenticateToken = require('../middleware/authenticateToken');
const authRole = require('../middleware/authRole');
const { createBookValidation, bookValidation, validate } = require('../validations/bookValidation');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Admin routes
router.post('/', authenticateToken, authRole('admin'), createBookValidation, validate, bookController.createBook);
router.put('/:id', authenticateToken, authRole('admin'), bookValidation, validate, bookController.updateBook);
router.delete('/:id', authenticateToken, authRole('admin'), bookController.deleteBook);

module.exports = router;
