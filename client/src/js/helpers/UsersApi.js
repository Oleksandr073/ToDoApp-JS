import { get, post, put, deleteReq } from './apiHelper';
import { USERS_ENTITY } from '../constants/entities';

const entity = USERS_ENTITY;

export default class UsersApi {

    // GET
    static async getUserById(userId) {
        return get(entity, userId);
    }

    // POST register
    static async registerUser(data) {
        const url = entity + '/register';
        return post(url, data);
    }

    // POST login
    static async loginUser(data) {
        const url = entity + '/login';
        return post(url, data);
    }

}