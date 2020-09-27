var geocoder = require('geocoder');

var Geo = module.exports = function(){
	return this;
}

Geo.prototype = {
	getGps : function(address, addresscomplement, postalcode, city, country, cb){

		var addressFull = address+' '+addresscomplement+', '+postalcode+' '+city+', '+country;

		geocoder.geocode(addressFull, function ( err, data ) {
			if(err || data.status != 'OK' || data.results.length != 1){
				cb(false);
			}else{
				var resultType = data.results[0].geometry.location_type;
				if(resultType == "ROOFTOP" || resultType == "RANGE_INTERPOLATED" || resultType == "GEOMETRIC_CENTER" || resultType == "APPROXIMATE"){
					var loc = data.results[0].geometry.location
					cb({lat:loc.lat,lon:loc.lng});
				}else{
					cb(false);
				}
			}
		});
	},
}

