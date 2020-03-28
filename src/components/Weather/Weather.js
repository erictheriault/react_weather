import React from 'react';
import './Weather.css';

export default class Weather extends React.Component {
  render() {
    let weather = this.props.weather;

    if (weather) {
      return (
        <div className="Weather">
          <h3>Weather for {weather.city}</h3>
          <p>Conditions: {weather.description}</p>
          <p>Temp (F): {weather.temperature}</p>
        </div>
      );
    }

    return null;
  }
}
