import { getReq, postReq, putReq, deleteReq } from '../helpers/requestHelper';
import { TASKS_ENTITY } from '../constants/entities';

const entity = TASKS_ENTITY;

export async function getTaskReq(userId) {
    const url = entity + '/' + userId;
    return getReq(url);
}

export async function postTaskReq(userId, data) {
    const url = entity + '/' + userId;
    return postReq(url, data);
}

export async function putTaskReq(userId, id, data) {
    const url = entity + '/' + userId;
    return putReq(url, id, data);
}

export async function deleteTaskReq(userId, id) {
    const url = entity + '/' + userId;
    return deleteReq(url, id);
}