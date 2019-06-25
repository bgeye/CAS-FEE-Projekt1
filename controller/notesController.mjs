import {noteStore} from "../services/noteStore.mjs";

export class NotesController {
    async getNotes(req, res) {
        res.json((await noteStore.all(req.query.filterBy,req.query.noteStatus) || []))
    };

    async createNote(req, res) {
        res.json(await noteStore.add(req.body));
    }

    async getNoteById(req, res) {
        res.json(await noteStore.get(req.params.id));
    }

    async updateNote(req, res) {
        res.json(await noteStore.update(req.params.id,req.body))
    }

    async updateNoteStatus(req, res) {
        console.log(req);
        res.json(await noteStore.patch(req.params.id,req.body.finished))
    }


}

export const notesController = new NotesController();