import keys from "./keys"


var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");

req.query({
	"country": "USA"
});

req.headers({
	"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	"x-rapidapi-key": keys.key
});

export default
	{

		getAllStates () {
			req.end(function (res) {
				if (res.error) throw new Error(res.error);

				//this will make each state unique, instead of showing same states repeatedly"
				const States = new Set(res.body.data.covid19Stats.map(e => e.province))
				console.log(...States)
			})
		},

		getTotalCases() {
			req.end(function (res) {
				if (res.error) throw new Error(res.error);

				const confirmedCases = res.body.data.covid19Stats.map((e) => e.confirmed)
				
				const totalCases = confirmedCases.reduce((partial_sum, a) => partial_sum + a, 0)
				
				console.log("Total Cases: " + totalCases)
			})
			
		},

		getOneStateCase(State) {
			req.end(function (res) {
				if (res.error) throw new Error(res.error);
				
				const Data = res.body.data.covid19Stats

				const filteredState = Data.filter(function (el) {
					return el.province === State
				  });
				const confirmed = filteredState.map(e => e.confirmed)
				const totalCasesforState = confirmed.reduce((partial_sum, a) => partial_sum + a, 0)

				console.log("Total Cases for " + State + ": " + totalCasesforState)
				
			})
		}

		


	}


