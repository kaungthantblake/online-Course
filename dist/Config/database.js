"use strict";
// import { Sequelize } from 'sequelize';
Object.defineProperty(exports, "__esModule", { value: true });
// const sequelize = new Sequelize('learningapp', 'prince', 'luffy1812', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false,  
// });
// export default sequelize;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('learningapp', 'prince', 'luffy1812', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});
const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
checkConnection();
exports.default = sequelize;
//# sourceMappingURL=database.js.map