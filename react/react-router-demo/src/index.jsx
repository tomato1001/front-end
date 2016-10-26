import React from 'react'
import {render} from 'react-dom'

import {Router, Route, browserHistory, IndexRoute} from 'react-router'

// import App from './app.jsx'
// import About from './about.jsx'
// import Repos from './repos.jsx'
// import Repo from './repo.jsx'
// import Home from './home.jsx'
// 
// const route = () => {
// 	return (
// 		<Router history={browserHistory}>
// 			<Route path="/" component={App}>
// 				<IndexRoute component={Home}/>
// 				<Route path="/repos" component={Repos}>
// 					<Route path="/repos/:categroy/:repoName" component={Repo}/>
// 				</Route>
// 				<Route path="/about" component={About}/>
//    			</Route>
// 		</Router>
// 	);
// }
// 
// render(route(), document.querySelector("#app"));

import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './menu/Menu.jsx'


render(<Menu/>, document.querySelector("#app"));