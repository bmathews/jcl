var Pad = require('pad');

module.exports = function (colNames, rows, splitter) {
    var maxes = [],
        split = splitter || "   ";

    // determine max width for each col
    rows.forEach(function (cols) {
        cols.forEach(function (col, idx) {
            maxes[idx] = Math.max(maxes[idx] || 0, col.length);
        });
    });

    // print header
    if (colNames) {
        var str = "";
        colNames.forEach(function (col, idx) {
            maxes[idx] = Math.max(maxes[idx] || 0, col.length);
            str += Pad(col, maxes[idx]) + (idx < colNames.length - 1 ? split : "");
        });
        console.log(str + "\n");
    }

    // print rows
    rows.forEach(function (cols) {
        var str = "";
        cols.forEach(function (col, idx) {
            str += Pad(col, maxes[idx]) + (idx < colNames.length - 1 ? split : "");
        });
        console.log(str);
    });
};