import {CreateNoteController} from './ui/createnote-controller.js';
import {getUrlId} from "./utils/utils.js";
import {DataService} from "./dl/data-service.js";
import {NotesStorage} from "./bl/notes-storage.js";
import {StyleSwitcher} from "./styleswitch.js";

class CreateNoteBootstrapper {
    static start() {
        const dataService = new DataService();
        const notesStorage = new NotesStorage(getUrlId, dataService);
        const styleSwitcher = new StyleSwitcher(dataService);
        new CreateNoteController(notesStorage, getUrlId, styleSwitcher).createNoteAction();
    }
}

document.addEventListener('DOMContentLoaded', CreateNoteBootstrapper.start);