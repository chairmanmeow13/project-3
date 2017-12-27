module.exports = function(sequelize,Sequelize){
	var Player = sequelize.define("player",{
		firstname:{
			type:Sequelize.STRING,
			allowNull:false
		},
		lastname:{
			type:Sequelize.STRING,
			allowNull:false
		},
		email:{
			type:Sequelize.STRING,
			unique:true
		},
		last_login:{
			type: Sequelize.DATE, defaultValue: Sequelize.NOW
		},
		accessKey:{
			type:Sequelize.STRING,
			allowNull:false
		},
		highScore:{
			///need to figure out
		}
	});

	return Player;
}