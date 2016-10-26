import React from 'react';
import NavHeader from './NavHeader';
import AppSidebarCollapse from './AppSidebarCollapse';
import AppSidebar from './AppSidebar';

class AppContainer extends React.Component {
	
	render() {
		return (
			<div id="app-container">
				<NavHeader>
					<AppSidebarCollapse/>
				</NavHeader>
				<div className="app-content">
					<AppSidebar/>
					<div className="app-body"></div>
				</div>
			</div>
		);
	}
}

export default AppContainer;