import { useState } from "react";
import { useAppSelector } from "../../../redux/store";

interface _IProps {
    id: string;
    url: string;
    isActive?: boolean;
    setActiveVideo?: (string) => void;
    deleteVideo?: (string) => void;
}
function VideoItem({ id, url, isActive, setActiveVideo, deleteVideo }: _IProps) {
    const TEXT = useAppSelector((state) => state.languageReducer);
    const [isShow, setIsShow] = useState(false);
    return (
        <div className="item w-6/12 px-[4px] mb-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg relative group bg-gray-100">
                <video className="w-full" src={url} style={{ height: "calc(100vw / 12)" }} />
                <div className="hidden group-hover:block absolute right-3 top-1 bg-gray-950 bg-opacity-45 px-3 py-0 rounded-md z-10">
                    <button
                        className="mt-2"
                        type="button"
                        onClick={() => {
                            setIsShow(true);
                        }}
                    >
                        <svg className="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white">
                            <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                        </svg>
                    </button>
                    {isShow && (
                        <div className="relative">
                            <ul
                                className="absolute top-[-30px] -right-2 bg-white py-1 px-2 rounded z-20"
                                onMouseLeave={() => {
                                    setIsShow(false);
                                }}
                            >
                                <li
                                    className="cursor-pointer text-center hover:font-medium"
                                    onClick={() => {
                                        setActiveVideo(id);
                                    }}
                                >
                                    {TEXT.button.select}
                                </li>
                                {id !== "0" && (
                                    <>
                                        <li>
                                            <hr />
                                        </li>
                                        <li
                                            className="cursor-pointer text-[red] text-center hover:font-medium"
                                            onClick={() => {
                                                deleteVideo(id);
                                            }}
                                        >
                                            {TEXT.button.delete}
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div
                    className={`absolute h-full w-full top-0 left-0 ${isActive ? "border-2 border-blue-500" : ""}`}
                    onClick={() => {
                        setActiveVideo(id);
                    }}
                ></div>
            </div>
        </div>
    );
}

export default VideoItem;
