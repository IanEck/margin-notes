(function ($) {

    //citations
    'use strict';
    let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    let apiKey = "4ade206763c0f24a2dcbe10b1d355375";    
    let allText = [];
    let allLink = [];

    $(".citation").each(function(){
        $(this).find('a').attr('target', '_blank');
        var text = $(this).find('a i').html().replace(/ /g,"_");
        allText.push(text);
    });

    allText.forEach(function(item, index){
        //console.log(item)
        let wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/"+item;

        allLink.push(wikiUrl);       
    });

    allLink.forEach(function(link, index){
        $.get(`${link}`, function(resp) {
            var title = resp.title;
            var content = $(".citation").eq(index).find("a").data('content') //resp.description;
            
            if(content !== undefined){
                //console.log(content)
                $( ".citation").eq(index).append("<div class='citationContent'><div class='heading d-flex'><h3>"+title+"</h3><img class='wiki-logo' src='../assets/svg/wiki-logo.svg' alt='Wiki logo' /><i>Wikipedia</i></div>" +content+ "</div>").addClass('content-added');
            }
        })

    });

    $(window).on('load', function () {
        $('body').addClass('loaded');
        if($(window).width() > 767){
            $(".post-template blockquote a").attr("target", "_blank");
        }
    });
})(jQuery);