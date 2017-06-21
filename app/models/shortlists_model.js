var Sequelize = require('sequelize');


var shortlist = function(sequelize){
	const Shortlist = sequelize.define('shortlists', {
	  s_id: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return Shortlist;
}

module.exports = shortlist;