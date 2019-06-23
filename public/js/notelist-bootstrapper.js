import {NoteListController} from './ui/notelist-controller.js';
import {NotesStorage} from "./bl/notes-storage.js";
import {initialData} from "./misc/initialdata.js";
import {urlId} from "./utils/utils.js";
import {DataService} from "./services/data-service.js";
import {StyleSwitcher} from './ui/styleswitch.js';

import {noteService} from "./services/note-service.js";

class NoteListBootstrapper {
    static start() {
        const dataService = new DataService(initialData);
        //const notesStorage = new NotesStorage(urlId, dataService);
        const notesStorage = new NotesStorage(urlId, noteService);
        const styleSwitcher = new StyleSwitcher(dataService);
        new NoteListController(notesStorage, styleSwitcher, noteService).noteListAction();
    }
}

document.addEventListener('DOMContentLoaded', NoteListBootstrapper.start);