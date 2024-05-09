'use client';

import { useEffect, useState } from 'react';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function Day({ scale = 1 }: { scale?: number }) {
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
            className="absolute open select-none "
            style={{
                top: 18 * scale + 'px',
                left: 1148 * scale + 'px',
                width: 384 * scale + 'px',
                height: 90 * scale + 'px',
                opacity: open ? 1 : 0,
                transition: open ? 'all 0.3s cubic-bezier(0.2, 0.2, 0.3, 0.5)' : 'all 0.4s cubic-bezier(0.1, 0.1, 0.3, 0.4)',
            }}
        >
            <div className="w-full h-full">
                <svg className="svg-text" width="100%" height="100%">
                    <rect x={0} y={0} width="100%" height="100%" fill="url(#polka-dots)"></rect>
                    <text style={{ fontSize: 78 * scale + 'px' }} x="50%" y="60%" textAnchor="middle">
                        {days[new Date().getDay()].toUpperCase()}
                    </text>
                </svg>
            </div>

            {/* <img aria-disabled="false" className="w-full h-full" src={`/images/day/${new Date().getDay()}.png`} alt="..." /> */}
        </div>
    );
}

export default Day;
