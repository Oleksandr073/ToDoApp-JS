import tasksRoutes from './tasksRoutes.js';
import usersRoutes from './usersRoutes.js';

const routes = app => {
    app.use('/api/tasks', tasksRoutes);
    app.use('/api/users', usersRoutes);
}

export default routes;