import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MessageState {
    currentDesUserId: string,
    currentThreadId: string
}


const initialState : MessageState = {
    currentDesUserId: '',
    currentThreadId: ''
}

export const messageSlice = createSlice({
    name: 'messageSlide',
    initialState,
    reducers: {
        setCurrentDesUserId: (state :MessageState, action: PayloadAction<string>) => {
            state.currentDesUserId = action.payload;
        },
        setCurrentThreadId: (state :MessageState, action: PayloadAction<string>) => {
            state.currentThreadId = action.payload;
        }
    }
})

export const { setCurrentDesUserId, setCurrentThreadId } = messageSlice.actions;

export default messageSlice.reducer;