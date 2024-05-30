import { GoogleGenerativeAI } from '@google/generative-ai';
import https from 'https';

export const customId = () => {
    let id = new Date().getTime();
    return id.toString();
};

export const saveImage = ({ name, image, typeSave, path }: { path: string; name: string; image: any; typeSave?: any }) => {
    image.type = getImageType(typeSave == 'base64' ? image.data.path : image.url) ?? 'png';
    window.ipc?.send(
        'message',
        JSON.stringify({
            type: 'save-image',
            data: {
                image: {
                    ...image,
                    path,
                },
                name,
                typeSave,
            },
        })
    );
};

export const imageToBase64 = (url: any, callback?: (string) => void) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL('image/png');
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
        callback(dataURL);
    };
    img.src = url;
};
export const destroyImage = (fileName: string) => {
    window.ipc?.send(
        'message',
        JSON.stringify({
            type: 'destroy-image',
            data: fileName,
        })
    );
};
export const sendMessageToServer = (channel: string, data?: unknown) => {
    window.ipc?.send(
        'message',
        JSON.stringify({
            type: channel,
            data,
        })
    );
};
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GGAPIKEY);
export const getMessage = async (content: string) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();
    return text;
};
export const getImageType = (path) => {
    if (!path) return;
    let a: string[] = path.split('.');
    let type = a[a.length - 1] ?? 'png';
    return type;
};

// Hàm kiểm tra video tồn tại trên YouTube
export function checkVideoExists(videoId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.youtube.com',
            port: 443,
            path: `/oembed?format=json&url=https://www.youtube.com/watch?v=${videoId}`,
            method: 'HEAD',
        };

        const req = https.request(options, (res) => {
            // Nếu mã trạng thái là 404, video không tồn tại
            resolve(res.statusCode !== 404 && res.statusCode !== 400);
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.end();
    });
}
