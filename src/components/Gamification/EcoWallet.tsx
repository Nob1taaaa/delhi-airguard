import React, { useState, useEffect } from 'react';
import { Wallet, Trophy, Bus, Bike, Footprints, ArrowRight, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EcoWallet = () => {
    const [coins, setCoins] = useState(1350);
    const [rupeeValue, setRupeeValue] = useState(0);

    useEffect(() => {
        // Load coins from local storage or default to 1350
        const storedCoins = localStorage.getItem('airshield_coins');
        if (storedCoins) {
            setCoins(parseInt(storedCoins));
        }
    }, []);

    const [redeemToken, setRedeemToken] = useState<string | null>(null);
    const [isRedeeming, setIsRedeeming] = useState(false);

    useEffect(() => {
        // Update rupee value: 1000 coins = 50 rupees
        // Formula: (Coins / 1000) * 50
        const value = (coins / 1000) * 50;
        setRupeeValue(value);

        // Save to local storage
        localStorage.setItem('airshield_coins', coins.toString());
    }, [coins]);

    const earnCoins = (amount: number) => {
        setCoins(prev => prev + amount);
    };

    const handleRedeem = () => {
        if (coins < 100) return; // Minimum balance check
        setIsRedeeming(true);

        // Simulate API processing
        setTimeout(() => {
            const token = `AS-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.floor(Math.random() * 10000)}`;
            setRedeemToken(token);
            setIsRedeeming(false);
            // Deduct coins? Optional. Let's keep them for "Total Earnings" feel for now, or deduct.
            // Let's deduct to make it real.
            setCoins(prev => Math.max(0, prev - 1000)); // Deduct 1000 coins per redemption
        }, 1500);
    };

    return (
        <Card className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white border-none shadow-xl overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <CardHeader className="pb-2 relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-emerald-100 text-lg font-medium mb-1">Eco-Warrior Wallet</CardTitle>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-bold text-white">{coins}</h2>
                            <span className="text-emerald-200 font-medium">AirCoins</span>
                        </div>
                        <div className="mt-1 inline-flex items-center gap-1 bg-emerald-500/20 px-2 py-1 rounded-lg border border-emerald-500/30">
                            <span className="text-xs text-emerald-200">Real Value:</span>
                            <span className="text-sm font-bold text-white">₹{rupeeValue.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 backdrop-blur-sm">
                        <Trophy className="h-8 w-8 text-yellow-400" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative z-10">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-emerald-200 mb-3 font-medium">Log Activity & Earn</p>
                        <div className="grid grid-cols-3 gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => earnCoins(50)}
                                className="flex flex-col items-center justify-center p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors group"
                            >
                                <Footprints className="h-5 w-5 mb-1 text-emerald-200 group-hover:text-white" />
                                <span className="text-xs font-bold">Walk</span>
                                <span className="text-[10px] text-emerald-300">+50</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => earnCoins(100)}
                                className="flex flex-col items-center justify-center p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors group"
                            >
                                <Bike className="h-5 w-5 mb-1 text-emerald-200 group-hover:text-white" />
                                <span className="text-xs font-bold">Cycle</span>
                                <span className="text-[10px] text-emerald-300">+100</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => earnCoins(30)}
                                className="flex flex-col items-center justify-center p-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors group"
                            >
                                <Bus className="h-5 w-5 mb-1 text-emerald-200 group-hover:text-white" />
                                <span className="text-xs font-bold">Bus</span>
                                <span className="text-[10px] text-emerald-300">+30</span>
                            </motion.button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-emerald-100">Next Reward: Free Metro Ride</span>
                            <span className="text-xs font-bold text-white">1500 Coins</span>
                        </div>
                        <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((coins / 1500) * 100, 100)}%` }}
                                className="h-full bg-yellow-400"
                            />
                        </div>
                        <div className="mt-4">
                            {!redeemToken ? (
                                <Button
                                    onClick={handleRedeem}
                                    disabled={isRedeeming || coins < 100}
                                    className="w-full bg-white text-emerald-900 hover:bg-emerald-50 font-bold shadow-lg transition-all active:scale-95"
                                >
                                    {isRedeeming ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="w-5 h-5 border-2 border-emerald-900 border-t-transparent rounded-full"
                                        />
                                    ) : (
                                        <>Redeem Cash (₹{Math.floor(rupeeValue)}) <ArrowRight className="ml-2 h-4 w-4" /></>
                                    )}
                                </Button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/10 rounded-xl p-3 border border-white/20"
                                >
                                    <div className="text-center mb-2">
                                        <p className="text-xs text-emerald-200 font-bold">Cash Token Generated! 🌱</p>
                                        <p className="text-xs text-white/80 mt-1">Show this at any <span className="text-yellow-300 font-bold">partner plant shop</span> to get <span className="text-yellow-300 font-bold">free trees and plants!</span> 🌳🌻</p>
                                    </div>
                                    <div
                                        onClick={() => {
                                            navigator.clipboard.writeText(redeemToken);
                                            alert("Token copied!");
                                        }}
                                        className="bg-black/30 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-black/40 transition-colors group"
                                    >
                                        <code className="font-mono text-lg font-bold text-yellow-400 tracking-wider">{redeemToken}</code>
                                        <Copy className="h-4 w-4 text-white/50 group-hover:text-white" />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setRedeemToken(null)}
                                        className="w-full mt-2 text-emerald-200 hover:text-white hover:bg-white/10 text-xs"
                                    >
                                        Close
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EcoWallet;
