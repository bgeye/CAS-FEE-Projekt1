
import {CreateNoteController} from './ui/createnote-controller.js';
import {Shared} from "./shared.js";
import {StyleSwitcher} from "./styleswitch.js";

class Bootstrapper {
    static start() {
        const shared = new Shared();
        const styleSwitcher = new StyleSwitcher();
        new CreateNoteController(shared,styleSwitcher).createNoteAction();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);