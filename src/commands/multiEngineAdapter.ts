import vscode from "vscode";
import youdaoTranslate from "../common/youdaoTranslate";
import baiduDomainTranslate from "../common/baiduDomainTranslate";
import xunfeiTranslate from "../common/xunfeiTranslate";

let multiEngineAdapter = async (str: string) => {
  const { engine } = vscode.workspace.getConfiguration("translationX");
  console.log("翻译引擎 =>", engine);
  let translation = "";
  if (engine === "youdao") {
    translation = await youdaoTranslate(str);
  }
  if (engine === "baiduDomain") {
    translation = await baiduDomainTranslate(str);
  }
  if (engine === "xunfei") {
    translation = await xunfeiTranslate(str);
  }
  return translation;
};

export { multiEngineAdapter };