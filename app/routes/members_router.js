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