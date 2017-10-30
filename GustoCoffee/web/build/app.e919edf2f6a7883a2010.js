webpackJsonp([3],{

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./web/assets/js/bootstrap-touch-slider.js":
/*!*************************************************!*\
  !*** ./web/assets/js/bootstrap-touch-slider.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery, $) {/*Bootstrap Carousel Touch Slider.
 http://bootstrapthemes.co

 Credits: Bootstrap, jQuery, TouchSwipe, Animate.css, FontAwesome

 */

(function ($) {
    "use strict";

    $.fn.bsTouchSlider = function (options) {
        var carousel = $(".carousel");
        return this.each(function () {

            function doAnimations(elems) {
                //Cache the animationend event in a variable
                var animEndEv = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                elems.each(function () {
                    var $this = $(this),
                        $animationType = $this.data('animation');
                    $this.addClass($animationType).one(animEndEv, function () {
                        $this.removeClass($animationType);
                    });
                });
            }

            //Variables on page load
            var $firstAnimatingElems = carousel.find('.item:first').find("[data-animation ^= 'animated']");
            //Initialize carousel
            carousel.carousel();
            //Animate captions in first slide on page load
            doAnimations($firstAnimatingElems);
            //Other slides to be animated on carousel slide event
            carousel.on('slide.bs.carousel', function (e) {
                var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
                doAnimations($animatingElems);
            });
            //swipe initial
            $(".carousel .carousel-inner").swipe({
                swipeLeft: function swipeLeft(event, direction, distance, duration, fingerCount) {
                    this.parent().carousel('next');
                },
                swipeRight: function swipeRight() {
                    this.parent().carousel('prev');
                },
                threshold: 0
            });
        });
    };
})(jQuery);

//Initialise Bootstrap Carousel Touch Slider
// Curently there are no option available.

$('#bootstrap-touch-slider').bsTouchSlider();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/fixdiv.js":
/*!*********************************!*\
  !*** ./web/assets/js/fixdiv.js ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {
function fixDiv() {
    var $cache = $('#getFixed');
    if ($(window).width() >= 991 && $(window).scrollTop() > 200) {
        $cache.css({ 'position': 'fixed', 'top': '275px' });
        $("#removeDiv").css({ "display": "inherit" });
    } else {
        $cache.css({ 'position': 'relative', 'top': '0px' });
        $("#removeDiv").css({ "display": "none" });
    }

    if ($(window).width() < 991 && $(window).scrollTop() > 200) {
        $cache.css({ 'position': 'relative', 'top': '0px' });
    }
}
$(window).scroll(fixDiv);
fixDiv();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/main.js":
/*!*******************************!*\
  !*** ./web/assets/js/main.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

global.$ = global.jQuery = $;

// require('bootstrap-sass');
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./web/assets/js/reservation/checkDispoDate.js":
/*!*****************************************************!*\
  !*** ./web/assets/js/reservation/checkDispoDate.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Slider
$(function () {
    /** Listes et grilles salles **/

    $(document).on('click', '#list', function (event) {
        event.preventDefault();
        $('#display-salle .cardSalle').addClass('list-group-item');
        $('#display-annonce .cardSalle').addClass('list-group-item');
    });
    $(document).on('click', '#grid', function (event) {
        event.preventDefault();
        $('#display-salle .cardSalle').removeClass('list-group-item').addClass('grid-group-item');;
        $('#display-annonce .cardSalle').removeClass('list-group-item').addClass('grid-group-item');;
        // $('#display-salle .cardSalle, #display-annonce .cardSalle').addClass('grid-group-item');
    });

    if (!$('#slider-range').length) {
        return false;
    }

    /** Initiate datepicker **/
    $("#datepicker").datepicker({
        maxDate: "+15d",
        minDate: new Date(),
        defaultDate: new Date(),
        dateFormat: 'dd/mm/yy',
        altFormat: 'yy-mm-dd',
        altField: '#datepicker-altFormat',
        regional: "fr"

    });
    // Gestion de la region fr/en pose problème
    // $("#datepicker").datepicker("options", "defaultDate", new Date());

    $('.ui-slider-handle').draggable();

    var arrMin = $('#slider-range .minHeure').val().split(':');
    var arrMax = $('#slider-range .maxHeure').val().split(':');

    var minH = parseInt(arrMin[0], 10);
    var minM = parseInt(arrMin[1], 10);
    var maxH = parseInt(arrMax[0], 10);
    var maxM = parseInt(arrMax[1], 10);

    var min = minH; // 9 Heure min d'ouverture du magasin
    var max = maxH; // 21 Heure max d'ouverture du magasin
    var datePickerDate = $("#datepicker-altFormat").val();
    var today = new Date();
    var todayDate = $("#datepicker-altFormat").val();
    //console.log(todayDate + ' et date picker' + datePickerDate);

    if (!!$('#slider-range .heureActuelleDefaut').val()) {
        var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
        var heureActuelle = parseInt(arrTime[0], 10);
        var minuteActuelle = parseInt(arrTime[1], 10);
        todayDate = arrTime[2];

        if (minuteActuelle < 30) {
            minuteActuelle = 0;
        } else {
            minuteActuelle = 30;
        }
    }

    $("#slider-range").slider({
        range: true,
        min: min * 60 + minM,
        max: max * 60 + maxM,
        minRange: 60,
        step: 30,
        values: [min * 60 + minM, max * 60 + maxM],
        slide: function slide(event, ui) {

            // On limite l'intervalle minimal à 1h pour une reservation de salle
            if (ui.values[0] + 55 >= ui.values[1]) {
                return false;
            }
            // Dans le cas où c'est la date du jour !
            if ($("#datepicker-altFormat").val() == todayDate || !$("#datepicker-altFormat").val()) {
                var totalStartTime = heureActuelle * 60 + minuteActuelle;
                // console.log(ui.values[0] + ' '+ totalStartTime);

                if (ui.values[0] < totalStartTime) {
                    return false;
                    //console.log(ui.values[0] + ' ezesfsd ' + totalStartTime);
                    //$ ('#slider-range').children(".ui-slider-handle").first().draggable( false);
                }
            }

            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - hours1 * 60;

            if (hours1.length < 10) hours1 = '0' + hours;
            if (minutes1.length < 10) minutes1 = '0' + minutes;

            if (minutes1 == 0) minutes1 = '00';

            // valeur du premier handle du slider
            $("#slider-range").children(".ui-slider-handle").first().text(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - hours2 * 60;

            if (hours2.length < 10) hours2 = '0' + hours;
            if (minutes2.length < 10) minutes2 = '0' + minutes;

            if (minutes2 == 0) minutes2 = '00';

            // Deuxième handle du slider
            $("#slider-range").children(".ui-slider-handle").last().text(hours2 + ':' + minutes2);

            $('.slider-time').html(hours1 + ':' + minutes1);

            $('.slider-time2').html(hours2 + ':' + minutes2);
        }
    });

    $("#slider-range").children(".ui-slider-handle").first().text(min + ':' + pad(minM));
    $("#slider-range").children(".ui-slider-handle").last().text(max + ':' + pad(maxM));

    if ($('#slider-range .heureActuelleDefaut').length && $('#slider-range .heureActuelleDefaut').val()) {
        setHandles(heureActuelle, minuteActuelle, min, max);
    }

    // Arithmétique: on calcule le nombre d'heure total et on crée les intervalles souhaité, on mettra des points ç
    var total = (max - min) * 2; // car 60 minutes = 2 * 30 minutes :)
    var percent = 100 / total;

    for (var x = 1; x < total; x++) {
        $(".ui-slider").append("<span class='dots' style='left:" + x * percent + "%'></span>");
    }

    // Lorsqu'on change le datepicker
    $('#datepicker').datepicker().on("change", function (e) {
        if (!$("#datepicker-altFormat").val()) {
            setHandles(heureActuelle, minuteActuelle, min, max);
        }
    });

    // Ajoute un 0 devant les chiffres pour l'affichage texte !
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }

    // Reinitialise les handles
    function setHandles(heureActuelle, minuteActuelle, min, max) {

        //$("#slider-range").children(".ui-slider-handle").first().text(heureActuelle+':'+ pad(minuteActuelle));
        //$("#slider-range").children(".ui-slider-handle").last().text((heureActuelle+1)+':'+ pad(minuteActuelle));

        //var heureActuelle = $('#slider-range .heureActuelleDefaut').val();
        //console.log( heureActuelle +' '  + min );

        if (heureActuelle > max && heureActuelle < 24 /*((heureActuelle + minuteActuelle) >= (max + maxM)) && maxM */) {
                $("#reservation-dialog-message").dialog({
                    modal: true,
                    buttons: {
                        Ok: function Ok() {
                            $(this).dialog("close");
                        }
                    }
                });
            } else if (heureActuelle >= 0 && heureActuelle < min /*((heureActuelle + minuteActuelle)  < (min + minM))*/) {
                $("#reservation-dialog-message").dialog({
                    modal: true,
                    buttons: {
                        Ok: function Ok() {
                            $(this).dialog("close");
                        }
                    }
                });
                console.log('Ouvre à 9h');
            } else {
            $("#slider-range").slider('option', 'values', [heureActuelle * 60 + minuteActuelle, heureActuelle * 60 + 60 + minuteActuelle]);
            $("#slider-range").children(".ui-slider-handle").first().text(heureActuelle + ':' + pad(minuteActuelle));
            $("#slider-range").children(".ui-slider-handle").last().text(heureActuelle + 1 + ':' + pad(minuteActuelle));
            $('.slider-time').html(heureActuelle + ':' + pad(minuteActuelle));
            $('.slider-time2').html(heureActuelle + 1 + ':' + pad(minuteActuelle));
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/scripts.js":
/*!**********************************!*\
  !*** ./web/assets/js/scripts.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {//var $ = require('jquery');

$(function () {
    $('a.tc-link[title]').tooltip();
});

// Basics features
$(document).ready(function () {

    // $("#main").onepage_scroll();
    $('ul.nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });

    // $('.navbar .dropdown').hover(function() {
    //     $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
    //
    // }, function() {
    //     $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
    //
    // });

    $('.dropdown-toggle').click(function () {
        var location = $(this).attr('href');
        window.location.href = location;
        return false;
    });

    $(window).on("scroll", function () {
        var wn = $(window).scrollTop();
        // if(wn > 30){
        //     $('#mainNav').css({"margin-top" : 0}).fadeIn("slow");
        // }else{
        //     $('#mainNav').css({"margin-top" : 20}).fadeIn("slow");
        // }
        if (wn > 50) {
            $('#mainNav').addClass('menu-blanc');
            $('#mainNav').removeClass('marginTop');
            $('#mainNav').css({ "width": "100%" }).fadeIn("slow");

            //$(".navbar").css({"background-color":"#f8f8f8", "border-color": "#f8f8f8"}).fadeIn();
        } else {
            $('#mainNav').removeClass('menu-blanc');
            $('#mainNav').addClass('marginTop');
            $('#mainNav').css({ "width": "98%" }).fadeIn("slow");

            //$(".navbar").css({"background-color":"transparent", "border-color": "transparent"}).fadeIn();
        }
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 1:
/*!**********************************************************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/main.js ./web/assets/js/scripts.js ./web/assets/js/fixdiv.js ./web/assets/js/bootstrap-touch-slider.js ./web/assets/js/reservation/checkDispoDate.js ***!
  \**********************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/main.js */"./web/assets/js/main.js");
__webpack_require__(/*! ./web/assets/js/scripts.js */"./web/assets/js/scripts.js");
__webpack_require__(/*! ./web/assets/js/fixdiv.js */"./web/assets/js/fixdiv.js");
__webpack_require__(/*! ./web/assets/js/bootstrap-touch-slider.js */"./web/assets/js/bootstrap-touch-slider.js");
module.exports = __webpack_require__(/*! ./web/assets/js/reservation/checkDispoDate.js */"./web/assets/js/reservation/checkDispoDate.js");


/***/ })

},[1]);