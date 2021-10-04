const { app, BrowserWindow, ipcMain } = require('electron');

require('./database/helpers')().then((_DB) => { global.DB = _DB });
require('electron-reload')(__dirname);//, {
// 	electron: require(`${__dirname}/node_modules/electron`)
// });	// Remove


let win;
function createWindow() {
	win = new BrowserWindow({
		width: 900,
		height: 550,
		minWidth: 700,
		minHeight: 550,
		frame: false,
		webPreferences: {
			preload: `${__dirname}/preload.js`
		}
	});

	win.loadFile(`${__dirname}/public/index.html`);
	// win.removeMenu();	// Remove
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

ipcMain.on('winManip', (_, action) => {
	if (action === 'close') {
		app.quit();
	} else {
		win.isMinimized() ? win.restore() : win.minimize();
	}
});

ipcMain.handle('getData', () => {
	return DB.getAll();
});

ipcMain.handle('getColumns', (_, payLoad) => {
	return DB.getCol(payLoad);
});

ipcMain.on('postData', (_, payLoad) => {
	DB.add(JSON.parse(payLoad));
});

ipcMain.on('putData', (_, payLoad) => {
	DB.update(JSON.parse(payLoad));
});

ipcMain.on('deleteData', (_, payLoad) => {
	DB.remove(JSON.parse(payLoad));
});
