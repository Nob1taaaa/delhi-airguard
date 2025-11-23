import React, { useState } from 'react';
import { useLocationContext } from '@/context/LocationContext';
import AQICard from '@/components/Widgets/AQICard';
import PredictionGraph from '@/components/Simulation/PredictionGraph';
import PollutionDNA from '@/components/Widgets/PollutionDNA';
import HealthAdvisory from '@/components/Widgets/HealthAdvisory';
import LifeImpactCounter from '@/components/Widgets/LifeImpactCounter';
import EcoWallet from '@/components/Gamification/EcoWallet';
import ActionRecommendation from '@/components/Widgets/ActionRecommendation';
import CleanCommute from '@/components/Maps/CleanCommute';
import ForecastCard from '@/components/Widgets/ForecastCard';
import ParticleBackground from '@/components/Visuals/ParticleBackground';
import LocationSearch from '@/components/Common/LocationSearch';
import EmergencyOverlay from '@/components/Overlays/EmergencyOverlay';
import VoiceAssistant from '@/components/Voice/VoiceAssistant';
import { motion } from 'framer-motion';
import { MapPin, Wind, Droplets, Truck, HardHat, Factory, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Dashboard = () => {
    const { location, aqiData, loading, userProfile, toggleAsthma } = useLocationContext();
    const [showEmergency, setShowEmergency] = useState(false);

    const currentAQI = aqiData?.aqi ?? 180;

    const pollutants = [
        { title: "PM2.5", value: aqiData?.pm25 ?? 145, unit: "µg/m³", status: "137% over limit", color: "#ef4444", percentage: 137, trend: 'up' as const },
        { title: "PM10", value: aqiData?.pm10 ?? 210, unit: "µg/m³", status: "167% over limit", color: "#ef4444", percentage: 167, trend: 'up' as const },
        { title: "NO2", value: aqiData?.no2 ?? 45, unit: "ppb", status: "Safe limit", color: "#22c55e", percentage: 78, trend: 'down' as const },
        { title: "O3", value: 32, unit: "ppb", status: "Safe limit", color: "#22c55e", percentage: 62, trend: 'down' as const },
        { title: "CO", value: aqiData?.co ?? 1.2, unit: "ppm", status: "Safe limit", color: "#22c55e", percentage: 45, trend: 'down' as const },
        { title: "SO2", value: aqiData?.so2 ?? 8, unit: "ppb", status: "Safe limit", color: "#22c55e", percentage: 42, trend: 'down' as const },
    ];

    const predictionData = [
        { time: 'Now', aqi: currentAQI },
        { time: '1h', aqi: currentAQI + 10 },
        { time: '2h', aqi: currentAQI + 25 },
        { time: '3h', aqi: currentAQI + 15 },
        { time: '4h', aqi: currentAQI - 5 },
        { time: '5h', aqi: currentAQI - 20 },
    ];

    const actions = [
        { title: "Wear a Mask", description: "N95 masks are recommended for outdoor activities.", icon: HardHat, type: "high" as const, status: "pending" as const, impact: "High Protection" },
        { title: "Run Air Purifier", description: "Keep windows closed and run purifiers on high.", icon: Wind, type: "medium" as const, status: "active" as const, impact: "Medium Reduction" },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Atmospheric Background */}
            <ParticleBackground aqi={currentAQI} />

            <EmergencyOverlay isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
            <VoiceAssistant />

            {/* Content Overlay */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 p-4 md:p-6 space-y-6 md:space-y-8 max-w-[1600px] mx-auto"
            >
                {/* Asthma Guardian Critical Alert */}
                {userProfile.isAsthmatic && currentAQI > 200 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-600 text-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-full shrink-0">
                                <AlertTriangle className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">CRITICAL ASTHMA ALERT</h3>
                                <p className="text-red-100 text-sm md:text-base">AQI is dangerous. Use inhaler immediately if symptomatic. Stay indoors.</p>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            className="w-full sm:w-auto bg-white text-red-600 hover:bg-red-50 shadow-sm whitespace-nowrap"
                            onClick={() => setShowEmergency(true)}
                        >
                            Emergency Protocol
                        </Button>
                    </motion.div>
                )}

                {/* Header & Hero Section */}
                <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/50 shadow-sm">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            Delhi AirGuard
                        </h1>
                        <p className="text-slate-600 mt-1 flex items-center gap-2 text-sm md:text-base">
                            <MapPin className="h-4 w-4" />
                            Monitoring: <span className="font-semibold text-slate-900">{location}</span>
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="flex-grow md:flex-grow-0">
                            <LocationSearch />
                        </div>
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-2 rounded-full shadow-sm border border-white/50 ml-auto md:ml-0">
                            <span className="text-xs md:text-sm font-medium text-slate-600">Asthma Mode</span>
                            <Switch
                                checked={userProfile.isAsthmatic}
                                onCheckedChange={toggleAsthma}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Main Grid Layout - Creative Bento Box Design (Green Theme) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

                    {/* ROW 1: Status & Trends */}
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-green-100 overflow-hidden hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 group">
                        <AQICard
                            title="Current AQI"
                            value={currentAQI}
                            unit=""
                            status={currentAQI > 300 ? "Hazardous" : currentAQI > 200 ? "Very Unhealthy" : "Unhealthy"}
                            color={currentAQI > 300 ? "#7f1d1d" : currentAQI > 200 ? "#991b1b" : "#ef4444"}
                            percentage={Math.min((currentAQI / 500) * 100, 100)}
                            trend="up"
                        />
                    </div>
                    <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-green-100 rounded-2xl p-4 md:p-6 shadow-sm min-h-[300px] md:min-h-[350px] hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300">
                        <PredictionGraph data={predictionData} />
                    </div>

                    {/* ROW 2: Navigation & Composition */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50/30 backdrop-blur-md rounded-3xl border border-green-200 shadow-sm overflow-hidden min-h-[400px] md:min-h-[450px] hover:shadow-xl hover:shadow-green-100 transition-all duration-300">
                        <div className="p-4 border-b border-green-100 bg-white/40 flex items-center gap-2">
                            <div className="p-2 bg-green-100 rounded-full">
                                <Truck className="h-5 w-5 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">
                                Smart Travel Route
                            </h3>
                        </div>
                        <div className="p-2">
                            <CleanCommute />
                        </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md border border-green-100 rounded-2xl p-4 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 flex flex-col justify-center">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 px-2 flex items-center gap-2">
                            <Factory className="h-5 w-5 text-slate-400" />
                            Pollution DNA
                        </h3>
                        <PollutionDNA data={[
                            { subject: 'PM2.5', A: aqiData?.pm25 || 120, fullMark: 300 },
                            { subject: 'PM10', A: aqiData?.pm10 || 98, fullMark: 300 },
                            { subject: 'NO2', A: aqiData?.no2 || 86, fullMark: 300 },
                            { subject: 'SO2', A: aqiData?.so2 || 99, fullMark: 300 },
                            { subject: 'CO', A: (aqiData?.co || 1) * 50, fullMark: 300 },
                            { subject: 'O3', A: 65, fullMark: 300 },
                        ]} />
                    </div>

                    {/* ROW 3: Personal Impact & Health Advisory */}
                    <div className="space-y-6">
                        <div className="hover:scale-[1.02] transition-transform duration-300">
                            <EcoWallet />
                        </div>
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-green-100 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300">
                            <LifeImpactCounter aqi={currentAQI} />
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl border border-green-100 shadow-sm overflow-hidden p-6 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                            Health Advisory
                        </h3>
                        <HealthAdvisory aqi={currentAQI} />
                    </div>

                    {/* ROW 4: Actions */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 px-2">
                            <HardHat className="h-6 w-6 text-blue-600" />
                            Recommended Actions
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {actions.map((action, index) => (
                                <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl border border-green-100 shadow-sm overflow-hidden hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
                                    <ActionRecommendation {...action} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
