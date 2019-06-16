import {CreateNoteController} from './ui/createnote-controller.js';
import {Shared} from "./shared.js";
import {DataService} from "./dl/data-service.js";
import {NotesStorage} from "./bl/notes-storage.js";
import {StyleSwitcher} from "./styleswitch.js";

class CreateNoteBootstrapper {
    static start() {
        const shared = new Shared();
        const dataService = new DataService();
        const notesStorage = new NotesStorage(shared, dataService);
        const styleSwitcher = new StyleSwitcher(dataService);
        new CreateNoteController(notesStorage, shared, styleSwitcher).createNoteAction();
    }
}

document.addEventListener('DOMContentLoaded', CreateNoteBootstrapper.start);