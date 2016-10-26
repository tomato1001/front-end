require(['./common'], function(common) {

	// require(['require', 'app/main1'], function(require) {
	// 	var Main1 = require('app/main1');
	// 	var m = new Main1();
	// 	m.init();
	// });
	// 
	// 
	
	// domReady with callback
	// require(['domReady'], function(domReady) {
	// 	domReady(function() {
	// 		console.log(document.body);
	// 	});
	// });

	// require(['domReady!'], function(doc) {
		require(['require', 'app/main1'], function(require) {
			var Main1 = require('app/main1');
			var m = new Main1();
			m.init();
		});
	// });

    // require(['app/main1', 'ymPrompt', 'backbone', 'jquery', 'jquery.tipsy'], function(m1, ymPrompt, Backbone, $) {
    //     $(function() {
    //         $("#example-1").tipsy();
    //         $("#prompt").click(function() {
    //             ymPrompt.succeedInfo({
    //                 message: 'Success'
    //             });
    //         });
    //         console.log(Backbone);
    //     });
    // });
    // 
    // 
    
    // Use of dependency array and require
   //  require(['require', 'app/main1', 'ymPrompt', 'backbone', 'jquery', 'jquery.tipsy'], function(require) {
   //  		var main1 = require('app/main1'),
			// 	ymPrompt = require('ymPrompt'),
			// 	Backbone = require('backbone'),
			// 	$ = require('jquery');
			// require('jquery.tipsy');

			// $(function() {
			//     $("#example-1").tipsy();
			//     $("#prompt").click(function() {
			//         ymPrompt.succeedInfo({
			//             message: 'Success'
			//         });
			//     });
			//     console.log(Backbone);
			// });
   //  });

});