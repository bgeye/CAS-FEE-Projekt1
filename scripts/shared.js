/**
 * array of notes (static)
 */

export class Shared {
    constructor () {
        this.notesOrigin = [
            {
                id: "1",
                title: "Milch holen",
                description: "Bitte einen Liter Milch in der Migros holen",
                doneDate: "2019-06-01T00:00:00.000Z",
                createDate: "1558716364511",
                importance: "1",
                finished: false
            },
            {
                id: "2",
                title: "Butter holen",
                description: "Bitte einen Butter in der Migros holen",
                doneDate: "2019-04-01T00:00:00.000Z",
                createDate: "1358716364511",
                importance: "1",
                finished: false
            },
            {
                id: "3",
                title: "Äpfel holen",
                description: "Saisonale Sorte berücksichtigen",
                doneDate: "2019-02-20T00:00:00.000Z",
                createDate: "1158716364511",
                importance: "5",
                finished: true
            },
            {
                id: "4",
                title: "Termin Wanderung Nicole",
                description: "Bleiben wir in der Schweiz oder gehen wir weiter weg?",
                doneDate: "2019-07-11T00:00:00.000Z",
                createDate: "1518716364511",
                importance: "3",
                finished: false
            },
            {
                id: "5",
                title: "Pneuwechsel",
                description: "Termin mit Garage vereinbaren",
                doneDate: "2019-08-14T00:00:00.000Z",
                createDate: "1128716364511",
                importance: "2",
                finished: false
            },
            {
                id: "6",
                title: "Tickets Open Air",
                description: "René fragen ob er bereits Tickets organisiert hat?",
                doneDate: "2019-09-02T00:00:00.000Z",
                createDate: "1008716364511",
                importance: "4",
                finished: false
            }
        ];
    }


    getNoteById(noteId) {
        const notes = this.getNotes();
        let noteItem = notes.find(note => note.id === noteId);

        return noteItem
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


    getUrlId() {
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        const id = searchParams.get('id');

        return id
    }


    getNotes() {

        let noteItems = JSON.parse(localStorage.getItem('notes'));
        if (!noteItems) {
            localStorage.setItem('notes', JSON.stringify(this.notesOrigin)); //set static array from this file
            noteItems = JSON.parse(localStorage.getItem('notes'));
        }

        return noteItems
    }

    save(e) {
        const clickedBtn = e.target.dataset.save;
        if (clickedBtn === 'submit') {

            const noteTitle = document.querySelector('#title').value;
            const noteDescription = document.querySelector('#description').value;
            const noteImportance = document.querySelector('input[name="importance"]:checked').value;
            const noteDoneDate = new Date(document.querySelector('#donedate').value);
            const noteFinished = (document.querySelector('input[name="finished"]').value === 'true') ? true : false;

            if (this.getUrlId()) {
                e.preventDefault();
                const noteId = this.getUrlId();

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
}



