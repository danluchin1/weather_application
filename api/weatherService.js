import "jsr:@std/dotenv/load";

const weatherApiKey = Deno.env.get("WEATHER_API_KEY");

const getWeatherToday = async (city) => {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
};

const getWeatherForecast = async (city, days = 7) => {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=${days}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data;
};

export { getWeatherToday, getWeatherForecast };