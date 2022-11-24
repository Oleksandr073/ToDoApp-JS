import BaseRepository from './BaseRepository.js';

class UsersRepository extends BaseRepository {
    constructor() {
        super('users');
    }

    getOne(search) {
        const { nickname } = search;
        return super.getOne({ nickname });
    }

    getById(id) {
        return super.getOne({ id });
    }
}

export default new UsersRepository();