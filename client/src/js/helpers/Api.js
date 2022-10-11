const BASE_URL = 'data';

export default class Api {

    // GET
    static async getData(userId) {
        const url = BASE_URL + '/' + userId;
        const options = {
            method: 'GET'
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to get data')))
            .then(response => response.length ? response : Promise.reject(Error('No data')))
            .catch(error => { throw error });
    }

    // POST
    static async postData(userId, data) {
        const url = BASE_URL + '/' + userId;
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to post data')))
            .catch(error => { throw error });
    }


    // DELETE
    static async deleteData(userId, id) {
        const url = BASE_URL + '/' + userId + '/' + id;
        const options = {
            method: 'DELETE'
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to delete data')))
            .catch(error => { throw error });
    }

    // PUT
    static async updateData(userId, id, data) {
        const url = BASE_URL + '/' + userId + '/' + id;
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to edit data')))
            .catch(error => { throw error });
    }
}