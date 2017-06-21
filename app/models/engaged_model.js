var Sequelize = require('sequelize');


var engages = function(sequelize){
	const Engages = sequelize.define('engages', {
	  e_id: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return Engages;
}

module.exports = engages;