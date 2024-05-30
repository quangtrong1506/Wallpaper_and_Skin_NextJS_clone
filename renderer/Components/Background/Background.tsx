import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../redux/store';
interface IProps {
    isShowMenu?: boolean;
    setMenu?: (any) => void;
}
function Background(props: IProps) {
    const BACKGROUND = useAppSelector((state) => state.backgroundReducer);
    const videoRef = useRef<HTMLVideoElement>();
    const handleMouseDown: (MouseEvent) => void = (e: MouseEvent) => {
        let { clientHeight, clientWidth } = document.querySelector('.main');
        let minW = clientWidth < 1024 ? 185 : clientWidth < 1280 ? 225 : 285;
        let minH = clientWidth < 1024 ? 190 : clientWidth < 1280 ? 225 : 285;
        let x = clientWidth - e.clientX < minW ? clientWidth - minW : e.clientX;
        let y = clientHeight - e.clientY < minH ? clientHeight - minH : e.clientY;
        props.setMenu({ x, y, isShow: e.button === 2 });
    };
    const mouseLeaveEvent = () => {
        if (props.isShowMenu) {
            props.setMenu((prev) => ({ ...prev, isShow: false }));
        }
    };
    useEffect(() => {
        document.addEventListener('mouseleave', mouseLeaveEvent);
        return () => {
            document.removeEventListener('mouseleave', mouseLeaveEvent);
        };
    }, [props.isShowMenu]);
    useEffect(() => {
        setTimeout(() => {
            if (BACKGROUND.isLoading) return;
            !BACKGROUND.isPlay && videoRef.current?.pause();
            BACKGROUND.isPlay && videoRef.current?.play();
        }, 10);
    }, [BACKGROUND]);
    return (
        <div className="fixed left-0 right-0 top-0 bottom-0" onMouseDown={handleMouseDown}>
            {!BACKGROUND.isLoading && <video ref={videoRef} className="w-full h-full object-cover" loop muted src={BACKGROUND.url}></video>}
        </div>
    );
}
export default Background;
