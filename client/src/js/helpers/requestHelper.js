import { API_URL } from "../constants/apiUrl";

const apiUrl = API_URL;

export async function getReq(entityName, id = '') {
    return await makeRequest(`${entityName}/${id}`, 'GET');
}

export async function postReq(entityName, body) {
    return await makeRequest(entityName, 'POST', body);
}

export async function putReq(entityName, id, body) {
    return await makeRequest(`${entityName}/${id}`, 'PUT', body);
}

export async function deleteReq(entityName, id) {
    return await makeRequest(`${entityName}/${id}`, 'DELETE');
}

async function makeRequest(path, method, body) {
    try {
        const url = `${apiUrl}/${path}`;
        const options = {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: { "Content-Type": "application/json" }
        };

        const res = await fetch(url, options);
        const dataObj = await res.json();

        if (res.ok) return dataObj;

        return dataObj;
    } catch (err) {
        console.error(err);
    }
}