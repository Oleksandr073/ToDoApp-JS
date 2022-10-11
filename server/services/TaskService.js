import TasksRepository from '../repositories/TasksRepository.js';

class TaskService {
    getAll(userId) {
        const tasks = TasksRepository.getAll(userId);
        console.log('ts', tasks);
        return tasks;
    }

    create(userId, body) {
        const task = TasksRepository.create(userId, body);
        return task;
    }

    update(userId, taskId, body) {
        const updatedTask = TasksRepository.update(userId, taskId, body);
        return updatedTask;
    }

    delete(userId, taskId) {
        const deletedTask = TasksRepository.delete(userId, taskId);
        return deletedTask;
    }
}

export default new TaskService();