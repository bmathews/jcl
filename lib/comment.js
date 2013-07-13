/**
 * Add a comment to an issue
 * @param  {Object} jira Jira api
 * @param  {Object} args Arguments (id, comment)
 */
module.exports = function (jira, args) {
    jira.addComment(args.id, args.comment, function (err, res) {
        if (!err) {
            console.log(res);
        } else {
            console.log(err);
        }
    });
};