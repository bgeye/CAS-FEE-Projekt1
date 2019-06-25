
export class NoteListController {
    constructor(notesStorage, styleSwitcher, noteService) {
        this.notesStorage = notesStorage;
        this.styleSwitcher = styleSwitcher;
        this.noteService = noteService;

        this.templateSource = document.querySelector('#note-item-template').innerHTML;
        this.template = Handlebars.compile(this.templateSource);

        this.filterContainer = document.querySelector('#filter-container');
        this.listContainer = document.querySelector('#list-container');

        this.styleSwitch = document.querySelector('#styleswitch');

    }

    initEventHandlers() {

        this.filterContainer.addEventListener('click', async (event) => {
            await this.filterNotes(event);
        });

        this.listContainer.addEventListener('change', async (event) => {

            await this.changeState(event);
        });

        this.styleSwitch.addEventListener('change', async (event) => {
            await this.styleSwitcher.switchStyle(event);
        });
    }





    async filterNotes (event) {
        if (Boolean(event.target.dataset.filter) === true) {

            const filterBy = event.target.dataset.filterBy;
            const noteStatus = event.target.dataset.noteStatus;
            await this.renderNotes(
                await this.noteService.getAllNotes(filterBy, noteStatus)
            )
        }
    }

    async changeState(event) {
        const noteCheckbox = event.target.dataset.noteCheckbox;

        if (noteCheckbox === 'finished') {
            const statusInfo = await this.notesStorage.prepareStatusInfo(event);
            await this.noteService.updateNoteStatus(statusInfo.id, statusInfo.noteChecked);
            //await this.notesStorage.setStatus(event);
        }
    }

    async renderNotes(notes) {
        if (notes.length > 0 === true) {

            this.listContainer.innerHTML = await this.template(notes);
        } else {
            this.listContainer.innerHTML = await 'No items found';
        }
    }

    async noteListAction() {
        this.initEventHandlers();
        await this.renderNotes(await this.noteService.getAllNotes());
        this.styleSwitcher.setStyle(this.styleSwitch);
    }
}