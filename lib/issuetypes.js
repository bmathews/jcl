module.exports = function (jira, args) {
    jira.listIssueTypes(function (err, res) {
        console.log("");
        if (!err) {
            res.forEach(function (type) {
                console.log(type.name + "\t\t" + type.description);
            });
        } else {
            console.log(err);
        }
    });
};