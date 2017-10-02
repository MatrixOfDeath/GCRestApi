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

        console.log(todayDate + ' date du jours');
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
        console.log(heureActuelle);
        if (heureActuelle + minuteActuelle >= max + maxM && maxM && heureActuelle < 24) {
            $("#reservation-dialog-message").dialog({
                modal: true,
                buttons: {
                    Ok: function Ok() {
                        $(this).dialog("close");
                    }
                }
            });
        } else if (heureActuelle >= 0 && heureActuelle + minuteActuelle < min + minM) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDViYmJiZWU3OWFiMTNmYmU0YTQiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsImFyck1pbiIsInZhbCIsInNwbGl0IiwiYXJyTWF4IiwiY29uc29sZSIsImxvZyIsIm1pbkgiLCJwYXJzZUludCIsIm1pbk0iLCJtYXhIIiwibWF4TSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwiaGV1cmVBY3R1ZWxsZSIsIm1pbnV0ZUFjdHVlbGxlIiwic2xpZGVyIiwicmFuZ2UiLCJtaW5SYW5nZSIsInN0ZXAiLCJ2YWx1ZXMiLCJzbGlkZSIsInVpIiwidG90YWxTdGFydFRpbWUiLCJob3VyczEiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzMSIsImhvdXJzIiwibWludXRlcyIsImNoaWxkcmVuIiwiZmlyc3QiLCJ0ZXh0IiwiaG91cnMyIiwibWludXRlczIiLCJsYXN0IiwiaHRtbCIsInBhZCIsInNldEhhbmRsZXMiLCJ0b3RhbCIsInBlcmNlbnQiLCJ4IiwiYXBwZW5kIiwibiIsImRpYWxvZyIsIm1vZGFsIiwiYnV0dG9ucyIsIk9rIiwidG9vbHRpcCIsInduIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNURJLFNBQVNBLE1BQVQsR0FBa0I7QUFDZCxRQUFJQyxTQUFTQyxFQUFFLFdBQUYsQ0FBYjtBQUNBLFFBQUlBLEVBQUVDLE1BQUYsRUFBVUMsS0FBVixNQUFxQixHQUFyQixJQUE0QkYsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEtBQXdCLEdBQXhELEVBQTZEO0FBQ3pESixlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLE9BQWIsRUFBc0IsT0FBTyxPQUE3QixFQUFYO0FBQ0FKLFVBQUUsWUFBRixFQUFnQkksR0FBaEIsQ0FBb0IsRUFBQyxXQUFXLFNBQVosRUFBcEI7QUFDSCxLQUhELE1BSUs7QUFDREwsZUFBT0ssR0FBUCxDQUFXLEVBQUMsWUFBWSxVQUFiLEVBQXlCLE9BQU8sS0FBaEMsRUFBWDtBQUNBSixVQUFHLFlBQUgsRUFBa0JJLEdBQWxC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QUNKO0FBQ0osQ0EvS0QsRTs7Ozs7Ozs7Ozs7O0FDREE7OztBQUdBdkQsRUFBRSxZQUFVO0FBQ1JBLE1BQUUsa0JBQUYsRUFBc0J3RixPQUF0QjtBQUNILENBRkQ7O0FBSUE7QUFDQXhGLEVBQUVxQixRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVTs7QUFFeEI7O0FBRUF0QixNQUFFQyxNQUFGLEVBQVVXLEVBQVYsQ0FBYSxRQUFiLEVBQXNCLFlBQVU7QUFDNUIsWUFBSTZFLEtBQUt6RixFQUFFQyxNQUFGLEVBQVVFLFNBQVYsRUFBVDtBQUNBLFlBQUdzRixLQUFLLEVBQVIsRUFBVztBQUNQekYsY0FBRSxVQUFGLEVBQWN5QixRQUFkLENBQXVCLFlBQXZCO0FBQ0E7QUFFSCxTQUpELE1BS0k7QUFDQXpCLGNBQUUsVUFBRixFQUFjMEIsV0FBZCxDQUEwQixZQUExQjtBQUNBO0FBQ0g7QUFDSixLQVhEO0FBWUgsQ0FoQkQsRSIsImZpbGUiOiJhcHAuYTJiYjgwOTA3YWNlMTllNzUxYzkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDViYmJiZWU3OWFiMTNmYmU0YTQiLCJcbiAgICBmdW5jdGlvbiBmaXhEaXYoKSB7XG4gICAgICAgIHZhciAkY2FjaGUgPSAkKCcjZ2V0Rml4ZWQnKTtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdmaXhlZCcsICd0b3AnOiAnMjc1cHgnfSk7XG4gICAgICAgICAgICAkKFwiI3JlbW92ZURpdlwiKS5jc3Moe1wiZGlzcGxheVwiOiBcImluaGVyaXRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgICAgICAkKCBcIiNyZW1vdmVEaXZcIiApLmNzcygge1wiZGlzcGxheVwiOiBcIm5vbmVcIn0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApe1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZpeERpdik7XG4gICAgZml4RGl2KCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvZml4ZGl2LmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCBvcGVuIHRoZSBtb2RhbFxuICAgIGlmKCQoJyNteUJ0bicpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIGJ1dHRvbiB0aGF0IG9wZW5zIHRoZSBtb2RhbFxuICAgICAgICB2YXIgYnRuID0gJCgnI215QnRuJyk7XG4gICAgICAgIGJ0bi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnZGl2I215TW9kYWwnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGlmICgkKCcuY2xvc2UnKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSA8c3Bhbj4gZWxlbWVudCB0aGF0IGNsb3NlcyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIHNwYW4gPSAkKCcuY2xvc2UnKTtcbiAgICAgICAgc3Bhbi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGlkZURpdigpO1xuICAgICAgICAgICAgLy91cGRhdGVEaXYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIiNteU1vZGFsXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdtb2RhbCcpKSB7XG4gICAgICAgICAgICB2YXIgaGlkZVBvcHVwID0gJChlLnRhcmdldCkuYXR0cignaWQnKTtcbiAgICAgICAgICAgICQoJyMnICsgaGlkZVBvcHVwKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG4gICAgLy8gd2luZG93LmNsaWNrIChmdW5jdGlvbihldmVudCkge1xuICAgIC8vICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgLy8gICAgICAgICBtb2RhbC5oaWRlKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZGVEaXYoKSB7XG4gICAgICAgICQoICcjbXlNb2RhbCcgKS5oaWRlKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIjbXlNb2RhbFwiICk7XG5cbiAgICB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL21vZGFsLmpzIiwiLy8gU2xpZGVyXG4kKGZ1bmN0aW9uKCkge1xuICAgIC8qKiBMaXN0ZXMgZXQgZ3JpbGxlcyBzYWxsZXMgKiovXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNsaXN0JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7fSk7XG4gICAgICAgICQoJyNncmlkJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5yZW1vdmVDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnZ3JpZC1ncm91cC1pdGVtJyk7fSk7XG4gICAgfSk7XG5cbiAgICAvKiogSW5pdGlhdGUgZGF0ZXBpY2tlciAqKi9cbiAgICAkKCBcIiNkYXRlcGlja2VyXCIgKS5kYXRlcGlja2VyKHtcbiAgICAgICAgbWF4RGF0ZTogXCIrMTVkXCIsXG4gICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRlZmF1bHREYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlRm9ybWF0OiAnZGQvbW0veXknLFxuICAgICAgICBhbHRGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGFsdEZpZWxkOiAnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JyxcbiAgICAgICAgcmVnaW9uYWw6IFwiZnJcIlxuXG4gICAgfSk7XG4gICAgLy8gR2VzdGlvbiBkZSBsYSByZWdpb24gZnIvZW4gcG9zZSBwcm9ibMOobWVcbiAgIC8vICQoXCIjZGF0ZXBpY2tlclwiKS5kYXRlcGlja2VyKFwib3B0aW9uc1wiLCBcImRlZmF1bHREYXRlXCIsIG5ldyBEYXRlKCkpO1xuXG4gICAgJCgnLnVpLXNsaWRlci1oYW5kbGUnKS5kcmFnZ2FibGUoKTtcblxuICAgIHZhciBhcnJNaW4gPSAkKCcjc2xpZGVyLXJhbmdlIC5taW5IZXVyZScpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgdmFyIGFyck1heCA9ICQoJyNzbGlkZXItcmFuZ2UgLm1heEhldXJlJykudmFsKCkuc3BsaXQoJzonKTtcbiAgICBjb25zb2xlLmxvZyhhcnJNaW4gKycgJysgYXJyTWF4KTtcbiAgICB2YXIgbWluSCA9IHBhcnNlSW50KGFyck1pblswXSwxMCk7XG4gICAgdmFyIG1pbk0gPSBwYXJzZUludChhcnJNaW5bMV0sMTApO1xuICAgIHZhciBtYXhIID0gcGFyc2VJbnQoYXJyTWF4WzBdLDEwKTtcblxuICAgIHZhciBtYXhNID0gcGFyc2VJbnQoYXJyTWF4WzFdLDEwKTtcblxuICAgIHZhciBtaW4gPSBtaW5IOyAvLyBIZXVyZSBtaW4gZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBtYXggPSBtYXhIOyAvLyBIZXVyZSBtYXggZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBkYXRlUGlja2VyRGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgdG9kYXlEYXRlID0gJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKTtcbiAgICAvL2NvbnNvbGUubG9nKHRvZGF5RGF0ZSArICcgZXQgZGF0ZSBwaWNrZXInICsgZGF0ZVBpY2tlckRhdGUpO1xuXG4gICAgaWYgKCEhJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpKSB7XG4gICAgICAgIHZhciBhcnJUaW1lID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgICAgIHZhciBoZXVyZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVswXSwgMTApO1xuICAgICAgICB2YXIgbWludXRlQWN0dWVsbGUgPSBwYXJzZUludChhcnJUaW1lWzFdLDEwKTtcbiAgICAgICAgdG9kYXlEYXRlID0gYXJyVGltZVsyXTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0b2RheURhdGUrICcgZGF0ZSBkdSBqb3VycycpO1xuICAgICAgICBpZiAobWludXRlQWN0dWVsbGUgPCAzMCkge1xuICAgICAgICAgICAgbWludXRlQWN0dWVsbGUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWludXRlQWN0dWVsbGUgPSAzMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcih7XG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBtaW46IG1pbiAqIDYwICsgbWluTSxcbiAgICAgICAgbWF4OiBtYXggKiA2MCArIG1heE0sXG4gICAgICAgIG1pblJhbmdlOiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogW21pbiAqIDYwICsgbWluTSwgbWF4ICogNjAgKyBtYXhNXSxcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cbiAgICAgICAgICAgIC8vIE9uIGxpbWl0ZSBsJ2ludGVydmFsbGUgbWluaW1hbCDDoCAxaCBwb3VyIHVuZSByZXNlcnZhdGlvbiBkZSBzYWxsZVxuICAgICAgICAgICAgaWYgKCAodWkudmFsdWVzWzBdICsgNTUpID49IHVpLnZhbHVlc1sxXSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEYW5zIGxlIGNhcyBvw7kgYydlc3QgbGEgZGF0ZSBkdSBqb3VyICFcbiAgICAgICAgICAgIGlmICgkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpID09IHRvZGF5RGF0ZSB8fCAhJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbFN0YXJ0VGltZSA9IGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codWkudmFsdWVzWzBdICsgJyAnKyB0b3RhbFN0YXJ0VGltZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodWkudmFsdWVzWzBdIDwgdG90YWxTdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgZXplc2ZzZCAnICsgdG90YWxTdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyQgKCcjc2xpZGVyLXJhbmdlJykuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLmRyYWdnYWJsZSggZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXIgZHUgcHJlbWllciBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dCggaG91cnMxKyc6JyttaW51dGVzMSApO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczIubGVuZ3RoIDwgMTApIGhvdXJzMj0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMi5sZW5ndGggPCAxMCkgbWludXRlczIgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMiA9PSAwKSBtaW51dGVzMiA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIERldXhpw6htZSBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KCBob3VyczIrJzonK21pbnV0ZXMyICk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxKyc6JyttaW51dGVzMSk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKGhvdXJzMisnOicrbWludXRlczIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChtaW4rJzonK3BhZChtaW5NKSk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dChtYXgrJzonK3BhZChtYXhNKSk7XG5cblxuXG4gICAgaWYoJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLmxlbmd0aCAmJiAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkgKSB7XG4gICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gQXJpdGhtw6l0aXF1ZTogb24gY2FsY3VsZSBsZSBub21icmUgZCdoZXVyZSB0b3RhbCBldCBvbiBjcsOpZSBsZXMgaW50ZXJ2YWxsZXMgc291aGFpdMOpLCBvbiBtZXR0cmEgZGVzIHBvaW50cyDDp1xuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuXG4gICAgZm9yICh2YXIgeCA9IDE7IHggPCB0b3RhbDsgeCsrKXtcbiAgICAgICAgJChcIi51aS1zbGlkZXJcIiApLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdkb3RzJyBzdHlsZT0nbGVmdDpcIisgeCAqIHBlcmNlbnQgKyBcIiUnPjwvc3Bhbj5cIik7XG5cbiAgICB9XG5cbiAgICAvLyBMb3JzcXUnb24gY2hhbmdlIGxlIGRhdGVwaWNrZXJcbiAgICAkKCcjZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYgKCEkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpKXtcbiAgICAgICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWpvdXRlIHVuIDAgZGV2YW50IGxlcyBjaGlmZnJlcyBwb3VyIGwnYWZmaWNoYWdlIHRleHRlICFcbiAgICBmdW5jdGlvbiBwYWQobikge1xuICAgICAgICByZXR1cm4gKG4gPCAxMCkgPyAoXCIwXCIgKyBuKSA6IG47XG4gICAgfVxuXG4gICAgLy8gUmVpbml0aWFsaXNlIGxlcyBoYW5kbGVzXG4gICAgZnVuY3Rpb24gc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpe1xuXG4gICAgICAgIC8vJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAvLyQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcblxuICAgICAgICAvL3ZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBoZXVyZUFjdHVlbGxlICsnICcgICsgbWluICk7XG4gICAgICAgIGNvbnNvbGUubG9nKGhldXJlQWN0dWVsbGUpO1xuICAgICAgICBpZiAoICgoaGV1cmVBY3R1ZWxsZSArIG1pbnV0ZUFjdHVlbGxlKSA+PSAobWF4ICsgbWF4TSkpICYmIG1heE0mJiAoaGV1cmVBY3R1ZWxsZSA8IDI0KSApIHtcbiAgICAgICAgICAgICQoIFwiI3Jlc2VydmF0aW9uLWRpYWxvZy1tZXNzYWdlXCIgKS5kaWFsb2coe1xuICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgT2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCggdGhpcyApLmRpYWxvZyggXCJjbG9zZVwiICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2UgaWYoIGhldXJlQWN0dWVsbGUgPj0gMCAmJiAoKGhldXJlQWN0dWVsbGUgKyBtaW51dGVBY3R1ZWxsZSkgIDwgKG1pbiArIG1pbk0pKSApe1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ091dnJlIMOgIDloJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcignb3B0aW9uJywgJ3ZhbHVlcycsIFsoaGV1cmVBY3R1ZWxsZSAqIDYwICsgbWludXRlQWN0dWVsbGUpLCAoaGV1cmVBY3R1ZWxsZSAqIDYwKSArIDYwICsgbWludXRlQWN0dWVsbGVdKTtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KGhldXJlQWN0dWVsbGUgKyAnOicgKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoKGhldXJlQWN0dWVsbGUrMSkgICsgJzonICsgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhldXJlQWN0dWVsbGUrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKChoZXVyZUFjdHVlbGxlKzEpKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG5cbiQoZnVuY3Rpb24oKXtcbiAgICAkKCdhLnRjLWxpbmtbdGl0bGVdJykudG9vbHRpcCgpO1xufSk7XG5cbi8vIEJhc2ljcyBmZWF0dXJlc1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuICAgIC8vICQoXCIjbWFpblwiKS5vbmVwYWdlX3Njcm9sbCgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHduID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICBpZih3biA+IDUwKXtcbiAgICAgICAgICAgICQoJyNtYWluTmF2JykuYWRkQ2xhc3MoJ21lbnUtYmxhbmMnKTtcbiAgICAgICAgICAgIC8vJChcIi5uYXZiYXJcIikuY3NzKHtcImJhY2tncm91bmQtY29sb3JcIjpcIiNmOGY4ZjhcIiwgXCJib3JkZXItY29sb3JcIjogXCIjZjhmOGY4XCJ9KS5mYWRlSW4oKTtcblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjbWFpbk5hdicpLnJlbW92ZUNsYXNzKCdtZW51LWJsYW5jJyk7XG4gICAgICAgICAgICAvLyQoXCIubmF2YmFyXCIpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCJ0cmFuc3BhcmVudFwiLCBcImJvcmRlci1jb2xvclwiOiBcInRyYW5zcGFyZW50XCJ9KS5mYWRlSW4oKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==