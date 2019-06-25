export class NotesStorage {
    constructor() {

    }


    // updateNote(noteTitle, noteDescription, noteImportance, noteDoneDate, noteItemFinished = false, noteItemId) {
    //     const noteId = noteItemId;
    //     const noteIndex = this.getNoteIndexById(noteId);
    //     const noteItem = this.getNoteById(noteId);
    //
    //     noteItem.title = noteTitle;
    //     noteItem.description = noteDescription;
    //     noteItem.importance = noteImportance;
    //     noteItem.doneDate = noteDoneDate;
    //     noteItem.finished = noteItemFinished;
    //
    //     const notes = this.getNotes();
    //     notes[noteIndex] = noteItem;
    //     return notes;
    // }

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
            noteChecked: event.target.checked
        };
        return statusDetail;
    }
}