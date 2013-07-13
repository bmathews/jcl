var request = require('request'),
    commander = require('commander');

var userConf = require('./config'),
    show = require('./lib/show'),
    create = require('./lib/create'),
    list = require('./lib/list');

var config = {
    auth: {
        user: userConf.user,
        pass: userConf.password
    },
    rootAPI: userConf.apiUrl
};

commander
    .command('show <id>')
    .description('show an issue by id')
    .option('id', 'issue id')
    .action(function (id) {
        show(config, { id: id });
    });

commander
    .command('close <id>')
    .description('close an issue by id')
    .option('id', 'issue id')
    .action(function (args) {
        console.log(args);
    });

commander
    .command('resolve <id> ')
    .description('resolve an issue by id')
    .option('id', 'issue id')
    .action(function (args) {
        console.log(args);
    });

commander
    .command('start <id>')
    .description('set an issue to in progress by id')
    .option('id', 'issue id')
    .action(function (args) {
        console.log(args);
    });
commander
    .command('stop <id>')
    .description("set an issue to open by id")
    .option('id', 'issue id')
    .action(function (args) {
        console.log(args);
    });
commander
    .command('list')
    .description('list issues')
    .option('-a, --assignee <user>', "Filter list by assignee")
    .option('-p, --project <project>', "Filter list by project")
    .option('-c, --creator <user>', "Filter list by creator")
    .option('-s, --status <status o|c|r|i|open|closed|resolved|inprogress>', "Filter list by status")
    .option('-f, --format', "format as table")
    .action(function (args) {
        list(config, args);
    });
commander
    .command('create')
    .description('create an issue')
    .option('-i, --interactive', "interactive mode")
    .option('-a, --assignee <user>', "assignee")
    .option('-p, --project <project>', "project")
    .option('-s, --summary <summary>', "title/summary")
    .option('-d, --desc <desription>', "description")
    .option('-t, --type <issue type>', "name of issue type")
    .action(function (args) {
        create(config, args);
    });

commander.parse(process.argv);
