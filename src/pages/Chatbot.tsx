import React from 'react';
import ChatWindow from '@/components/Chat/ChatWindow';

const Chatbot = () => {
    return (
        <div className="p-6 h-full flex flex-col">
            <div className="mb-6 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
                <p className="text-muted-foreground">
                    Get real-time advice and answers to your pollution-related queries.
                </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <ChatWindow />
            </div>
        </div>
    );
};

export default Chatbot;
