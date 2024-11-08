import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../Config/database';
import Auth from '../model/auth_model';
import { generateJwtToken, generateUniqueSessionId } from '../Middleware/utils';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';
const SALT_ROUNDS = 10;

class AuthController {
    // Sign up a new user

    public static async signup(req: Request, res: Response) {
        const { username, email, password, admin,profile, expiresAt, ...dynamicFields } = req.body;
    
        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
            const newUser = await Auth.create({
                username,
                email,
                password: hashedPassword,
                admin: true ,
                profile,
                expiresAt: expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days if not provided
            });

            for (const key in dynamicFields) {
                const value = dynamicFields[key];
                await sequelize.query(`UPDATE auth SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id: newUser.id },
                });
            }
    
            res.status(201).json({
                message: 'Admin registered successfully with custom expiration',
                user: newUser
            });
        } catch (error) {
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


public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const admin = await Auth.findOne({ where: { email, admin: true } });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Check if account has expired
        if (new Date(admin.expiresAt) < new Date()) {
            return res.status(403).json({ message: 'Account expired' });
        }

        const newSessionId = generateUniqueSessionId(); 
            admin.sessionId = newSessionId; 
            await admin.save();

            // Generate a JWT token or send the session ID
            const token = generateJwtToken(admin); 
        res.json({
            admin,
            message: 'Success logging in as admin',
            token,
            sessionId: newSessionId
        });
    } catch (error) {
        res.status(500).json({ message: 'Login error', error });
    }
}


public static async logout(adminId: number): Promise<void> {
    const admin = await Auth.findByPk(adminId);
    if (admin) {
        admin.sessionId = null;
        await admin.save();
    }
}

    // Get current Admin's profile
    public static async profile(req: Request, res: Response) {
        try {
            const user = await Auth.findAll();

            if (!user.length) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ user });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching profile', error });
        }
    }

    // Get a single user by ID
    public static async getUserById(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            const user = await Auth.findByPk(id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            res.json({
                message: "Success fetching user",
                user: user.toJSON()
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    }
    
    

     // Update a user's details
     public static async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { username, email, password, admin, profile, ...dynamicFields } = req.body;

        try {
            const user = await Auth.findByPk(id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update the predefined columns in the model
            const hashedPassword = password ? await bcrypt.hash(password, SALT_ROUNDS) : user.password;
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
                await sequelize.query(`UPDATE auth SET ${key} = :value WHERE id = :id`, {
                    replacements: { value, id },
                });
            }

            res.json({
                message: 'User updated successfully with dynamic columns',
                user
            });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }
    

    // Delete a user by ID
    public static async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await Auth.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await user.destroy();

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }

    
}

export default AuthController;
