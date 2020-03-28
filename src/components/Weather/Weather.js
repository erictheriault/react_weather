import React from 'react';

export default class Weather extends React.Component {
  render() {
    let weather = this.props.weather;

    if (weather) {
      return (
        <div className="Weather">
          <h2>Weather for {weather.city}</h2>
          <p>Conditions: {weather.description}</p>
          <p>Temp (F): {weather.temperature}</p>
        </div>
      );
    }

    return <p>Enter your zip code</p>;
  }
}
