import { Router, Request, Response, NextFunction } from 'express';
import AuthController from '../controller/auth_controller';
import CategoryController from '../controller/category_controller';
import CourseController from '../controller/course_controller';
import SubcategoryController from '../controller/subcategory_controller';
import TopicController from '../controller/topic_controller';

const router = Router();

// Async handler utility to catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// ------------------------- Auth Routes -------------------------

// POST /signup - User signup
router.post('/signup', asyncHandler((req, res) => AuthController.signup(req, res)));

// POST /login - User login
router.post('/login', asyncHandler((req, res) => AuthController.login(req, res)));

// GET /profile - Get current user's profile (protected route)
router.get('/profile', asyncHandler((req, res) => AuthController.profile(req, res)));

// GET /:id - Get a user by ID (protected route)
router.get('/user/:id', asyncHandler((req, res) => AuthController.getUserById(req, res)));

// PUT /:id - Update a user by ID (protected route)
router.put('/user/:id', asyncHandler((req, res) => AuthController.updateUser(req, res)));

// DELETE /:id - Delete a user by ID (protected route)
router.delete('/user/:id', asyncHandler((req, res) => AuthController.deleteUser(req, res)));

// ------------------------- Category Routes -------------------------

// POST /category - Create a new category
router.post('/category', asyncHandler((req: Request, res: Response) => CategoryController.createCategory(req, res)));

// GET /category - Get all categories
router.get('/category', asyncHandler((req: Request, res: Response) => CategoryController.GetCategory(req, res)));

// GET /category/:id - Get a category by ID
router.get('/category/:id', asyncHandler((req: Request, res: Response) => CategoryController.GetOneCategory(req, res)));

// PUT /category/:id - Update a category by ID
router.put('/category/:id', asyncHandler((req: Request, res: Response) => CategoryController.updateCategory(req, res)));

// DELETE /category/:id - Delete a category by ID
router.delete('/category/:id', asyncHandler((req: Request, res: Response) => CategoryController.deleteCategory(req, res)));

// DELETE /category - Delete all categories
router.delete('/category', asyncHandler((req: Request, res: Response) => CategoryController.DeleteAllCategory(req, res)));

// ------------------------- Course Routes -------------------------

// POST /course - Create a new course
router.post('/course', asyncHandler((req: Request, res: Response) => CourseController.createCourse(req, res)));

// GET /course/:id - Get a course by ID
router.get('/course/:id', asyncHandler((req: Request, res: Response) => CourseController.getOneCourse(req, res)));

// GET /courses - Get all courses
router.get('/courses', asyncHandler((req: Request, res: Response) => CourseController.getCourses(req, res)));

// PUT /course/:id - Update a course by ID
router.put('/course/:id', asyncHandler((req: Request, res: Response) => CourseController.updateCourse(req, res)));

// DELETE /course/:id - Delete a course by ID
router.delete('/course/:id', asyncHandler((req: Request, res: Response) => CourseController.deleteCourse(req, res)));

// DELETE /courses - Delete all courses
router.delete('/courses', asyncHandler((req: Request, res: Response) => CourseController.deleteAllCourses(req, res)));

// ------------------------- Subcategory Routes -------------------------

// POST /sub - Create a new subcategory
router.post('/sub', asyncHandler((req: Request, res: Response) => SubcategoryController.CreateSubCategory(req, res)));

// GET /sub/:id - Get a subcategory by ID
router.get('/sub/:id', asyncHandler((req: Request, res: Response) => SubcategoryController.GetOneSubCategory(req, res)));

// GET /subGet - Get all subcategories
router.get('/subGet', asyncHandler((req: Request, res: Response) => SubcategoryController.GetSubCategory(req, res)));

// PUT /sub/:id - Update a subcategory by ID
router.put('/sub/:id', asyncHandler((req: Request, res: Response) => SubcategoryController.UpdateSubCategory(req, res)));

// DELETE /sub/:id - Delete a subcategory by ID
router.delete('/sub/:id', asyncHandler((req: Request, res: Response) => SubcategoryController.DeleteSubCategory(req, res)));

// DELETE /sub - Delete all subcategories
router.delete('/sub', asyncHandler((req: Request, res: Response) => SubcategoryController.DeleteAllSubCategory(req, res)));

// ------------------------- Topic Routes -------------------------

// POST /topic - Create a new topic
router.post('/topic', asyncHandler((req: Request, res: Response) => TopicController.CreateTopic(req, res)));

// GET /topic/:id - Get a topic by ID
router.get('/topic/:id', asyncHandler((req: Request, res: Response) => TopicController.GetOneTopic(req, res)));

// GET /topicGet - Get all topics
router.get('/topicGet', asyncHandler((req: Request, res: Response) => TopicController.GetTopic(req, res)));

// PUT /topic/:id - Update a topic by ID
router.put('/topic/:id', asyncHandler((req: Request, res: Response) => TopicController.UpdateTopic(req, res)));

// DELETE /topic/:id - Delete a topic by ID
router.delete('/topic/:id', asyncHandler((req: Request, res: Response) => TopicController.DeleteTopic(req, res)));

// DELETE /topic - Delete all topics
router.delete('/topic', asyncHandler((req: Request, res: Response) => TopicController.DeleteAllTopic(req, res)));

export default router;
