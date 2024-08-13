// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import conversationsReducer from './slices/conversationsSlice';
import messagesReducer from './slices/messagesSlice';

const store = configureStore({
    reducer: {
        conversations: conversationsReducer,
        messages: messagesReducer,
    },
});

export default store;