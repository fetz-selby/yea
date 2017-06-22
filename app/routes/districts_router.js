var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(District){
    var districtsRouter = express.Router(),
        EventEmitter = new event();

    districtsRouter.route('/')
                .get(function(req, res){
                              
                  District.findAll().then(districts => {
                    res.status(200).json(districts);
                  })

                });  

    districtsRouter.route('/:id')
                .get(function(req, res){ 
                  District.findById(req.params.id).then(district => {
                    res.status(200).json(district);
                  });

                }); 

    districtsRouter.route('/region/:id')
                .get(function(req, res){ 
                  District.findAll({ where :{region_id : req.params.id}}).then(districts => {
                    res.status(200).json(districts);
                  });

                }); 
    
    
    return {router: districtsRouter, event: EventEmitter};
};

module.exports = routes;