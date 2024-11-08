import { Router, Request, Response, NextFunction } from 'express';
import CourseController from '../controller/course_controller'; // Adjust the path as needed

const router = Router();

// Helper to handle async routes
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

// Define routes for the CourseController
router.post('/course', asyncHandler((req: Request, res: Response) => CourseController.createCourse(req, res)));
router.get('/course/:id', asyncHandler((req: Request, res: Response) => CourseController.getOneCourse(req, res)));
router.get('/courses', asyncHandler((req: Request, res: Response) => CourseController.getCourses(req, res)));
router.put('/course/:id', asyncHandler((req: Request, res: Response) => CourseController.updateCourse(req, res)));
router.delete('/course/:id', asyncHandler((req: Request, res: Response) => CourseController.deleteCourse(req, res)));
router.delete('/courses', asyncHandler((req: Request, res: Response) => CourseController.deleteAllCourses(req, res)));

export default router;
