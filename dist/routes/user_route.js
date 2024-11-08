"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const upload_1 = __importDefault(require("../Middleware/upload"));
const router = (0, express_1.Router)();
// Helper to handle async functions and catch errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// POST /signup - User signup
router.post('/signup', asyncHandler((req, res) => userController_1.default.signup(req, res)));
router.post('/signup', upload_1.default.single('profile'), asyncHandler((req, res) => userController_1.default.signup(req, res)));
router.post('/logout', asyncHandler(async (req, res) => {
    const { adminId } = req.body;
    if (!adminId) {
        return res.status(400).json({ message: 'Admin ID is required for logout' });
    }
    await userController_1.default.logout(adminId);
    res.status(200).json({ message: 'Logout successful' });
}));
// POST /login - User login
router.post('/login', asyncHandler((req, res) => userController_1.default.login(req, res)));
// GET /profile - Get current user's profile (protected route)
router.get('/profile', asyncHandler((req, res) => userController_1.default.profile(req, res)));
// GET /:id - Get a user by ID (protected route)
router.get('/:id', asyncHandler((req, res) => userController_1.default.getUserById(req, res)));
exports.default = router;
//# sourceMappingURL=user_route.js.map