const vscode = require('vscode');

let changeConfiguration = vscode.workspace.onDidChangeConfiguration(() => {
  const {
    engine,
    translationId,
    translationKey
  } = vscode.workspace.getConfiguration("translationX");

  if (engine === 'youdao') {
    console.log('使用有道翻译', translationId, translationKey);
  }
  if (engine === 'youdaoFree') {
    console.log('使用有道翻译免费', translationId, translationKey);
  }
  if (engine === 'microsoft') {
    console.log('使用微软翻译', translationId, translationKey);
  }
})

module.exports = {
  changeConfiguration
}