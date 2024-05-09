function TowButtonBottomRightOnly({ scale }: { scale: number }) {
    return (
        <div
            className="absolute w-0 h-0 bottom-[2vw] right-[2vw]"
            style={{
                scale: scale.toString(),
            }}
        >
            <div className="relative h-[84px] -translate-x-[610px] -translate-y-[84px]">
                <div className="absolute flex justify-end w-80 h-32">
                    <img className="h-[120%]" src="/images/hk-logo.png" alt="..." />
                </div>
            </div>
        </div>
    );
}

export default TowButtonBottomRightOnly;
