# Chocolately

Chocolatey is a popular **package manager** for Windows, which allows you to install, update, and manage software packages using the command line.

## Installation of Chocolatey

### Step 1: Open Command Line Interface (CLI)

Open PowerShell or Command Prompt **as an Administrator**.

### Step 2: Install Chocolatey

**PowerShell:**

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**Command Prompt:**

```cmd
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

This script will download and install Chocolatey on your system.

## Using Chocolatey

### 1. **Install a Package**

To install a package, use the `choco install` command followed by the name of the package. For example, to install Google Chrome:

```cmd
choco install googlechrome
```

You can install multiple packages at once by listing them all:

```cmd
choco install googlechrome firefox 7zip
```

### 2. **Upgrade a Package**

To upgrade a specific package, use the `choco upgrade` command:

```cmd
choco upgrade googlechrome
```

To upgrade all installed packages:

```cmd
choco upgrade all
```

### 3. **Uninstall a Package**

To uninstall a package, use the `choco uninstall` command:

```cmd
choco uninstall googlechrome
```

### 4. **Search for Packages**

To search for available packages, use the `choco search` command:

```cmd
choco search googlechrome
```

### 5. **List Installed Packages**

To see a list of all installed packages, use the `choco list` command with the `-localonly` flag:

```cmd
choco list -localonly
```

### 6. **View Package Information**

To view detailed information about a package, use the `choco info` command:

```cmd
choco info googlechrome
```

## Example Workflow

1. **Install Software:**

   ```cmd
   choco install vscode -y
   choco install git -y
   choco install nodejs -y
   ```

2. **Update Software:**

   ```cmd
   choco upgrade vscode -y
   choco upgrade git -y
   choco upgrade nodejs -y
   ```

3. **Uninstall Software:**

   ```cmd
   choco uninstall vscode -y
   ```

4. **Check Installed Software:**

   ```cmd
   choco list -localonly
   ```

## Automating with Chocolatey

```powershell
# install-dev-tools.ps1
choco install vscode -y
choco install git -y
choco install nodejs -y
choco install googlechrome -y
choco install docker-desktop -y
```

Run the script in PowerShell to automatically install all specified tools

```powershell
powershell -ExecutionPolicy Bypass -File install-dev-tools.ps1
```
