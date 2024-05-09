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

        return () => {
            clearInterval(id);
        };
    }, []);
    useEffect(() => {
        let id2 = setInterval(() => {
            let video: HTMLVideoElement = document.getElementById('video-bg') as HTMLVideoElement;
            if ((video.currentTime > 3.1 && video.currentTime < 15) || (video.currentTime > 19 && video.currentTime < 31)) {
                !open && setOpen(true);
            } else {
                open && setOpen(false);
            }
        }, 100);
        return () => {
            clearInterval(id2);
        };
    }, [open]);

    return (
        <div
            className="absolute open overflow-hidden select-none"
            style={{
                top: 15 * scale + 'px',
                left: 1568 * scale + 'px',
                width: open ? 340 * scale + 'px' : '0px',
                height: 105 * scale + 'px',
                transition: open ? 'all 0.7s cubic-bezier(0.2, 0.2, 0.3, 0.5)' : 'all 0.8s cubic-bezier(0.4, 0.3, 0.1, 0.1)',
            }}
        >
            <div id="box-time" className="relative border-[2px] border-[#8a6b96] open h-full nhay-nhay">
                <div className="absolute bg-[black] opacity-20 w-[96%] h-[90%] top-[5%] left-[2%]"></div>
                <div
                    className=" text-[#8a6b96] absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 f-time-square flex"
                    style={{
                        fontSize: 88 * scale + 'px',
                        lineHeight: 80 * scale + 'px',
                    }}
                >
                    <div style={{ width: 90 * scale + 'px' }}>{time.hour}</div>
                    <div>:</div>
                    <div style={{ width: 90 * scale + 'px' }}>{time.minute}</div>
                    <div>:</div>
                    <div style={{ width: 90 * scale + 'px' }}>{time.second}</div>
                </div>
                <div className="absolute w-[40px] h-[2px] bg-[#bd9bca] top-[-2px] run1"></div>
                <div className="absolute w-[40px] h-[2px] bg-[#bd9bca] bottom-[-2px] run2"></div>
            </div>
        </div>
    );
}

export default Time;
