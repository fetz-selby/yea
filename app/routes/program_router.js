var express = require('express'),
    event = require('events').EventEmitter;
    
var routes = function(Program){
    var programRouter = express.Router(),
        EventEmitter = new event();

    programRouter.route('/')
        .get(function(req, res){  
            Program.findAll().then(programs =>{
                res.status(200).json(programs);
            })
        });   

    programRouter.route('/:id')
        .get(function(req, res){  
            Program.findById(req.param.id).then(program => {
                res.status(200).json(program);
            })
        }); 

    programRouter.route('/')
        .post(function(req, res){
            
        }); 
    
    programRouter.route('/:id')
        .delete(function(req, res){
            
        })
        
    return {router: programRouter, event: EventEmitter};
};

module.exports = routes;