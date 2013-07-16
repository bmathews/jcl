jira-cli
========

A simple, robust command line interface for interacting with jira issues.

## install

```
npm install jcl -g
```
## jcl --help
```
Usage: jcl [options] [command]

  Commands:

    me                     all unresolved issues assigned to you

    projects               list all projects
    issuetypes             list all issue types

    list [options]         list issues       (jcl list --help)
    create [options]       create an issue   (jcl create --help)

    show <id>              show an issue by id
    take <id>              assign an issue to yourself
    close <id>             close an issue by id
    resolve <id>           resolve an issue by id
    start <id>             assign to yourself and set an issue to in progress
    stop <id>              unassign and set an issue to open
    delete <id>            delete an issue by id

    comments <id>          view comments on an issue
    comment <id> <text>    comment on an issue

    assign <id> <user>     assign a user to an issue
    unassign <id>          unassign a user from an issue

    link <ida> <idb>       link two issues
    * <id>                 show an issue by id

  Options:

    -h, --help  output usage information

  Shortcuts:

    $ jcl <id>             shortcut to show issue by id
    $ jcl                  shortcut to show unresolved issues assigned to you
```
## example usage

#### jcl list --assignee \<user\> --project \<name\>
```
$ jcl list -a brian.mathews -p BE

ID      Status       Summary

BE-58   Resolved     Create Contact UI Documentation
BE-56   Closed       Create "Add Member" dialog design for Team UI
BE-55   Closed       Create "Organization Search" dialog design for Team UI
BE-54   Resolved     Create Team UI Documentation
BE-53   Resolved     Create User UI Documentation
BE-22   Resolved     Style Team UI
BE-18   Resolved     Style User UI

(use "jcl show <id>"  to view an issue)
(use "jcl take <id>"  to assign an issue to yourself)
(use "jcl start <id>" to set an issue to in progress and assign to yourself)
(use "jcl list -h" for list options)
```
#### jcl show \<id\>
```
$ jcl show BE-54

Assignee:      Brian Mathews
Reporter:      Brian Mathews

Status:        Resolved
Priority:      Major
Type:          Task
Components:    Web
Labels:        None
Comments:      1
Links:         BE-105 blocks BE-43

Summary:
Create Team UI Documentation

Description:
Create mockups/documentation for team screen to guide development.
```
#### jcl start \<id\>
```
$ jcl start BE-54
Success
```
#### jcl resolve \<id\>
```
$ jcl resolve BE-54
Success
```



#### jcl list --help
```
Usage: list [options]

  Options:

    -h, --help               output usage information
    -o, --open               show only open issues
    -u, --unresolved         show only unresolved issues (open, in progress, reopened
    -a, --assignee <user>    filter list by assignee
    -p, --project <project>  filter list by project
    -r, --reporter <user>    filter list by reporter
    -s, --status <o|c|r|i>   filter list by status
    -q, --query <query>      search summary/description/comment fields
```
#### jcl create --help
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
