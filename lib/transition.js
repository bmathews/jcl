module.exports = function (jira, args, cb) {
    var payload = {
            transition: {
                id: args.transitionId
            }
        };

    jira.transitionIssue(args.id, payload, function (err, res) {
        if (!err) {
            console.log(res);
            cb();
        } else {
            console.log(err);
        }
    });
};