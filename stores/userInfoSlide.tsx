import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import firebase from 'firebase';

export interface UserInfoState {
    credential: firebase.auth.UserCredential|null,
    openLoginModal: boolean,
    userType: string //user, expert
}

export interface UserInfo {

}


const initialState : UserInfoState = {
    credential: null,
    openLoginModal: false,
    userType: 'user'
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
        },
        setUserType: (state: UserInfoState, action: PayloadAction<string>) => {
            state.userType = action.payload;
        }
    }
})

export const { setUserCredential, setOpenLoginModal, setUserType } = userInfoSlice.actions;

export default userInfoSlice.reducer;