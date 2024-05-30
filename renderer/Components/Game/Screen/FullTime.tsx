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
            <div className="relative f-finger-paint-regular">
                <div className="text-[#8a6b96] " style={{ fontSize: 120 * scale + 'px', lineHeight: 120 * scale + 'px', height: 120 * scale + 'px' }}>
                    <div>20</div>
                    <div>05</div>
                </div>
            </div>
        </div>
    );
}

export default FullTime;
