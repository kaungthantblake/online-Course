import { Router, Request, Response, NextFunction } from 'express';
import CategoryController from '../controller/category_controller';

const router = Router();

// Helper to handle async functions and catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

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

export default router;
