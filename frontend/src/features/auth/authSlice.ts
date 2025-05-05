// slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    isInitialized: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    isInitialized: false, 
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.isInitialized = true;
        },
        initAuth(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isInitialized = true;
        },
    },
});

export const { login, logout, initAuth } = authSlice.actions;
export default authSlice.reducer;
