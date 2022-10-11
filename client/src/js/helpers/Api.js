const FIREBASE_URL = 'https://todoapp1-7482c-default-rtdb.europe-west1.firebasedatabase.app/';

const ENDPOINT = 'todoitems';

class Api {
    // constructor(endpoint) {
    //     this.endpoint = endpoint;
    // }

    // GET
    static async getData() {

        const url = FIREBASE_URL + ENDPOINT + '.json';
        const options = {
            method: 'GET'
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to get data')))
            .then(response => response ? response : Promise.reject(Error('No data')))
            .catch(error => { throw error });
    }

    // POST
    static async postData(id, data) {

        const url = FIREBASE_URL + ENDPOINT + '/' + id + '.json';
        const options = {
            method: 'PATCH',
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
    static async deleteData(id) {

        const url = FIREBASE_URL + ENDPOINT + '/' + id + '.json';
        const options = {
            method: 'DELETE'
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to delete data')))
            .catch(error => { throw error });
    }

    // PATCH
    static async updateData(id, data) {

        const url = FIREBASE_URL + ENDPOINT + '/' + id + '.json';
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