import React, { Component } from 'react';
import './Map.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "./USAMap";
import keys from "../data/keys"

//import GET from "../data/GET";

var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");

req.query({
  "country": "USA"
});

req.headers({
  "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
  "x-rapidapi-key": keys.key
});


class Map extends Component {

  state = {
    Provinces: "Alabama",
    TotalCases: '',

  };

  /* mandatory */
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  /* optional customization of filling per state and calling custom callbacks per state */
  statesCustomConfig = () => {
    var Provinces = this.state.Provinces
    return {
      [Provinces]: {
        fill: "navy",
        // clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
      }
    };
  };

  calculatePercentage = (num1, num2) => {
    return console.log(num1 * 100 / num2)
  }

  returnMap = () => {
    return (
      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
      </div>
    )
  }


  componentDidMount() {

    req.end(res => {
      if (res.error) throw new Error(res.error);

      //STATES
      const States = new Set(res.body.data.covid19Stats.map(e => e.province))
      this.setState({ Provinces: States })

      //TOTAL CASES
      const confirmedCases = res.body.data.covid19Stats.map((e) => e.confirmed)
      const totalCases = confirmedCases.reduce((partial_sum, a) => partial_sum + a, 0)
      this.setState({ TotalCases: totalCases })



      console.log("Total Cases: " + this.state.TotalCases)
      console.log(...this.state.Provinces)
    }
    )

    this.returnMap()


  }


  render() {
    return (
      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
      </div>
    )


  }
}

export default Map;