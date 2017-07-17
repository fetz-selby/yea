var express = require('express'),
    event = require('events').EventEmitter;
    dateFormat = require('dateformat');

var routes = function(Member, Region, District, Program){
    var registerRouter = express.Router(),
        EventEmitter = new event();

    registerRouter.route('/')
        .post(function(req, res){
            req.body.status = 'A';

            Member.findAndCountAll({
                   where: {
                      district_id:req.body.district_id
                   }
                })
                .then(result => {
                  req.body.district_count = result.rows;

                  var member = Object.assign({}, req.body, {'districts_count': result.count});
                  member = generateYEAID(member);

                  Member.create(member).then(m => {
                    res.status(200).json(member);
                  })
                });      
        });

 registerRouter.route('/:id')
        .get(function(req, res){
            var yea_id = req.params.id;


            Member.findOne({ where : {yea_id : yea_id},  include: [District, Program, Region] }).then(member =>{
               

               if(member){
                    var new_member = {}

                    new_member.id = member.id;
                    new_member.fname = member.fname;
                    new_member.lname = member.lname;
                    new_member.mname = member.mname;
                    new_member.town = member.town;
                    new_member.personal_district_id = member.personal_district_id;
                    new_member.personal_region_id = member.region_id;
                    new_member.gender = member.gender;
                    new_member.dob = member.dob;
                    new_member.msisdn = member.msisdn;
                    new_member.residence_address = member.residence_address;
                    new_member.postal_address = member.postal_address;
                    new_member.skill = member.skill;
                    new_member.m_status = member.m_status;
                    new_member.is_disabled = member.is_disabled;
                    new_member.qualification = member.qualification;
                    new_member.id_type = member.id_type;
                    new_member.id_number = member.id_number;
                    new_member.yea_id = member.yea_id;
                    new_member.ezwich = member.ezwich;
                    new_member.status = member.status;
                    new_member.created_at = member.created_at;
                    new_member.district_id = member.district_id;
                    new_member.program_id = member.program_id;
                    new_member.region_id = member.region_id;
                    new_member.sick_id = member.sick_id;
                    new_member.district = {};
                    new_member.district.name = member.district.name;
                    new_member.program = {};
                    new_member.program.name = member.program.name;
                    new_member.region = {};
                    new_member.region.name = member.region.name;

                    new_member.created = dateFormat(new Date(member.created_at), "dddd, mmmm dS, yyyy");
                    new_member.b_date = dateFormat(new Date(member.dob), "dddd, mmmm dS, yyyy");

                    res.status(200).json(new_member);
                }else{
                    res.status(200).json(member);
                }

            });       
        });
    
    return {router: registerRouter, event: EventEmitter};
};

var generateYEAID = function(member){
    
    var dob_year = (member.dob+'').split('-')[0].substr(2),
        created_year = dateFormat(new Date(), "yy"),
        district_id = member.district_id,
        id = member.districts_count+1;

    if(''+district_id.length == 2){
        district_id = '0'+district_id;
    }else if(''+district_id.length == 1){
        district_id = '00'+district_id;
    }


    if((''+id).length == 1){
        id = '000'+id
    }else if((''+id).length == 2){
        id = '00'+id;
    }else if((''+id).length == 3){
        id = '0'+id;
    }

    var yea_id = 'Y'+district_id+created_year+dob_year+id;
    member.yea_id  =  yea_id;
    //arr.push({yea_id : yea_id});

    return member;

}

module.exports = routes;