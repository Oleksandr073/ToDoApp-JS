import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';

export default class BaseRepository {
    constructor(collectionName) {
        this.collectionPath = resolve() + `/db/${collectionName}.json`;
    }

    setDataInDatabase(data) {
        data = JSON.stringify(data);
        writeFileSync(this.collectionPath, data);
    }

    getDataFromDatabase() {
        let data = readFileSync(this.collectionPath, 'utf8');
        data = JSON.parse(data);
        return data;
    }

    generateId() {
        return v4()
    }

    getAll() {
        return this.getDataFromDatabase();
    }

    getOne(search) {
        const data = this.getDataFromDatabase();
        let searchItem = null;
        for (const key of Object.keys(search)) {
            const searchItemInData = data.find(item => item[key] === search[key]);
            if (searchItemInData) {
                searchItem = searchItemInData;
                break;
            }
        }

        return searchItem ? searchItem : null;
    }

    create(newData, id = this.generateId()) {
        const data = this.getDataFromDatabase();

        newData.id = id;

        data.push(newData);

        this.setDataInDatabase(data);

        return newData;
    }

    async update(id, dataToUpdate) {
        const data = this.getDataFromDatabase();

        const updatedItemIndex = data.findIndex(item => item.id === id);

        if (updatedItemIndex === -1) {
            return null;
        }

        data[updatedItemIndex] = {
            ...data[updatedItemIndex],
            ...dataToUpdate,
        };

        this.setDataInDatabase(data);

        return data[updatedItemIndex];
    }

    async delete(id) {
        const data = this.getDataFromDatabase();

        const deletedItemIndex = data.findIndex(item => item.id === id);
        if (deletedItemIndex === -1) {
            return null;
        }

        const deletedUser = data.filter(item => item.id === id);
        data.splice(deletedItemIndex, 1);

        this.setDataInDatabase(data);

        return deletedUser;
    }
}
