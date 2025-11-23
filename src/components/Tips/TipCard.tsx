import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface TipCardProps {
    title: string;
    description: string;
    category: string;
}

const TipCard = ({ title, description, category }: TipCardProps) => {
    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                    <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{category}</span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default TipCard;
