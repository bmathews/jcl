var basename = require('path').basename;

module.exports = function (jira, args) {
    jira.request({
        uri: jira.makeUri('/issue/' + args.id + "/comment"),
        method: 'GET',
        json: true
    }, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }

        if (res.statusCode === 200) {
            res.body.comments.forEach(function (comment) {
                console.log("\nAuthor: " + comment.author.name);
                console.log("Date:   " + new Date(comment.created));
                console.log("\n" + comment.body.split("\n").map(function (val) { return "\t" + val; }).join('\n'));
            });
            console.log('\n(use "' + basename(process.argv[1]) + ' comment <id> <text>" to add a comment)');
            return;
        }

        console.log(res.statusCode + ': Error while retrieving list.');
    });
};