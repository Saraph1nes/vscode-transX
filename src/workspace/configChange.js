const vscode = require('vscode')

let changeConfiguration = vscode.workspace.onDidChangeConfiguration(() => {
  console.log('配置发生变化');
  let translationId = '';
  let translationKey = '';
  let config = vscode.workspace.getConfiguration("翻译")
  const curEngine = config.get("translation.engine")
  if (curEngine === "有道翻译") {
    translationId = config.get("google.translationId")
    translationKey = config.get("google.translationKey")
  } else if (curEngine === "微软翻译") {
    translationId = config.get("microsoft.translationId")
    translationKey = config.get("microsoft.translationKey")
  }
  console.log(translationId, translationKey);
})

module.exports = {
  changeConfiguration
}