import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserInfoState {

}

export interface UserInfo {

}


const initialState : UserInfoState = {

}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state :UserInfoState, action: PayloadAction<UserInfo>) => {

        }
    }
})

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;