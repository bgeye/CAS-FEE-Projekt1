'use strict';

/**
 * save form inputs in local storage
 */



function getNote() {

    let finished = false;
    const newNote = {};

    newNote[document.querySelector('#title').id] = document.querySelector('#title').value;
    newNote[document.querySelector('#description').id] = document.querySelector('#description').value;
    newNote[document.querySelector('input[name="importance"]:checked').name] = document.querySelector('input[name="importance"]:checked').value;
    newNote[document.querySelector('#donedate').id] = document.querySelector('#donedate').value;
    newNote['finished'] = finished;

    return newNote
}


function save() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    notes.push(getNote());
    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.replace("index.html");
}