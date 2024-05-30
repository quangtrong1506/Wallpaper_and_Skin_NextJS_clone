'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const browserID = createSlice({
    name: 'browser_id',
    initialState: -1,
    reducers: {
        setID: (_state, action: PayloadAction<number>) => {
            return action.payload;
        },
    },
});

export default browserID.reducer;
export const { setID } = browserID.actions;
