import vscode from "vscode";
import { splitWords } from "../utils/utils";
import { multiEngineAdapter } from "./multiEngineAdapter";

let registerTranslate = vscode.commands.registerCommand(
  "translatex.translate",
  async () => {
    let editor = vscode.window.activeTextEditor;

    if (editor) {
      let selection = editor.selection;
      let selectedText = editor.document.getText(selection);
      let outputChannel = vscode.window.createOutputChannel("翻译结果");

      const spWord = splitWords(selectedText);

      console.log("分词 =>", {selectedText, spWord});

      const translation = await multiEngineAdapter(spWord);

      outputChannel.appendLine(`翻译结果：${translation}`);
      outputChannel.show();
    }
  }
);

export { registerTranslate };
