export const customId = () => {
    let id = new Date().getTime();
    return id.toString();
};

export const saveImage = ({ name, url }: { name: string; url: string }) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        window.ipc?.send(
            "message",
            JSON.stringify({
                type: "save-image",
                data: {
                    path: dataURL,
                    type: "base64",
                    name,
                },
            })
        );
    };
    img.src = url;
};

export const imageToBase64 = (url: any, callback?: (string) => void) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        callback(dataURL);
    };
    img.src = url;
};
export const destroyImage = (id: string) => {
    window.ipc?.send(
        "message",
        JSON.stringify({
            type: "destroy-image",
            data: id,
        })
    );
};
export const sendMessageToServer = (channel: string, data: unknown) => {
    window.ipc?.send(
        "message",
        JSON.stringify({
            type: channel,
            data,
        })
    );
};
