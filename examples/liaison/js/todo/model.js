define([
	'liaison/computed',
	'liaison/wrapper'
], function (computed, wrapper) {
	'use strict';

	var ESC_KEY = 27;

	return wrapper.wrap({
		todos: [],
		newTodo: '',
		filterMode: 'all',
		filteredTodos: computed(function (todos, filterMode) {
			return filterMode === 'all' ? todos : todos.filter(function (todo) {
				return !todo.completed !== (filterMode === 'completed');
			});
		}, 'todos', '@completed', 'filterMode'),
		activeTodos: computed(function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		}, 'todos', '@completed'),
		doneTodos: computed(function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			});
		}, 'todos', '@completed'),
		allChecked: computed(function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			}).length === 0;
		}, 'todos', '@completed'),
		hasMoreThanOneActiveTodos: computed(function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			}).length > 1;
		}, 'todos', '@completed'),
		isFilterModeAll: computed(function (filterMode) {
			return filterMode === 'all';
		}, 'filterMode'),
		isFilterModeActive: computed(function (filterMode) {
			return filterMode === 'active';
		}, 'filterMode'),
		isFilterModeCompleted: computed(function (filterMode) {
			return filterMode === 'completed';
		}, 'filterMode'),
		addTodo: function (event) {
			var title = this.newTodo.trim();
			if (title) {
				this.todos.push(wrapper.wrap({title: title}));
				this.set('newTodo', '');
			}
			event.preventDefault();
		},
		removeTodo: function (event, detail, sender) {
			var index = this.todos.indexOf(sender.instanceData.model);
			if (index >= 0) {
				this.todos.splice(index, 1);
			}
		},
		editTodo: function (event, detail, sender) {
			var todo = sender.instanceData.model;
			todo.set('originalTitle', todo.title);
			todo.set('beingEdited', true);
		},
		doneEditing: function (event, detail, sender) {
			var todo = sender.instanceData.model;
			todo.set('beingEdited', false);
			todo.set('originalTitle', '');
			var title = todo.title.trim();
			if (title) {
				todo.set('title', title);
			} else {
				this.removeTodo(event, detail, sender);
			}
			if (event.type === 'submit') {
				event.preventDefault();
			}
		},
		cancelEditing: function (event, detail, sender) {
			if (event.keyCode === ESC_KEY) {
				var todo = sender.instanceData.model;
				todo.set('beingEdited', false);
				todo.set('title', todo.originalTitle);
				todo.set('originalTitle', '');
			}
		},
		clearDoneTodos: function () {
			this.todos.reduceRight(function (dummy, todo, i, todos) {
				if (todo.completed) {
					todos.splice(i, 1);
				}
			}, undefined);
		},
		markAll: function (event, detail, sender) {
			var shouldUnmark = sender.instanceData.model.allChecked;
			this.todos.forEach(function (todo) {
				todo.set('completed', !shouldUnmark);
			});
		}
	});
});
