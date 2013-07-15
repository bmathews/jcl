var table = require('./table');

module.exports = function (jira, args) {
    jira.request({
        uri: jira.makeUri('/issueLinkType'),
        method: 'GET',
        json: true
    }, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }

        console.log();

        if (res.statusCode === 200) {
            var colNames = ['Name', 'Description'],
                rows = [];
            res.body.issueLinkTypes.forEach(function (type) {
                rows.push([type.name, 'A ' + type.outward + ' B']);
            });
            table(colNames, rows);
            return;
        }

        console.log(res.statusCode + ': Error while retrieving list.');
    });
};