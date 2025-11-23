import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Leaf, AlertTriangle, Clock, ArrowRight, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CleanCommute = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showRoutes, setShowRoutes] = useState(false);

    const handleAnalyze = () => {
        if (!origin || !destination) return;
        setIsAnalyzing(true);

        // Simulate AI Analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowRoutes(true);
        }, 1500);
    };

    const startNavigation = () => {
        // Genius Move: We inject a "Green Waypoint" based on the destination to force a cleaner path.
        // For this demo, we use a generic green zone, but in a real backend, this would be calculated.
        // We also use 'avoid=highways' to prefer inner, often greener roads if applicable.

        const greenWaypoint = "Lodhi Garden, New Delhi"; // Simulating the AI's chosen green node

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(greenWaypoint)}&travelmode=driving`;

        window.open(mapsUrl, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                    <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                    <h3 className="font-bold text-xl text-slate-800">Eco-Route Finder</h3>
                    <p className="text-slate-500 text-sm">Travel Green, Breathe Clean 🌿</p>
                </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4 mb-6">
                <div className="relative group">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                    <Input
                        placeholder="Start Location (e.g., Home 🏡)"
                        className="pl-10 h-12 bg-green-50/50 border-green-100 focus:border-green-400 focus:ring-green-200 rounded-xl transition-all"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </div>
                <div className="relative group">
                    <Navigation className="absolute left-3 top-3.5 h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                    <Input
                        placeholder="Destination (e.g., Office 🏢)"
                        className="pl-10 h-12 bg-green-50/50 border-green-100 focus:border-green-400 focus:ring-green-200 rounded-xl transition-all"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                {!showRoutes && (
                    <Button
                        onClick={handleAnalyze}
                        disabled={!origin || !destination || isAnalyzing}
                        className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-green-200 transition-all hover:scale-[1.02]"
                    >
                        {isAnalyzing ? (
                            <span className="flex items-center gap-2">
                                <Search className="h-4 w-4 animate-spin" /> Finding Green Paths... 🍃
                            </span>
                        ) : (
                            "Find Cleanest Route 🌿"
                        )}
                    </Button>
                )}
            </div>

            {/* Results Section */}
            {showRoutes && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                >
                    {/* Fastest Route (Bad) */}
                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">Standard Route</h4>
                                <p className="text-slate-500 text-xs">Via Main Highway</p>
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-lg text-slate-800">32 min</span>
                                <span className="text-red-600 font-bold text-xs">AQI 412 (Severe)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-red-600 text-xs font-medium">
                            <AlertTriangle className="h-3 w-3" />
                            High pollution exposure
                        </div>
                    </div>

                    {/* Cleanest Route (Good) */}
                    <div className="relative p-5 rounded-2xl border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm">
                        <div className="absolute -top-3 right-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Leaf className="h-3 w-3" /> AI Recommended
                        </div>

                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Leaf className="h-6 w-6 text-green-600 fill-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">Green Corridor</h4>
                                    <p className="text-green-700 text-sm font-medium">Via Parks & Green Zones</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-2xl text-slate-800">38 min</span>
                                <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-0.5 rounded-md">AQI 145 (Moderate)</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-green-800 text-xs font-medium bg-green-100/50 p-2 rounded-lg">
                            <Clock className="h-3 w-3" />
                            +6 mins, but <span className="font-bold">65% less pollution</span> exposure! 🌬️
                        </div>
                    </div>

                    <Button
                        onClick={startNavigation}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-6 font-semibold shadow-lg shadow-blue-200 transition-transform active:scale-95"
                    >
                        Start Clean Navigation 🚀
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default CleanCommute;
