const vscode = require('vscode');
const { multiEngineAdapter } = require('./multiEngineAdapter');
const { splitWords, containsChinese, convertSentenceToCaseFormats } = require('../utils');

let registerTranslateAndReplace = vscode.commands.registerCommand(
    'translatex.translateAndReplace',
    async () => {
        let editor = vscode.window.activeTextEditor;

        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);

            const spWord = splitWords(selectedText);

            const translation = await multiEngineAdapter(spWord)

            let selectedOption = '';

            // 如果翻译结果中包含中文，则为中译英，则将翻译结果转换为各种命名格式
            if (containsChinese(spWord)) {
                selectedOption = await vscode.window.showQuickPick(convertSentenceToCaseFormats(translation));
            } else {
                selectedOption = await vscode.window.showQuickPick([translation]);
            }

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