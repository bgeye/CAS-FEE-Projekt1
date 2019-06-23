import {httpService} from './http-service.js';

class NoteService {
    async getAllNotes() {

        return await httpService.ajax("GET",/notes/ ,undefined);
    }
}

export const noteService = new NoteService();