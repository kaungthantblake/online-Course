"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const columnsController_1 = __importDefault(require("../controller/columnsController"));
const router = (0, express_1.Router)();
// Helper to handle async functions and catch errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// POST /signup - User signup
router.post('/add', asyncHandler((req, res) => columnsController_1.default.addColumn(req, res)));
// PUT /:id - Update a user by ID (protected route)
router.put('/update', asyncHandler((req, res) => columnsController_1.default.updateColumn(req, res)));
// DELETE /:id - Delete a user by ID (protected route)
router.delete('/delete', asyncHandler((req, res) => columnsController_1.default.deleteColumn(req, res)));
exports.default = router;
//# sourceMappingURL=authEditor_route.js.map