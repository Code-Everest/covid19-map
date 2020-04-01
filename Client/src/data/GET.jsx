import keys from "./keys"
export default function GET () {

var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");

req.query({
	"country": "USA"
});

req.headers({
	"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	"x-rapidapi-key": keys.key
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
})

}