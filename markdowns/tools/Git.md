**Git** is version control system
- Tracking code changes + who made changes
- Coding collaboration
- Actions:
  - Manage projects with **Repository**
  - **Clone** to work - local copy
  - **Staging** + **Committing** -> control & tracking changes
  - **Branch** + **Merge** -> work on different part
  - **Pull** -> Get new changes of project
  - **Push** -> Update new change to project
 
| Command | Use for |
| --- | --- |
| `git --version` | Check version |
| `git config --global user.name "exp"` <br> `git config --global user.gmail "exp@email.com"` | Setting |
| `git init` | Initialize Git on current folder |
| `git status` | Checking status of repo |
| `git status --short` | Checking status (Short ver)* |
| `git add <file-name.type>` | Staged file |
| `git add --all` <br> `git add -A` | Staged all files |
| `git commit -m "Updated"` | Commit with message <br> Add `-a` for automatically stage every changed |

`*`
- ?? - Untracked files
- A - Files added to stage
- M - Modified files
- D - Deleted files
