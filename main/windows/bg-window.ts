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

export const BG_WINDOW = async ({ name, type = 'default', options }: _IProps) => {
    const { x, y } = options;
    const mainWindow = createWindow(name || Math.random().toString(), {
        width: 1200,
        height: 700,
        minimizable: false,
        resizable: true,
        frame: false,
        x,
        y,
        icon: path.join(__dirname, '../resources/icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    mainWindow.removeMenu();
    mainWindow.minimize();
    mainWindow.maximize();
    mainWindow.setSkipTaskbar(true);
    mainWindow.blur();
    if (isProd) {
        await mainWindow.loadURL(type == 'default' ? rootURL + '/home' : rootURL + '/screen-game');
    } else {
        await mainWindow.loadURL(type == 'default' ? rootURL + `/home` : rootURL + `/screen-game`);
    }
    // type == 'default' && mainWindow.webContents.openDevTools();
    return mainWindow;
};
