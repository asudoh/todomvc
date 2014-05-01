define(['liaison/ObservablePath'], function (ObservablePath) {
	'use strict';

	var origCreateBindingSourceFactory = Element.prototype.createBindingSourceFactory;
	Element.prototype.createBindingSourceFactory = function (expression, name) {
		if (expression === 'allChecked') {
			return function (model) {
				var observer = new ObservablePath.Observer(model, 'allChecked');
				observer.setValue = function () {};
				return observer;
			};
		} else if (name === 'todo-focus') {
			return function (model, node) {
				var focusObserver = {
					open: function (callback, thisObject) {
						function timeout() {
							if (value) {
								node.focus();
							}
							hTimeout = null;
						}
						var hTimeout,
							value = (this.observer = new ObservablePath(model, expression)).open(function (newValue, oldValue) {
								value = newValue;
								if (hTimeout) {
									clearTimeout(hTimeout);
								}
								hTimeout = setTimeout(timeout, 0);
								callback.call(thisObject, newValue, oldValue);
							});
						return value;
					}
				};
				['deliver', 'discardChanges', 'setValue', 'close', 'remove'].forEach(function (name) {
					focusObserver[name] = function () {
						var observer = focusObserver.observer;
						return observer[name].apply(observer, arguments);
					};
				});
				return focusObserver;
			};
		}
		return origCreateBindingSourceFactory && origCreateBindingSourceFactory.apply(this, arguments);
	};
});
