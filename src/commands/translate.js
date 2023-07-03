const vscode = require('vscode');
const { splitWords } = require('../utils');
const youdaoTranslate = require("../common/youDaoTranslate");

let registerTranslate = vscode.commands.registerCommand(
    'translatex.translate',
    async () => {
        let editor = vscode.window.activeTextEditor;

        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);
            let outputChannel = vscode.window.createOutputChannel('翻译结果');

            const spWord = splitWords(selectedText);

            const { data: {
                translation
            } } = await youdaoTranslate(spWord)

            outputChannel.appendLine(`翻译结果：${translation}`);
            outputChannel.show();
        }
    }
);

module.exports = {
    registerTranslate
}