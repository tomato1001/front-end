/**
 *  Copy all of properties to obj
 */
var _extend = function(obj) {
	var type = typeof obj;
	if (type === 'function' || type === 'object' && !!obj) {
		var source;
		for (var index = 1; index < arguments.length; index++) {
			source = arguments[index];
			for (var k in source) {
				if (hasOwnProperty.call(source, k)) {
					obj[k] = source[k];
				}
			}
		}
	}
	return obj;
};

/**
 * An function used for mock oop inheritance
 */
var extend = function(protoProps) {
	var parent = this;
	var child;
	if (protoProps && hasOwnProperty.call(protoProps, 'constructor')) {
		child = protoProps.constructor;
	} else {
		child = function() { return parent.apply(this, arguments); };
	}

	_extend(child, parent);

	var Surrogate = function() {};
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate;
	if (protoProps) {
		_extend(child.prototype, protoProps);
	}
	child.prototype.constructor = child;
	child.__super__ = parent.prototype;
	return child;
};

function Class() {
	this.initialize.apply(this, arguments);
}

_extend(Class.prototype, {
	initialize: function(){}
});

Class.extend = extend;

var Fruit = Class.extend({
	initialize: function() {
		console.log('Initialize');
		console.log(this);
	}
});

var Apple = Fruit.extend({
	initialize: function(a, b, c) {
		console.log(a, b, c, this);
		Apple.__super__.initialize.apply(this);
	}
});

var apple = new Apple(1, 2, 3);