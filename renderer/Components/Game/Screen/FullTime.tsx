'use client';

import { useEffect, useState } from 'react';

function FullTime({ scale = 1 }: { scale?: number }) {
    const [open, setOpen] = useState(false);
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
                top: 300 * scale + 'px',
                right: 20 * scale + 'px',
                width: 150 * scale + 'px',
                height: 340 * scale + 'px',
                opacity: open ? 1 : 0,
                transition: open ? 'all 0.3s cubic-bezier(0.2, 0.2, 0.3, 0.5)' : 'all 0.4s cubic-bezier(0.1, 0.1, 0.3, 0.4)',
            }}
        >
            <div className="relative f-finger-paint-regular" style={{ marginTop: 5 * scale + 'px', height: 140 * scale + 'px' }}>
                <div className="text-[#8a6b96] relative overflow-hidden " style={{ fontSize: 135 * scale + 'px', lineHeight: 120 * scale + 'px', height: 120 * scale + 'px' }}>
                    <div
                        className=" absolute top-0"
                        style={{
                            transition: open ? 'all 2.5s cubic-bezier(0.2, 0.2, 0.5, 0.8)' : 'all 1.5s cubic-bezier(0.2, 0.2, 0.5, 0.8)',
                            transitionDelay: open ? '0s' : '2s',
                            transform: open ? `translateY(-${new Date().getDate() * scale * 120 + 'px'})` : 'translateY(0)',
                            // opacity: open ? 1 : 0,
                        }}
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((i) => (
                            <div key={i} className="h-[100px] mb-[20px]">
                                {i.toString().padStart(2, '0')}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute" style={{ top: 130 * scale + 'px' }}>
                    <img src={`/images/months/${new Date().getMonth()}.png`} alt="..." />
                </div>
            </div>
            <div className="relative text-[0px] font-bold  londrina-outline-regular words-year">
                <span className="absolute year-1" style={{ fontSize: 68 * scale + 'px' }}>
                    2
                </span>
                <span className="absolute year-2" style={{ fontSize: 68 * scale + 'px', top: 34 * scale + 'px', left: 38 * scale + 'px' }}>
                    0
                </span>
                <span className="absolute year-3" style={{ fontSize: 68 * scale + 'px', top: 68 * scale + 'px', left: 78 * scale + 'px' }}>
                    2
                </span>
                <span className="absolute year-4" style={{ fontSize: 68 * scale + 'px', top: 102 * scale + 'px', left: 118 * scale + 'px' }}>
                    4
                </span>
            </div>
        </div>
    );
}

export default FullTime;
