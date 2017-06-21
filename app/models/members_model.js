var Sequelize = require('sequelize');


var member = function(sequelize){
	const Member = sequelize.define('members', {
	  fname: {
	    type: Sequelize.STRING
	  },
	  lname: {
	    type: Sequelize.STRING
	  },
	  mname: {
	  	type: Sequelize.STRING
	  },
	  email: {
		type: Sequelize.STRING,
	    unique : true,
	    validate : {
	    	isEmail : true
	    }	
	  },
	  gender: {
		type:   Sequelize.ENUM,
    	values: ['MALE', 'FEMALE']
      },
	  dob: {
	  	type: Sequelize.DATE
	  },
	  msisdn: {
	    type: Sequelize.STRING,
	    unique : true
	  },
	  m_status: {
		type:   Sequelize.ENUM,
    	values: ['SINGLE', 'MARRIED', 'DIVORCE']	  
      },
	  is_disabled: {
	    type: Sequelize.STRING(1),
	  },
	  literacy_level: {
		type:   Sequelize.ENUM,
    	values: ['NONE', 'BASIC', 'PRIMARY', 'SECONDARY', 'TERTIARY']	  
      },
	  id_type: {
	    type: Sequelize.STRING
	  },
	  id_number: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return Member;
}

module.exports = member;