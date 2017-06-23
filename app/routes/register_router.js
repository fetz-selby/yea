var express = require('express'),
    event = require('events').EventEmitter;
    //dateFormat = require('dateformat');

var routes = function(Member){
    var registerRouter = express.Router(),
        EventEmitter = new event();


    registerRouter.route('/')
        .post(function(req, res){
            Member.create(req.body).then(member => {
                res.status(200).json(generateYEAID(member));
            });        
        });
    
    return {router: registerRouter, event: EventEmitter};
};

var generateYEAID = function(member){
    var arr = [];

    var dob_year = (member.dob+'').split(' ')[3].substr(2),
        created_year = (member.created_at+'').split(' ')[3].substr(2),
        district_id = member.district_id,
        id = member.id;

    if(''+district_id.length == 2){
        district_id = '0'+district_id;
    }else if(''+district_id.length == 1){
        district_id = '00'+district_id;
    }

    if(''+id.length == 1){
        id = '000'+id
    }else if(''+id.length == 2){
        id = '00'+id;
    }else if(''+id.length == 3){
        id = '0'+id;
    }

    var yea_id = ''+district_id+created_year+dob_year+id;
    arr.push({yea_id : yea_id});

    return arr;

}

module.exports = routes;