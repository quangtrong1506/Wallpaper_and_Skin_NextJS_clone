import { useEffect, useState } from 'react';
import BottomButton from '../Components/Game/Screen/BottomButton';
import BottomChat from '../Components/Game/Screen/BottomChat';
import LucGiacLon from '../Components/Game/Screen/LucGiacLon';
import LucGiacNho from '../Components/Game/Screen/LucGiacNho';
import Start from '../Components/Game/Screen/Start';

function ScreenGamePage() {
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const reSize = () => {
            let { clientWidth } = document.body;
            setScale(clientWidth / 1920);
            console.log(clientWidth / 1920);
        };
        reSize();
        window.addEventListener('resize', reSize);
        return () => {
            window.removeEventListener('resize', reSize);
        };
    }, []);
    return (
        <div className="relative overflow-hidden">
            <div
                className="absolute text-[#f89191] noto-sans-regular opacity-50"
                style={{
                    top: 8 * scale + 'px',
                    left: 128 * scale + 'px',
                    fontSize: 51 * scale + 'px',
                }}
            >
                Bronya
            </div>
            <div className="overflow-hidden">
                <video muted autoPlay loop src="/videos/hk-3.mp4"></video>
                {/* <img src="/images/abc.png" alt="" /> */}
            </div>
            <div className="absolute top-0 left-0"></div>
            <div
                className="absolute"
                style={{
                    width: 490 * scale + 'px',
                    height: 655 * scale + 'px',
                    top: 19.1 * scale + 'vh',
                    right: 1.2 * scale + 'vw',
                    transform: `translateX(${((1 - scale) * 490 * scale) / 2.18}px) translateY(-${((1 - scale) * 655 * scale) / 4.95}px) `,
                }}
            >
                <div className="relative w-full h-full" style={{ scale: `${scale}` }}>
                    <div className="absolute -top-2 w-[208px] right-[48px] text-[28px]">
                        <LucGiacLon text="Trang Bị" type="valkyrie" />
                    </div>
                    <div className="absolute top-24 w-[208px] right-[210px] text-[26px]">
                        <LucGiacLon text="Người Cộng Tác" type="nguoi" />
                    </div>
                    <div className="absolute top-[280px] right-[222px] w-[260px] text-[28px]">
                        <LucGiacLon text="Valkyrie" type="valkyrie" />
                    </div>
                    <div className="absolute top-[428px] right-[28px] w-[260px] text-[28px]">
                        <LucGiacLon text="Ứng dụng" type="box" />
                    </div>
                    <div className="absolute top-[195px] right-[3px] w-[260px]">
                        <Start />
                    </div>
                </div>
            </div>
            <div
                className="absolute flex "
                style={{
                    width: 620 * scale + 'px',
                    height: 82 * scale + 'px',
                    bottom: 2.2 * scale + 'vw',
                    right: 2.2 * scale + 'vw',
                }}
            >
                <div>
                    <BottomButton scale={scale} icon={0} text="Hải Quân" />
                </div>
                <div className="ms-5">
                    <BottomButton scale={scale} icon={1} text="Gia Viên" />
                </div>
            </div>
            <div
                className="absolute"
                style={{
                    width: 300 * scale + 'px',
                    height: 60 * scale + 'vh',
                    top: 12 * scale + 'vh',
                    left: 2 * scale + 'vw',
                    transform: `translateX(-${((1 - scale) * 490 * scale) / 3}px) translateY(-${((1 - scale) * 655 * scale) / 4.95}px) `,
                }}
            >
                <div className="relative w-full h-full" style={{ scale: `${scale}` }}>
                    <div className="absolute top-[1px] w-[110px] left-[-5px]">
                        <LucGiacNho text="Nhiệm vụ" icon={0} />
                    </div>
                    <div className="absolute top-[106px] w-[110px] left-[60px]">
                        <LucGiacNho text="Event" icon={1} />
                    </div>
                    <div className="absolute top-[211px] w-[110px] left-[-5px]">
                        <LucGiacNho text="Phúc lợi" icon={2} />
                    </div>
                    <div className="absolute top-[313px] w-[110px] left-[58px]">
                        <LucGiacNho text="Thư" icon={3} />
                    </div>
                    <div className="absolute top-[416px] w-[110px] left-[-5px]">
                        <LucGiacNho text="Thông báo" icon={4} />
                    </div>
                    <div className="absolute top-[521px] w-[110px] left-[57px]">
                        <LucGiacNho text="Giới Hạn thời Gian" icon={5} />
                    </div>
                    <div className="absolute top-[622px] w-[110px] left-[-5px]">
                        <LucGiacNho text="Custom" icon={4} />
                    </div>
                </div>
            </div>
            <div
                className="absolute flex bottom-4 left-1"
                style={{
                    width: 620 * scale + 'px',
                    height: 82 * scale + 'px',
                    bottom: 2.2 * scale + 'vw',
                    left: 2.2 * scale + 'vw',
                }}
            >
                <BottomChat scale={scale} />
            </div>
        </div>
    );
}

export default ScreenGamePage;
