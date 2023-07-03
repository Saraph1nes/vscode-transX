const vscode = require('vscode');
const { registerTranslate } = require('./commands/translate');
const { registerTranslateAndReplace } = require('./commands/translateAndReplace');
const { changeConfiguration } = require('./workspace/configChange');

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
