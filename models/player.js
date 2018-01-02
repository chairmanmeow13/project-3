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
		username:{
			type:Sequelize.STRING,
			allowNull: false, 
			unique:true
		},
		playerID:{
			type:Sequelize.STRING,
			allowNull:false
		},
		last_login:{
			type: Sequelize.DATE, defaultValue: Sequelize.NOW
		},
		status:{
			type:Sequelize.ENUM("active","inactive"),
			defaultValue:"active"
		}
	});

	return Player;
}