var table = require('./table'),
    Pad = require('pad'),
    basename = require('path').basename;

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
                colNames = ['ID', 'Summary', 'Status'];

            if (!args.assignee) colNames.splice(3, 0, 'Assignee');

            res.issues.forEach(function (issue) {
                var row = [
                    issue.key,
                    issue.fields.summary.length > 70 ? issue.fields.summary.substr(0, 66) + " ..." : issue.fields.summary,
                    issue.fields.status.name
                ];

                if (!args.assignee) row.splice(3, 0, issue.fields.assignee ? issue.fields.assignee.name : "");

                rows.push(row);
            });

            table(colNames, rows);
            console.log('\n(use "' + basename(process.argv[1]) + ' show <id>"  to view an issue)');
            console.log('(use "' + basename(process.argv[1]) + ' take <id>"  to assign an issue to yourself)');
            console.log('(use "' + basename(process.argv[1]) + ' start <id>" to set an issue to in progress and assign to yourself)');
            console.log('(use "' + basename(process.argv[1]) + ' list -h" for list options)');
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
    if (args.reporter) queries.push("reporter='" + args.reporter + "'");
    if (args.unresolved) queries.push("status in (" + ['Open', '"In Progress"', 'Reopened'].join(",") + ")");
    if (args.query) queries.push('(summary ~ "' + args.query + '"' + ' OR description ~ "' + args.query + '"' + ' OR comment ~ "' + args.query + '")');
    if (args.open) args.status = "o";

    if (args.status && !args.unresolved && !args.open) {
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