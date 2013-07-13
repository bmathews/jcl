var commander = require('commander');

// parse args into a 
module.exports = function (jira, args) {
    var payload = {
        fields: {}
    };

    if (args.interactive || !(args.assignee || args.project || args.summary || args.desc || args.type)) {
        startInteractiveMode(jira, payload);
    } else {
        argsToPayload(jira, args, payload);
    }
};

function startInteractiveMode (jira, payload) {

    function validate (val) {
        if (val.trim()) {
            return true;
        }
        process.stdin.destroy();
    }

    console.log("\nEntering interactive mode. Leave blank to skip\n");

    commander.prompt("Project: <required> ", function (val) {
        if (!validate(val)) return;
        payload.fields.project = { key: val };
        commander.prompt("Issue Type: <required> ", function (val) {
            if (!validate(val)) return;
            payload.fields.issuetype = { name: val };
            commander.prompt("Summary: <required> ", function (val) {
                if (!validate(val)) return;
                payload.fields.summary = val;
                commander.prompt("Description: ", function (val) {
                    payload.fields.description = val;
                    commander.prompt("Assignee: ", function (val) {
                        if (val.trim()) {
                           payload.fields.assignee = { name: val };
                        }
                        confirm(jira, payload);
                    });
                });
            });
        });
    });
}

function argsToPayload (jira, args, payload) {
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

        if (args.assignee) { payload.fields.assignee = { name: args.assignee }; }
        if (args.project) { payload.fields.project = { key: args.project }; }
        if (args.summary) { payload.fields.summary = args.summary; }
        if (args.desc) { payload.fields.description = args.desc; }
        if (args.type) { payload.fields.issuetype = { name: args.type }; }

        confirm(jira, payload);
}

// based off the created payload, prompt the user for confirmation
function confirm (jira, payload) {
    console.log("\nProject:     " + payload.fields.project.key);
    console.log("Assignee:    " + (payload.fields.assignee ? payload.fields.assignee.name : "none"));
    console.log("Issue Type:  " + payload.fields.issuetype.name);
    console.log("\nSummary:\n" + payload.fields.summary);
    console.log("\nDescription:\n" + (payload.fields.description || ""));

    commander.confirm('\nDoes this look right? y/n: ', function (ok) {
        if (ok) {
            console.log("\nSending!\n");

            jira.addNewIssue(payload, function (err, res) {
                if (!err) {
                    console.log("");
                    console.log("Created " + res.key);
                    console.log(res.self);
                    console.log("");
                } else {
                    console.log(err);
                }
            });

        } else {
            console.log("\nCancelled!");
        }
        process.stdin.destroy();
     });
}
