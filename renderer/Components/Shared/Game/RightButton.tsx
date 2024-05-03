import LucGiacLon from '../../Game/Screen/LucGiacLon';
import Start from '../../Game/Screen/Start';

function RightButton({
    scale,
    listEvent,
}: {
    scale: number;
    listEvent: {
        setApps;
    };
}) {
    return (
        <div className="absolute top-[50%] right-[1.2vw] -translate-y-[50%]">
            <div className="relative w-full h-full" style={{ scale: scale.toString() }}>
                <div className="absolute top-[-343px] w-[208px] right-[48px] text-[28px]">
                    <LucGiacLon text="Trang Bị" type="valkyrie" />
                </div>
                <div className="absolute top-[-238px] w-[208px] right-[210px] text-[26px]">
                    <LucGiacLon text="Người Cộng Tác" type="nguoi" />
                </div>
                <div className="absolute top-[-55px] right-[222px] w-[260px] text-[28px]">
                    <LucGiacLon text="Valkyrie" type="valkyrie" />
                </div>
                <div
                    className="absolute top-[92px] right-[28px] w-[260px] text-[28px]"
                    onClick={() => {
                        listEvent.setApps(true);
                    }}
                >
                    <LucGiacLon text="Ứng dụng" type="box" />
                </div>
                <div className="absolute top-[-136px] right-[3px] w-[260px]">
                    <Start />
                </div>
            </div>
        </div>
    );
}

export default RightButton;
