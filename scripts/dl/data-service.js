export class DataService {
    constructor(shared) {

        this.shared = shared;

    }

    getNoteData() {
        const dataTypeNotes = 'notes';
        let notes = this.getLocalData(dataTypeNotes);
        if (!notes) {
            this.updateData(dataTypeNotes, this.shared.notesOrigin);
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