require('dotenv').config();

const config = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'library_db',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3309,
        dialect: 'mysql',
        dialectOptions: {
            timezone: '+07:00',
        },
        logging: console.log,
        define: {
            timestamps: true,
            underscored: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3309,
        dialect: 'mysql',
        dialectOptions: {
            timezone: '+07:00',
        },
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};

module.exports = config;
