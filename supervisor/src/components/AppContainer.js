import React from 'react';
import CommentContainer from './comment/CommentContainer'

var comments = [
	{ name : 'user-1', message : 'post message', id : 0},
	{ name : 'user-2', message : 'post message2', id : 1},
	{ name : 'user-3', message : 'post message3', id : 2}
];

class AppContainer extends React.Component {
	
	render() {
		return (
			<div className="container container-fluid">
				<CommentContainer comments={comments}/>
			</div>
		);
	}
}

export default AppContainer;