import {noteStore} from "../services/noteStore.mjs";

export class NotesController {
    async getNotes(req, res) {

        res.json((await noteStore.all(req.query.filterBy, req.query.noteStatus) || []))
    };

    async createNote(req, res) {

        res.json(await noteStore.add(req.body));
    }

    async getNoteById(req, res) {

        res.json(await noteStore.get(req.params.id));
    }

    async updateNote(req, res) {

        res.json(await noteStore.update(req.params.id, req.body))
    }

    async updateNoteDetail(req, res) {

        res.json(await noteStore.patch(req.params.id, req.body))
    }
}

export const notesController = new NotesController();