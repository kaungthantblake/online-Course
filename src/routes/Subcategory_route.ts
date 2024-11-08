import { Router, Request, Response, NextFunction } from 'express';
import SubcategoryController from '../controller/subcategory_controller';

const router = Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
    };

router.post('/sub', asyncHandler((req: Request, res: Response) => SubcategoryController.CreateSubCategory(req, res)));
router.get('/sub/:id',asyncHandler((req: Request, res: Response) => SubcategoryController.GetOneSubCategory(req, res)))
router.get('/subGet',asyncHandler((req: Request, res: Response) => SubcategoryController.GetSubCategory(req, res))) 
router.put('/sub/:id',asyncHandler((req: Request, res: Response) => SubcategoryController.UpdateSubCategory(req, res)))
router.delete('/sub/:id',asyncHandler((req: Request, res: Response) => SubcategoryController.DeleteSubCategory(req, res)))
router.delete('/sub',asyncHandler((req: Request, res: Response) => SubcategoryController.DeleteAllSubCategory(req, res)))

export default router;



