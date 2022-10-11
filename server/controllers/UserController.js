import UserService from '../services/UserService.js';

class UserController {
    async register(req, res) {
        try {
            const { body } = req;
            const user = await UserService.register(body);
            res.send(user);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    async login(req, res) {
        try {
            const { body } = req;
            const user = await UserService.login(body);
            res.send(user);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

}

export default new UserController();