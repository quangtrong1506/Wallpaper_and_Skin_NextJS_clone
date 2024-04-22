import { sendMessageToServer } from "../../helpers/helpers";
import { IShortcutItem } from "../../helpers/interface";

interface _IProps {
    x: number;
    y: number;
    data: IShortcutItem;
    showForm: () => void;
}
function ShortcutItemMenu({ x, y, data, showForm }: _IProps) {
    const openApplication = () => {
        sendMessageToServer("open-app", data.path);
    };
    const handleMouseLeave = () => {};
    return (
        <>
            <div
                className="fixed bg-white rounded overflow-hidden  shadow-lg"
                style={{ zIndex: 1000009, top: y + "px", left: x + "px" }}
                onMouseLeave={handleMouseLeave}
            >
                <ul className="w-[120px]">
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
                    <li className="px-3 py-1 cursor-pointer hover:bg-gray-100 ">Xoá</li>
                </ul>
            </div>
        </>
    );
}

export default ShortcutItemMenu;
