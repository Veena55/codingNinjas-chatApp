// src/components/NewConversationPopup.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConversation } from '../redux/slices/conversationsSlice';
import { setCurrentConversation } from '../redux/slices/messagesSlice';

const NewConversationPopup = ({ onClose }) => {
    const contacts = useSelector(state => state.conversations.contacts || []);  // Ensure default value is set
    const conversations = useSelector(state => state.conversations.conversations);
    const dispatch = useDispatch();

    const handleStartConversation = (contactId) => {
        const existingConversation = conversations.find(conv => conv.contactId === contactId);
        if (existingConversation) {
            dispatch(setCurrentConversation(existingConversation.id));
        } else {
            const newConversation = {
                id: conversations.length + 1,
                contactId,
                messages: [],
            };
            dispatch(addConversation(newConversation));
            dispatch(setCurrentConversation(newConversation.id));
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-black">Select a contact</h2>
                <div className="space-y-2 mb-4">
                    {contacts.map(contact => (
                        <div
                            key={contact.id}
                            onClick={() => handleStartConversation(contact.id)}
                            className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                        >
                            {contact.name}
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NewConversationPopup;
