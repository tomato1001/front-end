import React from 'react';
import SampleStore from './SampleStore';
import SampleActions from './SampleActions';
import connectToStores from 'alt/utils/connectToStores';

class SampleView extends React.Component {

	static getStores(props) {
		return [SampleStore];
	}

	static getPropsFromStores(props) {
		return SampleStore.getState();
	}

	_onAdd() {
		const {samples} = SampleStore.getState();
		SampleActions.updateSample(samples.length + 1, 'text');
	}

	_onRemove(index) {
		SampleActions.removeSample(index);
	}

	render() {
		return (
			<div>
				<ul>
					{
						this.props.samples.map((sample, index) => {
							return (
								<SampleItem key={index} index={index} sample={sample} onRemove={(v) => this._onRemove(v)}/>
							);
						})
					}
				</ul>
				<button onClick={this._onAdd}>add</button>
			</div>
		);
	}
}

SampleView.propTypes = {
	samples : React.PropTypes.array.isRequired
};

class SampleItem extends React.Component {
	render() {
		const {sample, onRemove, index} = this.props;
		return (
			<li>
				<span>{sample.text}</span>
				<span style={ {cursor : 'pointer', paddingLeft : 10} } onClick={() => onRemove(index)}>x</span>
			</li>
		);
	}
}

SampleItem.propTypes = {
	sample : React.PropTypes.object.isRequired,
	onRemove : React.PropTypes.func.isRequired
};

export default connectToStores(SampleView);