import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import firebase from 'firebase';

export interface UserInfoState {
    credential: firebase.auth.UserCredential|null
}

export interface UserInfo {

}


const initialState : UserInfoState = {
    credential: null
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserCredential: (state :UserInfoState, action: PayloadAction<firebase.auth.UserCredential>) => {
            state.credential = action.payload;
        }
    }
})

export const { setUserCredential } = userInfoSlice.actions;

export default userInfoSlice.reducer;