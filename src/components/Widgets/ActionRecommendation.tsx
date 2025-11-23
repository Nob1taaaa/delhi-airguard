import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ActionProps {
    title: string;
    description: string;
    status: 'active' | 'pending' | 'completed';
    impact: string;
    type: 'high' | 'medium' | 'low';
    icon: React.ElementType;
}

const ActionRecommendation = ({ title, description, status, impact, type, icon: Icon }: ActionProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-600 bg-green-50 border-green-200';
            case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
            default: return 'text-slate-600 bg-slate-50 border-slate-200';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'high': return 'bg-red-500 hover:bg-red-600';
            case 'medium': return 'bg-orange-500 hover:bg-orange-600';
            case 'low': return 'bg-yellow-500 hover:bg-yellow-600';
            default: return 'bg-slate-500';
        }
    };

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4"
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${type === 'high' ? 'bg-red-100 text-red-600' : type === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{title}</h4>
                        <Badge variant="outline" className={`${getStatusColor(status)} capitalize`}>
                            {status}
                        </Badge>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">{description}</p>
                    <div className="flex items-center gap-2">
                        <Badge className={`${getTypeColor(type)} text-white border-none`}>
                            {type.toUpperCase()} IMPACT
                        </Badge>
                        <span className="text-xs font-medium text-green-600">{impact}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                {status === 'active' && <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">Active</Button>}
                {status === 'pending' && <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Deploy</Button>}
                {status === 'completed' && <Button size="sm" variant="ghost" disabled className="text-slate-400"><CheckCircle size={16} className="mr-1" /> Done</Button>}
            </div>
        </motion.div>
    );
};

export default ActionRecommendation;
