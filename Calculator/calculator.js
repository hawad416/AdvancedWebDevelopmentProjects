// practice using node js with express.js npm package 

const express = require("express");

//alows you to go into any of your routes and tap into request.body
//and that is the parsed version of your http request
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})); //write everytime you use body parser


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator", function(req, res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var n = (weight)/ (height * height);

    var result = "Your BMI is " + n ;
    res.send(result);
})

app.post("/", function(req, res){
   var num1 = Number(req.body.num1);
   var num2 = Number(req.body.num2);

   var result = num1 + num2 ;

    res.send("The result of the calculation is " + result);
})

app.listen(3000, function(){
    console.log("server running on 3000");
});
