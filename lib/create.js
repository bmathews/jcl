var request = require('request'),
    commander = require('commander');

var confirm = function (data) {
	console.log("\nProject:     " + data.fields.project.key);
    console.log("Assignee:    " + (data.fields.assignee ? data.fields.assignee.name : "none"));
    console.log("Issue Type:  " + data.fields.issuetype.name);
    console.log("\nSummary:\n" + data.fields.summary);
    console.log("\nDescription:\n" + (data.fields.description || ""));

    commander.confirm('\nDoes this look right? y/n: ', function (ok) {
        if (ok) {
            console.log("\nSending!\n");

            request.post({
                uri: config.rootAPI + "issue/",
                json: data,
                auth: config.auth
            }, function (err, res, body) {
                if (err) {
                    console.log("");
                    console.log("Created " + body.key);
                    console.log(body.self);
                    console.log("");
                } else {
                    console.log(body);
                }
            });
        } else {
            console.log("\nCancelled!");
        }
        process.stdin.destroy();
     });
};

module.exports = function (config, args) {
	var data = {
        fields: {}
    };

    var validate = function (val) {
        if (val.trim()) {
            return true;
        }
        process.stdin.destroy();
    };

    if (args.interactive || !(args.assignee || args.project || args.summary || args.desc || args.type)) {
        console.log("\nEntering interactive mode. Leave blank to skip\n");

        commander.prompt("Project: <required> ", function (val) {
            if (!validate(val)) return;
            data.fields.project = { key: val };
            commander.prompt("Issue Type: <required> ", function (val) {
                if (!validate(val)) return;
                data.fields.issuetype = { name: val };
                commander.prompt("Summary: <required> ", function (val) {
                    if (!validate(val)) return;
                    data.fields.summary = val;
                    commander.prompt("Description: ", function (val) {
                        data.fields.description = val;
                        commander.prompt("Assignee: ", function (val) {
                            if (val.trim()) {
                               data.fields.assignee = { name: val };
                            }
                            confirm(data);
                        });
                    });
                });
            });
        });
    } else {

        if (!args.summary) {
            console.log("Summary required");
            return false;
        }

        if (!args.project) {
            console.log("Project required");
            return false;
        }

        if (!args.type) {
            console.log("Issue type required");
            return false;
        }

        if (args.assignee) { data.fields.assignee = { name: args.assignee }; }
        if (args.project) { data.fields.project = { key: args.project }; }
        if (args.summary) { data.fields.summary = args.summary; }
        if (args.desc) { data.fields.description = args.desc; }
        if (args.type) { data.fields.issuetype = { name: args.type }; }

        confirm(data);
    }
};