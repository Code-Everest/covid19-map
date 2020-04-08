import React, { Component } from 'react';
import './Map.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";

import GET from "../data/GET";




class Map extends Component {

  state = {
    TotalCases: ""
  }


  /* mandatory */
  mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  /* optional customization of filling per state and calling custom callbacks per state */
  statesCustomConfig = () => {
    return {
      "NJ": {
        fill: "navy",
        clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
      },
      "NY": {
        fill: "#CC0000"
      }
    };
  };

  calculatePercentage = (num1, num2) => {
    return console.log(num1 * 100 / num2)
  }



  componentDidMount() {
    GET.getTotalCases()
    GET.getAllStates()
    GET.getOneStateCase("Alabama")
  }


  render() {

    return (

      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
      </div>

    );
  }
}

export default Map;