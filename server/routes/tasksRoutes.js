import { Router } from 'express';
import TaskController from '../controllers/TaskController.js';

const tasksRouter = Router();

tasksRouter.get("/:userId", TaskController.get);
tasksRouter.post("/:userId", TaskController.create)
tasksRouter.put("/:userId/:taskId", TaskController.update)
tasksRouter.delete("/:userId/:taskId", TaskController.delete)

export default tasksRouter;