'use strict';

//Import 
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const setIcon = electron.setIcon;
const notifier = require('node-notifier');


//declares a variable named mainWindow without assigning it any value.
let mainWindow;

// create a new browser window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'default-icon.png'
    });

    // alternative way to load the HTML file into the Electron window
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    //emitted when the main window is closed by the user
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    
    app.on('activate', () => {
        //Create a new window if there are no other windows open
        if (mainWindow === null) {
            createWindow();
        }
    });

    
    app.on('ready', () => {
        //create a mainwindow
        mainWindow = new BrowserWindow({
            width: 400,
            height: 320,
            //frame: false
        });
    });

    //To change the window icon in Electron
    function changeWindowIcon(newIcon) {
        mainWindow.setIcon(newIcon)
    };
    changeWindowIcon('assets/img/new-icon.png');

    //provided seems to be an array representing the menu template for your application's menu bar
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    role: 'quit', //make the "Quit" menu item 
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                    }
                },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' }, // Reloads the current window
                { role: 'resetzoom' }, // Resets the zoom level of the current web page
                { type: 'separator' },
                { role: 'zoomin' }, // Zooms into the current web page
                { role: 'zoomout' }, // Zooms out of the current web page
                { type: 'separator' },
                { role: 'togglefullscreen' } //make full full screen

            ],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' }, //undo what it is done
                { role: 'redo' }, //redo what it is done
                { type: 'separator' },
                { role: 'cut' }, //make the "cut" menu item
                { role: 'copy' }, //make the "copy" menu item
                { role: 'paste' }, //make the "Paste" menu item
                { role: 'delete' }, //make the "delete" menu item
                { role: 'selectall' }, //make the "selectall" menu item
            ],
        },
    ];

    //create and set the application menu in Electron 
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    //sets up an event listener for the context menu event on the web contents of the main window in Electron
    mainWindow.webContents.on('context-menu', (event, params) => {
        //// Create the context menu
        const contextMenuTemplate = [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { type: 'separator' },
            { role: 'delete' },
            { role: 'selectall' },
            { type: 'separator' },
            { role: 'reload' }, 
            { role: 'resetzoom' }, 
            { type: 'separator' },
            { role: 'zoomin' }, 
            { role: 'zoomout' }, 
            { role: 'togglefullscreen' },
            { type: 'separator' },
            { role: 'quit' },
        ];

        //provide and then displays the context menu 
        const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
        contextMenu.popup();
    });
} 

// provide the notification options as an argument
notifier.notify({
    //Notification options
    title: 'Notification',
    message: 'Do not forget to calcualate your BMI !',
    icon: path.join(__dirname, 'assets/img/new-icon.png'),
    sound: true,
    wait: true
});

// create the main window of your application when the Electron app is ready to start
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


