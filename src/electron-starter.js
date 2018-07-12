process.env.GOOGLE_API_KEY = process.env.API_GOOGLE_KEY;

//Electron Stuff
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

require("dotenv").config();

const path = require("path");
const url = require("url");

const fs = require("fs");

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 480,
        webPreferences: {
            webSecurity: false
          }
    });


    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, "/../build/index.html"),
        protocol: "file:",
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null
    })
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {

    if (process.platform !== "darwin") {
        app.quit()
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow()
    }
});