var express = require('express'),
    event = require('events').EventEmitter;
    
var routes = function(User){
    var usersRouter = express.Router(),
        EventEmitter = new event();

    usersRouter.route('/')
        .get(function(req, res){  
            User.findAll().then(users => {
                res.status(200).json(users);
            })
        });   

    usersRouter.route('/:id')
        .get(function(req, res){
            User.findById(req.param.id).then(user => {
                res.status(200).json(user);
            })
        }); 

    usersRouter.route('/email/:email')
        .get(function(req, res){
           User.findOne({ where : {email : req.param.email}}).then(user => {
            res.status(200).json(user);
           })
        }); 

    usersRouter.route('/:id')
        .delete(function(req, res){
            
        })
    return {router: usersRouter, event: EventEmitter};
};

module.exports = routes;