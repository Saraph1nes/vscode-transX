const vscode = require('vscode');
const { splitWords } = require('../utils');
const youdaoTranslate = require("../common/youdaoTranslate");
const youdaoFreeTranslate = require("../common/youdaoTranslateFree");

let registerTranslate = vscode.commands.registerCommand(
    'translatex.translate',
    async () => {
        let editor = vscode.window.activeTextEditor;

        const { engine } = vscode.workspace.getConfiguration("translationX");

        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);
            let outputChannel = vscode.window.createOutputChannel('翻译结果');

            const spWord = splitWords(selectedText);

            let translation = '';

            if (engine === "youdaoFree") {
                translation = await youdaoFreeTranslate(spWord)
                console.log('youdaoFree', translation);
            }
            if (engine === "youdao") {
                translation = await youdaoTranslate(spWord)
                console.log('youdao', translation);
            }

            outputChannel.appendLine(`翻译结果：${translation}`);
            outputChannel.show();
        }
    }
);

module.exports = {
    registerTranslate
}