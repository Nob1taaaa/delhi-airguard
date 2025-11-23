import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

interface PredictionGraphProps {
    data: any[];
}

const PredictionGraph = ({ data }: PredictionGraphProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full w-full bg-white rounded-xl p-4"
        >
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">48-Hour AQI Prediction</h3>
                    <p className="text-sm text-slate-500">ML-powered forecast using LSTM model</p>
                </div>
                <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Good</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Moderate</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Unhealthy</span>
                </div>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px', color: '#0f172a' }}
                        />
                        {data.length > 0 && 'aqi' in data[0] ? (
                            <Area
                                type="monotone"
                                dataKey="aqi"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorAqi)"
                            />
                        ) : (
                            <>
                                <Area
                                    type="monotone"
                                    dataKey="baseline"
                                    stroke="#94a3b8"
                                    strokeWidth={2}
                                    fillOpacity={0.1}
                                    fill="#94a3b8"
                                    name="Business as Usual"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="predicted"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                    fillOpacity={0.3}
                                    fill="#22c55e"
                                    name="With Intervention"
                                />
                            </>
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default PredictionGraph;
