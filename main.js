const { app, BrowserWindow, ipcMain, shell } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const { OpenAI } = require('openai');

require('./database/helpers')().then((_DB) => { global.DB = _DB });


let win;
function createWindow() {
	win = new BrowserWindow({
		width: 900,
		height: 550,
		minWidth: 820,
		minHeight: 550,
		frame: false,
		webPreferences: {
			preload: `${__dirname}/preload.js`
		}
	});

	win.loadFile(`${__dirname}/public/index.html`);
	win.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: 'deny' };
	});
	win.webContents.on('will-navigate', (e, url) => {
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

async function computeEmbeddings() {
	try {
		const pendingDB = await DB.getPending();
		const openai = new OpenAI({baseURL: 'http://localhost:11434/v1', apiKey: 'ollama'});

		for (let table in pendingDB) {
			let column = table === 'ski' ? 'Skill' : 'Description';
			for (let row of pendingDB[table]) {
				let embedding = await openai.embeddings.create({
					model: 'nomic-embed-text',	// if you change this, make sure to manually set `recomp` flag for all rows in the database
					input: [row[column]]
				});

				// Update the `embedding`
				await DB.update({
					type: 'row',
					tableID: table,
					column: 'embedding',
					id: row['id'],
					collapsibleColumn: '',	// need the key, not the value
					newValue: `'${JSON.stringify(embedding.data[0].embedding)}'`
				});
				// Reset the `recomp` flag
				await DB.update({
					type: 'row',
					tableID: table,
					column: 'recomp',
					id: row['id'],
					collapsibleColumn: '',	// need the key, not the value
					newValue: 0
				});
			}
		}

		return 0;
	} catch (error) {
		console.log(error);
		return 1;
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

ipcMain.handle('computeEmbeddings', () => {
	return computeEmbeddings();
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
