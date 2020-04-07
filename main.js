window.onload = function () {

		// scrollmagic

		var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave',
				duration: "100%" // this works just fine with duration 0 as well
				// However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
				// Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
			}
		});

        new ScrollMagic.Scene({
            triggerElement: "#trigger-1"
        })
        .setTween("#animate-1", {yPercent:100}) // trigger a TweenMax.to tween
        .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
        .addTo(controller);
		

		//margin notes

			$(".margin-note").click(function(){
				 $('.note_content').css('display', 'flex');
			});
			$(".page-right").click(function(){
					$('.note_content').hide();
			});
			$(".media-note").click(function(){
				$('.media_content').css('display', 'flex');
		   });
		   $(".page-right").click(function(){
				$('.media_content').hide();
		});

	;

		//citations

		'use strict';
		let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
		let apiKey = "4ade206763c0f24a2dcbe10b1d355375";
		// let term = "Rubrication";
		let term = $(".citation a").html();
		console.log(term);
		let wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+term;


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