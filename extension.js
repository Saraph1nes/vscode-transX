const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
	console.log('插件已激活');

	let translate = vscode.commands.registerCommand(
		'translatex.translate',
		async () => {
			let editor = vscode.window.activeTextEditor;

			if (editor) {
				let selection = editor.selection;
				let selectedText = editor.document.getText(selection);
				let outputChannel = vscode.window.createOutputChannel('翻译结果');
				outputChannel.appendLine(`This is a custom panel message. ${selectedText}`);
				outputChannel.show();
			}
		}
	);

	let translateAndReplace = vscode.commands.registerCommand(
		'translatex.translateAndReplace',
		async () => {
			let editor = vscode.window.activeTextEditor;

			if (editor) {
				let selection = editor.selection;
				let selectedText = editor.document.getText(selection);

				console.log(selectedText);

				// let outputChannel = vscode.window.createOutputChannel('Custom Panel');
				// outputChannel.appendLine('This is a custom panel message.');
				// outputChannel.show();

				let options = ['Option 1', 'Option 2', 'Option 3'];
				let selectedOption = await vscode.window.showQuickPick(options);

				vscode.window.showInformationMessage('selectedOption: ' + selectedOption);

				if (selectedOption) {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, selectedOption);
					});
				}
			}
		}
	);

	context.subscriptions.push(translate, translateAndReplace);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
