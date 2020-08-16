(function ($) {

    //citations
    'use strict';
    let allText = [];

    $(".citation").each(function(){
        $(this).find('a').attr('target', '_blank');
        var text = $(this).find('a').html().replace(/ /g,"_");
        allText.push(text);
    });

    allText.forEach(function(item, index){
        //console.log(item)     

        var content = $(".citation").eq(index).find("a").data("content");
        var title = $(".citation").eq(index).find("a").data("title"); 
        var wikiFavicon = $(".citation").eq(index).find("a").data("wiki-favicon");       
        var wikiTitle = $(".citation").eq(index).find("a").data("wiki-title");       

        var wikiIcon = wikiFavicon ? `<img class='wiki-logo' src='${wikiFavicon}' alt='Wiki logo' />` : '';
        var wtitle = wikiTitle ? `<i>${wikiTitle}</i>` : '';

        if (content !== undefined || content !== ' ') {
          //console.log(content)
          $(".citation").eq(index).append(
              "<div class='citationContent'><div class='heading d-flex'><h3>" +
                title +
          "</h3>" + wikiIcon + wtitle + "</div>" +
                content +
                "</div>"
            ).addClass("content-added");
        }

    });

    $(window).on('load', function () {
        $('body').addClass('loaded');
        if($(window).width() > 767){
            $(".post-template blockquote a").attr("target", "_blank");
        }
    });
})(jQuery);

window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above

  var form = document.getElementById("newsletter-form");
  var button = document.getElementById("my-form-button");
  var status = document.getElementById("my-form-status");

  // Success and Error functions for after the form is submitted

  function success() {
    form.reset();
    button.style = "pointer-event: none";
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}