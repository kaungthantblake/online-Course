"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../Config/database.js")); // Ensure this path is correct
class Subcategory extends sequelize_1.Model {
}
Subcategory.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id' // This tells Sequelize to map categoryId to category_id
    },
}, {
    sequelize: database_js_1.default,
    tableName: 'subcategory',
    timestamps: true,
});
exports.default = Subcategory;
//# sourceMappingURL=subCategory_model.js.map