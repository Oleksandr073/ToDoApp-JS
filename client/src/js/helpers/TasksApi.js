import { get, post, put, deleteReq } from './apiHelper';
import { TASKS_ENTITY } from '../constants/entities';

const entity = TASKS_ENTITY;

export default class TasksApi {

    // GET
    static async getData(userId) {
        const url = entity + '/' + userId;
        return get(url);
    }

    // POST
    static async postData(userId, data) {
        const url = entity + '/' + userId;
        return post(url, data);
    }
    
    // PUT
    static async updateData(userId, id, data) {
        const url = entity + '/' + userId;
        return put(url, id, data);
    }

    // DELETE
    static async deleteData(userId, id) {
        const url = entity + '/' + userId;
        return deleteReq(url, id);
    }
   
}