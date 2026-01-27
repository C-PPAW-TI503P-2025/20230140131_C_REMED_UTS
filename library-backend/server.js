require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/borrow', require('./routes/borrowRoutes'));

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Library System API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            books: '/api/books',
            borrow: '/api/borrow'
        }
    });
});

// Error handler middleware
app.use(errorHandler);

// Sync database and start server
const startServer = async () => {
    try {
        // Test database connection
        await db.sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        // Sync models (force: false untuk production)
        if (process.env.NODE_ENV === 'development') {
            await db.sequelize.sync({ alter: true });
            console.log('🔄 Database synchronized.');
        }

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error);
        process.exit(1);
    }
};

startServer();
