import UserService from '../services/UserService.js';
import getMiliseconds from '../helpers/getMiliseconds.js';

class UserController {
    async register(req, res, next) {
        try {
            const { body } = req;
            const user = await UserService.register(body);
            res.cookie('refreshToken', user.refreshToken, { maxAge: getMiliseconds(process.env.JWT_REFRESH_TIME), httpOnly: true });
            res.send(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { body } = req;
            const user = await UserService.login(body);
            res.cookie('refreshToken', user.refreshToken, { maxAge: getMiliseconds(process.env.JWT_REFRESH_TIME), httpOnly: true });
            res.send(user);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { body } = req;
            const user = await UserService.update(body);
            res.send(user);
        } catch (error) {
            next(error);
        }
    }

    logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.send(token);
        } catch (error) {
            next(error);
        }
    }

    refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const user = UserService.refresh(refreshToken);
            res.cookie('refreshToken', user.refreshToken, { maxAge: getMiliseconds(process.env.JWT_REFRESH_TIME), httpOnly: true });
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

}

export default new UserController();