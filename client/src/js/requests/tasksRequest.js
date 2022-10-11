import makeRequest from '../helpers/requestHelper';
import { TASKS_ENTITY } from '../constants/entities';

export const taskApi = {

    async getTasks(userId) {
        try {
            return await makeRequest({
                entityName: TASKS_ENTITY + '/' + userId,
                method: 'GET',
            });
        } catch (error) {
            throw new Error('Failed to get tasks');
        }
    },

    async createTask(userId, data) {
        try {
            return await makeRequest({
                entityName: TASKS_ENTITY + '/' + userId,
                body: data,
                method: 'POST',
            });
        } catch (error) {
            throw new Error('Failed to create task');
        }
    },

    async updateTask(userId, id, data) {
        try {
            return await makeRequest({
                entityName: TASKS_ENTITY + '/' + userId,
                id,
                body: data,
                method: 'PUT',
            });
        } catch (error) {
            throw new Error('Failed to update task');
        }
    },

    async deleteTask(userId, id) {
        try {
            return await makeRequest({
                entityName: TASKS_ENTITY + '/' + userId,
                id,
                method: 'DELETE',
            });
        } catch (error) {
            throw new Error('Failed to delete task');
        }
    },

}