import { Router } from 'express';
import TaskController from '../controllers/TaskController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const tasksRouter = Router();

tasksRouter.get("/", authMiddleware, TaskController.getAll);
tasksRouter.post("/", authMiddleware, TaskController.create);
tasksRouter.put("/:taskId", authMiddleware, TaskController.update);
tasksRouter.delete("/:taskId", authMiddleware, TaskController.delete);

export default tasksRouter;