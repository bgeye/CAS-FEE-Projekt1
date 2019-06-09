'use strict';

const templateSource = document.querySelector('#note-item-template').innerHTML;
const template = Handlebars.compile(templateSource);
let notesFiltered;
let allNotes;

/**
 * initialize application
 */

init();

function init() {

    allNotes = getNotes();
    renderNotes(allNotes);
    setEventListeners();
}

function setEventListeners() {
    document.querySelector('#filter-finish-date').addEventListener('click', orderByFinishDate);
    document.querySelector('#filter-create-date').addEventListener('click', orderByCreateDate);
    document.querySelector('#filter-importance').addEventListener('click', orderByImportance);
    document.querySelector('#filter-finished').addEventListener('click', showFinished);
    document.querySelector('#list-container').addEventListener('change', setStatus);
}


function setStatus(e) {
    const noteId = e.target.dataset.noteId;
    const noteCheckbox = e.target.dataset.noteCheckbox;
    const noteChecked = e.target.checked;
    const noteItem = getNoteById(noteId);

    if(noteCheckbox === 'finished') {

        noteItem.finished = noteChecked;
        updateNote(noteItem.title,noteItem.description,noteItem.importance,noteItem.doneDate,noteItem.finished,noteId);
    }

}

function orderByFinishDate() {

    notesFiltered = allNotes.sort(function (a, b) {
        let dateA = a.doneDate, dateB = b.doneDate;

        return dateA < dateB ? -1 : dateA > dateB ? 1 : 0; //ASC: earliest date on top
    });

    renderNotes(notesFiltered);
}

function orderByCreateDate() {

    notesFiltered = allNotes.sort(function (a, b) {
        let dateA = a.createDate, dateB = b.createDate;

        return dateA > dateB ? -1 : dateA < dateB ? 1 : 0; //DESC: newest date on top

    });
    renderNotes(notesFiltered);
}

function orderByImportance() {

    notesFiltered = allNotes.sort(function (a, b) {
        let importanceA = Number(a.importance), importanceB = Number(b.importance);

        return importanceA > importanceB ? -1 : importanceA < importanceB ? 1 : 0; //DESC: most important on top
    });

    renderNotes(notesFiltered);
}

function showFinished() {

    notesFiltered = allNotes.filter(note => note.finished === true);
    renderNotes(notesFiltered);
}

/**
 * render notes from static array
 * @type {string}
 */


function renderNotes(notes) {
    const noteContainer = document.querySelector('#list-container');
    noteContainer.innerHTML = template(notes);
}


