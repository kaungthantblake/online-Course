import { Router, Request, Response, NextFunction } from 'express';
import columnController from '../controller/columnsController';

const router = Router();

// Helper to handle async functions and catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


// POST /signup - User signup
router.post('/add', asyncHandler((req, res) => columnController.addColumn(req, res)));

// PUT /:id - Update a user by ID (protected route)
router.put('/update', asyncHandler((req, res) => columnController.updateColumn(req, res)));

// DELETE /:id - Delete a user by ID (protected route)
router.delete('/delete', asyncHandler((req, res) => columnController.deleteColumn(req, res)));

export default router;
