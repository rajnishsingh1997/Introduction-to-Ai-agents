const getAqiDetails = async (cityName) => {
  if (!process.env.TOKEN) {
    throw new Error("Token for the AQI details api call not found");
  }
  if (!cityName || typeof cityName !== "string") {
    throw new Error("invalid city name provided for the api call");
  }
  try {
    const response = await fetch(
      `https://api.waqi.info/feed/${encodeURIComponent(cityName)}/?token=${
        process.env.TOKEN
      }`
    );
    if (!response.ok) {
      throw new Error(
        `AQI API request failed with status ${response.status}`
      );
    }
    const parsedJsonResponse = await response.json();
    return parsedJsonResponse;
  } catch (error) {
    console.log(error.message);
    throw new Error(`AQI service failed`);
  }
};

export default getAqiDetails;
