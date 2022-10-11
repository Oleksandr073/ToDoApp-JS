import localStorageHelper from '../helpers/localStorageHelper';
import makeRequest from '../helpers/requestHelper';
import { TASKS_ENTITY } from '../constants/entities';
import { ACCESS_TOKEN_KEY } from '../constants/localStorageKeys';

export const taskApi = {
    async getTasks() {
        try {
            const accessToken = localStorageHelper.get(ACCESS_TOKEN_KEY);
            return await makeRequest({
                entityName: TASKS_ENTITY,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
        } catch (error) {
            throw error;
        }
    },

    async createTask(data) {
        try {
            const accessToken = localStorageHelper.get(ACCESS_TOKEN_KEY);
            return await makeRequest({
                entityName: TASKS_ENTITY,
                body: data,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
        } catch (error) {
            throw error;
        }
    },

    async updateTask(id, data) {
        try {
            const accessToken = localStorageHelper.get(ACCESS_TOKEN_KEY);
            return await makeRequest({
                entityName: TASKS_ENTITY,
                id,
                body: data,
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
        } catch (error) {
            throw error;
        }
    },

    async deleteTask(id) {
        try {
            const accessToken = localStorageHelper.get(ACCESS_TOKEN_KEY);
            return await makeRequest({
                entityName: TASKS_ENTITY,
                id,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
        } catch (error) {
            throw error;
        }
    },

}