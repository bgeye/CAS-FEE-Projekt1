export class CreateNoteController {
    constructor(notesStorage, shared, styleSwitcher) {

        this.shared = shared;
        this.notesStorage = notesStorage;
        this.styleSwitcher = styleSwitcher;

        //this.formNote = document.querySelector('#form-note');

        this.templateSource = document.querySelector('#note-item-edit-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        this.noteItem = this.notesStorage.getNoteById(this.shared.getUrlId());

        this.styleSwitch = document.querySelector('#styleswitch');
    }

    initEventHandlers() {
        //to dirty? selector(handlebar template) not available while constructor is executed...
        const formNote = document.querySelector('#form-note');
        formNote.addEventListener('click', (event) => {
            const clickedBtn = event.target.dataset.save;

            if (clickedBtn === 'submit') {
                this.submitNote(event);
            }
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