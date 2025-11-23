import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface PollutionDNAProps {
    data?: { subject: string; A: number; fullMark: number }[];
}

const PollutionDNA = ({ data }: PollutionDNAProps) => {
    const defaultData = [
        { subject: 'PM2.5', A: 120, fullMark: 150 },
        { subject: 'PM10', A: 98, fullMark: 150 },
        { subject: 'NO2', A: 86, fullMark: 150 },
        { subject: 'SO2', A: 99, fullMark: 150 },
        { subject: 'CO', A: 85, fullMark: 150 },
        { subject: 'O3', A: 65, fullMark: 150 },
    ];

    const chartData = data || defaultData;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[400px] w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden"
        >
            <h3 className="text-lg font-semibold mb-4 text-slate-900 relative z-10">Pollution DNA</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Current Levels"
                        dataKey="A"
                        stroke="#8884d8"
                        strokeWidth={3}
                        fill="#8884d8"
                        fillOpacity={0.5}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#0f172a' }}
                        itemStyle={{ color: '#0f172a' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default PollutionDNA;
