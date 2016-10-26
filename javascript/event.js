/**
 *  Observer pattern or pub/sub implementation
 */

var eventCallback = function(callback, ctx, args) {
	callback.apply(ctx, args);
};

var event = {

	on: function(name, callback, ctx) {
		this.eventMap || (this.eventMap = {});
		var cbCtx = {cb: callback, ctx: ctx || this},
		      ls = this.eventMap[name] || (this.eventMap[name] = []);
		ls.push(cbCtx);
		return this;
	},

	trigger: function(name) {
		if (!this.eventMap) {
			return this;
		}
		var ls = this.eventMap[name];
		if (ls && ls.length > 0) {
			var args = Array.prototype.slice.call(arguments, 1),
				cbCtx;
			for(var i = 0; i < ls.length; i++) {
				cbCtx = ls[i];
				eventCallback(cbCtx.cb, cbCtx.ctx, args);
			}
		}
		return this;
	},

	off: function(name, callback, ctx) {
		if (!name && !callback && !ctx) {
			this.eventMap = void 0;
			return this;
		}

		var names, i, j, handlers, handler, retain;
		names = name ? [name] : this._keys(this.eventMap);
		for (i = 0; i < names.length; i++) {
			name = names[i];
			if (handlers = this.eventMap[name]) {
				this.eventMap[name] = retain = [];
				if (callback || ctx) {
					for (j = 0; j < handlers.length; j++) {
						handler = handlers[j];
						if ( (callback && callback !== handler.cb) || (ctx && ctx !== handler.ctx) ) {
							retain.push(handler);
						}
					}
				}
				if (!retain.length) delete this.eventMap[name];
			}
		}
	},

	_keys: function(obj) {
		var k = [];
		for (var key in obj) {
			k.push(key);
		}
		return k;
	}


};

function doClick(name, age) {
	console.log(name, age);
}

function Handler() {
	this.age = 45;
	event.on('click', this.doClick, this);
}

Handler.prototype = {
	doClick: function(name) {
		console.log(name, this.age, this);
	}
}


event.on('click', doClick);

var hd = new Handler();

event.trigger('click', 'Event', 12);

event.off('click', null, hd);
// event.off('click', doClick);
// event.off('click', doClick, event);
// event.off();

event.trigger('click', 'Event', 13);