import {CreateNoteController} from './ui/createnote-controller.js';
import {urlId} from "./utils/utils.js";
import {DataService} from "./dl/data-service.js";
import {NotesStorage} from "./bl/notes-storage.js";
import {StyleSwitcher} from "./ui/styleswitch.js";

class CreateNoteBootstrapper {
    static start() {
        const dataService = new DataService();
        const notesStorage = new NotesStorage(urlId, dataService);
        const styleSwitcher = new StyleSwitcher(dataService);
        new CreateNoteController(notesStorage, urlId, styleSwitcher).createNoteAction();
    }
}

document.addEventListener('DOMContentLoaded', CreateNoteBootstrapper.start);