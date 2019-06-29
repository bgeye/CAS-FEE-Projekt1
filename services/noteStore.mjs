import DataStore from 'nedb-promise';

export class NoteStore {
    constructor(db) {
        this.db = db || new DataStore({filename: './data/notes.db', autoload: true});
        this.filterByParam = {
            doneDate: {doneDate: 1},
            createDate: {createDate: -1},
            importance: {importance: -1}
        };
    }

    async add(note) {

        return await this.db.insert(note);
    }

    async update(id, changes) {

        await this.db.update({_id: id}, {$set: changes});
        return await this.get(id);
    }

    async patch(id, noteDetail) {

        await this.db.update({_id: id}, {$set: noteDetail}, {});
        return await this.get(id);
    }

    async get(id) {

        return await this.db.findOne({_id: id});
    }

    async all(filterBy, noteStatus) {

        let searchParam;
        if (noteStatus === 'true') {
            searchParam = {finished: true}
        }
        return await this.db.cfind(searchParam).sort(this.filterByParam[filterBy]).exec();
    }
}

export const noteStore = new NoteStore();