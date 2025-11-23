import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

import { useLocationContext } from '@/context/LocationContext';

const FloatingChat = () => {
    const { location, aqiData } = useLocationContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: `Hello! I am your AirShield Assistant. I can tell you about the air quality in ${location}.`, sender: 'bot', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Speech Recognition Setup
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputValue(transcript);
            setIsListening(false);
            handleSend(transcript); // Auto-send on voice input
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    }

    const toggleListening = () => {
        if (!recognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
            setIsListening(true);
        }
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const generateResponse = async (query: string) => {
        const lowerQuery = query.toLowerCase();

        // Check for specific location query
        const locationMatch = query.match(/(?:in|at|for)\s+([a-zA-Z\s]+?)(?:\?|$|!|\.|,)/i);
        let targetLocation = location;
        let targetData = aqiData;

        if (locationMatch && locationMatch[1]) {
            const requestedCity = locationMatch[1].trim();
            // Fetch data for the requested city
            try {
                const response = await fetch(`http://localhost:8000/api/aqi/current?location=${requestedCity}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    targetLocation = data[0].location;
                    targetData = data[0];
                }
            } catch (error) {
                console.error("Failed to fetch data for requested city", error);
                return `I'm sorry, I couldn't get the data for ${requestedCity}. Please try again.`;
            }
        }

        if (lowerQuery.includes('aqi') || lowerQuery.includes('air quality') || lowerQuery.includes('pollution') || locationMatch) {
            if (!targetData) return "I'm currently fetching the latest data. Please try again in a moment.";

            const status = targetData.aqi <= 50 ? "Good" : targetData.aqi <= 100 ? "Satisfactory" : targetData.aqi <= 200 ? "Moderate" : targetData.aqi <= 300 ? "Poor" : "Very Poor";

            return `The current AQI in ${targetLocation} is ${targetData.aqi}, which is considered ${status}. PM2.5 levels are at ${targetData.pm25} micrograms per cubic meter.`;
        }

        if (lowerQuery.includes('health') || lowerQuery.includes('mask') || lowerQuery.includes('safe')) {
            if (!targetData) return "I need to check the air quality first.";

            if (targetData.aqi > 200) {
                return `In ${targetLocation}, the air quality is poor. It is highly recommended to wear a mask outdoors and avoid strenuous activities.`;
            } else if (targetData.aqi > 100) {
                return `In ${targetLocation}, the air is moderate. Sensitive groups should limit prolonged outdoor exertion.`;
            } else {
                return `In ${targetLocation}, the air quality is acceptable. It's a great day to be outside!`;
            }
        }

        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
            return `Hello! I can tell you about the air quality in ${location} or any other city. Just ask "What is the AQI in Mumbai?".`;
        }

        return "I can help you with real-time air quality updates, health advice, and pollution forecasts. Try asking 'What is the AQI in London?'";
    };

    const handleSend = async (text = inputValue) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');

        // Simulate Bot Response
        // We use a small timeout to make it feel natural, but the response generation is now async
        setTimeout(async () => {
            const responseText = await generateResponse(text);
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            speak(botResponse.text); // Speak response
        }, 500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageSquare size={18} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">AirShield Assistant</h3>
                                    <p className="text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </Button>
                        </div>

                        {/* Chat Area */}
                        <ScrollArea className="flex-1 p-4 bg-slate-50" ref={scrollRef}>
                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2"
                            >
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type or speak..."
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant={isListening ? "destructive" : "outline"}
                                    onClick={toggleListening}
                                    className={isListening ? "animate-pulse" : ""}
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </Button>
                                <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700">
                                    <Send size={18} />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default FloatingChat;
