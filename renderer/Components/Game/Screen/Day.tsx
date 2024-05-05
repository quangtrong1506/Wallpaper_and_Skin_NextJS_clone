'use client';

import { useEffect, useState } from 'react';

function Day({ scale = 1 }: { scale?: number }) {
    const [open, setOpen] = useState(true);

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
            className="absolute open overflow-hidden "
            style={{
                top: 15 * scale + 'px',
                left: 1148 * scale + 'px',
                width: 384 * scale + 'px',
                height: 60 * scale + 'px',
                opacity: open ? 1 : 0,
                transition: open ? 'all 0.3s cubic-bezier(0.2, 0.2, 0.3, 0.5)' : 'all 0.4s cubic-bezier(0.1, 0.1, 0.3, 0.4)',
            }}
        >
            <img className="w-full h-full" src={`/images/day/${new Date().getDay()}.png`} alt="..." />
        </div>
    );
}

export default Day;
