export const KNOWLEDGE_BASE: Record<string, string> = {
    // --- Prevention & Health ---
    prevent: `**Prevention is better than cure! Here are effective ways to protect yourself:**
1. **Mask Up**: Use N95 or N99 masks when outdoors. Cloth masks are ineffective against PM2.5.
2. **Air Purifiers**: Use HEPA filter air purifiers indoors, especially in bedrooms.
3. **Seal Leaks**: Ensure windows and doors are sealed to prevent outdoor air infiltration.
4. **Hydration**: Drink plenty of water to help your body flush out toxins.
5. **Indoor Plants**: Keep plants like Snake Plant, Areca Palm, and Spider Plant to naturally purify air.`,

    cure: `**While there is no instant "cure" for pollution exposure, you can alleviate symptoms:**
1. **Steam Inhalation**: Helps clear airways and remove particulate matter from nasal passages.
2. **Jaggery (Gur)**: Consuming jaggery helps flush out pollutants from the lungs.
3. **Antioxidant Diet**: Eat foods rich in Vitamin C (Citrus fruits) and Vitamin E (Nuts) to combat oxidative stress.
4. **Breathing Exercises**: Pranayama and deep breathing (indoors) can strengthen lung capacity.
*Note: If you experience severe difficulty breathing or chest pain, seek medical attention immediately.*`,

    health: `**Air pollution can seriously impact your health. Watch out for:**
1. **Short-term**: Coughing, eye irritation, headache, and shortness of breath.
2. **Long-term**: Asthma, bronchitis, heart disease, and reduced lung function.
3. **Vulnerable Groups**: Children, the elderly, and those with respiratory issues should stay indoors when AQI is > 200.`,

    food: `**Diet to fight pollution:**
1. **Turmeric & Ginger**: Natural anti-inflammatory properties.
2. **Tulsi Tea**: Clears respiratory tract.
3. **Broccoli & Spinach**: Rich in antioxidants.`,

    // --- App Info ---
    about: `**I am AirGuard, your advanced AI pollution assistant.**
My mission is to help you breathe cleaner air. I can track real-time AQI, predict future pollution, guide you to cleaner routes, and even help you during asthma emergencies.`,

    features: `**Here is what I can do for you:**
1. **Real-time Monitoring**: Check AQI for any city in the world.
2. **Health Protection**: Give personalized advice based on pollution levels.
3. **Emergency Protocol**: Guide you through asthma attacks.
4. **Route Planning**: Find the cleanest path to your destination.
5. **Voice Assistance**: Just talk to me, and I'll answer!`,

    // --- Pollution 101 ---
    pm25: `**PM2.5 (Particulate Matter 2.5)** are tiny particles less than 2.5 micrometers in diameter (30x smaller than hair).
*   **Source**: Vehicle exhaust, burning trash, industrial smoke.
*   **Danger**: They can penetrate deep into the lungs and enter the bloodstream, causing heart and lung disease.`,

    pm10: `**PM10** are larger particles (dust, pollen, mold).
*   **Source**: Construction dust, road dust, windblown soil.
*   **Danger**: They irritate the eyes, nose, and throat but usually don't enter the bloodstream like PM2.5.`,

    no2: `**NO2 (Nitrogen Dioxide)** is a reddish-brown gas with a sharp smell.
*   **Source**: Burning fuel (cars, trucks, power plants).
*   **Danger**: Irritates airways and aggravates asthma.`,

    aqi: `**AQI (Air Quality Index)** is a number used to report daily air quality.
*   **0-50**: Good (Green)
*   **51-100**: Moderate (Yellow)
*   **101-150**: Unhealthy for Sensitive Groups (Orange)
*   **151-200**: Unhealthy (Red)
*   **201-300**: Very Unhealthy (Purple)
*   **301+**: Hazardous (Maroon)`,
};

