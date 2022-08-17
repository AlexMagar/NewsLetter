//jshint esversion: 6
// require modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

// new instance of express
const app = express();

//to load static files
app.use(express.static("public"));

// "/"=> home route
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

//setup server to listen in certain port
app.listen(3000, function(){
    console.log("Server is running in port 3000");
});