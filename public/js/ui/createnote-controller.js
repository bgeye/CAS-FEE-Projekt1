export class CreateNoteController {
    constructor(notesStorage, urlId, styleSwitcher, noteService) {

        this.getUrlId = urlId;

        this.notesStorage = notesStorage;
        this.styleSwitcher = styleSwitcher;
        this.noteService = noteService;

        this.templateSource = document.querySelector('#note-item-edit-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        if (this.getUrlId()) {
            //this.noteItem = this.notesStorage.getNoteById(this.getUrlId());
            //this.noteItem = this.noteService.getNote(this.getUrlId())
        }

        this.noteItem = this.checkUrl();

        this.styleSwitch = document.querySelector('#styleswitch');
    }

    initEventHandlers() {
        const formNote = document.querySelector('#form-note');
        formNote.addEventListener('submit', async (event) => {
                event.preventDefault();
                await this.submitNote();
        });
    }

    async checkUrl (){
        if(this.getUrlId()) {
            this.noteItem = await this.noteService.getNote(this.getUrlId());
            return this.noteItem;
        }
    }

    async submitNote() {
        const noteTitle = document.querySelector('#title').value || '';
        const noteDescription = document.querySelector('#description').value || '';
        const noteImportance = document.querySelector('input[name="importance"]:checked').value;
        const noteDoneDate = new Date(document.querySelector('#donedate').value);
        const noteFinished = (document.querySelector('input[name="finished"]').value === "true");
        //const notes = this.notesStorage.addNote(event, noteTitle, noteDescription, noteImportance, noteDoneDate, noteFinished);
        //this.notesStorage.saveNotes(notes);
        const note = await this.notesStorage.prepareNote(noteTitle, noteDescription, noteImportance, noteDoneDate, noteFinished);
        await this.noteService.createNote(note);
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

    async createNoteAction() {


        //await this.renderForm(await this.noteService.getNote(this.getUrlId()));
        await this.renderForm(await this.noteItem);
        await this.initEventHandlers();
        await this.styleSwitcher.setStyle(this.styleSwitch);
    }
}