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
	  town: {
	  	type: Sequelize.STRING
	  },
	  personal_district_id: {
	  	type : Sequelize.INTEGER
	  },
	  personal_region_id: {
	  	type : Sequelize.INTEGER
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
	  },
	  m_status: {
		type:   Sequelize.ENUM,
    	values: ['SINGLE', 'MARRIED', 'DIVORCED']	  
      },
	  is_disabled: {
		type:   Sequelize.ENUM,
    	values: ['YES', 'NO']
      },
	  literacy_level: {
		type:   Sequelize.ENUM,
    	values: ['NONE', 'BECE', 'SSCE/WASSCE', 'TECHNICAL', 'VOCATIONAL', 'DIPLOMA', 'HND', 'BACHELOR DEGREE', 'MASTERS', 'OTHER']	  
      },
	  id_type: {
	    type: Sequelize.STRING
	  },
	  id_number: {
	    type: Sequelize.STRING
	  },
	  yea_id: {
	    type: Sequelize.STRING
	  },
	  ezwich: {
	    type: Sequelize.STRING
	  },
	  status: {
	    type: Sequelize.STRING(1)
	  }
	}, {underscored: true});

	return Member;
}

module.exports = member;