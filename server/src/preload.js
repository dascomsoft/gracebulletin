// const { contextBridge } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   platform: process.platform,
//   testAPI: () => {
//     return fetch('http://localhost:3000/api/health')
//       .then(response => response.json());
//   }
// });


const { contextBridge, ipcRenderer } = require('electron');

// Exposition sécurisée des APIs au frontend
contextBridge.exposeInMainWorld('electronAPI', {
    // Sauvegarde via IPC
    saveBulletin: (data) => ipcRenderer.invoke('save-bulletin', data),
    
    // Chargement élève via IPC
    loadStudent: (studentId) => ipcRenderer.invoke('load-student', studentId),
    
    // Version alternative: appeler directement l'API Express
    apiRequest: async (endpoint, options = {}) => {
        // En développement, utilisez localhost:3000
        // En production, utilisez l'API interne
        const baseURL = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' 
            : '';
        
        const response = await fetch(`${baseURL}${endpoint}`, options);
        return response.json();
    }
});