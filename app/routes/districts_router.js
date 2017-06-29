var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(District){
    var districtsRouter = express.Router(),
        EventEmitter = new event();

    districtsRouter.route('/')
                .get(function(req, res){
                              
                  District.findAll({where : {status : 'A'}}).then(districts => {
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
                  District.findAll({ where :{region_id : req.params.id}, order:[['name', 'ASC']]}).then(districts => {
                    var data = [];
                    districts.forEach(function(item, i, arr){
                      item.name = capitalize(item.name)
                    });
                    res.status(200).json(districts);
                  });

                }); 
    
    
    return {router: districtsRouter, event: EventEmitter};
};

var capitalize = function(words){
  var word_token = words.split(' ');

  if(word_token){
    var sentence = '';
    word_token.forEach(function(item, i, arr){
      sentence += item.charAt(0).toUpperCase()+item.substr(1).toLowerCase()+' ';
    });

    return sentence.trim();
  }else{
    return words.charAt(0).toUpperCase()+words.substr(1).toLowerCase();
  }


}

module.exports = routes;