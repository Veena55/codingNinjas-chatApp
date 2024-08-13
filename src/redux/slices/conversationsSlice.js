// src/redux/slices/conversationsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../../data/dummyData.json';

const initialState = {
  contacts: dummyData.contacts || [],  // Ensure this is correctly assigned
  conversations: dummyData.conversations || [],  // Ensure this is correctly assigned
};

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    updateLastMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
      }
    },
    // Other reducers as needed
  },
});

export const { addConversation, updateLastMessage } = conversationsSlice.actions;
export default conversationsSlice.reducer;
