import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here (e.g., counterSlice)

export const store = configureStore({
    reducer: {
        // Add your reducers here, e.g.,
        // counter: counterSlice.reducer
    },
});