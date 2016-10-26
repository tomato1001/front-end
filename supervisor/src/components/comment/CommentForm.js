import React from 'react'

var CommentForm = React.createClass({

	propTypes : {
		onCommentAdd : React.PropTypes.func.isRequired
	},

	handleSubmit : function(e) {
		const nameNode = React.findDOMNode(this.refs.name),
			  messageNode = React.findDOMNode(this.refs.message),
			  name = nameNode.value.trim(),
			  message = messageNode.value;

		if (!name) {
			return;
		}

		this.props.onCommentAdd({
			name : name,
			message : message
		});

		// nameNode.value = '';
		messageNode.value = '';

	},

	render : function(){
		return (
			<form className="comment-form form-inline">
				<div className="form-group">
				  <label htmlFor="name">Name</label>
				  <input type="text" className="form-control" id="name" ref="name" placeholder="Your name"/>
				</div>
				<div className="form-group">
				  <label htmlFor="message">Message</label>
				  <input type="text" className="form-control" id="message" ref="message" placeholder="Post message"/>
				</div>
				<button type="button" className="btn btn-default" onClick={this.handleSubmit}>Send</button>
			</form>
		);
	}
});

export default CommentForm;