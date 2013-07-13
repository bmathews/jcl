module.exports = function (jira, args) {
    jira.addComment(args.id, args.comment, function (err, res) {
        if (!err) {
            console.log(res);
        } else {
            console.log(err);
        }
    });
};