var basename = require('path').basename,
    Pad = require('pad');

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
            if (res.fields.components && res.fields.components.length) {
                console.log("Components:    " + ((res.fields.components && res.fields.components.length) ? (res.fields.components.map(function (val) { return val.name; }).join(", ")) : "None"));
            }
            if (res.fields.labels && res.fields.labels.length) {
                console.log("Labels:        " + ((res.fields.labels && res.fields.labels.length) ? (res.fields.labels.join(', ')) : "None"));
            }
            if (res.fields.comment.total) {
                console.log("Comments:      " + (res.fields.comment.total));
            }
            if (res.fields.issuelinks.length) {
                console.log("Links:         " + formatLink(args.id, res.fields.issuelinks[0]));
                res.fields.issuelinks.splice(1).forEach(function (link) {
                    console.log(Pad(15, "") + formatLink(args.id, link));
                });
            }
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

function formatLink(id, link) {

    var adj = link.outwardIssue ? link.type.outward : link.type.inward,
        idb = link.outwardIssue ? link.outwardIssue.key : link.inwardIssue.key;
    return id + " " + adj + " " + idb;
    // res.fields.issuelinks[0].outwardIssue.key + " " + res.fields.issuelinks[0].type.outward + " " + res.fields.issuelinks[0].
}