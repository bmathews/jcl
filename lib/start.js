module.exports = function (jira, args) {
    jira.transitionIssue(args.id, {
        transition: {
            id: 4
        }
    }, function (err, res) {
        if (!err) {
            console.log(res);
        } else {
            console.log(err);
        }
    });
};