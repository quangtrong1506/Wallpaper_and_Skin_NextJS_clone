'use client';
import { useEffect } from 'react';
import { sendMessageToServer } from '../../helpers/helpers';
import { useAppSelector } from '../../redux/store';
import { getUrlImage } from '../Shortcuts/Shortcut';

function ListApp() {
    const SHORTCUTS = useAppSelector((state) => state.shortcutsReducer);
    const MyPath = useAppSelector((state) => state.pathReducer);
    useEffect(() => {
        if (MyPath.userPath == '') {
            sendMessageToServer('loaded');
        }
    });
    return (
        <div className="max-h-[98vh] min-h-[98vh] overflow-hidden overflow-y-auto mt-[1vh] w-[96%] ms-[4%] flex flex-wrap items-start content-start">
            {SHORTCUTS.items.map((app, i) => (
                <div
                    key={i}
                    className="me-2 mb-5 hover:bg-[rgba(255,255,255,0.1)] relative w-[155px] h-[210px] rounded-lg shadow select-none overflow-hidden"
                    onClick={() => {
                        sendMessageToServer('open-app', app.path);
                    }}
                >
                    <div className="w-[100%] top-0 left-[0] max-h-[150px] h-[150px] overflow-hidden">
                        <img className="w-full object-contain h-full" src={getUrlImage(app, MyPath.userPath)} alt="..." />
                    </div>
                    <div className="text-white absolute noto-sans-regular font-bold text-center line-clamp-2 text-[20px] px-1 w-[calc(100%_-_8px)]">{app.title}</div>
                </div>
            ))}
        </div>
    );
}

export default ListApp;
