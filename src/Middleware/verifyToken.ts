// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// const jwtSecret = 'Sweets';

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).json({ error: 'Access denied. Token is required.' });
//     }

//     jwt.verify(token.split(' ')[1], jwtSecret, (err: jwt.VerifyErrors | null, decoded: any) => {
//         if (err) {
//             return res.status(401).json({ error: 'Access denied. Invalid token.' });
//         }
//         req.user = decoded; // Attach decoded user information to request object
//         next();
//     });
// };

// export default verifyToken;


// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//         req.user = decoded as { id: number; admin: boolean }; // Extend the Request type with user
//         next(); // Ensure next() is called to pass control
//     } catch (err) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// export default authMiddleware;
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; admin: boolean };

        req.user = decoded; // Attach the decoded token data (user id, admin status) to the request

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;
