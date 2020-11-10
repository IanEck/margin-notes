(function ($) {

    //citations
    'use strict';
    let allText = [];

    $(".citation").each(function(){
        $(this).find('a').click(function(e){
          e.preventDefault();
        })
        //$(this).find('a').attr('target', '_blank');
        var text = $(this).find('a').html().replace(/ /g,"_");
        allText.push(text);
    });

    allText.forEach(function(item, index){
        //console.log(item)     

        var content = $(".citation").eq(index).find("a").data("content");
        var title = $(".citation").eq(index).find("a").data("title"); 
        var link = $(".citation").eq(index).find("a").attr("href"); 
        var wikiFavicon = $(".citation").eq(index).find("a").data("wiki-favicon");       
        var wikiTitle = $(".citation").eq(index).find("a").data("wiki-title");       

        var wikiIcon = wikiFavicon ? `<img class='wiki-logo' src='${wikiFavicon}' alt='Wiki logo' />` : '';
        var wtitle = wikiTitle ? `<i>${wikiTitle}</i>` : '';

        if (content !== undefined || content !== '') {
          console.log(link)
          $(".citation").eq(index).append(
              "<div class='citationContent'><div class='heading d-flex'><h3> <a href='" + link + "' target='_blank'>" +
                title +
          "</a></h3>" + wikiIcon + wtitle + "</div>" +
                content +
                "</div>"
            ).addClass("content-added");
        }
    });

    // Show the List of Paradoxes
    // var paradoxes_list_url = 'https://api.are.na/v2/channels/margin-notes/contents';
    // var getData = $.get(index, function(res){

    // })



    var listWrappper = $('.paradoxes-list');
    var loading = $('#loading');
    var btn = $("#loadMore");
    var pageCounter = 1;

    if(listWrappper.length){
        // load first 8 items
        fetch(`https://api.are.na/v2/channels/margin-notes/contents?page=${pageCounter}&amp;per=8`).then((res) => res.json())
        .then((data) => {
          console.log(data);
          renderHtml(data.contents);
          loading.hide();
          btn.css({'display': 'block'});
        }).catch(error => '!Ops some error')


        // load more 8 items
        btn.click(function(){
          loading.show();
          fetch(`https://api.are.na/v2/channels/margin-notes/contents?page=${pageCounter}&amp;per=8`).then((res) => res.json())
          .then((data) => {
            renderHtml(data.contents);
            loading.hide();
          }).catch(error => '!Ops some error')

          pageCounter++;
          
        })

        // Render html function
        function renderHtml(data){
          data.forEach((item) => {
            let img = item.image ? item.image.display.url : '';
            let user = item.user ? item.user.full_name : '';
            let title = item.title ? item.title : '';
            let link = item.source ? item.source.url : '';
            let className = item.base_class;

            // var original = title; 
            // var convertedTitle = original.substr(original.indexOf(" ") + 1); // removing first word from string

            listWrappper.append(`
              <div class="item ${className}">
                ${img ? `<img src="${img}">` : ''}
                ${className === "Channel" ? `<h3>${title}</h3>` : ''}
                <h6>${user}</h6>
                <a class="link" target="_blank" href="https://www.are.na/block/9269117"> <button>Connect →</button></a>
              </div>
            `);
          })
          
        }
    }


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

  if(form){
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  }
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