require({
	packages: [
		{name: 'requirejs-dplugins', location: '../node_modules/requirejs-dplugins'},
		{name: 'decor', location: '../node_modules/decor'},
		{name: 'liaison', location: '../node_modules/liaison'}
	]
}, [
	'todo/model',
	'todo/localStorage',
	'liaison/DOMTreeBindingTarget',
	'todo/BindingSourceFactory'
], function (model, localStorage) {
	'use strict';

	var REGEXP_ROUTES = /^#\/(active|completed)?/i;

	function hashChanged() {
		var tokens = REGEXP_ROUTES.exec(location.hash);
		model.set('filterMode', (tokens || [])[1] ? tokens[1].toLowerCase() : 'all');
	}

	window.addEventListener('hashchange', hashChanged);
	hashChanged();

	document.getElementById('todo-template').bind('bind', localStorage(model));
});
