var Sequelize = require('sequelize');


var sicks = function(sequelize){
	const Sick = sequelize.define('sicks', {
	  name: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return Sick;
}

module.exports = sicks;