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
		playerID:{
			type:Sequelize.STRING,
			allowNull:false
		},
		username: {
			type:Sequelize.VIRTUAL(Sequelize.STRING,["username"]),
			allowNull: false,
			validate:{
				isLength: [1]
			}
		}	
	});
	return User;
};