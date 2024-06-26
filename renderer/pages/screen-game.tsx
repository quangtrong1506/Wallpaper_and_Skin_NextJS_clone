import { useEffect, useRef, useState } from 'react';
import ListApp from '../Components/Game/ListApp';
import AIChat from '../Components/Game/Screen/AIChat';
import BottomChat from '../Components/Game/Screen/BottomChat';
import Day from '../Components/Game/Screen/Day';
import LucGiacNho from '../Components/Game/Screen/LucGiacNho';
import Time from '../Components/Game/Screen/Time';
import ButtonLeft from '../Components/Shared/Game/ButtonLeft';
import UserName from '../Components/Shared/Game/UserName';

function ScreenGamePage() {
    const [scale, setScale] = useState<number>(0);
    const [showChat, setShowChat] = useState<boolean>(false);
    const [showApps, setShowApps] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>();

    useEffect(() => {
        const reSize = () => {
            let { clientWidth, clientHeight } = document.body;
            setScale(clientWidth / 1920);
        };
        reSize();

        setTimeout(() => {
            if (videoRef.current.paused) videoRef.current?.play();
        }, 100);

        window.addEventListener('resize', reSize);
        return () => {
            window.removeEventListener('resize', reSize);
        };
    }, []);

    return (
        <div className="relative overflow-hidden h-screen w-screen bg-[black]">
            <div
                onClick={() => {
                    setShowApps(false);
                }}
            >
                <div
                    className="w-[40%] absolute h-screen top-0 right-[100%]"
                    style={{
                        transform: showChat ? 'translateX(100%)' : 'translateX(0)',
                        transition: 'all 0.5s cubic-bezier(0.1, 0.1, 0.1, 1)',
                    }}
                >
                    {/* <video className=" w-full h-full object-cover" src="/videos/hk-3.mp4" autoPlay muted loop></video> */}
                    <img
                        className=" w-full object-cover"
                        src="/images/test.png"
                        style={{
                            height: 1080 * scale + 'px',
                        }}
                    />
                </div>
                <div
                    className="overflow-hidden max-h-screen w-full"
                    style={{
                        transform: showChat ? 'translateX(40%)' : 'translateX(0)',
                        transition: 'all 0.5s cubic-bezier(0.1, 0.1, 0.1, 1)',
                    }}
                    onClick={() => {
                        showChat && setShowChat(false);
                    }}
                >
                    <UserName scale={scale} />
                    <video id="video-bg" ref={videoRef} className="object-contain h-full w-full" muted autoPlay loop src="/videos/hk-3.mp4"></video>
                    {/* <img src="/images/abc.png" alt="" /> */}
                    <Time scale={scale} />
                    <Day scale={scale} />
                    {/* <FullTime scale={scale} /> */}
                </div>
                {!showChat && (
                    <>
                        {/* <RightButton scale={scale} listEvent={{ setApps: setShowApps }} /> */}
                        {/* <ButtonBottomRightOnly scale={scale} /> */}

                        <div
                            className="fixed w-0 h-0 left-[2vw] bottom-[2vw]"
                            style={{
                                scale: scale.toString(),
                            }}
                            onClick={() => {
                                setShowChat(true);
                            }}
                        >
                            <BottomChat />
                        </div>
                    </>
                )}
                <div className="absolute w-0 h-0 top-1/2 -translate-y-1/2 left-0">
                    <div
                        className="relative"
                        style={{
                            transform: showChat ? `translateX(-${500 * scale}px)` : 'translateX(0)',
                            transition: 'all 0.5s cubic-bezier(0.1, 0.1, 0.1, 1)',
                        }}
                    >
                        <ButtonLeft scale={scale} />
                    </div>
                </div>
                {showChat && (
                    <div className="w-[40%] absolute h-screen top-0 left-0">
                        <AIChat scale={scale} />
                    </div>
                )}
            </div>
            {!showChat && !showApps && (
                <>
                    <div className="absolute right-[2vw] bottom-[2vw]" style={{ scale: scale.toString() }}>
                        <div
                            className="w-[110px] h-[110px] cursor-pointer"
                            onClick={() => {
                                setShowApps(true);
                            }}
                        >
                            <LucGiacNho icon={6} text="" textAlign="left"></LucGiacNho>
                        </div>
                    </div>
                </>
            )}
            <div
                className="absolute top-0 bottom-0 right-0 bg-[rgba(0,0,0,0.7)] w-[45%] "
                style={{
                    transform: showApps ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'all 0.5s cubic-bezier(0.1, 0.1, 0.1, 1)',
                }}
            >
                <ListApp />
            </div>
            {/* <div className="absolute right-[200px] bottom-0 z-50 w-60">
                <LucGiacLon text="Ứng dụng" type="box" />
            </div> */}
        </div>
    );
}

export default ScreenGamePage;
