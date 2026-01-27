const db = require('../models');
const Book = db.Book;

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll({
            attributes: ['id', 'title', 'author', 'stock', 'createdAt', 'updatedAt']
        });

        res.json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        next(error);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id, {
            attributes: ['id', 'title', 'author', 'stock', 'createdAt', 'updatedAt']
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.json({
            success: true,
            data: book
        });
    } catch (error) {
        next(error);
    }
};

const createBook = async (req, res, next) => {
    try {
        const { title, author, stock } = req.body;

        const book = await Book.create({
            title,
            author,
            stock: parseInt(stock)
        });

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author, stock } = req.body;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        // Update fields if provided
        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (stock !== undefined) book.stock = parseInt(stock);

        await book.save();

        res.json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        await book.destroy();

        res.json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
