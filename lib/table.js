var Pad = require('pad');

module.exports = function (colNames, rows, splitter) {
    var maxes = [],
        split = splitter || "   ";

    rows.forEach(function (cols) {
        cols.forEach(function (col, idx) {
            maxes[idx] = Math.max(maxes[idx] || 0, col.length);
        });
    });

    if (colNames) {
        var str = "";
        colNames.forEach(function (col, idx) {
            str += Pad(col.substr(0, maxes[idx]), maxes[idx]) + (idx < colNames.length - 1 ? split : "");
        });
        console.log(str + "\n");
    }

    rows.forEach(function (cols) {
        var str = "";
        cols.forEach(function (col, idx) {
            str += Pad(col, maxes[idx]) + (idx < colNames.length - 1 ? split : "");
        });
        console.log(str);
    });
};