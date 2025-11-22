import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Pollutant {
  name: string;
  value: number;
  unit: string;
  safeLimit: number;
  trend: "up" | "down";
  trendValue: number;
}

const PollutantCards = () => {
  const pollutants: Pollutant[] = [
    { name: "PM2.5", value: 142, unit: "µg/m³", safeLimit: 60, trend: "down", trendValue: 12 },
    { name: "PM10", value: 267, unit: "µg/m³", safeLimit: 100, trend: "up", trendValue: 8 },
    { name: "NO₂", value: 78, unit: "µg/m³", safeLimit: 80, trend: "down", trendValue: 5 },
    { name: "SO₂", value: 34, unit: "µg/m³", safeLimit: 80, trend: "down", trendValue: 15 },
    { name: "CO", value: 1.8, unit: "mg/m³", safeLimit: 4, trend: "up", trendValue: 3 },
    { name: "O₃", value: 62, unit: "µg/m³", safeLimit: 100, trend: "down", trendValue: 7 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {pollutants.map((pollutant, index) => {
        const exceeds = pollutant.value > pollutant.safeLimit;
        
        return (
          <Card 
            key={index} 
            className={`p-4 transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in ${
              exceeds ? "border-destructive/50" : "border-border"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-muted-foreground">{pollutant.name}</h3>
                {pollutant.trend === "down" ? (
                  <TrendingDown className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-destructive" />
                )}
              </div>
              
              <div>
                <p className={`text-2xl font-bold ${exceeds ? "text-destructive" : "text-foreground"}`}>
                  {pollutant.value}
                </p>
                <p className="text-xs text-muted-foreground">{pollutant.unit}</p>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Safe limit</span>
                  <span className="font-medium">{pollutant.safeLimit}</span>
                </div>
                {exceeds && (
                  <p className="text-xs text-destructive mt-1">
                    {Math.round((pollutant.value / pollutant.safeLimit - 1) * 100)}% over limit
                  </p>
                )}
              </div>

              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all ${
                    exceeds ? "bg-destructive" : "bg-green-500"
                  }`}
                  style={{ width: `${Math.min((pollutant.value / pollutant.safeLimit) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default PollutantCards;
