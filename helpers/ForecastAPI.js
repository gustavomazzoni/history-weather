var https = require("https");
var redis = require("redis");

// create a new redis client and connect to our local redis instance
var client = redis.createClient();
var CACHE_EXPIRY = 21600; // expire in 6 hours or 21600 seconds

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("[Redis] Error: " + err);
});


var ForecastAPI = (function() {
    "use strict";

    var fabric = {};

    // The Dark Sky Forecast API url
    // https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE,TIME
    var baseUri = "https://api.forecast.io/forecast/"+process.env.FORECAST_API_KEY+"/";

    // public function to make Forecast API call
    fabric.forecast = function(query, successCallback, errorCallback) {
        // check if params are valid
        if (!(query.latitude && query.longitude && isNumeric(query.latitude) && isNumeric(query.longitude))) {
            var err = new Error("Must inform valid latitude and longitude.");
            err.status = 400;

            // if not valid call error callback function
            errorCallback(err);
            return;
        }

        // set URL Params: LATITUDE,LONGITUDE,TIME
        var urlParams = query.latitude;
        urlParams += "," + query.longitude;
        if (query.time) urlParams += "," + query.time;

        // use the redis client to get the forecast info associated 
        // to the query params from our redis cache
        client.get(urlParams, function(error, result) {
            // if we have a result cached for these query params
            if (result) {
                // parse stringified JSON result
                result = JSON.parse(result)
                // return it to our client
                // call success callback function
                successCallback(result);
            } else {
                // otherwise, make the request call to Forecast API to get the result

                // create the https GET request call
                var request = https.get(baseUri + urlParams, function (response) {
                    // data is streamed in chunks from the server
                    // so we have to handle the "data" event    
                    var buffer = "", 
                        result;

                    response.on("data", function (chunk) {
                        buffer += chunk;
                    }); 

                    // finished transferring data
                    response.on("end", function (err) {
                        console.log("onEnd");

                        // dump the raw data
                        try {
                            result = JSON.parse(buffer);

                            // store the key-value pair (urlParams:result) in our cache
                            // with an expiry defined by CACHE_EXPIRY constant.
                            client.setex(urlParams, CACHE_EXPIRY, JSON.stringify(result));

                            // call success callback function with the result
                            successCallback(result);
                        } catch(err) {
                            // catch any error with JSON parsing the result
                            console.log(err);
                            console.log('Problem with result. Problably an error in the params: '+urlParams);
                            
                            err = new Error('Problem with the result. Problably an error in the url params: '+urlParams);
                            err.status = 400;
                            
                            // call error callback function
                            errorCallback(err);
                        }
                    }); 
                });
                // if an error occurs
                request.on('error', function(e) {
                    console.log('Problem with request: '+e.message);
                    // call error callback function
                    errorCallback(e);
                });
            }
        });
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return fabric;
})();

module.exports = ForecastAPI;
