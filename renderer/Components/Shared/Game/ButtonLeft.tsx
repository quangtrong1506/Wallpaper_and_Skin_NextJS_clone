import LucGiacNho from '../../Game/Screen/LucGiacNho';

function ButtonLeft({ scale }: { scale: number }) {
    return (
        <div className="absolute w-0 h-0 top-1/2 -translate-y-1/2 left-[2vw]">
            <div className="relative w-full h-full" style={{ scale: `${scale}` }}>
                <div className="absolute top-[-395px] w-[110px] left-[-5px]">
                    <LucGiacNho text="Nhiệm vụ" icon={0} />
                </div>
                <div className="absolute top-[-290px] w-[110px] left-[60px]">
                    <LucGiacNho text="Event" icon={1} />
                </div>
                <div className="absolute top-[-185px] w-[110px] left-[-5px]">
                    <LucGiacNho text="Phúc lợi" icon={2} />
                </div>
                <div className="absolute top-[-80px] w-[110px] left-[60px]">
                    <LucGiacNho text="Thư" icon={3} isRedDot />
                </div>
                <div className="absolute top-[30px] w-[110px] left-[-5px]">
                    <LucGiacNho text="Thông báo" icon={4} />
                </div>
                <div className="absolute top-[135px] w-[110px] left-[60px]">
                    <LucGiacNho text="Giới Hạn thời Gian" icon={5} />
                </div>
                <div className="absolute top-[245px] w-[110px] left-[-5px]">
                    <LucGiacNho text="Custom" icon={4} />
                </div>
            </div>
        </div>
    );
}

export default ButtonLeft;
