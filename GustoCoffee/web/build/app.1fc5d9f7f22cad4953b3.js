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
            // Dans le cas où c'est la date du jour !
            if ($("#datepicker-altFormat").val() == '2017-09-22' || !$("#datepicker-altFormat").val()) {
                var totalStartTime = heureActuelle * 60 + minuteActuelle;
                console.log(ui.values[0] + ' ' + totalStartTime);

                if (ui.values[0] < totalStartTime) {
                    return false;
                    console.log(ui.values[0] + ' ezesfsd ' + totalStartTime);
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

    // Reinit les handles
    function setHandles(heureActuelle, minuteActuelle, min, max) {

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
            $("#slider-range").slider('option', 'values', [heureActuelle * 60 + minuteActuelle, heureActuelle * 60 + 60 + minuteActuelle]);
            $("#slider-range").children(".ui-slider-handle").first().text(heureActuelle + ':' + minuteActuelle);
            $("#slider-range").children(".ui-slider-handle").last().text(heureActuelle + 1 + ':' + minuteActuelle);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDg1NzdiMDBhYzVjNTU3ODlmY2QiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidmFsIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwic3BsaXQiLCJoZXVyZUFjdHVlbGxlIiwicGFyc2VJbnQiLCJtaW51dGVBY3R1ZWxsZSIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJ0b3RhbFN0YXJ0VGltZSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaG91cnMiLCJtaW51dGVzIiwiY2hpbGRyZW4iLCJmaXJzdCIsInRleHQiLCJob3VyczIiLCJtaW51dGVzMiIsImxhc3QiLCJodG1sIiwic2V0SGFuZGxlcyIsInRvdGFsIiwicGVyY2VudCIsIngiLCJhcHBlbmQiLCJkaWFsb2ciLCJtb2RhbCIsImJ1dHRvbnMiLCJPayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVESSxTQUFTQSxNQUFULEdBQWtCO0FBQ2QsUUFBSUMsU0FBU0MsRUFBRSxXQUFGLENBQWI7QUFDQSxRQUFJQSxFQUFFQyxNQUFGLEVBQVVDLEtBQVYsTUFBcUIsR0FBckIsSUFBNEJGLEVBQUVDLE1BQUYsRUFBVUUsU0FBVixLQUF3QixHQUF4RCxFQUE2RDtBQUN6REosZUFBT0ssR0FBUCxDQUFXLEVBQUMsWUFBWSxPQUFiLEVBQXNCLE9BQU8sT0FBN0IsRUFBWDtBQUNBSixVQUFFLFlBQUYsRUFBZ0JJLEdBQWhCLENBQW9CLEVBQUMsV0FBVyxTQUFaLEVBQXBCO0FBQ0gsS0FIRCxNQUlLO0FBQ0RMLGVBQU9LLEdBQVAsQ0FBVyxFQUFDLFlBQVksVUFBYixFQUF5QixPQUFPLEtBQWhDLEVBQVg7QUFDQUosVUFBRyxZQUFILEVBQWtCSSxHQUFsQixDQUF1QixFQUFDLFdBQVcsTUFBWixFQUF2QjtBQUNIOztBQUVELFFBQUlKLEVBQUVDLE1BQUYsRUFBVUMsS0FBVixLQUFv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QW1Ca0QsTUFBbkIsQ0FBMEIsUUFBMUIsRUFBb0MsUUFBcEMsRUFBOEMsQ0FBRUwsZ0JBQWdCLEVBQWhCLEdBQXFCRSxjQUF2QixFQUF5Q0YsZ0JBQWdCLEVBQWpCLEdBQXVCLEVBQXZCLEdBQTRCRSxjQUFwRSxDQUE5QztBQUNBL0MsY0FBRSxlQUFGLEVBQW1CZ0UsUUFBbkIsQ0FBNEIsbUJBQTVCLEVBQWlEQyxLQUFqRCxHQUF5REMsSUFBekQsQ0FBOERyQixnQkFBZ0IsR0FBaEIsR0FBc0JFLGNBQXBGO0FBQ0EvQyxjQUFFLGVBQUYsRUFBbUJnRSxRQUFuQixDQUE0QixtQkFBNUIsRUFBaURLLElBQWpELEdBQXdESCxJQUF4RCxDQUE4RHJCLGdCQUFjLENBQWYsR0FBcUIsR0FBckIsR0FBMkJFLGNBQXhGO0FBQ0g7QUFDSjtBQUNKLENBdkpELEU7Ozs7Ozs7Ozs7OztBQ0RBLDRCIiwiZmlsZSI6ImFwcC4xZmM1ZDlmN2YyMmNhZDQ5NTNiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwODU3N2IwMGFjNWM1NTc4OWZjZCIsIlxuICAgIGZ1bmN0aW9uIGZpeERpdigpIHtcbiAgICAgICAgdmFyICRjYWNoZSA9ICQoJyNnZXRGaXhlZCcpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gOTkxICYmICQod2luZG93KS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ2ZpeGVkJywgJ3RvcCc6ICcyNzVweCd9KTtcbiAgICAgICAgICAgICQoXCIjcmVtb3ZlRGl2XCIpLmNzcyh7XCJkaXNwbGF5XCI6IFwiaW5oZXJpdFwifSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAncmVsYXRpdmUnLCAndG9wJzogJzBweCd9KTtcbiAgICAgICAgICAgICQoIFwiI3JlbW92ZURpdlwiICkuY3NzKCB7XCJkaXNwbGF5XCI6IFwibm9uZVwifSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgOTkxICYmICQod2luZG93KS5zY3JvbGxUb3AoKSA+IDIwMCl7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAncmVsYXRpdmUnLCAndG9wJzogJzBweCd9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICQod2luZG93KS5zY3JvbGwoZml4RGl2KTtcbiAgICBmaXhEaXYoKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBidXR0b24sIG9wZW4gdGhlIG1vZGFsXG4gICAgaWYoJCgnI215QnRuJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgYnV0dG9uIHRoYXQgb3BlbnMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBidG4gPSAkKCcjbXlCdG4nKTtcbiAgICAgICAgYnRuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdkaXYjbXlNb2RhbCcpLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgaWYgKCQoJy5jbG9zZScpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIDxzcGFuPiBlbGVtZW50IHRoYXQgY2xvc2VzIHRoZSBtb2RhbFxuICAgICAgICB2YXIgc3BhbiA9ICQoJy5jbG9zZScpO1xuICAgICAgICBzcGFuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoaWRlRGl2KCk7XG4gICAgICAgICAgICAvL3VwZGF0ZURpdigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiI215TW9kYWxcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ21vZGFsJykpIHtcbiAgICAgICAgICAgIHZhciBoaWRlUG9wdXAgPSAkKGUudGFyZ2V0KS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgJCgnIycgKyBoaWRlUG9wdXApLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICAvLyB3aW5kb3cuY2xpY2sgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICAvLyAgICAgICAgIG1vZGFsLmhpZGUoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlkZURpdigpIHtcbiAgICAgICAgJCggJyNteU1vZGFsJyApLmhpZGUod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiNteU1vZGFsXCIgKTtcblxuICAgIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvbW9kYWwuanMiLCIvLyBTbGlkZXJcbiQoZnVuY3Rpb24oKSB7XG4gICAgLyoqIExpc3RlcyBldCBncmlsbGVzIHNhbGxlcyAqKi9cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2xpc3QnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTt9KTtcbiAgICAgICAgJCgnI2dyaWQnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLnJlbW92ZUNsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdncmlkLWdyb3VwLWl0ZW0nKTt9KTtcbiAgICB9KTtcblxuICAgIC8qKiBJbml0aWF0ZSBkYXRlcGlja2VyICoqL1xuICAgICQoIFwiI2RhdGVwaWNrZXJcIiApLmRhdGVwaWNrZXIoe1xuICAgICAgICBtYXhEYXRlOiBcIisxNWRcIixcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGVmYXVsdERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eScsXG4gICAgICAgIGFsdEZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgYWx0RmllbGQ6ICcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnLFxuICAgICAgICByZWdpb25hbDogXCJmclwiXG5cbiAgICAgICAgLy9zZXREYXRlOiBuZXcgRGF0ZSgpXG5cbiAgICB9KTtcbiAgICAvLyBHZXN0aW9uIGRlIGxhIHJlZ2lvbiBmciBwb3NlIHByb2Jsw6htZVxuICAgLy8gJChcIiNkYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoXCJvcHRpb25zXCIsIFwiZGVmYXVsdERhdGVcIiwgbmV3IERhdGUoKSk7XG5cbiAgICAkKCcudWktc2xpZGVyLWhhbmRsZScpLmRyYWdnYWJsZSgpO1xuXG4gICAgdmFyIG1pbiA9IDk7IC8vIEhldXJlIG1pbiBkJ291dmVydHVyZSBkdSBtYWdhc2luXG4gICAgdmFyIG1heCA9IDIxOyAvLyBIZXVyZSBtYXggZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBkYXRlUGlja2VyRGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgdG9kYXlEYXRlID0gJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKTtcbiAgICAvL2NvbnNvbGUubG9nKHRvZGF5RGF0ZSArICcgZXQgZGF0ZSBwaWNrZXInICsgZGF0ZVBpY2tlckRhdGUpO1xuXG4gICAgaWYgKCEhJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpKSB7XG4gICAgICAgIHZhciBhcnJUaW1lID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgICAgIHZhciBoZXVyZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVswXSwgMTApO1xuICAgICAgICB2YXIgbWludXRlQWN0dWVsbGUgPSBwYXJzZUludChhcnJUaW1lWzFdLDEwKTtcbiAgICAgICAgdmFyIHRvZGF5RGF0ZSA9IGFyclRpbWVbMl07XG4gICAgICAgIGNvbnNvbGUubG9nKHRvZGF5RGF0ZSsgJ2RhdGUgZHUgam91cnMnKTtcbiAgICAgICAgaWYgKG1pbnV0ZUFjdHVlbGxlIDwgMzApIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMzA7XG4gICAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coJ3BhcyBwYXIgZGVmYXV0Jyk7XG4gICAgfVxuXG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKHtcbiAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICAgIG1pbjogbWluICogNjAsXG4gICAgICAgIG1heDogbWF4ICogNjAsXG4gICAgICAgIG1pblJhbmdlOiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogWzU0MCwgMTMyMF0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG4gICAgICAgICAgICAvLyBPbiBsaW1pdGUgbCdpbnRlcnZhbGxlIG1pbmltYWwgw6AgMWggcG91ciB1bmUgcmVzZXJ2YXRpb24gZGUgc2FsbGVcbiAgICAgICAgICAgIGlmICggKHVpLnZhbHVlc1swXSArIDU1KSA+PSB1aS52YWx1ZXNbMV0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGFucyBsZSBjYXMgb8O5IGMnZXN0IGxhIGRhdGUgZHUgam91ciAhXG4gICAgICAgICAgICBpZiAoJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSA9PSAnMjAxNy0wOS0yMicgfHwgISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxTdGFydFRpbWUgPSBoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1aS52YWx1ZXNbMF0gKyAnICcrIHRvdGFsU3RhcnRUaW1lKTtcblxuICAgICAgICAgICAgICAgIGlmICh1aS52YWx1ZXNbMF0gPCB0b3RhbFN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgZXplc2ZzZCAnICsgdG90YWxTdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyQgKCcjc2xpZGVyLXJhbmdlJykuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLmRyYWdnYWJsZSggZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXIgZHUgcHJlbWllciBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dCggaG91cnMxKyc6JyttaW51dGVzMSApO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczIubGVuZ3RoIDwgMTApIGhvdXJzMj0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMi5sZW5ndGggPCAxMCkgbWludXRlczIgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMiA9PSAwKSBtaW51dGVzMiA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIERldXhpw6htZSBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KCBob3VyczIrJzonK21pbnV0ZXMyICk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxKyc6JyttaW51dGVzMSk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKGhvdXJzMisnOicrbWludXRlczIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQobWluKyc6MDAnKTtcbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KG1heCsnOjAwJyk7XG5cblxuXG4gICAgaWYoJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLmxlbmd0aCAmJiAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkgKSB7XG4gICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gQXJpdGhtw6l0aXF1ZTogb24gY2FsY3VsZSBsZSBub21icmUgZCdoZXVyZSB0b3RhbCBldCBvbiBjcsOpZSBsZXMgaW50ZXJ2YWxsZXMgc291aGFpdMOpLCBvbiBtZXR0cmEgZGVzIHBvaW50cyDDp1xuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuICAgIGZvciAodmFyIHggPSAxOyB4IDwgdG90YWw7IHgrKyl7XG4gICAgICAgICQoXCIudWktc2xpZGVyXCIgKS5hcHBlbmQoXCI8c3BhbiBjbGFzcz0nZG90cycgc3R5bGU9J2xlZnQ6XCIrIHggKiBwZXJjZW50ICsgXCIlJz48L3NwYW4+XCIpO1xuXG4gICAgfVxuXG4gICAgLy8gTG9yc3F1J29uIGNoYW5nZSBsZSBkYXRlcGlja2VyXG4gICAgJCgnI2RhdGVwaWNrZXInKS5kYXRlcGlja2VyKCkub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmICgkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpID09ICcyMDE3LTA5LTIyJyB8fCAhJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSl7XG4gICAgICAgICAgICBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJlaW5pdCBsZXMgaGFuZGxlc1xuICAgIGZ1bmN0aW9uIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KXtcblxuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhldXJlQWN0dWVsbGUrJzonKyBtaW51dGVBY3R1ZWxsZSk7XG4gICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKChoZXVyZUFjdHVlbGxlKzEpKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAvL3ZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICBpZiAoaGV1cmVBY3R1ZWxsZSA+IG1heCAmJiBoZXVyZUFjdHVlbGxlIDwgMCkge1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCB0aGlzICkuZGlhbG9nKCBcImNsb3NlXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihoZXVyZUFjdHVlbGxlID4gMCAmJiBoZXVyZUFjdHVlbGxlIDwgbWluKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXZyZSDDoCA5aCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoJ29wdGlvbicsICd2YWx1ZXMnLCBbKGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlKSwgKGhldXJlQWN0dWVsbGUgKiA2MCkgKyA2MCArIG1pbnV0ZUFjdHVlbGxlXSk7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlICsgJzonICsgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSAgKyAnOicgKyBtaW51dGVBY3R1ZWxsZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==