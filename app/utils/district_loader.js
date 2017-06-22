//Specify compile.js --web /path/to/output/file or compile.js --mobile /path/to/output/file

var fs = require('jsonfile');


var districts = [],
	newData = [];

fs.readFile('../resources/districts.json', 'utf8', function(err, m_data){
	districts = m_data;

	m_data.forEach(function(item, i, arr){
		var data = {};
		var region_id = grabRegionId(item.d_id);
		data.region_id = region_id;
		data.name = item.NAME1__;
		data.map_id = item.ID__;
		data.d_length = item.LENGTH__;
		data.point = item.POINTS__;

		newData.push(data);
	});
	

	fs.writeFile('generated_districts.json', newData, function (err) {
		if (err)
	   		return console.log(err);

	  	console.log('Done writing ...');
	});
});

var grabRegionId = function(id){
	if(id.includes('-')){
		var reg_id = id.split('-')[0];
		if(reg_id.charAt(0) == '0'){
			return reg_id.substr(1);
		}else{
			return reg_id;
		}
	}
}