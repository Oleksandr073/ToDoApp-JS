import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import bcrypt from 'bcrypt';

const databasePath = resolve() + '/db/data.json';

class UserService {
    async register(body) {
        let data = readFileSync(databasePath, 'utf8');
        data = JSON.parse(data);

        const isNewUser = !data.users.find(({ nickname, email }) => body.nickname === nickname || body.email === email);

        if (!isNewUser) {
            throw new Error('Nickname or email are allready exist');
        }

        const hashPassword = await bcrypt.hash(body.password, 3);
        body.password = hashPassword;

        const userId = 'u' + (100 + data.users.length);
        body.id = userId;
        body.tasks = [];

        data.users.push(body);

        data = JSON.stringify(data);
        writeFileSync(databasePath, data);

        return body;
    }

    async login(body) {
        let data = readFileSync(databasePath, 'utf8');
        data = JSON.parse(data);

        const user = data.users.find(({ nickname }) => body.nickname === nickname);
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