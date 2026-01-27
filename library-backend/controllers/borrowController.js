const db = require('../models');
const Book = db.Book;
const BorrowLog = db.BorrowLog;

const borrowBook = async (req, res, next) => {
    try {
        const { bookId, latitude, longitude } = req.body;
        const userId = req.user.id;

        // Find book by ID
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        // Check stock availability
        if (book.stock <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Book out of stock'
            });
        }

        // Start transaction
        const transaction = await db.sequelize.transaction();

        try {
            // Decrease stock
            book.stock -= 1;
            await book.save({ transaction });

            // Create borrow log
            const borrowLog = await BorrowLog.create({
                userId: userId,
                bookId: bookId,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                borrowDate: new Date()
            }, { transaction });

            // Commit transaction
            await transaction.commit();

            res.status(201).json({
                success: true,
                message: 'Book borrowed successfully',
                data: {
                    id: borrowLog.id,
                    bookId: borrowLog.bookId,
                    borrowDate: borrowLog.borrowDate,
                    latitude: borrowLog.latitude,
                    longitude: borrowLog.longitude
                }
            });
        } catch (error) {
            // Rollback transaction on error
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

const getMyBorrowLogs = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.user.id;

        const offset = (page - 1) * limit;

        const { count, rows } = await BorrowLog.findAndCountAll({
            where: { userId: userId },
            include: [
                {
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'title', 'author']
                }
            ],
            order: [['borrowDate', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

const getAllBorrowLogs = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        const { count, rows } = await BorrowLog.findAndCountAll({
            include: [
                {
                    model: Book,
                    as: 'book',
                    attributes: ['id', 'title', 'author']
                },
                {
                    model: db.User,
                    as: 'user',
                    attributes: ['id', 'username', 'email']
                }
            ],
            order: [['borrowDate', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    borrowBook,
    getMyBorrowLogs,
    getAllBorrowLogs
};
