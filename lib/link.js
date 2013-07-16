var commander = require('commander');

module.exports = function (jira, args) {
    jira.request({
        uri: jira.makeUri('/issueLinkType'),
        method: 'GET',
        json: true
    }, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }

        console.log();

        if (res.statusCode === 200) {
            var links = res.body.issueLinkTypes;
            var choices = links.map(function (link) { return args.ida + " " + link.outward + " " + args.idb; });
            console.log("Choose link type: ");
            commander.choose(choices, function (i) {
                process.stdin.destroy();
                postLink(jira, links[i], args.ida, args.idb);
            });
        } else {
            console.log(res.statusCode + ': Error while retrieving list.');
        }
    });
};

function postLink (jira, link, ida, idb) {
    jira.issueLink({
        type: link,
        inwardIssue: { key: ida },
        outwardIssue: { key: idb }
    }, function (err, res) {
        if (!err) {
            console.log("Success");
        } else {
            console.log(err);
        }
    });
}