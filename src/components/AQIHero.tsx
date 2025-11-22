import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAQICategory, getAQIColor } from "@/lib/aqiUtils";

const AQIHero = () => {
  // Mock current AQI - in production, this would come from API
  const currentAQI = 187;
  const location = "Connaught Place, Delhi";
  const lastUpdated = new Date().toLocaleTimeString();
  
  const category = getAQICategory(currentAQI);
  const colorClass = getAQIColor(currentAQI);

  return (
    <Card className="relative overflow-hidden border-0 shadow-2xl">
      <div className={`absolute inset-0 opacity-10 ${colorClass}`}></div>
      <div className="relative p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* AQI Display */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Badge variant="outline" className="text-xs">
                {location}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Updated: {lastUpdated}
              </span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-muted-foreground">
                Current Air Quality Index
              </h2>
              <div className="flex items-baseline gap-4 justify-center md:justify-start">
                <span className="text-7xl md:text-8xl font-bold">{currentAQI}</span>
                <div className="space-y-1">
                  <Badge className={`${colorClass} text-white text-sm px-3 py-1`}>
                    {category.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Indicator */}
          <div className="relative">
            <div className="w-48 h-48 rounded-full relative flex items-center justify-center">
              {/* Animated rings */}
              <div className={`absolute inset-0 rounded-full ${colorClass} opacity-20 animate-pulse-slow`}></div>
              <div className={`absolute inset-4 rounded-full ${colorClass} opacity-30 animate-pulse-slow`} style={{ animationDelay: '0.5s' }}></div>
              <div className={`absolute inset-8 rounded-full ${colorClass} opacity-40 animate-pulse-slow`} style={{ animationDelay: '1s' }}></div>
              
              {/* Center icon */}
              <div className={`w-24 h-24 rounded-full ${colorClass} flex items-center justify-center z-10`}>
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "24h Avg", value: "163", trend: "↓" },
            { label: "7d Avg", value: "201", trend: "↑" },
            { label: "Hotspots", value: "12", trend: "→" },
            { label: "Affected", value: "8.2M", trend: "↑" },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold flex items-center gap-1 justify-center md:justify-start">
                {stat.value}
                <span className="text-sm text-muted-foreground">{stat.trend}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AQIHero;
