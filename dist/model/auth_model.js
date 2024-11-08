"use strict";
// // Add this import at the top if not already present
// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from '../Config/database';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class Auth extends Model {
//     public id!: number;
//     public username?: string;
//     public email!: string;
//     public password!: string;
//     public admin!: boolean; 
//     public profile!: string;
//     public sessionId!: string | null;
//     public expiresAt!: Date; // New expiration date field
// }
// Auth.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     username: {
//         type: DataTypes.STRING(50),
//         allowNull: true,
//     },
//     email: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         unique: true,
//     },
//     password: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     admin: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//     },
//     profile: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     expiresAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from now
//     },
// }, {
//     sequelize,
//     tableName: 'auth',
//     timestamps: true,
// });
// export default Auth;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../Config/database"));
class Auth extends sequelize_1.Model {
}
Auth.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    admin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    profile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from now
        field: 'expires_at', // Map camelCase to snake_case
    },
}, {
    sequelize: database_1.default,
    tableName: 'auth',
    timestamps: true,
});
exports.default = Auth;
//# sourceMappingURL=auth_model.js.map