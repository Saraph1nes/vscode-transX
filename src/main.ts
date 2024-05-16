import { registerTranslate } from "./commands/translate";
import { registerTranslateAndReplace } from "./commands/translateAndReplace";

import { changeConfiguration } from "./workspace/configChange";

import type { ExtensionContext } from "vscode";

const activate = (context: ExtensionContext) => {
  console.log("插件已激活");
  context.subscriptions.push(
    registerTranslate,
    registerTranslateAndReplace,
    changeConfiguration
  );
};

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
