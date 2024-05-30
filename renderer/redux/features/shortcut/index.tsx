'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SHORTCUT_SORT_BY, SIZE } from '../../../helpers/constant';
import { IShortcutItem, IShortcuts } from '../../../helpers/interface';
const initialState: IShortcuts = {
    items: [],
    size: 'sm',
    short_by: 'AZ',
    short_by_grid: true,
    isLoading: true,
};

export const shortcuts = createSlice({
    name: 'shortcuts',
    initialState,
    reducers: {
        setInitShortcut: (state, action: PayloadAction<IShortcuts>) => {
            return { ...state, ...action.payload };
        },
        addItem: (state, action: PayloadAction<IShortcutItem>) => {
            let list: Array<IShortcutItem> = [];
            if (state.items.length > 0) list = [...state.items];
            list.push(action.payload);
            return { ...state, items: list };
        },
        updateItem: (
            state,
            action: PayloadAction<{
                id: string;
                item: object;
            }>
        ) => {
            let list: Array<IShortcutItem> = [...state.items];
            let index = list.findIndex((item) => item.id === action.payload.id);
            let item: IShortcutItem = list[index];

            item = { ...item, ...action.payload.item };
            list[index] = item;
            return { ...state, items: list };
        },
        removeItem: (
            state,
            action: PayloadAction<{
                id: string;
            }>
        ) => {
            let list: Array<IShortcutItem> = [...state.items];
            let index: number = list.findIndex((item) => item.id === action.payload.id);
            list.splice(index, 1);
            return { ...state, items: list };
        },
        setSize: (state, action: PayloadAction<{ size: keyof typeof SIZE }>) => {
            return { ...state, size: action.payload.size };
        },
        setSortBy: (state, action: PayloadAction<{ short_by: keyof typeof SHORTCUT_SORT_BY }>) => {
            return { ...state, short_by: action.payload.short_by };
        },
        setSortByGrid: (state, action: PayloadAction<{ value: boolean }>) => {
            return { ...state, short_by_grid: action.payload.value };
        },
        setIsHidden: (state, action: PayloadAction<boolean>) => {
            return { ...state, isHidden: action.payload };
        },
    },
});

export default shortcuts.reducer;
export const { addItem, removeItem, updateItem, setInitShortcut, setSize, setSortBy, setSortByGrid, setIsHidden } = shortcuts.actions;
