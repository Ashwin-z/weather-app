const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser")
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "ae780e7eebb43499b71b6a4cb88d59ca";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<p>The Wether is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " Degree Celcius.</h1>");
      res.send()
    })
  })
})


app.listen("https://ashwin-z.github.io/weather-app/", function() {
  console.log("Server is running on port 3000.")
})
