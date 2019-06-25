export class DataService {
    constructor() {

    }

    getLocalData(dataType) {

        return JSON.parse(localStorage.getItem(dataType));
    }

    updateData(dataType, data) {
        localStorage.setItem(dataType, JSON.stringify(data));
    }
}