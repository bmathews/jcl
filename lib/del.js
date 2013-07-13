var commander = require('commander');

module.exports = function (jira, args) {
    commander.confirm("Are you sure you want to delete " + args.id + "? y/n ", function (ok) {
        if (ok) {
            jira.deleteIssue(args.id, function (err, res) {
                if (!err) {
                    console.log(res);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log("Cancelled");
        }
        process.stdin.destroy();
    });
};