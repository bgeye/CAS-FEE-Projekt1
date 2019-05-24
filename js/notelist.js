'use strict';

/**
 * array of notes (static)
 */

const notes = [
    {
        "id": "1",
        "title": "Milch holen",
        "description": "Bitte einen Liter Milch in der Migros holen",
        "donedate": "2019-06-01",
        "importance": "1",
        "finished": false
    },
    {
        "id": "2",
        "title": "Butter holen",
        "description": "Bitte einen Butter in der Migros holen",
        "donedate": "2019-06-01",
        "importance": "1",
        "finished": false
    },
    {
        "id": "3",
        "title": "Äpfel holen",
        "description": "Saisonale Sorte berücksichtigen",
        "donedate": "2019-06-20",
        "importance": "5",
        "finished": false
    },
    {
        "id": "4",
        "title": "Termin Wanderung Nicole",
        "description": "Bleiben wir in der Schweiz oder gehen wir weiter weg?",
        "donedate": "2019-07-11",
        "importance": "3",
        "finished": false
    },
    {
        "id": "5",
        "title": "Pneuwechsel",
        "description": "Termin mit Garage vereinbaren",
        "donedate": "2019-08-14",
        "importance": "2",
        "finished": false
    },
    {
        "id": "6",
        "title": "Tickets Open Air",
        "description": "René fragen ob er bereits Tickets organisiert hat?",
        "donedate": "2019-09-02",
        "importance": "4",
        "finished": false
    }
];
const templateSource = document.querySelector('#note-item-template').innerHTML;
const template = Handlebars.compile(templateSource);
const filteredNotes = [];

/**
 * initialize application
 */

init();

function init() {
    renderNotes();
    setEventListeners();
}

function setEventListeners() {
    document.querySelector('#filter-finish-date').addEventListener('click',orderByFinishDate);
    document.querySelector('#filter-create-date').addEventListener('click',orderByCreateDate);
    document.querySelector('#filter-importance').addEventListener('click',orderByImportance);
    document.querySelector('#filter-finished').addEventListener('click',showFinished);
}

function orderByFinishDate() {
    console.log('this is the finish date btn');

}

function orderByCreateDate() {
    console.log('this is the create date btn');
}

function orderByImportance() {
    console.log('this is the importance btn');
}

function showFinished() {
    console.log('this is the finished btn');
}

/**
 * render notes from static array
 * @type {string}
 */


function renderNotes() {
    const noteContainer = document.querySelector('#list-container');
    noteContainer.innerHTML = template(notes);
}


/**
 * get notes from local storage
 * @type {string}
 */

let storedNotes = localStorage.getItem('notes');
if (!storedNotes) {
    localStorage.setItem('notes', JSON.stringify([]));
    storedNotes = localStorage.getItem('notes');
}

storedNotes = JSON.parse(storedNotes);
document.querySelector('#notecount').innerHTML = storedNotes.length;


