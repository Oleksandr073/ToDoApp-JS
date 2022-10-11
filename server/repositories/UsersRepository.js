import BaseRepository from './BaseRepository.js';

class UsersRepository extends BaseRepository {
    constructor() {
        super('users');
    }

    getOne(search) {
        const { nickname, email } = search;
        return super.getOne({ nickname, email });
    }
}

export default new UsersRepository();