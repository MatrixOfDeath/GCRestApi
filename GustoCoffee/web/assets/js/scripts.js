//var $ = require('jquery');

$(function(){
    $('a.tc-link[title]').tooltip();
});

// Basics features
$(document).ready(function(){


    // $("#main").onepage_scroll();
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    // $('.navbar .dropdown').hover(function() {
    //     $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
    //
    // }, function() {
    //     $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
    //
    // });

    $('.dropdown-toggle').click(function() {
        var location = $(this).attr('href');
        window.location.href = location;
        return false;
    });



    $(window).on("scroll",function(){
        var wn = $(window).scrollTop();
        // if(wn > 30){
        //     $('#mainNav').css({"margin-top" : 0}).fadeIn("slow");
        // }else{
        //     $('#mainNav').css({"margin-top" : 20}).fadeIn("slow");
        // }
        if(wn > 50){
            $('#mainNav').addClass('menu-blanc');
            $('#mainNav').removeClass('marginTop');
            $('#mainNav').css({"width" : "100%"}).fadeIn("slow");

            //$(".navbar").css({"background-color":"#f8f8f8", "border-color": "#f8f8f8"}).fadeIn();
        }
        else{
            $('#mainNav').removeClass('menu-blanc');
            $('#mainNav').addClass('marginTop');
            $('#mainNav').css({"width" : "98%"}).fadeIn("slow");

            //$(".navbar").css({"background-color":"transparent", "border-color": "transparent"}).fadeIn();
        }
    });
});


