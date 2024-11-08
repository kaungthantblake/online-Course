import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/database.js'; // Ensure this path is correct


class Category extends Model{
    public name!: string;
    id: unknown;
}

Category.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }, {
    sequelize,
    tableName: 'categories',
    timestamps: true,
});

export default Category;