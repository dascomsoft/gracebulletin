const { contextBridge } = require('electron');

// Exposer des APIs sécurisées au frontend
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  nodeVersion: process.versions.node,
  chromeVersion: process.versions.chrome,
  electronVersion: process.versions.electron
});