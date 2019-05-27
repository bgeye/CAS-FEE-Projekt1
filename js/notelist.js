'use strict';

/**
 * array of notes (static)
 */

const notesOrigin = [
    {
        id: "1",
        title: "Milch holen",
        description: "Bitte einen Liter Milch in der Migros holen",
        donedate: "2019-06-01T00:00:00.000Z",
        createdate: "1558716364511",
        importance: "1",
        finishe: false
    },
    {
        id: "2",
        title: "Butter holen",
        description: "Bitte einen Butter in der Migros holen",
        donedate: "2019-04-01T00:00:00.000Z",
        createdate: "1358716364511",
        importance: "1",
        finished: false
    },
    {
        id: "3",
        title: "Äpfel holen",
        description: "Saisonale Sorte berücksichtigen",
        donedate: "2019-02-20T00:00:00.000Z",
        createdate: "1158716364511",
        importance: "5",
        finished: true
    },
    {
        id: "4",
        title: "Termin Wanderung Nicole",
        description: "Bleiben wir in der Schweiz oder gehen wir weiter weg?",
        donedate: "2019-07-11T00:00:00.000Z",
        createdate: "1518716364511",
        importance: "3",
        finished: false
    },
    {
        id: "5",
        title: "Pneuwechsel",
        description: "Termin mit Garage vereinbaren",
        donedate: "2019-08-14T00:00:00.000Z",
        createdate: "2558716364511",
        importance: "2",
        finished: false
    },
    {
        id: "6",
        title: "Tickets Open Air",
        description: "René fragen ob er bereits Tickets organisiert hat?",
        donedate: "2019-09-02T00:00:00.000Z",
        createdate: "1958716364511",
        importance: "4",
        finished: false
    }
];
const templateSource = document.querySelector('#note-item-template').innerHTML;
const template = Handlebars.compile(templateSource);
let notesFiltered;

/**
 * initialize application
 */

init();

function init() {

    notesFiltered = getNotes();
    renderNotes(notesFiltered);
    setEventListeners();
}

function setEventListeners() {
    document.querySelector('#filter-finish-date').addEventListener('click', orderByFinishDate);
    document.querySelector('#filter-create-date').addEventListener('click', orderByCreateDate);
    document.querySelector('#filter-importance').addEventListener('click', orderByImportance);
    document.querySelector('#filter-finished').addEventListener('click', showFinished);
}

function orderByFinishDate() {
    notesFiltered = [...notesOrigin].sort(function (a, b) {
        let dateA = new Date(a.donedate), dateB = new Date(b.donedate);

        return dateA - dateB;   //nearest date
    });

    renderNotes(notesFiltered);
}

function orderByCreateDate() {
    notesFiltered = [...notesOrigin].sort(function (a, b) {
        let dateA = a.createdate, dateB = b.createdate;
        return dateA - dateB;   //nearest date
    });

    renderNotes(notesFiltered);
}

function orderByImportance() {
    notesFiltered = [...notesOrigin].sort(function (a, b) {
        let importanceA = a.importance, importanceB = b.importance;
        return Number(importanceB) - Number(importanceA); //most important on top
    });

    renderNotes(notesFiltered);
}

function showFinished() {
    notesFiltered = [...notesOrigin].filter(note => note.finished === true);
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


/**
 * get notes
 * @returns {any}
 */


function getNotes() {

    let noteItems = JSON.parse(localStorage.getItem('notes'));
    if (!noteItems) {
        localStorage.setItem('notes', JSON.stringify(notesOrigin)); //set static array from this file
        noteItems = localStorage.getItem('notes');
    }

    return noteItems
}


