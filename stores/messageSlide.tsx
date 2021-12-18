import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../models/User';

export interface MessageState {
    currentDesUserId: string,
    currentThreadId: string,
    currentDesUser?: User
}


const initialState : MessageState = {
    currentDesUserId: '',
    currentThreadId: '',
    currentDesUser: undefined
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
        },
        setCurrentDesUser: (state :MessageState, action: PayloadAction<User>) => {
            state.currentDesUser = action.payload;
        }
    }
})

export const { setCurrentDesUserId, setCurrentThreadId, setCurrentDesUser } = messageSlice.actions;

export default messageSlice.reducer;