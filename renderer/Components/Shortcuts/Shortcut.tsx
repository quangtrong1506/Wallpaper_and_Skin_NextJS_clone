import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PATH, SIZE } from "../../helpers/constant";
import { sendMessageToServer } from "../../helpers/helpers";
import { IPath, IShortcutItem, IShortcuts } from "../../helpers/interface";
import { getSizeOfShortcutItem, sortShortcuts } from "../../helpers/shortcuts";
import { setInitShortcut } from "../../redux/features/shortcut";
import ModalShortcut from "../Modal/ModalShortcut";
import ShortcutItemMenu from "./Menu";

interface Props {
    data: IShortcutItem;
    shortcuts?: IShortcuts;
    rootPath?: IPath;
    setMenu?: (any) => any;
}
function Shortcut(props: Props) {
    const { data, shortcuts, setMenu } = props;
    const disPatch = useDispatch();
    const indexRef = useRef(-1);
    const xyRef = useRef([data.x, data.y]);
    const setShortcut = (a, b) => {
        let newShortcut: IShortcuts = { ...shortcuts };
        let newItems: Array<IShortcutItem> = [...newShortcut.items];
        let index = newItems.findIndex((item) => item.id === a);
        let tpm = newItems[index];
        newItems.splice(index, 1);
        newItems.splice(b > index ? b - 1 : b, 0, tpm);
        newShortcut.items = newItems;
        newShortcut.short_by = "Custom";
        disPatch(setInitShortcut(sortShortcuts(newShortcut).shortcuts));
    };
    const [isShowMenu, setIsShowMenu] = useState({
        isShow: false,
        x: 0,
        y: 0,
    });
    const [isShowFormUpdate, setIsShowFormUpdate] = useState<boolean>(false);
    const handleMouseDown = (e) => {
        e.preventDefault();
        const { button, clientX, clientY } = e;
        // console.log(button);
        if (button === 0) {
            let pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            const dragMouseDown = (e) => {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            };
            const elementDrag = (e) => {
                e = e || window.event;
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                let top = document.getElementById(data.id).offsetTop - pos2;
                let left = document.getElementById(data.id).offsetLeft - pos1;
                if (!shortcuts.short_by_grid) {
                    let main = document.querySelector(".main");
                    top = top < 0 ? 0 : top;
                    left = left < 0 ? 0 : left;
                    top =
                        top > main.clientHeight - getSizeOfShortcutItem(shortcuts.size).h + 10
                            ? main.clientHeight - getSizeOfShortcutItem(shortcuts.size).h + 10
                            : top;
                    left =
                        left > main.clientWidth - getSizeOfShortcutItem(shortcuts.size).w
                            ? main.clientWidth - getSizeOfShortcutItem(shortcuts.size).w
                            : left;
                }
                // Đừng động vào cái bên trong lỗi chết mẹ

                if (shortcuts.short_by_grid) {
                    let dLeft = -10;
                    let dTop = -10;
                    let index = getIndex(left, top);
                    let itemIndex = shortcuts.items.findIndex((key) => key.id === data.id);
                    // if (index == 1 && itemIndex == 0) index = 0;
                    indexRef.current = index == itemIndex ? -1 : index;
                    if (index == shortcuts.items.length) {
                        dLeft = shortcuts.items[index - 1].x;
                        dTop = shortcuts.items[index - 1].y + getSizeOfShortcutItem(shortcuts.size).h - 5;
                    } else if (index != 0 && index % sortShortcuts(shortcuts).row == 0 && top > shortcuts.items[0].y) {
                        dLeft = shortcuts.items[index - 1].x;
                        dTop = shortcuts.items[index - 1].y + getSizeOfShortcutItem(shortcuts.size).h - 5;
                    } else {
                        dLeft = shortcuts.items[index].x;
                        dTop = shortcuts.items[index].y - 5;
                    }
                    document.getElementById("dash-shortcut").style.left = dLeft + "px";
                    document.getElementById("dash-shortcut").style.top = dTop + "px";
                    document.getElementById("dash-shortcut").classList.remove("hidden");
                } else if (!shortcuts.short_by_grid) {
                    xyRef.current = [left, top];
                }
                // set the element's new position:
                document.getElementById(data.id).style.top = top + "px";
                document.getElementById(data.id).style.left = left + "px";
                document.getElementById(data.id).style.zIndex = "100000";
                if (shortcuts.short_by_grid) document.getElementById(data.id + "-clone").classList.remove("hidden");
            };
            const getIndex = (x: number, y: number) => {
                let index = -1;
                let row = sortShortcuts(shortcuts).row;
                const space = 5;
                //[bg-info] Đầu
                let firstItem = shortcuts.items[0];
                let lastItem = shortcuts.items[shortcuts.items.length - 1];
                if (x <= firstItem.x && y <= firstItem.y) return 0;
                if (x <= firstItem.x && y < firstItem.y + space) return 0;
                if (x <= firstItem.x + getSizeOfShortcutItem(firstItem.size).w / 2 && y < firstItem.y) return 0;
                // ?[bg-info] cuối
                if (x >= lastItem.x && y >= lastItem.y) return shortcuts.items.length;
                if (x >= lastItem.x && y > lastItem.y + space) return shortcuts.items.length;
                if (x >= lastItem.x + space && y > lastItem.y) return shortcuts.items.length;
                //vượt hàng cuối / trừ cái cuối dã làm riêng
                if (y > shortcuts.items[row - 1].y) {
                    let i = 1;
                    while (shortcuts.items[row * i - 1]) {
                        if (x < shortcuts.items[row * i - 1].x + getSizeOfShortcutItem(shortcuts.size).w / 2)
                            return row * i > shortcuts.items.length - 1 ? shortcuts.items.length : row * i;
                        i++;
                    }
                }
                if (y < shortcuts.items[row].y) {
                    let i = 1;
                    while (shortcuts.items[row * i]) {
                        if (x < shortcuts.items[row * i].x + getSizeOfShortcutItem(shortcuts.size).h / 2) return row * i;
                        i++;
                    }
                    if (x > shortcuts.items[row * (i - 1) - 1].x) {
                        return row * (i - 1);
                    }
                }
                let r = shortcuts.items.slice(0, row - 1).findLastIndex((item) => item.y < y) + 1;
                let c = 0;
                for (let i = 0; i < shortcuts.items.length / row; i++) {
                    let element = shortcuts.items[i * row];
                    if (element) {
                        if (x > element.x - getSizeOfShortcutItem(shortcuts.size).w / 2) {
                            c = i;
                        }
                    }
                }
                index = r + row * c;
                return index > shortcuts.items.length - 1 ? shortcuts.items.length - 1 : index;
            };
            const closeDragElement = () => {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
                document.getElementById(data.id).style.zIndex = "10";
                if (shortcuts.short_by_grid) {
                    document.getElementById(data.id + "-clone").classList.add("hidden");
                    document.getElementById("dash-shortcut").classList.add("hidden");
                    if (indexRef.current == -1 || shortcuts.items[indexRef.current]?.id == data.id) {
                        document.getElementById(data.id).style.top = data.y + "px";
                        document.getElementById(data.id).style.left = data.x + "px";
                    } else {
                        setShortcut(data.id, indexRef.current);
                    }
                } else if (!shortcuts.short_by_grid) {
                    let newShortcut = { ...shortcuts };
                    let newItems: Array<IShortcutItem> = [...newShortcut.items];
                    let index = newItems.findIndex((item) => item.id === data.id);
                    let newItem = { ...newItems[index] };
                    newItem.x = xyRef.current[0];
                    newItem.y = xyRef.current[1];
                    newItems[index] = newItem;
                    newShortcut = { ...newShortcut, items: newItems };
                    disPatch(setInitShortcut(sortShortcuts(newShortcut).shortcuts));
                }
            };
            dragMouseDown(e);
        } else if (button == 2) {
            setIsShowMenu({
                isShow: true,
                x: clientX,
                y: clientY,
            });
            setMenu((prev) => ({ ...prev, isShow: false }));
        }
    };

    return (
        <div
            onMouseLeave={() => {
                setIsShowMenu((prev) => ({ ...prev, isShow: false }));
            }}
        >
            <div
                id={data.id}
                className={`hover:bg-[rgba(0,0,0,0.2)] rounded cursor-pointer px-2 fixed z-10`}
                style={{
                    top: `${data.y}px`,
                    left: `${data.x}px`,
                    width: `${SIZE[data.size].value}px`,
                }}
                onMouseDown={handleMouseDown}
                onDoubleClick={(e) => {
                    e.preventDefault();
                    sendMessageToServer("open-app", data.path);
                }}
            >
                <div className="relative">
                    <div
                        className="icon rounded overflow-hidden"
                        style={{
                            width: SIZE[data.size].value * 0.8,
                            height: SIZE[data.size].value * 0.8,
                        }}
                    >
                        <img
                            draggable={false}
                            className="select-none h-auto object-cover"
                            src={
                                data.base64Icon
                                    ? data.base64Icon
                                    : props.rootPath.userPath + PATH.absoluteImageShortcut + "/" + data.iconId + ".png"
                            }
                            alt="..."
                            width={SIZE[data.size].value * 0.8}
                            height={SIZE[data.size].value * 0.8}
                        />
                    </div>
                    <label
                        className="text-white text-center w-full line-clamp-2 cursor-pointer overflow-hidden text-ellipsis drop-shadow"
                        style={{ fontSize: `${SIZE[data.size].fontSize}px` }}
                    >
                        {data.title}
                    </label>
                </div>
            </div>
            <div
                id={data.id + "-clone"}
                className="bg-[rgba(0,0,0,0.2)] rounded cursor-pointer px-2 fixed hidden opacity-55"
                style={{
                    top: `${data.y}px`,
                    left: `${data.x}px`,
                    width: `${SIZE[data.size].value}px`,
                }}
            >
                <div className="relative">
                    <div
                        className="icon rounded overflow-hidden"
                        style={{
                            width: SIZE[data.size].value * 0.8,
                            height: SIZE[data.size].value * 0.8,
                        }}
                    >
                        <img
                            className="select-none h-auto object-cover"
                            src={
                                data.base64Icon
                                    ? data.base64Icon
                                    : props.rootPath.userPath + PATH.absoluteImageShortcut + "/" + data.iconId + ".png"
                            }
                            alt="..."
                            width={SIZE[data.size].value * 0.8}
                            height={SIZE[data.size].value * 0.8}
                        />
                    </div>
                    <label
                        className="text-white text-center w-full line-clamp-2 cursor-pointer overflow-hidden text-ellipsis drop-shadow"
                        style={{ fontSize: `${SIZE[data.size].fontSize}px` }}
                    >
                        [{data.id}] {data.title}
                    </label>
                </div>
            </div>
            {isShowMenu.isShow && (
                <ShortcutItemMenu
                    x={isShowMenu.x}
                    y={isShowMenu.y}
                    data={data}
                    showForm={() => {
                        setIsShowFormUpdate(true);
                        setIsShowMenu((prev) => ({ ...prev, isShow: false }));
                    }}
                />
            )}
            {isShowFormUpdate && <ModalShortcut id={data.id} setIsShow={setIsShowFormUpdate} />}
        </div>
    );
}

export default Shortcut;
