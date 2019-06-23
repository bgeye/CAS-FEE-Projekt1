import {noteStore} from "../services/noteStore.mjs";

export class NotesController {
    async getNotes(req, res) {

        res.json((await noteStore.all() || []))
    };
}

export const notesController = new NotesController();