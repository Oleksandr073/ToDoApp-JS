import TaskService from '../services/TaskService.js';

class TaskController {
    getAll(req, res, next) {
        try {
            const userId = req.user.id;
            const tasks = TaskService.getAll(userId);
            res.send(tasks);
        } catch (error) {
            next(error);
        }
    }

    create(req, res, next) {
        try {
            const userId = req.user.id;
            const { body } = req;
            const task = TaskService.create(userId, body);
            res.send(task);
        } catch (error) {
            next(error);
        }
    }

    update(req, res, next) {
        try {
            const userId = req.user.id;
            const { body, params: { taskId } } = req;
            const task = TaskService.update(userId, taskId, body);
            res.send(task);
        } catch (error) {
            next(error);
        }
    }

    delete(req, res, next) {
        try {
            const userId = req.user.id;
            const { body, params: { taskId } } = req;
            const task = TaskService.delete(userId, taskId, body);
            res.send(task);
        } catch (error) {
            next(error);
        }
    }
}

export default new TaskController();