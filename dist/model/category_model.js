"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../Config/database.js")); // Ensure this path is correct
class Category extends sequelize_1.Model {
}
Category.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_js_1.default,
    tableName: 'categories',
    timestamps: true,
});
exports.default = Category;
//# sourceMappingURL=category_model.js.map