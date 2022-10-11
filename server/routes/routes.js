import { json } from "express";
import tasksRoutes from './tasksRoutes.js';
import usersRoutes from './usersRoutes.js';

const routes = app => {
    app.use(json());
    app.use('/api/tasks', tasksRoutes);
    app.use('/api/users', usersRoutes);
}

export default routes;