export const generateAIResponse = async (query: string, currentLocation: string, currentAqiData: any) => {
    const lowerQuery = query.toLowerCase();

    // 1. Check for Location Queries (Dynamic Fetching) - PRIORITY
    let locationMatch = query.match(/(?:in|at|for)\s+([a-zA-Z\s]+?)(?:\?|$|!|\.|,)/i);

    // Fallback: support phrases like "tell me Varanasi" or "tell me about Delhi"
    if (!locationMatch) {
        locationMatch =
            query.match(/tell me\s+about\s+([a-zA-Z\s]+?)(?:\?|$|!|\.|,)/i) ||
            query.match(/tell me\s+([a-zA-Z\s]+?)(?:\?|$|!|\.|,)/i);
    }

    let targetLocation = currentLocation;
    let targetData = currentAqiData;

    if (locationMatch && locationMatch[1]) {
        const requestedCity = locationMatch[1].trim();
        try {
            // Use environment variable or fallback to localhost for development
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/api/aqi/current?location=${requestedCity}`);
            const data = await response.json();
            if (data && data.length > 0) {
                targetLocation = data[0].location;
                targetData = data[0];

                // If it's JUST a location query (e.g. "AQI in Mumbai"), return the data.
                const isSafetyQuery = lowerQuery.includes('safe') || lowerQuery.includes('run') || lowerQuery.includes('walk') || lowerQuery.includes('outside');
                if (!isSafetyQuery) {
                    return `The current AQI in ${targetLocation} is ${targetData.aqi}. PM2.5 levels are ${targetData.pm25} µg/m³.`;
                }
            } else {
                return `I couldn't find data for ${requestedCity}. Please try another city.`;
            }
        } catch (error) {
            console.error('API Error:', error);
            // Fallback response when API is unavailable
            return `I can help you with general air quality advice. The current AQI in ${currentLocation} is ${currentAqiData?.aqi || 'unavailable'}.`;
        }
    }

    // 2. Safety/Activity Queries (Context Aware)
    if (lowerQuery.includes('safe') || lowerQuery.includes('run') || lowerQuery.includes('walk') || lowerQuery.includes('outside') || lowerQuery.includes('play')) {
        if (!targetData) return "I need the AQI data to answer that.";

        if (targetData.aqi > 150) {
            return `No, it's not safe to run in ${targetLocation}. The AQI is ${targetData.aqi}. Better stay indoors.`;
        } else if (targetData.aqi > 100) {
            return `It's moderate in ${targetLocation} (AQI ${targetData.aqi}). Sensitive groups should be careful.`;
        } else {
            return `Yes, it's safe to run in ${targetLocation}! The AQI is ${targetData.aqi}. Enjoy your activity.`;
        }
    }

    // 3. Knowledge Base Matching (Expanded)
    if (lowerQuery.includes('prevent') || lowerQuery.includes('protect') || lowerQuery.includes('precaution') || lowerQuery.includes('mask')) return KNOWLEDGE_BASE.prevent;
    if (lowerQuery.includes('cure') || lowerQuery.includes('treat') || lowerQuery.includes('medicine') || lowerQuery.includes('remedy')) return KNOWLEDGE_BASE.cure;
    if (lowerQuery.includes('health') || lowerQuery.includes('symptom') || lowerQuery.includes('effect') || lowerQuery.includes('harm')) return KNOWLEDGE_BASE.health;
    if (lowerQuery.includes('food') || lowerQuery.includes('diet') || lowerQuery.includes('eat') || lowerQuery.includes('nutrition')) return KNOWLEDGE_BASE.food;

    // App Info
    if (lowerQuery.includes('who are you') || lowerQuery.includes('what is this') || lowerQuery.includes('about app')) return KNOWLEDGE_BASE.about;
    if (lowerQuery.includes('feature') || lowerQuery.includes('what can you do') || lowerQuery.includes('help')) return KNOWLEDGE_BASE.features;

    // Pollution Definitions
    if (lowerQuery.includes('pm2.5') || lowerQuery.includes('pm 2.5')) return KNOWLEDGE_BASE.pm25;
    if (lowerQuery.includes('pm10') || lowerQuery.includes('pm 10')) return KNOWLEDGE_BASE.pm10;
    if (lowerQuery.includes('no2') || lowerQuery.includes('nitrogen')) return KNOWLEDGE_BASE.no2;
    if (lowerQuery.includes('what is aqi') || lowerQuery.includes('index')) return KNOWLEDGE_BASE.aqi;

    // 4. Context-Aware AQI Queries (General)
    if (lowerQuery.includes('aqi') || lowerQuery.includes('pollution') || lowerQuery.includes('quality')) {
        if (!targetData) return "I'm still loading the air quality data. Please wait a moment.";

        let status = "Good";
        if (targetData.aqi > 300) status = "Hazardous";
        else if (targetData.aqi > 200) status = "Very Unhealthy";
        else if (targetData.aqi > 150) status = "Unhealthy";
        else if (targetData.aqi > 100) status = "Moderate";

        return `The AQI in ${targetLocation} is ${targetData.aqi} (${status}).`;
    }

    // 5. General Chat / Fallback
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
        return "Hello! I am AirGuard. Ask me anything about air pollution, health, or the app.";
    }
    if (lowerQuery.includes('thank')) {
        return "You're welcome! Stay safe and breathe easy.";
    }

    return "I'm not sure about that. I can tell you about AQI, health tips, specific pollutants like PM2.5, or check pollution in any city.";
};
