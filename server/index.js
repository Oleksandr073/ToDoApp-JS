const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("../client/public"));

const jsonParser = express.json();


//--- Users REST API ---//

// POST login
app.post("/users/login", jsonParser, function (req, res) {
    let data = fs.readFileSync(__dirname + '/db/data.json', 'utf8');
    data = JSON.parse(data);

    let user = data.users.find(({ nickname, password }) =>
        req.body.nickname === nickname && req.body.password === password);

    if (user) {
        res.send(user)
    } else {
        res.status(404).send()
    }
});

// POST register
app.post("/users/register", jsonParser, function (req, res) {
    let data = fs.readFileSync(__dirname + '/db/data.json', 'utf8');
    data = JSON.parse(data);

    let isNewUser = !data.users.find(({ nickname, email }) =>
        req.body.nickname === nickname || req.body.email === email);

    if (isNewUser) {
        let userId = 'u' + (100 + data.users.length);
        req.body.id = userId;
        req.body.tasks = [];

        data.users.push(req.body);
        data = JSON.stringify(data);

        fs.writeFileSync(__dirname + '/db/data.json', data);
        res.send(req.body);
    } else {
        res.status(404).send()
    }
});

// GET user by id
app.get("/users/:userId", function (req, res) {
    let data = fs.readFileSync(__dirname + '/db/data.json', 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;

    let user = data.users.find(({ id }) => id === userId);

    if (user) {
        res.send(user)
    } else {
        res.status(404).send()
    }
});

//--- Tasks REST API ---//

// GET
app.get("/data/:userId", function (req, res) {
    let data = fs.readFileSync(__dirname + '/db/data.json', 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) =>  id == userId);

    let tasks = JSON.stringify(user.tasks);

    res.send(tasks);
});

// POST
app.post("/data/:userId", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let data = fs.readFileSync(__dirname + '/db/data.json', 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) => id === userId);

    let uniqueId = generateUniqueId(req.body);
    req.body.id = uniqueId;

    user.tasks.push(req.body);

    data = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/db/data.json', data);

    res.send(req.body);
})

// DELETE
app.delete("/data/:userId/:taskId", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let data = fs.readFileSync(__dirname + '/db/data.json', 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) => id === userId);

    let taskId = req.params.taskId;

    user.tasks = user.tasks.filter(task => task.id != taskId);

    data = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/db/data.json', data);

    res.send(req.body);
})

// PUT
app.put("/data/:userId/:taskId", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let data = fs.readFileSync(__dirname + '/db/data.json', 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;
    let user = data.users.find(({ id }) => id === userId);

    let taskId = req.params.taskId;

    user.tasks = user.tasks.map(task => task.id == taskId ? req.body : task);

    data = JSON.stringify(data);
    fs.writeFileSync(__dirname + '/db/data.json', data);

    res.send(req.body);
})



// generate unique id
function generateUniqueId({ title, text }) {
    const date = new Date()[Symbol.toPrimitive]('number');
    const titleLength = title.length;
    const textLength = text.length;

    const numSum = Number(date.toString() + titleLength.toString() + textLength.toString());
    const randomDivision = (numSum / (Math.random() * 10)).toFixed();

    return randomDivision.length > 16 ? randomDivision.slice(0, 16) : randomDivision + '0'.repeat(16 - randomDivision.length);
}



app.listen(3000);