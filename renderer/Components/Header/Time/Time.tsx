import { useEffect, useState } from "react";

interface _IProps {
    type?: "short" | "long";
    showUnderline?: boolean;
}
function Time({ type = "short", showUnderline }: _IProps) {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        let id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(id);
        };
    }, []);
    let hh = Math.abs(12 - time.getHours());
    let mm = time.getMinutes();
    let ss = time.getSeconds();
    return (
        <div className="text-white text-4xl relative">
            <span className="inline-block w-8 me-[2px]">{hh < 10 ? "0" + hh : hh}</span>
            <span className="inline-block absolute -top-1">:</span>
            <span className="inline-block w-8 ms-[10px]">{mm < 10 ? "0" + mm : mm}</span>
            {type === "long" && (
                <>
                    <span className="inline-block me-1"></span>
                    <span className="inline-block absolute -top-1">:</span>
                    <span className="inline-block w-8 ms-3">{ss < 10 ? "0" + ss : ss}</span>
                </>
            )}
            {showUnderline && (
                <div className={`absolute bottom-0 h-[2px] bg-white`} style={{ width: `${Math.floor((ss / 59) * 100)}%` }}></div>
            )}
        </div>
    );
}

export default Time;
