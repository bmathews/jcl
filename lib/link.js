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
    var options = {
        rejectUnauthorized: this.strictSSL,
        uri: jira.makeUri('/issueLink'),
        method: 'POST',
        followAllRedirects: true,
        json: true,
        body: {
            type: link,
            inwardIssue: { key: ida },
            outwardIssue: { key: idb }
        }
    };

    jira.request(options, function(error, response) {

        if (error) {
            console.log(error);
            return;
        }

        if (response.statusCode >= 400) {
            console.log('Error!');
        }
    });
}