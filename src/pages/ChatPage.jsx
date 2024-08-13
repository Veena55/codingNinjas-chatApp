// src/pages/ChatPage.js
import React from 'react';
import ChatSidebar from "../components/ChatSideBar";
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
    return (
        <div className="chat-page">
            <ChatSidebar />
            <ChatWindow />
        </div>
    );
};

export default ChatPage;