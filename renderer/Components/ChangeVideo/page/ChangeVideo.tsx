'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PATH, Swal, initialBackground } from '../../../helpers/constant';
import { DATA } from '../../../helpers/data';
import { sendMessageToServer } from '../../../helpers/helpers';
import { setInitBackground } from '../../../redux/features/background';
import { removeVideoById } from '../../../redux/features/path';
import { useAppSelector } from '../../../redux/store';
import AddVideo from '../VideoItem/AddVideo';
import VideoItem from '../VideoItem/VideoItem';
import VideoLoading from '../VideoItem/VideoLoading';

function ChangeVideoPage({ setShowChangeVideo }: { setShowChangeVideo: any }) {
    const _PATH = useAppSelector((state) => state.pathReducer);
    const TEXT = useAppSelector((state) => state.languageReducer);
    const BG = useAppSelector((state) => state.backgroundReducer);
    const dispatch = useDispatch();
    const [videos, setVideos] = useState<Array<{ id: string; path: string; isActive: boolean; thumbnail?: string }>>([
        {
            id: '0',
            path: initialBackground.url,
            isActive: true,
        },
    ]);
    const [videoDownloading, setVideoDownloading] = useState<Array<{ id: string; videoID: string }>>([]);
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
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: TEXT.button.confirm,
            cancelButtonText: TEXT.button.cancel,
        }).then((result) => {
            if (result.isConfirmed) {
                let newVideos = [...videos];
                let i = videos.findIndex((v) => v.id == id);
                if (newVideos[i].isActive) {
                    DATA.setBackground({ ...BG, id: '0', url: PATH.video });
                    dispatch(setInitBackground({ ...BG, id: '0', url: PATH.video }));
                }
                dispatch(removeVideoById(id));
                sendMessageToServer('destroy-video', id);
            }
        });
    };
    const handleSaveClick = () => {
        let item = videos.find((v) => v.isActive);
        DATA.setBackground({ isPlay: true, id: item.id, url: item.path });
        dispatch(setInitBackground({ isPlay: true, id: item.id, url: item.path }));
        setShowChangeVideo(false);
    };
    return (
        <div className="flex flex-col h-full justify-around w-full bg-white">
            <div className="text-center text-4xl lg:text-6xl py-3 font-bold">{TEXT.menu.change_video}</div>
            <div className="flex mx-2">
                <div className="start w-8/12 flex justify-center">
                    <div className="video w-full">
                        <video style={{ height: 'calc(100vw / 2.7)' }} className="w-full" autoPlay loop muted controls src={videos.find((v) => v.isActive)?.path} />
                    </div>
                </div>
                <div className="end flex justify-center w-4/12">
                    <div className="w-11/12 flex flex-wrap content-start overflow-hidden overflow-y-auto" style={{ height: 'calc(100vw / 2.7)' }}>
                        <AddVideo setVideos={setVideos} setVideoDownloading={setVideoDownloading} />
                        {videos.map((v) => (
                            <VideoItem key={v.id} id={v.id} url={v.path} isActive={v.isActive} deleteVideo={deleteVideo} setActiveVideo={setActiveVideo} />
                        ))}
                        {videoDownloading.map((v) => (
                            <VideoLoading id={v.videoID} key={v.id} setVideoDownloading={setVideoDownloading} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="rounded px-5 py-1 text-white text-lg lg:text-2xl mx-1 bg-[#4bc44b] " onClick={handleSaveClick}>
                    {TEXT.button.save}
                </button>
                {/* <button className="rounded px-5 py-1 text-white text-lg lg:text-2xl mx-1 bg-gray-600" onClick={() => {}}>
                    {TEXT.button.default}
                </button> */}
                <button
                    className="rounded px-5 py-1 text-white text-lg lg:text-2xl mx-1 bg-[red]"
                    onClick={() => {
                        setShowChangeVideo(false);
                    }}
                >
                    {TEXT.button.cancel}
                </button>
            </div>
        </div>
    );
}

export default ChangeVideoPage;
