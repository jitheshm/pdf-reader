// features/user/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
    status: boolean;

}

const initialState: UserState = {
    status: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        verify: (state: UserState) => {
            state.status = true
        },
        logout: (state: UserState) => {
            state.status = false
        },
    },
});

export const { verify, logout } = userSlice.actions;
export default userSlice.reducer;