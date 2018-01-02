module.exports = function(sequelize,Sequelize){
	var gameScores = sequelize.define("gameScores",{
		user_id:{
			type:Sequelize.INTEGER,
			allowNull:false
		},
		score:{
			type:Sequelize.INTEGER,
			allowNull:false
		}
	});
	
	return gameScores;
}