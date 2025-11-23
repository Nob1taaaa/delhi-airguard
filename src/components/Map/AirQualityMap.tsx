import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AirQualityMap = () => {
    const position: [number, number] = [28.6139, 77.2090]; // Delhi coordinates

    const hotspots = [
        { id: 1, lat: 28.6139, lng: 77.2090, aqi: 350, name: "Connaught Place" },
        { id: 2, lat: 28.7041, lng: 77.1025, aqi: 420, name: "Pitampura" },
        { id: 3, lat: 28.5355, lng: 77.3910, aqi: 380, name: "Noida Sector 18" },
        { id: 4, lat: 28.4595, lng: 77.0266, aqi: 310, name: "Gurugram Cyber City" },
    ];

    const getColor = (aqi: number) => {
        if (aqi > 400) return '#7f1d1d'; // Hazardous
        if (aqi > 300) return '#991b1b'; // Severe
        if (aqi > 200) return '#b91c1c'; // Very Poor
        if (aqi > 100) return '#c2410c'; // Poor
        if (aqi > 50) return '#eab308'; // Moderate
        return '#16a34a'; // Good
    };

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden border border-border shadow-sm">
            <MapContainer 
                // @ts-ignore - react-leaflet types issue
                center={position} 
                zoom={10} 
                style={{ height: '100%', width: '100%' }} 
                scrollWheelZoom={false}
            >
                <TileLayer
                    // @ts-ignore - react-leaflet types issue
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hotspots.map((spot) => (
                    <CircleMarker
                        key={spot.id}
                        // @ts-ignore - react-leaflet types issue
                        center={[spot.lat, spot.lng]}
                        pathOptions={{ color: getColor(spot.aqi), fillColor: getColor(spot.aqi), fillOpacity: 0.7 }}
                    >
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-bold">{spot.name}</h3>
                                <p className="text-lg font-semibold">AQI: {spot.aqi}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default AirQualityMap;
