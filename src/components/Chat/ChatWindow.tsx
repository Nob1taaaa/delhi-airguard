import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatAvatar from './ChatAvatar';
import { useLocationContext } from '@/context/LocationContext';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const KNOWLEDGE_BASE: Record<string, string> = {
    prevent: `**Prevention is better than cure! Here are effective ways to protect yourself:**
1. **Mask Up**: Use N95 or N99 masks when outdoors. Cloth masks are ineffective against PM2.5.
2. **Air Purifiers**: Use HEPA filter air purifiers indoors, especially in bedrooms.
3. **Seal Leaks**: Ensure windows and doors are sealed to prevent outdoor air infiltration.
4. **Hydration**: Drink plenty of water to help your body flush out toxins.
5. **Indoor Plants**: Keep plants like Snake Plant, Areca Palm, and Spider Plant to naturally purify air.`,

    cure: `**While there is no instant "cure" for pollution exposure, you can alleviate symptoms:**
1. **Steam Inhalation**: Helps clear airways and remove particulate matter from nasal passages.
2. **Jaggery (Gur)**: Consuming jaggery helps flush out pollutants from the lungs.
3. **Antioxidant Diet**: Eat foods rich in Vitamin C (Citrus fruits) and Vitamin E (Nuts) to combat oxidative stress.
4. **Breathing Exercises**: Pranayama and deep breathing (indoors) can strengthen lung capacity.
*Note: If you experience severe difficulty breathing or chest pain, seek medical attention immediately.*`,

    resolve: `**Resolving air pollution requires collective action. Here is what can be done:**
1. **Individual Level**: Carpool, use public transport, stop burning waste, and switch to electric vehicles.
2. **Community Level**: Report illegal burning, plant trees, and support green initiatives.
3. **Government Level**: Stricter industrial regulations, better dust control in construction, and managing crop residue (stubble).`,

    health: `**Air pollution can seriously impact your health. Watch out for:**
1. **Short-term**: Coughing, eye irritation, headache, and shortness of breath.
2. **Long-term**: Asthma, bronchitis, heart disease, and reduced lung function.
3. **Vulnerable Groups**: Children, the elderly, and those with respiratory issues should stay indoors when AQI is > 200.`,

    food: `**Diet to fight pollution:**
1. **Turmeric & Ginger**: Natural anti-inflammatory properties.
2. **Tulsi Tea**: Clears respiratory tract.
3. **Broccoli & Spinach**: Rich in antioxidants.`,
};

const ChatWindow = () => {
    const { location, aqiData } = useLocationContext();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: `Hello! I'm AirShield, your personal air quality assistant. I can help you with prevention tips, health advice, and real-time AQI for ${location}. How can I help you breathe better today?`,
            sender: 'bot',
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(scrollToBottom, [messages]);

    const generateResponse = async (query: string) => {
        const lowerQuery = query.toLowerCase();

        // 1. Check for Knowledge Base Keywords
        if (lowerQuery.includes('prevent') || lowerQuery.includes('protect') || lowerQuery.includes('precaution')) {
            return KNOWLEDGE_BASE.prevent;
        }
        if (lowerQuery.includes('cure') || lowerQuery.includes('treat') || lowerQuery.includes('medicine')) {
            return KNOWLEDGE_BASE.cure;
        }
        if (lowerQuery.includes('resolve') || lowerQuery.includes('solution') || lowerQuery.includes('fix')) {
            return KNOWLEDGE_BASE.resolve;
        }
        if (lowerQuery.includes('health') || lowerQuery.includes('symptom') || lowerQuery.includes('effect')) {
            return KNOWLEDGE_BASE.health;
        }
        if (lowerQuery.includes('food') || lowerQuery.includes('diet') || lowerQuery.includes('eat')) {
            return KNOWLEDGE_BASE.food;
        }

        // 2. Check for Location Queries (Dynamic Fetching)
        const locationMatch = query.match(/(?:in|at|for)\s+([a-zA-Z\s]+?)(?:\?|$|!|\.|,)/i);
        let targetLocation = location;
        let targetData = aqiData;

        if (locationMatch && locationMatch[1]) {
            const requestedCity = locationMatch[1].trim();
            try {
                const response = await fetch(`http://localhost:8000/api/aqi/current?location=${requestedCity}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    targetLocation = data[0].location;
                    targetData = data[0];
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
                return `I couldn't get data for ${requestedCity}. Please check the spelling.`;
            }
        }

        // 3. AQI Data Response
        if (lowerQuery.includes('aqi') || lowerQuery.includes('pollution') || lowerQuery.includes('quality') || locationMatch) {
            if (!targetData) return "I'm fetching the latest data...";

            const status = targetData.aqi <= 50 ? "Good" : targetData.aqi <= 100 ? "Satisfactory" : targetData.aqi <= 200 ? "Moderate" : targetData.aqi <= 300 ? "Poor" : "Very Poor";

            return `**Current Status for ${targetLocation}:**
- **AQI**: ${targetData.aqi} (${status})
- **PM2.5**: ${targetData.pm25} µg/m³
- **Main Pollutant**: ${targetData.pm25 > targetData.pm10 ? 'PM2.5' : 'PM10'}

${status === "Poor" || status === "Very Poor" ? "⚠️ **Warning**: Air quality is bad. Wear a mask!" : "✅ Air quality is acceptable."}`;
        }

        // 4. Default Fallback
        return "I can help with **prevention tips**, **health advice**, **pollution cures**, and **real-time AQI**. Try asking: 'How do I prevent pollution effects?'";
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate bot response delay
        setTimeout(async () => {
            const responseText = await generateResponse(userMsg.text);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-primary/5 text-center">
                <ChatAvatar emotion={isTyping ? 'worried' : 'happy'} />
                <h3 className="font-semibold">AirShield Assistant</h3>
                <p className="text-xs text-muted-foreground">Expert AI for Pollution Advice</p>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                                    }`}>
                                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div
                                    className={`p-3 rounded-lg text-sm whitespace-pre-wrap ${msg.sender === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                        : 'bg-secondary text-secondary-foreground rounded-tl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-secondary p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about cures, prevention, or AQI..."
                        className="flex-1"
                    />
                    <Button onClick={handleSend} size="icon">
                        <Send size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
