export class NotesStorage {
    constructor(shared) {
        this.shared = shared;
    }

    getNotes() {

        let noteItems = JSON.parse(localStorage.getItem('notes'));
        if (!noteItems) {
            localStorage.setItem('notes', JSON.stringify(this.shared.notesOrigin));
            noteItems = JSON.parse(localStorage.getItem('notes'));
        }
        return noteItems
    }

    getNoteIndexById(noteId) {
        const notes = this.getNotes();
        let noteIndex = notes.findIndex(note => note.id === noteId);
        return noteIndex
    }


    //only temporary
    createNewId() {
        let notes = this.getNotes();
        notes = notes.length + 1;
        return notes.toString();
    }

    //let here
    getNoteById(noteId) {
        const notes = this.getNotes();
        let noteItem = notes.find(note => note.id === noteId);

        return noteItem
    }

    save(e) {
        const clickedBtn = e.target.dataset.save;
        if (clickedBtn === 'submit') {

            const noteTitle = document.querySelector('#title').value;
            const noteDescription = document.querySelector('#description').value;
            const noteImportance = document.querySelector('input[name="importance"]:checked').value;
            const noteDoneDate = new Date(document.querySelector('#donedate').value);
            const noteFinished = (document.querySelector('input[name="finished"]').value === 'true') ? true : false;

            if (this.shared.getUrlId()) {
                e.preventDefault();
                const noteId = this.shared.getUrlId();

                this.updateNote(noteTitle, noteDescription, noteImportance, noteDoneDate, noteFinished, noteId);

            } else {
                e.preventDefault();
                this.createNote(noteTitle, noteDescription, noteImportance, noteDoneDate);
            }
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
        localStorage.setItem('notes', JSON.stringify(notes));
        const location = window.location;
        if (location !== 'index.html') {
            window.location.replace("index.html");
        }

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
        localStorage.setItem('notes', JSON.stringify(notes));
        window.location.replace("index.html");
    }


    setStatus(event) {
        const noteId = event.target.dataset.noteId;
        const noteCheckbox = event.target.dataset.noteCheckbox;
        const noteChecked = event.target.checked;
        const noteItem = this.getNoteById(noteId);

        if (noteCheckbox === 'finished') {

            noteItem.finished = noteChecked;
            this.updateNote(noteItem.title, noteItem.description, noteItem.importance, noteItem.doneDate, noteItem.finished, noteId);
        }
    }

    orderByFinishDate(allNotes) {
        this.notesFiltered = allNotes.sort(function (a, b) {
            let dateA = a.doneDate, dateB = b.doneDate;

            return dateA < dateB ? -1 : dateA > dateB ? 1 : 0; //ASC: earliest date on top
        });

        return this.notesFiltered
    }

    orderByCreateDate(allNotes) {

        this.notesFiltered = allNotes.sort(function (a, b) {
            let dateA = a.createDate, dateB = b.createDate;

            return dateA > dateB ? -1 : dateA < dateB ? 1 : 0; //DESC: newest date on top

        });
        return this.notesFiltered
    }

    orderByImportance(allNotes) {

        this.notesFiltered = allNotes.sort(function (a, b) {
            let importanceA = Number(a.importance), importanceB = Number(b.importance);

            return importanceA > importanceB ? -1 : importanceA < importanceB ? 1 : 0; //DESC: most important on top
        });

        return this.notesFiltered;
    }

    showFinished(allNotes) {

        this.notesFiltered = allNotes.filter(note => note.finished === true);
        return this.notesFiltered
    }
}