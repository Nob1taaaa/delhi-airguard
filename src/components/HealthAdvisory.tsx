import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, AlertCircle, Activity } from "lucide-react";

const HealthAdvisory = () => {
  const advisories = [
    {
      group: "General Public",
      icon: Users,
      color: "bg-aqi-unhealthy",
      recommendations: [
        "Limit outdoor activities, especially between 6 AM - 10 AM",
        "Wear N95/N99 masks when going outside",
        "Use air purifiers indoors if available",
        "Keep windows and doors closed",
      ],
    },
    {
      group: "Sensitive Groups",
      icon: Heart,
      color: "bg-aqi-very-unhealthy",
      recommendations: [
        "Children, elderly, and pregnant women should avoid outdoor exposure",
        "People with respiratory conditions should stay indoors",
        "Keep emergency medicines readily available",
        "Monitor health symptoms closely",
      ],
    },
    {
      group: "Outdoor Workers",
      icon: Activity,
      color: "bg-aqi-hazardous",
      recommendations: [
        "Mandatory N95 mask usage during work hours",
        "Take frequent breaks in filtered air environments",
        "Stay hydrated and watch for symptoms",
        "Report any breathing difficulties immediately",
      ],
    },
  ];

  const symptoms = [
    "Shortness of breath",
    "Coughing or wheezing",
    "Eye irritation",
    "Chest discomfort",
    "Fatigue or dizziness",
  ];

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <h3 className="text-lg font-semibold">Health Advisory</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Personalized recommendations based on current AQI levels
        </p>
      </div>

      {/* Advisory Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {advisories.map((advisory, index) => {
          const Icon = advisory.icon;
          
          return (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`${advisory.color} p-4 flex items-center gap-3`}>
                <Icon className="w-6 h-6 text-white" />
                <h4 className="font-semibold text-white">{advisory.group}</h4>
              </div>
              
              <div className="p-4 space-y-2">
                {advisory.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning Symptoms */}
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          Seek Medical Attention If You Experience:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {symptoms.map((symptom, i) => (
            <Badge key={i} variant="outline" className="text-xs justify-center">
              {symptom}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Emergency Helpline: <span className="font-mono font-semibold">1800-XXX-XXXX</span>
        </p>
      </div>

      {/* Air Quality Protection Tips */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-semibold text-sm mb-3">Indoor Air Quality</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Use HEPA air purifiers (recommended: 1 per 200 sq ft)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Keep indoor plants (Money plant, Aloe vera, Spider plant)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Avoid smoking and incense burning indoors
            </li>
          </ul>
        </div>
        
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-semibold text-sm mb-3">When Outdoors</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Always wear certified N95/N99 masks
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Avoid congested areas and traffic junctions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              Schedule activities during lower AQI hours (typically afternoon)
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default HealthAdvisory;
