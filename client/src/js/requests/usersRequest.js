import { getReq, postReq, putReq, deleteReq } from '../helpers/requestHelper';
import { USERS_ENTITY } from '../constants/entities';

const entity = USERS_ENTITY;

// export async function getUser(userId) {
//     return getReq(entity, userId);
// }

export async function registerUser(data) {
    const url = entity + '/register';
    return postReq(url, data);
}

export async function loginUser(data) {
    const url = entity + '/login';
    return postReq(url, data);
}