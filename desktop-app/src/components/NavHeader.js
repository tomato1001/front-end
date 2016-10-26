import React from 'react';

class NavHeader extends React.Component {
	render() {
		return (
			<div className="nav-header">
				{this.props.children}
			</div>
		);
	}
}

export default NavHeader;