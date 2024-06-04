import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const handler = {
    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value);
    },
    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
        ipcRenderer.on(channel, subscription);
        return () => {
            ipcRenderer.removeListener(channel, subscription);
        };
    },
};
handler.on('main-to-window', (args: string) => {
    let _data: {
        channel: string;
        data: unknown;
    } = JSON.parse(args);
    console.log(_data);
    window.postMessage(
        {
            channel: _data.channel,
            data: _data.data,
        },
        '*'
    );
});

contextBridge.exposeInMainWorld('ipc', handler);

export type IpcHandler = typeof handler;
