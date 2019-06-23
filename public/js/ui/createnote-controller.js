export class CreateNoteController {
    constructor(notesStorage, urlId, styleSwitcher) {

        this.getUrlId = urlId;

        this.notesStorage = notesStorage;
        this.styleSwitcher = styleSwitcher;

        this.templateSource = document.querySelector('#note-item-edit-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        if (this.getUrlId()) {
            this.noteItem = this.notesStorage.getNoteById(this.getUrlId());
        }

        this.styleSwitch = document.querySelector('#styleswitch');
    }

    initEventHandlers() {
        const formNote = document.querySelector('#form-note');
        formNote.addEventListener('submit', (event) => {
                event.preventDefault();
                this.submitNote(event);
        });
    }

    submitNote(event) {
        const noteTitle = document.querySelector('#title').value || '';
        const noteDescription = document.querySelector('#description').value || '';
        const noteImportance = document.querySelector('input[name="importance"]:checked').value;
        const noteDoneDate = new Date(document.querySelector('#donedate').value);
        const noteFinished = (document.querySelector('input[name="finished"]').value === "true");
        const notes = this.notesStorage.addNote(event, noteTitle, noteDescription, noteImportance, noteDoneDate, noteFinished);
        this.notesStorage.saveNotes(notes);
        this.changeUrlLocation();
    }

    changeUrlLocation() {
        const targetLocation = 'index.html';
        window.location.replace(targetLocation);
    }

    renderForm(notes) {

        const formContainer = document.querySelector('#form-container');
        formContainer.innerHTML = this.template(notes);
    }

    createNoteAction() {


        this.renderForm(this.noteItem);
        this.initEventHandlers();
        this.styleSwitcher.setStyle(this.styleSwitch);
    }
}