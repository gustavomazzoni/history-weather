var http = require('http');

var path = "/api/v1/weather/";

// check if params are valid
function isValid(options) {
    if (!(options.latitude && options.longitude && options.time &&
        isNumeric(options.latitude) && isNumeric(options.longitude))) {
        return false;
    }
    return true;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function toUrlParam(options) {
	return options.latitude + "," + options.longitude + "," + options.time;
}

module.exports = {

  	// Load weather data from server
	getWeather: function(query, successCallback, errorCallback) {
		// check if params are valid
        if (!isValid(query)) {
            var err = new Error("Must inform valid latitude, longitude and time.");
            err.status = 400;

            // if not valid call error callback function
            errorCallback(err);
            return;
        }

		// add weather properties as a param to the request
		var params = toUrlParam(query);
		
		http.get(path + params, function(resp) {
			// data is streamed in chunks from the server
            // so we have to handle the "data" event    
            var buffer = "";

            resp.on("data", function(chunk) {
                buffer += chunk;
            }); 

            // finished transferring data
            resp.on("end", function() {
            	var result = JSON.parse(buffer);
            	// if response status is 200, is ok.
            	if (resp.statusCode === 200) {
            		// call success callback function with the result
					successCallback(result);
            	} else {
            		console.log("Error with the response: " + result.message);
					// call error callback function
		            errorCallback(result);
            	}				
		  	});

		}).on("error", function(e){
			console.log("Error with the request: " + e.message);
			// call error callback function
            errorCallback(e);
		});
	}

};