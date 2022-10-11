import bcrypt from 'bcrypt';
import ApiError from '../exceptions/ApiError.js';
import UsersRepository from '../repositories/UsersRepository.js';
import TokenService from './TokenService.js';

class UserService {
    async register(body) {
        const candidate = UsersRepository.getOne(body);
        if (candidate) {
            throw ApiError.BadRequest('Nickname or email are already exist');
        }

        const hashPassword = await bcrypt.hash(body.password, 3);
        body.password = hashPassword;

        const user = UsersRepository.create(body);

        const { password, ...userDto } = user;
        const tokens = TokenService.generateTokens(userDto);
        TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(body) {
        const user = UsersRepository.getOne(body);
        if (!user) {
            throw ApiError.BadRequest('User with this nickname not found');
        }

        const isPassEqual = await bcrypt.compare(body.password, user.password);
        if (!isPassEqual) {
            throw ApiError.BadRequest('Password is incorrect');
        }

        const { password, ...userDto } = user;
        const tokens = TokenService.generateTokens(userDto);
        TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    logout(refreshToken) {
        const token = TokenService.removeToken(refreshToken);
        return token;
    }

    refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = UsersRepository.getById(userData.id);
        const { password, ...userDto } = user;
        const tokens = TokenService.generateTokens(userDto);

        TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new UserService();