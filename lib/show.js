module.exports = function (jira, args) {
    jira.findIssue(args.id, function (err, res) {
        if (!err) {
            console.log("");
            console.log("Assignee:      " + (res.fields.assignee ? res.fields.assignee.displayName : "n/a"));
            console.log("Creator:       " + res.fields.reporter.displayName);
            console.log("");
            console.log("Status:        " + res.fields.status.name);
            console.log("Priority:      " + res.fields.priority.name);
            console.log("Type:          " + res.fields.issuetype.name);
            console.log("Components:    " + (res.fields.components.map(function (val) { return val.name; }).join(", ")));
            console.log("");
            console.log("Summary:");
            console.log(res.fields.summary);
            console.log("");
            console.log("Description:");
            console.log(res.fields.description);
        } else {
            console.log(err);
        }
    });
};