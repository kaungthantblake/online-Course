"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../Config/database.js")); // Ensure this path is correct
class Topic extends sequelize_1.Model {
}
Topic.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    subcategoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_js_1.default,
    timestamps: true,
    modelName: 'topic',
});
exports.default = Topic;
//# sourceMappingURL=topic_model.js.map