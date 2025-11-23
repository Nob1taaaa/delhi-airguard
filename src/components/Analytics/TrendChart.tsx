import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
    data: any[];
    title: string;
    color: string;
}

const TrendChart = ({ data, title, color }: TrendChartProps) => {
    return (
        <div className="h-[300px] w-full bg-card p-4 rounded-xl border shadow-sm">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: 'none' }}
                    />
                    <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TrendChart;
