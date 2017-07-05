var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(Region){
    var utilsRouter = express.Router(),
        EventEmitter = new event();


    utilsRouter.route('/today')
                .get(function(req, res){    
                    console.log(new Date());
                    res.status(200).json(dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
                });  
   
    
    
    return {router: utilsRouter, event: EventEmitter};
};

module.exports = routes;