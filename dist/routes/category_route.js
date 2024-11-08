"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controller/category_controller"));
const router = (0, express_1.Router)();
// Helper to handle async functions and catch errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// POST /category - Create a new category
router.post('/category', asyncHandler((req, res) => category_controller_1.default.createCategory(req, res)));
// GET /category - Get all categories
router.get('/category', asyncHandler((req, res) => category_controller_1.default.GetCategory(req, res)));
// GET /category/:id - Get a category by ID
router.get('/category/:id', asyncHandler((req, res) => category_controller_1.default.GetOneCategory(req, res)));
// PUT /category/:id - Update a category by ID
router.put('/category/:id', asyncHandler((req, res) => category_controller_1.default.updateCategory(req, res)));
// DELETE /category/:id - Delete a category by ID
router.delete('/category/:id', asyncHandler((req, res) => category_controller_1.default.deleteCategory(req, res)));
// DELETE /category - Delete all categories
router.delete('/category', asyncHandler((req, res) => category_controller_1.default.DeleteAllCategory(req, res)));
exports.default = router;
//# sourceMappingURL=category_route.js.map