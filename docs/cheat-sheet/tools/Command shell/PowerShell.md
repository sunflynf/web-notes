---
description: A cross-platform task automation solution made up of a command-line shell
tags:
    - Tool
---

# PowerShell

## File and Directory Operations

- **List files and directories:**

    ```powershell
    Get-ChildItem        # List files and directories
    Get-ChildItem -Force # List all files, including hidden files
    ```

- **Change directory:**

    ```powershell
    Set-Location <directory>      # Change to specified directory
    Set-Location ..               # Move up one directory level
    Set-Location \                # Change to root directory
    ```

- **Create, remove, copy, and move files/directories:**

    ```powershell
    New-Item <file> -ItemType File      # Create an empty file
    New-Item <directory> -ItemType Directory  # Create a directory
    Remove-Item <file>                  # Remove a file
    Remove-Item <directory> -Recurse    # Remove a directory and its contents
    Copy-Item <source> <destination>    # Copy a file or directory
    Move-Item <source> <destination>    # Move or rename a file or directory
    ```

## File Viewing and Editing

- **View file contents:**

    ```powershell
    Get-Content <file>  # Display the content of a file
    ```

- **Edit files:**

    ```powershell
    notepad <file>      # Edit a file using Notepad
    ```

## File Permissions

```powershell
Set-ItemProperty -Path <file> -Name IsReadOnly -Value $true   # Set file as read-only
Set-ItemProperty -Path <file> -Name IsReadOnly -Value $false  # Remove read-only attribute
```

## Search and Find

- **Find files and directories:**

    ```powershell
    Get-ChildItem <path> -Recurse -Force -Directory  # Search for files and directories
    ```

- **Search within files:**

    ```powershell
    Select-String <pattern> <file>  # Search for a pattern in a file
    ```

## System Information

- **Check disk usage:**

    ```powershell
    Get-PSDrive           # Display disk space usage
    ```

- **Check system memory:**

    ```powershell
    Get-ComputerInfo | Select-Object CsTotalPhysicalMemory  # Display system memory
    ```

## Process Management

- **View running processes:**

    ```powershell
    Get-Process           # Display current processes
    ```

- **Kill a process:**

    ```powershell
    Stop-Process -Id <pid>  # Kill a process by PID
    ```

## Networking

- **Check network configuration:**

    ```powershell
    Get-NetIPAddress      # Display network interfaces
    ```

- **Network diagnostics:**

    ```powershell
    Test-Connection <host>  # Ping a host
    Get-NetTCPConnection    # Display network connections
    ```

## Text Processing

- **Common text processing tools:**

    ```powershell
    Write-Output "text"           # Print text to the terminal
    Select-String <pattern> <file>  # Filter text in a file
    Sort-Object <file>            # Sort lines in a file
    ```
