//jshint esversion:6

const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){

const query = req.body.w1;
const apiKey = "50a798e591778cec26a10ccb12b2e9ec";
const units = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
https.get(url,function(response){
response.on("data", function(data){
   const watherData = JSON.parse(data);
   const temp = watherData.main.temp;
   const watherDescripton = watherData.weather[0].description;
   const icon = watherData.weather[0].icon;
   const imagesUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

   res.write("<h1>The weather is currently " + watherDescripton + "</h1>");
   res.write("<p>The tempurature in Dhaka is " + temp + "</p>");
   res.write("<img src =" + imagesUrl + ">");
   res.send();
});
});

});

app.listen(3000, function(){
    console.log ("This server is running on 3000.");
});