import vscode from "vscode";
import youdaoTranslate from "../common/youdaoTranslate";
import baiduDomainTranslate from "../common/baiduDomainTranslate";

let multiEngineAdapter = async (str: string) => {
  const { engine } = vscode.workspace.getConfiguration("translationX");
  let translation = "";
  if (engine === "youdao") {
    translation = await youdaoTranslate(str);
  }
  if (engine === "baiduDomain") {
    translation = await baiduDomainTranslate(str);
  }
  return translation;
};

export { multiEngineAdapter };
