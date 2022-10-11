const localStorageHelper = {
    set(key, value) {
        try {
            const serializedState = typeof value === 'object' ? JSON.stringify(value) : value;
            localStorage.setItem(key, serializedState);
        } catch (error) {
            console.error("Set state error: ", error.message);
        }
    },

    get(key) {
        try {
            const serializedState = localStorage.getItem(key);
            return serializedState === null ? undefined : serializedState;
        } catch (error) {
            console.error("Get state error: ", error.message);
        }
    },

    getObject(key) {
        try {
            const serializedState = localStorage.getItem(key);
            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (error) {
            console.error("Get object state error: ", error.message);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }
}

export default localStorageHelper;