// src/components/ChatWindow.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLastMessage } from '../redux/slices/conversationsSlice';

const ChatWindow = () => {
    const [messageText, setMessageText] = useState('');
    const currentConversationId = useSelector(state => state.messages.currentConversationId);
    const conversation = useSelector(state =>
        state.conversations.conversations.find(conv => conv.id === currentConversationId)
    );
    const dispatch = useDispatch();

    const handleSendMessage = () => {
        const newMessage = {
            text: messageText,
            timestamp: new Date().toISOString(),
            sender: 'You',
        };
        dispatch(updateLastMessage({ conversationId: currentConversationId, message: newMessage }));
        setMessageText('');
    };

    if (!conversation) return <div className="flex justify-center items-center h-full text-gray-500">Select a conversation to start chatting</div>;

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {conversation.messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-xs ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <span className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t p-4 flex items-center space-x-2 bg-gray-100 rounded-b-lg">
                <input
                    type="text"
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;