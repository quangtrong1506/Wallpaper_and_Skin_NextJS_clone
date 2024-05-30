import { SHORTCUT_SORT_BY, SIZE } from './constant';

export interface IShortcutItem {
    id: string;
    x?: number;
    y?: number;
    title: string;
    icon: string;
    path: string;
    size?: keyof typeof SIZE;
    isCustom?: boolean;
    base64Icon?: string;
}
export interface IShortcuts {
    size: keyof typeof SIZE;
    items: IShortcutItem[] | [];
    short_by: keyof typeof SHORTCUT_SORT_BY;
    short_by_grid: boolean;
    isLoading?: boolean;
    isHidden?: boolean;
}
export interface IKeyMapItem {
    index: number;
    top: number;
    left: number;
    itemId: string;
    width?: number;
    height?: number;
}
export interface IBackground {
    url: string;
    isPlay: boolean;
    isLoading?: boolean;
    id?: string;
}
export type ISize = keyof typeof SIZE;

export interface IPath {
    userPath: string;
    images: Array<string>;
    videos: Array<{ id: string; path: string }>;
}
