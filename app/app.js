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
    programs = require('./models/program_model')(sequelize),
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
members.belongsTo(programs);

//Init all Models
sequelize.sync({force: true}).then(function(){
    regions.bulkCreate([{name: 'Western Region',status: 'A'},
      {name : 'Central Region', status: 'A'},
      {name: 'Greater Accra Region', status: 'A'},
      {name: 'Volta Region', status: 'A'},
      {name: 'Eastern Region', status: 'A'},
      {name: 'Ashanti Region', status: 'A'},
      {name: 'Brong-Ahafo Region', status: 'A'},
      {name: 'Northern Region', status: 'A'},
      {name: 'Upper East', status: 'A'},
      {name: 'Upper West', status: 'A'}]);

    districts.bulkCreate([{"region_id":"3","name":"ADENTA","map_id":"AFRGHA003_05","d_length":167547.3715,"point":0},{"region_id":"3","name":"LEDZOKUKU / KROWOR","map_id":"AFRGHA003_06","d_length":107394.6477,"point":0},{"region_id":"8","name":"CHEREPONI","map_id":"AFRGHA008_17","d_length":858598.9975,"point":0},{"region_id":"10","name":"WA MUNICIPAL","map_id":"AFRGHA010_02","d_length":476260.2616,"point":0},{"region_id":"10","name":"JIRAPA","map_id":"AFRGHA010_06","d_length":628861.0066,"point":0},{"region_id":"10","name":"SISSALA  WEST","map_id":"AFRGHA010_07","d_length":937781.7778,"point":0},{"region_id":"10","name":"LAMBUSSIE KARNI","map_id":"AFRGHA010_08","d_length":619331.3793,"point":0},{"region_id":"9","name":"BOLGATANGA MUNICIPAL","map_id":"AFRGHA009_04","d_length":440764.6594,"point":0},{"region_id":"9","name":"BONGO","map_id":"AFRGHA009_06","d_length":348739.5858,"point":0},{"region_id":"9","name":"KASENA NANKANA WEST","map_id":"AFRGHA009_02","d_length":857251.9855,"point":0},{"region_id":"10","name":"WA WEST","map_id":"AFRGHA010_01","d_length":766695.9779,"point":0},{"region_id":"8","name":"SAWLA/TUNA/KALBA","map_id":"AFRGHA008_02","d_length":1224621.5899,"point":0},{"region_id":"10","name":"SISSALA EAST","map_id":"AFRGHA010_04","d_length":1362026.6097,"point":0},{"region_id":"9","name":"KASENA NANKANA EAST","map_id":"AFRGHA009_03","d_length":830574.2166,"point":0},{"region_id":"8","name":"BUNKPURUGU YONYO","map_id":"AFRGHA008_18","d_length":657358.8776,"point":0},{"region_id":"9","name":"GARU TEMPANE","map_id":"AFRGHA009_08","d_length":626172.0896,"point":0},{"region_id":"8","name":"MAMPRUSI EAST","map_id":"AFRGHA008_19","d_length":868705.1677,"point":0},{"region_id":"9","name":"BAWKU WEST","map_id":"AFRGHA009_07","d_length":694738.1165,"point":0},{"region_id":"7","name":"DORMAA EAST","map_id":"AFRGHA007_05","d_length":402852.2208,"point":757},{"region_id":"7","name":"BEREKUM","map_id":"AFRGHA007_10","d_length":527058.0765,"point":759},{"region_id":"7","name":"JAMAN SOUTH","map_id":"AFRGHA007_11","d_length":450903.5301,"point":751},{"region_id":"7","name":"SUNYANI WEST","map_id":"AFRGHA007_09","d_length":703998.8278,"point":752},{"region_id":"7","name":"ASUNAFO NORTH","map_id":"AFRGHA007_02","d_length":780419.5526,"point":760},{"region_id":"7","name":"NKORANZA NORTH","map_id":"AFRGHA007_17","d_length":743196.7904,"point":759},{"region_id":"7","name":"KINTAMPO SOUTH","map_id":"AFRGHA007_21","d_length":766730.9707,"point":0},{"region_id":"7","name":"TANO NORTH","map_id":"AFRGHA007_07","d_length":618418.2621,"point":2081},{"region_id":"4","name":"KETU NORTH","map_id":"AFRGHA004_04","d_length":400190.9818,"point":741},{"region_id":"4","name":"KETU SOUTH","map_id":"AFRGHA004_03","d_length":290250.5864,"point":734},{"region_id":"4","name":"KETA MUNICIPAL","map_id":"AFRGHA004_02","d_length":500029.9067,"point":735},{"region_id":"4","name":"KADJEBI","map_id":"AFRGHA004_14","d_length":495967.0158,"point":739},{"region_id":"4","name":"SOUTH TONGU","map_id":"AFRGHA004_01","d_length":567716.3845,"point":731},{"region_id":"4","name":"JASIKAN","map_id":"AFRGHA004_13","d_length":558646.4951,"point":738},{"region_id":"4","name":"KRACHI EAST","map_id":"AFRGHA004_15","d_length":1045949.8007,"point":740},{"region_id":"4","name":"NKWANTA SOUTH","map_id":"AFRGHA004_17","d_length":1118511.4674,"point":742},{"region_id":"6","name":"AFIGYA KWABRE","map_id":"AFRGHA006_19","d_length":528941.2984,"point":0},{"region_id":"6","name":"ATWIMA KWANWOMA","map_id":"AFRGHA006_13","d_length":339875.876,"point":2019},{"region_id":"6","name":"AFIGYA SEKYERE","map_id":"AFRGHA006_21","d_length":412657.2122,"point":755},{"region_id":"6","name":"SEKYERE SOUTH","map_id":"AFRGHA006_23","d_length":321558.0847,"point":744},{"region_id":"6","name":"SEKYERE CENTRAL","map_id":"AFRGHA006_25","d_length":801880.6068,"point":752},{"region_id":"6","name":"OFFINSO NORTH","map_id":"AFRGHA006_27","d_length":748458.5025,"point":742},{"region_id":"6","name":"OFFINSO MUNICIPAL","map_id":"AFRGHA006_18","d_length":485682.9222,"point":749},{"region_id":"6","name":"OBUASI MUNICIPAL","map_id":"AFRGHA006_05","d_length":250711.8528,"point":748},{"region_id":"6","name":"KUMAWU","map_id":"AFRGHA006_20","d_length":187616.038,"point":748},{"region_id":"6","name":"EJURA SEKYE DUMASE","map_id":"AFRGHA006_26","d_length":752556.4661,"point":750},{"region_id":"6","name":"ATWIMA NWABIAGYA","map_id":"AFRGHA006_15","d_length":627778.3769,"point":755},{"region_id":"6","name":"ATWIMA MPONUA","map_id":"AFRGHA006_01","d_length":1226130.9928,"point":756},{"region_id":"6","name":"ADANSI SOUTH","map_id":"AFRGHA006_04","d_length":1029095.1946,"point":753},{"region_id":"6","name":"ADANSI NORTH","map_id":"AFRGHA006_06","d_length":807329.9045,"point":747},{"region_id":"6","name":"BOSOME FREHO","map_id":"AFRGHA006_08","d_length":652620.6473,"point":753},{"region_id":"6","name":"AHAFO ANO SOUTH","map_id":"AFRGHA006_16","d_length":856045.8527,"point":0},{"region_id":"6","name":"BEKWAI MUNICIPAL","map_id":"AFRGHA006_07","d_length":523373.6424,"point":747},{"region_id":"6","name":"BOSOMTWE /ATWIMA / KWANWOMA","map_id":"AFRGHA006_12","d_length":424996.4245,"point":2020},{"region_id":"6","name":"MAMPONG MUNICIPAL","map_id":"AFRGHA006_22","d_length":548866.3607,"point":751},{"region_id":"2","name":"AJUMAKO-ENYAN-ESIAM","map_id":"AFRGHA002_05","d_length":469161.25071,"point":734},{"region_id":"2","name":"GOMOA WEST","map_id":"AFRGHA002_06","d_length":427961.51962,"point":731},{"region_id":"2","name":"AGONA WEST","map_id":"AFRGHA002_11","d_length":388661.25868,"point":728},{"region_id":"2","name":"AGONA EAST","map_id":"AFRGHA002_10","d_length":304985.82592,"point":730},{"region_id":"2","name":"ASSIN NORTH","map_id":"AFRGHA002_14","d_length":720740.61959,"point":729},{"region_id":"2","name":"ASSIN SOUTH","map_id":"AFRGHA002_13","d_length":616715.70479,"point":732},{"region_id":"2","name":"ASIKUMA / ODOBEN / BRAKWA","map_id":"AFRGHA002_12","d_length":474626.94301,"point":733},{"region_id":"2","name":"EFFUTU","map_id":"AFRGHA002_07","d_length":150930.0643,"point":0},{"region_id":"2","name":"GOMOA EAST","map_id":"AFRGHA002_08","d_length":542370.19014,"point":733},{"region_id":"2","name":"ABURA / ASEBU / KWAMANKESE","map_id":"AFRGHA002_03","d_length":491456.69038,"point":0},{"region_id":"1","name":"JOMORO","map_id":"AFRGHA001_01","d_length":901082.7613,"point":724},{"region_id":"1","name":"ELLEMBELLE","map_id":"AFRGHA001_02","d_length":677591.2098,"point":725},{"region_id":"1","name":"PRESTEA / HUNI VALLEY","map_id":"AFRGHA001_09","d_length":935312.3602,"point":716},{"region_id":"1","name":"AHANTA WEST","map_id":"AFRGHA001_04","d_length":522007.5136,"point":723},{"region_id":"1","name":"NZEMA EAST","map_id":"AFRGHA001_03","d_length":764248.9099,"point":721},{"region_id":"1","name":"TARKWA NSUAEM","map_id":"AFRGHA001_08","d_length":669710.0603,"point":725},{"region_id":"1","name":"SEFWI AKONTOMBRA","map_id":"AFRGHA001_13","d_length":737286.4729,"point":727},{"region_id":"1","name":"SEKONDI TAKORADI","map_id":"AFRGHA001_05","d_length":273624.8489,"point":0},{"region_id":"5","name":"AKYEM MANSA","map_id":"AFRGHA005_15","d_length":594529.2578,"point":707},{"region_id":"5","name":"KWAHU SOUTH","map_id":"AFRGHA005_19","d_length":562037.8269,"point":745},{"region_id":"5","name":"BIRIM MUNICIPAL","map_id":"AFRGHA005_02","d_length":591622.7242,"point":705},{"region_id":"5","name":"UPPER MANYA","map_id":"AFRGHA005_11","d_length":494401.6846,"point":711},{"region_id":"5","name":"BIRIM SOUTH","map_id":"AFRGHA005_01","d_length":587634.6961,"point":706},{"region_id":"5","name":"AKWAPEM NORTH","map_id":"AFRGHA005_06","d_length":424233.5589,"point":709},{"region_id":"5","name":"YILO KROBO","map_id":"AFRGHA005_08","d_length":676617.7411,"point":742},{"region_id":"5","name":"ATIWA","map_id":"AFRGHA005_17","d_length":834902.2285,"point":743},{"region_id":"5","name":"NEW JUABEN MUNICIPAL","map_id":"AFRGHA005_07","d_length":229546.7435,"point":710},{"region_id":"5","name":"FANTEAKWA","map_id":"AFRGHA005_12","d_length":672799.3843,"point":740},{"region_id":"5","name":"BIRIM NORTH","map_id":"AFRGHA005_16","d_length":638951.4541,"point":708},{"region_id":"5","name":"ASUOGYAMAN","map_id":"AFRGHA005_10","d_length":553063.2742,"point":746},{"region_id":"5","name":"KWAHU EAST","map_id":"AFRGHA005_20","d_length":570861.5413,"point":747},{"region_id":"5","name":"KWAHU WEST","map_id":"AFRGHA005_18","d_length":490373.5336,"point":748},{"region_id":"1","name":"SEFWI BIBIANI-ANHWIASO BEKWAI","map_id":"AFRGHA001_15","d_length":621975.3132,"point":728},{"region_id":"2","name":"UPPER DENKYIRA EAST","map_id":"AFRGHA002_16","d_length":573622.64587,"point":735},{"region_id":"6","name":"AMANSIE CENTRAL","map_id":"AFRGHA006_03","d_length":813647.1008,"point":752},{"region_id":"6","name":"AMANSIE WEST","map_id":"AFRGHA006_02","d_length":968218.1019,"point":745},{"region_id":"2","name":"UPPER DENKYIRA WEST","map_id":"AFRGHA002_17","d_length":624757.52236,"point":0},{"region_id":"2","name":"CAPE COAST METRO","map_id":"AFRGHA002_02","d_length":278237.08328,"point":729},{"region_id":"2","name":"KOMENDA EDNA EGUAFO / ABIREM","map_id":"AFRGHA002_01","d_length":350408.22491,"point":0},{"region_id":"1","name":"SEFWI-WIAWSO","map_id":"AFRGHA001_14","d_length":749433.8383,"point":725},{"region_id":"7","name":"ASUNAFO SOUTH","map_id":"AFRGHA007_01","d_length":918178.7291,"point":764},{"region_id":"7","name":"NKORANZA SOUTH","map_id":"AFRGHA007_16","d_length":553002.0544,"point":760},{"region_id":"8","name":"BOLE","map_id":"AFRGHA008_01","d_length":1699846.5025,"point":0},{"region_id":"5","name":"LOWER MANYA","map_id":"AFRGHA005_09","d_length":421886.3503,"point":745},{"region_id":"7","name":"KINTAMPO NORTH","map_id":"AFRGHA007_22","d_length":1281869.8612,"point":763},{"region_id":"7","name":"ATEBUBU AMANTIN","map_id":"AFRGHA007_18","d_length":1052952.0596,"point":753},{"region_id":"8","name":"KPANDAI","map_id":"AFRGHA008_06","d_length":776910.8945,"point":0},{"region_id":"4","name":"NKWANTA NORTH","map_id":"AFRGHA004_18","d_length":702001.7464,"point":740},{"region_id":"4","name":"BIAKOYE","map_id":"AFRGHA004_12","d_length":803037.8239,"point":736},{"region_id":"8","name":"GONJA CENTRAL","map_id":"AFRGHA008_04","d_length":2160474.9903,"point":0},{"region_id":"7","name":"PRU","map_id":"AFRGHA007_20","d_length":1375389.5963,"point":754},{"region_id":"8","name":"SAVELUGU NANTON","map_id":"AFRGHA008_13","d_length":1236993.6479,"point":0},{"region_id":"8","name":"KARAGA","map_id":"AFRGHA008_14","d_length":1480853.4897,"point":0},{"region_id":"8","name":"EAST GONJA","map_id":"AFRGHA008_05","d_length":3013927.5788,"point":0},{"region_id":"4","name":"SOUTH DAYI","map_id":"AFRGHA004_09","d_length":384952.0293,"point":737},{"region_id":"10","name":"WA EAST","map_id":"AFRGHA010_03","d_length":1248115.3388,"point":0},{"region_id":"8","name":"SABOBA","map_id":"AFRGHA008_16","d_length":917180.1712,"point":0},{"region_id":"8","name":"GUSHIEGU","map_id":"AFRGHA008_15","d_length":1394513.8908,"point":0},{"region_id":"8","name":"NANUMBA NORTH","map_id":"AFRGHA008_08","d_length":1519517.1527,"point":0},{"region_id":"8","name":"NANUMBA SOUTH","map_id":"AFRGHA008_07","d_length":1252333.5346,"point":0},{"region_id":"7","name":"WENCHI","map_id":"AFRGHA007_14","d_length":826669.6452,"point":0},{"region_id":"7","name":"TANO SOUTH","map_id":"AFRGHA007_06","d_length":453696.6745,"point":0},{"region_id":"7","name":"SUNYANI MUNICIPAL","map_id":"AFRGHA007_08","d_length":532236.5364,"point":758},{"region_id":"6","name":"ASANTE AKIM SOUTH","map_id":"AFRGHA006_09","d_length":808706.0018,"point":0},{"region_id":"3","name":"ADA EAST","map_id":"AFRGHA003_10","d_length":366906.4166,"point":738},{"region_id":"3","name":"SHAI OSU DOKU","map_id":"AFRGHA003_09","d_length":501880.5664,"point":0},{"region_id":"3","name":"ADA WEST","map_id":"AFRGHA003_16","d_length":313190.0613,"point":0},{"region_id":"3","name":"NINGO PRAMPRAM","map_id":"AFRGHA003_15","d_length":443493.5427,"point":0},{"region_id":"3","name":"LA DADE KOTOPON","map_id":"AFRGHA003_12","d_length":87811.8536,"point":0},{"region_id":"1","name":"AOWIN","map_id":"AFRGHA001_12","d_length":1177858.2913,"point":727},{"region_id":"1","name":"SUAMAN","map_id":"AFRGHA001_20","d_length":334168.0128,"point":727},{"region_id":"1","name":"BIA EAST","map_id":"AFRGHA001_22","d_length":529629.2575,"point":0},{"region_id":"1","name":"BIA WEST","map_id":"AFRGHA001_17","d_length":711247.0624,"point":0},{"region_id":"1","name":"BODI","map_id":"AFRGHA001_21","d_length":566689.2815,"point":0},{"region_id":"1","name":"JUABESO","map_id":"AFRGHA001_16","d_length":813385.4876,"point":0},{"region_id":"1","name":"SHAMA","map_id":"AFRGHA001_06","d_length":261698.9021,"point":0},{"region_id":"1","name":"WASSA EAST","map_id":"AFRGHA001_07","d_length":784093.7485,"point":0},{"region_id":"1","name":"MPOHOR","map_id":"AFRGHA001_18","d_length":477704.1747,"point":0},{"region_id":"1","name":"WASSA AMENFI WEST","map_id":"AFRGHA001_11","d_length":1101160.0282,"point":0},{"region_id":"1","name":"WASSA AMENFI CENTRAL","map_id":"AFRGHA001_19","d_length":1078048.5274,"point":0},{"region_id":"2","name":"MFANTSIMAN","map_id":"AFRGHA002_04","d_length":420282.0252,"point":732},{"region_id":"2","name":"EKUMFI","map_id":"AFRGHA002_19","d_length":278338.12802,"point":732},{"region_id":"2","name":"TWIFO LOWER DENKYIRA","map_id":"AFRGHA002_18","d_length":567668.21563,"point":0},{"region_id":"2","name":"TWIFO ATI-MORKWA","map_id":"AFRGHA002_15","d_length":619626.52276,"point":0},{"region_id":"2","name":"EWUTU SENYA WEST","map_id":"AFRGHA002_09","d_length":351876.58022,"point":0},{"region_id":"2","name":"AWUTU SENYA EAST MUNICIPAL","map_id":"AFRGHA002_20","d_length":227767.14846,"point":0},{"region_id":"3","name":"LA NKWANTANANG MADINA","map_id":"AFRGHA003_13","d_length":176730.885,"point":713},{"region_id":"3","name":"GA EAST","map_id":"AFRGHA003_03","d_length":193934.9599,"point":713},{"region_id":"3","name":"ACCRA METROPOLIS","map_id":"AFRGHA003_04","d_length":221937.4617,"point":0},{"region_id":"3","name":"GA SOUTH","map_id":"AFRGHA003_01","d_length":424418.1179,"point":715},{"region_id":"3","name":"GA WEST","map_id":"AFRGHA003_02","d_length":432263.4099,"point":0},{"region_id":"3","name":"GA CENTRAL MUNICIPAL","map_id":"AFRGHA003_11","d_length":138907.9968,"point":715},{"region_id":"4","name":"KRACHI WEST","map_id":"AFRGHA004_16","d_length":475112.4501,"point":737},{"region_id":"4","name":"KRACHI NCHUMURU","map_id":"AFRGHA004_25","d_length":670734.7736,"point":737},{"region_id":"4","name":"AGOTIME ZIOPE","map_id":"AFRGHA004_07","d_length":396621.5054,"point":0},{"region_id":"4","name":"ADAKLU","map_id":"AFRGHA004_21","d_length":492220.2761,"point":0},{"region_id":"4","name":"AKATSI SOUTH","map_id":"AFRGHA004_05","d_length":553805.9468,"point":0},{"region_id":"4","name":"AKATSI NORTH","map_id":"AFRGHA004_20","d_length":367578.6904,"point":0},{"region_id":"4","name":"HO MUNICIPAL","map_id":"AFRGHA004_08","d_length":563988.5061,"point":0},{"region_id":"4","name":"HOHOE MUNICIPAL","map_id":"AFRGHA004_11","d_length":535422.9597,"point":0},{"region_id":"4","name":"HO WEST","map_id":"AFRGHA004_22","d_length":931900.0809,"point":0},{"region_id":"4","name":"AFADZATO SOUTH","map_id":"AFRGHA004_23","d_length":628431.8998,"point":0},{"region_id":"10","name":"NORTH DAYI","map_id":"AFRGHA004_24","d_length":426002.3715,"point":0},{"region_id":"4","name":"KPANDO MUNICIPAL","map_id":"AFRGHA004_10","d_length":280254.6773,"point":0},{"region_id":"4","name":"NORTH TONGU","map_id":"AFRGHA004_19","d_length":664649.5644,"point":0},{"region_id":"4","name":"CENTRAL TONGU","map_id":"AFRGHA004_06","d_length":593720.9168,"point":0},{"region_id":"5","name":"NSAWAM ADOAGYIRI","map_id":"AFRGHA005_05","d_length":215992.4132,"point":712},{"region_id":"5","name":"AKWAPEM SOUTH","map_id":"AFRGHA005_23","d_length":321343.0401,"point":712},{"region_id":"5","name":"DENKYEMBOUR","map_id":"AFRGHA005_25","d_length":496029.2899,"point":0},{"region_id":"5","name":"KWAEBIBIREM","map_id":"AFRGHA005_14","d_length":584961.7997,"point":0},{"region_id":"5","name":"KWAHU AFRAM PLAINS SOUTH","map_id":"AFRGHA005_26","d_length":1177425.4865,"point":0},{"region_id":"5","name":"KWAHU AFRAM PLAINS NORTH","map_id":"AFRGHA005_21","d_length":843074.1712,"point":0},{"region_id":"5","name":"SUHUM MUNICIPAL","map_id":"AFRGHA005_04","d_length":404985.3752,"point":0},{"region_id":"5","name":"AYENSUANO","map_id":"AFRGHA005_24","d_length":524386.6428,"point":0},{"region_id":"5","name":"EAST AKIM","map_id":"AFRGHA005_13","d_length":433680.5697,"point":0},{"region_id":"5","name":"UPPER WEST AKIM","map_id":"AFRGHA005_22","d_length":355152.1279,"point":0},{"region_id":"5","name":"WEST AKIM","map_id":"AFRGHA005_03","d_length":454798.1747,"point":0},{"region_id":"7","name":"DORMAA MUNICIPAL","map_id":"AFRGHA007_04","d_length":649145.95,"point":0},{"region_id":"7","name":"DORMAA WEST","map_id":"AFRGHA007_24","d_length":410471.3552,"point":0},{"region_id":"10","name":"NADOWLI-KALEO","map_id":"AFRGHA010_05","d_length":626867.4936,"point":0},{"region_id":"10","name":"DAFFIAMA BUSSIE","map_id":"AFRGHA010_10","d_length":760985.822,"point":0},{"region_id":"10","name":"LAWRA","map_id":"AFRGHA010_09","d_length":536514.3476,"point":0},{"region_id":"10","name":"NANDOM","map_id":"AFRGHA010_11","d_length":388444.5233,"point":0},{"region_id":"9","name":"TALENSI","map_id":"AFRGHA009_05","d_length":731579.2345,"point":0},{"region_id":"9","name":"NABDAM","map_id":"AFRGHA009_11","d_length":301712.2283,"point":0},{"region_id":"9","name":"BUILSA SOUTH","map_id":"AFRGHA009_10","d_length":871318.4095,"point":0},{"region_id":"9","name":"BUILSA NORTH","map_id":"AFRGHA009_01","d_length":627247.4399,"point":0},{"region_id":"9","name":"BINDURI","map_id":"AFRGHA009_12","d_length":366738.0222,"point":0},{"region_id":"9","name":"PUSIGA","map_id":"AFRGHA009_13","d_length":327673.4709,"point":0},{"region_id":"9","name":"BAWKU MUNICIPAL","map_id":"AFRGHA009_09","d_length":363775.9859,"point":0},{"region_id":"8","name":"NORTH GONJA","map_id":"AFRGHA008_21","d_length":1579441.8221,"point":0},{"region_id":"8","name":"WEST GONJA","map_id":"AFRGHA008_03","d_length":1467678.0054,"point":0},{"region_id":"8","name":"MION","map_id":"AFRGHA008_24","d_length":1465042.8237,"point":0},{"region_id":"8","name":"YENDI MUNICIPAL","map_id":"AFRGHA008_10","d_length":902292.9296,"point":0},{"region_id":"8","name":"TOLON","map_id":"AFRGHA008_12","d_length":836677.2767,"point":0},{"region_id":"8","name":"KUMBUMGU","map_id":"AFRGHA008_22","d_length":1030322.4773,"point":0},{"region_id":"8","name":"WEST MAMPRUSI","map_id":"AFRGHA008_20","d_length":1269609.5209,"point":0},{"region_id":"8","name":"MAMPRUGU MOAGDURI","map_id":"AFRGHA008_26","d_length":996672.4483,"point":0},{"region_id":"8","name":"ZABZUGU","map_id":"AFRGHA008_09","d_length":901640.4322,"point":0},{"region_id":"8","name":"TATALE","map_id":"AFRGHA008_25","d_length":1120456.6097,"point":0},{"region_id":"7","name":"SENE EAST","map_id":"AFRGHA007_27","d_length":1221073.5395,"point":0},{"region_id":"7","name":"SENE WEST","map_id":"AFRGHA007_19","d_length":1089807.5902,"point":0},{"region_id":"7","name":"ASUTIFI NORTH","map_id":"AFRGHA007_03","d_length":600046.5715,"point":0},{"region_id":"6","name":"AHAFO ANO NORTH","map_id":"AFRGHA006_17","d_length":565591.9207,"point":0},{"region_id":"7","name":"ASUTIFI SOUTH","map_id":"AFRGHA007_23","d_length":806770.6009,"point":0},{"region_id":"7","name":"TECHIMAN MUNICIPAL","map_id":"AFRGHA007_15","d_length":434364.2515,"point":0},{"region_id":"7","name":"TECHIMAN NORTH","map_id":"AFRGHA007_25","d_length":364113.7212,"point":0},{"region_id":"7","name":"BANDA","map_id":"AFRGHA007_26","d_length":998751.0556,"point":0},{"region_id":"7","name":"JAMAN NORTH","map_id":"AFRGHA007_12","d_length":560839.0364,"point":0},{"region_id":"7","name":"TAIN","map_id":"AFRGHA007_13","d_length":797838.3924,"point":0},{"region_id":"6","name":"SEKYERE AFRAM PLAINS","map_id":"AFRGHA006_24","d_length":525106.9646,"point":750},{"region_id":"6","name":"SEKYERE AFRAM PLAINS NORTH","map_id":"AFRGHA006_30","d_length":1631703.8871,"point":750},{"region_id":"6","name":"ASANTE AKIM NORTH","map_id":"AFRGHA006_29","d_length":844691.9062,"point":746},{"region_id":"6","name":"ASANTE AKIM CENTRAL MUNICIPAL","map_id":"AFRGHA006_10","d_length":410894.7761,"point":746},{"region_id":"6","name":"ASOKORE MAMPONG MUNICIPAL","map_id":"AFRGHA006_28","d_length":89307.0962,"point":0},{"region_id":"6","name":"KMA","map_id":"AFRGHA006_14","d_length":353547.6677,"point":0},{"region_id":"6","name":"EJISU JUABEN","map_id":"AFRGHA006_11","d_length":641115.7459,"point":746},{"region_id":"1","name":"WASSA AMENFI EAST","map_id":"AFRGHA001_10","d_length":870188.2039,"point":722},{"region_id":"3","name":"TEMA METROPOLIS","map_id":"AFRGHA003_08","d_length":163822.9606,"point":0},{"region_id":"3","name":"ASHAIMAN","map_id":"AFRGHA003_07","d_length":62786.1667,"point":0},{"region_id":"3","name":"KPONE KATAMANSO","map_id":"AFRGHA003_14","d_length":347540.1011,"point":0},{"region_id":"8","name":"TAMALE NORTH SUB METRO","map_id":"AFRGHA008_11","d_length":558423.329,"point":0},{"region_id":"8","name":"SAGNERIGU","map_id":"AFRGHA008_23","d_length":264026.3991,"point":0}]);
    programs.bulkCreate([{name : 'Community Protection Officer', alias : 'CPO', status : 'A'},{name : 'Community Education Teaching Assistant', alias : 'CETA', status : 'A'},{name : 'Community Health Worker', alias : 'CHWs', status : 'A'},{name : 'e-Health Assistant', alias : 'eHA', status : 'A'},{name : 'Environment Health Officer (Special Group)', alias : 'EHO', status : 'A'},{name : 'Environment Protection Officer', alias : 'EPO', status : 'A'},{name : 'Marine Engineering Technicians', alias : 'RMU', status : 'A'},{name : 'Youth In Aquaculture (Ho Special)', alias : 'YIAC', status : 'A'},{name : 'Youth In APP Development', alias : 'YIAD', status : 'A'},{name : 'Youth In Coastal Sanitation Module', alias : 'YCSM', status : 'A'},{name : 'Youth In Arabic Education', alias : 'YIAE', status : 'A'},{name : 'Youth In Agric Extension', alias : 'YIAEM', status : 'A'},{name : 'NVTI - Youth In Aluminium Fabrication', alias : 'YIAF', status : 'A'},{name : 'NVTI - Youth In Building and Masonry', alias : 'YIBM', status : 'A'},{name : 'NVTI - Youth In Cookery', alias : 'YIC', status : 'A'},{name : 'NVTI - Youth In Computer Hardware', alias : 'YICH', status : 'A'},{name : 'NVTI - Youth In Dress Making', alias : 'YIDM', status : 'A'},{name : 'NVTI - Youth In Floral & Balloon Decoration', alias : 'YIFBD', status : 'A'},{name : 'Youth In Fire Service', alias : 'YIFS', status : 'A'},{name : 'NVTI - Youth In General Electricals', alias : 'YIGE', status : 'A'},{name : 'Youth In Greening Ghana', alias : 'YIGGM', status : 'A'},{name : 'Youth In Garments Making(Accra Special)', alias : 'YIGM', status : 'A'},{name : 'Youth In Graduate Nurses', alias : 'YIGN', status : 'A'},{name : 'NVTI - Youth In Hair Dressing', alias : 'YIHD', status : 'A'},{name : 'Youth In Industrial Support', alias : 'YIIS', status : 'A'},{name : 'NVTI - Youth In Plumbing', alias : 'YIPL', status : 'A'},{name : 'Youth In Prison Service', alias : 'YIPS', status : 'A'},{name : 'NVTI - Youth In Tiling', alias : 'YIT', status : 'A'},{name : 'Youth In Afforestation', alias : 'YUAM', status : 'A'},{name : 'Youth In Paid Internship', alias : 'YUPIM', status : 'A'}]);
    members.bulkCreate([{fname : 'gibrish', lname : 'gibr', email : 'abc@y.com', ezwich : '54345433454', id_number : '2322434343434'}]);
    console.log('Models created successfully !!!');
}).catch(function(error){
    console.log(error);
});


//Instantiating all routes
var usersRoute = require('./routes/users_router')(users),
    membersRoute = require('./routes/members_router')(members),
    regionsRoute = require('./routes/regions_router')(regions),
    districtsRoute = require('./routes/districts_router')(districts),
    programsRoute = require('./routes/programs_router')(programs),
    registerRoute = require('./routes/register_router')(members),
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
app.use('/eghana/yea/api/districts', districtsRoute.router);
app.use('/eghana/yea/api/programs', programsRoute.router);
app.use('/eghana/yea/api/members', membersRoute.router);
app.use('/eghana/yea/api/users', usersRoute.router);
app.use('/eghana/yea/api/register', registerRoute.router);


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