var React = require('react');
var WeatherList = require('./WeatherList');

var App = React.createClass({

	getInitialState: function() {
		return {
			errorMessage: null,
			location: null,
			lastDays: []
		};
	},

	getCurrentLocation: function(successCallback, errorCallback) {
		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	    } else {
	        errorCallback(new Error("Geolocation is not supported by this browser."));
	    }
	},

	getLastDays: function(date, numberOfDays) {
		var lastDays = [];
		var d = new Date(date.getTime());

		while (numberOfDays > 0) {
			d = this.getDateBefore(d);
			var timeInSeconds = this.convertTimeToSeconds(d.getTime());
			// add the date as time in seconds to the list of last days
			lastDays.push(timeInSeconds);
			numberOfDays--;
		}
		return lastDays;
	},

	// Get the date before the one passed as argument
	getDateBefore: function(date) {
		var onlyDate = new Date().toLocaleDateString();
		var d = new Date(onlyDate);
 		
 		// Subtract 1 day from the date
		date -= 1000 * 60 * 60 * 24 * 1;
		// create a new Date object, using the adjusted time
		d = new Date(date);
 		return d;
	},

	// For Forescast.io API, the TIME should be a UNIX time
	convertTimeToSeconds: function(time) {
		return Math.round(time/1000);
	},

	// Replace comma in the float to dot so Forescast.io API will accept
	replaceCommaToDot: function(float) {
		var f = float.toString().replace(",",".");
		// return a number
		return Number(f);
	},

	onSearch: function() {
		// get latitude and longitude from the search
		// this.state.location;

		// add each day of the last 30 days to the list
		// together with latitude and longitude 
		// this.state.weatherList.push();
	},

	// Get last 30 days and the user current location
	componentDidMount: function() {
		var onlyDate = new Date().toLocaleDateString();
		var currentDate = new Date(onlyDate);
		var lastDays = this.getLastDays(currentDate, 30);
		this.setState({lastDays: lastDays});

		var self = this;
		this.getCurrentLocation(function(position) {
			var location = {
				latitude: self.replaceCommaToDot(position.coords.latitude),
				longitude: self.replaceCommaToDot(position.coords.longitude),
				city: "Current Location"
			}

			self.setState({location: location});
		}, function(error) {
			console.log(error);
			self.setState({errorMessage: error.message})
		});
	},

	// Set to inital state
	componentWillUnmount: function() {
		this.setState(this.getInitialState());
	},

	render: function() {
		var weatherList = null;

		// Show WeatherList component only when location is available
		if (this.state.location) {
			weatherList = <WeatherList lastDays={this.state.lastDays} location={this.state.location}/>
		} else if (this.state.errorMessage) {
			weatherList = <h2>{this.state.errorMessage}</h2>
		}

		return (
			<div>
				<header className="main-header">
			        <div className="container">
			            <h1>History Weather</h1>
			            <p>See how was the weather in the past 30 days.</p>
			        </div>
			    </header>

				{weatherList}
			</div>
		);
	}

});

module.exports = App;