import { useEffect, useState } from 'react'
import keys from '../data/keys'


// The hook is just a simple function which we can export
export const Test = () => {

var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");

req.query({
	"country": "USA"
});

req.headers({
	"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	"x-rapidapi-key": keys.key
});


const [topics, setTopics] = useState([])



  useEffect(() => {

    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        //this will make each state unique, instead of showing same states repeatedly"
        const States = new Set(res.body.data.covid19Stats.map(e => e.province))
        setTopics(States)
    })

/*
    fetch('http://localhost:5002/MainTopics')
      .then(res => res.json())
      .then(json => {
       
        if (json) {
          setTopics(json)
        } else {
          setTopics([])
        }
      })
      */
  }, [])
  return { topics}
}