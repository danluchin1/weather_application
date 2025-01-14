import { Hono } from "./deps.js";
import { Eta } from "./deps.js";
import { serveStatic } from "./deps.js";
import { z } from "./deps.js";
import * as weatherService from "./weatherService.js";
import * as municipalityService from "./municipalityService.js";

const eta = new Eta({ views: "./api/templates" }); // Updated the path

const app = new Hono();

const cityNameSchema = z.string()
    .trim()
    .min(1, "City name cannot be empty.")
    .regex(/^[a-zA-Z\s]+$/, "City name can only contain letters and spaces.");

// Define a route for fetching weather for a specific city
app.get("/weather", async (c) => {
    const rawCity = c.req.query("name") || "Helsinki";
    let city;
    let errorMessage = null;
    let currentWeather = null;
    let forecastWeather = null;
    
    try {
        city = cityNameSchema.parse(rawCity);
    
        currentWeather = await weatherService.getWeatherToday(city);
        forecastWeather = await weatherService.getWeatherForecast(city);
    
        if (!currentWeather || !forecastWeather) {
            throw new Error("Invalid city name or weather data not found.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    
        if (error instanceof z.ZodError) {
            errorMessage = error.errors.map(e => e.message).join(" ");
        } else {
            errorMessage = `Weather data for "${rawCity}" could not be found. Please try another city.`;
        }
    }
    
    return c.html(
        await eta.render("weather.eta", {
            city: rawCity, 
            currentWeather,
            forecastWeather,
            errorMessage,
        })
    );
});

// Define a route for fetching municipality information
app.get("/municipality-description", async (c) => {
    const city = c.req.query("city");
    let cityInfo = null;

    if (city) {
        cityInfo = await municipalityService.getCityInfo(city);
    }

    return c.html(await eta.render("municipality.eta", { city, cityInfo }));
});

// Define a route for the root path
app.get("/", async (c) => {
    const featuredCities = ["New York", "Tokyo", "Warsaw"];
    
    const weatherData = await Promise.all(
        featuredCities.map(async (city) => {
            try {
                const currentWeather = await weatherService.getWeatherToday(city);
                return { city, currentWeather };
            } catch (error) {
                console.error(`Failed to fetch weather data for ${city}:`, error.message);
                return { city, currentWeather: null }; // Fallback data
            }
        })
    );

    return c.html(await eta.render("main.eta", { weatherData }));
});

// Serve all image files from the root directory when accessed via /images/*.
app.use("/images/*", serveStatic({ root: "." }));
// Serve the main stylesheet for general application styles.
app.use("/styles-main.css", serveStatic({ path: "./styles/styles-main.css" }));
// Serve the stylesheet for weather-related styles.
app.use("/styles-weather.css", serveStatic({ path: "./styles/styles-weather.css" }));
// Serve the stylesheet for municipality-related styles.
app.use("/styles-municipality.css", serveStatic({ path: "./styles/styles-municipality.css" }));

export default app;
