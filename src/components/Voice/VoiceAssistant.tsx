import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X } from 'lucide-react';
import { useLocationContext } from '@/context/LocationContext';
import { Button } from '@/components/ui/button';
import { generateAIResponse } from '@/utils/aiLogic';

// Web Speech API types
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
}

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const VoiceAssistant = () => {
    const { aqiData, location, setLocation, userProfile } = useLocationContext();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isUserStopped, setIsUserStopped] = useState(true); // Track if user manually stopped it
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true; // Enable continuous mode
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                // Get the latest result
                const lastResultIndex = event.results.length - 1;
                const text = event.results[lastResultIndex][0].transcript;
                setTranscript(text);
                processCommand(text);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                // Don't stop on error, try to keep going unless it's a fatal error
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    setIsListening(false);
                    setIsUserStopped(true);
                }
            };

            recognition.onend = () => {
                // Only stop if the user explicitly requested it
                if (!isUserStopped) {
                    recognition.start();
                } else {
                    setIsListening(false);
                }
            };

            recognitionRef.current = recognition;
        }
    }, [aqiData, location, isUserStopped]);

    const speak = (text: string) => {
        // Strip markdown asterisks for speech
        const speechText = text.replace(/\*\*/g, '').replace(/\*/g, '');

        if ('speechSynthesis' in window) {
            setIsSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(speechText);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setResponse(text);
        }
    };

    const processCommand = async (command: string) => {
        const lowerCmd = command.toLowerCase();

        // Handle specific voice-only interactions or overrides here if needed
        if (lowerCmd.includes('hello') || lowerCmd.includes('hi')) {
            speak(`Hello ${userProfile.name}! I'm listening.`);
            return;
        }

        // Use the shared AI logic
        const aiResponse = await generateAIResponse(command, location, aqiData);

        // If the response implies a location change (handled inside generateAIResponse for data fetching, 
        // but we might want to update the app state too if the user asked "Check pollution in Mumbai")
        const locationMatch = command.match(/(?:in|at|for)\s+([a-zA-Z\s]+?)(?:\?|$|!|\.|,)/i);
        if (locationMatch && locationMatch[1]) {
            // Optional: Update global location context if the user explicitly asked for a switch
            // For now, we just speak the result returned by generateAIResponse
        }

        speak(aiResponse);
    };

    const toggleListening = () => {
        if (isListening) {
            setIsUserStopped(true);
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setTranscript('');
            setResponse('');
            setIsUserStopped(false);
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        return null; // Browser doesn't support speech API
    }

    return (
        <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {(transcript || response) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-xs mb-2"
                    >
                        {transcript && <p className="text-slate-500 text-sm mb-1">"{transcript}"</p>}
                        {response && <p className="text-slate-800 font-medium text-sm max-h-40 overflow-y-auto">{response}</p>}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleListening}
                className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isListening
                    ? 'bg-red-500 text-white ring-4 ring-red-200'
                    : isSpeaking
                        ? 'bg-blue-500 text-white ring-4 ring-blue-200'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
            >
                {isListening ? (
                    <Mic className="h-6 w-6 animate-pulse" />
                ) : isSpeaking ? (
                    <Volume2 className="h-6 w-6 animate-bounce" />
                ) : (
                    <Mic className="h-6 w-6" />
                )}
            </motion.button>
        </div>
    );
};

export default VoiceAssistant;
