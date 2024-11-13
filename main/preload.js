const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electron", {
  appVersion: () => ipcRenderer.invoke("app-version"),
});
