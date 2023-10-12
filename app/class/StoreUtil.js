const Store = require('electron-store')

const TaskUtil = require('./TaskUtil')

class StoreUtil {
    store

    constructor() {
        this.store = new Store()
    }

    setItem(key, value) {
        this.store.set(key, value)
    }

    getItem(key) {
        return this.store.get(key)
    }

    keyExist(key) {
        return this.store.has(key)
    }

    countItem(key) {
        const values = this.getItem(key)
        if (Array.isArray(values)) {
            return values.length
        }
    }

    deleteItem(key) {
        this.store.delete(key)
    }

}

module.exports = new StoreUtil()