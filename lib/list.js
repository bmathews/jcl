var request = require('request'),
    Table = require('cli-table');

module.exports = function (config, args) {
    var queryString = "search?jql=";
    var queries = [];

    if (args.project) {
        queries.push("project=" + args.project);
    }

    if (args.assignee) {
        queries.push("assignee='" + args.assignee + "'");
    }

    if (args.creator) {
        queries.push("reporter='" + args.creator + "'");
    }

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

    // if no args, just get all for current user
    if (!args.project && !args.assignee && !args.creator && !args.status) {
        queries.push("assignee='" + config.auth.user + "'");
    }

    request.get(config.rootAPI + queryString + queries.join('+and+'), { auth: config.auth }, function (err, res, body) {
        var data = JSON.parse(body),
            table;

        console.log("");

        if (args.format) {
            table = new Table({
                head: ['Key', 'Status', 'Summary'],
                colWidths: [15, 15, 50]
            });
        }

        data.issues.forEach(function (issue) {
            if (args.format) {
                table.push([
                    issue.key,
                    issue.fields.status.name,
                    issue.fields.summary
                ]);
            } else {
                var out = "";
                out += issue.key;
                out += "\t" + issue.fields.status.name.substr(0, 1);
                out += "   " + issue.fields.summary.substr(0, 75);
                console.log(out);
            }
        });

        if (args.format) {
            console.log(table.toString());
        }
    });
}