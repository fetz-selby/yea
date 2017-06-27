var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(Member){
    var memberRouter = express.Router(),
        EventEmitter = new event();


    memberRouter.route('/')
    .get(function(req, res){
        Member.findAll().then(members =>{
            res.status(200).json(members);
        })

    });  

    memberRouter.route('/email/:email')
    .get(function(req, res){
        var email = req.params.email;

        Member.findOne({ where : {email: email} }).then(member =>{
            res.status(200).json(member);
        })

    });  

    memberRouter.route('/msisdn/:msisdn')
    .get(function(req, res){
        var msisdn = req.params.msisdn;

        Member.findOne({ where : {msisdn : msisdn}  }).then(member =>{
            res.status(200).json(member);
        })

    });  

    memberRouter.route('/idn/:idn')
    .get(function(req, res){
        var idn = req.params.idn;

        Member.findOne({ where : {id_number : idn}  }).then(member =>{
            res.status(200).json(member);
        })

    }); 

    memberRouter.route('/ezwich/:ezwich')
    .get(function(req, res){
        var ezwich = req.params.ezwich;

        Member.findOne({ where : {ezwich : ezwich}  }).then(member =>{
            res.status(200).json(member);
        })

    }); 


    memberRouter.route('/')
                .post(function(req, res){
                    
                    

                });


    memberRouter.route('/shortlist')
                .post(function(req, res){
                
                    

                });
    memberRouter.route('/engaged')
                .post(function(req, res){
                
                    

                });


    
    return {router: memberRouter, event: EventEmitter};
};

module.exports = routes;