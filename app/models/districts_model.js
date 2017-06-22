var Sequelize = require('sequelize');


var districts = function(sequelize){
	const District = sequelize.define('districts', {
	  name: {
	    type: Sequelize.STRING
	  },
	  map_id: {
	    type: Sequelize.STRING
	  },
	  d_length: {
	    type: Sequelize.DOUBLE
	  },
	  point: {
	    type: Sequelize.DOUBLE
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return District;
}

module.exports = districts;