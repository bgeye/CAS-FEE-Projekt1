import {CreateNoteController} from './ui/createnote-controller.js';
import {Shared} from "./shared.js";
import {NotesStorage} from "./bl/notes-storage.js";
import {StyleSwitcher} from "./styleswitch.js";

class Bootstrapper {
    static start() {
        const shared = new Shared();
        const notesStorage = new NotesStorage(shared);
        const styleSwitcher = new StyleSwitcher();
        new CreateNoteController(notesStorage, shared, styleSwitcher).createNoteAction();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);