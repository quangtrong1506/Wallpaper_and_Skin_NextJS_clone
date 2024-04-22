import { Menu, Tray, app, ipcMain, screen } from "electron";
import serve from "electron-serve";
import path from "path";
import { isProd } from "./helpers";
import handleFile from "./helpers/utils/files";
import { BG_WINDOW } from "./windows/bg-window";
//
const WINDOWS = {
    backgrounds: [],
};
if (isProd) {
    serve({ directory: "app" });
    app.setLoginItemSettings({
        openAtLogin: true,
    });
} else {
    app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
    await app.whenReady();
    let screens = screen.getAllDisplays();
    console.log(screens);
    let id = 1;
    for await (const scr of screens) {
        let win = await BG_WINDOW({ id: id.toString(), name: "background-window-" + id });
        WINDOWS.backgrounds.push(win);
        id++;
    }

    const tray = new Tray(isProd ? path.join(__dirname, "../../tray.png") : path.join(__dirname, "../resources/icon.ico"));
    tray.setToolTip("Wallpaper and Skins");
    const TRAY_ITEMS = [
        {
            id: "devtools",
            label: "Mở Devtools",
            click: async () => {
                WINDOWS.backgrounds[0]?.webContents.openDevTools();
            },
        },
        {
            id: "settings",
            label: "Cài đặt",
            click: async () => {
                console.log("Setting Settings");
            },
        },
        {
            id: "exit",
            label: "Thoát",
            click: async () => {
                app.quit();
            },
        },
    ];
    const contextMenu = Menu.buildFromTemplate(TRAY_ITEMS);
    tray.setContextMenu(contextMenu);
    // setInterval(function () {
    //     let mousePos = screen.getCursorScreenPoint();
    //     console.log(mousePos);
    // }, 0);
    // let mousePos = screen.getCursorScreenPoint();
    // console.log(mousePos);
    // let mainScreen = screen.getPrimaryDisplay();
    // let screens = screen.getAllDisplays();

    // let apps = await fetchInstalledSoftware.getAllInstalledSoftware();
    // console.log("apps:", apps);
})();
const sendLogToBg = (message: string) => {
    WINDOWS.backgrounds[0]?.webContents.send(
        "main-to-window",
        JSON.stringify({
            channel: "log",
            data: message,
        })
    );
};
app.on("window-all-closed", () => {
    app.quit();
});

ipcMain.on("message", async (_event, arg) => {
    let obj = JSON.parse(arg);
    switch (obj.type) {
        case "save-image":
            handleFile.saveImage(obj.data, obj.data?.name);
            break;
        case "destroy-image":
            handleFile.removeImageById(obj.data);
            break;
        case "save-video":
            let data = await handleFile.saveVideo(obj.data);
            if (data.isSuccess) sendMessageToBackground("video-upload-completed", { id: data.id, path: data.path });
            break;
        case "destroy-video":
            handleFile.removeVideoById(obj.data);
            break;
        case "exit-app":
            app.quit();
            break;
        default:
            break;
    }
});
const sendMessageToBackground = (channel: string, data) => {
    WINDOWS.backgrounds[0]?.webContents.send(
        "main-to-window",
        JSON.stringify({
            channel,
            data,
        })
    );
};
