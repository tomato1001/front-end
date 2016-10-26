import alt from '../alt';

class SampleActions{

	/**
	 * Remember, `dispatch` only takes one argument. Therefore, if you need to pass 
	 * multiple arguments into a store you can use an Object.
	 * 
	 * @param  {[type]} id   [description]
	 * @param  {[type]} text [description]
	 * @return {[type]}      [description]
	 */
	updateSample(id, text) {
		return {id, text : text + id};
	}

	removeSample(index) {
		this.dispatch(index);
	}
}

export default alt.createActions(SampleActions);