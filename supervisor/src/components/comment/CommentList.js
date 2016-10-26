import React from 'react'
import Comment from './Comment'

var CommentList = React.createClass({

	propTypes : {
		comments : React.PropTypes.array,
		onCommentRemove : React.PropTypes.func.isRequired
	},

	getDefaultProps : function() {
		return {
			comments : []
		};
	},

	render : function(){
		var childrens = this.props.comments.map((comment) => {
			return <Comment data={comment} key={comment.id} onCommentRemove={this.props.onCommentRemove}/>
		}, this);
		return (
			<div className="comment-list">
				{childrens}
			</div>
		);
	}
});

export default CommentList;