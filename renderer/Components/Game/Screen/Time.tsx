'use client';

import { useEffect, useState } from 'react';

function Time({ scale = 1 }: { scale?: number }) {
    const [time, setTime] = useState({
        hour: '00',
        minute: '00',
        second: '00',
    });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        function setData() {
            let date = new Date();
            setTime({
                hour: date.getHours().toString().padStart(2, '0'),
                minute: date.getMinutes().toString().padStart(2, '0'),
                second: date.getSeconds().toString().padStart(2, '0'),
            });
        }
        setData();
        let id = setInterval(() => {
            setData();
        }, 1000);
        let id2 = setInterval(() => {
            let video: HTMLVideoElement = document.getElementById('video-bg') as HTMLVideoElement;
            if (video.currentTime > 3 && video.currentTime < 30) {
            }
        }, 100);
        return () => {
            clearInterval(id);
            clearInterval(id2);
        };
    }, []);
    return (
        <div
            className="absolute overflow-hidden"
            style={{
                top: 75 * scale + 'px',
                left: 1570 * scale + 'px',
                width: 300 * scale + 'px',
                height: 48 * scale + 'px',
            }}
        >
            <div id="box-time" className="relative h-full w-full border-[2px] border-[#8a6b96] ">
                <div className="absolute bg-[black] opacity-20 w-[96%] h-[90%] top-[5%] left-[2%]"></div>
                <div
                    className="text-[#8a6b96] absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 noto-sans-medium font-bold"
                    style={{
                        fontSize: 36 * scale + 'px',
                        lineHeight: 40 * scale + 'px',
                    }}
                >
                    {time.hour}:{time.minute}:{time.second}
                </div>
                <div className="absolute w-[40px] h-[2px] bg-[#bd9bca] top-[-2px] run1"></div>
                <div className="absolute w-[40px] h-[2px] bg-[#bd9bca] bottom-[-2px] run2"></div>
            </div>
        </div>
    );
}

export default Time;
