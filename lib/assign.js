module.exports = function (jira, args) {
    jira.request({
        uri: jira.makeUri('/issue/' + args.id),
        method: 'PUT',
        json: true,
        body: {
            fields: {
                assignee: {
                    name: args.user
                }
            }
        }
    }, function (err, res) {
        if (!err) {
            if (res.statusCode === 204) {
                console.log("Success");
            } else {
                console.log(res);
            }
        } else {
            console.log(err);
        }
    });
};