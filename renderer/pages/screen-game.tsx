import { useEffect, useState } from 'react';
import AIChat from '../Components/Game/Screen/AIChat';
import BottomChat from '../Components/Game/Screen/BottomChat';
import ButtonLeft from '../Components/Shared/Game/ButtonLeft';
import RightButton from '../Components/Shared/Game/RightButton';
import TowButtonBottomRight from '../Components/Shared/Game/TowButtonBottomRight';
import UserName from '../Components/Shared/Game/UserName';

function ScreenGamePage() {
    const [scale, setScale] = useState<number>(0);
    const [showChat, setShowChat] = useState<boolean>(false);
    useEffect(() => {
        const reSize = () => {
            let { clientWidth, clientHeight } = document.body;
            setScale(clientWidth / 1920);
        };
        // document.body.style.transform = 'translateX(240px)';
        reSize();
        window.addEventListener('resize', reSize);
        return () => {
            window.removeEventListener('resize', reSize);
        };
    }, []);
    return (
        <div className="relative overflow-hidden h-screen w-screen bg-[black]">
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
                ></img>
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
                <video className="object-contain h-full w-full" muted autoPlay loop src="/videos/hk-3.mp4"></video>
                {/* <img src="/images/abc.png" alt="" /> */}
            </div>
            {!showChat && (
                <>
                    <RightButton scale={scale} />
                    <TowButtonBottomRight scale={scale} />

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
    );
}

export default ScreenGamePage;
