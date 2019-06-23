
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

        this.filterContainer.addEventListener('click', (event) => {
            if (Boolean(event.target.dataset.filter) === true) {

                const filterBy = event.target.dataset.filterBy;
                const filterType = event.target.dataset.filterType;

                async function() => {await this.renderNotes(

                    this.notesStorage.getNotes(filterBy, filterType)
                )};






            }
        });

        this.listContainer.addEventListener('change', (event) => {
            const noteCheckbox = event.target.dataset.noteCheckbox;
            if (noteCheckbox === 'finished') {
                this.notesStorage.setStatus(event);
            }
        });

        this.styleSwitch.addEventListener('change', (event) => {
            this.styleSwitcher.switchStyle(event);
        });
    }






    async renderNotes(notes) {
        if (notes.length > 0 === true) {

            const noteContainer = document.querySelector('#list-container');
            noteContainer.innerHTML = await this.template(notes);
        } else {
            const noteContainer = document.querySelector('#list-container');
            noteContainer.innerHTML = await 'No items found';
        }
    }

    async noteListAction() {
        this.initEventHandlers();
        //this.renderNotes(this.notesStorage.getNotes());
        await this.renderNotes(await this.noteService.getAllNotes());
        this.styleSwitcher.setStyle(this.styleSwitch);
    }
}