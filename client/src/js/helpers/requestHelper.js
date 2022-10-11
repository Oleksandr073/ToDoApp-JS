import { API_URL } from "../constants/apiUrl";

export default async function makeRequest({ entityName, id = '', method, body }) {
    const url = `${API_URL}/${entityName + (id ? '/' + id : '')}`;
    const options = {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: { "Content-Type": "application/json" }
    };

    const res = await fetch(url, options);
    const dataObj = await res.json();

    if (!res.ok) {
        throw new Error(dataObj);
    }

    return dataObj;
}