import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Droplets, Car, Factory, Wind, Check } from "lucide-react";

interface ActionRecommendationsProps {
  selectedHotspot: string | null;
}

interface Action {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  icon: any;
  status: "active" | "pending" | "completed";
  impact: string;
}

const ActionRecommendations = ({ selectedHotspot }: ActionRecommendationsProps) => {
  const actions: Action[] = [
    {
      id: "1",
      title: "Deploy Anti-Smog Guns",
      description: "Activate water mist sprayers at 12 identified hotspots",
      priority: "high",
      icon: Droplets,
      status: "active",
      impact: "15-20% AQI reduction",
    },
    {
      id: "2",
      title: "Implement Odd-Even Traffic",
      description: "Restrict vehicular movement based on number plates for 48 hours",
      priority: "high",
      icon: Car,
      status: "pending",
      impact: "25-30% AQI reduction",
    },
    {
      id: "3",
      title: "Industrial Activity Pause",
      description: "Temporary halt of non-essential industrial operations in affected zones",
      priority: "medium",
      icon: Factory,
      status: "pending",
      impact: "10-15% AQI reduction",
    },
    {
      id: "4",
      title: "Construction Ban",
      description: "Stop all construction and demolition activities",
      priority: "high",
      icon: AlertTriangle,
      status: "completed",
      impact: "8-12% AQI reduction",
    },
    {
      id: "5",
      title: "Green Corridor Activation",
      description: "Deploy mechanical road sweepers and water sprinklers on major routes",
      priority: "medium",
      icon: Wind,
      status: "active",
      impact: "5-8% AQI reduction",
    },
    {
      id: "6",
      title: "Truck Entry Ban",
      description: "Restrict heavy vehicle entry into city limits (6 AM - 10 PM)",
      priority: "high",
      icon: Car,
      status: "pending",
      impact: "12-18% AQI reduction",
    },
  ];

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-destructive text-destructive-foreground";
    if (priority === "medium") return "bg-aqi-unhealthy-sensitive text-white";
    return "bg-aqi-moderate text-white";
  };

  const getStatusColor = (status: string) => {
    if (status === "active") return "border-green-500";
    if (status === "completed") return "border-muted";
    return "border-primary";
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">AI-Powered Action Recommendations</h3>
          {selectedHotspot && (
            <Badge variant="outline">
              Focused on: {selectedHotspot}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Intelligent system suggests real-time interventions to reduce pollution levels
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-destructive">
            {actions.filter(a => a.priority === "high").length}
          </p>
          <p className="text-xs text-muted-foreground">High Priority</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">
            {actions.filter(a => a.status === "active").length}
          </p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {actions.reduce((sum, a) => {
              const impact = parseInt(a.impact.split('-')[1]);
              return sum + (a.status === "active" ? impact : 0);
            }, 0)}%
          </p>
          <p className="text-xs text-muted-foreground">Est. Impact</p>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <div
              key={action.id}
              className={`p-4 border-2 rounded-lg transition-all hover:shadow-md animate-fade-in ${getStatusColor(action.status)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getPriorityColor(action.priority)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm">{action.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {action.status}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Badge className={`text-xs ${getPriorityColor(action.priority)}`}>
                      {action.priority.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-medium text-green-600">
                      {action.impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Impact Estimation */}
      <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Estimated Total AQI Reduction</p>
            <p className="text-xs text-muted-foreground mt-1">
              If all high-priority actions are implemented
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">45-60%</p>
            <p className="text-xs text-muted-foreground">within 24-48 hours</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActionRecommendations;
