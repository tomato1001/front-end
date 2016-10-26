import React from 'react'
import LocationStore from '../stores/LocationStore'
import LocationActions from '../actions/LocationActions'

var Locations = React.createClass({

	statics: {
		getStores(props) {
			return [LocationStore];
		},

		getPropsFromStores(props) {
			return LocationStore.getState();
		}
	},

	// getInitialState : function() {
	// 	return LocationStore.getState();
	// },

	// componentDidMount : function() {
	// 	LocationStore.listen(this.onChange);
	// 	LocationActions.fetchLocations();

	// },

	// componentWillUnmount : function() {
	// 	LocationStore.unlisten(this.onChange);
	// },

	onChange : function(state) {
		this.setState(state);
	},

	render : function(){
		return (
			<ul>
				{
					this.state.locations.map((location) => {
						return (
							<li key={location.id}>{location.name}</li>
						);
					})
				}
			</ul>
		);
	}
});

export default Locations;