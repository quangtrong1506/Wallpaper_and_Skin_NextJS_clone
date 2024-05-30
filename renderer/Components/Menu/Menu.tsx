'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageToServer } from '../../helpers/helpers';
import { setPlayVideoBackground } from '../../redux/features/background';
import { useAppSelector } from '../../redux/store';
import RightArrow from '../Icons/RightArrow';
import MenuSize from './MenuLevel2/MenuSize';

export default function Menu({
    x,
    y,
    setIsShowCreateShortcut,
    setShow,
    setShowChangeVideo,
}: {
    x: number;
    y: number;
    setIsShowCreateShortcut?: (boolean) => void;
    setShow: any;
    setShowChangeVideo: any;
}) {
    const dispatch = useDispatch();
    const TEXT = useAppSelector((state) => state.languageReducer);
    const router = useRouter();
    const BACKGROUND = useAppSelector((state) => state.backgroundReducer);
    const [isShowSortMenu, setIsShowSortMenu] = useState(false);
    const [isShowShortcutsMenu, setIsShowShortcutsMenu] = useState(false);

    // Mini Component
    useEffect(() => {
        setIsShowSortMenu(false);
    }, [x, y]);
    return (
        <>
            <ul
                style={{
                    top: y + 'px',
                    left: x + 'px',
                }}
                className="fixed z-40 bg-white select-none  rounded w-[180px] lg:w-[220px] xl:w-[280px] py-1 shadow shadow-[black]"
            >
                <li
                    className="cursor-pointer hover:bg-gray-200 px-3 py-[2px] xl:py-[6px] text-xl lg:text-2xl max-xl:text-base"
                    onClick={() => {
                        dispatch(setPlayVideoBackground({ value: !BACKGROUND.isPlay }));
                    }}
                >
                    {BACKGROUND.isPlay ? TEXT.menu.pause : TEXT.menu.play}
                </li>
                <li
                    className="cursor-pointer hover:bg-gray-200 px-3 py-[2px] xl:py-[6px] text-xl lg:text-2xl max-xl:text-base"
                    onClick={() => {
                        setShowChangeVideo(true);
                        setShow(false);
                    }}
                >
                    {TEXT.menu.change_video}
                </li>
                <li
                    className="relative cursor-pointer hover:bg-gray-200 px-3 py-[2px] xl:py-[6px] text-xl lg:text-2xl max-xl:text-base"
                    onClick={() => {
                        setIsShowSortMenu(true);
                        if (isShowShortcutsMenu) setIsShowShortcutsMenu(false);
                    }}
                >
                    <span>{TEXT.menu.view}</span>
                    <RightArrow />
                    {isShowSortMenu && <MenuSize x={x} y={y} setIsShowMenu={setIsShowSortMenu} />}
                </li>
                <li
                    className="relative cursor-pointer hover:bg-gray-200 px-3 py-[2px] xl:py-[6px] text-xl lg:text-2xl max-xl:text-base "
                    onClick={() => {
                        setIsShowCreateShortcut(true);
                        if (isShowSortMenu) setIsShowSortMenu(false);
                        setShow((prev) => ({ ...prev, isShow: false }));
                    }}
                >
                    {TEXT.menu.create_shortcut}
                </li>
                <li className="cursor-pointer hover:bg-gray-200 px-3 py-[2px] xl:py-[6px] text-xl lg:text-2xl max-xl:text-base ">{TEXT.menu.settings}</li>
                <li
                    className="cursor-pointer hover:bg-gray-200 px-3 py-[2px] xl:py-[6px] text-xl lg:text-2xl max-xl:text-base"
                    onClick={() => {
                        sendMessageToServer('exit-app', true);
                    }}
                >
                    {TEXT.button.exit}
                </li>
            </ul>
        </>
    );
}
