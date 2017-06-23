var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(Member){
    var registerRouter = express.Router(),
        EventEmitter = new event();


    registerRouter.route('/')
        .post(function(req, res){
            Member.create(req.body).then(member => {
                console.log(member);
                res.status(200).json(member);
            });
            //Member.


        
        });


    
    return {router: registerRouter, event: EventEmitter};
};

module.exports = routes;