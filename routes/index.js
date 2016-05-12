var express = require('express');
var router = express.Router();
var ForecastAPI = require('../libs/ForecastAPI');

/*  "/api/v1/weather/:latitude,:longitude,:time"
 *    GET: 
 */
router.get("/:latitude,:longitude,:time", function(req, res, next) {

	// call Forecast API to fetch information about forecast
	ForecastAPI.forecast(req.params, function(response) {
		res.json(response);
	}, function(err) {
		return next(err);
	});

});

module.exports = router;
