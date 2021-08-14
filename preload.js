const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('api', {
	invoke: (channel, payLoad) => {
		let validChannels = ['getData'];
		if (validChannels.includes(channel)) {
			return ipcRenderer.invoke(channel, payLoad);
		}
	},
	send: (channel, payLoad) => {
		let validChannels = ['putData', 'deleteData'];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, payLoad);
		}
	}
});
