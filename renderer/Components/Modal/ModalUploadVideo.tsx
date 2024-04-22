import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Swal } from "../../helpers/constant";
import { addVideo } from "../../redux/features/path";
import { useAppSelector } from "../../redux/store";
import LoadingText from "../LoadingText";
interface IProps {
    setIsShowModal: (boolean) => void;
    setVideos: (any) => any;
}
function ModalUploadVideo({ setIsShowModal, setVideos }: IProps) {
    const TEXT = useAppSelector((state) => state.languageReducer);
    const [type, setType] = useState(0);
    const [youtubeId, setYoutubeId] = useState("");
    const [linkDisplayVideo, setLinkDisplayVideo] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileUpload = useRef(null);
    const dispatch = useDispatch();
    const handleDragover = (e) => {
        e.preventDefault();
        document.getElementById("dropzone").classList.add("border-[#007F73]");
    };
    const handleDragleave = (e) => {
        e.preventDefault();
        document.getElementById("dropzone").classList.remove("border-[#007F73]");
    };
    const handleDrop = (e) => {
        e.preventDefault();
        document.getElementById("dropzone").classList.remove("border-[#007F73]");
        var file = e.dataTransfer.files[0];
        displayPreview(file);
    };
    const handleChange = (e) => {
        var file = e.target.files[0];
        displayPreview(file);
    };

    function displayPreview(file) {
        fileUpload.current = file;
        if (!file) return;
        if (file.type.match("video")) setLinkDisplayVideo(URL.createObjectURL(file));
        else setLinkDisplayVideo("");
    }
    useEffect(() => {
        const handleMessage = (e) => {
            let _data = e.data;
            console.log(_data);
            switch (_data?.channel) {
                case "video-upload-completed":
                    setVideos((prev) => [...prev, _data.data]);
                    Swal.fire("", TEXT.notification.success.upload_video_completed, "success");
                    dispatch(addVideo(_data.data));
                    setIsShowModal(false);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);
    const handleUploadVideo = () => {
        if (!fileUpload.current?.path) return;
        setIsLoading(true);
        window.ipc.send(
            "message",
            JSON.stringify({
                type: "save-video",
                data: {
                    path: fileUpload.current?.path,
                },
            })
        );
    };
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-950 bg-opacity-60 z-50 flex justify-center items-center ">
            <div className="w-[450px] bg-white px-6 py-5 rounded-md">
                <div className="text-center font-bold text-4xl mb-3">{TEXT.title.add_new_video}</div>
                {type === 0 && (
                    <div>
                        <div
                            className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6  "
                            id="dropzone"
                            onDragOver={handleDragover}
                            onDragLeave={handleDragleave}
                            onDrop={handleDrop}
                        >
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" onChange={handleChange} />
                            <div className="text-center">
                                <img className="mx-auto h-12 w-12" src="/images/upload-video.svg" alt="..." />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    <label htmlFor="file-upload" className="relative cursor-pointer">
                                        <span>{TEXT.tooltip.upload_file}</span>
                                        <input id="file-upload" name="file-upload" type="file" accept=".mp4, .mkv" className="sr-only" />
                                    </label>
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">MP4, MKV, ...</p>
                            </div>
                        </div>
                        {linkDisplayVideo && (
                            <div className="w-full rounded-md overflow-hidden mt-2 px-0">
                                <video className="w-full max-h-[230px]  h-full" src={linkDisplayVideo} controls muted></video>
                            </div>
                        )}
                    </div>
                )}
                {type === 1 && (
                    <div className="text-center flex justify-center flex-wrap">
                        <div>
                            <input
                                className="w-[300px] border border-gray-300 focus:outline-none p-1 rounded"
                                type="text"
                                placeholder="https://youtu.be/6NE5xcTEonU"
                                defaultValue={youtubeId ? "https://youtu.be/" + youtubeId : ""}
                                onChange={(e) => {
                                    let link = e.target.value;
                                    let id = "";
                                    if (link.match(/\?v=/i)) id = link.split("?v=")[1].split("&")[0];
                                    if (link.match(/youtu.be\//)) id = link.split("youtu.be/")[1].split("?")[0];
                                    if (link.match(/embed\//)) id = link.split("embed/")[1].split("?")[0];
                                    setYoutubeId(id);
                                }}
                            />
                        </div>
                        <div>
                            <span className="w-[300px] text-left inline-block text-xs text-gray-500">*{TEXT.tooltip.paste_link_here}</span>
                        </div>
                        {youtubeId && (
                            <div className="w-[300px]">
                                <iframe
                                    width="298"
                                    height="168"
                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                    title="YouTube video player"
                                    allow="muted; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                )}
                <div className="text-center mt-2">
                    {type === 0 && !isLoading && (
                        <button
                            className="bg-[#25a9b5] text-white rounded px-3 py-1 mx-1 hover:opacity-80"
                            onClick={() => {
                                setType(1);
                            }}
                        >
                            {TEXT.button.special.download_form_youtube}
                        </button>
                    )}
                    {type === 1 && !isLoading && (
                        <button
                            className="bg-[#25a9b5] text-white rounded px-3 py-1 mx-1 hover:opacity-80"
                            onClick={() => {
                                setType(0);
                                <button
                                    className="bg-blue-600 text-white rounded px-3 py-1 mx-1 hover:opacity-80"
                                    onClick={handleUploadVideo}
                                >
                                    {TEXT.button.upload}
                                </button>;
                            }}
                        >
                            {TEXT.button.special.upload_file}
                        </button>
                    )}
                    {isLoading && (
                        <div className="bg-[#25a9b5] text-white rounded px-3 py-[6px] mx-1 hover:opacity-80">
                            <LoadingText bgColor="transparent" textColor="white" />
                        </div>
                    )}
                    {!isLoading && (
                        <>
                            <button className="bg-blue-600 text-white rounded px-3 py-1 mx-1 hover:opacity-80" onClick={handleUploadVideo}>
                                {TEXT.button.upload}
                            </button>
                            <button
                                className="bg-[red] text-white rounded px-3 py-1 mx-1 hover:opacity-80"
                                onClick={() => {
                                    setIsShowModal(false);
                                }}
                            >
                                {TEXT.button.cancel}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalUploadVideo;
