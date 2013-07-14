var table = require('./table');

/**
 * Print list of issue types
 * @param  {Object} jira Jira api
 * @param  {Object} args Arguments
 */
module.exports = function (jira, args) {
    jira.listIssueTypes(function (err, res) {
        console.log();

        var rows = [],
            colNames = ['Name', 'Description'];

        res.forEach(function (type) {
            rows.push([type.name, type.description]);
        });

        table(colNames, rows);
    });
};