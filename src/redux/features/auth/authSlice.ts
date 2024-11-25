import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from './types';

// initialState
const initialState: InitialState = {
    token: null,
    admin: null,
    isLoading: false
};

// create auth slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // action to handle admin login
        adminLoggedIn: (state, action: PayloadAction<Omit<InitialState, 'isLoading'>>) => {
            state.token = action.payload.token;
            state.admin = action.payload.admin;
            state.isLoading = false;
        },

        // action to handle admin logout
        adminLoggedOut: (state) => {
            state.token = null;
            state.admin = null;
            state.isLoading = false;
        },

        // action to set isLoading state
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

// export actions
export const { adminLoggedIn, adminLoggedOut, setLoading } = authSlice.actions;

// export reducer
export default authSlice.reducer;
