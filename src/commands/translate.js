const vscode = require('vscode');

let registerTranslate = vscode.commands.registerCommand(
    'translatex.translate',
    async () => {
        let editor = vscode.window.activeTextEditor;

        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);
            let outputChannel = vscode.window.createOutputChannel('翻译结果');
            outputChannel.appendLine(`This is a custom panel message. ${selectedText}`);
            outputChannel.show();
        }
    }
);

module.exports = {
    registerTranslate
}