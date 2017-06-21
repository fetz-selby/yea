var Sequelize = require('sequelize');


var regions = function(sequelize){
	const Regions = sequelize.define('regions', {
	  name: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return Regions;
}

module.exports = regions;