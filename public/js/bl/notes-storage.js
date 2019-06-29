export class NotesStorage {
    constructor() {

    }

    prepareNote(noteTitle, noteDescription, noteImportance, noteDoneDate) {
        const finished = false;
        const createDate = String(Date.now());

        const newNote = {
            title: noteTitle,
            description: noteDescription,
            importance: noteImportance,
            doneDate: noteDoneDate,
            createDate: createDate,
            finished: finished
        };
        return newNote;
    }

    prepareStatusInfo(event) {
        const statusDetail = {
            noteId: event.target.dataset.noteId,
            noteChecked: {finished: event.target.checked}
        };
        return statusDetail;
    }
}