import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const databasePath = resolve() + '/db/data.json';

//--- Users REST API ---//
const usersRouter = Router();

// POST register
usersRouter.post("/register", function (req, res) {
    let data = readFileSync(databasePath, 'utf8');
    data = JSON.parse(data);

    let isNewUser = !data.users.find(({ nickname, email }) =>
        req.body.nickname === nickname || req.body.email === email);

    if (isNewUser) {
        let userId = 'u' + (100 + data.users.length);
        req.body.id = userId;
        req.body.tasks = [];

        data.users.push(req.body);
        data = JSON.stringify(data);

        writeFileSync(databasePath, data);
        res.send(req.body);
    } else {
        res.status(404).send();
    }
});

// POST login
usersRouter.post("/login", function (req, res) {
    let data = readFileSync(databasePath, 'utf8');
    data = JSON.parse(data);

    let user = data.users.find(({ nickname, password }) =>
        req.body.nickname === nickname && req.body.password === password);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
});

// GET user by id
usersRouter.get("/:userId", function (req, res) {
    let data = readFileSync(databasePath, 'utf8');
    data = JSON.parse(data);

    let userId = req.params.userId;

    let user = data.users.find(({ id }) => id === userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
});

export default usersRouter;