export class NoteListController {
    constructor(notesStorage, styleSwitcher) {

        this.notesStorage = notesStorage;
        this.styleSwitcher = styleSwitcher;

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
                this.renderNotes(

                    this.notesStorage.getNotes(filterBy, filterType)
                );
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

    renderNotes(notes) {
        if (notes.length > 0 === true) {
            const noteContainer = document.querySelector('#list-container');
            noteContainer.innerHTML = this.template(notes);
        } else {
            const noteContainer = document.querySelector('#list-container');
            noteContainer.innerHTML = 'No items found';
        }
    }

    noteListAction() {
        this.initEventHandlers();
        this.renderNotes(this.notesStorage.getNotes());
        this.styleSwitcher.setStyle(this.styleSwitch);
    }
}