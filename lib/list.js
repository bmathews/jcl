var table = require('./table'),
    Pad = require('pad');

/**
 * Print a list of issues
 * @param  {Object} jira   jira api
 * @param  {Object} args   cli args
 */
module.exports = function (jira, args) {
    jira.searchJira(argsToQueryString(args), null, function (err, res) {

        console.log("");

        if (!err) {
            var rows = [],
                colNames = ['ID', 'Status', 'Summary'];

            res.issues.forEach(function (issue) {
                rows.push([issue.key, issue.fields.status.name.substr(0, 1), issue.fields.summary.length > 75 ? issue.fields.summary.substr(0, 71) + " ..." : issue.fields.summary]);
            });

            table(colNames, rows);
        } else {
            console.log(err);
        }
    });
};

function argsToQueryString (args) {
    var queryString = "",
        queries = [];

    if (args.project) queries.push("project=" + args.project);
    if (args.assignee) queries.push("assignee='" + args.assignee + "'");
    if (args.creator) queries.push("reporter='" + args.creator + "'");

    if (args.status) {
        var status = args.status;
        switch (args.status) {
            case "i":
            case "inprogress":
                status = "in progress";
                break;
            case "r":
                status = "resolved";
                break;
            case "c":
                status = "closed";
                break;
            case "o":
                status = "open";
                break;
            default:
                status = args.status;
        }
        queries.push("status='" + status + "'");
    }
    return queryString + queries.join(' AND ');
}