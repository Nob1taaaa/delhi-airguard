import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AQICardProps {
    title: string;
    value: string | number;
    unit: string;
    status: string; // e.g., "Safe limit: 60"
    color: string; // Progress bar color
    percentage: number; // For progress bar
    trend?: 'up' | 'down';
}

const AQICard = ({ title, value, unit, status, color, percentage, trend }: AQICardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Card className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
                        {trend && (
                            <span className={`text-xs flex items-center ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </span>
                        )}
                    </div>

                    <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-3xl font-bold text-slate-900">{value}</span>
                        <span className="text-xs text-slate-400 font-medium">{unit}</span>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase">
                            <span>Safe Limit</span>
                            <span>{status}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(percentage, 100)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: color }}
                            />
                        </div>
                        <p className="text-[10px] font-medium" style={{ color }}>
                            {percentage > 100 ? `${percentage - 100}% over limit` : 'Within safe limits'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default AQICard;
