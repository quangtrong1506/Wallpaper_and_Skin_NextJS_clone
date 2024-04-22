import { randomUUID } from "crypto";
import electron from "electron";
import fse from "fs-extra";
import path from "path";
const userPath = electron.app.getPath("userData");

const saveVideo = async (data, name = randomUUID()) => {
    let fileType = data.type?.split("/")[1] || "mp4";
    try {
        await fse.copy(data.path, path.join(userPath, `/assets/videos/${name}.${fileType}`));
        return {
            id: name,
            path: path.join(userPath, `/assets/videos/${name}.${fileType}`),
            isSuccess: true,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
const saveImage = async (data, name = randomUUID()) => {
    let fileType = data.type || "png";
    try {
        if (fileType === "base64") {
            const buffer = Buffer.from(data.path, "base64");
            const check = await fse.pathExists(path.join(userPath, `/assets/images/`));
            if (!check) await fse.ensureDir(path.join(userPath, `/assets/images/`));
            await fse.writeFile(path.join(userPath, `/assets/images/${name}.png`), buffer, { flag: "w+" });
        } else await fse.copy(data.path, path.join(userPath, `/assets/images/${name}.png`));
        return {
            id: name,
            path: `/assets/images/${name}.png`,
            isSuccess: true,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
const count = {
    video: 0,
    image: 0,
};
const removeVideoById = async (id) => {
    let fileName = id + ".mp4";
    try {
        await fse.remove(path.join(userPath, `/assets/videos/${fileName}`));
        return true;
    } catch (error) {
        if (error.code === "EBUSY")
            setTimeout(() => {
                if (count.video === 5) return;
                count.video++;
                removeVideoById(id);
            }, 5000);
        else count.video = 0;
        console.log(error);
        return false;
    }
};
const removeImageById = async (id) => {
    console.log(id);

    let fileName = id + ".png";
    try {
        await fse.remove(path.join(userPath, `/assets/images/${fileName}`));
        return true;
    } catch (error) {
        if (error.code === "EBUSY")
            setTimeout(() => {
                if (count.image === 5) return;
                count.image++;
                removeVideoById(id);
            }, 5000);
        else count.image = 0;
        console.log(error);
        return false;
    }
};
// Danh sách video đã tải lên
const getListVideos = async () => {
    try {
        const check = await fse.pathExists(path.join(userPath, `/assets/videos/`));
        if (!check) await fse.ensureDir(path.join(userPath, `/assets/videos/`));
        let files = fse.readdirSync(path.join(userPath, `/assets/videos/`));
        const list = [];
        files.forEach((file) => {
            list.push({
                id: file.split(".")[0],
                path: path.join(userPath, `/assets/videos/` + file),
            });
        });
        return list;
    } catch (error) {
        console.log(error);
        return [];
    }
};
// Danh sách ảnh (icon shortcut) có sẵn
const getListImages = () => {
    try {
        const list = fse.readdirSync(path.join(electron.app.getAppPath(), "renderer/public/images/shortcuts/"));
        return list;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const handleFile = {
    getListImages,
    getListVideos,
    saveImage,
    saveVideo,
    removeVideoById,
    removeImageById,
};
export default handleFile;
export { getListImages, getListVideos, removeImageById, removeVideoById, saveImage, saveVideo };
