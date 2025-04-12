const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Weather Route
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required.' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
        },
      }
    );

    const data = weatherResponse.data;
    const sanitizedData = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };

    res.json(sanitizedData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    if (error.response) {
      console.error('API response error:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

// Fallback Policy Route (Temperature-aware heuristic tips)
app.get('/policy', (req, res) => {
  const temperature = parseFloat(req.query.temperature);

  if (isNaN(temperature)) {
    return res.status(400).json({ error: 'Temperature query parameter is required and must be a number.' });
  }

  let tips = [];

  if (temperature >= 30) {
    // Hot weather tips
    tips = [
      "Use ceiling fans before switching on the AC.",
      "Keep curtains closed during the day to block heat.",
      "Hydrate well and avoid overusing cooling appliances.",
      "Set AC to 24°C for efficient cooling.",
      "Use solar shades or reflective window panels."
    ];
  } else if (temperature <= 15) {
    // Cold weather tips
    tips = [
      "Use thick curtains to retain heat inside.",
      "Seal any window or door gaps to prevent heat loss.",
      "Wear layered clothing indoors instead of increasing heater usage.",
      "Use electric blankets instead of room heaters when possible.",
      "Bake or cook at home to warm the kitchen naturally."
    ];
  } else {
    // Moderate weather tips
    tips = [
      "Take advantage of natural ventilation.",
      "Use programmable thermostats efficiently.",
      "Switch off appliances when not in use.",
      "Use public transport or cycle when possible.",
      "Maintain appliances for better energy performance."
    ];
  }

  res.json({ temperature, tips });
});


app.post('/predict', async (req, res) => {
  try {
    const response = await axios.post(
      'https://1c29-59-145-65-66.ngrok-free.app/predict',
      { input: req.body.input } // ✅ Match this key
    );

    console.log("Prediction Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching prediction:", error.message);
    if (error.response) {
      console.error("Response error data:", error.response.data);
    }
    res.status(500).json({ error: 'Failed to get prediction from ML model.' });
  }
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
