const { app, BrowserWindow, ipcMain } = require('electron');

require('./database/helpers')().then((_DB) => { global.DB = _DB });
require('electron-reload')(__dirname, {
	electron: require(`${__dirname}/node_modules/electron`)
});	// Remove


function createWindow() {
	const win = new BrowserWindow({
		width: 900,
		height: 550,
		// frame: false,
		webPreferences: {
			preload: `${__dirname}/preload.js`
		}
	});

	win.loadFile(`${__dirname}/public/index.html`);
	win.removeMenu();	// Remove
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

ipcMain.handle('getData', () => {
	return DB.getAll();
});

ipcMain.on('putData', (_, payLoad) => {
	DB.update(JSON.parse(payLoad));
});

ipcMain.on('deleteData', (_, payLoad) => {
	DB.remove(JSON.parse(payLoad));
});
