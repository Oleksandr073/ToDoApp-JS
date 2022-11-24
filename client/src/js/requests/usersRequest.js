import localStorageHelper from '../helpers/localStorageHelper';
import makeRequest from '../helpers/requestHelper';
import { USERS_ENTITY } from '../constants/entities';
import { ACCESS_TOKEN_KEY } from '../constants/localStorageKeys';
import { USER_ID_KEY } from '../constants/localStorageKeys';

export const userApi = {
    async registerUser(data) {
        try {
            const { user, accessToken } = await makeRequest({
                entityName: USERS_ENTITY + '/register',
                body: data,
                method: 'POST',
            });

            localStorageHelper.set(ACCESS_TOKEN_KEY, accessToken);
            localStorageHelper.set(USER_ID_KEY, user.id);

            return user;
        } catch (error) {
            throw error;
        }
    },

    async loginUser(data) {
        try {
            const { user, accessToken } = await makeRequest({
                entityName: USERS_ENTITY + '/login',
                body: data,
                method: 'POST',
            });

            localStorageHelper.set(ACCESS_TOKEN_KEY, accessToken);
            localStorageHelper.set(USER_ID_KEY, user.id);

            return user;
        } catch (error) {
            throw error;
        }
    },

    async logoutUser() {
        try {
            const response = await makeRequest({
                entityName: USERS_ENTITY + '/logout',
                method: 'GET',
            });

            localStorageHelper.remove(ACCESS_TOKEN_KEY);
            localStorageHelper.remove(USER_ID_KEY);

            return response;
        } catch (error) {
            throw error;
        }
    },

    async updateUser(data) {
        try {
            const response = await makeRequest({
                entityName: USERS_ENTITY + '/update',
                body: data,
                method: 'POST',
            });

            return response;
        } catch (error) {
            throw error;
        }
    },

    async refreshToken() {
        try {
            const { user, accessToken } = await makeRequest({
                entityName: USERS_ENTITY + '/refresh',
                method: 'GET',
            });

            localStorageHelper.set(ACCESS_TOKEN_KEY, accessToken);
            localStorageHelper.set(USER_ID_KEY, user.id);

            return user;
        } catch (error) {
            throw error;
        }
    },
}