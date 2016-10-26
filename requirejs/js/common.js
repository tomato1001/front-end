require.config({
	baseUrl: 'js/lib',
	paths: {
		app: '../app',
		jquery: 'jquery/jquery-1.11.2.min',
		'jquery.tipsy': 'jquery/tipsy/jquery.tipsy',
		'ymPrompt': 'prompt/ymPrompt',
		'underscore': 'underscore',
		'backbone': 'backbone/backbone',
		'marionette': 'backbone/backbone.marionette',
		'backbone-validation': 'backbone/backbone-validation'
	},

	// shim's key correspond to paths key
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone-validation': {
			deps: [
				'underscore',
				'jquery',
				'backbone'
			],
			exports: 'Backbone.Validation'
		},
		'jquery.tipsy': ['jquery'],
		'ymPrompt': {
			exports: 'ymPrompt',
			init: function() {
				this.ymPrompt.setDefaultCfg({closeBtn: false, maskAlpha: 0.75});
			}
		}
	}
});