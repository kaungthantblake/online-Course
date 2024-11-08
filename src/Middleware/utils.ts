// utils.ts

import jwt from 'jsonwebtoken';

export function generateUniqueSessionId(): string {
    // Example of generating a unique session ID
    return 'session_' + new Date().getTime() + Math.random().toString(36).substring(2);
}

export function generateJwtToken(user: any): string {
    // You might want to include other user information in the JWT
    return jwt.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET || 'your_secret', { expiresIn: '1h' });
}
