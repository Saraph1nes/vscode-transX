const vscode = require('vscode');
const { registerTranslate } = require('./src/commands/translate');
const { registerTranslateAndReplace } = require('./src/commands/translateAndReplace');
const { changeConfiguration } = require('./src/workspace/configChange');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
	console.log('插件已激活');
	context.subscriptions.push(
		registerTranslate,
		registerTranslateAndReplace,
		changeConfiguration
	);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
