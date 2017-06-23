var Sequelize = require('sequelize');

var program = function(sequelize){
	const Program = sequelize.define('programs', {
	  name: {
	    type: Sequelize.STRING
	  },
	  alias: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1),
	  }
	});

	return Program;
}

module.exports = program;