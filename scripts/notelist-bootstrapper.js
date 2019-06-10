
import {NoteListController} from './ui/notelist-controller.js';

import {NotesStorage} from "./dl/notes-storage.js";

import {Shared} from './shared.js';
import {StyleSwitcher} from './styleswitch.js';

class Bootstrapper {
    static start() {
        const shared = new Shared();
        const notesStorage = new NotesStorage(shared);
        const styleSwitcher = new StyleSwitcher();
        new NoteListController(notesStorage, styleSwitcher).noteListAction();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);