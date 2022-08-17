//jshint esversion: 6
// require modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

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
    var firstname = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log()
});

//setup server to listen in certain port
app.listen(3000, function(){
    console.log("Server is running in port 3000");
});