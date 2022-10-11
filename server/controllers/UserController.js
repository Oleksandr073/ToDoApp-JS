import UserService from '../services/UserService.js';

function getMiliseconds(tokenTime) {
    const measure = tokenTime.slice(-1);
    const time = tokenTime.slice(0, -1);
    switch (measure) {
        case 's': return time * 1000;
        case 'm': return time * 60 * 1000;
        case 'h': return time * 60 * 60 * 1000;
        case 'd': return time * 24 * 60 * 60 * 1000;
        default: return time;
    }
}

class UserController {
    async register(req, res, next) {
        try {
            const { body } = req;
            const user = await UserService.register(body);
            console.log('ms', getMiliseconds(process.env.JWT_REFRESH_TIME));
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