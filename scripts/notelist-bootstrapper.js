import {NoteListController} from './ui/notelist-controller.js';
import {NotesStorage} from "./bl/notes-storage.js";
import {initialData} from "./misc/initialdata.js";
import {getUrlId} from "./utils/utils.js";
import {DataService} from "./dl/data-service.js";
import {StyleSwitcher} from './ui/styleswitch.js';

class NoteListBootstrapper {
    static start() {
        const dataService = new DataService(initialData);
        const notesStorage = new NotesStorage(getUrlId, dataService);
        const styleSwitcher = new StyleSwitcher(dataService);
        new NoteListController(notesStorage, styleSwitcher).noteListAction();
    }
}

document.addEventListener('DOMContentLoaded', NoteListBootstrapper.start);