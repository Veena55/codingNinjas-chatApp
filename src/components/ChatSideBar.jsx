import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentConversation } from '../redux/slices/messagesSlice';
import NewConversationPopup from './NewConsversationPopup';

const ChatSidebar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const conversations = useSelector(state => state.conversations.conversations);
    const dispatch = useDispatch();

    const filteredConversations = conversations.filter(conv =>
        conv.messages[0]?.sender.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectConversation = (id) => {
        dispatch(setCurrentConversation(id));
    };

    return (
        <div className="w-1/4 bg-gray-800 text-white h-screen p-4 flex flex-col space-y-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={() => setShowPopup(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
                Create Conversation
            </button>
            <div className="space-y-2 overflow-y-auto flex-1">
                {filteredConversations.map(conv => (
                    <div
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv.id)}
                        className="p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition"
                    >
                        <h3 className="font-semibold text-lg">{conv.messages[0]?.sender}</h3>
                        <p className="text-sm text-gray-300 truncate">{conv.messages[conv.messages.length - 1]?.text}</p>
                    </div>
                ))}
            </div>
            {showPopup && <NewConversationPopup onClose={() => setShowPopup(false)} />}
        </div>
    );
};

export default ChatSidebar;
