import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const PredictionChart = () => {
  // Mock prediction data - in production, this would come from ML model
  const generatePredictionData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < 48; i++) {
      const time = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hour = time.getHours();
      
      // Simulate AQI patterns (higher in morning/evening rush hours)
      let baseAQI = 150;
      if (hour >= 7 && hour <= 10) baseAQI = 220; // Morning rush
      if (hour >= 18 && hour <= 21) baseAQI = 240; // Evening rush
      if (hour >= 0 && hour <= 5) baseAQI = 120; // Night time
      
      const randomVariation = Math.random() * 40 - 20;
      const aqi = Math.round(baseAQI + randomVariation);
      
      data.push({
        time: i === 0 ? "Now" : `+${i}h`,
        aqi: aqi,
        hour: time.getHours(),
      });
    }
    
    return data;
  };

  const data = generatePredictionData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const aqi = payload[0].value;
      let category = "Good";
      if (aqi > 200) category = "Unhealthy";
      else if (aqi > 150) category = "Unhealthy for Sensitive";
      else if (aqi > 100) category = "Moderate";
      
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold">AQI: {aqi}</p>
          <p className="text-xs text-muted-foreground">{category}</p>
          <p className="text-xs text-muted-foreground mt-1">{payload[0].payload.time}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 h-[500px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">48-Hour AQI Prediction</h3>
        <p className="text-sm text-muted-foreground">ML-powered forecast using LSTM model</p>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              interval={5}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              domain={[0, 300]}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference lines for AQI categories */}
            <ReferenceLine y={50} stroke="hsl(var(--aqi-good))" strokeDasharray="3 3" opacity={0.5} />
            <ReferenceLine y={100} stroke="hsl(var(--aqi-moderate))" strokeDasharray="3 3" opacity={0.5} />
            <ReferenceLine y={150} stroke="hsl(var(--aqi-unhealthy-sensitive))" strokeDasharray="3 3" opacity={0.5} />
            <ReferenceLine y={200} stroke="hsl(var(--aqi-unhealthy))" strokeDasharray="3 3" opacity={0.5} />
            
            <Line 
              type="monotone" 
              dataKey="aqi" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-aqi-good"></div>
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-aqi-moderate"></div>
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-aqi-unhealthy"></div>
            <span>Unhealthy (151-200)</span>
          </div>
        </div>
        <span>Accuracy: 87%</span>
      </div>
    </Card>
  );
};

export default PredictionChart;
