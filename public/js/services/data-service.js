export class DataService {
    constructor(initialData) {

        this.initialData = initialData;

    }

    getNoteData() {
        const dataTypeNotes = 'notes';
        let notes = this.getLocalData(dataTypeNotes);
        if (!notes) {
            this.updateData(dataTypeNotes, this.initialData);
            notes = this.getLocalData(dataTypeNotes);
        }

        return notes;
    }

    getLocalData(dataType) {

        return JSON.parse(localStorage.getItem(dataType));
    }

    updateData(dataType, data) {
        localStorage.setItem(dataType, JSON.stringify(data));
    }
}