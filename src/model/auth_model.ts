// // Add this import at the top if not already present
// import { DataTypes, Model, Optional } from 'sequelize';
// import sequelize from '../Config/database';

// class Auth extends Model {
//     public id!: number;
//     public username?: string;
//     public email!: string;
//     public password!: string;
//     public admin!: boolean; 
//     public profile!: string;
//     public sessionId!: string | null;
//     public expiresAt!: Date; // New expiration date field
// }

// Auth.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     username: {
//         type: DataTypes.STRING(50),
//         allowNull: true,
//     },
//     email: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         unique: true,
//     },
//     password: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     admin: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//     },
//     profile: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     expiresAt: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from now
//     },
// }, {
//     sequelize,
//     tableName: 'auth',
//     timestamps: true,
// });

// export default Auth;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../Config/database';

class Auth extends Model {
    public id!: number;
    public username?: string;
    public email!: string;
    public password!: string;
    public admin!: boolean; 
    public profile!: string;
    public sessionId!: string | null;
    public expiresAt!: Date; // New expiration date field
}

Auth.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    profile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from now
        field: 'expires_at', // Map camelCase to snake_case
    },
}, {
    sequelize,
    tableName: 'auth',
    timestamps: true,
});

export default Auth;
