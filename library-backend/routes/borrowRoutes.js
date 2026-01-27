const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const authenticateToken = require('../middleware/authenticateToken');
const authRole = require('../middleware/authRole');
const { borrowValidation, validate } = require('../validations/borrowValidation');

// User routes
router.post('/', authenticateToken, authRole('user'), borrowValidation, validate, borrowController.borrowBook);
router.get('/my-logs', authenticateToken, authRole('user'), borrowController.getMyBorrowLogs);

// Admin routes
router.get('/', authenticateToken, authRole('admin'), borrowController.getAllBorrowLogs);

module.exports = router;
