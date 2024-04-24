import { useEffect, useState } from "react";
import HexagonBig from "../Components/Game/HexagonBig";

function ScreenGamePage() {
    const [scale, setScale] = useState(1);
    useEffect(() => {
        const reSize = () => {
            let { clientWidth } = document.body;
            setScale(clientWidth / 1920);
            console.log(clientWidth / 1920);
        };
        reSize();
        window.addEventListener("resize", reSize);
        return () => {
            window.removeEventListener("resize", reSize);
        };
    }, []);
    return (
        <div className="relative ">
            <div className="overflow-hidden">
                <video muted autoPlay loop src="/videos/bg-default.mp4"></video>
                {/* <img src="/images/abc.png" alt="" /> */}
            </div>
            <div className="absolute top-0 left-0"></div>
            <div className="absolute h-[655px] w-[490px] top-[19vh] right-[1.2vw]" style={{ transform: `scale(${scale})` }}>
                <div className="relative">
                    <div className="absolute -top-2 w-[208px] right-[48px] text-[28px]">
                        <HexagonBig text="Trang Bị" type="valkyrie" />
                    </div>
                    <div className="absolute top-24 w-[208px] right-[210px] text-[26px]">
                        <HexagonBig text="Người Cộng Tác" type="nguoi" />
                    </div>
                    <div className="absolute top-[280px] right-[222px] w-[260px] text-[28px]">
                        <HexagonBig text="Valkyrie" type="valkyrie" />
                    </div>
                    <div className="absolute top-[428px] right-[28px] w-[260px] text-[28px]">
                        <HexagonBig text="Tiếp Tế" type="box" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScreenGamePage;
