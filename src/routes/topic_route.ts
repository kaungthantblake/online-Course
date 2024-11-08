import { Router, Request, Response, NextFunction } from 'express';
import TopicController from '../controller/topic_controller';

const router = Router();

// Async handler utility to catch errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
    };

// Routes for TopicController
router.post('/topic', asyncHandler((req: Request, res: Response) => TopicController.CreateTopic(req, res)));
router.get('/topic/:id', asyncHandler((req: Request, res: Response) => TopicController.GetOneTopic(req, res)));
router.get('/topicGet', asyncHandler((req: Request, res: Response) => TopicController.GetTopic(req, res))); // Get all topics
router.put('/topic/:id', asyncHandler((req: Request, res: Response) => TopicController.UpdateTopic(req, res)));
router.delete('/topic/:id', asyncHandler((req: Request, res: Response) => TopicController.DeleteTopic(req, res)));
router.delete('/topic', asyncHandler((req: Request, res: Response) => TopicController.DeleteAllTopic(req, res)));

export default router;
