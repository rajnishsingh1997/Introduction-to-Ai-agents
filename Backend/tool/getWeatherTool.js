import { response } from "express";

const getWeatherDetails = async (cityName) => {
  const response =
    await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${cityName}&aqi=yes
`);
  // return the whole response,might be useful
  return response;
};

export default getWeatherDetails;
