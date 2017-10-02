// routes
//include react and the router
var React = require('react');

var Main = require('../components/Main');
var Saved = require('../components/Saved');
var Search = require('../components/Search');

//to pull the router
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

//export the routes
module.exports = (
	<Route path="/" component={Main}>
{/*if the user selects search or save, show the appropriate component */}
		<Route path="/search" component={Search} />
		<Route path="/saved" component={Saved} />
{/*if the user selects any other path .. it takes them home */}
		<IndexRoute component={Search} />
	</Route>
);
