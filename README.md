# Municipality & Weather Information App
A web application built using the Deno runtime and Hono web framework, providing detailed weather updates and municipality-related information. This project is lightweight, modular, and designed for scalability.

## Project Overview
The Municipality Weather Information App allows users to:
* View weather information for various locations.
* Explore municipality-specific details, including images and descriptions.
* Access a visually appealing interface styled with custom templates and CSS.
* The app uses a modern, serverless-first approach with Deno for an efficient and secure runtime.

## Technologies Used
**Backend**
* Deno: A secure, fast, and JavaScript/TypeScript runtime.
* Hono: A minimal and ultrafast web framework for Deno.
**Frontend**
* ETA.js: Template engine for rendering dynamic HTML.
* CSS: Custom styles for responsive design.
**APIs**
* Weather API: External API for fetching real-time weather data.
* Hugging Face AI API: External API for leveraging advanced AI models to perform text generation. 
**Utilities**
* Deno Environment Variables: Managed using Deno’s Deno.env and .env files.

## Setting Up the Project Locally
**Prerequisites**
Ensure you have the following installed on your system:
* Deno: Version 1.30 or higher.
**Steps**
1. **Clone the repository:**
git clone https://github.com/danluchin1/weather_application
cd weather_application
2. **Set up environment variables:**
* Create a .env file in the root directory (or use the provided project.env).
* Define the following variables:
**PORT=3000**
**WEATHER_API_KEY=your-weather-api-key**
3. **Run the application:** Use  the Deno runtime to start the app
**deno run --allow-read --allow-net --env-file=project.env --allow-env --watch app-run.js**
**Flags Explained**
* **--allow-read:** Allows access to local files (e.g., templates, images).
* **--allow-net:** Grants the app access to make network requests.
* **--allow-env:** Enables access to environment variables.
* **--watch** Enables watch mode, which automatically restarts the script when any of its dependencies change.
4. **Access the application:** Open your browser and navigate to http://localhost:3000.

## API References and Key Management
**Weather API**
The application relies on a third-party weather API to fetch real-time data. You'll need to register for an API key from the weather service: **https://www.weatherapi.com/**.
1. **API Key Setup**
* Obtain your API key from the provider's website.
* Add the key to the .env file:
**WEATHER_API_KEY=your-weather-api-key**
2. **Environment Variables**
The project uses Deno’s Deno.env to load environment variables securely. Keys are never hardcoded in the source code, ensuring enhanced security.
3. **Weather Data Fetching**
Weather data is fetched dynamically using the key defined in the .env file:
**const apiKey = Deno.env.get("WEATHER_API_KEY");**
4. **Route Example**
The /weather route retrieves current weather data and forecast for 7 days for the specified location:
**currentWeather = await weatherService.getWeatherToday(city);**
**forecastWeather = await weatherService.getWeatherForecast(city);**

**AI API**
The application uses the Hugging Face AI API to generate textual descriptions dynamically, such as creating brief descriptions of municipalities or locations. To use this service, you need to register for an API key at https://huggingface.co/.
1. **API Key Setup**
* Obtain your API key by signing up at Hugging Face and creating an API token.
* Add the key to the .env file:
**HUGGINGFACE_API_KEY=your-huggingface-api-key**
2. **Environment Variables**
The project uses Deno’s Deno.env to load environment variables securely. This ensures that API keys are never hardcoded into the source code, promoting better security practices.
3. **AI Data Fetching**
AI data is fetched dynamically using the key defined in the .env file:
**const huggingFaceApiKey = Deno.env.get("HUGGINGFACE_API_KEY");**
4. **Route Example**
The /municipality-description route generates a short description for a specified city:
**cityInfo = await municipalityService.getCityInfo(city);**