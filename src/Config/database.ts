// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('learningapp', 'prince', 'luffy1812', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false,  
// });

// export default sequelize;

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('learningapp', 'prince', 'luffy1812', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,  
});

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

checkConnection();

export default sequelize;
