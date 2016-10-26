// define({
// 	name: 'aa',
// 	password: 'bb'
// });
// 

// define(function(require) {
// 	var $ = require('jquery'),
// 		_ = require('underscore');

// 	function Main () {
// 	}

// 	Main.prototype = {
// 		init : function() {
// 			console.log($, _);
// 		}
// 	}

// 	return Main;
// });
// 

define([
	'domReady!',
	'ymPrompt',
	'jquery',
	'underscore', 
	'backbone',
	'marionette',
	'backbone-validation',
	'jquery.tipsy'
	], 
	function(doc, ymPrompt, $, _, Backbone, Marionette) {

		function Main () {
		}

		Main.prototype = {
			init : function() {
		        $("#example-1").tipsy();
		        $("#prompt").click(function() {
		            ymPrompt.succeedInfo({
		                message: 'Success'
		            });
		        });
				console.log($, _);
				console.log(Backbone.Wreqr);
			}
		}

		return Main;
});