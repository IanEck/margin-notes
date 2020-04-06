window.onload = function () {

		// init
		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave',
				duration: "100%" // this works just fine with duration 0 as well
				// However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
				// Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
			}

			
		});

		// get all slides
		// var slides = document.querySelectorAll("div.page-right");

		// // create scene for every slide
		// for (var i=0; i<slides.length; i++) {
		// 	new ScrollMagic.Scene({
		// 			triggerElement: slides[i]
		// 		})
		// 		// .setPin(slides[i], {pushFollowers: false})
		// 		.addIndicators() // add indicators (requires plugin)
		// 		.addTo(controller);
        // }
        
        new ScrollMagic.Scene({
            triggerElement: "#trigger-1"
        })
        .setTween("#animate-1", {yPercent:100}) // trigger a TweenMax.to tween
        .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
        .addTo(controller);
		
		//margin notes
		
			$(".margin-note").click(function(){
				 $('.hover_bkgr_fricc').css('display', 'flex');
			});
			$(".page-right").click(function(){
				console.log("works");
					$('.hover_bkgr_fricc').hide();
			});
			// $(".popupCloseButton").click(function(){
			// 	console.log("works");
			// 		$('.hover_bkgr_fricc').hide();
			// });
	;

		//citations
		'use strict';
		let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
		let apiKey = "4ade206763c0f24a2dcbe10b1d355375";
		let term = "Pet_door";
		let wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/Rubrication";
		// let totalUrl = weatherUrl + '&appid=' + apiKey
		// $.get(weatherUrl + "London&appid" + apiKey)
		// $.get(`${weatherUrl}London&appid=${apiKey}`, function(resp) {
		//   let temp = resp.main.temp;
		//   console.log(temp);
		// });

		//Button for temperature anywhere
		// function weatherAnywhere() {
		// event.preventDefault();
		// let input = "London";
		// let location = input + "&appid=";
		// $.get(`${weatherUrl}${location}${apiKey}`, function(resp) {
		// 		let temp = resp.main.temp;
		// 		const tempCelsius = Math.floor(temp - 273);
		// 		let tempFahrenheit = Math.floor(tempCelsius * (9/5) + 32);

		// 		$( ".citationContent" ).append( "The temperature in " + input + " is " + tempCelsius + "°C (" + tempFahrenheit + "°F)" );
		// })} weatherAnywhere();

		function showCitation() {
			event.preventDefault();
			$.get(`${wikiUrl}`, function(resp) {
				var title = "<h3>Rubrication</h3>";
				var source = "<span><i>from Wikipedia</i></span>: ";
				var content = resp.extract;
				$( ".citationContent" ).append( title, source, content );
			
			})} 
			
		showCitation();

		
	
        
}