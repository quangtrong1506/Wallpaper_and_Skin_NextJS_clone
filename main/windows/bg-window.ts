import { app } from 'electron';
import fetchInstalledSoftware from 'fetch-installed-software';
import path from 'path';
import { createWindow, isProd } from '../helpers';
import { ITypeOfScreen } from '../helpers/const';
import { getListImages, getListVideos } from '../helpers/utils/files';
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

export const BG_WINDOW = async ({ id, name, type = 'default', options }: _IProps) => {
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
    if (isProd) {
        await mainWindow.loadURL(type === 'default' ? rootURL + '/home' : rootURL + '/screen-game');
    } else {
        await mainWindow.loadURL(type === 'default' ? rootURL + `/home` : rootURL + `/screen-game`);
    }
    mainWindow.webContents.openDevTools();
    let images = await getListImages();
    let videos = await getListVideos();
    mainWindow.webContents.send(
        'main-to-window',
        JSON.stringify({
            channel: 'path',
            data: { images, videos, userPath: app.getPath('userData').replace(' (development)', '') },
        })
    );
    if (type === 'game') {
        let apps = await fetchInstalledSoftware.getAllInstalledSoftware();
        mainWindow.webContents.send(
            'main-to-window',
            JSON.stringify({
                channel: 'apps',
                data: {
                    apps: apps.filter(
                        (app) =>
                            app.DisplayIcon &&
                            !app.RegistryDirName.match(
                                /\{(\.?[a-zA-Z0-9]){8,}-(\.?[a-zA-Z0-9]){4,}-(\.?[a-zA-Z0-9]){4,}-(\.?[a-zA-Z0-9]){4,}-(\.?[a-zA-Z0-9]){8,}\}/gm
                            ) &&
                            !app.RegistryDirName.match(
                                /(\.?[a-zA-Z0-9]){8,}-(\.?[a-zA-Z0-9]){4,}-(\.?[a-zA-Z0-9]){4,}-(\.?[a-zA-Z0-9]){4,}-(\.?[a-zA-Z0-9]){8,}/gm
                            ) &&
                            app.RegistryDirName != 'Microsoft EdgeWebView'
                    ),
                },
            })
        );
    }
    return mainWindow;
};
