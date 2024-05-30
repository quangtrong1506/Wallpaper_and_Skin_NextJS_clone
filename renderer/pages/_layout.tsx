import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DATA } from '../helpers/data';
import { sendMessageToServer } from '../helpers/helpers';
import { IPath } from '../helpers/interface';
import { setInitBackground } from '../redux/features/background';
import { setID } from '../redux/features/id';
import { setText } from '../redux/features/language';
import { setPathInit } from '../redux/features/path';
import { addItem, removeItem, setInitShortcut, updateItem } from '../redux/features/shortcut';

function Layout({ children }: { children: ReactNode }) {
    const dispatch = useDispatch();
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
            switch (_data?.channel) {
                case 'path':
                    let userPath = _data.data.userPath?.replaceAll('\\', '/').replace('file:///', '');
                    let images = _data.data.images;
                    let videos = _data.data.videos;
                    let data: IPath = { images, videos, userPath };
                    dispatch(setPathInit(data));
                    break;
                case 'new-app':
                    dispatch(addItem(_data.data.item));
                    break;
                case 'update-app':
                    dispatch(updateItem({ id: _data.data.item.id, item: _data.data.item }));
                    break;
                case 'destroy-app':
                    dispatch(removeItem({ id: _data.data.itemID }));
                    break;
                case 'id':
                    dispatch(setID(_data.data));
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('message', handleMessage);
        sendMessageToServer('loaded');
        document.addEventListener('contextmenu', handle);
        return () => {
            document.removeEventListener('contextmenu', handle);
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return <div>{children}</div>;
}

export default Layout;
