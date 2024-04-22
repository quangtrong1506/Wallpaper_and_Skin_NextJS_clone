"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SIZE } from "../../../helpers/constant";
import { DATA } from "../../../helpers/data";
import { sortShortcuts } from "../../../helpers/shortcuts";
import { setInitShortcut, setIsHidden } from "../../../redux/features/shortcut";
import { useAppSelector } from "../../../redux/store";
import RightCheck from "../../Atoms/RightCheck";
interface IProps {
    x?: number;
    y?: number;
    setIsShowMenu?: (any) => void;
}
function MenuSize({ x, y, setIsShowMenu }: IProps) {
    const dispatch = useDispatch();
    const SHORTCUTS = useAppSelector((state) => state.shortcutsReducer);
    const TEXT = useAppSelector((state) => state.languageReducer);
    const urRef = useRef<HTMLUListElement>();
    const [main, setMain] = useState({ clientHeight: 0, clientWidth: 0 });
    useEffect(() => {
        let { clientHeight, clientWidth } = document.querySelector(".main");
        setMain({ clientHeight, clientWidth });
    }, []);

    const handleSetSize = (size: any) => {
        let newS = sortShortcuts({
            ...SHORTCUTS,
            size: size,
            short_by_grid: true,
        });
        DATA.setShortcuts(newS.shortcuts);
        dispatch(setInitShortcut(newS.shortcuts));
    };
    const handleSetShort = (short: any) => {
        let newS = sortShortcuts({
            ...SHORTCUTS,
            short_by: short,
            short_by_grid: true,
        });
        DATA.setShortcuts(newS.shortcuts);
        dispatch(setInitShortcut(newS.shortcuts));
    };
    const handleSetShortByGrid = () => {
        let newS = sortShortcuts({
            ...SHORTCUTS,
            short_by_grid: !SHORTCUTS.short_by_grid,
        });
        DATA.setShortcuts(newS.shortcuts);
        dispatch(setInitShortcut(newS.shortcuts));
    };
    let style = {
        left: main.clientWidth - x < 380 ? "-183px" : "183px",
        top: main.clientHeight - y < 370 ? "-" + (370 - (main.clientHeight - y)) + "px" : "0px",
    };
    return (
        <ul
            ref={urRef}
            className="absolute z-40 bg-white w-full rounded shadow shadow-[black] py-1"
            style={style}
            onMouseLeave={() => {
                setIsShowMenu(false);
            }}
        >
            {Object.entries(SIZE).map((size, index) => {
                return (
                    <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-100 px-3 py-[2px] text-xl max-xl:text-base relative"
                        onClick={() => {
                            let s = size[0];
                            handleSetSize(s);
                        }}
                    >
                        <span>{TEXT.size[size[0]]}</span>
                        {SHORTCUTS.size === size[0] && <RightCheck />}
                    </li>
                );
            })}

            <li>
                <hr />
            </li>
            <li
                className="cursor-pointer hover:bg-gray-100 px-3 py-[2px] text-xl max-xl:text-base relative"
                onClick={() => {
                    handleSetShort("AZ");
                }}
            >
                <span>Short by A-Z</span>
                {SHORTCUTS.short_by === "AZ" && <RightCheck />}
            </li>
            <li
                className="cursor-pointer hover:bg-gray-100 px-3 py-[2px] text-xl max-xl:text-base relative"
                onClick={() => {
                    handleSetShort("ZA");
                }}
            >
                <span>Short by Z-A</span>
                {SHORTCUTS.short_by === "ZA" && <RightCheck />}
            </li>
            <li>
                <hr />
            </li>
            <li className="cursor-pointer hover:bg-gray-100 px-3 py-[2px] text-xl max-xl:text-base relative" onClick={handleSetShortByGrid}>
                <span>{TEXT.menu.sort_by_grid}</span>
                {SHORTCUTS.short_by_grid && <RightCheck />}
            </li>
            <li
                className="cursor-pointer hover:bg-gray-100 px-3 py-[2px] text-xl max-xl:text-base relative"
                onClick={() => {
                    dispatch(setIsHidden(!SHORTCUTS.isHidden));
                }}
            >
                <span>{TEXT.menu.hidden_shortcut}</span>
                {SHORTCUTS.isHidden && <RightCheck />}
            </li>
        </ul>
    );
}

export default MenuSize;
