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

/***/ "./web/assets/js/modal.js":
/*!********************************!*\
  !*** ./web/assets/js/modal.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

//var $ = require('jquery');

// When the user clicks the button, open the modal
if ($('#myBtn').length) {
    // Get the button that opens the modal
    var btn = $('#myBtn');
    btn.click(function () {
        $('div#myModal').show();
    });
}

// When the user clicks on <span> (x), close the modal
if ($('.close').length) {
    // Get the <span> element that closes the modal
    var span = $('.close');
    span.click(function () {
        hideDiv();
        //updateDiv();
    });
}

$("body").on("click", "#myModal", function (e) {
    if ($(e.target).hasClass('modal')) {
        var hidePopup = $(e.target).attr('id');
        $('#' + hidePopup).hide();
    }
});

// When the user clicks anywhere outside of the modal, close it
// window.click (function(event) {
//     if (event.target == modal) {
//         modal.hide();
//     }
// });

function hideDiv() {
    $('#myModal').hide(window.location.href + "#myModal");
}

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
    $(document).ready(function () {
        $('#list').click(function (event) {
            event.preventDefault();
            $('#display-salle .cardSalle').addClass('list-group-item');
        });
        $('#grid').click(function (event) {
            event.preventDefault();
            $('#display-salle .cardSalle').removeClass('list-group-item');
            $('#display-salle .cardSalle').addClass('grid-group-item');
        });
    });

    /** Initiate datepicker **/
    $("#datepicker").datepicker({
        maxDate: "+15d",
        minDate: new Date(),
        defaultDate: new Date(),
        dateFormat: 'dd/mm/yy',
        altFormat: 'yy-mm-dd',
        altField: '#datepicker-altFormat',
        regional: "fr"

        //setDate: new Date()

    });
    // Gestion de la region fr pose problème
    // $("#datepicker").datepicker("options", "defaultDate", new Date());

    $('.ui-slider-handle').draggable();

    var min = 9; // Heure min d'ouverture du magasin
    var max = 21; // Heure max d'ouverture du magasin
    var datePickerDate = $("#datepicker-altFormat").val();
    var today = new Date();
    var todayDate = $("#datepicker-altFormat").val();
    //console.log(todayDate + ' et date picker' + datePickerDate);

    if (!!$('#slider-range .heureActuelleDefaut').val()) {
        var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
        var heureActuelle = parseInt(arrTime[0], 10);
        var minuteActuelle = parseInt(arrTime[1], 10);
        var todayDate = arrTime[2];
        console.log(todayDate + 'date du jours');
        if (minuteActuelle < 30) {
            minuteActuelle = 0;
        } else {
            minuteActuelle = 30;
        }
    }

    $("#slider-range").slider({
        range: true,
        min: min * 60,
        max: max * 60,
        minRange: 60,
        step: 30,
        values: [540, 1320],
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
    $("#slider-range").children(".ui-slider-handle").first().text(min + ':00');
    $("#slider-range").children(".ui-slider-handle").last().text(max + ':00');

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
        if ($("#datepicker-altFormat").val() == '2017-09-22' || !$("#datepicker-altFormat").val()) {
            setHandles(heureActuelle, minuteActuelle, min, max);
        }
    });

    // ajoute un 0 devant les chiffres pour l'affichage texte !
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    // Reinit les handles
    function setHandles(heureActuelle, minuteActuelle, min, max) {

        //$("#slider-range").children(".ui-slider-handle").first().text(heureActuelle+':'+ pad(minuteActuelle));
        //$("#slider-range").children(".ui-slider-handle").last().text((heureActuelle+1)+':'+ pad(minuteActuelle));

        //var heureActuelle = $('#slider-range .heureActuelleDefaut').val();
        console.log(heureActuelle + ' ' + min);
        if (heureActuelle > max && heureActuelle < 24) {
            $("#reservation-dialog-message").dialog({
                modal: true,
                buttons: {
                    Ok: function Ok() {
                        $(this).dialog("close");
                    }
                }
            });
        } else if (heureActuelle >= 0 && heureActuelle < min) {
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

    $(window).on("scroll", function () {
        var wn = $(window).scrollTop();
        if (wn > 80) {
            $('#mainNav').addClass('menu-blanc');
            //$(".navbar").css({"background-color":"#f8f8f8", "border-color": "#f8f8f8"}).fadeIn();
        } else {
            $('#mainNav').removeClass('menu-blanc');
            //$(".navbar").css({"background-color":"transparent", "border-color": "transparent"}).fadeIn();
        }
    });
});

