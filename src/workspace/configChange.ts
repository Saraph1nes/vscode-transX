import vscode, { WorkspaceConfiguration } from "vscode";

let changeConfiguration = vscode.workspace.onDidChangeConfiguration(() => {
  const { engine, translationId, translationKey }: WorkspaceConfiguration =
    vscode.workspace.getConfiguration("translationX");

  if (engine === "youdao") {
    console.log("使用有道翻译", translationId, translationKey);
  }
  if (engine === "baiduDomain") {
    console.log("使用百度领域翻译", translationId, translationKey);
  }
});

export { changeConfiguration };
