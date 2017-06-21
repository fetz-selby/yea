var Sequelize = require('sequelize'),
	bcrypt   = require('bcrypt-nodejs');

var user = function(sequelize){
	const User = sequelize.define('users', {
	  fname: {
	    type: Sequelize.STRING
	  },
	  lname: {
	    type: Sequelize.STRING
	  },
	  msisdn: {
	    type: Sequelize.STRING,
	    unique : true
	  },
	  level: {
	    type: Sequelize.STRING(1)
	  },
	  email: {
	    type: Sequelize.STRING,
	    unique : true,
	    validate : {
	    	isEmail : true
	    }
	  },
	  password : {
	   	type : Sequelize.STRING,
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	},
	  {
	  	hooks : {
	  		afterValidate : function(admin){
	  			admin.password = bcrypt.hashSync(admin.password, 8);
	  		}
	  	},underscored: true
	  });

	return User;
}

module.exports = user;