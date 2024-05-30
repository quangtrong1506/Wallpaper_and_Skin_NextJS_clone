'use client';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import backgroundReducer from './features/background';
import idReducer from './features/id';
import languageReducer from './features/language';
import pathReducer from './features/path';
import shortcutsReducer from './features/shortcut';
export const store = configureStore({
    reducer: {
        shortcutsReducer,
        backgroundReducer,
        languageReducer,
        pathReducer,
        idReducer,
    },
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
