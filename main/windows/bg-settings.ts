import path from 'path';
import { createWindow, isProd } from '../helpers';
import { ITypeOfScreen } from '../helpers/const';
interface _IProps {
    id?: string;
    name?: string;
    type?: ITypeOfScreen;
    options?: {
        x?: number;
        y?: number;
    };
}
const rootURL = isProd ? 'app://.' : `http://localhost:${process.argv[2]}`;

export const BG_Settings = async () => {
    const mainWindow = createWindow(Math.random().toString(), {
        width: 600,
        height: 400,
        minimizable: false,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '../resources/icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    mainWindow.removeMenu();

    await mainWindow.loadURL(rootURL + `/settings`);
    mainWindow.webContents.openDevTools();
    mainWindow.focus();

    return mainWindow;
};
