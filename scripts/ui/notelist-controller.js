export class NoteListController {
    constructor(shared, styleSwitcher) {

        this.shared = shared;
        this.styleSwitcher = styleSwitcher;

        //handlebars source
        this.templateSource = document.querySelector('#note-item-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        //get elements to set eventListeners
        this.filterFinishDate = document.querySelector('#filter-finish-date');
        this.filterCreateDate = document.querySelector('#filter-create-date');
        this.filterImportance = document.querySelector('#filter-importance');
        this.filterFinished = document.querySelector('#filter-finished');
        this.listContainer = document.querySelector('#list-container');
        this.styleSwitch = document.querySelector('#styleswitch');

        //get all notes
        this.allNotes = this.shared.getNotes();

        //array for filtered notes
        this.notesFiltered = [];

    }

    initEventHandlers() {
        this.filterFinishDate.addEventListener('click', () => {
            this.orderByFinishDate(this.allNotes);
        });
        this.filterCreateDate.addEventListener('click', () => {
            this.orderByCreateDate(this.allNotes);
        });
        this.filterImportance.addEventListener('click', () => {
            this.orderByImportance(this.allNotes);
        });
        this.filterFinished.addEventListener('click', () => {
            this.showFinished(this.allNotes);
        });
        this.listContainer.addEventListener('change', (event) => {
            this.setStatus(event);
        });
        this.styleSwitch.addEventListener('change', (event) => {
            this.styleSwitcher.switchStyle(event);
        });
    }

    noteListAction() {
        this.initEventHandlers();
        this.renderNotes(this.allNotes);
        this.styleSwitcher.setStyle();
    }

    renderNotes(notes) {
        if(notes.length > 0) {
            const noteContainer = document.querySelector('#list-container');
            noteContainer.innerHTML = this.template(notes);
        } else {
            alert('no items found!');
        }
    }

    setStatus(event) {
        const noteId = event.target.dataset.noteId;
        const noteCheckbox = event.target.dataset.noteCheckbox;
        const noteChecked = event.target.checked;
        const noteItem = this.shared.getNoteById(noteId);

        if (noteCheckbox === 'finished') {

            noteItem.finished = noteChecked;
            this.shared.updateNote(noteItem.title, noteItem.description, noteItem.importance, noteItem.doneDate, noteItem.finished, noteId);
        }

    }

    orderByFinishDate(allNotes) {
        this.notesFiltered = allNotes.sort(function (a, b) {
            let dateA = a.doneDate, dateB = b.doneDate;

            return dateA < dateB ? -1 : dateA > dateB ? 1 : 0; //ASC: earliest date on top
        });

        this.renderNotes(this.notesFiltered);
    }

    orderByCreateDate(allNotes) {

        this.notesFiltered = allNotes.sort(function (a, b) {
            let dateA = a.createDate, dateB = b.createDate;

            return dateA > dateB ? -1 : dateA < dateB ? 1 : 0; //DESC: newest date on top

        });
        this.renderNotes(this.notesFiltered);
    }

    orderByImportance(allNotes) {

        this.notesFiltered = allNotes.sort(function (a, b) {
            let importanceA = Number(a.importance), importanceB = Number(b.importance);

            return importanceA > importanceB ? -1 : importanceA < importanceB ? 1 : 0; //DESC: most important on top
        });

        this.renderNotes(this.notesFiltered);
    }

    showFinished(allNotes) {

        this.notesFiltered = allNotes.filter(note => note.finished === true);
        this.renderNotes(this.notesFiltered);
    }
}