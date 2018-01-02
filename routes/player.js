module.exports = function(app,players){

		console.log(layout);
		players.update(layout,{where:{username:req.user.username}}).then(function(userData){
			res.end();
		});

}