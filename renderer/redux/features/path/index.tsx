"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPath } from "../../../helpers/interface";
const initialState: IPath = {
    userPath: "",
    images: [],
    videos: [],
};
export const path = createSlice({
    name: "path",
    initialState,
    reducers: {
        setPathInit: (_state, action: PayloadAction<IPath>) => {
            return action.payload;
        },
        addVideo: (state, action: PayloadAction<{ id: string; path: string }>) => {
            let videos = [...state.videos];
            videos.push(action.payload);
            return { ...state, videos };
        },
        removeVideoById: (state, action: PayloadAction<string>) => {
            let videos = [...state.videos];
            videos.splice(
                videos.findIndex((v) => v.id === action.payload),
                1
            );
            return { ...state, videos };
        },
    },
});

export default path.reducer;
export const { setPathInit, addVideo, removeVideoById } = path.actions;
