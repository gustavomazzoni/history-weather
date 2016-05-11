var React = require('react');

var App = React.createClass({

	render: function(){
		
		return (
			<div>
				<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
			        <div className="container">
			            <div className="navbar-header">
			                <a className="navbar-brand" href="/">History Weather</a>
			            </div>
			        </div>
			    </nav>
			</div>
		);
	}

});

module.exports = App;