
import {NoteListController} from './ui/notelist-controller.js';

import {NotesStorage} from "./bl/notes-storage.js";
import {Shared} from './shared.js';
import {DataService} from "./dl/data-service.js";
import {StyleSwitcher} from './styleswitch.js';

class NoteListBootstrapper {
    static start() {
        const shared = new Shared();
        const dataService = new DataService(shared);
        const notesStorage = new NotesStorage(shared, dataService);
        const styleSwitcher = new StyleSwitcher(dataService);
        new NoteListController(notesStorage, styleSwitcher).noteListAction();
    }
}

document.addEventListener('DOMContentLoaded', NoteListBootstrapper.start);