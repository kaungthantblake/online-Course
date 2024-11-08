import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import sequelize from '../Config/database';
import Auth from '../model/auth_model'; // Ensure the correct path
import { generateJwtToken, generateUniqueSessionId } from '../Middleware/utils'; // Utility functions for JWT and session ID
import { emit } from 'process';

const JWT_SECRET = process.env.JWT_SECRET || 'AUTHOR';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);  // Ensure it's a valid number


class userController{
public static async signup(req: Request, res: Response) {
    const { username, email, password, admin, profile, ...dynamicFields } = req.body;

    // Log request body to confirm received data
    console.log("Request body:", req.body);

    // Check if required fields are provided and not empty
    if (!password || password.trim() === "") {
        return res.status(400).json({ message: 'Password is required' });
    }
    if (!email || email.trim() === "") {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!username || username.trim() === "") {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create user with predefined fields
        const newUser = await Auth.create({
            username,
            email,
            password: hashedPassword,
            admin: false, // Default to non-admin unless explicitly set
            profile
        });

        // Update any dynamic fields using a loop with individual updates
        for (const [key, value] of Object.entries(dynamicFields)) {
            // Make sure the key exists in the model or handle it as needed
            await Auth.update(
                { [key]: value },
                { where: { id: newUser.id } }
            );
        }

        res.status(201).json({
            message: 'User created successfully with dynamic columns',
            user: newUser,
        });
    } catch (error) {
        // Handle error
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error creating user',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Unknown error occurred',
            });
        }
    }
}

public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await Auth.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.sessionId) {
            // Optionally, log out the previous session
            await this.logout(user.id);
        }

        const newSessionId = generateUniqueSessionId(); // Implement this function to generate a unique session ID
        user.sessionId = newSessionId; // Set the new session ID
        await user.save();

        const token = generateJwtToken(user); // Implement this function to generate a JWT token

        res.json({
            user,
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

public static async logout(userId: number): Promise<void> {
    const user = await Auth.findByPk(userId);
    if (user) {
        user.sessionId = null; // Clear the session ID
        await user.save();
    }
}

// Get current user's profile
public static async profile(req: Request, res: Response) {
    try {
        // Fetch only non-admin users
        const users = await Auth.findAll({
            where: { admin: false },
        });

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }

        // Filter out sensitive fields
        const filteredUsers = users.map(user => {
            const { id, username, email, profile } = user;
            return { id, username, email, profile };
        });

        res.json({ users: filteredUsers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
}

// Get a single user by ID
public static async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const user = await Auth.findOne({
            where: { id, admin: false }, // Ensure the user is non-admin
        });

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


}
export default userController;
    