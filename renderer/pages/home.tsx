import { useState } from 'react';
import Background from '../Components/Background/Background';
import ChangeVideoPage from '../Components/ChangeVideo/page/ChangeVideo';
import Menu from '../Components/Menu/Menu';
import ModalShortcut from '../Components/Modal/ModalShortcut';
import Shortcuts from '../Components/Shortcuts/Shortcuts';

export default function HomePage() {
    const [menu, setMenu] = useState<{ x: number; y: number; isShow: boolean }>({
        x: 0,
        y: 0,
        isShow: false,
    });
    const [isShowCreateShortcut, setIsShowCreateShortcut] = useState(false);
    const [changeVideo, setChangVideo] = useState(false);
    return (
        <>
            <div className="main relative w-full h-[100vh]">
                {/* <Header /> */}
                <Background isShowMenu={menu.isShow} setMenu={setMenu} />
                <Shortcuts setMenu={setMenu} menuIsShow={menu.isShow} />
                {/* <ShortcutItemMenu /> */}
                {menu.isShow && <Menu x={menu.x} y={menu.y} setIsShowCreateShortcut={setIsShowCreateShortcut} setShow={setMenu} setShowChangeVideo={setChangVideo} />}
                {/* <SelectImage /> */}
                {isShowCreateShortcut && <ModalShortcut setIsShow={setIsShowCreateShortcut} />}
            </div>
            <div
                className="fixed  left-0 w-full h-full ease-in-out transition-all duration-200"
                style={{
                    top: changeVideo ? '0px' : '100vh',
                }}
            >
                <ChangeVideoPage setShowChangeVideo={setChangVideo} />
            </div>
        </>
    );
}
