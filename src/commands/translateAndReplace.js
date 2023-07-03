const vscode = require('vscode');
const youdaoTranslate = require('../common/youDaoTranslate');
const { splitWords, containsChinese, convertSentenceToCaseFormats } = require('../utils');

let registerTranslateAndReplace = vscode.commands.registerCommand(
    'translatex.translateAndReplace',
    async () => {
        let editor = vscode.window.activeTextEditor;

        if (editor) {
            let selection = editor.selection;
            let selectedText = editor.document.getText(selection);


            const spWord = splitWords(selectedText);

            let { data: {
                translation
            } } = await youdaoTranslate(spWord)

            // 如果翻译结果中包含中文，则为中译英，则将翻译结果转换为各种命名格式
            if (containsChinese(spWord)) {
                translation = convertSentenceToCaseFormats(translation[0]);
            }

            let selectedOption = await vscode.window.showQuickPick(translation);

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