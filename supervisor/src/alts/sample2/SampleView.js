import React from 'react';
import SampleActions from './SampleActions';
import SampleStore from './SampleStore';
import connectToStores from 'alt/utils/connectToStores';

class SampleView extends React.Component {

	static getStores(props) {
		return [SampleStore];
	}

	static getPropsFromStores(props) {
		return SampleStore.getState();
	}

	// lifecycle method added from connectToStores.
	// We can use it to fetch initialized data from server.
	//
	// static componentDidConnect(props) {
	// 	SampleActions.initDefaultSamples();
	// }

	_onAdd() {
		// const id = SampleStore.getSamples().length + 1;
		SampleActions.composeAction(1, 'text');
		const id = this.props.samples.length + 1;
		SampleActions.addSample({
			id : id,
			text : 'text-' + id
		});
	}

	_onRemove(id) {
		SampleActions.removeSample(id);
	}

	render() {
		return (
			<div>
				<ul>
					{
						this.props.samples.map((sample) => {
							return <SampleItem key={sample.id} sample={sample} onRemove={this._onRemove}/>
						})
					}
				</ul>
				<button onClick={() => this._onAdd()}>Add</button>
			</div>

		);
	}
}

SampleView.propTypes = {
	samples : React.PropTypes.array.isRequired
};

class SampleItem extends React.Component {
	render() {
		const {sample, onRemove} = this.props,
				deleteStyle = {cursor : 'pointer', marginLeft : 10};
		return (
			<li>
				<span>{sample.text}</span>
				<span onClick={() => onRemove(sample.id)} style={deleteStyle}>x</span>
			</li>
		);
	}
}

SampleItem.propTypes = {
	sample : React.PropTypes.object.isRequired,
	onRemove : React.PropTypes.func.isRequired
};

export default connectToStores(SampleView);