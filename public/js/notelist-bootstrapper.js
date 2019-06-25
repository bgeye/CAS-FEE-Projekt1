import {NoteListController} from './ui/notelist-controller.js';
import {NotesStorage} from "./bl/notes-storage.js";
import {DataService} from "./services/data-service.js";
import {StyleSwitcher} from './ui/styleswitch.js';

import {noteService} from "./services/note-service.js";

class NoteListBootstrapper {
    static start() {
        const dataService = new DataService();
        const notesStorage = new NotesStorage();
        const styleSwitcher = new StyleSwitcher(dataService);
        new NoteListController(notesStorage, styleSwitcher, noteService).noteListAction();
    }
}

document.addEventListener('DOMContentLoaded', NoteListBootstrapper.start);