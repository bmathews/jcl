module.exports = function (jira, args, cb) {
    var payload = {
            transition: {
                id: args.transitionId
            }
        };

    jira.transitionIssue(args.id, payload, function (err, res) {
        if (!err) {
            if (cb) {
                cb(res);
            } else {
                console.log(res);
            }
        } else {
            console.log(err);
        }
    });
};