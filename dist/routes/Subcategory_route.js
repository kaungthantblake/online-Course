"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategory_controller_1 = __importDefault(require("../controller/subcategory_controller"));
const router = (0, express_1.Router)();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.post('/sub', asyncHandler((req, res) => subcategory_controller_1.default.CreateSubCategory(req, res)));
router.get('/sub/:id', asyncHandler((req, res) => subcategory_controller_1.default.GetOneSubCategory(req, res)));
router.get('/subGet', asyncHandler((req, res) => subcategory_controller_1.default.GetSubCategory(req, res)));
router.put('/sub/:id', asyncHandler((req, res) => subcategory_controller_1.default.UpdateSubCategory(req, res)));
router.delete('/sub/:id', asyncHandler((req, res) => subcategory_controller_1.default.DeleteSubCategory(req, res)));
router.delete('/sub', asyncHandler((req, res) => subcategory_controller_1.default.DeleteAllSubCategory(req, res)));
exports.default = router;
//# sourceMappingURL=Subcategory_route.js.map