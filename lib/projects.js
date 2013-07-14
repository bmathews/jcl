var table = require('./table');

module.exports = function (jira, args) {
    jira.listProjects(function (err, res) {
        console.log();

        var rows = [],
            colNames = ['Key', 'Name'];

        res.forEach(function (proj) {
            rows.push([proj.key, proj.name]);
        });

        table(colNames, rows);
    });
};