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
- Helper
  - `git <command> -help`
  - `git help --all`

 ### Basic command
| Command | Use for |
| --- | --- |
| `git --version` | Check version |
| `git config --global user.name "exp"` <br> `git config --global user.gmail "exp@email.com"` | Setting |
| `git init` | Initialize Git on current folder |
| `git status` | Checking status of repo |
| `git status --short` | Checking status (Short ver)* |
| `git log` | View the history of commits for repo |
| `git log --oneline` | (Short ver) |
| `git add <file-name.type>` | Staged file |
| `git add --all` <br> `git add -A` | Staged all files |
| `git commit -m "Updated"` | Commit with message |
| `git commit -a -m "Updated"` | Add `-a` for automatically stage every changed |
| `git brand` | List all branchs |
| `git branch develop` | Create branch **develop** from **main/master**. <br> Note: `develop` is example name |
| `git checkout develop` | Move workspace to branch **develop** |
| `git checkout -b a-123` | Move to branch **a-123**, create before move if it does not existed |
| `git merge a-123` | Update changes in **a-123** into **main/master** branch|
| `git branch -d a-123` | Delete branch **a-123** |

- Status short ver
  - ?? - Untracked files
  - A - Files added to stage
  - M - Modified files
  - D - Deleted files

### Advance command
| Command | Use for |
| --- | --- |


### .gitignore

---
- [ ] git revert
- [ ] git reset
- [ ] git amend
- [ ] .gitignore
- [ ] Security SSH
