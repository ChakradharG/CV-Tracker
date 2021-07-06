const { app, BrowserWindow, ipcMain } = require('electron');

let win;
let DB;
require('./database/helpers')().then((_DB) => { DB = _DB });
require('electron-reload')(__dirname, {
	electron: require(`${__dirname}/node_modules/electron`)
});	// Remove


function createWindow() {
	win = new BrowserWindow({
		webPreferences: {
			preload: `${__dirname}/preload.js`
		}
	});

	win.loadFile(`${__dirname}/public/index.html`);
	win.webContents.openDevTools();	// Remove
}

app.whenReady().then(createWindow);

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
