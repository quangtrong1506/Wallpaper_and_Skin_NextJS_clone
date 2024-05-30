import { useDispatch } from 'react-redux';
import { DATA } from '../../helpers/data';
import { destroyImage, sendMessageToServer } from '../../helpers/helpers';
import { IShortcutItem } from '../../helpers/interface';
import { sortShortcuts } from '../../helpers/shortcuts';
import { setInitShortcut } from '../../redux/features/shortcut';
import { useAppSelector } from '../../redux/store';

interface _IProps {
    x: number;
    y: number;
    data: IShortcutItem;
    showForm: () => void;
}
function ShortcutItemMenu({ x, y, data, showForm }: _IProps) {
    const disPatch = useDispatch();
    const browserID = useAppSelector((state) => state.idReducer);

    const openApplication = () => {
        sendMessageToServer('open-app', data.path);
    };
    const handleMouseLeave = () => {};
    return (
        <>
            <div className="fixed bg-white rounded overflow-hidden  shadow-lg" style={{ zIndex: 1000009, top: y + 'px', left: x + 'px' }} onMouseLeave={handleMouseLeave}>
                <ul className="w-[120px] lg:w-[140px] xl:w-[160px] text-base lg:text-lg font-medium">
                    <li className="px-3 py-1 cursor-pointer hover:bg-gray-100 " onClick={openApplication}>
                        Mở
                    </li>
                    <li
                        className="px-3 py-1 cursor-pointer hover:bg-gray-100 "
                        onClick={() => {
                            showForm();
                        }}
                    >
                        Chỉnh sửa
                    </li>
                    <li
                        className="px-3 py-1 cursor-pointer hover:bg-gray-100 "
                        onClick={() => {
                            const scs = DATA.getShortcuts();
                            const newScs = { ...scs };
                            const index = scs.items.findIndex((item) => item.id == data.id);
                            newScs.items.splice(index, 1);
                            DATA.setShortcuts(newScs);
                            disPatch(setInitShortcut(sortShortcuts(newScs)?.shortcuts));
                            sendMessageToServer('destroy-app', {
                                id: browserID,
                                data: {
                                    id: data.id,
                                },
                            });
                            destroyImage(data.icon);
                        }}
                    >
                        Xoá
                    </li>
                </ul>
            </div>
        </>
    );
}

export default ShortcutItemMenu;
