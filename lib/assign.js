module.exports = function (jira, args) {
    var body = {
        fields: {
            assignee: null
        }
    };

    if (args.user) body.fields.assignee = { name: args.user };

    jira.request({
        uri: jira.makeUri('/issue/' + args.id),
        method: 'PUT',
        json: true,
        body: body
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