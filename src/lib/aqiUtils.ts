export interface AQICategory {
  label: string;
  description: string;
  min: number;
  max: number;
}

export const getAQICategory = (aqi: number): AQICategory => {
  if (aqi <= 50) {
    return {
      label: "Good",
      description: "Air quality is satisfactory",
      min: 0,
      max: 50,
    };
  } else if (aqi <= 100) {
    return {
      label: "Moderate",
      description: "Acceptable air quality",
      min: 51,
      max: 100,
    };
  } else if (aqi <= 150) {
    return {
      label: "Unhealthy for Sensitive",
      description: "Sensitive groups may experience health effects",
      min: 101,
      max: 150,
    };
  } else if (aqi <= 200) {
    return {
      label: "Unhealthy",
      description: "Everyone may begin to experience health effects",
      min: 151,
      max: 200,
    };
  } else if (aqi <= 300) {
    return {
      label: "Very Unhealthy",
      description: "Health alert: everyone may experience serious effects",
      min: 201,
      max: 300,
    };
  } else {
    return {
      label: "Hazardous",
      description: "Health warning of emergency conditions",
      min: 301,
      max: 500,
    };
  }
};

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "bg-aqi-good";
  if (aqi <= 100) return "bg-aqi-moderate";
  if (aqi <= 150) return "bg-aqi-unhealthy-sensitive";
  if (aqi <= 200) return "bg-aqi-unhealthy";
  if (aqi <= 300) return "bg-aqi-very-unhealthy";
  return "bg-aqi-hazardous";
};

export const getAQITextColor = (aqi: number): string => {
  if (aqi <= 50) return "text-aqi-good";
  if (aqi <= 100) return "text-aqi-moderate";
  if (aqi <= 150) return "text-aqi-unhealthy-sensitive";
  if (aqi <= 200) return "text-aqi-unhealthy";
  if (aqi <= 300) return "text-aqi-very-unhealthy";
  return "text-aqi-hazardous";
};
