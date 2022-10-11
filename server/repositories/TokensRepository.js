import BaseRepository from './BaseRepository.js';

class TokensRepository extends BaseRepository {
    constructor() {
        super('tokens');
    }

    delete(refreshToken) {
        const data = this.getDataFromDatabase();

        const deletedItemIndex = data.findIndex(item => item.refreshToken === refreshToken);
        if (deletedItemIndex === -1) {
            return null;
        }

        const deletedUser = data.filter(item => item.refreshToken === refreshToken);
        data.splice(deletedItemIndex, 1);

        this.setDataInDatabase(data);

        return deletedUser;
    }

}

export default new TokensRepository();