"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../Config/database"));
const auth_model_1 = __importDefault(require("../model/auth_model"));
const utils_1 = require("../Middleware/utils");
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';
const SALT_ROUNDS = 10;
class AuthController {
    // Sign up a new user
    static async signup(req, res) {
        const { username, email, password, admin, profile, expiresAt, ...dynamicFields } = req.body;
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUNDS);
            const newUser = await auth_model_1.default.create({
                username,
                email,
                password: hashedPassword,
                admin: true,
                profile,
                expiresAt: expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days if not provided
            });
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await database_1.default.query(`UPDATE auth SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: newUser.id },
                });
            }
            res.status(201).json({
                message: 'Admin registered successfully with custom expiration',
                user: newUser
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error registering admin', error });
        }
    }
    // Login an existing user
    // public static async login(req: Request, res: Response) {
    //     const { email, password } = req.body;
    //     try {
    //         const admin = await Auth.findOne({ where: { email, admin: true } });
    //         if (!admin) {
    //             return res.status(404).json({ message: 'admin not found' });
    //         }
    //         if(admin.sessionId){
    //             await this.logout(admin.id);
    //         }
    //         if (admin.password !== password) {
    //             return res.status(404).json({ message: 'wrong password try again' });
    //         }
    //         const isPasswordValid = await bcrypt.compare(password, admin.password);
    //         if (!isPasswordValid) {
    //             return res.status(401).json({ message: 'Invalid credentials' });
    //         }
    //         const newSessionId = generateUniqueSessionId(); 
    //             admin.sessionId = newSessionId; 
    //             await admin.save();
    //             // Generate a JWT token or send the session ID
    //             const token = generateJwtToken(admin); 
    //         res.json({
    //             admin,
    //             message: ' Success Logging in as a admin ',
    //             token,
    //             sessionId: newSessionId 
    //         });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error Something went wrong', error });
    //     }
    // }
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const admin = await auth_model_1.default.findOne({ where: { email, admin: true } });
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            // Check if account has expired
            if (new Date(admin.expiresAt) < new Date()) {
                return res.status(403).json({ message: 'Account expired' });
            }
            const newSessionId = (0, utils_1.generateUniqueSessionId)();
            admin.sessionId = newSessionId;
            await admin.save();
            // Generate a JWT token or send the session ID
            const token = (0, utils_1.generateJwtToken)(admin);
            res.json({
                admin,
                message: 'Success logging in as admin',
                token,
                sessionId: newSessionId
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Login error', error });
        }
    }
    static async logout(adminId) {
        const admin = await auth_model_1.default.findByPk(adminId);
        if (admin) {
            admin.sessionId = null;
            await admin.save();
        }
    }
    // Get current Admin's profile
    static async profile(req, res) {
        try {
            const user = await auth_model_1.default.findAll();
            if (!user.length) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ user });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching profile', error });
        }
    }
    // Get a single user by ID
    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await auth_model_1.default.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({
                message: "Success fetching user",
                user: user.toJSON()
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    }
    // Update a user's details
    static async updateUser(req, res) {
        const { id } = req.params;
        const { username, email, password, admin, profile, ...dynamicFields } = req.body;
        try {
            const user = await auth_model_1.default.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Update the predefined columns in the model
            const hashedPassword = password ? await bcrypt_1.default.hash(password, SALT_ROUNDS) : user.password;
            user.username = username || user.username;
            user.email = email || user.email;
            user.password = hashedPassword;
            user.admin = admin !== undefined ? admin : user.admin;
            user.profile = profile || user.profile;
            await user.save();
            // Handle dynamic fields (columns that are not in the model)
            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                // Use raw query to update the dynamic column
                await database_1.default.query(`UPDATE auth SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id },
                });
            }
            res.json({
                message: 'User updated successfully with dynamic columns',
                user
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }
    // Delete a user by ID
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await auth_model_1.default.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await user.destroy();
            res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth_controller.js.map