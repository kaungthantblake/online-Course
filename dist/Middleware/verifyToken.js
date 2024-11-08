"use strict";
// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded token data (user id, admin status) to the request
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=verifyToken.js.map