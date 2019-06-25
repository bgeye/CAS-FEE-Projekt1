export class CreateNoteController {
    constructor(notesStorage, urlId, styleSwitcher, noteService) {

        this.notesStorage = notesStorage;
        this.styleSwitcher = styleSwitcher;
        this.noteService = noteService;

        this.getUrlId = urlId;
        this.urlId = this.getUrlId();
        this.noteItem = this.getNoteById();

        this.templateSource = document.querySelector('#note-item-edit-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        this.styleSwitch = document.querySelector('#styleswitch');
    }

    initEventHandlers() {
        const formNote = document.querySelector('#form-note');
        formNote.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this.submitNote();
        });
    }

    async getNoteById() {
        if (this.urlId) {
            return await this.noteService.getNote(this.urlId);
        }
    }

    async submitNote() {
        const noteTitle = document.querySelector('#title').value || '';
        const noteDescription = document.querySelector('#description').value || '';
        const noteImportance = document.querySelector('input[name="importance"]:checked').value;
        const noteDoneDate = new Date(document.querySelector('#donedate').value);
        const noteFinished = (document.querySelector('input[name="finished"]').value === "true");
        const note = await this.notesStorage.prepareNote(noteTitle, noteDescription, noteImportance, noteDoneDate, noteFinished);
        await this.saveNote(note);
        this.changeUrlLocation();
    }

    async saveNote(note) {
        if (this.urlId) {
            await this.noteService.updateNote(this.urlId, note);

        } else {
            await this.noteService.createNote(note);
        }
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

        await this.renderForm(await this.noteItem);
        this.initEventHandlers();
        this.styleSwitcher.setStyle(this.styleSwitch);
    }
}