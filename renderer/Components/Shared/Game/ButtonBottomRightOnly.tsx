function ButtonBottomRightOnly({ scale }: { scale: number }) {
    return (
        <div
            className="absolute w-0 h-0 bottom-[2vw] right-[2vw]"
            style={{
                scale: scale.toString(),
            }}
        >
            <div className="relative h-[84px] -translate-x-[300px] -translate-y-[150px]">
                <div className="absolute flex justify-end w-[300px]">
                    <img className="h-[120%] object-contain" src="/images/hkm.png" alt="..." />
                </div>
            </div>
        </div>
    );
}

export default ButtonBottomRightOnly;
