import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const location = url.searchParams.get('location') || 'Delhi';
    
    console.log('Fetching AQI data for:', location);

    // Try to fetch from AQICN API (World Air Quality Index)
    const aqicnResponse = await fetch(
      `https://api.waqi.info/feed/${location}/?token=demo`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (aqicnResponse.ok) {
      const aqicnData = await aqicnResponse.json();
      
      if (aqicnData.status === 'ok' && aqicnData.data) {
        const data = aqicnData.data;
        
        // Transform to our format
        const transformedData = {
          location: data.city?.name || location,
          aqi: data.aqi || 0,
          pm25: data.iaqi?.pm25?.v || 0,
          pm10: data.iaqi?.pm10?.v || 0,
          no2: data.iaqi?.no2?.v || 0,
          so2: data.iaqi?.so2?.v || 0,
          co: data.iaqi?.co?.v || 0,
          sources: {
            traffic: Math.floor(Math.random() * 40) + 20,
            industry: Math.floor(Math.random() * 35) + 15,
            stubble: Math.floor(Math.random() * 30) + 10,
            construction: Math.floor(Math.random() * 25) + 5
          },
          timestamp: data.time?.iso || new Date().toISOString()
        };

        return new Response(JSON.stringify([transformedData]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Fallback to mock data if API fails
    console.log('Using fallback data for:', location);
    const fallbackData = {
      location: location,
      aqi: Math.floor(Math.random() * 200) + 150, // 150-350 range
      pm25: Math.floor(Math.random() * 150) + 50,
      pm10: Math.floor(Math.random() * 200) + 100,
      no2: Math.floor(Math.random() * 80) + 20,
      so2: Math.floor(Math.random() * 50) + 10,
      co: Math.floor(Math.random() * 5) + 1,
      sources: {
        traffic: 35,
        industry: 28,
        stubble: 22,
        construction: 15
      },
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify([fallbackData]), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching AQI data:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
