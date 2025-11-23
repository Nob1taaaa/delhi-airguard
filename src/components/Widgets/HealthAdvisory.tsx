import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Briefcase, AlertTriangle } from 'lucide-react';

interface HealthAdvisoryProps {
    aqi: number;
}

const HealthAdvisory = ({ aqi }: HealthAdvisoryProps) => {
    const advisories = [
        {
            title: "General Public",
            color: "bg-orange-500",
            text: "text-orange-500",
            items: [
                "Limit outdoor activities, especially between 6 AM - 10 AM",
                "Wear N95/N99 masks when going outside",
                "Use air purifiers indoors if available"
            ]
        },
        {
            title: "Sensitive Groups",
            color: "bg-red-500",
            text: "text-red-500",
            items: [
                "Children, elderly, and pregnant women should avoid outdoor exposure",
                "People with respiratory conditions should stay indoors",
                "Keep emergency medicines readily available"
            ]
        },
        {
            title: "Outdoor Workers",
            color: "bg-purple-500",
            text: "text-purple-500",
            items: [
                "Mandatory N95 mask usage during work hours",
                "Take frequent breaks in filtered air environments",
                "Stay hydrated and watch for symptoms"
            ]
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-3">
            {advisories.map((advisory, index) => (
                <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-md border border-white/50 flex flex-col"
                >
                    <div className={`${advisory.color} p-4 text-center`}>
                        <h4 className="font-bold text-white text-lg tracking-wide">{advisory.title}</h4>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                        <ul className="space-y-4">
                            {advisory.items.map((item, i) => (
                                <li key={i} className="text-slate-700 text-sm font-medium flex items-start gap-3 leading-relaxed">
                                    <span className={`mt-1.5 w-2 h-2 rounded-full ${advisory.text} bg-current flex-shrink-0`} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default HealthAdvisory;
