"use strict";
// import express from 'express';
// import { Signup, login, FindAllUsers, FindById, updateUser, deleteById, deleteAll } from '../controller/auth_controller'; // Adjust path if needed
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// // Route for signing up a new user
// router.post('/signup',  Signup);
// // Route for logging in a user
// router.post('/login',login);
// // Route to get all users (Admin access only)
// router.get('/users', FindAllUsers);
// // Route to get a user by ID (Admin access only)
// router.get('/users/:id', FindById);
// // Route to update a user by ID (Admin or the user themselves can update)
// router.put('/users/:id', updateUser);
// // Route to delete a user by ID (Admin access only)
// router.delete('/users/:id', deleteById);
// // Route to delete all users (Admin access only)
// router.delete('/users', deleteAll);
// export default router;
// import express from 'express';
// import { Signup, login, FindAllUsers, FindById, updateUser, deleteById, deleteAll } from '../controller/auth_controller'; // Adjust path if needed
// import { RequestHandler } from 'express'; // Import RequestHandler type
// const router = express.Router();
// // Route for signing up a new user
// router.post('/signup', Signup as RequestHandler);
// // Route for logging in a user
// router.post('/login', login as RequestHandler);
// // Route to get all users (Admin access only)
// router.get('/users', FindAllUsers as RequestHandler);
// // Route to get a user by ID (Admin access only)
// router.get('/users/:id', FindById as RequestHandler);
// // Route to update a user by ID (Admin or the user themselves can update)
// router.put('/users/:id', updateUser as RequestHandler);
// // Route to delete a user by ID (Admin access only)
// router.delete('/users/:id', deleteById as RequestHandler);
// // Route to delete all users (Admin access only)
// router.delete('/users', deleteAll as RequestHandler);
// export default router;
// Import necessary libraries
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth_controller"));
const router = (0, express_1.Router)();
// Helper to handle async functions and catch errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// POST /signup - User signup
router.post('/signup', asyncHandler((req, res) => auth_controller_1.default.signup(req, res)));
// POST /login - User login
router.post('/login', asyncHandler((req, res) => auth_controller_1.default.login(req, res)));
// GET /profile - Get current user's profile (protected route)
router.get('/profile', asyncHandler((req, res) => auth_controller_1.default.profile(req, res)));
// GET /:id - Get a user by ID (protected route)
router.get('/:id', asyncHandler((req, res) => auth_controller_1.default.getUserById(req, res)));
// PUT /:id - Update a user by ID (protected route)
router.put('/:id', asyncHandler((req, res) => auth_controller_1.default.updateUser(req, res)));
// DELETE /:id - Delete a user by ID (protected route)
router.delete('/:id', asyncHandler((req, res) => auth_controller_1.default.deleteUser(req, res)));
exports.default = router;
//# sourceMappingURL=auth_routes.js.map