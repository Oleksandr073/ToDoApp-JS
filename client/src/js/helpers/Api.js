const FIREBASE_URL = 'https://todoapp1-7482c-default-rtdb.europe-west1.firebasedatabase.app/';

// const endpoint = 'todoitems';

class Api {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    // GET
    async getData() {

        const url = FIREBASE_URL + this.endpoint + '.json';
        const options = {
            method: 'GET'
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to get data')))
            .then(response => response ? response : Promise.reject(Error('No data')))
            .catch(error => { throw error });
    }

    // POST
    async postData(data) {

        const url = FIREBASE_URL + this.endpoint + '.json';
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
    async deleteData(id) {

        const url = FIREBASE_URL + this.endpoint + '/' + id + '.json';
        const options = {
            method: 'DELETE'
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to delete data')))
            .catch(error => { throw error });
    }

    // PATCH
    async updateData(id, data) {

        const url = FIREBASE_URL + this.endpoint + '/' + id + '.json';
        const options = {
            method: 'PATCH',
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

export default Api;