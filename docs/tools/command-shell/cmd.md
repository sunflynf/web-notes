---
description: A user interface navigated using commands at prompts
tags:
    - Tool
---

# Command Line

## Keywords

| Command | Use for |
| --- | --- |
| `mkdir <folder-name>` | Create new folder |
| `cd <folder-path>` | Move to folder |
| `cd ..` | Move to previous folder |
| `ls` | list files in current folder |
| `touch <file-name>.<file-type>` | Create file |
| `open <file-name>.<file-type>` | Open with **Notepad** |
| `code <file-name>.<file-type>` | Open with **Visual Studio Code** |
| `rm <file-name>.<file-type>` | Remove file |
| `rm -r <folder-path>` | Remove folder |
| `cls` | clear screen |
| `pwd` | Print workplace directory |

## File and Directory Operations

- **List files and directories:**

    ```cmd
    dir        # List files and directories
    dir /a     # List all files, including hidden files
    ```

- **Change directory:**

    ```cmd
    cd <directory>      # Change to specified directory
    cd ..               # Move up one directory level
    cd \                # Change to root directory
    ```

- **Create, remove, copy, and move files/directories:**

    ```cmd
    echo. > <file>        # Create an empty file
    mkdir <directory>     # Create a directory
    del <file>            # Remove a file
    rmdir /s <directory>  # Remove a directory and its contents
    copy <source> <destination>  # Copy a file
    move <source> <destination>  # Move or rename a file
    ```

## File Viewing and Editing

- **View file contents:**

    ```cmd
    type <file>         # Display the content of a file
    ```

- **Edit files:**

    ```cmd
    notepad <file>      # Edit a file using Notepad
    ```

## File Permissions

- **Change file permissions:**

    ```cmd
    attrib +r <file>   # Set file as read-only
    attrib -r <file>   # Remove read-only attribute
    ```

## Search and Find

- **Find files and directories:**

    ```cmd
    dir <path> /s /p /q /a:dh # Search for files and directories
    ```

- **Search within files:**

    ```cmd
    findstr <pattern> <file>   # Search for a pattern in a file
    ```

## System Information

- **Check disk usage:**

    ```cmd
    dir /s                 # Display disk space usage
    ```

- **Check system memory:**

    ```cmd
    systeminfo | findstr /C:"Total Physical Memory"  # Display system memory
    ```

## Process Management

- **View running processes:**

    ```cmd
    tasklist              # Display current processes
    ```

- **Kill a process:**

    ```cmd
    taskkill /PID <pid>   # Kill a process by PID
    ```

## Networking

- **Check network configuration:**

    ```cmd
    ipconfig              # Display network interfaces
    ```

- **Network diagnostics:**

    ```cmd
    ping <host>           # Ping a host
    netstat               # Display network connections and routing tables
    ```

## Text Processing

- **Common text processing tools:**

    ```cmd
    echo "text"           # Print text to the terminal
    findstr <pattern> <file>  # Filter text in a file
    sort <file>           # Sort lines in a file
    ```
