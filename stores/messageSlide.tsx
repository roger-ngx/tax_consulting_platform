import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MessageState {
    currentDesUserId: string
}


const initialState : MessageState = {
    currentDesUserId: ''
}

export const messageSlice = createSlice({
    name: 'messageSlide',
    initialState,
    reducers: {
        setCurrentDesUserId: (state :MessageState, action: PayloadAction<string>) => {
            state.currentDesUserId = action.payload;
        }
    }
})

export const { setCurrentDesUserId } = messageSlice.actions;

export default messageSlice.reducer;