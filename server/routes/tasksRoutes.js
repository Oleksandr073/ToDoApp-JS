import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const databasePath = resolve() + '/db/data.json';

//--- Tasks REST API ---//
const tasksRouter = Router();

// GET
tasksRouter.get("/:userId", function (req, res) {
    let data = readFileSync(databasePath, 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) => id == userId);

    let tasks = JSON.stringify(user.tasks);

    res.send(tasks);
});

// POST
tasksRouter.post("/:userId", function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let data = readFileSync(databasePath, 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) => id === userId);

    let uniqueId = generateUniqueId(req.body);
    req.body.id = uniqueId;

    user.tasks.push(req.body);

    data = JSON.stringify(data);
    writeFileSync(databasePath, data);

    res.send(req.body);
})

// DELETE
tasksRouter.delete("/:userId/:taskId", function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let data = readFileSync(databasePath, 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) => id === userId);

    let taskId = req.params.taskId;

    user.tasks = user.tasks.filter(task => task.id != taskId);

    data = JSON.stringify(data);
    writeFileSync(databasePath, data);

    res.send(req.body);
})

// PUT
tasksRouter.put("/:userId/:taskId", function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let data = readFileSync(databasePath, 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) => id === userId);

    let taskId = req.params.taskId;

    user.tasks = user.tasks.map(task => task.id == taskId ? req.body : task);

    data = JSON.stringify(data);
    writeFileSync(databasePath, data);

    res.send(req.body);
})

export default tasksRouter;





// generate unique id
function generateUniqueId({ title, text }) {
    const date = new Date()[Symbol.toPrimitive]('number');
    const titleLength = title.length;
    const textLength = text.length;

    const numSum = Number(date.toString() + titleLength.toString() + textLength.toString());
    const randomDivision = (numSum / (Math.random() * 10)).toFixed();

    return randomDivision.length > 16 ? randomDivision.slice(0, 16) : randomDivision + '0'.repeat(16 - randomDivision.length);
}