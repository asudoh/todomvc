define([
	'liaison/Each',
	'liaison/wrapper'
], function (Each, wrapper) {
	'use strict';

	return function (model)	{
		var STORAGE_ID = 'todos-liaison',
			data = localStorage.getItem(STORAGE_ID);
		if (data) {
			try {
				data = JSON.parse(data);
			} catch (e) {}
			model.set('todos', wrapper.wrap(data));
		}

		new Each([model.todos], [['completed', 'title']]).open(function (sources) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(sources[0].map(function (todo) {
				todo = wrapper.unwrap(todo);
				delete todo.beingEdited;
				delete todo.originalTitle;
				return todo;
			})));
		});

		return model;
	};
});
