// src/redux/slices/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentConversationId: null, // Stores the ID of the currently selected conversation
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversationId = action.payload;
        },
        clearCurrentConversation: (state) => {
            state.currentConversationId = null;
        },
    },
});

export const { setCurrentConversation, clearCurrentConversation } = messagesSlice.actions;
export default messagesSlice.reducer;