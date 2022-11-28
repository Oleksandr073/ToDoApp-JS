import localStorageHelper from '../helpers/localStorageHelper';
import makeRequest from '../helpers/requestHelper';
import { USERS_ENTITY } from '../constants/entities';
import { ACCESS_TOKEN_KEY } from '../constants/localStorageKeys';
import { USER_ID_KEY } from '../constants/localStorageKeys';
import { REGISTRATION_DATE_KEY } from '../constants/localStorageKeys';

function setUserInfo({ user, accessToken }) {
    localStorageHelper.set(ACCESS_TOKEN_KEY, accessToken);
    localStorageHelper.set(USER_ID_KEY, user.id);
    localStorageHelper.set(REGISTRATION_DATE_KEY, user.registrationDate);
}

function removeUserInfo() {
    localStorageHelper.remove(ACCESS_TOKEN_KEY);
    localStorageHelper.remove(USER_ID_KEY);
    localStorageHelper.remove(REGISTRATION_DATE_KEY);
}

export const userApi = {
    async registerUser(data) {
        try {
            const { user, accessToken } = await makeRequest({
                entityName: USERS_ENTITY + '/register',
                body: data,
                method: 'POST',
            });

            setUserInfo({ user, accessToken });

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

            setUserInfo({ user, accessToken });

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

            removeUserInfo();

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

            setUserInfo({ user, accessToken });

            return user;
        } catch (error) {
            throw error;
        }
    },
}