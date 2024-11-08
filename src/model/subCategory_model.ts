import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/database.js'; // Ensure this path is correct

class Subcategory extends Model {
    public name!: string;
    public categoryId!: number; // This will map to category_id in the database
    subCategory: any;
    id: unknown;
}

Subcategory.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'category_id' // This tells Sequelize to map categoryId to category_id
        },
    },
    {
        sequelize,
        tableName: 'subcategory',
        timestamps: true,
    }
);

export default Subcategory;