jira-cli
========

nodejs powered jira cli

### install

```
git clone https://github.com/moonsspoon/jira-cli.git
```
```
npm install
```
edit `config.js`
```
{
    protocol: 'https',
    host: "jira.company.com/",
    port: null,
    user: 'username',
    password: 'password'
}
```
```
node jira --help
```

### jira --help
```
Commands:

    projects               list all projects
    issuetypes             list all issue types

    list [options]         list issues
    create [options]       create an issue

    show <id>              show an issue by id
    close <id>             close an issue by id
    resolve <id>           resolve an issue by id
    start <id>             set an issue to in progress by id
    stop <id>              set an issue to open by id
    delete <id>            delete an issue by id

    comment <id> <text>    comment on an issue
    assign <id> <user>     assign a user to an issue

  Options:

    -h, --help  output usage information
```

### jira list --help
```
Usage: list [options]

  Options:

    -h, --help                      output usage information
    -a, --assignee <user>           filter list by assignee
    -p, --project <project>         filter list by project
    -c, --creator <user>            filter list by creator
    -s, --status <o|c|r|i>          filter list by status
    -f, --format                    format as table
```
### jira create --help
```
Usage: create [options]

  Options:

    -h, --help               output usage information
    -i, --interactive        interactive mode
    -a, --assignee <user>    assignee
    -p, --project <project>  project
    -s, --summary <summary>  title/summary
    -d, --desc <desription>  description
    -t, --type <issue type>  name of issue type
```

### license
MIT
