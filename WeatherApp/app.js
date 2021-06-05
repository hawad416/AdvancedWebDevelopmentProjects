//Weathe Application using the open weather API, practicing parsing data from it using JSON, GET, HTTPS and POST requests.
// tells the user the wheather in a city they search, and return that city, the temperature, and an icon image representing the temperature.

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app =express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    var cityName = req.body.cityName;


    const query = cityName;
   // const apikey = ; //commented out bc i dont want ppl using my api key.
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apikey;
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp;
        const description = weatherdata.weather[0].description;

        const icon = weatherdata.weather[0].icon;
        const imageURL = " http://openweathermap.org/img/wn/" + icon +"@2x.png";

        res.write("<p>The weather is currently " +  description);

        res.write("<h1>The temperature in " +  cityName + " is " + temp + " degrees</h1>");
        res.write("<img src =" + imageURL + ">");
            res.send();
    
        })
    });
   
})



app.listen(3000, function(){
    console.log("server is running on port 3000");
});
