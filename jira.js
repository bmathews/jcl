var commander = require('commander'),
    JiraApi = require('jira').JiraApi;

var userConf = require('./config'),
    show = require('./lib/show'),
    create = require('./lib/create'),
    list = require('./lib/list'),
    projects = require('./lib/projects'),
    issuetypes = require('./lib/issuetypes'),
    comment = require('./lib/comment'),
    del = require('./lib/del'),
    transition = require('./lib/transition'),
    assign = require('./lib/assign');

var jira = new JiraApi(userConf.protocol, userConf.host, userConf.port, userConf.user, userConf.password, '2');

commander
    .command('projects')
    .description('list all projects')
    .action(function (args) {
        projects(jira, args);
    });
commander
    .command('issuetypes')
    .description('list all issue types\n')
    .action(function (args) {
        issuetypes(jira, args);
    });
commander
    .command('list')
    .description('list issues')
    .option('-a, --assignee <user>', "Filter list by assignee")
    .option('-p, --project <project>', "Filter list by project")
    .option('-c, --creator <user>', "Filter list by creator")
    .option('-s, --status <o|c|r|i>', "Filter list by status")
    .option('-f, --format', "format as table")
    .action(function (args) {
        list(jira, args);
    });
commander
    .command('create')
    .description('create an issue\n')
    .option('-i, --interactive', "interactive mode")
    .option('-a, --assignee <user>', "assignee")
    .option('-p, --project <project>', "project")
    .option('-s, --summary <summary>', "title/summary")
    .option('-d, --desc <desription>', "description")
    .option('-t, --type <issue type>', "name of issue type")
    .action(function (args) {
        create(jira, args);
    });
commander
    .command('show <id>')
    .description('show an issue by id')
    .action(function (id) {
        show(jira, { id: id });
    });

commander
    .command('close <id>')
    .description('close an issue by id')
    .action(function (args) {
        transition(jira, { id: id, transitionId: 2 });
    });

commander
    .command('resolve <id> ')
    .description('resolve an issue by id')
    .action(function (args) {
        transition(jira, { id: id, transitionId: 3 });
    });

commander
    .command('start <id>')
    .description('set an issue to in progress by id')
    .action(function (id) {
        transition(jira, { id: id, transitionId: 4 });
    });
commander
    .command('stop <id>')
    .description("set an issue to open by id")
    .action(function (args) {
        transition(jira, { id: id, transitionId: 301 });
    });
commander.command('delete <id>')
    .description('delete an issue by id\n')
    .action(function (id) {
        del(jira, {
            id: id
        });
    });
commander
    .command('comment <id> <text>')
    .description('comment on an issue')
    .action(function (id, text) {
        comment(jira, {
            id: id,
            comment: text
        });
    });
commander.command('assign <id> <user>')
    .description('assign a user to an issue')
    .action(function (id, user) {
        assign(jira, {
            id: id,
            user: user
        });
    });

commander.parse(process.argv);

