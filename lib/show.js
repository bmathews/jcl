var basename = require('path').basename;

module.exports = function (jira, args) {
    jira.findIssue(args.id, function (err, res) {
        if (!err) {
            console.log("");
            console.log("Assignee:      " + (res.fields.assignee ? res.fields.assignee.displayName : "None"));
            console.log("Reporter:      " + res.fields.reporter.displayName);
            console.log("");
            console.log("Status:        " + res.fields.status.name);
            console.log("Priority:      " + res.fields.priority.name);
            console.log("Type:          " + res.fields.issuetype.name);
            console.log("Components:    " + ((res.fields.components && res.fields.components.length) ? (res.fields.components.map(function (val) { return val.name; }).join(", ")) : "None"));
            console.log("Labels:        " + ((res.fields.labels && res.fields.labels.length) ? (res.fields.labels.join(', ')) : "None"));
            console.log("Comments:      " + (res.fields.comment.total));
            console.log("");
            console.log("Summary:");
            console.log(res.fields.summary);
            console.log("");
            console.log("Description:");
            console.log(res.fields.description || "No description");

            if (res.fields.comment.total) {
                console.log('\n(use "' + basename(process.argv[1]) + ' comments ' + res.key + '" to view comments)');
            }
        } else {
            console.log(err);
        }
    });
};