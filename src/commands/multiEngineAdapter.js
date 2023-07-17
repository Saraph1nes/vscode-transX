const vscode = require('vscode');
const youdaoTranslate = require("../common/youdaoTranslate");
const youdaoFreeTranslate = require("../common/youdaoTranslateFree");

let multiEngineAdapter = async (str) => {
    const { engine } = vscode.workspace.getConfiguration("translationX");
    let translation = '';
    if (engine === "youdaoFree") {
        translation = await youdaoFreeTranslate(str)
    }
    if (engine === "youdao") {
        translation = await youdaoTranslate(str)
    }
    return translation;
}

module.exports = {
    multiEngineAdapter
}