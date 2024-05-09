import BottomButton from '../../Game/Screen/BottomButton';

function TowButtonBottomRight({ scale }: { scale: number }) {
    return (
        <div
            className="absolute w-0 h-0 bottom-[2vw] right-[2vw]"
            style={{
                scale: scale.toString(),
            }}
        >
            <div className="relative h-[84px] -translate-x-[610px] -translate-y-[84px]">
                <div className="absolute flex justify-end">
                    <div>
                        <BottomButton icon={0} text="Hải Quân" />
                    </div>
                    <div className="ms-5">
                        <BottomButton icon={1} text="Gia Viên" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TowButtonBottomRight;
