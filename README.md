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
  apiUrl: 'https://jira.company.com/rest/2/api/',
  user: 'username',
  password: 'password'
}
```
```
node jira --help
```

### jira --help
```
Usage: jira [options] [command]

  Commands:

    show <id>              show an issue by id
    close <id>             close an issue by id
    resolve <id>           resolve an issue by id
    start <id>             set an issue to in progress by id
    stop <id>              set an issue to open by id
    list [options]         list issues
    create [options]       create an issue

  Options:

    -h, --help  output usage information
```

### jira list --help
```
Usage: list [options]

  Options:

    -h, --help                                                    output usage information
    -a, --assignee <user>                                         Filter list by assignee
    -p, --project <project>                                       Filter list by project
    -c, --creator <user>                                          Filter list by creator
    -s, --status <status o|c|r|i|open|closed|resolved|inprogress> Filter list by status
    -f, --format                                                  format as table 
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
