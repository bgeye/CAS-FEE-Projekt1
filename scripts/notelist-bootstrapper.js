
import {NoteListController} from './ui/notelist-controller.js';
import {Shared} from './shared.js';
import {StyleSwitcher} from './styleswitch.js';

class Bootstrapper {
    static start() {
        const shared = new Shared();
        const styleSwitcher = new StyleSwitcher();
        new NoteListController(shared, styleSwitcher).noteListAction();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);