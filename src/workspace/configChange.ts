import vscode, { WorkspaceConfiguration } from "vscode";

let changeConfiguration = vscode.workspace.onDidChangeConfiguration(() => {
  const { engine, APISecret, APIKey }: WorkspaceConfiguration =
    vscode.workspace.getConfiguration("translationX");

  if (engine === "youdao") {
    console.log("使用有道翻译", APISecret, APIKey);
  }
  if (engine === "baiduDomain") {
    console.log("使用百度领域翻译", APISecret, APIKey);
  }
  if (engine === "xunfei") {
    console.log("使用讯飞翻译", APISecret, APIKey);
  }
});

export { changeConfiguration };
