//var $ = require('jquery');


$(function(){
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    $('a.tc-link[title]').tooltip();
});

// Basics features
$(document).ready(function(){

    // $("#main").onepage_scroll();

    $(window).on("scroll",function(){
        var wn = $(window).scrollTop();
        if(wn > 50){
            $('#mainNav').addClass('menu-blanc');
            //$(".navbar").css({"background-color":"#f8f8f8", "border-color": "#f8f8f8"}).fadeIn();

        }
        else{
            $('#mainNav').removeClass('menu-blanc');
            //$(".navbar").css({"background-color":"transparent", "border-color": "transparent"}).fadeIn();
        }
    });
});


