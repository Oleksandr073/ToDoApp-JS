import makeRequest from '../helpers/requestHelper';
import { USERS_ENTITY } from '../constants/entities';

export const userApi = {
    async registerUser(data) {
        try {
            return await makeRequest({
                entityName: USERS_ENTITY + '/register',
                body: data,
                method: 'POST',
            });
        } catch (error) {
            throw error;
        }
    },

    async loginUser(data) {
        try {
            return await makeRequest({
                entityName: USERS_ENTITY + '/login',
                body: data,
                method: 'POST',
            });
        } catch (error) {
            throw error;
        }
    },
}