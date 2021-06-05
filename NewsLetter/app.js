// newsletter being hosted on heroku. using mailchimp api to host email contacts on there when people sign up for newsletter.
//app on heroku: https://sleepy-castle-29453.herokuapp.com/
const express = require("express");
const request = require("request");
const bodyParsor = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParsor.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const emailName = req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(emailName);

    var data = {

        members: [
            {
                email_address: emailName,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);
    const url = 'https://us6.api.mailchimp.com/3.0/lists/793c1c36d2';

    const options = {
        method: "POST",
        auth: "hawad:1c17fbed75b9f624b5fc39c7433c01d5-us6"

    }
    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "\failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

  
})

app.post("/failure", function(req, res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
    console.log("Server running onport 3000");
})

