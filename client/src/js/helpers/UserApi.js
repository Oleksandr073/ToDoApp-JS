const BASE_URL = 'users';

export default class UserApi {

    // POST //login
    // static async getUser(data) {
    //     const url = BASE_URL;
    //     // const options = {
    //     //     method: 'GET'
    //     // };
    //     console.log(data);
    //     const options = {
    //         method: 'POST',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     return await fetch(url, options)
    //         .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to get user')))
    //         .catch(error => { throw error });
    // }

    // GET
    static async getUserById(userId) {
        const url = BASE_URL + '/' + userId;
        const options = {
            method: 'GET'
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to get user by id')))
            .catch(error => { throw error });
    }

    // POST login
    static async loginUser(data) {
        const url = BASE_URL + '/login';
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to login')))
            .catch(error => { throw error });
    }

    // POST register
    static async registerUser(data) {
        const url = BASE_URL + '/register';
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await fetch(url, options)
            .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to register')))
            .catch(error => { throw error });
    }


    // // DELETE
    // static async deleteData(id) {
    //     const url = BASE_URL + '/' + id;
    //     const options = {
    //         method: 'DELETE'
    //     };

    //     return await fetch(url, options)
    //         .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to delete data')))
    //         .catch(error => { throw error });
    // }

    // // PUT
    // static async updateData(id, data) {
    //     const url = BASE_URL + '/' + id;
    //     const options = {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     return await fetch(url, options)
    //         .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to edit data')))
    //         .catch(error => { throw error });
    // }
}