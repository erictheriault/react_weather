export default class WeatherService {
  /**
   * Fetches the current weather for the given zip code.
   *
   * @param {string} zipCode - User-generated zip code, should be 5 numeric digits.
   * @returns {promise} A promise with a "weather" object containing the keys: city, description, temperature.
   */
  fetchWeather(zipCode) {
    let zip = this.processZipCode(zipCode);
    let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let endpoint = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${apiKey}`

    return fetch(endpoint)
      .then(response => response.json())
      .then(json => this.processResponse(json));
  }

  /**
   * Ensures the zip code is 5 numeric digits, otherwise defaults to 55405.
   *
   * @param {string} zipCode - User-generated zip code, should be 5 numeric digits.
   * @returns {string} The input zip code, if properly formatted; otherwise a default of 55405.
   */
  processZipCode(zipCode) {
    let processedZipCode = `${parseInt(zipCode)}`;
    return processedZipCode.length === 5 ? processedZipCode : "55405";
  }

  /**
   * Extracts relevant weather information from the JSON response. Converts
   * temperature to Fahrenheit.
   *
   * @param {object} json - JSON response from Open Weather's API.
   * @returns {object} A "weather" object containing the keys: city, description, temperature.
   */
  processResponse(json) {
    let data = json.list[0];

    let city = json.city.name;
    let description = data.weather[0].main;
    let tempInF = Math.round(9.0 / 5 * (data.main.temp - 273) + 32);

    return {
      city: city,
      description: description,
      temperature: tempInF
    };
  };
}
