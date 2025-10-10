const { DataTypes } = require("sequelize");
const sequelize = require("../services/db");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",   // ánh xạ tới bảng users trong DB
    timestamps: false,    // nếu bảng không có createdAt/updatedAt
});

module.exports = User;
