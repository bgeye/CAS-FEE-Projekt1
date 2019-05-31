'use strict';


init();

function init() {
    // if(getUrlId()) {
        const templateSource = document.querySelector('#note-item-edit-template').innerHTML;
        const template = Handlebars.compile(templateSource);
        let noteItem = getNoteById(getUrlId());
        setValuesToEdit(noteItem);
        function setValuesToEdit(notes) {
            const formContainer = document.querySelector('#form-container');
            formContainer.innerHTML = template(notes);
        }
    // }
    setEventListeners();


}


function setEventListeners() {
    document.querySelector('#form-submit').addEventListener('click', save);

}


function getNote() {

    let finished = false;
    const newNote = {};

    newNote['id'] = createNewId();
    newNote[document.querySelector('#title').id] = document.querySelector('#title').value;
    newNote[document.querySelector('#description').id] = document.querySelector('#description').value;
    newNote[document.querySelector('input[name="importance"]:checked').name] = document.querySelector('input[name="importance"]:checked').value;
    newNote[document.querySelector('#donedate').id] = new Date(document.querySelector('#donedate').value);
    newNote['createDate'] = new Date(); //format, use moments.js?
    newNote['finished'] = finished;
    return newNote
}


function save(e) {
    e.preventDefault();
    const notes = getNotesFromLocalStorage();

    //update
    if(getUrlId()) {
        const noteIndex = getNoteIndexById(getUrlId());
        let noteItem = getNoteById(getUrlId());
        let editedNote = getNote();
        noteItem.title = editedNote.title;
        noteItem.description = editedNote.description;
        noteItem.importance = editedNote.importance;
        noteItem.donedate = editedNote.donedate;
        const notes = getNotesFromLocalStorage();
        notes[noteIndex] = noteItem;
        localStorage.setItem('notes', JSON.stringify(notes));

    } else {
        //create new
        notes.push(getNote());
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    window.location.replace("index.html");
}


function getNoteById(noteId) {
    const notes = getNotesFromLocalStorage();
    let noteItem = notes.find(note => note.id === noteId);

    return noteItem
}

function getNoteIndexById(noteId) {
    const notes = getNotesFromLocalStorage();
    let noteIndex = notes.findIndex(note => note.id === noteId);
    return noteIndex
}



//only temporary
function createNewId() {
    let notes = getNotesFromLocalStorage();
    notes = notes.length + 1;
    return notes.toString();
}






function getUrlId() {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const id = searchParams.get('id');

    return id
}

function getNotesFromLocalStorage() {

    return JSON.parse(localStorage.getItem('notes'));
}


