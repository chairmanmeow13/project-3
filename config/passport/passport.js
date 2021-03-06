var bCrypt = require("bcrypt-nodejs");//secures passwords
module.exports = function(passport,user,player,admin){
	var User = user;
	var Player = player;
	var Admin = admin;
	var LocalStrategy = require("passport-local").Strategy;//initialization of passport local strategy
	
	passport.serializeUser((user,done)=>{//serialize user
		console.log(user);
		done(null,user.id);
	});

	passport.deserializeUser((id,done)=>{//deserialize user
		User.findById(id).then(function(user){//promise to return user by searching by id
			
			if (user){//if user is found with this id, then this will evaluate to true
				done(null,user.get());//sequelize getter function to return the user from the database
			} else {
				done(user.errors,null);//else return errors
			}
		
		});
	});

	passport.use("local-signup", new LocalStrategy(
	{//assign passed data from req to passport local strategy username and password
		usernameField: "username",
		passwordField: "password",
		passReqToCallback:true//allows us to pass back the entire request to the callback
	},

	function(req,username,password,done){//callback function
		console.log(req.body);
		var generateHash = function(password){
			return bCrypt.hashSync(password,bCrypt.genSaltSync(8),null);
		}
		User.findOne({//search for user where email is already registered or username is already taken
			where:{username:{$eq:username}}
		}).then(function(user){//do stuff with result of search
			if(user){//if user is returned, this means that there is a user with this email
				return done(null,false);
			} else {
				var userPassword = generateHash(password);
				var userType=req.body.userType;
				if(userType=="Player"){
					var bcryptAccessKey = generateHash(req.body.playerID);
				} else {
					var bcryptAccessKey="is admin";
				}
				
				var dataforUserTable = {
					email:email,
					password:userPassword,
					userType:userType,
					firstname:req.body.firstname,
					lastname:req.body.lastname,
					username:req.body.username,
					playerID:bcryptplayerID
				};

				var dataforAccountTable = userType=="Player"? {//set data for student account
					firstname:req.body.firstname,
					lastname:req.body.lastname,
					email:req.body.email,
					username:req.body.username,
					playerID:bcryptplayerID
				}:{//set data for admin account
					firstname:req.body.firstname,
					lastname:req.body.lastname,
					email:req.body.email
				};				
				User.create(dataforUserTable).then(function(newUser,created){

					if(!newUser){
						return done(null,false);
					} else {
						if(userType=="Player"){
							Player.create(dataforAccountTable).then(function(newPlayer){
								if(!newPlayer){
									return done(null,false);
								} else {
									return done(null,newUser);
								}
							}).catch((error)=>{
								return done(null,false);
							})
						} else {
							Admin.create(dataforAccountTable).then(function(newAdmin){
								if(!newAdmin){
									return done(null,false);
								} else {
									return done(null,newUser);
								}
							}).catch((error)=>{
								return done(null,false);
							})
						}
					}

				}).catch((error)=>{
					return done(null,false);
				})

			}
		})
	}))
	
	passport.use("local-signin", new LocalStrategy(
	{//assign passed data from req to passport local strategy username and password
		usernameField: "username",
		passwordField: "password",
		passReqToCallback:true//allows us to passback the entire request to the callback
	},

	function(req,username,password,done){//callback function


		var isValidPassword = function(userpass,password){//function that will make sure that the entered password is the correct password for the user
			return bCrypt.compareSync(password,userpass);
			//passes password through same encrypting method and determines if provided password is the same as that in the database
			//returns true if they are the same and false if they are different
		}

		User.findOne({//search for user where username is already registered
			where:{username:username}
		}).then(function(user){//do stuff with result of search
			var messages = [];
			if(!user){//if no user is returned, then user is not registered with site yet
				messages.push("Username does not exist in the system");
				return done(null,false);
			}
				
			if(!isValidPassword(user.password,password)){//if password is incorrect
				messages.push("Password does not match");
				return done(null,false);
			}
			//if neither of the above conditions result in a returned break in the block, then this means that the user provided a valid email with a valid password
			//so update the user's last log in and get the user from the database and sign the user in

			var userinfo = user.get();
			return done(null,userinfo);//sets req.user with userinfo

		}).catch(function(err){
			console.log("Error: " + err);
			return done(null,false);
		});
	}))

}


