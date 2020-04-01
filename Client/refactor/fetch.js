var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");

//change country here
req.query({
	"country": "Canada"
});

req.headers({
	"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	//key here
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});