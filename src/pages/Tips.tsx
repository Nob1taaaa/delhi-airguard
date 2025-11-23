import React, { useState } from 'react';
import Gamification from '@/components/Tips/Gamification';
import TipCard from '@/components/Tips/TipCard';
import VoiceOfChange from '@/components/Tips/VoiceOfChange';
import { toast } from 'sonner'; // Assuming sonner is available, or we can use a simple alert/console for now if not installed. Let's stick to simple state logic first.

const Tips = () => {
    const [score, setScore] = useState(750);

    const handleScoreUpdate = () => {
        const newScore = Math.min(score + 100, 1000);
        setScore(newScore);
        // Optional: Add a visual confetti or toast here later
    };

    const tips = [
        {
            id: 1,
            title: "Use Public Transport",
            description: "Taking the metro instead of driving can save 2.5kg of CO2 per trip.",
            category: "Transport"
        },
        {
            id: 2,
            title: "Indoor Plants",
            description: "Snake plants and Spider plants are excellent natural air purifiers.",
            category: "Home"
        },
        {
            id: 3,
            title: "Avoid Peak Hours",
            description: "Exercise outdoors before 7 AM or after 8 PM to avoid peak pollution.",
            category: "Health"
        },
        {
            id: 4,
            title: "Report Stubble Burning",
            description: "Use the AirShield app to report incidents and help authorities act fast.",
            category: "Action"
        }
    ];

    return (
        <div className="p-6 space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Tips & Awareness</h1>
                <p className="text-muted-foreground">
                    Small actions make a big difference. Track your impact and learn more.
                </p>
            </div>

            {/* Voice of Change - Hero Section */}
            <VoiceOfChange onActionComplete={handleScoreUpdate} />

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                    <Gamification score={score} />
                </div>

                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold">Daily Eco-Tips</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {tips.map((tip) => (
                            <TipCard
                                key={tip.id}
                                title={tip.title}
                                description={tip.description}
                                category={tip.category}
                            />
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <span className="text-xl">💡</span> Did You Know?
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Delhi's air quality improves by 15% on Sundays due to reduced vehicular traffic.
                            <span className="block mt-2 font-medium text-slate-800">Imagine if we all carpooled just one day a week!</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tips;
