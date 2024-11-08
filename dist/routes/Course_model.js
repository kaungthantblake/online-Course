"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth_controller"));
const category_controller_1 = __importDefault(require("../controller/category_controller"));
const course_controller_1 = __importDefault(require("../controller/course_controller"));
const subcategory_controller_1 = __importDefault(require("../controller/subcategory_controller"));
const topic_controller_1 = __importDefault(require("../controller/topic_controller"));
const router = (0, express_1.Router)();
// Async handler utility to catch errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// ------------------------- Auth Routes -------------------------
// POST /signup - User signup
router.post('/signup', asyncHandler((req, res) => auth_controller_1.default.signup(req, res)));
// POST /login - User login
router.post('/login', asyncHandler((req, res) => auth_controller_1.default.login(req, res)));
// GET /profile - Get current user's profile (protected route)
router.get('/profile', asyncHandler((req, res) => auth_controller_1.default.profile(req, res)));
// GET /:id - Get a user by ID (protected route)
router.get('/user/:id', asyncHandler((req, res) => auth_controller_1.default.getUserById(req, res)));
// PUT /:id - Update a user by ID (protected route)
router.put('/user/:id', asyncHandler((req, res) => auth_controller_1.default.updateUser(req, res)));
// DELETE /:id - Delete a user by ID (protected route)
router.delete('/user/:id', asyncHandler((req, res) => auth_controller_1.default.deleteUser(req, res)));
// ------------------------- Category Routes -------------------------
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
// ------------------------- Course Routes -------------------------
// POST /course - Create a new course
router.post('/course', asyncHandler((req, res) => course_controller_1.default.createCourse(req, res)));
// GET /course/:id - Get a course by ID
router.get('/course/:id', asyncHandler((req, res) => course_controller_1.default.getOneCourse(req, res)));
// GET /courses - Get all courses
router.get('/courses', asyncHandler((req, res) => course_controller_1.default.getCourses(req, res)));
// PUT /course/:id - Update a course by ID
router.put('/course/:id', asyncHandler((req, res) => course_controller_1.default.updateCourse(req, res)));
// DELETE /course/:id - Delete a course by ID
router.delete('/course/:id', asyncHandler((req, res) => course_controller_1.default.deleteCourse(req, res)));
// DELETE /courses - Delete all courses
router.delete('/courses', asyncHandler((req, res) => course_controller_1.default.deleteAllCourses(req, res)));
// ------------------------- Subcategory Routes -------------------------
// POST /sub - Create a new subcategory
router.post('/sub', asyncHandler((req, res) => subcategory_controller_1.default.CreateSubCategory(req, res)));
// GET /sub/:id - Get a subcategory by ID
router.get('/sub/:id', asyncHandler((req, res) => subcategory_controller_1.default.GetOneSubCategory(req, res)));
// GET /subGet - Get all subcategories
router.get('/subGet', asyncHandler((req, res) => subcategory_controller_1.default.GetSubCategory(req, res)));
// PUT /sub/:id - Update a subcategory by ID
router.put('/sub/:id', asyncHandler((req, res) => subcategory_controller_1.default.UpdateSubCategory(req, res)));
// DELETE /sub/:id - Delete a subcategory by ID
router.delete('/sub/:id', asyncHandler((req, res) => subcategory_controller_1.default.DeleteSubCategory(req, res)));
// DELETE /sub - Delete all subcategories
router.delete('/sub', asyncHandler((req, res) => subcategory_controller_1.default.DeleteAllSubCategory(req, res)));
// ------------------------- Topic Routes -------------------------
// POST /topic - Create a new topic
router.post('/topic', asyncHandler((req, res) => topic_controller_1.default.CreateTopic(req, res)));
// GET /topic/:id - Get a topic by ID
router.get('/topic/:id', asyncHandler((req, res) => topic_controller_1.default.GetOneTopic(req, res)));
// GET /topicGet - Get all topics
router.get('/topicGet', asyncHandler((req, res) => topic_controller_1.default.GetTopic(req, res)));
// PUT /topic/:id - Update a topic by ID
router.put('/topic/:id', asyncHandler((req, res) => topic_controller_1.default.UpdateTopic(req, res)));
// DELETE /topic/:id - Delete a topic by ID
router.delete('/topic/:id', asyncHandler((req, res) => topic_controller_1.default.DeleteTopic(req, res)));
// DELETE /topic - Delete all topics
router.delete('/topic', asyncHandler((req, res) => topic_controller_1.default.DeleteAllTopic(req, res)));
exports.default = router;
//# sourceMappingURL=Course_model.js.map