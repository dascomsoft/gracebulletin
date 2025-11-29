





const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');

let mainWindow;
let isAppCrashed = false;
let crashCount = 0;
const MAX_CRASH_RETRIES = 3;

// ==================== GESTION D'ERREURS GLOBALE ====================
process.on('uncaughtException', (error) => {
  console.error('🚨 ERREUR CRITIQUE CAPTURÉE:', error);
  // Ne pas crash - juste logger et continuer
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 PROMISE REJETÉE:', reason);
});

// ==================== FONCTION DE CRÉATION FENÊTRE SÉCURISÉE ====================
function createSafeWindow() {
  try {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      show: false, // Cacher jusqu'au chargement complet
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
        allowRunningInsecureContent: false
      },
      icon: path.join(__dirname, '../build/assets/icon.png') // Optionnel
    });

    // ==================== GESTION DES CRASH ====================
    mainWindow.webContents.on('crashed', (event, killed) => {
      console.log('💥 RENDERER CRASHÉ - Tentative de récupération...');
      handleRendererCrash();
    });

    mainWindow.on('unresponsive', () => {
      console.log('⚠️ FENÊTRE NE RÉPOND PLUS');
      dialog.showMessageBox(mainWindow, {
        type: 'warning',
        title: 'Application lent',
        message: 'L\'application ne répond pas. Voulez-vous attendre ou fermer?',
        buttons: ['Attendre', 'Fermer']
      }).then((result) => {
        if (result.response === 1) {
          mainWindow.destroy();
          createSafeWindow();
        }
      });
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    // ==================== CHARGEMENT SÉCURISÉ ====================
    mainWindow.webContents.on('did-finish-load', () => {
      console.log('✅ APPLICATION CHARGÉE AVEC SUCCÈS');
      mainWindow.show();
      mainWindow.focus();
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.log('❌ ÉCHEC CHARGEMENT:', errorDescription);
      setTimeout(() => {
        mainWindow.reload();
      }, 1000);
    });

    // Charger l'application
    mainWindow.loadURL(`http://localhost:3000`);
    
  } catch (error) {
    console.error('❌ ERREUR CRÉATION FENÊTRE:', error);
    emergencyRecovery();
  }
}

// ==================== GESTION CRASH RENDERER ====================
function handleRendererCrash() {
  crashCount++;
  
  if (crashCount >= MAX_CRASH_RETRIES) {
    console.log('🛑 TROP DE CRASH - Mode sécurité activé');
    dialog.showErrorBox(
      'Erreur Application', 
      'L\'application rencontre des problèmes. Réouverture en mode sécurité...'
    );
    crashCount = 0;
    emergencyRecovery();
  } else {
    console.log(`🔄 Redémarrage après crash (${crashCount}/${MAX_CRASH_RETRIES})`);
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.reload();
      } else {
        createSafeWindow();
      }
    }, 2000);
  }
}

// ==================== MODE URGENCE ====================
function emergencyRecovery() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.destroy();
  }
  
  setTimeout(() => {
    console.log('🚑 LANCEMENT MODE URGENCE');
    createSafeWindow();
  }, 3000);
}

// ==================== SANTÉ APPLICATION ====================
function startHealthMonitor() {
  setInterval(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      // Vérifier que la fenêtre répond
      mainWindow.webContents.executeJavaScript('true')
        .catch((error) => {
          console.log('⚠️ FENÊTRE NE RÉPOND PAS AU PING');
          handleRendererCrash();
        });
    }
  }, 30000); // Toutes les 30 secondes
}

// ==================== DÉMARRAGE SÉCURISÉ ====================
function safeAppStart() {
  console.log('🚀 DÉMARRAGE SÉCURISÉ DE L\'APPLICATION');
  
  try {
    // Démarrer le serveur Express
    const serverApp = express();
    const port = 3000;

    serverApp.use(cors());
    serverApp.use(express.json());
    serverApp.use(express.static(path.join(__dirname, '../build')));

    // Route santé
    serverApp.get('/api/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        message: 'Gestion Bulletin - Version Stable',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      });
    });

    serverApp.listen(port, () => {
      console.log(`✅ SERVEUR EXPRESS DÉMARRÉ: http://localhost:${port}`);
    });

    // Démarrer la surveillance
    startHealthMonitor();

    // Créer la fenêtre
    setTimeout(() => {
      createSafeWindow();
    }, 1000);

  } catch (error) {
    console.error('❌ ERREUR DÉMARRAGE APPLICATION:', error);
    setTimeout(safeAppStart, 5000); // Redémarrer après 5 secondes
  }
}

// ==================== ÉVÉNEMENTS PRINCIPAUX ====================
app.whenReady().then(() => {
  console.log('🎯 ELECTRON PRÊT - LANCEMENT APPLICATION');
  safeAppStart();
});

app.on('window-all-closed', () => {
  console.log('👋 FERMETURE APPLICATION');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log('🔃 RÉACTIVATION APPLICATION');
  if (BrowserWindow.getAllWindows().length === 0) {
    createSafeWindow();
  }
});

app.on('before-quit', () => {
  console.log('💾 FERMETURE PROPRE EN COURS...');
});

// =================═ GESTION DES ERREURS ELECTRON ====================
app.on('renderer-process-crashed', (event, webContents, killed) => {
  console.log('💥 CRASH PROCESSUS RENDERER DÉTECTÉ');
  handleRendererCrash();
});

app.on('child-process-gone', (event, details) => {
  console.log('⚠️ PROCESSUS ENFANT TERMINÉ:', details);
});

console.log('🛡️ APPLICATION GESTION BULLETIN - VERSION STABLE 1.0.0');