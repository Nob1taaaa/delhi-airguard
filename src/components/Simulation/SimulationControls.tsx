import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Car, Factory, Flame } from 'lucide-react';

interface SimulationControlsProps {
    values: {
        traffic: number;
        industry: number;
        stubble: number;
    };
    sources?: {
        traffic: number;
        industry: number;
        stubble: number;
        construction: number;
    };
    onChange: (key: string, value: number) => void;
}

const SimulationControls = ({ values, sources, onChange }: SimulationControlsProps) => {
    return (
        <div className="space-y-8 p-6 bg-card rounded-xl border shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Intervention Controls</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Car className="text-blue-500" />
                        <div className="flex flex-col">
                            <Label>Traffic Density</Label>
                            <span className="text-xs text-muted-foreground">Contribution: {sources?.traffic || 30}%</span>
                        </div>
                    </div>
                    <span className="font-mono text-sm">{values.traffic}%</span>
                </div>
                <Slider
                    value={[values.traffic]}
                    onValueChange={(val) => onChange('traffic', val[0])}
                    max={100}
                    step={1}
                    className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                    Adjusting traffic volume affects NO2 and PM2.5 levels.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Factory className="text-orange-500" />
                        <div className="flex flex-col">
                            <Label>Industrial Activity</Label>
                            <span className="text-xs text-muted-foreground">Contribution: {sources?.industry || 30}%</span>
                        </div>
                    </div>
                    <span className="font-mono text-sm">{values.industry}%</span>
                </div>
                <Slider
                    value={[values.industry]}
                    onValueChange={(val) => onChange('industry', val[0])}
                    max={100}
                    step={1}
                    className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                    Industrial output impacts SO2 and PM10 concentrations.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Flame className="text-red-500" />
                        <div className="flex flex-col">
                            <Label>Stubble Burning</Label>
                            <span className="text-xs text-muted-foreground">Contribution: {sources?.stubble || 10}%</span>
                        </div>
                    </div>
                    <span className="font-mono text-sm">{values.stubble}%</span>
                </div>
                <Slider
                    value={[values.stubble]}
                    onValueChange={(val) => onChange('stubble', val[0])}
                    max={100}
                    step={1}
                    className="py-2"
                />
                <p className="text-xs text-muted-foreground">
                    Major contributor to seasonal PM2.5 spikes in North India.
                </p>
            </div>
        </div>
    );
};

export default SimulationControls;
