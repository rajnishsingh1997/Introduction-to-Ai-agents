const getWeatherDetails = async (cityName) => {
  try {
    const response =
      await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${cityName}&aqi=yes
`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getWeatherDetails;
