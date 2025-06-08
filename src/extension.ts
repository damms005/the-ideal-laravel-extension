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
		vscode.ViewColumn.One,
		{
			enableScripts: true,
			localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
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
	const mediaPath = vscode.Uri.joinPath(extensionUri, 'media');
	const indexPath = vscode.Uri.joinPath(mediaPath, 'index.html');

	try {
		let html = fs.readFileSync(indexPath.fsPath, 'utf8');

		const mediaUri = webview.asWebviewUri(mediaPath);

		html = html.replace(/src="\.?\/?assets\//g, `src="${mediaUri}/assets/`);
		html = html.replace(/href="\.?\/?assets\//g, `href="${mediaUri}/assets/`);

		const cspSource = webview.cspSource;
		const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; script-src ${cspSource} 'unsafe-inline'; img-src ${cspSource} https:; font-src ${cspSource};">`;

		html = html.replace('<head>', `<head>\n\t${csp}`);

		return html;
	} catch (error) {
		return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src ${webview.cspSource} 'unsafe-inline';">
	<title>Login Form</title>
</head>
<body>
	<h1>Login Form Not Found</h1>
	<p>Please build the Vue application first by running the build script.</p>
</body>
</html>`;
	}
}

export function deactivate() {}
