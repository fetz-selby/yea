var Sequelize = require('sequelize');


var districts = function(sequelize){
	const District = sequelize.define('districts', {
	  name: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return District;
}

module.exports = districts;