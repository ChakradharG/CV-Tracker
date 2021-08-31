const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('api', {
	invoke: (channel, payLoad) => {
		let validChannels = ['getData', 'getColumns'];
		if (validChannels.includes(channel)) {
			return ipcRenderer.invoke(channel, payLoad);
		}
	},
	send: (channel, payLoad) => {
		let validChannels = ['postData', 'putData', 'deleteData'];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, payLoad);
		}
	}
});
