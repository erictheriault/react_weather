import React from 'react';
import Weather from '../Weather/Weather.js'
import WeatherService from '../../services/WeatherService.js'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zipCode: '',
      weather: null
    };

    this.onZipChanged = this.onZipChanged.bind(this);
    this.onZipSubmitted = this.onZipSubmitted.bind(this);

    this.weatherService = new WeatherService();
  }

  onZipChanged(event) {
    var newState = Object.assign({}, this.state, {
      zipCode: event.target.value
    });

    this.setState(newState);
  }

  onZipSubmitted(event) {
    this.weatherService
      .fetchWeather(this.state.zipCode)
      .then(weather => { this.setState({ weather: weather }) })
      .catch(console.error);

    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onZipSubmitted}>
          <input
            type="text"
            value={this.state.zipCode}
            onChange={this.onZipChanged}
          />
          <input type="submit" value="Get Weather" />
        </form>
        <Weather weather={this.state.weather} />
      </div>
    );
  }
}
