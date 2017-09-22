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
    if ($(window).scrollTop() > 200) {
        $cache.css({ 'position': 'fixed', 'top': '275px' });
        $("#removeDiv").css({ "display": "inherit" });
    } else {
        $cache.css({ 'position': 'relative', 'top': '-90px' });
        $("#removeDiv").css({ "display": "none" });
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

    if (!!$('#slider-range .heureActuelleDefaut').val()) {
        var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
        var heureActuelle = parseInt(arrTime[0], 10);
        var minuteActuelle = arrTime[1];

        if (arrTime[1] < 30) {
            minuteActuelle = '00';
        } else {
            minuteActuelle = '30';
        }
    } else {
        console.log('pas par defaut');
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
            var totalStartTime = heureActuelle * 60 + parseInt(minuteActuelle, 10);
            if (ui.values[0] < totalStartTime) {
                return false;
                console.log(ui.values[0] + ' ezesfsd ' + totalStartTime);
                //$ ('#slider-range').children(".ui-slider-handle").first().draggable( false);
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

        $("#slider-range").children(".ui-slider-handle").first().text(heureActuelle + ':' + minuteActuelle);
        $("#slider-range").children(".ui-slider-handle").last().text(heureActuelle + 1 + ':' + minuteActuelle);
        $('.slider-time').html(heureActuelle + ':' + minuteActuelle);
        $('.slider-time2').html(heureActuelle + 1 + ':' + minuteActuelle);
        //var heureActuelle = $('#slider-range .heureActuelleDefaut').val();
        if (heureActuelle > max && heureActuelle < 0) {
            $("#reservation-dialog-message").dialog({
                modal: true,
                buttons: {
                    Ok: function Ok() {
                        $(this).dialog("close");
                    }
                }
            });
        } else if (heureActuelle > 0 && heureActuelle < min) {
            console.log('Ouvre à 9h');
        } else {

            $("#slider-range").slider('option', 'values', [heureActuelle * 60, heureActuelle * 60 + 60]);
            $("#slider-range").children(".ui-slider-handle").first().text(heureActuelle + ':' + minuteActuelle);
            $("#slider-range").children(".ui-slider-handle").last().text(heureActuelle + 1 + ':' + minuteActuelle);
        }
    }
    // Arithmétique: on calcule le nombre d'heure total et on crée les intervalles souhaité, on mettra des points ç
    var total = (max - min) * 2; // car 60 minutes = 2 * 30 minutes :)
    var percent = 100 / total;
    for (var x = 1; x < total; x++) {
        $(".ui-slider").append("<span class='dots' style='left:" + x * percent + "%'></span>");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQ5MjcyMDRkMmJiMTg1MjZhNTYiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwic2Nyb2xsVG9wIiwiY3NzIiwic2Nyb2xsIiwibGVuZ3RoIiwiYnRuIiwiY2xpY2siLCJzaG93Iiwic3BhbiIsImhpZGVEaXYiLCJvbiIsImUiLCJ0YXJnZXQiLCJoYXNDbGFzcyIsImhpZGVQb3B1cCIsImF0dHIiLCJoaWRlIiwibG9jYXRpb24iLCJocmVmIiwiZG9jdW1lbnQiLCJyZWFkeSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZGF0ZXBpY2tlciIsIm1heERhdGUiLCJtaW5EYXRlIiwiRGF0ZSIsImRlZmF1bHREYXRlIiwiZGF0ZUZvcm1hdCIsImFsdEZvcm1hdCIsImFsdEZpZWxkIiwicmVnaW9uYWwiLCJkcmFnZ2FibGUiLCJtaW4iLCJtYXgiLCJ2YWwiLCJhcnJUaW1lIiwic3BsaXQiLCJoZXVyZUFjdHVlbGxlIiwicGFyc2VJbnQiLCJtaW51dGVBY3R1ZWxsZSIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJ0b3RhbFN0YXJ0VGltZSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaG91cnMiLCJtaW51dGVzIiwiY2hpbGRyZW4iLCJmaXJzdCIsInRleHQiLCJob3VyczIiLCJtaW51dGVzMiIsImxhc3QiLCJodG1sIiwiZGlhbG9nIiwibW9kYWwiLCJidXR0b25zIiwiT2siLCJ0b3RhbCIsInBlcmNlbnQiLCJ4IiwiYXBwZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNURJLFNBQVNBLE1BQVQsR0FBa0I7QUFDZCxRQUFJQyxTQUFTQyxFQUFFLFdBQUYsQ0FBYjtBQUNBLFFBQUlBLEVBQUVDLE1BQUYsRUFBVUMsU0FBVixLQUF3QixHQUE1QixFQUFpQztBQUM3QkgsZUFBT0ksR0FBUCxDQUFXLEVBQUMsWUFBWSxPQUFiLEVBQXNCLE9BQU8sT0FBN0IsRUFBWDtBQUNBSCxVQUFFLFlBQUYsRUFBZ0JHLEdBQWhCLENBQW9CLEVBQUMsV0FBVyxTQUFaLEVBQXBCO0FBQ0gsS0FIRCxNQUlLO0FBQ0RKLGVBQU9JLEdBQVAsQ0FBVyxFQUFDLFlBQVksVUFBYixFQUF5QixPQUFPLE9BQWhDLEVBQVg7QUFDQUgsVUFBRyxZQUFILEVBQWtCRyxHQUFsQixDQUF1QixFQUFDLFdBQVcsTUFBWixFQUF2QjtBQUNIO0FBRUo7QUFDREgsRUFBRUMsTUFBRixFQUFVRyxNQUFWLENBQWlCTixNQUFqQjtBQUNBQSxTOzs7Ozs7Ozs7Ozs7QUNkSjs7QUFFQTtBQUNJLElBQUdFLEVBQUUsUUFBRixFQUFZSyxNQUFmLEVBQXVCO0FBQ25CO0FBQ0EsUUFBSUMsTUFBTU4s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M0IsQ0E3SFMsQ0E2SHFCO0FBQzlCLFFBQUlvQyxVQUFVLE1BQU1ELEtBQXBCO0FBQ0EsU0FBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLEtBQXBCLEVBQTJCRSxHQUEzQixFQUErQjtBQUMzQnpFLFVBQUUsWUFBRixFQUFpQjBFLE1BQWpCLENBQXdCLG9DQUFtQ0QsSUFBSUQsT0FBdkMsR0FBaUQsWUFBekU7QUFFSDtBQUdKLENBcklELEU7Ozs7Ozs7Ozs7OztBQ0RBLDRCIiwiZmlsZSI6ImFwcC5jM2Y0Y2Y2M2NlOTVmMDkxYmM0NS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZDkyNzIwNGQyYmIxODUyNmE1NiIsIlxuICAgIGZ1bmN0aW9uIGZpeERpdigpIHtcbiAgICAgICAgdmFyICRjYWNoZSA9ICQoJyNnZXRGaXhlZCcpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAnZml4ZWQnLCAndG9wJzogJzI3NXB4J30pO1xuICAgICAgICAgICAgJChcIiNyZW1vdmVEaXZcIikuY3NzKHtcImRpc3BsYXlcIjogXCJpbmhlcml0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnLTkwcHgnfSk7XG4gICAgICAgICAgICAkKCBcIiNyZW1vdmVEaXZcIiApLmNzcygge1wiZGlzcGxheVwiOiBcIm5vbmVcIn0gKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICQod2luZG93KS5zY3JvbGwoZml4RGl2KTtcbiAgICBmaXhEaXYoKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBidXR0b24sIG9wZW4gdGhlIG1vZGFsXG4gICAgaWYoJCgnI215QnRuJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgYnV0dG9uIHRoYXQgb3BlbnMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBidG4gPSAkKCcjbXlCdG4nKTtcbiAgICAgICAgYnRuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdkaXYjbXlNb2RhbCcpLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgaWYgKCQoJy5jbG9zZScpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIDxzcGFuPiBlbGVtZW50IHRoYXQgY2xvc2VzIHRoZSBtb2RhbFxuICAgICAgICB2YXIgc3BhbiA9ICQoJy5jbG9zZScpO1xuICAgICAgICBzcGFuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoaWRlRGl2KCk7XG4gICAgICAgICAgICAvL3VwZGF0ZURpdigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiI215TW9kYWxcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ21vZGFsJykpIHtcbiAgICAgICAgICAgIHZhciBoaWRlUG9wdXAgPSAkKGUudGFyZ2V0KS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgJCgnIycgKyBoaWRlUG9wdXApLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICAvLyB3aW5kb3cuY2xpY2sgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICAvLyAgICAgICAgIG1vZGFsLmhpZGUoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlkZURpdigpIHtcbiAgICAgICAgJCggJyNteU1vZGFsJyApLmhpZGUod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiNteU1vZGFsXCIgKTtcblxuICAgIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvbW9kYWwuanMiLCIvLyBTbGlkZXJcbiQoZnVuY3Rpb24oKSB7XG4gICAgLyoqIExpc3RlcyBldCBncmlsbGVzIHNhbGxlcyAqKi9cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2xpc3QnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTt9KTtcbiAgICAgICAgJCgnI2dyaWQnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLnJlbW92ZUNsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdncmlkLWdyb3VwLWl0ZW0nKTt9KTtcbiAgICB9KTtcblxuICAgIC8qKiBJbml0aWF0ZSBkYXRlcGlja2VyICoqL1xuICAgICQoIFwiI2RhdGVwaWNrZXJcIiApLmRhdGVwaWNrZXIoe1xuICAgICAgICBtYXhEYXRlOiBcIisxNWRcIixcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGVmYXVsdERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eScsXG4gICAgICAgIGFsdEZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgYWx0RmllbGQ6ICcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnLFxuICAgICAgICByZWdpb25hbDogXCJmclwiXG5cbiAgICAgICAgLy9zZXREYXRlOiBuZXcgRGF0ZSgpXG5cbiAgICB9KTtcblxuXG4gICAgLy8gR2VzdGlvbiBkZSBsYSByZWdpb24gZnIgcG9zZSBwcm9ibMOobWVcbiAgIC8vICQoXCIjZGF0ZXBpY2tlclwiKS5kYXRlcGlja2VyKFwib3B0aW9uc1wiLCBcImRlZmF1bHREYXRlXCIsIG5ldyBEYXRlKCkpO1xuXG4gICAgJCgnLnVpLXNsaWRlci1oYW5kbGUnKS5kcmFnZ2FibGUoKTtcblxuICAgIHZhciBtaW4gPSA5OyAvLyBIZXVyZSBtaW4gZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBtYXggPSAyMTsgLy8gSGV1cmUgbWF4IGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cblxuICAgIGlmICghISQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSkge1xuICAgICAgICB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgaGV1cmVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMF0sIDEwKTtcbiAgICAgICAgdmFyIG1pbnV0ZUFjdHVlbGxlID0gYXJyVGltZVsxXTtcblxuICAgICAgICBpZiAoYXJyVGltZVsxXSA8IDMwKSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9ICcwMCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9ICczMCc7XG4gICAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coJ3BhcyBwYXIgZGVmYXV0Jyk7XG4gICAgfVxuXG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKHtcbiAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICAgIG1pbjogbWluICogNjAsXG4gICAgICAgIG1heDogbWF4ICogNjAsXG4gICAgICAgIG1pblJhbmdlOiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogWzU0MCwgMTMyMF0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG4gICAgICAgICAgICAvLyBPbiBsaW1pdGUgbCdpbnRlcnZhbGxlIG1pbmltYWwgw6AgMWggcG91ciB1bmUgcmVzZXJ2YXRpb24gZGUgc2FsbGVcbiAgICAgICAgICAgIGlmICggKHVpLnZhbHVlc1swXSArIDU1KSA+PSB1aS52YWx1ZXNbMV0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRvdGFsU3RhcnRUaW1lID0gaGV1cmVBY3R1ZWxsZSo2MCArIHBhcnNlSW50KG1pbnV0ZUFjdHVlbGxlLDEwKTtcbiAgICAgICAgICAgIGlmKHVpLnZhbHVlc1swXSA8IHRvdGFsU3RhcnRUaW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codWkudmFsdWVzWzBdICsgJyBlemVzZnNkICcgKyB0b3RhbFN0YXJ0VGltZSApO1xuICAgICAgICAgICAgICAgIC8vJCAoJyNzbGlkZXItcmFuZ2UnKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkuZHJhZ2dhYmxlKCBmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBob3VyczEgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1swXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMSA9IHVpLnZhbHVlc1swXSAtIChob3VyczEgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmKGhvdXJzMS5sZW5ndGggPCAxMCkgaG91cnMxPSAnMCcgKyBob3VycztcbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxLmxlbmd0aCA8IDEwKSBtaW51dGVzMSA9ICcwJyArIG1pbnV0ZXM7XG5cbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxID09IDApIG1pbnV0ZXMxID0gJzAwJztcblxuICAgICAgICAgICAgLy8gdmFsZXVyIGR1IHByZW1pZXIgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoIGhvdXJzMSsnOicrbWludXRlczEgKTtcblxuICAgICAgICAgICAgdmFyIGhvdXJzMiA9IE1hdGguZmxvb3IodWkudmFsdWVzWzFdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMyID0gdWkudmFsdWVzWzFdIC0gKGhvdXJzMiAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMyLmxlbmd0aCA8IDEwKSBob3VyczI9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczIubGVuZ3RoIDwgMTApIG1pbnV0ZXMyID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczIgPT0gMCkgbWludXRlczIgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyBEZXV4acOobWUgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCggaG91cnMyKyc6JyttaW51dGVzMiApO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhvdXJzMSsnOicrbWludXRlczEpO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbChob3VyczIrJzonK21pbnV0ZXMyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KG1pbisnOjAwJyk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dChtYXgrJzowMCcpO1xuXG5cbiAgICBpZigkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykubGVuZ3RoICYmICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSApIHtcblxuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhldXJlQWN0dWVsbGUrJzonKyBtaW51dGVBY3R1ZWxsZSk7XG4gICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKChoZXVyZUFjdHVlbGxlKzEpKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAvL3ZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICBpZiAoaGV1cmVBY3R1ZWxsZSA+IG1heCAmJiBoZXVyZUFjdHVlbGxlIDwgMCkge1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCB0aGlzICkuZGlhbG9nKCBcImNsb3NlXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihoZXVyZUFjdHVlbGxlID4gMCAmJiBoZXVyZUFjdHVlbGxlIDwgbWluKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXZyZSDDoCA5aCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcignb3B0aW9uJywgJ3ZhbHVlcycsIFtoZXVyZUFjdHVlbGxlICogNjAsIChoZXVyZUFjdHVlbGxlICogNjApICsgNjBdKTtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KGhldXJlQWN0dWVsbGUgKyAnOicgKyBtaW51dGVBY3R1ZWxsZSk7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpICArICc6JyArIG1pbnV0ZUFjdHVlbGxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBBcml0aG3DqXRpcXVlOiBvbiBjYWxjdWxlIGxlIG5vbWJyZSBkJ2hldXJlIHRvdGFsIGV0IG9uIGNyw6llIGxlcyBpbnRlcnZhbGxlcyBzb3VoYWl0w6ksIG9uIG1ldHRyYSBkZXMgcG9pbnRzIMOnXG4gICAgdmFyIHRvdGFsID0gKG1heCAtIG1pbiApICogMjsgLy8gY2FyIDYwIG1pbnV0ZXMgPSAyICogMzAgbWludXRlcyA6KVxuICAgIHZhciBwZXJjZW50ID0gMTAwIC8gdG90YWw7XG4gICAgZm9yICh2YXIgeCA9IDE7IHggPCB0b3RhbDsgeCsrKXtcbiAgICAgICAgJChcIi51aS1zbGlkZXJcIiApLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdkb3RzJyBzdHlsZT0nbGVmdDpcIisgeCAqIHBlcmNlbnQgKyBcIiUnPjwvc3Bhbj5cIik7XG5cbiAgICB9XG5cblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=