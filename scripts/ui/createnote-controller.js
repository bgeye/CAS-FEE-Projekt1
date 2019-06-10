
export class CreateNoteController {
    constructor (notesStorage, shared, styleSwitcher) {

        this.shared = shared;
        this.notesStorage = notesStorage;
        this.styleSwitcher = styleSwitcher;

        //this.formNote = document.querySelector('#form-note');

        this.templateSource = document.querySelector('#note-item-edit-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        this.noteItem = this.notesStorage.getNoteById(this.shared.getUrlId());
    }

    initEventHandlers () {
        //to dirty? selector(handlebar template) not available while constructor is executed...
        const formNote = document.querySelector('#form-note');
        formNote.addEventListener('click', (event) => {this.notesStorage.save(event);});
    }

    renderForm(notes) {

        const formContainer = document.querySelector('#form-container');
        formContainer.innerHTML = this.template(notes);
    }

    createNoteAction() {
        this.renderForm(this.noteItem);
        this.initEventHandlers();
        this.styleSwitcher.setStyle();
    }
}