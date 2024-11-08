import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/database.js'; // Ensure this path is correct

class Topic extends Model{
    public name!: string;
    public subcategory_id!: number;
}

Topic.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        subcategoryId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }

        },{
        sequelize,
        timestamps:true,
        modelName: 'topic',
    }
)
export default Topic;