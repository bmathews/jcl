module.exports = function (jira, args) {
    jira.listProjects(function (err, res) {
        console.log("");
        res.forEach(function (proj) {
            console.log(proj.key + "\t" + proj.name);
        });
    });
};