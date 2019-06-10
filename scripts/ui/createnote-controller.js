
export class CreateNoteController {
    constructor (shared, styleSwitcher) {

        this.shared = shared;
        this.styleSwitcher = styleSwitcher;

        //this.formNote = document.querySelector('#form-note');

        this.templateSource = document.querySelector('#note-item-edit-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        this.noteItem = this.shared.getNoteById(this.shared.getUrlId());
    }

    initEventHandlers () {
        //to dirty? selector(handlebar template) not available while constructor is executed...
        const formNote = document.querySelector('#form-note');
        formNote.addEventListener('click', (event) => {this.shared.save(event);});
    }

    setValuesToEdit(notes) {

        const formContainer = document.querySelector('#form-container');
        formContainer.innerHTML = this.template(notes);
    }

    createNoteAction() {
        this.setValuesToEdit(this.noteItem);
        this.initEventHandlers();
        this.styleSwitcher.setStyle();
    }
}