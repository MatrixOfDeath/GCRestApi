/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./web/assets/js/fixdiv.js":
/*!*********************************!*\
  !*** ./web/assets/js/fixdiv.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {


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

/***/ }),

/***/ "./web/assets/js/reservation/checkDispoDate.js":
/*!*****************************************************!*\
  !*** ./web/assets/js/reservation/checkDispoDate.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// Slider
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

/***/ }),

/***/ "./web/assets/js/scripts.js":
/*!**********************************!*\
  !*** ./web/assets/js/scripts.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

//var $ = require('jquery');

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

/***/ }),

/***/ 0:
/*!****************************************************************************************************************!*\
  !*** multi ./web/assets/js/scripts.js ./web/assets/js/fixdiv.js ./web/assets/js/reservation/checkDispoDate.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/scripts.js */"./web/assets/js/scripts.js");
__webpack_require__(/*! ./web/assets/js/fixdiv.js */"./web/assets/js/fixdiv.js");
module.exports = __webpack_require__(/*! ./web/assets/js/reservation/checkDispoDate.js */"./web/assets/js/reservation/checkDispoDate.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWNmZjZlYTk0M2U1MDI0YTM5MzMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3NjcmlwdHMuanMiXSwibmFtZXMiOlsiZml4RGl2IiwiJGNhY2hlIiwiJCIsIndpbmRvdyIsIndpZHRoIiwic2Nyb2xsVG9wIiwiY3NzIiwic2Nyb2xsIiwiZG9jdW1lbnQiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwibGVuZ3RoIiwiZGF0ZXBpY2tlciIsIm1heERhdGUiLCJtaW5EYXRlIiwiRGF0ZSIsImRlZmF1bHREYXRlIiwiZGF0ZUZvcm1hdCIsImFsdEZvcm1hdCIsImFsdEZpZWxkIiwicmVnaW9uYWwiLCJkcmFnZ2FibGUiLCJhcnJNaW4iLCJ2YWwiLCJzcGxpdCIsImFyck1heCIsIm1pbkgiLCJwYXJzZUludCIsIm1pbk0iLCJtYXhIIiwibWF4TSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwiaGV1cmVBY3R1ZWxsZSIsIm1pbnV0ZUFjdHVlbGxlIiwic2xpZGVyIiwicmFuZ2UiLCJtaW5SYW5nZSIsInN0ZXAiLCJ2YWx1ZXMiLCJzbGlkZSIsInVpIiwidG90YWxTdGFydFRpbWUiLCJob3VyczEiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzMSIsImhvdXJzIiwibWludXRlcyIsImNoaWxkcmVuIiwiZmlyc3QiLCJ0ZXh0IiwiaG91cnMyIiwibWludXRlczIiLCJsYXN0IiwiaHRtbCIsInBhZCIsInNldEhhbmRsZXMiLCJ0b3RhbCIsInBlcmNlbnQiLCJ4IiwiYXBwZW5kIiwiZSIsIm4iLCJkaWFsb2ciLCJtb2RhbCIsImJ1dHRvbnMiLCJPayIsImNvbnNvbGUiLCJsb2ciLCJ0b29sdGlwIiwicmVhZHkiLCJob3ZlciIsImZpbmQiLCJzdG9wIiwiZGVsYXkiLCJmYWRlSW4iLCJmYWRlT3V0IiwiY2xpY2siLCJsb2NhdGlvbiIsImF0dHIiLCJocmVmIiwid24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REksU0FBU0EsTUFBVCxHQUFrQjtBQUNkLFFBQUlDLFNBQVNDLEVBQUUsV0FBRixDQUFiO0FBQ0EsUUFBSUEsRUFBRUMsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXJCLElBQTRCRixFQUFFQyxNQUFGLEVBQVVFLFNBQVYsS0FBd0IsR0FBeEQsRUFBNkQ7QUFDekRKLGVBQU9LLEdBQVAsQ0FBVyxFQUFDLFlBQVksT0FBYixFQUFzQixPQUFPLE9BQTdCLEVBQVg7QUFDQUosVUFBRSxZQUFGLEVBQWdCSSxHQUFoQixDQUFvQixFQUFDLFdBQVcsU0FBWixFQUFwQjtBQUNILEtBSEQsTUFJSztBQUNETCxlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLFVBQWIsRUFBeUIsT0FBTyxLQUFoQyxFQUFYO0FBQ0FKLFVBQUcsWUFBSCxFQUFrQkksR0FBbEIsQ0FBdUIsRUFBQyxXQUFXLE1BQVosRUFBdkI7QUFDSDs7QUFFRCxRQUFJSixFQUFFQyxNQUFGLEVB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c0IsWUFBVTtBQUM1QixZQUFJZ0YsS0FBS3ZGLEVBQUVDLE1BQUYsRUFBVUUsU0FBVixFQUFUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUdvRixLQUFLLEVBQVIsRUFBVztBQUNQdkYsY0FBRSxVQUFGLEVBQWNVLFFBQWQsQ0FBdUIsWUFBdkI7QUFDQVYsY0FBRSxVQUFGLEVBQWNXLFdBQWQsQ0FBMEIsV0FBMUI7QUFDQVgsY0FBRSxVQUFGLEVBQWNJLEdBQWQsQ0FBa0IsRUFBQyxTQUFVLE1BQVgsRUFBbEIsRUFBc0M2RSxNQUF0QyxDQUE2QyxNQUE3Qzs7QUFFQTtBQUNILFNBTkQsTUFPSTtBQUNBakYsY0FBRSxVQUFGLEVBQWNXLFdBQWQsQ0FBMEIsWUFBMUI7QUFDQVgsY0FBRSxVQUFGLEVBQWNVLFFBQWQsQ0FBdUIsV0FBdkI7QUFDQVYsY0FBRSxVQUFGLEVBQWNJLEdBQWQsQ0FBa0IsRUFBQyxTQUFVLEtBQVgsRUFBbEIsRUFBcUM2RSxNQUFyQyxDQUE0QyxNQUE1Qzs7QUFFQTtBQUNIO0FBQ0osS0FyQkQ7QUFzQkgsQ0FoREQsRSIsImZpbGUiOiJhcHAuYTZmNWJlODU2YzU2MjVhMzczMmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWNmZjZlYTk0M2U1MDI0YTM5MzMiLCJcbiAgICBmdW5jdGlvbiBmaXhEaXYoKSB7XG4gICAgICAgIHZhciAkY2FjaGUgPSAkKCcjZ2V0Rml4ZWQnKTtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdmaXhlZCcsICd0b3AnOiAnMjc1cHgnfSk7XG4gICAgICAgICAgICAkKFwiI3JlbW92ZURpdlwiKS5jc3Moe1wiZGlzcGxheVwiOiBcImluaGVyaXRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgICAgICAkKCBcIiNyZW1vdmVEaXZcIiApLmNzcygge1wiZGlzcGxheVwiOiBcIm5vbmVcIn0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApe1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZpeERpdik7XG4gICAgZml4RGl2KCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvZml4ZGl2LmpzIiwiLy8gU2xpZGVyXG4kKGZ1bmN0aW9uKCkge1xuICAgIC8qKiBMaXN0ZXMgZXQgZ3JpbGxlcyBzYWxsZXMgKiovXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2xpc3QnLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktYW5ub25jZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO1xuICAgICAgICB9KTtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2dyaWQnLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLnJlbW92ZUNsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKS5hZGRDbGFzcygnZ3JpZC1ncm91cC1pdGVtJyk7O1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktYW5ub25jZSAuY2FyZFNhbGxlJykucmVtb3ZlQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpLmFkZENsYXNzKCdncmlkLWdyb3VwLWl0ZW0nKTs7XG4gICAgICAgIC8vICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUsICNkaXNwbGF5LWFubm9uY2UgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdncmlkLWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgaWYoISQoJyNzbGlkZXItcmFuZ2UnKS5sZW5ndGgpe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIEluaXRpYXRlIGRhdGVwaWNrZXIgKiovXG4gICAgJCggXCIjZGF0ZXBpY2tlclwiICkuZGF0ZXBpY2tlcih7XG4gICAgICAgIG1heERhdGU6IFwiKzE1ZFwiLFxuICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkZWZhdWx0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ2RkL21tL3l5JyxcbiAgICAgICAgYWx0Rm9ybWF0OiAneXktbW0tZGQnLFxuICAgICAgICBhbHRGaWVsZDogJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcsXG4gICAgICAgIHJlZ2lvbmFsOiBcImZyXCJcblxuICAgIH0pO1xuICAgIC8vIEdlc3Rpb24gZGUgbGEgcmVnaW9uIGZyL2VuIHBvc2UgcHJvYmzDqG1lXG4gICAvLyAkKFwiI2RhdGVwaWNrZXJcIikuZGF0ZXBpY2tlcihcIm9wdGlvbnNcIiwgXCJkZWZhdWx0RGF0ZVwiLCBuZXcgRGF0ZSgpKTtcblxuICAgICQoJy51aS1zbGlkZXItaGFuZGxlJykuZHJhZ2dhYmxlKCk7XG5cbiAgICB2YXIgYXJyTWluID0gJCgnI3NsaWRlci1yYW5nZSAubWluSGV1cmUnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIHZhciBhcnJNYXggPSAkKCcjc2xpZGVyLXJhbmdlIC5tYXhIZXVyZScpLnZhbCgpLnNwbGl0KCc6Jyk7XG5cbiAgICB2YXIgbWluSCA9IHBhcnNlSW50KGFyck1pblswXSwxMCk7XG4gICAgdmFyIG1pbk0gPSBwYXJzZUludChhcnJNaW5bMV0sMTApO1xuICAgIHZhciBtYXhIID0gcGFyc2VJbnQoYXJyTWF4WzBdLDEwKTtcbiAgICB2YXIgbWF4TSA9IHBhcnNlSW50KGFyck1heFsxXSwxMCk7XG5cbiAgICB2YXIgbWluID0gbWluSDsgLy8gOSBIZXVyZSBtaW4gZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBtYXggPSBtYXhIOyAvLyAyMSBIZXVyZSBtYXggZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBkYXRlUGlja2VyRGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgdG9kYXlEYXRlID0gJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKTtcbiAgICAvL2NvbnNvbGUubG9nKHRvZGF5RGF0ZSArICcgZXQgZGF0ZSBwaWNrZXInICsgZGF0ZVBpY2tlckRhdGUpO1xuXG4gICAgaWYgKCEhJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpKSB7XG4gICAgICAgIHZhciBhcnJUaW1lID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgICAgIHZhciBoZXVyZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVswXSwgMTApO1xuICAgICAgICB2YXIgbWludXRlQWN0dWVsbGUgPSBwYXJzZUludChhcnJUaW1lWzFdLDEwKTtcbiAgICAgICAgdG9kYXlEYXRlID0gYXJyVGltZVsyXTtcblxuICAgICAgICBpZiAobWludXRlQWN0dWVsbGUgPCAzMCkge1xuICAgICAgICAgICAgbWludXRlQWN0dWVsbGUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWludXRlQWN0dWVsbGUgPSAzMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcih7XG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBtaW46IG1pbiAqIDYwICsgbWluTSxcbiAgICAgICAgbWF4OiBtYXggKiA2MCArIG1heE0sXG4gICAgICAgIG1pblJhbmdlOiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogW21pbiAqIDYwICsgbWluTSwgbWF4ICogNjAgKyBtYXhNXSxcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cbiAgICAgICAgICAgIC8vIE9uIGxpbWl0ZSBsJ2ludGVydmFsbGUgbWluaW1hbCDDoCAxaCBwb3VyIHVuZSByZXNlcnZhdGlvbiBkZSBzYWxsZVxuICAgICAgICAgICAgaWYgKCAodWkudmFsdWVzWzBdICsgNTUpID49IHVpLnZhbHVlc1sxXSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEYW5zIGxlIGNhcyBvw7kgYydlc3QgbGEgZGF0ZSBkdSBqb3VyICFcbiAgICAgICAgICAgIGlmICgkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpID09IHRvZGF5RGF0ZSB8fCAhJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbFN0YXJ0VGltZSA9IGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codWkudmFsdWVzWzBdICsgJyAnKyB0b3RhbFN0YXJ0VGltZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodWkudmFsdWVzWzBdIDwgdG90YWxTdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgZXplc2ZzZCAnICsgdG90YWxTdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyQgKCcjc2xpZGVyLXJhbmdlJykuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLmRyYWdnYWJsZSggZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXIgZHUgcHJlbWllciBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dCggaG91cnMxKyc6JyttaW51dGVzMSApO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczIubGVuZ3RoIDwgMTApIGhvdXJzMj0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMi5sZW5ndGggPCAxMCkgbWludXRlczIgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMiA9PSAwKSBtaW51dGVzMiA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIERldXhpw6htZSBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KCBob3VyczIrJzonK21pbnV0ZXMyICk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxKyc6JyttaW51dGVzMSk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKGhvdXJzMisnOicrbWludXRlczIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChtaW4rJzonK3BhZChtaW5NKSk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dChtYXgrJzonK3BhZChtYXhNKSk7XG5cblxuXG4gICAgaWYoJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLmxlbmd0aCAmJiAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkgKSB7XG4gICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICB9XG5cbiAgICAvLyBBcml0aG3DqXRpcXVlOiBvbiBjYWxjdWxlIGxlIG5vbWJyZSBkJ2hldXJlIHRvdGFsIGV0IG9uIGNyw6llIGxlcyBpbnRlcnZhbGxlcyBzb3VoYWl0w6ksIG9uIG1ldHRyYSBkZXMgcG9pbnRzIMOnXG4gICAgdmFyIHRvdGFsID0gKG1heCAtIG1pbiApICogMjsgLy8gY2FyIDYwIG1pbnV0ZXMgPSAyICogMzAgbWludXRlcyA6KVxuICAgIHZhciBwZXJjZW50ID0gMTAwIC8gdG90YWw7XG5cbiAgICBmb3IgKHZhciB4ID0gMTsgeCA8IHRvdGFsOyB4Kyspe1xuICAgICAgICAkKFwiLnVpLXNsaWRlclwiICkuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2RvdHMnIHN0eWxlPSdsZWZ0OlwiKyB4ICogcGVyY2VudCArIFwiJSc+PC9zcGFuPlwiKTtcblxuICAgIH1cblxuICAgIC8vIExvcnNxdSdvbiBjaGFuZ2UgbGUgZGF0ZXBpY2tlclxuICAgICQoJyNkYXRlcGlja2VyJykuZGF0ZXBpY2tlcigpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiAoISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpe1xuICAgICAgICAgICAgc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBam91dGUgdW4gMCBkZXZhbnQgbGVzIGNoaWZmcmVzIHBvdXIgbCdhZmZpY2hhZ2UgdGV4dGUgIVxuICAgIGZ1bmN0aW9uIHBhZChuKSB7XG4gICAgICAgIHJldHVybiAobiA8IDEwKSA/IChcIjBcIiArIG4pIDogbjtcbiAgICB9XG5cbiAgICAvLyBSZWluaXRpYWxpc2UgbGVzIGhhbmRsZXNcbiAgICBmdW5jdGlvbiBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCl7XG5cbiAgICAgICAgLy8kKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgIC8vJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuXG4gICAgICAgIC8vdmFyIGhldXJlQWN0dWVsbGUgPSAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coIGhldXJlQWN0dWVsbGUgKycgJyAgKyBtaW4gKTtcblxuICAgICAgICBpZiAoICBoZXVyZUFjdHVlbGxlID4gbWF4ICAmJiAoaGV1cmVBY3R1ZWxsZSA8IDI0KSAgLyooKGhldXJlQWN0dWVsbGUgKyBtaW51dGVBY3R1ZWxsZSkgPj0gKG1heCArIG1heE0pKSAmJiBtYXhNICovICkge1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCB0aGlzICkuZGlhbG9nKCBcImNsb3NlXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZiggaGV1cmVBY3R1ZWxsZSA+PSAwICYmIGhldXJlQWN0dWVsbGUgPCBtaW4gLyooKGhldXJlQWN0dWVsbGUgKyBtaW51dGVBY3R1ZWxsZSkgIDwgKG1pbiArIG1pbk0pKSovICl7XG4gICAgICAgICAgICAkKCBcIiNyZXNlcnZhdGlvbi1kaWFsb2ctbWVzc2FnZVwiICkuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgIE9rOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3V2cmUgw6AgOWgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKCdvcHRpb24nLCAndmFsdWVzJywgWyhoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZSksIChoZXVyZUFjdHVlbGxlICogNjApICsgNjAgKyBtaW51dGVBY3R1ZWxsZV0pO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSArICc6JyArIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSAgKyAnOicgKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lMicpLmh0bWwoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcmVzZXJ2YXRpb24vY2hlY2tEaXNwb0RhdGUuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbiQoZnVuY3Rpb24oKXtcbiAgICAkKCdhLnRjLWxpbmtbdGl0bGVdJykudG9vbHRpcCgpO1xufSk7XG5cbi8vIEJhc2ljcyBmZWF0dXJlc1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuXG4gICAgLy8gJChcIiNtYWluXCIpLm9uZXBhZ2Vfc2Nyb2xsKCk7XG4gICAgJCgndWwubmF2IGxpLmRyb3Bkb3duJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5zdG9wKHRydWUsIHRydWUpLmRlbGF5KDIwMCkuZmFkZUluKDIwMCk7XG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5zdG9wKHRydWUsIHRydWUpLmRlbGF5KDIwMCkuZmFkZU91dCgyMDApO1xuICAgIH0pO1xuXG4gICAgLy8gJCgnLm5hdmJhciAuZHJvcGRvd24nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmZpcnN0KCkuc3RvcCh0cnVlLCB0cnVlKS5kZWxheSgyNTApLnNsaWRlRG93bigpO1xuICAgIC8vXG4gICAgLy8gfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5maXJzdCgpLnN0b3AodHJ1ZSwgdHJ1ZSkuZGVsYXkoMTAwKS5zbGlkZVVwKCk7XG4gICAgLy9cbiAgICAvLyB9KTtcblxuICAgICQoJy5kcm9wZG93bi10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbG9jYXRpb247XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuXG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIixmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIC8vIGlmKHduID4gMzApe1xuICAgICAgICAvLyAgICAgJCgnI21haW5OYXYnKS5jc3Moe1wibWFyZ2luLXRvcFwiIDogMH0pLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgIC8vIH1lbHNle1xuICAgICAgICAvLyAgICAgJCgnI21haW5OYXYnKS5jc3Moe1wibWFyZ2luLXRvcFwiIDogMjB9KS5mYWRlSW4oXCJzbG93XCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmKHduID4gNTApe1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5hZGRDbGFzcygnbWVudS1ibGFuYycpO1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5yZW1vdmVDbGFzcygnbWFyZ2luVG9wJyk7XG4gICAgICAgICAgICAkKCcjbWFpbk5hdicpLmNzcyh7XCJ3aWR0aFwiIDogXCIxMDAlXCJ9KS5mYWRlSW4oXCJzbG93XCIpO1xuXG4gICAgICAgICAgICAvLyQoXCIubmF2YmFyXCIpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZjhmOGY4XCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwiI2Y4ZjhmOFwifSkuZmFkZUluKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNtYWluTmF2JykucmVtb3ZlQ2xhc3MoJ21lbnUtYmxhbmMnKTtcbiAgICAgICAgICAgICQoJyNtYWluTmF2JykuYWRkQ2xhc3MoJ21hcmdpblRvcCcpO1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5jc3Moe1wid2lkdGhcIiA6IFwiOTglXCJ9KS5mYWRlSW4oXCJzbG93XCIpO1xuXG4gICAgICAgICAgICAvLyQoXCIubmF2YmFyXCIpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCJ0cmFuc3BhcmVudFwiLCBcImJvcmRlci1jb2xvclwiOiBcInRyYW5zcGFyZW50XCJ9KS5mYWRlSW4oKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==