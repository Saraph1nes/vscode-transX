import vscode from "vscode";
import youdaoTranslate from "../common/youdaoTranslate";
import youdaoFreeTranslate from "../common/youdaoTranslateFree";

let multiEngineAdapter = async (str: string) => {
  const { engine } = vscode.workspace.getConfiguration("translationX");
  let translation = "";
  if (engine === "youdaoFree") {
    translation = await youdaoFreeTranslate(str);
  }
  if (engine === "youdao") {
    translation = await youdaoTranslate(str);
  }
  return translation;
};

export { multiEngineAdapter };
