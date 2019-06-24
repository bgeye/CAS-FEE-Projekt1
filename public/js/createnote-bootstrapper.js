import {CreateNoteController} from './ui/createnote-controller.js';
import {urlId} from "./utils/utils.js";
import {DataService} from "./services/data-service.js";
import {NotesStorage} from "./bl/notes-storage.js";
import {StyleSwitcher} from "./ui/styleswitch.js";

import {noteService} from "./services/note-service.js";

class CreateNoteBootstrapper {
    static start() {
        const dataService = new DataService();
        const notesStorage = new NotesStorage(urlId, dataService);
        const styleSwitcher = new StyleSwitcher(dataService);
        new CreateNoteController(notesStorage, urlId, styleSwitcher, noteService).createNoteAction();
    }
}

document.addEventListener('DOMContentLoaded', CreateNoteBootstrapper.start);