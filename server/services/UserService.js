import bcrypt from 'bcrypt';
import UsersRepository from '../repositories/UsersRepository.js';

class UserService {
    async register(body) {
        const candidate = UsersRepository.getOne(body);

        if (candidate) {
            throw new Error('Nickname or email are allready exist');
        }

        const hashPassword = await bcrypt.hash(body.password, 3);
        body.password = hashPassword;

        const user = UsersRepository.create(body);

        return user;
    }

    async login(body) {
        const user = UsersRepository.getOne(body);
        if (!user) {
            throw new Error('User with this nickname not found');
        }

        const isPassEqual = await bcrypt.compare(body.password, user.password);
        if (!isPassEqual) {
            throw new Error('Password is incorrect');
        }

        return user;
    }
}

export default new UserService();