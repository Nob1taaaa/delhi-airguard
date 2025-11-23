import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GamificationProps {
    score: number;
}

const Gamification = ({ score }: GamificationProps) => {
    const maxScore = 1000;

    const badges = [
        { id: 1, name: 'Clean Commuter', icon: Trophy, color: 'text-yellow-500', earned: score >= 100 },
        { id: 2, name: 'Energy Saver', icon: Medal, color: 'text-blue-500', earned: score >= 500 },
        { id: 3, name: 'Policy Pioneer', icon: Star, color: 'text-purple-500', earned: score >= 800 },
    ];

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Your Eco-Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl font-bold text-primary">{score}</span>
                        <span className="text-sm text-muted-foreground">/ {maxScore}</span>
                    </div>
                    <Progress value={(score / maxScore) * 100} className="h-3" />
                    <p className="text-xs text-muted-foreground mt-2">
                        You're in the top 15% of eco-conscious citizens in Delhi!
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Badges & Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        {badges.map((badge) => (
                            <div
                                key={badge.id}
                                className={`flex flex-col items-center p-3 rounded-lg border ${badge.earned ? 'bg-secondary/50 border-primary/20' : 'bg-muted opacity-50'}`}
                            >
                                <badge.icon className={`w-8 h-8 mb-2 ${badge.earned ? badge.color : 'text-gray-400'}`} />
                                <span className="text-xs font-medium text-center">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Gamification;
