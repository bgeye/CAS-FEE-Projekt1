'use strict';

/**
 * save form inputs in local storage
 */






function getNote() {

    let finished = false;
    const newNote = {};

    newNote['id'] = createNewId();
    newNote[document.querySelector('#title').id] = document.querySelector('#title').value;
    newNote[document.querySelector('#description').id] = document.querySelector('#description').value;
    newNote[document.querySelector('input[name="importance"]:checked').name] = document.querySelector('input[name="importance"]:checked').value;
    newNote[document.querySelector('#donedate').id] = new Date(document.querySelector('#donedate').value);
    newNote['createDate'] = Date.now(); //format, use moments.js?
    newNote['finished'] = finished;
    return newNote
}


function save() {
    const notes = JSON.parse(localStorage.getItem('notes'));

    notes.push(getNote());
    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.replace("index.html");
}

function createNewId() {
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes = notes.length + 1;
    return notes.toString();
}