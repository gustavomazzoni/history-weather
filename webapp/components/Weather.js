var React = require('react');
var WeatherAPI = require('../services/WeatherAPI');

var Weather = React.createClass({

	getInitialState: function(){
		return {
			weather: null
		};
	},

	// Load weather from server
	componentDidMount: function() {
		var self = this;
		// query param to request
		var query = {
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			time: this.props.time
		}

		// [{
		// 	"time":1367722800,
		// 	"summary":"Partly cloudy starting in the afternoon, continuing until evening.",
		// 	"icon":"partly-cloudy-night","sunriseTime":1367745203,"sunsetTime":1367785588,
		// 	"moonPhase":0.86,"precipType":"rain","temperatureMin":67.16,"temperatureMinTime":1367737200,
		// 	"temperatureMax":85.92,"temperatureMaxTime":1367769600,"apparentTemperatureMin":67.16,
		// 	"apparentTemperatureMinTime":1367737200,"apparentTemperatureMax":87.3,"apparentTemperatureMaxTime":1367769600,
		// 	"dewPoint":64.74,"humidity":0.72,"windSpeed":0.58,"windBearing":337,"visibility":5.55,"cloudCover":0.15
		// }]

		// get the weather
		WeatherAPI.getWeather(query, function(result) {
			var weather = {
				latitude: result.latitude,
				longitude: result.longitude,
				daily: result.daily.data[0]
			}
			weather.daily.icon = self.parseWeatherIcon(weather.daily.icon);
			weather.daily.date = self.convertTimeInSecondsToDate(weather.daily.time);
			self.setState({
				weather: weather
			});
		}, function(err) {
			console.log(err);
		});
	},

	// Convert UNIX time from Forescast.io API
	convertTimeInSecondsToDate: function(time) {
		return new Date(time*1000);
	},

	/* Icon fonts from
 	* http://www.alessioatzeni.com/meteocons/ */
	parseWeatherIcon: function(icon) {
		var response = "";
		
		switch(icon) {
			case "clear-day":
				response = "B";
				break;
			case "clear-night":
				response = "C";
				break;
			case "rain":
				response = "R";
				break;
			case "snow":
				response = "W";
				break;
			case "sleet":
				response = "X";
				break;
			case "wind":
				response = "F";
				break;
			case "fog":
				response = "L";
				break;
			case "cloudy":
				response = "Y";
				break;
			case "partly-cloudy-day":
				response = "H";
				break;
			case "partly-cloudy-night":
				response = "I";
				break;
			default:
				response = "B";
				break;
		}
		return response;
	},

  	// Set to inital state
	componentWillUnmount: function() {
		this.setState(this.getInitialState());
	},

	render: function(){
		var weather = this.state.weather;

		// Show WeatherList component only when location is available
		if (weather) {

			return (
				<div className="col-md-3 col-sm-4">
	                <div className="dev-panel panel panel-default text-center">
	                    <div className="panel-heading">
	                    	<span className="icon" data-icon={weather.daily.icon}/>
	                    	<div className="header text-left">
							    <h4 className="heading">{weather.daily.temperatureMin}</h4>
							    <p>{weather.daily.summary}</p>
							</div>
	                    </div>
	                    <div className="panel-body">
	                    	<div>
	                    		<strong className="date">{weather.daily.date.toLocaleDateString()}</strong>
	                    	</div>
	                    	<div className="status">
							</div>
	                    </div>
	                </div>
	            </div>
			)
		}

		return (
			<div className="col-md-3 col-sm-4">
                <div className="dev-panel panel panel-default text-center">
                    <div className="panel-heading">
                    </div>
                    <div className="dev-content panel-body">
                    </div>
                </div>
            </div>
		)

	}

});

module.exports = Weather;