---
description: Bourne-Again SHell, is a shell program and command language
tags:
    - Tool
---

# Bash

- Best for Unix-like environments.
- Strong in text processing and file manipulation.
- Wide range of built-in commands and utilities.
- Common in web servers, DevOps, and system administration.

## File and Directory Operations

- **List files and directories:**

  ```bash
  ls        # List files and directories in the current directory
  ls -l     # List with detailed information
  ls -a     # List all files, including hidden files
  ls -lh    # List with human-readable file sizes
  ```

- **Change directory:**

  ```bash
  cd <directory>      # Change to specified directory
  cd ..               # Move up one directory level
  cd ~                # Change to home directory
  cd /                # Change to root directory
  ```

- **Create, remove, copy, and move files/directories:**

  ```bash
  touch <file>        # Create an empty file
  mkdir <directory>   # Create a directory
  rm <file>           # Remove a file
  rm -r <directory>   # Remove a directory and its contents
  cp <source> <destination>  # Copy a file or directory
  mv <source> <destination>  # Move or rename a file or directory
  ```

## File Viewing and Editing

- **View file contents:**

  ```bash
  cat <file>          # Display the content of a file
  less <file>         # View file content interactively
  head <file>         # Display the first 10 lines of a file
  tail <file>         # Display the last 10 lines of a file
  tail -f <file>      # Follow the content of a file in real-time
  ```

- **Edit files:**

  ```bash
  nano <file>         # Edit a file using the nano text editor
  vi <file>           # Edit a file using the vi text editor
  ```

## File Permissions

- **Change file permissions:**

  ```bash
  chmod <mode> <file>         # Change file permissions
  chmod 755 <file>            # Commonly used permission setting
  ```

- **Change file ownership:**

  ```bash
  chown <user>:<group> <file>  # Change the owner and group of a file
  ```

## Search and Find

- **Find files and directories:**

  ```bash
  find <path> -name <pattern>   # Search for files and directories
  ```

- **Search within files:**

  ```bash
  grep <pattern> <file>         # Search for a pattern in a file
  grep -r <pattern> <directory> # Search recursively in a directory
  ```

## System Information

- **Check disk usage:**

  ```bash
  df -h               # Display disk space usage
  du -sh <directory>  # Display the size of a directory
  ```

- **Check system memory:**

  ```bash
  free -h             # Display free and used memory
  ```

- **System uptime:**

  ```bash
  uptime              # Show how long the system has been running
  ```

## Process Management

- **View running processes:**

  ```bash
  ps                  # Display current processes
  ps aux              # Display detailed process information
  top                 # Display real-time system information
  ```

- **Kill a process:**

  ```bash
  kill <pid>          # Kill a process by PID
  kill -9 <pid>       # Forcefully kill a process by PID
  ```

## Networking

- **Check network configuration:**

  ```bash
  ifconfig            # Display network interfaces
  ```

- **Network diagnostics:**

  ```bash
  ping <host>         # Ping a host
  netstat             # Display network connections and routing tables
  ```

## Package Management

- **For Debian-based systems (like Ubuntu):**

  ```bash
  sudo apt update     # Update package lists
  sudo apt upgrade    # Upgrade installed packages
  sudo apt install <package>  # Install a new package
  sudo apt remove <package>   # Remove a package
  ```

- **For Red Hat-based systems (like CentOS):**

  ```bash
  sudo yum update     # Update package lists
  sudo yum install <package>  # Install a new package
  sudo yum remove <package>   # Remove a package
  ```

## Text Processing

- **Common text processing tools:**

  ```bash
  echo "text"               # Print text to the terminal
  cat <file> | grep <pattern>  # Filter text in a file
  sort <file>               # Sort lines in a file
  uniq <file>               # Remove duplicate lines from a file
  awk '{print $1}' <file>   # Process text using AWK
  sed 's/old/new/g' <file>  # Replace text in a file using SED
  ```
  