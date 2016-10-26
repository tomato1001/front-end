import React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

var CommentContainer = React.createClass({

	getInitialState : function() {
		return {
			comments : this.props.comments
		}
	},

	addComment : function(comment) {
		const comments = this.state.comments,
			  count = comments.length;
		comment.id = count;
		const newComments = comments.concat([comment]);
		this.setState({
			comments : newComments
		});
	},

	removeComment : function(id) {
		var newComments = this.state.comments.filter((comment) => {
			return comment.id != id;
		});

		this.setState({
			comments : newComments
		});
	},

	render : function(){
		return (
			<div className="comment-container container container-fluid">
				<CommentForm onCommentAdd={this.addComment}/>
				<CommentList comments={this.state.comments} onCommentRemove={this.removeComment}/>
			</div>
		);
	}

});

export default CommentContainer;