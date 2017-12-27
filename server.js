var express = require("express");
var app = express();
var passport = require("passport");
var bodyParser = require("body-parser");
var session = require("express-session");
var exphbs = require("express-handlebars");

var models = require("./models");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
	secret:"oneringtorulethemall",
	resave:true,
	saveUninitialized:true
}));
app.use(passport.initialize());//initialize passport
app.use(passport.session());

var port = process.env.PORT || 5000;

app.listen(port,function(err){
	if(!err){
		console.log("success");
	} else {console.log(err);}
})

models.sequelize.sync().then(function(){
	console.log("yay");
}).catch(function(err){
	console.log(err,"no");
})

app.engine("handlebars", 
	exphbs({ 
		defaultLayout: "main",
		partialsDir:[__dirname+"/views/partials"]
	 }));//make the main.handlebars be the layout template
app.set("view engine","handlebars");//set the express view engine as handlebars

//authentication, credentials and session instantiation
require("./config/passport/passport.js")(passport,models.user,models.player,models.admin);

//routes
require("./routes/auth.js")(app,
							passport,
							models.user,
							models.player,
							models.admin);
require("./routes/admin.js")(app,
							models.player,
							models.admin);
require("./routes/player.js")(app,
								models.player);