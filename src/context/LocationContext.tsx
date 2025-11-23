import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AQIData {
    location: string;
    aqi: number;
    pm25: number;
    pm10: number;
    no2: number;
    so2: number;
    co: number;
    sources: { traffic: number; industry: number; stubble: number; construction: number };
    timestamp: string;
}

interface UserProfile {
    name: string;
    isAsthmatic: boolean;
}

interface LocationContextType {
    location: string;
    setLocation: (location: string) => void;
    aqiData: AQIData | null;
    loading: boolean;
    refreshData: () => void;
    userProfile: UserProfile;
    toggleAsthma: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState("Delhi");
    const [aqiData, setAqiData] = useState<AQIData | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Load asthma mode from localStorage on mount
    const [userProfile, setUserProfile] = useState<UserProfile>(() => {
        const savedAsthmaMode = localStorage.getItem('airguard_asthma_mode');
        return {
            name: "User",
            isAsthmatic: savedAsthmaMode === 'true'
        };
    });

    const refreshData = () => setRefreshTrigger(prev => prev + 1);

    const toggleAsthma = () => {
        setUserProfile(prev => {
            const newAsthmaState = !prev.isAsthmatic;
            // Save to localStorage
            localStorage.setItem('airguard_asthma_mode', String(newAsthmaState));
            return { ...prev, isAsthmatic: newAsthmaState };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const response = await fetch(`${apiUrl}/api/aqi/current?location=${location}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setAqiData(data[0]);
                    // If backend returns a corrected name, update it
                    if (data[0].location && data[0].location !== location) {
                        setLocation(data[0].location);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch AQI data", error);
                // Fallback mock data for deployment when backend is not available
                setAqiData({
                    location: location,
                    aqi: 342,
                    pm25: 156.8,
                    pm10: 289.4,
                    no2: 78.2,
                    so2: 34.5,
                    co: 2.8,
                    sources: { traffic: 35, industry: 28, stubble: 22, construction: 15 },
                    timestamp: new Date().toISOString()
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location, refreshTrigger]);

    return (
        <LocationContext.Provider value={{ location, setLocation, aqiData, loading, refreshData, userProfile, toggleAsthma }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocationContext must be used within a LocationProvider');
    }
    return context;
};
