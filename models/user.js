module.exports = function(sequelize,Sequelize){
	var User = sequelize.define("user",{
		email:{
			type:Sequelize.STRING,
			allowNull:false,
			unique:true,
			validate:{
				isEmail:true
			}
		},
		password:{
			type:Sequelize.STRING,
			allowNull:false
		},		
		userType:{
			type:Sequelize.STRING,
			allowNull:true
		},
		firstname:{
			type:Sequelize.VIRTUAL(Sequelize.STRING,["firstname"]),
			allowNull:false,
			validate:{
				isLength: [1]
			}
		},
		lastname:{
			type:Sequelize.VIRTUAL(Sequelize.STRING,["lastname"]),
			allowNull:false,
			validate:{
				isLength: [1]
			}
		},
		accessKey:{
			type:Sequelize.VIRTUAL(Sequelize.TEXT,["accessKey"]),
			allowNull:false			
		},
		highScore:{
			///not exactly sure what to do here, but this is where the user's high score should be
			}
		},		
	});
	return User;
};