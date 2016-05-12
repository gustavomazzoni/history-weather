var React = require('react');
var WeatherAPI = require('../services/WeatherAPI');

var Weather = React.createClass({

	getInitialState: function(){
		return {
			weather: null
		};
	},

	componentDidMount: function() {
		// Only componentDidMount is called when the component is first added to
		// the page. This is why we are calling the following method manually. 
		// This makes sure that our map initialization code is run the first time.
		this.componentWillReceiveProps(this.props);
	},

	// Load weather from server
	componentWillReceiveProps: function(nextProps) {
		console.log("componentWillReceiveProps");
		var self = this;
		// query param to request
		var query = {
			latitude: nextProps.latitude,
			longitude: nextProps.longitude,
			time: nextProps.time
		}

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
			return true;
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
							    <h4 className="heading">{weather.daily.temperatureMin}˚ / {weather.daily.temperatureMax}˚</h4>
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