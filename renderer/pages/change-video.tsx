"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddVideo from "../Components/ChangeVideo/VideoItem/AddVideo";
import VideoItem from "../Components/ChangeVideo/VideoItem/VideoItem";
import { PATH, Swal, initialBackground } from "../helpers/constant";
import { DATA } from "../helpers/data";
import { sendMessageToServer } from "../helpers/helpers";
import { setInitBackground } from "../redux/features/background";
import { removeVideoById } from "../redux/features/path";
import { useAppSelector } from "../redux/store";

function ChangeVideoPage() {
    const _PATH = useAppSelector((state) => state.pathReducer);
    const TEXT = useAppSelector((state) => state.languageReducer);
    const BG = useAppSelector((state) => state.backgroundReducer);
    const dispatch = useDispatch();
    const router = useRouter();
    const [videos, setVideos] = useState<Array<{ id: string; path: string; isActive: boolean }>>([
        {
            id: "0",
            path: initialBackground.url,
            isActive: true,
        },
    ]);
    useEffect(() => {
        let a = [videos[0]];
        interface _IV {
            id: string;
            path: string;
        }
        _PATH.videos.forEach((video) => {
            let v: _IV = video;
            a.push({ ...v, isActive: false });
        });
        a.forEach((v) => (v.isActive = BG.id == v.id));
        setVideos(a);
    }, [_PATH.videos]);

    //
    const setActiveVideo = (id) => {
        setVideos((prev) => {
            prev.forEach((v) => {
                v.isActive = v.id == id;
            });
            return [...prev];
        });
    };
    const deleteVideo = (id) => {
        Swal.fire({
            title: TEXT.title.question_delete_video,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: TEXT.button.confirm,
            cancelButtonText: TEXT.button.cancel,
        }).then((result) => {
            if (result.isConfirmed) {
                let newVideos = [...videos];
                let i = videos.findIndex((v) => v.id == id);
                if (newVideos[i].isActive) {
                    DATA.setBackground({ ...BG, id: "0", url: PATH.video });
                    dispatch(setInitBackground({ ...BG, id: "0", url: PATH.video }));
                }
                dispatch(removeVideoById(id));
                sendMessageToServer("destroy-video", id);
            }
        });
    };
    const handleSaveClick = () => {
        let item = videos.find((v) => v.isActive);
        DATA.setBackground({ isPlay: true, id: item.id, url: item.path });
        setTimeout(() => {
            router.push("/home");
        }, 10);
    };
    return (
        <div className="flex flex-col h-svh justify-around ">
            <div className="text-center text-4xl py-3 font-bold">{TEXT.menu.change_video}</div>
            <div className="flex mx-2">
                <div className="start w-8/12 flex justify-center">
                    <div className="video w-full">
                        <video
                            style={{ height: "calc(100vw / 2.7)" }}
                            className="w-full"
                            autoPlay
                            loop
                            muted
                            controls
                            src={videos.find((v) => v.isActive)?.path}
                        />
                    </div>
                </div>
                <div className="end flex justify-center w-4/12">
                    <div
                        className="w-11/12 flex flex-wrap content-start overflow-hidden overflow-y-auto"
                        style={{ height: "calc(100vw / 2.7)" }}
                    >
                        <AddVideo setVideos={setVideos} />
                        {videos.map((v) => (
                            <VideoItem
                                key={v.id}
                                id={v.id}
                                url={v.path}
                                isActive={v.isActive}
                                deleteVideo={deleteVideo}
                                setActiveVideo={setActiveVideo}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="rounded px-5 py-1 text-white text-lg mx-1 bg-[#4bc44b] " onClick={handleSaveClick}>
                    {TEXT.button.save}
                </button>
                {/* <button className="rounded px-5 py-1 text-white text-lg mx-1 bg-gray-600" onClick={() => {}}>
                    {TEXT.button.default}
                </button> */}
                <button
                    className="rounded px-5 py-1 text-white text-lg mx-1 bg-[red]"
                    onClick={() => {
                        router.back();
                    }}
                >
                    {TEXT.button.cancel}
                </button>
            </div>
        </div>
    );
}

export default ChangeVideoPage;
