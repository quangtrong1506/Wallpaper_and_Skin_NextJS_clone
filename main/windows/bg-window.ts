import { app } from "electron";
import path from "path";
import { createWindow, isProd } from "../helpers";
import { getListImages, getListVideos } from "../helpers/utils/files";
interface _IProps {
    id?: string;
    name?: string;
    options?: {
        x?: number;
        y?: number;
    };
}
export const BG_WINDOW = async (options?: _IProps) => {
    const { x, y } = options.options;
    const mainWindow = createWindow(options?.name || Math.random().toString(), {
        width: 1200,
        height: 700,
        minimizable: false,
        resizable: true,
        frame: false,
        x,
        y,
        icon: path.join(__dirname, "../resources/icon.ico"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
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
        await mainWindow.loadURL("app://./home?id=" + options?.id);
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home?id=${options?.id}`);
    }
    mainWindow.webContents.openDevTools();
    let images = await getListImages();
    let videos = await getListVideos();
    mainWindow.webContents.send(
        "main-to-window",
        JSON.stringify({
            channel: "path",
            data: { images, videos, userPath: app.getPath("userData").replace(" (development)", "") },
        })
    );
    return mainWindow;
};
