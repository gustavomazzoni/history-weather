var React = require('react');
var Weather = require('./Weather');

var WeatherList = React.createClass({

	render: function(){
		var self = this;

		var weathers = this.props.lastDays.map(function(time) {
			return <Weather key={time} time={time} latitude={self.props.location.latitude} longitude={self.props.location.longitude} />
		});
		

		return (
			<section id="history-weather">
				<div className="container">
					<div className="row">
						<div>
							<h2 className="page-header">{this.props.location.city}</h2>
						</div>
						{weathers}
					</div>
				</div>
			</section>
		)
	}

});

module.exports = WeatherList;