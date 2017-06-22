var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(Region){
    var regionsRouter = express.Router(),
        EventEmitter = new event();


    regionsRouter.route('/')
                .get(function(req, res){
                              
                  Region.findAll().then(regions => {
                    res.status(200).json(regions);
                  })

                });  

    regionsRouter.route('/:id')
                .get(function(req, res){ 
                  Region.findById(req.params.id).then(region => {
                    res.status(200).json(region);
                  });

                }); 

   
    
    
    return {router: regionsRouter, event: EventEmitter};
};

module.exports = routes;