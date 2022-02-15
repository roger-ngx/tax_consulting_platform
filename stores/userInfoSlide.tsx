import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import firebase from 'firebase';

export interface UserInfoState {
    credential: firebase.auth.UserCredential|null,
    openLoginModal: boolean
}

export interface UserInfo {

}


const initialState : UserInfoState = {
    credential: null,
    openLoginModal: false
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserCredential: (state :UserInfoState, action: PayloadAction<firebase.auth.UserCredential>) => {
            state.credential = action.payload;
        },
        setOpenLoginModal: (state: UserInfoState, action: PayloadAction<boolean>) => {
            state.openLoginModal = action.payload;
        }
    }
})

export const { setUserCredential, setOpenLoginModal } = userInfoSlice.actions;

export default userInfoSlice.reducer;