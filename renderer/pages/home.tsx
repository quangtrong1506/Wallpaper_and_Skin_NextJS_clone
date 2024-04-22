import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Background from "../Components/Background/Background";
import Header from "../Components/Header";
import Menu from "../Components/Menu/Menu";
import ModalShortcut from "../Components/Modal/ModalShortcut";
import Shortcuts from "../Components/Shortcuts/Shortcuts";
import { DATA } from "../helpers/data";
import { IPath } from "../helpers/interface";
import { setInitBackground } from "../redux/features/background";
import { setText } from "../redux/features/language";
import { setPathInit } from "../redux/features/path";
import { setInitShortcut } from "../redux/features/shortcut";

export default function HomePage() {
    const dispatch = useDispatch();
    const [menu, setMenu] = useState<{ x: number; y: number; isShow: boolean }>({
        x: 0,
        y: 0,
        isShow: false,
    });
    const [isShowCreateShortcut, setIsShowCreateShortcut] = useState(false);
    useEffect(() => {
        const shortcuts = DATA.getShortcuts();
        dispatch(setInitShortcut({ ...shortcuts, isLoading: false }));
        let bg = DATA.getBackground();
        dispatch(setInitBackground({ ...bg, isLoading: false }));
        let language = DATA.getLanguage();
        dispatch(setText({ code: language }));
        const handle = (event) => {
            event.preventDefault();
            // if (event.button === 2) {
            //     let a = event.target;
            //     if (a.tagName !== "VIDEO") {
            //         setMenu((prev) => ({ ...prev, isShow: false }));
            //     }
            // }
        };
        const handleMessage = (e) => {
            let _data = e.data;
            console.log(_data);
            switch (_data?.channel) {
                case "path":
                    let userPath = _data.data.userPath?.replaceAll("\\", "/").replace("file:///", "");
                    let images = _data.data.images;
                    let videos = _data.data.videos;
                    let data: IPath = { images, videos, userPath };
                    dispatch(setPathInit(data));
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("message", handleMessage);
        document.addEventListener("contextmenu", handle);
        return () => {
            window.removeEventListener("message", handleMessage);
            document.removeEventListener("contextmenu", handle);
        };
    }, []);

    return (
        <>
            <div className="main relative w-full h-[100vh]">
                <Header />
                <Background setMenu={setMenu} />
                <Shortcuts setMenu={setMenu} />
                {/* <ShortcutItemMenu /> */}
                {menu.isShow && <Menu x={menu.x} y={menu.y} setIsShowCreateShortcut={setIsShowCreateShortcut} />}
                {/* <SelectImage /> */}
                {isShowCreateShortcut && <ModalShortcut setIsShow={setIsShowCreateShortcut} />}
            </div>
        </>
    );
}
