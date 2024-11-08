import { Request, Response } from 'express';
import sequelize from '../Config/database'; // Assuming your sequelize instance is here

class TableController {
    // Add a new column to a table
    public static async addColumn(req: Request, res: Response) {
        const { tableName, columnName, columnType } = req.body;

        try {
            // Perform a query to add a new column
            await sequelize.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType};`);
            res.status(200).json({ message: `Column '${columnName}' added to table '${tableName}'` });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add column', error });
        }
    }

    public static async updateColumn(req: Request, res: Response) {
      const { tableName, columnName, newColumnType } = req.body;

      try {
          // Perform a query to alter the column
          await sequelize.query(`ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${newColumnType};`);
          res.status(200).json({ message: `Column '${columnName}' updated to type '${newColumnType}' in table '${tableName}'` });
      } catch (error) {
          res.status(500).json({ message: 'Failed to update column', error });
      }
  }

  public static async deleteColumn(req: Request, res: Response) {
    const { tableName, columnName } = req.body;

    try {
        // Perform a query to drop the column
        await sequelize.query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName};`);
        res.status(200).json({ message: `Column '${columnName}' deleted from table '${tableName}'` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete column', error });
    }
}
}

export default TableController;

