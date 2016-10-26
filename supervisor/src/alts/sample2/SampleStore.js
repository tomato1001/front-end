import alt from '../alt';
import SampleActions from './SampleActions';

class SampleStore {

	constructor() {
		// Initialize data after store has been bootstrapped
		// bugs? is not called
		// 
		// this.on('bootstrap', () => {
		// 	console.log(this);
		//  	this.samples = [
		//  		{id : 1, text : 'text-1'},
		//  		{id : 2, text : 'text-2'}
		//  	];
		// });

		this.bindActions(SampleActions);
		this.samples = [];

		this.on('init', () => {
		 	this.samples = [
		 		{id : 1, text : 'text-1'},
		 		{id : 2, text : 'text-2'}
		 	];
		});


		// Export method of store for es5
		// 
		// this.exportPublicMethods({
		//   getSamples: this.getSamples
		// });
	}

	onAddSample(sample) {
		// console.log(this); this will be reference currently Store instance
		this.samples = this.samples.concat(sample);
	}

	onRemoveSample(id) {
		this.samples = this.samples.filter((v, i) => {
			return v.id != id;
		});
	}

	onInitDefaultSamples(samples) {
		 if (samples) {
		 	this.samples = samples;
		 } else {
		 	this.samples = [
		 		{id : 1, text : 'text-1'},
		 		{id : 2, text : 'text-2'}
		 	];
		 }
	}

	onComposeAction(data) {
		console.log(data);
	}

	// Use with exportPublicMethods
	//
	// getSamples() {
	// 
	// Notes: This will be return undefined because it reference to AltStore instance,
	// Therefore you must through this.getState().samples to get your data of store.
	// 
	// 	return this.samples;
	// }
	
	// Export method of store for es6
	// 
	static getSamples() {
		return this.getState().samples;
	}


}

export default alt.createStore(SampleStore, 'SampleStore');