import { useEffect, useState } from 'react';
import BottomButton from '../Components/Game/Screen/BottomButton';
import HexagonBig from '../Components/Game/Screen/HexagonBig';
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
            <div className="overflow-hidden">
                {/* <video muted autoPlay loop src="/videos/hk-3.mp4"></video> */}
                <img src="/images/abc.png" alt="" />
            </div>
            <div className="absolute top-0 left-0"></div>
            <div
                className="absolute top-[19vh] right-[1.2vw] "
                style={{
                    height: 655 * scale + 'px',
                    width: 490 * scale + 'px',
                }}
            >
                <div className="relative" style={{ scale: `${scale}` }}>
                    <div className="absolute -top-2 w-[208px] text-[28px] right-[48px]">
                        <HexagonBig text="Trang Bị" type="valkyrie" />
                    </div>
                    <div className="absolute top-24 w-[208px] right-[210px] text-[26px]">
                        <HexagonBig text="Người Cộng Tác" type="nguoi" />
                    </div>
                    <div className="absolute top-[280px] right-[222px] w-[260px] text-[28px]">
                        <HexagonBig text="Valkyrie" type="valkyrie" />
                    </div>
                    <div className="absolute top-[428px] right-[28px] w-[260px] text-[28px]">
                        <HexagonBig text="Ứng dụng" type="box" />
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
        </div>
    );
}

export default ScreenGamePage;
