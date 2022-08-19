//jshint esversion: 6
// require modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

// new instance of express
const app = express();

//to load static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// "/"=> home route
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

//post request, get the text from input filed 
app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName, lastName);

    //data object js
    var data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    //convert js object into json format string
    //this is going to send to mailchimp
    const jsonData = JSON.stringify(data);

    //make request
    const url = "https://us11.api.mailchimp.com/3.0/lists/4383cf6681";
    const options = {
        method: "POST",
        auth: "Lxman07:844b85ab9af63258b700f27e522c83c8-us11"
    }

    //make request
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});


//for failure.html
app.post("/failure", function(req, res){
    res.redirect("/");
});

//setup server to listen in certain port
app.listen(3000, function(){
    console.log("Server is running in port 3000");
});



//API key
// 844b85ab9af63258b700f27e522c83c8-us11
//audience id / list id => 4383cf6681