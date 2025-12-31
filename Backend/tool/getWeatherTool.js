const getWeatherDetails = async (cityName) => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("Api keys for the weather details not found");
    }

    if (!cityName || typeof cityName !== "string") {
      throw new Error("invalid city name provided for the api call");
    }
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${
        process.env.API_KEY
      }&${encodeURIComponent(cityName)}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error(
        `Weather API request failed with status ${response.status}`
      );
    }

    const parsedJsonResponse = await response.json();
    return parsedJsonResponse;
  } catch (error) {
    console.log(error.message);
    throw new Error(`Weather service failed: ${error.message}`);
  }
};

export default getWeatherDetails;
