var should = require('should'),
	expect = require('chai').expect,
	memberRoute = require('../../routes/member_router');
	

describe('Member', function(){
	describe('#/', function(done){
		memberRouter.route('/')
	    .get(function(req, res){
	        Member.findAll({where : {status : 'A'}}).then(members =>{
	            res.status(200).json(members);
	        })

	    }); 
	})
});

