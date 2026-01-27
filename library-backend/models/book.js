'use strict';

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 255]
            }
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 255]
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    }, {
        tableName: 'books',
        timestamps: true,
        underscored: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });

    Book.associate = function (models) {
        Book.hasMany(models.BorrowLog, {
            foreignKey: 'bookId',
            as: 'borrowLogs',
            onDelete: 'cascade'
        });
    };

    return Book;
};
