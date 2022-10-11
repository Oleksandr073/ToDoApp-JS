import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const databasePath = resolve() + '/db/data.json';

class TaskService {
    get(userId) {
        let data = readFileSync(databasePath, 'utf8');
        data = JSON.parse(data);

        let user = data.users.find(({ id }) => id == userId);
        let tasks = JSON.stringify(user.tasks);

        return tasks;
    }

    create(userId, body) {
        let data = readFileSync(databasePath, 'utf8');
        data = JSON.parse(data);

        let user = data.users.find(({ id }) => id === userId);

        let uniqueId = generateUniqueId(body);
        body.id = uniqueId;

        user.tasks.push(body);

        data = JSON.stringify(data);
        writeFileSync(databasePath, data);

        return body;
    }

    update(userId, taskId, body) {
        let data = readFileSync(databasePath, 'utf8');
        data = JSON.parse(data);

        let user = data.users.find(({ id }) => id === userId);

        user.tasks = user.tasks.map(task => task.id == taskId ? body : task);

        data = JSON.stringify(data);
        writeFileSync(databasePath, data);

        return body;
    }

    delete(userId, taskId, body) {
        let data = readFileSync(databasePath, 'utf8');
        data = JSON.parse(data);

        let user = data.users.find(({ id }) => id === userId);

        user.tasks = user.tasks.filter(task => task.id != taskId);

        data = JSON.stringify(data);
        writeFileSync(databasePath, data);

        return body;
    }
}

export default new TaskService();


// generate unique id
function generateUniqueId({ title, text }) {
    const date = new Date()[Symbol.toPrimitive]('number');
    const titleLength = title.length;
    const textLength = text.length;

    const numSum = Number(date.toString() + titleLength.toString() + textLength.toString());
    const randomDivision = (numSum / (Math.random() * 10)).toFixed();

    return randomDivision.length > 16 ? randomDivision.slice(0, 16) : randomDivision + '0'.repeat(16 - randomDivision.length);
}