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
            <div className="relative h-20 f-finger-paint-regular" style={{ fontSize: 72 * scale + 'px', lineHeight: '60px' }}>
                <div className="text-[#bd9bca]">05</div>
                <div className="absolute top-[52px]">
                    <img src="/images/thang-01.png" alt="..." />
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
                <span
                    className="absolute year-4"
                    style={{ fontSize: 68 * scale + 'px', top: 102 * scale + 'px', left: 118 * scale + 'px' }}
                >
                    4
                </span>
            </div>
        </div>
    );
}

export default FullTime;
