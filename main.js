const { app, BrowserWindow, ipcMain, shell } = require('electron');
const fs = require('fs').promises;
const path = require('path');

require('./database/helpers')().then((_DB) => { global.DB = _DB });


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
	win.webContents.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
}

async function exportTables(content) {
	try {
		const exportDir = path.join(__dirname, 'exports');
		await fs.mkdir(exportDir, { recursive: true });
		await fs.writeFile(path.join(exportDir, 'CV.html'), content, 'utf8');
		shell.openPath(exportDir);
	} catch (error) {
		console.log(error);
	}
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

ipcMain.on('exportTables', (_, payLoad) => {
	exportTables(JSON.parse(payLoad).content);
});