/***/ }),

/***/ 0:
/*!*****************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/scripts.js ./web/assets/js/fixdiv.js ./web/assets/js/modal.js ./web/assets/js/reservation/checkDispoDate.js ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/scripts.js */"./web/assets/js/scripts.js");
__webpack_require__(/*! ./web/assets/js/fixdiv.js */"./web/assets/js/fixdiv.js");
__webpack_require__(/*! ./web/assets/js/modal.js */"./web/assets/js/modal.js");
module.exports = __webpack_require__(/*! ./web/assets/js/reservation/checkDispoDate.js */"./web/assets/js/reservation/checkDispoDate.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGYzZjA3YWE3Mjc1YmIwYzZlMmUiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidmFsIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwic3BsaXQiLCJoZXVyZUFjdHVlbGxlIiwicGFyc2VJbnQiLCJtaW51dGVBY3R1ZWxsZSIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJ0b3RhbFN0YXJ0VGltZSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaG91cnMiLCJtaW51dGVzIiwiY2hpbGRyZW4iLCJmaXJzdCIsInRleHQiLCJob3VyczIiLCJtaW51dGVzMiIsImxhc3QiLCJodG1sIiwic2V0SGFuZGxlcyIsInRvdGFsIiwicGVyY2VudCIsIngiLCJhcHBlbmQiLCJwYWQiLCJuIiwiZGlhbG9nIiwibW9kYWwiLCJidXR0b25zIiwiT2siLCJ0b29sdGlwIiwid24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REksU0FBU0EsTUFBVCxHQUFrQjtBQUNkLFFBQUlDLFNBQVNDLEVBQUUsV0FBRixDQUFiO0FBQ0EsUUFBSUEsRUFBRUMsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXJCLElBQTRCRixFQUFFQyxNQUFGLEVBQVVFLFNBQVYsS0FBd0IsR0FBeEQsRUFBNkQ7QUFDekRKLGVBQU9LLEdBQVAsQ0FBVyxFQUFDLFlBQVksT0FBYixFQUFzQixPQUFPLE9BQTdCLEVBQVg7QUFDQUosVUFBRSxZQUFGLEVBQWdCSSxHQUFoQixDQUFvQixFQUFDLFdBQVcsU0FBWixFQUFwQjtBQUNILEtBSEQsTUFJSztBQUNETCxlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLFVBQWIsRUFBeUIsT0FBTyxLQUFoQyxFQUFYO0FBQ0FKLFVBQUcsWUFBSCxFQUFrQkksR0FBbEIsQ0FBdUIsRUFBQyxXQUFXLE1BQVosRUFBdkI7QUFDSDs7QUFFRCxRQUFJSixF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QUEyQitCLElBQUk3QixjQUFKLENBQXhGO0FBQ0EvQyxjQUFFLGNBQUYsRUFBa0JzRSxJQUFsQixDQUF1QnpCLGdCQUFjLEdBQWQsR0FBbUIrQixJQUFJN0IsY0FBSixDQUExQztBQUNBL0MsY0FBRSxlQUFGLEVBQW1Cc0UsSUFBbkIsQ0FBeUJ6QixnQkFBYyxDQUFmLEdBQWtCLEdBQWxCLEdBQXVCK0IsSUFBSTdCLGNBQUosQ0FBL0M7QUFDSDtBQUNKO0FBQ0osQ0E1SkQsRTs7Ozs7Ozs7Ozs7O0FDREE7OztBQUdBL0MsRUFBRSxZQUFVO0FBQ1JBLE1BQUUsa0JBQUYsRUFBc0JrRixPQUF0QjtBQUNILENBRkQ7O0FBSUE7QUFDQWxGLEVBQUVxQixRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVTs7QUFFeEI7O0FBRUF0QixNQUFFQyxNQUFGLEVBQVVXLEVBQVYsQ0FBYSxRQUFiLEVBQXNCLFlBQVU7QUFDNUIsWUFBSXVFLEtBQUtuRixFQUFFQyxNQUFGLEVBQVVFLFNBQVYsRUFBVDtBQUNBLFlBQUdnRixLQUFLLEVBQVIsRUFBVztBQUNQbkYsY0FBRSxVQUFGLEVBQWN5QixRQUFkLENBQXVCLFlBQXZCO0FBQ0E7QUFFSCxTQUpELE1BS0k7QUFDQXpCLGNBQUUsVUFBRixFQUFjMEIsV0FBZCxDQUEwQixZQUExQjtBQUNBO0FBQ0g7QUFDSixLQVhEO0FBWUgsQ0FoQkQsRSIsImZpbGUiOiJhcHAuY2YyZmYyYWNkOWI5MGM0MDhmNzQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGYzZjA3YWE3Mjc1YmIwYzZlMmUiLCJcbiAgICBmdW5jdGlvbiBmaXhEaXYoKSB7XG4gICAgICAgIHZhciAkY2FjaGUgPSAkKCcjZ2V0Rml4ZWQnKTtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdmaXhlZCcsICd0b3AnOiAnMjc1cHgnfSk7XG4gICAgICAgICAgICAkKFwiI3JlbW92ZURpdlwiKS5jc3Moe1wiZGlzcGxheVwiOiBcImluaGVyaXRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgICAgICAkKCBcIiNyZW1vdmVEaXZcIiApLmNzcygge1wiZGlzcGxheVwiOiBcIm5vbmVcIn0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApe1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZpeERpdik7XG4gICAgZml4RGl2KCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvZml4ZGl2LmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCBvcGVuIHRoZSBtb2RhbFxuICAgIGlmKCQoJyNteUJ0bicpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIGJ1dHRvbiB0aGF0IG9wZW5zIHRoZSBtb2RhbFxuICAgICAgICB2YXIgYnRuID0gJCgnI215QnRuJyk7XG4gICAgICAgIGJ0bi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnZGl2I215TW9kYWwnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGlmICgkKCcuY2xvc2UnKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSA8c3Bhbj4gZWxlbWVudCB0aGF0IGNsb3NlcyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIHNwYW4gPSAkKCcuY2xvc2UnKTtcbiAgICAgICAgc3Bhbi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGlkZURpdigpO1xuICAgICAgICAgICAgLy91cGRhdGVEaXYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIiNteU1vZGFsXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdtb2RhbCcpKSB7XG4gICAgICAgICAgICB2YXIgaGlkZVBvcHVwID0gJChlLnRhcmdldCkuYXR0cignaWQnKTtcbiAgICAgICAgICAgICQoJyMnICsgaGlkZVBvcHVwKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG4gICAgLy8gd2luZG93LmNsaWNrIChmdW5jdGlvbihldmVudCkge1xuICAgIC8vICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgLy8gICAgICAgICBtb2RhbC5oaWRlKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZGVEaXYoKSB7XG4gICAgICAgICQoICcjbXlNb2RhbCcgKS5oaWRlKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIjbXlNb2RhbFwiICk7XG5cbiAgICB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL21vZGFsLmpzIiwiLy8gU2xpZGVyXG4kKGZ1bmN0aW9uKCkge1xuICAgIC8qKiBMaXN0ZXMgZXQgZ3JpbGxlcyBzYWxsZXMgKiovXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNsaXN0JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7fSk7XG4gICAgICAgICQoJyNncmlkJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5yZW1vdmVDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnZ3JpZC1ncm91cC1pdGVtJyk7fSk7XG4gICAgfSk7XG5cbiAgICAvKiogSW5pdGlhdGUgZGF0ZXBpY2tlciAqKi9cbiAgICAkKCBcIiNkYXRlcGlja2VyXCIgKS5kYXRlcGlja2VyKHtcbiAgICAgICAgbWF4RGF0ZTogXCIrMTVkXCIsXG4gICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRlZmF1bHREYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlRm9ybWF0OiAnZGQvbW0veXknLFxuICAgICAgICBhbHRGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGFsdEZpZWxkOiAnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JyxcbiAgICAgICAgcmVnaW9uYWw6IFwiZnJcIlxuXG4gICAgICAgIC8vc2V0RGF0ZTogbmV3IERhdGUoKVxuXG4gICAgfSk7XG4gICAgLy8gR2VzdGlvbiBkZSBsYSByZWdpb24gZnIgcG9zZSBwcm9ibMOobWVcbiAgIC8vICQoXCIjZGF0ZXBpY2tlclwiKS5kYXRlcGlja2VyKFwib3B0aW9uc1wiLCBcImRlZmF1bHREYXRlXCIsIG5ldyBEYXRlKCkpO1xuXG4gICAgJCgnLnVpLXNsaWRlci1oYW5kbGUnKS5kcmFnZ2FibGUoKTtcblxuICAgIHZhciBtaW4gPSA5OyAvLyBIZXVyZSBtaW4gZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBtYXggPSAyMTsgLy8gSGV1cmUgbWF4IGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgZGF0ZVBpY2tlckRhdGUgPSAkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpO1xuICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHRvZGF5RGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgLy9jb25zb2xlLmxvZyh0b2RheURhdGUgKyAnIGV0IGRhdGUgcGlja2VyJyArIGRhdGVQaWNrZXJEYXRlKTtcblxuICAgIGlmICghISQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSkge1xuICAgICAgICB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgaGV1cmVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMF0sIDEwKTtcbiAgICAgICAgdmFyIG1pbnV0ZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVsxXSwxMCk7XG4gICAgICAgIHZhciB0b2RheURhdGUgPSBhcnJUaW1lWzJdO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2RheURhdGUrICdkYXRlIGR1IGpvdXJzJyk7XG4gICAgICAgIGlmIChtaW51dGVBY3R1ZWxsZSA8IDMwKSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9IDMwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKHtcbiAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICAgIG1pbjogbWluICogNjAsXG4gICAgICAgIG1heDogbWF4ICogNjAsXG4gICAgICAgIG1pblJhbmdlOiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogWzU0MCwgMTMyMF0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG4gICAgICAgICAgICAvLyBPbiBsaW1pdGUgbCdpbnRlcnZhbGxlIG1pbmltYWwgw6AgMWggcG91ciB1bmUgcmVzZXJ2YXRpb24gZGUgc2FsbGVcbiAgICAgICAgICAgIGlmICggKHVpLnZhbHVlc1swXSArIDU1KSA+PSB1aS52YWx1ZXNbMV0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGFucyBsZSBjYXMgb8O5IGMnZXN0IGxhIGRhdGUgZHUgam91ciAhXG4gICAgICAgICAgICBpZiAoJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSA9PSB0b2RheURhdGUgfHwgISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxTdGFydFRpbWUgPSBoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgJysgdG90YWxTdGFydFRpbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHVpLnZhbHVlc1swXSA8IHRvdGFsU3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh1aS52YWx1ZXNbMF0gKyAnIGV6ZXNmc2QgJyArIHRvdGFsU3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy8kICgnI3NsaWRlci1yYW5nZScpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS5kcmFnZ2FibGUoIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBob3VyczEgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1swXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMSA9IHVpLnZhbHVlc1swXSAtIChob3VyczEgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmKGhvdXJzMS5sZW5ndGggPCAxMCkgaG91cnMxPSAnMCcgKyBob3VycztcbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxLmxlbmd0aCA8IDEwKSBtaW51dGVzMSA9ICcwJyArIG1pbnV0ZXM7XG5cbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxID09IDApIG1pbnV0ZXMxID0gJzAwJztcblxuICAgICAgICAgICAgLy8gdmFsZXVyIGR1IHByZW1pZXIgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoIGhvdXJzMSsnOicrbWludXRlczEgKTtcblxuICAgICAgICAgICAgdmFyIGhvdXJzMiA9IE1hdGguZmxvb3IodWkudmFsdWVzWzFdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMyID0gdWkudmFsdWVzWzFdIC0gKGhvdXJzMiAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMyLmxlbmd0aCA8IDEwKSBob3VyczI9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczIubGVuZ3RoIDwgMTApIG1pbnV0ZXMyID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczIgPT0gMCkgbWludXRlczIgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyBEZXV4acOobWUgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCggaG91cnMyKyc6JyttaW51dGVzMiApO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhvdXJzMSsnOicrbWludXRlczEpO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbChob3VyczIrJzonK21pbnV0ZXMyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KG1pbisnOjAwJyk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dChtYXgrJzowMCcpO1xuXG5cblxuICAgIGlmKCQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS5sZW5ndGggJiYgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpICkge1xuICAgICAgICBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCk7XG4gICAgfVxuICAgIC8vIEFyaXRobcOpdGlxdWU6IG9uIGNhbGN1bGUgbGUgbm9tYnJlIGQnaGV1cmUgdG90YWwgZXQgb24gY3LDqWUgbGVzIGludGVydmFsbGVzIHNvdWhhaXTDqSwgb24gbWV0dHJhIGRlcyBwb2ludHMgw6dcbiAgICB2YXIgdG90YWwgPSAobWF4IC0gbWluICkgKiAyOyAvLyBjYXIgNjAgbWludXRlcyA9IDIgKiAzMCBtaW51dGVzIDopXG4gICAgdmFyIHBlcmNlbnQgPSAxMDAgLyB0b3RhbDtcblxuICAgIGZvciAodmFyIHggPSAxOyB4IDwgdG90YWw7IHgrKyl7XG4gICAgICAgICQoXCIudWktc2xpZGVyXCIgKS5hcHBlbmQoXCI8c3BhbiBjbGFzcz0nZG90cycgc3R5bGU9J2xlZnQ6XCIrIHggKiBwZXJjZW50ICsgXCIlJz48L3NwYW4+XCIpO1xuXG4gICAgfVxuXG4gICAgLy8gTG9yc3F1J29uIGNoYW5nZSBsZSBkYXRlcGlja2VyXG4gICAgJCgnI2RhdGVwaWNrZXInKS5kYXRlcGlja2VyKCkub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmICgkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpID09ICcyMDE3LTA5LTIyJyB8fCAhJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSl7XG4gICAgICAgICAgICBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGFqb3V0ZSB1biAwIGRldmFudCBsZXMgY2hpZmZyZXMgcG91ciBsJ2FmZmljaGFnZSB0ZXh0ZSAhXG4gICAgZnVuY3Rpb24gcGFkKG4pIHtcbiAgICAgICAgcmV0dXJuIChuIDwgMTApID8gKFwiMFwiICsgbikgOiBuO1xuICAgIH1cbiAgICAvLyBSZWluaXQgbGVzIGhhbmRsZXNcbiAgICBmdW5jdGlvbiBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCl7XG5cbiAgICAgICAgLy8kKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgIC8vJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuXG4gICAgICAgIC8vdmFyIGhldXJlQWN0dWVsbGUgPSAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCBoZXVyZUFjdHVlbGxlICsnICcgICsgbWluICk7XG4gICAgICAgIGlmIChoZXVyZUFjdHVlbGxlID4gbWF4ICYmIGhldXJlQWN0dWVsbGUgPCAyNCkge1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCB0aGlzICkuZGlhbG9nKCBcImNsb3NlXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihoZXVyZUFjdHVlbGxlID49IDAgJiYgaGV1cmVBY3R1ZWxsZSA8IG1pbil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3V2cmUgw6AgOWgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKCdvcHRpb24nLCAndmFsdWVzJywgWyhoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZSksIChoZXVyZUFjdHVlbGxlICogNjApICsgNjAgKyBtaW51dGVBY3R1ZWxsZV0pO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSArICc6JyArIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSAgKyAnOicgKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lMicpLmh0bWwoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcmVzZXJ2YXRpb24vY2hlY2tEaXNwb0RhdGUuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cblxuJChmdW5jdGlvbigpe1xuICAgICQoJ2EudGMtbGlua1t0aXRsZV0nKS50b29sdGlwKCk7XG59KTtcblxuLy8gQmFzaWNzIGZlYXR1cmVzXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICAgLy8gJChcIiNtYWluXCIpLm9uZXBhZ2Vfc2Nyb2xsKCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIixmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGlmKHduID4gODApe1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5hZGRDbGFzcygnbWVudS1ibGFuYycpO1xuICAgICAgICAgICAgLy8kKFwiLm5hdmJhclwiKS5jc3Moe1wiYmFja2dyb3VuZC1jb2xvclwiOlwiI2Y4ZjhmOFwiLCBcImJvcmRlci1jb2xvclwiOiBcIiNmOGY4ZjhcIn0pLmZhZGVJbigpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNtYWluTmF2JykucmVtb3ZlQ2xhc3MoJ21lbnUtYmxhbmMnKTtcbiAgICAgICAgICAgIC8vJChcIi5uYXZiYXJcIikuY3NzKHtcImJhY2tncm91bmQtY29sb3JcIjpcInRyYW5zcGFyZW50XCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwidHJhbnNwYXJlbnRcIn0pLmZhZGVJbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9