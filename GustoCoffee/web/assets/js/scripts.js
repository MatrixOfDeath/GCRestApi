//var $ = require('jquery');


$(function(){
    $('a.tc-link[title]').tooltip();
});


$(document).ready(function(){
    $(window).on("scroll",function(){
        var wn = $(window).scrollTop();
        if(wn > 80){
            $('#mainNav').addClass('menu-blanc');
            //$(".navbar").css({"background-color":"#f8f8f8", "border-color": "#f8f8f8"}).fadeIn();

        }
        else{
            $('#mainNav').removeClass('menu-blanc');
            //$(".navbar").css({"background-color":"transparent", "border-color": "transparent"}).fadeIn();
        }
    });
});