var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(Sick){
    var sickRouter = express.Router(),
        EventEmitter = new event();


    sickRouter.route('/')
                .get(function(req, res){
                              
                  Sick.findAll().then(sicks => {
                    res.status(200).json(sicks);
                  })

                });  

    sickRouter.route('/:id')
                .get(function(req, res){ 
                  Sick.findById(req.params.id).then(sick => {
                    res.status(200).json(sick);
                  });

                }); 

   
    
    
    return {router: sickRouter, event: EventEmitter};
};

module.exports = routes;