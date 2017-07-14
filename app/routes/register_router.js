var express = require('express'),
    event = require('events').EventEmitter;
    dateFormat = require('dateformat');

var routes = function(Member){
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
                  console.log(result.count);
                  console.log(result.rows);
                  req.body.district_count = result.rows;

                  var member = Object.assign({}, req.body, {'districts_count': result.count});
                  console.log(JSON.stringify(member));
                  member = generateYEAID(member);

                  Member.create(member).then(m => {
                    res.status(200).json(member);
                  })
                });


            // Member.create(req.body).then(member => {

            //     var yea_obj = generateYEAID(member);
            //     console.log('YEA id ::: '+yea_obj[0].yea_id);
            //     Member.update({yea_id : yea_obj[0].yea_id}, {where : {
            //         id : member.id
            //     }}).then(()=>{
            //         res.status(200).json(yea_obj);
            //     });
            // });        

        });
    
    return {router: registerRouter, event: EventEmitter};
};

var generateYEAID = function(member){
    //var arr = [];

    console.log('YEAR ::: '+dateFormat(new Date(), "yy"));

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