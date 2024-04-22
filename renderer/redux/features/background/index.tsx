"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialBackground } from "../../../helpers/constant";
import { IBackground } from "../../../helpers/interface";

export const background = createSlice({
    name: "background",
    initialState: initialBackground,
    reducers: {
        setInitBackground: (state, action: PayloadAction<IBackground>) => {
            return { ...state, ...action.payload };
        },
        setPlayVideoBackground: (state, action: PayloadAction<{ value: boolean }>) => {
            return { ...state, isPlay: action.payload.value };
        },
        setURLVideoBackground: (state, action: PayloadAction<string>) => {
            return { ...state, url: action.payload };
        },
    },
});

export default background.reducer;
export const { setInitBackground, setPlayVideoBackground, setURLVideoBackground } = background.actions;
