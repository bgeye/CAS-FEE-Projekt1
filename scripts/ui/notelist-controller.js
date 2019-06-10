export class NoteListController {
    constructor(notesStorage, styleSwitcher) {

        this.notesStorage = notesStorage;
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
        this.allNotes = this.notesStorage.getNotes();

    }

    initEventHandlers() {
        this.filterFinishDate.addEventListener('click', () => {
            this.renderNotes(this.notesStorage.orderByFinishDate(this.allNotes));
        });
        this.filterCreateDate.addEventListener('click', () => {
            this.renderNotes(this.notesStorage.orderByCreateDate(this.allNotes));
        });
        this.filterImportance.addEventListener('click', () => {
            this.renderNotes(this.notesStorage.orderByImportance(this.allNotes));
        });
        this.filterFinished.addEventListener('click', () => {
            this.renderNotes(this.notesStorage.showFinished(this.allNotes));
        });
        this.listContainer.addEventListener('change', (event) => {
            this.notesStorage.setStatus(event);
        });
        this.styleSwitch.addEventListener('change', (event) => {
            this.styleSwitcher.switchStyle(event);
        });
    }

    renderNotes(notes) {
        if(notes.length > 0) {
            const noteContainer = document.querySelector('#list-container');
            noteContainer.innerHTML = this.template(notes);
        } else {
            alert('no items found!');
        }
    }

    noteListAction() {
        this.initEventHandlers();
        this.renderNotes(this.allNotes);
        this.styleSwitcher.setStyle();
    }
}