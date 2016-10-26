import alt from '../alt';

class SampleActions {

	constructor() {
		this.generateActions(
			'addSample',
			'removeSample',
			'initDefaultSamples'
		);
	}

	composeAction(id, text) {
		return {id, text}; // or this.dispatch({id, text});
	}
}

export default alt.createActions(SampleActions);