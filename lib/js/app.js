(function($){
	var welcome = {
		'config' : {
			'module' : $(""),
		},
                
		'init' : function () {
			var main = welcome.mainMethods();
			main.setup();
		},
		'mainMethods' : function () {
			function headerFitText() {
				$("#masthead").fitText(0.55);	
			}     
			
			function helloWorld() {
				console.log("app.js is running and FitText is working on the header. They're included locally though you may want to use a cdn")
			}
			          
			return {
				setup: function () {
					helloWorld();
					headerFitText();
				},
                                
			};
		}         
	};
	$(document).ready( function() {
		welcome.init();
	});
}(jQuery));