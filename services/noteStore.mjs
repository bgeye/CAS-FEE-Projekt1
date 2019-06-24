import Datastore from 'nedb-promise';

export class Note {
    constructor(title, description, doneDate, importance, finished) {

        // this.title = title;
        // this.description = description;
        // this.doneDate = doneDate;
        // this.createDate = new Date(); //createDate
        // this.importance = importance;
        // this.finished = finished;



    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
        this.filterByParam = {
            doneDate : {doneDate: 1},
            createDate : {createDate : -1},
            importance : {importance: -1}
        };
    }

    async add(note) {

        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id}, {$set: {"state": "DELETED"}});
        return await this.get(id);
    }

    async get(id) {
        console.log(this.db.findOne({_id: id}));
        return await this.db.findOne({_id: id});
    }

    async all(filterBy, noteStatus) {
        let searchParam;
        if(noteStatus === "true") {
            searchParam = {finished:"true"}
        }

        return await this.db.cfind(searchParam).sort(this.filterByParam[filterBy]).exec();
    }

}

export const noteStore = new NoteStore();