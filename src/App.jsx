import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    temprature: null,
    description: null,
    loaction: null,
    latitude: 0.0,
    longitude: 0.0,
  };
  success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    this.setState({ longitude, latitude });
  };

  error() {
    console.log("error");
  }
  getWeather = () => {
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "b5a07f90a6b1a0ca6d28de2f915585f3";
    let position = navigator.geolocation.getCurrentPosition(
      this.success,
      this.error
    );
    let url =
      api +
      "?lat=" +
      this.state.latitude +
      "&lon=" +
      this.state.longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let temp = data.main.temp;
        let temprature = temp + "° F";
        let location =
          data.name +
          " (" +
          this.state.latitude +
          "°, " +
          this.state.longitude +
          "°)";
        let description = data.weather[0].main;
        this.setState({ temprature, location, description });
      });
    return (
      <div>
        <h1>{this.state.temprature}</h1>
        <h2>{this.state.location}</h2>
        <p>{this.state.description}</p>
      </div>
    );
  };
  render() {
    return <div className="App">{this.getWeather()}</div>;
  }
}

export default App;
