var request = require('request');

module.exports = function (config, args) {
	request.get(config.rootAPI + "issue/" + args.id, { auth: config.auth }, function (err, res, body) {
        var data = JSON.parse(body);
        if (!err) {
            console.log("");
            console.log("Assignee: " + (data.fields.assignee ? data.fields.assignee.displayName : "n/a"));
            console.log("Creator:  " + data.fields.reporter.displayName);
            console.log("");
            console.log("Status:   " + data.fields.status.name);
            console.log("Priority: " + data.fields.priority.name);
            console.log("Type:     " + data.fields.issuetype.name);
            console.log("");
            console.log("Summary:");
            console.log(data.fields.summary);
            console.log("");
            console.log("Description:");
            console.log(data.fields.description);
        } else {
            console.log(data);
        }
    });
};