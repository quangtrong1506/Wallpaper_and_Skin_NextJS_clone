"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getText } from "../../../languages/language";
import { vi } from "../../../languages/vi";

export const language = createSlice({
    name: "language",
    initialState: vi,
    reducers: {
        setText: (state, action: PayloadAction<{ code: string }>) => {
            let language = getText(action.payload.code).texts;
            return { ...state, ...language };
        },
    },
});

export default language.reducer;
export const { setText } = language.actions;
