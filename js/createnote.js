'use strict';


init();

function init() {
    const templateSource = document.querySelector('#note-item-edit-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    let noteItem = getNoteById(getUrlId());
    setValuesToEdit(noteItem);

    function setValuesToEdit(notes) {
        const formContainer = document.querySelector('#form-container');
        formContainer.innerHTML = template(notes);
    }

    setEventListeners();


}


function setEventListeners() {
    document.querySelector('#form-note').addEventListener('click', save);
    // document.querySelector('#form-submit').addEventListener('click', save);
}








