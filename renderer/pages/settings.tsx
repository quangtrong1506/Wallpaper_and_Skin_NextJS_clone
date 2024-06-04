import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { sendMessageToServer } from '../helpers/helpers';
import { listOfLanguages } from '../languages/language';
import { setText } from '../redux/features/language';
import { useAppSelector } from '../redux/store';

const selectOptions = [
    {
        label: 'Default',
        value: 'default',
    },
    {
        label: 'Game',
        value: 'game',
    },
];
function SettingsPage() {
    const _TEXT = useAppSelector((state) => state.languageReducer);
    const [languages, setLanguages] = useState(
        listOfLanguages.map((language) => ({
            label: language.label,
            value: language.code,
        }))
    );
    const [languageSelected, setLanguageSelected] = useState(languages.find((lang) => lang.value == _TEXT.current_language.code));
    const [listOfScreens, setListOfScreens] = useState([]);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        dispatch(setText({ code: languageSelected.value }));
        return () => {};
    }, [languageSelected]);
    useEffect(() => {
        const handleMessage = (e) => {
            let _data = e.data;
            console.log(_data);

            switch (_data?.channel) {
                case 'list-screens':
                    setListOfScreens(_data.data);
                    break;

                default:
                    break;
            }
        };
        sendMessageToServer('get-list-screens');
        window.addEventListener('message', handleMessage);
        sendMessageToServer('loaded');

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
    return (
        <div
            className="noto-sans-medium grid h-screen"
            style={{
                gridTemplateRows: 'auto 1fr auto',
            }}
        >
            <div className="text-center font-bold text-4xl my-3 ">
                Cài đặt <hr />
            </div>

            <div className="p-3">
                {listOfScreens.map((screen, index) => (
                    <div key={screen?.id} className="flex w-full mb-3">
                        <div className="w-1/2">
                            <label className="font-medium inline-block leading-10">
                                {_TEXT.label.screen} {index + 1}
                            </label>
                        </div>
                        <div className="w-1/2">
                            <Select id="screen" options={selectOptions} defaultValue={selectOptions[0]} isSearchable />
                        </div>
                    </div>
                ))}
                <div className="flex w-full mb-3">
                    <div className="w-1/2">
                        <label className="font-medium inline-block leading-10">{_TEXT.label.language}</label>
                    </div>
                    <div className="w-1/2">
                        <Select
                            id="language"
                            options={languages}
                            defaultValue={languages[0]}
                            value={languageSelected}
                            isSearchable
                            onChange={(value) => {
                                setLanguageSelected(value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 mb-5">
                <button className="mx-5 py-1 rounded border-[1px] border-[blue] text-blue-700 hover:text-white hover:bg-blue-700" type="button">
                    {_TEXT.button.save}
                </button>
                <button
                    className="mx-5 py-1 rounded border-[1px] border-[red] text-red-700 hover:text-white hover:bg-red-700"
                    type="button"
                    onClick={() => {
                        sendMessageToServer('destroy-settings');
                    }}
                >
                    {_TEXT.button.cancel}
                </button>
            </div>
        </div>
    );
}

export default SettingsPage;
