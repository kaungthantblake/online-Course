"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../Config/database")); // Assuming your sequelize instance is here
class TableController {
    // Add a new column to a table
    static async addColumn(req, res) {
        const { tableName, columnName, columnType } = req.body;
        try {
            // Perform a query to add a new column
            await database_1.default.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType};`);
            res.status(200).json({ message: `Column '${columnName}' added to table '${tableName}'` });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to add column', error });
        }
    }
    static async updateColumn(req, res) {
        const { tableName, columnName, newColumnType } = req.body;
        try {
            // Perform a query to alter the column
            await database_1.default.query(`ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${newColumnType};`);
            res.status(200).json({ message: `Column '${columnName}' updated to type '${newColumnType}' in table '${tableName}'` });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to update column', error });
        }
    }
    static async deleteColumn(req, res) {
        const { tableName, columnName } = req.body;
        try {
            // Perform a query to drop the column
            await database_1.default.query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName};`);
            res.status(200).json({ message: `Column '${columnName}' deleted from table '${tableName}'` });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to delete column', error });
        }
    }
}
exports.default = TableController;
//# sourceMappingURL=columnsController.js.map