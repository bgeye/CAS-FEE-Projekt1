/**
 * get number of items in local storage
 * @type {string}
 */

let notes = localStorage.getItem('notes');
if(!notes) {
    localStorage.setItem('notes',JSON.stringify([]));
    notes = localStorage.getItem('notes');
}

notes = JSON.parse(notes);
document.querySelector('#notecount').innerHTML = notes.length;