import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const usersRouter = Router();

usersRouter.post("/register", UserController.register);
usersRouter.post("/login", UserController.login);

export default usersRouter;