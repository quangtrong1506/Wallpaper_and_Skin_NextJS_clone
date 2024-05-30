import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch } from 'react-redux';
import { Swal } from '../../../helpers/constant';
import { addVideo } from '../../../redux/features/path';
import { useAppSelector } from '../../../redux/store';
interface IProps {
    id: string;
    setVideoDownloading: (any) => void;
}
function VideoLoading({ id, setVideoDownloading }: IProps) {
    const [value, setValue] = useState(0);
    const _PATH = useAppSelector((state) => state.pathReducer);
    const TEXT = useAppSelector((state) => state.languageReducer);
    const dispatch = useDispatch();
    const [noInternet, setNoInternet] = useState(false);

    useEffect(() => {
        const handleDownloadProcess = (e) => {
            let _data = e.data;
            switch (_data?.channel) {
                case 'video-processing':
                    if (_data?.data.videoID == id) setValue(_data.data.process);
                    break;
                case 'video-downloaded':
                    if (_data?.data.videoID == id) {
                        setTimeout(() => {
                            if (!window.navigator.onLine) {
                                Swal.fire('', TEXT.notification.errors.no_internet, 'error');
                                setNoInternet(true);
                                return;
                            }
                            setVideoDownloading((prev) => {
                                const newVideo = [...prev];
                                newVideo.splice(
                                    newVideo.findIndex((v) => v.videoID == id),
                                    1
                                );
                                return newVideo;
                            });
                            dispatch(
                                addVideo({
                                    id: _data?.data.id,
                                    path: _PATH.userPath + '/assets/videos/' + _data?.data.id + '.mp4',
                                })
                            );
                        }, 1000);
                    }
                    break;
                default:
                    console.log('Default');
                    break;
            }
        };
        window.addEventListener('message', handleDownloadProcess);
        return () => {
            window.removeEventListener('message', handleDownloadProcess);
        };
    }, [id]);
    return (
        <>
            <div className="item w-6/12 px-[4px] mb-2 border border-black/10 relative">
                <div className="max-w-sm rounded overflow-hidden relative ">
                    <div
                        className="w-full flex justify-center items-center h-[calc(100vw_/_12)] bg-cover bg-center blur-sm bg-no-repeat"
                        style={{
                            backgroundImage: `url(https://img.youtube.com/vi/${id}/0.jpg)`,
                        }}
                    ></div>
                    <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fle">
                        <div className="w-[calc(100vw_/_24)] h-[calc(100vw_/_24)]">
                            <CircularProgressbar
                                value={value}
                                text={`${value}%`}
                                styles={{
                                    text: {
                                        fill: noInternet ? 'red' : '#fff',
                                    },
                                    path: {
                                        stroke: noInternet ? 'red' : '#028391',
                                    },
                                }}
                            />
                            ;
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoLoading;
