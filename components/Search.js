var React = require('react');
var GMapsHelper = require('../libs/GMapsHelper');

var Search = React.createClass({

	getInitialState: function() {
		var value = "Current Location";
		return {
			value: value
		}
	},

	// Load GMaps autocomplete input
	componentDidMount: function() {
		// Call Google Maps Place API
		// to get geolocation from search
		GMapsHelper.initAutocomplete(
			this.props.onSearch, 
			function(error) {
				console.log(error);
			}
		);
	},

	// Update the value of input text
	componentWillReceiveProps: function(nextProps) {
		if (nextProps.location) {
			this.setState({value: nextProps.location.name});
		}
	},

	handleChange: function() {
		this.setState({value: event.target.value});
	},

	render: function() {
		return (
			<div className="form-group">
				<div className="col-xs-12 col-md-6 col-md-offset-3">
					<div className="input-group">
						<input type="text" className="address form-control" id="gmaps_autocomplete" placeholder="Enter the location..." 
							value={this.state.value} onChange={this.handleChange}/>
						<span className="input-group-btn">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
						</span>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Search;