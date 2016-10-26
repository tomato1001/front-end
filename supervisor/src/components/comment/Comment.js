import React from 'react'

var Comment = React.createClass({

	propTypes : {
		data : React.PropTypes.object.isRequired,
		onCommentRemove : React.PropTypes.func.isRequired
	},

	getDefaultProps : function() {
		return {
			data : {}
		};
	},

	removeComment : function() {
		this.props.onCommentRemove(this.props.data.id);
	},

	render : function(){
		var data = this.props.data;

		return (
			<div className="comment">
				<span>{data.name + ': ' + data.message}</span>
				<span className="comment-del-btn" onClick={this.removeComment}></span>
			</div>
		);
	}
});

export default Comment;