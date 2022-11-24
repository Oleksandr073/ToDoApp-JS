import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const usersRouter = Router();

usersRouter.post("/register", UserController.register);
usersRouter.post("/login", UserController.login);
usersRouter.get("/logout", UserController.logout);
usersRouter.post("/update", UserController.update);
usersRouter.get("/refresh", UserController.refresh);

export default usersRouter;