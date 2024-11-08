import { Router, Request, Response, NextFunction } from 'express';
import userController from '../controller/userController';
import upload from '../Middleware/upload';
const router = Router();

// Helper to handle async functions and catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// POST /signup - User signup
router.post('/signup', asyncHandler((req, res) => userController.signup(req, res)));
router.post('/signup', upload.single('profile'), asyncHandler((req, res) => userController.signup(req, res)));

router.post(
  '/logout',
  asyncHandler(async (req, res) => {
      const { adminId } = req.body;
      if (!adminId) {
          return res.status(400).json({ message: 'Admin ID is required for logout' });
      }
      await userController.logout(adminId);
      res.status(200).json({ message: 'Logout successful' });
  })
);

// POST /login - User login
router.post('/login', asyncHandler((req, res) => userController.login(req, res)));

// GET /profile - Get current user's profile (protected route)
router.get('/profile', asyncHandler((req, res) => userController.profile(req, res)));

// GET /:id - Get a user by ID (protected route)
router.get('/:id', asyncHandler((req, res) => userController.getUserById(req, res)));

export default router;
