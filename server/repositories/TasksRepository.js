import BaseRepository from './BaseRepository.js';

class TasksRepository extends BaseRepository {
    constructor() {
        super('tasks');
        this.userId = '';
    }

    setDataInDatabase(tasks) {
        const data = super.getDataFromDatabase();
        const oldTasks = data.find(({ id }) => id === this.userId);
        oldTasks.tasks = tasks;
        super.setDataInDatabase(data);
    }

    getDataFromDatabase() {
        const data = super.getDataFromDatabase();
        const tasks = data.find(item => item.id === this.userId)?.tasks;
        return tasks;
    }

    getAll(userId) {
        this.userId = userId;
        return super.getAll() || [];
    }

    create(userId, body) {
        this.userId = userId;

        if (!this.getDataFromDatabase()) {
            const data = super.getDataFromDatabase();
            const newUserInfo = {
                id: this.userId,
                tasks: []
            }
            data.push(newUserInfo);
            super.setDataInDatabase(data);
        };

        return super.create(body);
    }

    update(userId, taskId, body) {
        this.userId = userId;
        return super.update(taskId, body);
    }

    delete(userId, taskId) {
        this.userId = userId;
        return super.delete(taskId);
    }
}

export default new TasksRepository();