"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controller/course_controller")); // Adjust the path as needed
const router = (0, express_1.Router)();
// Helper to handle async routes
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Define routes for the CourseController
router.post('/course', asyncHandler((req, res) => course_controller_1.default.createCourse(req, res)));
router.get('/course/:id', asyncHandler((req, res) => course_controller_1.default.getOneCourse(req, res)));
router.get('/courses', asyncHandler((req, res) => course_controller_1.default.getCourses(req, res)));
router.put('/course/:id', asyncHandler((req, res) => course_controller_1.default.updateCourse(req, res)));
router.delete('/course/:id', asyncHandler((req, res) => course_controller_1.default.deleteCourse(req, res)));
router.delete('/courses', asyncHandler((req, res) => course_controller_1.default.deleteAllCourses(req, res)));
exports.default = router;
//# sourceMappingURL=course_route.js.map