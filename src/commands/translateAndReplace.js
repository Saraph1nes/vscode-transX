const vscode = require('vscode');

let registerTranslateAndReplace = vscode.commands.registerCommand(
    'translatex.translateAndReplace',
    async () => {
        let editor = vscode.window.activeTextEditor;

        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);

            console.log(selectedText);

            // let outputChannel = vscode.window.createOutputChannel('Custom Panel');
            // outputChannel.appendLine('This is a custom panel message.');
            // outputChannel.show();

            let options = ['Option 1', 'Option 2', 'Option 3'];
            let selectedOption = await vscode.window.showQuickPick(options);

            vscode.window.showInformationMessage('selectedOption: ' + selectedOption);

            if (selectedOption) {
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, selectedOption);
                });
            }
        }
    }
);

module.exports = {
    registerTranslateAndReplace
}