'use client';
import { useEffect, useState } from 'react';
import { sendMessageToServer } from '../../helpers/helpers';

function ListApp() {
    const [apps, setApps] = useState([]);
    useEffect(() => {
        const handleMessage = (e) => {
            let _data = e.data;
            console.log(_data);

            if (_data?.channel === 'apps') {
                setApps(_data.data.apps);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
    return (
        <div className="max-h-[98vh] min-h-[98vh] overflow-hidden overflow-y-auto mt-[1vh] w-[96%] ms-[4%] flex flex-wrap items-start content-start">
            {apps.map((app, i) => (
                <div
                    key={i}
                    className="me-2 mb-5 hover:bg-[rgba(255,255,255,0.1)] relative w-[155px] h-[210px] rounded-lg shadow select-none overflow-hidden"
                    onClick={() => {
                        sendMessageToServer('open-app', app.ModifyPath.replace('\\', '/'));
                    }}
                >
                    <div className="w-[100%] top-0 left-[0] max-h-[150px] h-[150px] overflow-hidden">
                        <img
                            className="w-full"
                            src={
                                app.DisplayIcon.match('.ico')
                                    ? app.DisplayIcon.replaceAll('\\', '/').replaceAll('"', '')
                                    : `/images/shortcuts/${Math.floor(Math.random() * 27)}.png`
                            }
                            alt="..."
                        />
                    </div>
                    <div className="text-white absolute noto-sans-regular font-bold text-center line-clamp-2 text-[20px] px-1 w-[calc(100%_-_8px)]">
                        {app.DisplayName}
                        {app.ModifyPath?.replaceAll('\\', '/')}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListApp;
