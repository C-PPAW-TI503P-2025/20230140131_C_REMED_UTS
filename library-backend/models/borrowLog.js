'use strict';

module.exports = (sequelize, DataTypes) => {
    const BorrowLog = sequelize.define('BorrowLog', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        borrowDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
            validate: {
                min: -180,
                max: 180
            }
        }
    }, {
        tableName: 'borrow_logs',
        timestamps: true,
        underscored: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });

    BorrowLog.associate = function (models) {
        BorrowLog.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'cascade'
        });
        BorrowLog.belongsTo(models.Book, {
            foreignKey: 'bookId',
            as: 'book',
            onDelete: 'cascade'
        });
    };

    return BorrowLog;
};
