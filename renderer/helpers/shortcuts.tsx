import { PATH, SIZE } from './constant';
import { IShortcuts, ISize } from './interface';
export const sortShortcuts = (shortcuts: IShortcuts, options?) => {
    let shortcutItems = [...shortcuts.items];
    let rowCount = 1;
    if (shortcuts.isLoading) return;
    if (shortcuts.short_by === 'AZ' && shortcuts.short_by_grid) shortcutItems.sort((a, b) => a.title.localeCompare(b.title));
    else if (shortcuts.short_by === 'ZA' && shortcuts.short_by_grid) shortcutItems.sort((a, b) => b.title.localeCompare(a.title));
    const height = options?.height || document.querySelector('.main').clientHeight;
    let col = 1,
        row = 1;
    const textHeight = Math.floor(SIZE[shortcuts.size].fontSize * 3),
        space = 5,
        width = SIZE[shortcuts.size].value;
    for (let i = 0; i < shortcutItems.length; i++) {
        const element = { ...shortcutItems[i] };
        let x = element.y;
        let y = element.y;
        if (shortcuts.short_by_grid) {
            x = (col - 1) * width + (col - 1) * space;
            y = (row - 1) * width + space + (row - 1) * textHeight;
            if (y + width + textHeight > height) {
                col++;
                row = 1;
                y = space;
                x = x + width + space;
            }
            if (rowCount < row) rowCount = row;
            element.x = x;
            element.y = y;
        }
        element.size = shortcuts.size;
        shortcutItems[i] = element;
        row++;
    }
    return {
        shortcuts: {
            ...shortcuts,
            items: shortcutItems,
        },
        row: rowCount,
    };
};
export const getSizeOfShortcutItem = (size: ISize) => {
    return {
        w: SIZE[size].value,
        h: SIZE[size].value + Math.floor(SIZE[size].fontSize * 3),
    };
};

export const getImagePath = (userPath: string, imageId: string): string => {
    return userPath + PATH.absoluteImageShortcut + '/' + imageId;
};
