import React from 'react';
import { Bot } from 'lucide-react';

interface ChatAvatarProps {
    emotion?: 'happy' | 'neutral' | 'worried';
}

const ChatAvatar = ({ emotion = 'neutral' }: ChatAvatarProps) => {
    const getColor = () => {
        switch (emotion) {
            case 'happy': return 'bg-green-500';
            case 'worried': return 'bg-orange-500';
            default: return 'bg-blue-500';
        }
    };

    return (
        <div className="relative w-16 h-16 mx-auto mb-4">
            <div className={`absolute inset-0 rounded-full opacity-20 animate-pulse ${getColor()}`}></div>
            <div className={`relative w-full h-full rounded-full flex items-center justify-center ${getColor()} text-white shadow-lg transition-colors duration-500`}>
                <Bot size={32} />
            </div>
            {/* Particle effects could be added here */}
        </div>
    );
};

export default ChatAvatar;
