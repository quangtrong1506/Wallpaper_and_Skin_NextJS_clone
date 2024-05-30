import { randomUUID } from 'crypto';
import electron from 'electron';
import fse from 'fs-extra';
import * as https from 'https';
import path from 'path';
import { isProd } from '../helpers';

export const userPath = electron.app.getPath('userData');

// Retrieves the image file type from a path, defaulting to 'png'.
export const getImageType = (filePath: string): string | undefined => {
    if (!filePath) return;
    const segments = filePath.split('.');
    return segments.pop() ?? 'png';
};

// Downloads a file in the background to a specified path.
const downloadFileInBackground = ({ filePath = 'https://i.ibb.co/Pzb3jk1/blob.jpg', name = 'Temp' }: { filePath: string; name: string }): void => {
    const type = getImageType(filePath);
    const fileStream = fse.createWriteStream(path.join(userPath, `/assets/images/${name}.${type}`));
    const request = https.get(filePath, (response) => {
        response.pipe(fileStream);
    });

    request.on('error', (err) => console.error(err));
};

// Saves video data to a file and returns metadata.
const saveVideo = async (data, name = randomUUID()) => {
    const fileType = data.type?.split('/')[1] || 'mp4';
    try {
        const videoPath = path.join(userPath, `/assets/videos/${name}.${fileType}`);
        await fse.copy(data.path, videoPath);
        return { id: name, path: videoPath, isSuccess: true };
    } catch (error) {
        console.error(error);
        return error;
    }
};

// Saves image data to a file and returns metadata.
const saveImage = async (data) => {
    const name = data?.name ?? randomUUID();
    const type = getImageType(data.image.type) ?? 'png';
    const imagePath = path.join(userPath, `/assets/images/${name}.${type}`);
    if (data.typeSave == 'link') {
        downloadFileInBackground({ filePath: data.image?.url, name });
    } else if (data.typeSave == 'default') {
        let p = isProd ? path.join(__dirname, '../../tray.png') : path.join(__dirname, '../resources/icon.ico');
        await fse.copy(p, imagePath);
    } else if (data.typeSave == 'base64') {
        try {
            await fse.copy(data.image?.path, imagePath);
            return { id: name, path: imagePath, isSuccess: true };
        } catch (error) {
            console.error(error);
            return error;
        }
    }
};

// Utility object to keep track of retry counts.
const count = { video: 0, image: 0 };

// Removes a video by its ID.
const removeVideoById = async (id: string): Promise<boolean> => {
    const fileName = `${id}.mp4`;
    try {
        await fse.remove(path.join(userPath, `/assets/videos/${fileName}`));
        return true;
    } catch (error) {
        handleFileRemovalError(error, 'video', id);
        return false;
    }
};

// Removes an image by its name.
const removeImageByName = async (fileName: string): Promise<boolean> => {
    console.log('delete: ' + fileName);

    try {
        await fse.remove(path.join(userPath, `/assets/images/${fileName}`));
        return true;
    } catch (error) {
        handleFileRemovalError(error, 'image', fileName);
        return false;
    }
};

// Handles file removal errors, retrying if necessary.
const handleFileRemovalError = (error, fileType: 'video' | 'image', id: string) => {
    console.error(error);
    if (error.code === 'EBUSY') {
        setTimeout(() => {
            if (count[fileType] === 5) return;
            count[fileType]++;
            fileType === 'video' ? removeVideoById(id) : removeImageByName(id);
        }, 5000);
    } else {
        count[fileType] = 0;
    }
};

// Retrieves a list of uploaded videos.
const getListVideos = async (): Promise<Array<{ id: string; path: string }>> => {
    try {
        const videosPath = path.join(userPath, `/assets/videos/`);
        await ensureDirectoryExists(videosPath);
        const files = fse.readdirSync(videosPath);
        return files.map((file) => ({
            id: file.split('.')[0],
            path: path.join(videosPath, file),
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Ensures a directory exists before reading or writing to it.
const ensureDirectoryExists = async (directoryPath: string) => {
    const exists = await fse.pathExists(directoryPath);
    if (!exists) await fse.ensureDir(directoryPath);
};

// Retrieves a list of available shortcut images.
const getListImages = (): string[] => {
    try {
        return fse.readdirSync(path.join(electron.app.getAppPath(), 'renderer/public/images/shortcuts/'));
    } catch (error) {
        console.error(error);
        return [];
    }
};

const handleFile = {
    getListImages,
    getListVideos,
    saveImage,
    saveVideo,
    removeVideoById,
    removeImageByName,
};

export default handleFile;
export { getListImages, getListVideos, removeImageByName, removeVideoById, saveImage, saveVideo };
