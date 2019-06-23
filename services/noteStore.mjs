import Datastore from 'nedb-promise';

export class Note {
    constructor(title, description, doneDate, importance, finished) {

        this.title = title;
        this.description = description;
        this.doneDate = doneDate;
        this.createDate = new Date(); //createDate
        this.importance = importance;
        this.finished = finished;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async all() {
        return await this.db.cfind().sort({createDate: -1}).exec();
    }



}

export const noteStore = new NoteStore();