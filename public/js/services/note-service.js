import {httpService} from './http-service.js';

class NoteService {


    async createNote(note) {
        return await httpService.ajax("POST", `/notes/`, note);
    }

    async getAllNotes(filterBy, noteStatus) {
        return await httpService.ajax("GET", `/notes?filterBy=${filterBy}&noteStatus=${noteStatus}`, undefined);
    }

    async getNote(id) {
        return await httpService.ajax("GET", `/notes/${id}`, undefined);
    }

    async updateNote(id, changes) {
        return await httpService.ajax("PUT", `/notes/${id}`, changes);
    }

    async updateNoteStatus(id, noteStatus) {
        return await httpService.ajax("PATCH", `/notes/${id}`, {noteStatus});
    }
}

export const noteService = new NoteService();