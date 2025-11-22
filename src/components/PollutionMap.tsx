import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useState } from "react";

interface PollutionMapProps {
  onHotspotSelect: (hotspot: string | null) => void;
}

interface Hotspot {
  id: string;
  name: string;
  aqi: number;
  lat: number;
  lng: number;
}

const PollutionMap = ({ onHotspotSelect }: PollutionMapProps) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const hotspots: Hotspot[] = [
    { id: "1", name: "Anand Vihar", aqi: 312, lat: 28.6469, lng: 77.3163 },
    { id: "2", name: "Dwarka", aqi: 198, lat: 28.5921, lng: 77.0460 },
    { id: "3", name: "Rohini", aqi: 245, lat: 28.7495, lng: 77.0736 },
    { id: "4", name: "Mundka", aqi: 289, lat: 28.6833, lng: 77.0333 },
    { id: "5", name: "Najafgarh", aqi: 267, lat: 28.6092, lng: 76.9798 },
    { id: "6", name: "Punjabi Bagh", aqi: 178, lat: 28.6692, lng: 77.1314 },
  ];

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot.id);
    onHotspotSelect(hotspot.name);
  };

  const getHotspotColor = (aqi: number) => {
    if (aqi <= 150) return "bg-aqi-moderate";
    if (aqi <= 200) return "bg-aqi-unhealthy";
    if (aqi <= 300) return "bg-aqi-very-unhealthy";
    return "bg-aqi-hazardous";
  };

  return (
    <Card className="p-6 h-[500px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Pollution Hotspots</h3>
        <p className="text-sm text-muted-foreground">Real-time monitoring across Delhi NCR</p>
      </div>

      {/* Map Placeholder with Hotspots */}
      <div className="flex-1 relative bg-muted/30 rounded-lg overflow-hidden">
        {/* Grid background for map effect */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>

        {/* Hotspot markers */}
        {hotspots.map((hotspot, index) => {
          const top = 20 + (index % 3) * 30;
          const left = 15 + Math.floor(index / 3) * 40;
          const isSelected = selectedHotspot === hotspot.id;

          return (
            <div
              key={hotspot.id}
              className={`absolute cursor-pointer transition-all hover:scale-110 ${
                isSelected ? "scale-125 z-10" : ""
              }`}
              style={{ top: `${top}%`, left: `${left}%` }}
              onClick={() => handleHotspotClick(hotspot)}
            >
              <div className="relative group">
                {/* Pulsing circle */}
                <div className={`w-6 h-6 rounded-full ${getHotspotColor(hotspot.aqi)} opacity-30 animate-pulse-slow absolute -inset-2`}></div>
                <div className={`w-4 h-4 rounded-full ${getHotspotColor(hotspot.aqi)} flex items-center justify-center`}>
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                
                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 ${
                  isSelected ? "opacity-100" : "opacity-0"
                } group-hover:opacity-100 transition-opacity`}>
                  <div className="bg-card border border-border rounded-lg shadow-lg p-2 whitespace-nowrap">
                    <p className="font-semibold text-xs">{hotspot.name}</p>
                    <p className="text-xs text-muted-foreground">AQI: {hotspot.aqi}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 space-y-1">
          <p className="text-xs font-semibold mb-2">AQI Levels</p>
          {[
            { label: "Moderate", color: "bg-aqi-moderate" },
            { label: "Unhealthy", color: "bg-aqi-unhealthy" },
            { label: "V. Unhealthy", color: "bg-aqi-very-unhealthy" },
            { label: "Hazardous", color: "bg-aqi-hazardous" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hotspot List */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {hotspots.slice(0, 4).map((hotspot) => (
          <Badge
            key={hotspot.id}
            variant={selectedHotspot === hotspot.id ? "default" : "outline"}
            className="cursor-pointer justify-between"
            onClick={() => handleHotspotClick(hotspot)}
          >
            <span className="truncate">{hotspot.name}</span>
            <span className="ml-2 font-mono">{hotspot.aqi}</span>
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default PollutionMap;
