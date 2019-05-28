/**
 * Helper to check and set the importance in note to edit
 */
Handlebars.registerHelper('checkImportance', function(value,importance) {


    if(value === Number(importance)) {
        return 'checked'
    } else {
        return ''
    }

    //value => (value === importance) ? 'checked' : '';

});

/**
 * Helper to check if note has state finished
 */

Handlebars.registerHelper('isFinished', function(value) {


    if(value === true) {
        return 'checked'
    } else {
        return ''
    }

    //value => (value === importance) ? 'checked' : '';

});

/**
 * Helper to format the date for the datepicker in editform
 */
Handlebars.registerHelper('formatDateDatepicker', function(date) {

    return moment(date).format('YYYY-MM-DD')

});

/**
 * Helper to get current date
 */
Handlebars.registerHelper('getCurrentDate', function(date) {

    return moment().format('YYYY-MM-DD')

});





