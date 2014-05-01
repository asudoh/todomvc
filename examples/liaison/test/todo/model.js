define([
	'intern!bdd',
	'intern/chai!expect',
	'todo/model',
	'../handleCleaner'
], function (bdd, expect, model, handleCleaner) {
	'use strict';

	var fakeEvent = {
		preventDefault: function () {}
	};

	// For supporting Intern's true/false check
	/*jshint -W030*/
	bdd.describe('Test todo/model', function () {
		var handles = [];

		bdd.afterEach(handleCleaner(handles));

		bdd.it('No todos on start', function () {
			expect(model.todos.length).to.equal(0);
			expect(model.activeTodos.length).to.equal(0);
			expect(model.doneTodos.length).to.equal(0);
		});

		bdd.it('No edited todo at startup', function () {
			expect(model.todos.every(function (todo) {
				return !todo.beingEdited;
			})).to.be.ok;
		});

		bdd.it('Should be computed as no active todo at startup', function () {
			expect(model.allChecked).to.be.ok;
			expect(model.hasMoreThanOneActiveTodos).not.to.be.ok;
		});

		bdd.describe('Adding new todos at start', function () {
			bdd.it('Should not add an empty todo item', function () {
				var dfd = this.async(1000);
				model.newTodo = '';
				model.addTodo(fakeEvent);
				setTimeout(dfd.callback(function () {
					expect(model.todos.length).to.equal(0);
				}), 100);
			});

			bdd.it('Should not add an todo item only with whitespaces', function () {
				var dfd = this.async(1000);
				model.newTodo = ' \f\n\r\t\v\u00A0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u2028\u2029\u202f\u205f\u3000';
				model.addTodo(fakeEvent);
				setTimeout(dfd.callback(function () {
					expect(model.todos.length).to.equal(0);
				}), 100);
			});

			bdd.it('Should trim whitespace from new todos', function () {
				var dfd = this.async(1000);
				model.newTodo = '  promote liaison  ';
				model.addTodo(fakeEvent);
				setTimeout(dfd.callback(function () {
					expect(model.todos.length).to.equal(1);
					expect(model.todos[0].title).to.equal('promote liaison');
				}), 100);
			});
		});
	});
});
