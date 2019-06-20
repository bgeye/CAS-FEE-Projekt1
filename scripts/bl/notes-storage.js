export class NotesStorage {
    constructor(getUrlId, dataService) {

        this.getUrlId = getUrlId;
        this.dataService = dataService;
    }

    getNotes(orderBy, filter) {

        let notesFiltered;
        const noteItems = this.dataService.getNoteData();
        switch (filter) {
            case 'sort':
                notesFiltered = this.filterSort(noteItems, orderBy);
                return notesFiltered;
            case 'criteria':
                notesFiltered = this.filterByCriteria(noteItems, orderBy);
                return notesFiltered;

            default:
                return noteItems;
        }
    }

    saveNotes(notes) {
        const dataType = 'notes';
        this.dataService.updateData(dataType, notes);
    }

    getNoteIndexById(noteId) {
        const notes = this.getNotes();
        let noteIndex = notes.findIndex(note => note.id === noteId);
        return noteIndex;
    }

    //only temporary
    createNewId() {
        let notes = this.getNotes();
        notes = notes.length + 1;
        return notes.toString();
    }

    getNoteById(noteId) {
        const notes = this.getNotes();
        let noteItem = notes.find(note => note.id === noteId);
        return noteItem;
    }

    filterSort(noteItems, orderBy) {

        const filteredSort = noteItems.sort(function (a, b) {
            let filterItemA = a[orderBy], filterItemB = b[orderBy];
            return filterItemA < filterItemB ? -1 : filterItemA > filterItemB ? 1 : 0;
        });
        return filteredSort;
    }

    filterByCriteria(noteItems, orderBy) {
        const filteredByCriteria = noteItems.filter(note => note[orderBy] === true);
        return filteredByCriteria;
    }

    addNote(event, noteTitle, noteDescription, noteImportance, noteDoneDate, noteFinished) {

        if(this.getUrlId()){
            const noteId = this.getUrlId();
            return this.updateNote(noteTitle, noteDescription, noteImportance, noteDoneDate, noteFinished, noteId);

        } else {
            return this.createNote(noteTitle, noteDescription, noteImportance, noteDoneDate);
        }
    }

    updateNote(noteTitle, noteDescription, noteImportance, noteDoneDate, noteItemFinished = false, noteItemId) {
        const noteId = noteItemId;
        const noteIndex = this.getNoteIndexById(noteId);
        const noteItem = this.getNoteById(noteId);

        noteItem.title = noteTitle;
        noteItem.description = noteDescription;
        noteItem.importance = noteImportance;
        noteItem.doneDate = noteDoneDate;
        noteItem.finished = noteItemFinished;

        const notes = this.getNotes();
        notes[noteIndex] = noteItem;
        return notes;
    }

    createNote(noteTitle, noteDescription, noteImportance, noteDoneDate) {
        const newId = this.createNewId();
        const finished = false;
        const createDate = String(Date.now());

        const newNote = {
            id: newId,
            title: noteTitle,
            description: noteDescription,
            importance: noteImportance,
            doneDate: noteDoneDate,
            createDate: createDate,
            finished: finished

        };


        const notes = this.getNotes();
        notes.push(newNote);

        return notes;
    }


    setStatus(event) {
        const noteId = event.target.dataset.noteId;
        const noteChecked = event.target.checked;
        const noteItem = this.getNoteById(noteId);

        noteItem.finished = noteChecked;
        const notes = this.updateNote(noteItem.title, noteItem.description, noteItem.importance, noteItem.doneDate, noteItem.finished, noteId);
        this.saveNotes(notes);
    }
}