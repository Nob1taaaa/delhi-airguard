import React, { useEffect, useState } from 'react';
import { Skull } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface LifeImpactCounterProps {
    aqi?: number;
}

const LifeImpactCounter = ({ aqi = 150 }: LifeImpactCounterProps) => {
    const [minutesLost, setMinutesLost] = useState(0);

    // Simulate real-time impact accumulation based on AQI
    useEffect(() => {
        // Dynamic Speed Logic:
        // High AQI (e.g., 400) -> Fast Speed (50ms interval)
        // Low AQI (e.g., 50) -> Slow Speed (1000ms interval)

        const baseInterval = 1000; // 1 second for safe air
        // Calculate speed: Higher AQI = Lower Interval (Faster)
        // AQI 50 -> 1000ms
        // AQI 400 -> ~125ms
        const speed = Math.max(50, baseInterval - (aqi * 2));

        // Impact Factor: How much life is lost per tick
        // Higher AQI = More lost per tick
        const impactFactor = aqi / 10000;

        const interval = setInterval(() => {
            setMinutesLost(prev => prev + impactFactor);
        }, speed);

        return () => clearInterval(interval);
    }, [aqi]);

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="bg-red-50 border-red-100 shadow-sm relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-red-600">
                        Life Impact (Today)
                    </CardTitle>
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Skull className="h-4 w-4 text-red-600" />
                    </motion.div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="text-2xl font-bold text-red-600 font-mono">
                        {minutesLost.toFixed(2)} <span className="text-sm text-red-600/70 font-sans">minutes</span>
                    </div>
                    <p className="text-xs text-red-600/60 mt-1">
                        Estimated life lost due to current air quality exposure.
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default LifeImpactCounter;
