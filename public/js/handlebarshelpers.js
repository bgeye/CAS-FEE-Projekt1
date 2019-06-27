/**
 * Check and set the importance in note to edit
 */
Handlebars.registerHelper('checkImportance', function (value, importance) {

    if (value === Number(importance)) {
        return 'checked'
    } else {
        return ''
    }
});

/**
 * Check if note has state finished
 */
Handlebars.registerHelper('isFinished', function (value) {
    if (Boolean(value) === true) {
        return 'checked'
    } else {
        return ''
    }
});


/**
 * Get current date
 */
Handlebars.registerHelper('getCurrentDate', function (format) {

    return moment().format(format)

});

/**
 * Format Date
 */
Handlebars.registerHelper('formatDate', function (date, format) {

    var mmt = moment(date);
    return mmt.format(format)

});


/**
 * Render icons to visualize importance
 */
Handlebars.registerHelper('iconStar', function (value, block) {
    let accum = '';
    for (let i = 0; i < value; ++i)
        accum += block.fn(i);
    return accum;
});






