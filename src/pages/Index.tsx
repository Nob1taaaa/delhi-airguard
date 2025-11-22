import { useState } from "react";
import AQIHero from "@/components/AQIHero";
import PollutionMap from "@/components/PollutionMap";
import PredictionChart from "@/components/PredictionChart";
import ActionRecommendations from "@/components/ActionRecommendations";
import PollutantCards from "@/components/PollutantCards";
import HealthAdvisory from "@/components/HealthAdvisory";

const Index = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm bg-card/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Delhi AirShield
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Pollution Control</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Live Monitoring
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero AQI Display */}
        <AQIHero />

        {/* Pollutant Cards */}
        <PollutantCards />

        {/* Map and Predictions Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <PollutionMap onHotspotSelect={setSelectedHotspot} />
          <PredictionChart />
        </div>

        {/* Action Recommendations */}
        <ActionRecommendations selectedHotspot={selectedHotspot} />

        {/* Health Advisory */}
        <HealthAdvisory />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Delhi AirShield • Powered by AI & Real-time Data • Built for a cleaner tomorrow</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
