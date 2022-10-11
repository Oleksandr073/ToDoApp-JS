import TasksRepository from '../repositories/TasksRepository.js';

class TaskService {
    getAll(userId) {
        const tasks = TasksRepository.getAll(userId);
        if (!tasks) {
            throw ApiError.BadRequest('Failed to get tasks');
        }
        return tasks;
    }

    create(userId, body) {
        const task = TasksRepository.create(userId, body);
        if (!task) {
            throw ApiError.BadRequest('Failed to create task');
        }
        return task;
    }

    update(userId, taskId, body) {
        const updatedTask = TasksRepository.update(userId, taskId, body);
        if (!updatedTask) {
            throw ApiError.BadRequest('Failed to update task');
        }
        return updatedTask;
    }

    delete(userId, taskId) {
        const deletedTask = TasksRepository.delete(userId, taskId);
        if (!deletedTask) {
            throw ApiError.BadRequest('Failed to delete task');
        }
        return deletedTask;
    }
}

export default new TaskService();