var express = require("express");
var app = express();
var flash = require("connect-flash");

var passport = require("passport");

var session = require("express-session");
var bodyParser = require("body-parser");

var models = require("./models");
app.use(express.static("Public"));

var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
	secret:"oneringtorulethemall",
	resave:true,
	saveUninitialized:true
}));
app.use(passport.initialize());//initialize passport
app.use(passport.session());

var port = process.env.PORT || 8080;

app.listen(port,function(err){
	if(!err){
		console.log("site is live");
	} else {console.log(err);}
})

models.sequelize.sync().then(function(){
	console.log("success");
}).catch(function(err){
	console.log(err,"failure");
})

app.engine("handlebars", 
	exphbs({ 
		defaultLayout: "main",
		partialsDir:[__dirname+"/views/partials"]
	 }));//make the main.handlebars be the layout template
app.set("view engine","handlebars");//set the express view engine as handlebars

//authentication, credentials and session instantiation
require("./config/passport/passport.js")(passport,models.user,models.player,models.admin);

