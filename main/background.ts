import { Menu, Tray, app, ipcMain, screen, shell } from 'electron';
import serve from 'electron-serve';
import path from 'path';
import createLogger from 'progress-estimator';
import youtubeDl from 'youtube-dl-exec';
import { isProd } from './helpers';
import handleFile, { getListImages, getListVideos, userPath } from './helpers/utils/files';
import { BG_WINDOW } from './windows/bg-window';

const WINDOWS = {
    backgrounds: [],
};
if (isProd) {
    serve({ directory: 'app' });
    app.setLoginItemSettings({
        openAtLogin: true,
    });
} else {
    app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
    await app.whenReady();
    let screens = screen.getAllDisplays();
    console.log(screens);
    let count = 1;
    for await (const scr of screens) {
        let win = await BG_WINDOW({
            name: 'background-window-' + count,
            options: {
                x: scr.bounds.x,
                y: scr.bounds.y,
            },
            type: count == screens.length ? 'game' : 'default',
        });
        WINDOWS.backgrounds.push(win);
        count++;
    }
    const tray = new Tray(isProd ? path.join(__dirname, '../../tray.png') : path.join(__dirname, '../resources/icon.ico'));
    tray.setToolTip('Wallpaper and Skins');
    const TRAY_ITEMS = [
        {
            id: 'devtools',
            label: 'Mở Devtools',
            click: async () => {
                WINDOWS.backgrounds[0]?.webContents.openDevTools();
            },
        },
        {
            id: 'settings',
            label: 'Cài đặt',
            click: async () => {
                console.log('Setting Settings');
            },
        },
        {
            id: 'exit',
            label: 'Thoát',
            click: async () => {
                app.quit();
            },
        },
    ];
    const contextMenu = Menu.buildFromTemplate(TRAY_ITEMS);
    tray.setContextMenu(contextMenu);
})();
const sendLogToBg = (message: string) => {
    WINDOWS.backgrounds[0]?.webContents.send(
        'main-to-window',
        JSON.stringify({
            channel: 'log',
            data: message,
        })
    );
};
app.on('window-all-closed', () => {
    app.quit();
});

ipcMain.on('message', async (_event, arg) => {
    let obj = JSON.parse(arg);
    switch (obj.type) {
        case 'save-image':
            handleFile.saveImage(obj.data);
            break;
        case 'destroy-image':
            handleFile.removeImageByName(obj.data);
            break;
        case 'save-video':
            let data = await handleFile.saveVideo(obj.data);
            if (data.isSuccess) sendMessageToBackground('video-upload-completed', { id: data.id, path: data.path });
            break;
        case 'destroy-video':
            handleFile.removeVideoById(obj.data);
            break;
        case 'exit-app':
            app.quit();
            break;
        case 'open-app':
            shell.openExternal(path.join(obj.data));

            break;
        case 'loaded':
            let images = await getListImages();
            let videos = await getListVideos();
            WINDOWS.backgrounds.forEach((background) => {
                background.webContents.send(
                    'main-to-window',
                    JSON.stringify({
                        channel: 'path',
                        data: { images, videos, userPath: app.getPath('userData').replace(' (development)', '') },
                    })
                );
                background.webContents.send(
                    'main-to-window',
                    JSON.stringify({
                        channel: 'id',
                        data: background.id,
                    })
                );
            });
            break;
        case 'create-app':
            WINDOWS.backgrounds.forEach((background) => {
                setTimeout(() => {
                    obj.data.id != background.id &&
                        background.webContents.send(
                            'main-to-window',
                            JSON.stringify({
                                channel: 'new-app',
                                data: {
                                    id: background.id,
                                    item: obj.data.item,
                                },
                            })
                        );
                }, 1000);
            });
            break;
        case 'update-app':
            WINDOWS.backgrounds.forEach((background) => {
                setTimeout(() => {
                    obj.data.id != background.id &&
                        background.webContents.send(
                            'main-to-window',
                            JSON.stringify({
                                channel: 'update-app',
                                data: {
                                    id: background.id,
                                    item: obj.data.item,
                                },
                            })
                        );
                }, 1000);
            });
            break;
        case 'destroy-app':
            WINDOWS.backgrounds.forEach((background) => {
                setTimeout(() => {
                    obj.data.id != background.id &&
                        background.webContents.send(
                            'main-to-window',
                            JSON.stringify({
                                channel: 'destroy-app',
                                data: {
                                    id: background.id,
                                    itemID: obj.data.data.id,
                                },
                            })
                        );
                }, 1000);
            });
            break;
        case 'download-video':
            downloadVideo(obj.data.videoID, obj.data.name);
            break;
        default:
            break;
    }
});
const sendMessageToBackground = (channel: string, data) => {
    WINDOWS.backgrounds[0]?.webContents.send(
        'main-to-window',
        JSON.stringify({
            channel,
            data,
        })
    );
};

const downloadVideo = async (videoID: string, name: string = 'unknown') => {
    try {
        // Tạo đường dẫn đầy đủ cho file đầu ra dựa trên URL và thư mục đích
        const outputPath = path.resolve(userPath, 'assets/videos/', name + '.mp4');
        // Gọi youtube-dl-exec để tải video
        const promise = youtubeDl(`https://youtu.be/${videoID}`, {
            output: outputPath,
            format: 'bestvideo[ext=mp4]',
        });
        const render = (string) => {
            // Obtaining:   69%                 5.1s, estimated 7.4s
            const process = parseInt((string?.match(/([\d][\d]%|[\d]%)/)?.[0] ?? '100%').replace('%', ''));
            const totalTime = parseFloat(string?.match(/(\d.\d)/)?.[0]);
            const estimatedTime = parseFloat(string?.match(/(\d.\d)/g)?.[1]);
            const timeRemaining = estimatedTime - totalTime < 0 ? 0 : estimatedTime;
            console.log(process + '%');
            WINDOWS.backgrounds.forEach((element) => {
                element.webContents.send(
                    'main-to-window',
                    JSON.stringify({
                        channel: 'video-processing',
                        data: {
                            id: name,
                            videoID,
                            process,
                            totalTime,
                            estimatedTime,
                            timeRemaining,
                        },
                    })
                );
            });
        };
        render.clear = () => {
            console.log('clear');
        };
        render.done = () => {
            WINDOWS.backgrounds.forEach((element) => {
                element.webContents.send(
                    'main-to-window',
                    JSON.stringify({
                        channel: 'video-downloaded',
                        data: {
                            videoID,
                            id: name,
                        },
                    })
                );
            });
        };
        const logger = createLogger({
            logFunction: render,
        });
        await logger(promise, '', {
            estimate: 1000,
        });
        // console.log(result.match(/([\d][\d]%|[\d]%)/)[0]);
    } catch (error) {
        console.error('An error occurred while loading the video:', error);
    }
};
//
