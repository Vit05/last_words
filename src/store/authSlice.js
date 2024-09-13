import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setUser, setLoading, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;