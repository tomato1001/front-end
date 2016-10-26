import alt from '../alt'
import LocationActions from '../actions/LocationActions'

class LocationStore {
	constructor() {
		this.locations = [];
		this.errorMessage = null;
		this.bindListeners({
			handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
			handleFetchLocations: LocationActions.FETCH_LOCATIONS,
			handleLocationsFailed: LocationActions.LOCATIONS_FAILED
		});
	}

	handleUpdateLocations(locations) {
		this.locations = locations;
		this.errorMessage = null;
		// optionally return false to suppress the store change event
	}

	handleFetchLocations() {
	  // reset the array while we're fetching new locations so React can
	  // be smart and render a spinner for us since the data is empty.
	  this.locations = [];
	}

	handleLocationsFailed(errorMessage) {
	  this.errorMessage = errorMessage;
	}	
}

export default alt.createStore(LocationStore, 'LocationStore');