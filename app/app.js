var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    session = require('express-session'),
    port = process.env.PORT || 8001,
    logger = require('morgan'),
    expressValidator = require('express-validator'),
    sequelize = require('./config').config,
    app = express();

var pool = {};

//Models
var districts = require('./models/districts_model')(sequelize),
    program = require('./models/program_model')(sequelize),
    members = require('./models/members_model')(sequelize),
    users = require('./models/users_model')(sequelize),
    shortlist = require('./models/shortlists_model')(sequelize),
    engages = require('./models/engaged_model')(sequelize),
    regions = require('./models/regions_model')(sequelize);


//Set Relationships
districts.belongsTo(regions);

users.belongsTo(regions);
users.belongsTo(districts);

shortlist.belongsTo(members);

engages.belongsTo(members);

members.belongsTo(districts);
members.belongsTo(program);

//Init all Models
sequelize.sync().then(function(){
     return regions.bulkCreate([{name: 'Western Region',status: 'A'},
      {name : 'Central Region', status: 'A'},
      {name: 'Greater Accra Region', status: 'A'},
      {name: 'Volta Region', status: 'A'},
      {name: 'Eastern Region', status: 'A'},
      {name: 'Ashanti Region', status: 'A'},
      {name: 'Brong-Ahafo Region', status: 'A'},
      {name: 'Northern Region', status: 'A'},
      {name: 'Upper East', status: 'A'},
      {name: 'Upper West', status: 'A'}]);
    console.log('Models created successfully !!!');
}).catch(function(error){
    console.log(error);
});


//Instantiating all routes
var usersRoute = require('./routes/users_router')(users),
    membersRoute = require('./routes/members_router')(members),
    regionsRoute = require('./routes/regions_router')(regions),
    authRoute = require('./routes/auth_router')(pool);

//Set middlewares
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(expressValidator([]));
app.use(session({resave:true, saveUninitialized: true, 
                secret: 'thequickbrownfoxjumpedoverthelazydogs',
                cookieName: 'session',
                duration: 30*60*1000, 
                activeDuration: 5*60*1000, 
                httpOnly: true, 
                cookie: {secure: false }}));

//CORS enabling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//logging
app.use(logger('dev'));

app.use(express.static('public'));


//Disable cache
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.get('/', function(req, res){
    res.redirect('./index.html');
    //res.location('/index.html');
});

app.use('/eghana/yea/api/regions', regionsRoute.router);
app.use('/eghana/yea/api/members', membersRoute.router);
app.use('/eghana/yea/api/users', usersRoute.router);

app.get('/eghana', function(req, res){
    res.redirect('./index.html');
});

app.get('/eghana/yea', function(req, res){
    res.status(200).send('Please check API documentation');
});

app.get('/eghana/yea/api', function(req, res){
    res.status(200).send('Please check API documentation');
});

app.listen(port, function(){
    console.log('Running on PORT '+port);

    //Init all events
    initAllEvents();
});

process.on("unhandledRejection", function(reason, p){
    console.log("Unhandled", p); // log all your errors, "unsuppressing" them.
//    throw(reason);
}); 

var initAllEvents = function(){
    
}

module.exports = app;