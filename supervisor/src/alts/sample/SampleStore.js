import alt from '../alt';
import SampleActions from './SampleActions';

class SampleStore {

	constructor() {
		this.bindListeners({
			updateSample : SampleActions.updateSample,
			removeSample : SampleActions.removeSample
		});

		// this.bindAction(SampleActions.updateSample, this.updateSample);
		// this.bindAction(SampleActions.removeSample, this.removeSample);
		// this.bindAction(SampleActions.UPDATE_SAMPLE, this.updateSample);

		this.state = {
			samples : this._getDefaultSamples()
		};
	}

	updateSample(sample) {
		this.setState({
			samples : this.state.samples.concat(sample)
		});
	}

	removeSample(index) {
		const newSamples = this.state.samples.filter((v, i) => {
			return i != index;
		});

		this.setState({
			samples : newSamples
		});
	}

	_getDefaultSamples() {
		const samples = [
			{text : '1'},
			{text : '2'},
			{text : '3'}
		];
		return samples;
	}



}

export default alt.createStore(SampleStore, 'SampleStore');