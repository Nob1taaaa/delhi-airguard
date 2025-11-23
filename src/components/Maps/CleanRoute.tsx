import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Leaf, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const CleanRoute = () => {
    const [selectedRoute, setSelectedRoute] = useState<'fast' | 'clean'>('clean');

    return (
        <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-blue-600" />
                    Clean Commute
                </h3>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                    Home ➔ Office
                </span>
            </div>

            <div className="space-y-3">
                {/* Fast Route */}
                <div
                    className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden",
                        selectedRoute === 'fast'
                            ? "border-red-500 bg-red-50"
                            : "border-slate-100 hover:border-slate-200"
                    )}
                    onClick={() => setSelectedRoute('fast')}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="font-bold text-slate-900">Fastest Route</div>
                            <div className="text-xs text-slate-500">Via Ring Road</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-slate-900">32 min</div>
                            <div className="text-xs text-red-600 font-bold">AQI 412 (Severe)</div>
                        </div>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-[90%]" />
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-red-700">
                        <AlertTriangle className="h-3 w-3" />
                        <span>High pollution exposure risk</span>
                    </div>
                </div>

                {/* Clean Route */}
                <div
                    className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden",
                        selectedRoute === 'clean'
                            ? "border-green-500 bg-green-50"
                            : "border-slate-100 hover:border-slate-200"
                    )}
                    onClick={() => setSelectedRoute('clean')}
                >
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                        RECOMMENDED
                    </div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                                Cleanest Route
                                <Leaf className="h-4 w-4 text-green-600 fill-green-600" />
                            </div>
                            <div className="text-xs text-slate-500">Via Park Avenue</div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-slate-900">38 min</div>
                            <div className="text-xs text-green-600 font-bold">AQI 145 (Moderate)</div>
                        </div>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[35%]" />
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
                        <Clock className="h-3 w-3" />
                        <span>+6 mins, but 65% less pollution</span>
                    </div>
                </div>
            </div>

            <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Start Navigation
            </Button>
        </Card>
    );
};

export default CleanRoute;
