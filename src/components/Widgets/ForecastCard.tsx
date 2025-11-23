import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const ForecastCard = () => {
    return (
        <Card className="p-6 bg-indigo-50 border-indigo-100">
            <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-indigo-900">Future Health Shield</h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-indigo-100 shadow-sm">
                    <Calendar className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <div>
                        <div className="font-medium text-slate-900">Tomorrow, 8:00 AM</div>
                        <div className="text-sm text-slate-600">Expected AQI Spike: <span className="font-bold text-red-600">450</span></div>
                        <div className="mt-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md inline-block">
                            Recommendation: Cancel Morning Run
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-indigo-100 shadow-sm">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                        <div className="font-medium text-slate-900">Saturday, 2:00 PM</div>
                        <div className="text-sm text-slate-600">Wind Direction Change</div>
                        <div className="mt-2 text-xs font-medium text-orange-700 bg-orange-50 px-2 py-1 rounded-md inline-block">
                            Stubble Smoke expected
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ForecastCard;
