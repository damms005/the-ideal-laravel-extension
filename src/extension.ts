import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	const loginDisposable = vscode.commands.registerCommand('the-ideal-laravel-extension.openLogin', () => {
		openLoginWebview(context);
	});

	context.subscriptions.push(loginDisposable);
}

function openLoginWebview(context: vscode.ExtensionContext) {

	const panel = vscode.window.createWebviewPanel(
		'loginForm',
		'Login Form',
		vscode.ViewColumn.Two,
		{
			enableScripts: true,
			localResourceRoots: [context.extensionUri],
		}
	);

	panel.webview.html = getWebviewHtml(panel.webview, context.extensionUri);

	panel.webview.onDidReceiveMessage(
		async message => {
			switch (message.type) {
				case 'submit':
					const { email, password } = message.payload;
					const result = await vscode.window.showInformationMessage(
						`Login attempt with email: ${email}`,
						'OK'
					);

					if (result === 'OK') {
						panel.webview.postMessage({ type: 'submitted' });
					}
					break;
			}
		},
		undefined,
		context.subscriptions
	);
}

function getWebviewHtml(webview: vscode.Webview, extensionUri: vscode.Uri): string {
	const vueOutputPath = vscode.Uri.joinPath(extensionUri, 'ui', 'dist');
	const assetsPath = vscode.Uri.joinPath(vueOutputPath, 'assets');

	const assetsDir = fs.readdirSync(assetsPath.fsPath);

	const jsFileName = assetsDir.find(file => file.startsWith('index-') && file.endsWith('.js'));
	if (!jsFileName) {
		throw new Error('Could not find main JS file in assets directory');
	}

	const cssFileName = assetsDir.find(file => file.startsWith('index-') && file.endsWith('.css'));
	if (!cssFileName) {
		throw new Error('Could not find main CSS file in assets directory');
	}

	const jsFile = webview.asWebviewUri(vscode.Uri.joinPath(assetsPath, jsFileName));
	const cssFile = webview.asWebviewUri(vscode.Uri.joinPath(assetsPath, cssFileName));

	const faviconUri = webview.asWebviewUri(
		vscode.Uri.joinPath(vueOutputPath, 'favicon.ico')
	);

	/**
		 * Tailwindcss uses svg loaded from data:image..., at least for checkboxes.
		 */
	const tailwindcss = 'data:'

	const nonce1 = getNonce();
	const nonce2 = getNonce();

	return `<!DOCTYPE html>
					<html lang="en">
						<head>
							<meta charset="UTF-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src https://fonts.googleapis.com; img-src ${webview.cspSource} ${tailwindcss}; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce1}' 'nonce-${nonce2}';">
							<link rel="stylesheet" href="${cssFile}">
						</head>
						<body>
							<div id="app"></div>
							loaded
							<script nonce="${nonce2}" type="module" src="${jsFile}"></script>
						</body>
					</html>`;
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function deactivate() { }
