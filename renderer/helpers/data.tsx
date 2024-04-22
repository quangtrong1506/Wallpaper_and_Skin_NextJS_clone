import { initialBackground, initialShortcuts } from "./constant";
import { IBackground, IShortcutItem, IShortcuts } from "./interface";

const getShortcuts = (): IShortcuts => {
    let shortcuts = JSON.parse(localStorage.getItem("shortcuts"));
    return shortcuts || initialShortcuts;
};

const setShortcuts = (shortcuts: IShortcuts) => {
    let data = { ...shortcuts };
    let items: Array<IShortcutItem> = [...data.items];
    items.forEach((item, index) => {
        let it = { ...item };
        it.base64Icon = "";
        items[index] = it;
    });
    data.items = items;
    localStorage.setItem("shortcuts", JSON.stringify(data));
};

const getBackground = (): IBackground => {
    let shortcuts = JSON.parse(localStorage.getItem("background"));
    return shortcuts || initialBackground;
};

const setBackground = (shortcuts: IBackground) => {
    localStorage.setItem("background", JSON.stringify(shortcuts));
};

const getLanguage = () => {
    let code = JSON.parse(localStorage.getItem("language"));
    return code || navigator.language;
};

const setLanguage = (code: string) => {
    localStorage.setItem("language", JSON.stringify(code));
};

export const DATA = {
    getShortcuts,
    setShortcuts,
    getBackground,
    setBackground,
    getLanguage,
    setLanguage,
};
