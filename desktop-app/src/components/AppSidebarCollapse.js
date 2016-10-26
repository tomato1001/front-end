import React from 'react'
import classNames from 'classnames'

class AppSidebarCollapse extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			active : this.props.active
		};
	}

	toggleActive() {
		this.setState({
			active : !this.state.active
		});
	}

	render() {
		var activeCls = classNames('app-sidebar-collapse', { active : this.state.active });
		return (
			<div className={activeCls} onClick={() => this.toggleActive()}>
				<div className="app-sidebar-collapse-icon">
					<i className="fa fa-th"></i>
				</div>
			</div>
		);
	}
}

AppSidebarCollapse.propTypes = {
	active : React.PropTypes.bool
};

AppSidebarCollapse.defaultProps = {
	active : false
};

export default AppSidebarCollapse; 