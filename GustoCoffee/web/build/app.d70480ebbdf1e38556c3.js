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

    });
    // Gestion de la region fr/en pose problème
    // $("#datepicker").datepicker("options", "defaultDate", new Date());

    $('.ui-slider-handle').draggable();

    var arrMin = $('#slider-range .minHeure').val().split(':');
    var arrMax = $('#slider-range .maxHeure').val().split(':');
    console.log(arrMin + ' ' + arrMax);
    var minH = parseInt(arrMin[0], 10);
    var minM = parseInt(arrMin[1], 10);
    var maxH = parseInt(arrMax[0], 10);

    var maxM = parseInt(arrMax[1], 10);

    var min = minH; // Heure min d'ouverture du magasin
    var max = maxH; // Heure max d'ouverture du magasin
    var datePickerDate = $("#datepicker-altFormat").val();
    var today = new Date();
    var todayDate = $("#datepicker-altFormat").val();
    //console.log(todayDate + ' et date picker' + datePickerDate);

    if (!!$('#slider-range .heureActuelleDefaut').val()) {
        var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
        var heureActuelle = parseInt(arrTime[0], 10);
        var minuteActuelle = parseInt(arrTime[1], 10);
        todayDate = arrTime[2];

        console.log(todayDate + 'date du jours');
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
        if (heureActuelle >= max && heureActuelle < 24) {
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
        if (wn > 50) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGRhZWQ0YjhkMGE3YzI0NWE5YzIiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsImFyck1pbiIsInZhbCIsInNwbGl0IiwiYXJyTWF4IiwiY29uc29sZSIsImxvZyIsIm1pbkgiLCJwYXJzZUludCIsIm1pbk0iLCJtYXhIIiwibWF4TSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwiaGV1cmVBY3R1ZWxsZSIsIm1pbnV0ZUFjdHVlbGxlIiwic2xpZGVyIiwicmFuZ2UiLCJtaW5SYW5nZSIsInN0ZXAiLCJ2YWx1ZXMiLCJzbGlkZSIsInVpIiwidG90YWxTdGFydFRpbWUiLCJob3VyczEiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzMSIsImhvdXJzIiwibWludXRlcyIsImNoaWxkcmVuIiwiZmlyc3QiLCJ0ZXh0IiwiaG91cnMyIiwibWludXRlczIiLCJsYXN0IiwiaHRtbCIsInNldEhhbmRsZXMiLCJ0b3RhbCIsInBlcmNlbnQiLCJ4IiwiYXBwZW5kIiwicGFkIiwibiIsImRpYWxvZyIsIm1vZGFsIiwiYnV0dG9ucyIsIk9rIiwidG9vbHRpcCIsInduIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNURJLFNBQVNBLE1BQVQsR0FBa0I7QUFDZCxRQUFJQyxTQUFTQyxFQUFFLFdBQUYsQ0FBYjtBQUNBLFFBQUlBLEVBQUVDLE1BQUYsRUFBVUMsS0FBVixNQUFxQixHQUFyQixJQUE0QkYsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEtBQXdCLEdBQXhELEVBQTZEO0FBQ3pESixlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLE9BQWIsRUFBc0IsT0FBTyxPQUE3QixFQUFYO0FBQ0FKLFVBQUUsWUFBRixFQUFnQkksR0FBaEIsQ0FBb0IsRUFBQyxXQUFXLFNBQVosRUFBcEI7QUFDSCxLQUhELE1BSUs7QUFDREwsZUFBT0ssR0FBUCxDQUFXLEVBQUMsWUFBWSxVQUFiLEVBQXlCLE9BQU8sS0FBaEMsRUFBWDtBQUNBSixVQUFHLFlBQUgsRUFBa0JJLEdBQWxC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U0FBVixFQUFUO0FBQ0EsWUFBR3NGLEtBQUssRUFBUixFQUFXO0FBQ1B6RixjQUFFLFVBQUYsRUFBY3lCLFFBQWQsQ0FBdUIsWUFBdkI7QUFDQTtBQUVILFNBSkQsTUFLSTtBQUNBekIsY0FBRSxVQUFGLEVBQWMwQixXQUFkLENBQTBCLFlBQTFCO0FBQ0E7QUFDSDtBQUNKLEtBWEQ7QUFZSCxDQWhCRCxFIiwiZmlsZSI6ImFwcC5kNzA0ODBlYmJkZjFlMzg1NTZjMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZGFlZDRiOGQwYTdjMjQ1YTljMiIsIlxuICAgIGZ1bmN0aW9uIGZpeERpdigpIHtcbiAgICAgICAgdmFyICRjYWNoZSA9ICQoJyNnZXRGaXhlZCcpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gOTkxICYmICQod2luZG93KS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ2ZpeGVkJywgJ3RvcCc6ICcyNzVweCd9KTtcbiAgICAgICAgICAgICQoXCIjcmVtb3ZlRGl2XCIpLmNzcyh7XCJkaXNwbGF5XCI6IFwiaW5oZXJpdFwifSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAncmVsYXRpdmUnLCAndG9wJzogJzBweCd9KTtcbiAgICAgICAgICAgICQoIFwiI3JlbW92ZURpdlwiICkuY3NzKCB7XCJkaXNwbGF5XCI6IFwibm9uZVwifSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgOTkxICYmICQod2luZG93KS5zY3JvbGxUb3AoKSA+IDIwMCl7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAncmVsYXRpdmUnLCAndG9wJzogJzBweCd9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICQod2luZG93KS5zY3JvbGwoZml4RGl2KTtcbiAgICBmaXhEaXYoKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBidXR0b24sIG9wZW4gdGhlIG1vZGFsXG4gICAgaWYoJCgnI215QnRuJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgYnV0dG9uIHRoYXQgb3BlbnMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBidG4gPSAkKCcjbXlCdG4nKTtcbiAgICAgICAgYnRuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdkaXYjbXlNb2RhbCcpLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgaWYgKCQoJy5jbG9zZScpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIDxzcGFuPiBlbGVtZW50IHRoYXQgY2xvc2VzIHRoZSBtb2RhbFxuICAgICAgICB2YXIgc3BhbiA9ICQoJy5jbG9zZScpO1xuICAgICAgICBzcGFuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoaWRlRGl2KCk7XG4gICAgICAgICAgICAvL3VwZGF0ZURpdigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiI215TW9kYWxcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ21vZGFsJykpIHtcbiAgICAgICAgICAgIHZhciBoaWRlUG9wdXAgPSAkKGUudGFyZ2V0KS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgJCgnIycgKyBoaWRlUG9wdXApLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICAvLyB3aW5kb3cuY2xpY2sgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICAvLyAgICAgICAgIG1vZGFsLmhpZGUoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlkZURpdigpIHtcbiAgICAgICAgJCggJyNteU1vZGFsJyApLmhpZGUod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiNteU1vZGFsXCIgKTtcblxuICAgIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvbW9kYWwuanMiLCIvLyBTbGlkZXJcbiQoZnVuY3Rpb24oKSB7XG4gICAgLyoqIExpc3RlcyBldCBncmlsbGVzIHNhbGxlcyAqKi9cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2xpc3QnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTt9KTtcbiAgICAgICAgJCgnI2dyaWQnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLnJlbW92ZUNsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdncmlkLWdyb3VwLWl0ZW0nKTt9KTtcbiAgICB9KTtcblxuICAgIC8qKiBJbml0aWF0ZSBkYXRlcGlja2VyICoqL1xuICAgICQoIFwiI2RhdGVwaWNrZXJcIiApLmRhdGVwaWNrZXIoe1xuICAgICAgICBtYXhEYXRlOiBcIisxNWRcIixcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGVmYXVsdERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eScsXG4gICAgICAgIGFsdEZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgYWx0RmllbGQ6ICcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnLFxuICAgICAgICByZWdpb25hbDogXCJmclwiXG5cbiAgICB9KTtcbiAgICAvLyBHZXN0aW9uIGRlIGxhIHJlZ2lvbiBmci9lbiBwb3NlIHByb2Jsw6htZVxuICAgLy8gJChcIiNkYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoXCJvcHRpb25zXCIsIFwiZGVmYXVsdERhdGVcIiwgbmV3IERhdGUoKSk7XG5cbiAgICAkKCcudWktc2xpZGVyLWhhbmRsZScpLmRyYWdnYWJsZSgpO1xuXG4gICAgdmFyIGFyck1pbiA9ICQoJyNzbGlkZXItcmFuZ2UgLm1pbkhldXJlJykudmFsKCkuc3BsaXQoJzonKTtcbiAgICB2YXIgYXJyTWF4ID0gJCgnI3NsaWRlci1yYW5nZSAubWF4SGV1cmUnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIGNvbnNvbGUubG9nKGFyck1pbiArJyAnKyBhcnJNYXgpO1xuICAgIHZhciBtaW5IID0gcGFyc2VJbnQoYXJyTWluWzBdLDEwKTtcbiAgICB2YXIgbWluTT0gcGFyc2VJbnQoYXJyTWluWzFdLDEwKTtcbiAgICB2YXIgbWF4SCA9IHBhcnNlSW50KGFyck1heFswXSwxMCk7XG5cbiAgICB2YXIgbWF4TSA9IHBhcnNlSW50KGFyck1heFsxXSwxMCk7XG5cbiAgICB2YXIgbWluID0gbWluSDsgLy8gSGV1cmUgbWluIGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgbWF4ID0gbWF4SDsgLy8gSGV1cmUgbWF4IGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgZGF0ZVBpY2tlckRhdGUgPSAkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpO1xuICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHRvZGF5RGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgLy9jb25zb2xlLmxvZyh0b2RheURhdGUgKyAnIGV0IGRhdGUgcGlja2VyJyArIGRhdGVQaWNrZXJEYXRlKTtcblxuICAgIGlmICghISQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSkge1xuICAgICAgICB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgaGV1cmVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMF0sIDEwKTtcbiAgICAgICAgdmFyIG1pbnV0ZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVsxXSwxMCk7XG4gICAgICAgIHRvZGF5RGF0ZSA9IGFyclRpbWVbMl07XG5cbiAgICAgICAgY29uc29sZS5sb2codG9kYXlEYXRlKyAnZGF0ZSBkdSBqb3VycycpO1xuICAgICAgICBpZiAobWludXRlQWN0dWVsbGUgPCAzMCkge1xuICAgICAgICAgICAgbWludXRlQWN0dWVsbGUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWludXRlQWN0dWVsbGUgPSAzMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcih7XG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBtaW46IG1pbiAqIDYwICsgbWluTSxcbiAgICAgICAgbWF4OiBtYXggKiA2MCArIG1heE0sXG4gICAgICAgIG1pblJhbmdlOiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogW21pbiAqIDYwICsgbWluTSwgbWF4ICogNjAgKyBtYXhNXSxcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cbiAgICAgICAgICAgIC8vIE9uIGxpbWl0ZSBsJ2ludGVydmFsbGUgbWluaW1hbCDDoCAxaCBwb3VyIHVuZSByZXNlcnZhdGlvbiBkZSBzYWxsZVxuICAgICAgICAgICAgaWYgKCAodWkudmFsdWVzWzBdICsgNTUpID49IHVpLnZhbHVlc1sxXSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEYW5zIGxlIGNhcyBvw7kgYydlc3QgbGEgZGF0ZSBkdSBqb3VyICFcbiAgICAgICAgICAgIGlmICgkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpID09IHRvZGF5RGF0ZSB8fCAhJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbFN0YXJ0VGltZSA9IGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codWkudmFsdWVzWzBdICsgJyAnKyB0b3RhbFN0YXJ0VGltZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodWkudmFsdWVzWzBdIDwgdG90YWxTdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgZXplc2ZzZCAnICsgdG90YWxTdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyQgKCcjc2xpZGVyLXJhbmdlJykuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLmRyYWdnYWJsZSggZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXIgZHUgcHJlbWllciBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dCggaG91cnMxKyc6JyttaW51dGVzMSApO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczIubGVuZ3RoIDwgMTApIGhvdXJzMj0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMi5sZW5ndGggPCAxMCkgbWludXRlczIgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMiA9PSAwKSBtaW51dGVzMiA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIERldXhpw6htZSBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KCBob3VyczIrJzonK21pbnV0ZXMyICk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxKyc6JyttaW51dGVzMSk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKGhvdXJzMisnOicrbWludXRlczIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQobWluKyc6MDAnKTtcbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KG1heCsnOjAwJyk7XG5cblxuXG4gICAgaWYoJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLmxlbmd0aCAmJiAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkgKSB7XG4gICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gQXJpdGhtw6l0aXF1ZTogb24gY2FsY3VsZSBsZSBub21icmUgZCdoZXVyZSB0b3RhbCBldCBvbiBjcsOpZSBsZXMgaW50ZXJ2YWxsZXMgc291aGFpdMOpLCBvbiBtZXR0cmEgZGVzIHBvaW50cyDDp1xuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuXG4gICAgZm9yICh2YXIgeCA9IDE7IHggPCB0b3RhbDsgeCsrKXtcbiAgICAgICAgJChcIi51aS1zbGlkZXJcIiApLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdkb3RzJyBzdHlsZT0nbGVmdDpcIisgeCAqIHBlcmNlbnQgKyBcIiUnPjwvc3Bhbj5cIik7XG5cbiAgICB9XG5cbiAgICAvLyBMb3JzcXUnb24gY2hhbmdlIGxlIGRhdGVwaWNrZXJcbiAgICAkKCcjZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYgKCQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkgPT0gJzIwMTctMDktMjInIHx8ICEkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpKXtcbiAgICAgICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWpvdXRlIHVuIDAgZGV2YW50IGxlcyBjaGlmZnJlcyBwb3VyIGwnYWZmaWNoYWdlIHRleHRlICFcbiAgICBmdW5jdGlvbiBwYWQobikge1xuICAgICAgICByZXR1cm4gKG4gPCAxMCkgPyAoXCIwXCIgKyBuKSA6IG47XG4gICAgfVxuICAgIC8vIFJlaW5pdGlhbGlzZSBsZXMgaGFuZGxlc1xuICAgIGZ1bmN0aW9uIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KXtcblxuICAgICAgICAvLyQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KGhldXJlQWN0dWVsbGUrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgLy8kKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG5cbiAgICAgICAgLy92YXIgaGV1cmVBY3R1ZWxsZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyggaGV1cmVBY3R1ZWxsZSArJyAnICArIG1pbiApO1xuICAgICAgICBpZiAoaGV1cmVBY3R1ZWxsZSA+PSBtYXggJiYgaGV1cmVBY3R1ZWxsZSA8IDI0KSB7XG4gICAgICAgICAgICAkKCBcIiNyZXNlcnZhdGlvbi1kaWFsb2ctbWVzc2FnZVwiICkuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoIHRoaXMgKS5kaWFsb2coIFwiY2xvc2VcIiApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNlIGlmKGhldXJlQWN0dWVsbGUgPj0gMCAmJiBoZXVyZUFjdHVlbGxlIDwgbWluKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXZyZSDDoCA5aCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoJ29wdGlvbicsICd2YWx1ZXMnLCBbKGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlKSwgKGhldXJlQWN0dWVsbGUgKiA2MCkgKyA2MCArIG1pbnV0ZUFjdHVlbGxlXSk7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlICsgJzonICsgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpICArICc6JyArIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lJykuaHRtbChoZXVyZUFjdHVlbGxlKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbCgoaGV1cmVBY3R1ZWxsZSsxKSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuXG4kKGZ1bmN0aW9uKCl7XG4gICAgJCgnYS50Yy1saW5rW3RpdGxlXScpLnRvb2x0aXAoKTtcbn0pO1xuXG4vLyBCYXNpY3MgZmVhdHVyZXNcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAvLyAkKFwiI21haW5cIikub25lcGFnZV9zY3JvbGwoKTtcblxuICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3biA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgaWYod24gPiA1MCl7XG4gICAgICAgICAgICAkKCcjbWFpbk5hdicpLmFkZENsYXNzKCdtZW51LWJsYW5jJyk7XG4gICAgICAgICAgICAvLyQoXCIubmF2YmFyXCIpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZjhmOGY4XCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwiI2Y4ZjhmOFwifSkuZmFkZUluKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5yZW1vdmVDbGFzcygnbWVudS1ibGFuYycpO1xuICAgICAgICAgICAgLy8kKFwiLm5hdmJhclwiKS5jc3Moe1wiYmFja2dyb3VuZC1jb2xvclwiOlwidHJhbnNwYXJlbnRcIiwgXCJib3JkZXItY29sb3JcIjogXCJ0cmFuc3BhcmVudFwifSkuZmFkZUluKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=