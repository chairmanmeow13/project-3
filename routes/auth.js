module.exports = function(app,passport,User,Player,Admin){
	
	app.get("/",function(req,res){//get signup page
		res.render("signup",{homePage:true});
	});

	app.get("/login",function(req,res){//get log in page
		res.render("login",{homePage:true});
	});

	app.get("/home", isLoggedIn,function(req,res){
		if(req.user.userType=="Player"){
			Player.findOne({where:{username:req.user.username}}).then(function(userData){
				var userData = userData.dataValues;
				userData.player = true;
				userData.homePage = true;
				res.render("home_student",userData);//req.user will exist if the current user is logged in
			});
		} else {
			Player.findAll({where:{adminConn:req.user.username}}).then(function(players){		
				var playerDisplayInfo = players.map(function(adminPlayers,indx){
					console.log(adminPlayers);
					return {
						id:indx,
						firstname:adminPlayers.dataValues.firstname,
						lastname:adminPlayers.dataValues.lastname,
						username: adminPlayers.dataValues.username
					}
				});
			});
		}	
	});

	app.get("/logout",function(req,res){
		req.session.destroy(function(err){
			res.redirect("/");
		})
	})

	app.get("/signuperror",function(req,res){
		res.render("signup",{message:"authentication failed",hasErrors:true});
	})

	app.post("/login",passport.authenticate("local-signin",{
		successRedirect: "/home",
		failureRedirect: "/signuperror"
	}));

	app.post("/signup",passport.authenticate("local-signup",{//use local strategy signup
		successRedirect: "/home",
		failureRedirect: "/signuperror"
	}));

	function isLoggedIn(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.redirect("/login");
	}

}

