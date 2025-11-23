import React, { useState, useMemo } from 'react';
import SimulationControls from '@/components/Simulation/SimulationControls';
import PredictionGraph from '@/components/Simulation/PredictionGraph';
import LocationSearch from '@/components/Common/LocationSearch';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

import { useLocationContext } from '@/context/LocationContext';

const Simulation = () => {
    const { location, aqiData } = useLocationContext();
    const [controls, setControls] = useState({
        traffic: 80,
        industry: 70,
        stubble: 40,
    });

    const handleControlChange = (key: string, value: number) => {
        setControls(prev => ({ ...prev, [key]: value }));
    };

    // Simulate prediction data based on controls and real AQI
    const predictionData = useMemo(() => {
        const data = [];
        const baseAQI = aqiData?.aqi || 200; // Use real AQI as base

        // Get dynamic source weights from backend, or default to Delhi-like profile
        const sources = aqiData?.sources || { traffic: 30, industry: 30, stubble: 10, construction: 30 };

        for (let i = 0; i < 24; i++) {
            const hour = i;

            // Calculate impact based on dynamic source percentages
            // Formula: (Control / 100) * (BaseAQI * (SourcePercentage / 100))
            const trafficImpact = (controls.traffic / 100) * (baseAQI * (sources.traffic / 100)) * (hour > 8 && hour < 20 ? 1.5 : 0.5);
            const industryImpact = (controls.industry / 100) * (baseAQI * (sources.industry / 100));
            const stubbleImpact = (controls.stubble / 100) * (baseAQI * (sources.stubble / 100));

            // Baseline curve (diurnal variation)
            const variation = Math.sin((hour - 6) / 12 * Math.PI) * (baseAQI * 0.1);
            const baseline = baseAQI + variation;

            // Predicted with interventions
            // We calculate the REDUCTION achieved by controls
            // Reduction = BaseComponent - ControlledComponent
            // ControlledComponent = BaseComponent * (ControlValue / 100)
            // So Reduction = BaseComponent * (1 - ControlValue/100)

            const trafficReduction = (baseAQI * (sources.traffic / 100)) * (1 - controls.traffic / 100);
            const industryReduction = (baseAQI * (sources.industry / 100)) * (1 - controls.industry / 100);
            const stubbleReduction = (baseAQI * (sources.stubble / 100)) * (1 - controls.stubble / 100);

            const totalReduction = trafficReduction + industryReduction + stubbleReduction;
            const reducedPollution = baseline - totalReduction;

            data.push({
                time: `${hour}:00`,
                baseline: Math.round(baseline),
                predicted: Math.round(reducedPollution),
            });
        }
        return data;
    }, [controls, aqiData]);

    const resetSimulation = () => {
        setControls({
            traffic: 80,
            industry: 70,
            stubble: 40,
        });
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Pollution Simulation: {location}</h1>
                    <p className="text-muted-foreground">
                        Analyze the impact of different intervention strategies on AQI in {location}.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <LocationSearch variant="minimal" />
                    <Button variant="outline" onClick={resetSimulation}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset Defaults
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <SimulationControls
                        values={controls}
                        onChange={handleControlChange}
                        sources={aqiData?.sources}
                    />

                    <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <h4 className="font-semibold text-primary mb-2">AI Insight</h4>
                        <p className="text-sm text-muted-foreground">
                            Reducing traffic by 20% during peak hours (8 AM - 11 AM) could lower daily average AQI by approximately 15 points.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="h-[400px] bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                        <PredictionGraph data={predictionData} />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="p-4 bg-card rounded-lg border text-center">
                            <div className="text-2xl font-bold text-green-600">-12%</div>
                            <div className="text-xs text-muted-foreground">Projected Improvement</div>
                        </div>
                        <div className="p-4 bg-card rounded-lg border text-center">
                            <div className="text-2xl font-bold text-blue-600">1.5h</div>
                            <div className="text-xs text-muted-foreground">Life Saved (Yearly)</div>
                        </div>
                        <div className="p-4 bg-card rounded-lg border text-center">
                            <div className="text-2xl font-bold text-orange-600">Moderate</div>
                            <div className="text-xs text-muted-foreground">Target Status</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulation;
