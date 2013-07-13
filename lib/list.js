var Table = require('cli-table');

/**
 * Fetch and print a list of issues
 * @param  {Object} jira   jira api
 * @param  {Object} args   cli args
 */
module.exports = function (jira, args) {
    jira.searchJira(argsToQueryString(args), null, function (err, res) {

        console.log("");

        if (!err) {
            if (args.format) {
                var table = new Table({
                    head: ['Key', 'Status', 'Summary'],
                    colWidths: [15, 15, 50]
                });
                res.issues.forEach(function (issue) {
                    table.push([ issue.key, issue.fields.status.name, issue.fields.summary ]);
                });
                console.out(table.toString());
            } else {
                res.issues.forEach(function (issue) {
                    var out = "";
                    out += issue.key;
                    out += "\t" + issue.fields.status.name.substr(0, 1);
                    out += "   " + issue.fields.summary.substr(0, 75);
                    console.log(out);
                });
            }
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
    return queryString + queries.join('+and+');
}