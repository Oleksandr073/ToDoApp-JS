import TaskService from '../services/TaskService.js';

class TaskController {
    getAll(req, res) {
        try {
            console.log('try');
            const { params: { userId } } = req;
            const tasks = TaskService.getAll(userId);
            console.log('tc', tasks);
            res.send(tasks);
        } catch (error) {
            console.log('error', error);
            res.status(500).json(error.message);
        }
    }

    create(req, res) {
        try {
            const { body, params: { userId } } = req;
            const task = TaskService.create(userId, body);
            res.send(task);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    update(req, res) {
        try {
            const { body, params: { userId, taskId } } = req;
            const task = TaskService.update(userId, taskId, body);
            res.send(task);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    delete(req, res) {
        try {
            const { body, params: { userId, taskId } } = req;
            const task = TaskService.delete(userId, taskId, body);
            res.send(task);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

export default new TaskController();