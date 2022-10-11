import BaseRepository from './BaseRepository.js';

class TasksRepository extends BaseRepository {
    constructor() {
        super('tasks');
    }

    getAll(userId) {
        const tasks = super.getAll().find(item => item.id === userId)?.tasks;
        return tasks ? tasks : [];
    }

    create(userId, data) {
        const userTasks = super.getOne({ id: userId });

        data.id = this.generateId();
        if (userTasks) {
            userTasks.tasks.push(data);

            super.update(userId, userTasks);
        } else {       
            const newUserTasks = {
                tasks: [
                    data
                ]
            }

            super.create(newUserTasks, userId);
        }

        return data;  
    }

    update(userId, taskId, body) {
        const userTasks = super.getOne({ id: userId });

        const updatedTask = {
            ...userTasks.tasks.find(task => task.id === taskId),
            ...body
        }

        userTasks.tasks = userTasks.tasks.map(task => task.id === taskId ? updatedTask : task);

        super.update(userId, userTasks);

        return updatedTask;
    }

    delete(userId, taskId) {
        const userTasks = super.getOne({ id: userId });

        const deletedTask = userTasks.tasks.find(task => task.id === taskId);

        userTasks.tasks = userTasks.tasks.filter(task => task.id === taskId);

        super.update(userId, userTasks);

        return deletedTask;
    }
}

export default new TasksRepository();