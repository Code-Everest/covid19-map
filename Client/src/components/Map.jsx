import React, { Component } from 'react';
import './Map.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "./USAMap";
import keys from "../data/keys"
import data from "../data/usa-map-dimensions";

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

var array = ["Alabama", "CA", "NY"]
var color = "Blue"



class Map extends Component {

  state = {
    States: {
      Kentucky: {
        name: "Kentucky",
        totalcases: "",
        color: "Blue"
      },
      NewKentucky: {
        name: "Kentucky",
        totalcases: "",
        color: "Blue"
      }
    }
  }


  /* mandatory */
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  }

  /* optional customization of filling per state and calling custom callbacks per state */

  statesCustomConfig = () => {
    var KY = {fill: this.state.States.Kentucky.color}

    return {
      "KY": KY,
      "NY": KY
    }
  }

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

      const CovidData = res.body.data.covid19Stats

      //STATES
      const States = "Alabama"
      this.setState({ Provinces: States })

      //TOTAL CASES
      const confirmedCases = CovidData.map((e) => e.confirmed)
      const totalCases = confirmedCases.reduce((partial_sum, a) => partial_sum + a, 0)
      this.setState({ TotalCases: totalCases })



      const State = ["Kentucky", "Alabama"]

      const filteredState = CovidData.filter(function (el) {
        return el.province === State
      });
      const confirmed = filteredState.map(e => e.confirmed)
      const totalCasesforState = confirmed.reduce((partial_sum, a) => partial_sum + a, 0)

      State.forEach(function (e) {
        const filteredState = CovidData.filter(function (el) {
          return el.province === e
        });
        const confirmed = filteredState.map(e => e.confirmed)
        const totalCasesforState = confirmed.reduce((partial_sum, a) => partial_sum + a, 0)

        const matchedStates = State.filter(function (el) {
          return el.state === e
        });
        console.log(totalCasesforState)
      })

      //console.log("Total Cases for " + State + ": " + totalCasesforState)
      // console.log(this.state)

      var myObject = this.state
      var arr = [];
      for (var key in myObject) {
        arr.push(myObject[key]);
      }

      this.setState({
        Bubble: {
          Kentucky: {
            name: "newname"
          }
        }
      })

      console.log(this.state.Bubble)

      console.log(this.state.NewKentucky)
      console.log(arr.States)

      var myObject = data
      var arr2 = [];
      for (var key in myObject) {
        arr2.push(myObject[key]);
      }

      const listarr2 = arr2.map(e => e.name)

      this.setState( {[listarr2]: {
        state:{
          "aa":"aa"
        }
      } })

      console.log(this.state)

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