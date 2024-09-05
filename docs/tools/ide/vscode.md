# Visual Studio Code

## Creating Workspaces in VSCode

1. **Create Separate Folders for Each Workspace:**
   - Start by organizing your projects into different folders based on the language or technology. For example, you might have a folder for JavaScript projects, another for Python, and so on.

2. **Open a Folder in VSCode:**
   - Open VSCode and navigate to `File > Open Folder...` (or `Open` on macOS). Select one of your project folders.

3. **Save the Workspace:**
   - Go to `File > Save Workspace As...`. Save the workspace file (`.code-workspace`) in a convenient location, ideally inside the project folder itself.

4. **Create Workspace Settings:**
   - With the workspace open, go to `File > Preferences > Settings` (or press `Ctrl+,` on Windows/Linux or `Cmd+,` on macOS).
   - Click on the “Workspace” tab at the top to ensure you’re editing settings specific to this workspace.

5. **Configure Extensions Per Workspace:**
   - Install extensions relevant to the language of your project by searching in the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
   - Disable all globally installed extensions that are not relevant to the current workspace:
     - Right-click on an extension in the Extensions view and select `Disable (Workspace)` to disable it just for the current workspace.
     - Alternatively, you can click `Manage` (gear icon) next to the extension and choose `Disable (Workspace)`.

6. **Manage Workspace Extensions with `.vscode/extensions.json`:**
   - You can also specify recommended extensions for a workspace in a file named `extensions.json` located in the `.vscode` folder of the workspace.
   - To create this file, go to `File > Preferences > Extensions` and then click on the gear icon in the upper-right corner. Select `Workspace Recommended Extensions`.
   - Add the extensions you want for this workspace in the JSON file that opens.

### Additional Tips

- **Switching Between Workspaces:** You can quickly switch between workspaces by going to `File > Open Recent` and selecting the workspace file (`.code-workspace`) you want to open.
- **Workspace-Specific Settings:** You can have workspace-specific settings in `.vscode/settings.json` for editor configurations, such as tab size, auto-formatting, and more.
