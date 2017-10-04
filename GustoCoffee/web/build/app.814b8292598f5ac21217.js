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

    if (!$('#slider-range').length) {
        console.log('no slider !');
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
    console.log(arrMin + ' ' + arrMax);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2RiZTY3NTU3NTQ3MWE4OTczN2EiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjb25zb2xlIiwibG9nIiwiZGF0ZXBpY2tlciIsIm1heERhdGUiLCJtaW5EYXRlIiwiRGF0ZSIsImRlZmF1bHREYXRlIiwiZGF0ZUZvcm1hdCIsImFsdEZvcm1hdCIsImFsdEZpZWxkIiwicmVnaW9uYWwiLCJkcmFnZ2FibGUiLCJhcnJNaW4iLCJ2YWwiLCJzcGxpdCIsImFyck1heCIsIm1pbkgiLCJwYXJzZUludCIsIm1pbk0iLCJtYXhIIiwibWF4TSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwiaGV1cmVBY3R1ZWxsZSIsIm1pbnV0ZUFjdHVlbGxlIiwic2xpZGVyIiwicmFuZ2UiLCJtaW5SYW5nZSIsInN0ZXAiLCJ2YWx1ZXMiLCJzbGlkZSIsInVpIiwidG90YWxTdGFydFRpbWUiLCJob3VyczEiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzMSIsImhvdXJzIiwibWludXRlcyIsImNoaWxkcmVuIiwiZmlyc3QiLCJ0ZXh0IiwiaG91cnMyIiwibWludXRlczIiLCJsYXN0IiwiaHRtbCIsInBhZCIsInNldEhhbmRsZXMiLCJ0b3RhbCIsInBlcmNlbnQiLCJ4IiwiYXBwZW5kIiwibiIsImRpYWxvZyIsIm1vZGFsIiwiYnV0dG9ucyIsIk9rIiwidG9vbHRpcCIsInduIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNURJLFNBQVNBLE1BQVQsR0FBa0I7QUFDZCxRQUFJQyxTQUFTQyxFQUFFLFdBQUYsQ0FBYjtBQUNBLFFBQUlBLEVBQUVDLE1BQUYsRUFBVUMsS0FBVixNQUFxQixHQUFyQixJQUE0QkYsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEtBQXdCLEdBQXhELEVBQTZEO0FBQ3pESixlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLE9BQWIsRUFBc0IsT0FBTyxPQUE3QixFQUFYO0FBQ0FKLFVBQUUsWUFBRixFQUFnQkksR0FBaEIsQ0FBb0IsRUFBQyxXQUFXLFNBQVosRUFBcEI7QUFDSCxLQUhELE1BSUs7QUFDREwsZUFBT0ssR0FBUCxDQUFXLEVBQUMsWUFBWSxVQUFiLEVBQXlCLE9BQU8sS0FBaEMsRUFBWDtBQUNBSixVQUFHLFlBQUgsRUFBa0JJLEdBQWxC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ZUFBRixFQUFtQjRFLElBQW5CLENBQXlCdEIsZ0JBQWMsQ0FBZixHQUFrQixHQUFsQixHQUF1QnVCLElBQUl0QixjQUFKLENBQS9DO0FBQ0g7QUFDSjtBQUNKLENBckxELEU7Ozs7Ozs7Ozs7OztBQ0RBOzs7QUFHQXZELEVBQUUsWUFBVTtBQUNSQSxNQUFFLGtCQUFGLEVBQXNCd0YsT0FBdEI7QUFDSCxDQUZEOztBQUlBO0FBQ0F4RixFQUFFcUIsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVU7O0FBRXhCOztBQUVBdEIsTUFBRUMsTUFBRixFQUFVVyxFQUFWLENBQWEsUUFBYixFQUFzQixZQUFVO0FBQzVCLFlBQUk2RSxLQUFLekYsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEVBQVQ7QUFDQSxZQUFHc0YsS0FBSyxFQUFSLEVBQVc7QUFDUHpGLGNBQUUsVUFBRixFQUFjeUIsUUFBZCxDQUF1QixZQUF2QjtBQUNBO0FBRUgsU0FKRCxNQUtJO0FBQ0F6QixjQUFFLFVBQUYsRUFBYzBCLFdBQWQsQ0FBMEIsWUFBMUI7QUFDQTtBQUNIO0FBQ0osS0FYRDtBQVlILENBaEJELEUiLCJmaWxlIjoiYXBwLjgxNGI4MjkyNTk4ZjVhYzIxMjE3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNkYmU2NzU1NzU0NzFhODk3MzdhIiwiXG4gICAgZnVuY3Rpb24gZml4RGl2KCkge1xuICAgICAgICB2YXIgJGNhY2hlID0gJCgnI2dldEZpeGVkJyk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA5OTEgJiYgJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAnZml4ZWQnLCAndG9wJzogJzI3NXB4J30pO1xuICAgICAgICAgICAgJChcIiNyZW1vdmVEaXZcIikuY3NzKHtcImRpc3BsYXlcIjogXCJpbmhlcml0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnMHB4J30pO1xuICAgICAgICAgICAgJCggXCIjcmVtb3ZlRGl2XCIgKS5jc3MoIHtcImRpc3BsYXlcIjogXCJub25lXCJ9ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTEgJiYgJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKXtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnMHB4J30pO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmaXhEaXYpO1xuICAgIGZpeERpdigpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2ZpeGRpdi5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGJ1dHRvbiwgb3BlbiB0aGUgbW9kYWxcbiAgICBpZigkKCcjbXlCdG4nKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBidXR0b24gdGhhdCBvcGVucyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIGJ0biA9ICQoJyNteUJ0bicpO1xuICAgICAgICBidG4uY2xpY2soIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2RpdiNteU1vZGFsJykuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbiAgICBpZiAoJCgnLmNsb3NlJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgPHNwYW4+IGVsZW1lbnQgdGhhdCBjbG9zZXMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBzcGFuID0gJCgnLmNsb3NlJyk7XG4gICAgICAgIHNwYW4uY2xpY2soIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZGVEaXYoKTtcbiAgICAgICAgICAgIC8vdXBkYXRlRGl2KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIjbXlNb2RhbFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygnbW9kYWwnKSkge1xuICAgICAgICAgICAgdmFyIGhpZGVQb3B1cCA9ICQoZS50YXJnZXQpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAkKCcjJyArIGhpZGVQb3B1cCkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxuICAgIC8vIHdpbmRvdy5jbGljayAoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAvLyAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBtb2RhbCkge1xuICAgIC8vICAgICAgICAgbW9kYWwuaGlkZSgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICBmdW5jdGlvbiBoaWRlRGl2KCkge1xuICAgICAgICAkKCAnI215TW9kYWwnICkuaGlkZSh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiI215TW9kYWxcIiApO1xuXG4gICAgfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIi8vIFNsaWRlclxuJChmdW5jdGlvbigpIHtcbiAgICAvKiogTGlzdGVzIGV0IGdyaWxsZXMgc2FsbGVzICoqL1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbGlzdCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO30pO1xuICAgICAgICAkKCcjZ3JpZCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykucmVtb3ZlQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2dyaWQtZ3JvdXAtaXRlbScpO30pO1xuICAgIH0pO1xuXG4gICAgaWYoISQoJyNzbGlkZXItcmFuZ2UnKS5sZW5ndGgpe1xuICAgICAgICBjb25zb2xlLmxvZygnbm8gc2xpZGVyICEnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBJbml0aWF0ZSBkYXRlcGlja2VyICoqL1xuICAgICQoIFwiI2RhdGVwaWNrZXJcIiApLmRhdGVwaWNrZXIoe1xuICAgICAgICBtYXhEYXRlOiBcIisxNWRcIixcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGVmYXVsdERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eScsXG4gICAgICAgIGFsdEZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgYWx0RmllbGQ6ICcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnLFxuICAgICAgICByZWdpb25hbDogXCJmclwiXG5cbiAgICB9KTtcbiAgICAvLyBHZXN0aW9uIGRlIGxhIHJlZ2lvbiBmci9lbiBwb3NlIHByb2Jsw6htZVxuICAgLy8gJChcIiNkYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoXCJvcHRpb25zXCIsIFwiZGVmYXVsdERhdGVcIiwgbmV3IERhdGUoKSk7XG5cbiAgICAkKCcudWktc2xpZGVyLWhhbmRsZScpLmRyYWdnYWJsZSgpO1xuXG4gICAgdmFyIGFyck1pbiA9ICQoJyNzbGlkZXItcmFuZ2UgLm1pbkhldXJlJykudmFsKCkuc3BsaXQoJzonKTtcbiAgICB2YXIgYXJyTWF4ID0gJCgnI3NsaWRlci1yYW5nZSAubWF4SGV1cmUnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIGNvbnNvbGUubG9nKGFyck1pbiArJyAnKyBhcnJNYXgpO1xuICAgIHZhciBtaW5IID0gcGFyc2VJbnQoYXJyTWluWzBdLDEwKTtcbiAgICB2YXIgbWluTSA9IHBhcnNlSW50KGFyck1pblsxXSwxMCk7XG4gICAgdmFyIG1heEggPSBwYXJzZUludChhcnJNYXhbMF0sMTApO1xuXG4gICAgdmFyIG1heE0gPSBwYXJzZUludChhcnJNYXhbMV0sMTApO1xuXG4gICAgdmFyIG1pbiA9IG1pbkg7IC8vIDkgSGV1cmUgbWluIGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgbWF4ID0gbWF4SDsgLy8gMjEgSGV1cmUgbWF4IGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgZGF0ZVBpY2tlckRhdGUgPSAkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpO1xuICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHRvZGF5RGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgLy9jb25zb2xlLmxvZyh0b2RheURhdGUgKyAnIGV0IGRhdGUgcGlja2VyJyArIGRhdGVQaWNrZXJEYXRlKTtcblxuICAgIGlmICghISQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSkge1xuICAgICAgICB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgaGV1cmVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMF0sIDEwKTtcbiAgICAgICAgdmFyIG1pbnV0ZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVsxXSwxMCk7XG4gICAgICAgIHRvZGF5RGF0ZSA9IGFyclRpbWVbMl07XG5cbiAgICAgICAgY29uc29sZS5sb2codG9kYXlEYXRlKyAnIGRhdGUgZHUgam91cnMnKTtcbiAgICAgICAgaWYgKG1pbnV0ZUFjdHVlbGxlIDwgMzApIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMzA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgbWluOiBtaW4gKiA2MCArIG1pbk0sXG4gICAgICAgIG1heDogbWF4ICogNjAgKyBtYXhNLFxuICAgICAgICBtaW5SYW5nZTogNjAsXG4gICAgICAgIHN0ZXA6IDMwLFxuICAgICAgICB2YWx1ZXM6IFttaW4gKiA2MCArIG1pbk0sIG1heCAqIDYwICsgbWF4TV0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG4gICAgICAgICAgICAvLyBPbiBsaW1pdGUgbCdpbnRlcnZhbGxlIG1pbmltYWwgw6AgMWggcG91ciB1bmUgcmVzZXJ2YXRpb24gZGUgc2FsbGVcbiAgICAgICAgICAgIGlmICggKHVpLnZhbHVlc1swXSArIDU1KSA+PSB1aS52YWx1ZXNbMV0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGFucyBsZSBjYXMgb8O5IGMnZXN0IGxhIGRhdGUgZHUgam91ciAhXG4gICAgICAgICAgICBpZiAoJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSA9PSB0b2RheURhdGUgfHwgISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxTdGFydFRpbWUgPSBoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgJysgdG90YWxTdGFydFRpbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHVpLnZhbHVlc1swXSA8IHRvdGFsU3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh1aS52YWx1ZXNbMF0gKyAnIGV6ZXNmc2QgJyArIHRvdGFsU3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy8kICgnI3NsaWRlci1yYW5nZScpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS5kcmFnZ2FibGUoIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBob3VyczEgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1swXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMSA9IHVpLnZhbHVlc1swXSAtIChob3VyczEgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmKGhvdXJzMS5sZW5ndGggPCAxMCkgaG91cnMxPSAnMCcgKyBob3VycztcbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxLmxlbmd0aCA8IDEwKSBtaW51dGVzMSA9ICcwJyArIG1pbnV0ZXM7XG5cbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxID09IDApIG1pbnV0ZXMxID0gJzAwJztcblxuICAgICAgICAgICAgLy8gdmFsZXVyIGR1IHByZW1pZXIgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoIGhvdXJzMSsnOicrbWludXRlczEgKTtcblxuICAgICAgICAgICAgdmFyIGhvdXJzMiA9IE1hdGguZmxvb3IodWkudmFsdWVzWzFdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMyID0gdWkudmFsdWVzWzFdIC0gKGhvdXJzMiAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMyLmxlbmd0aCA8IDEwKSBob3VyczI9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczIubGVuZ3RoIDwgMTApIG1pbnV0ZXMyID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczIgPT0gMCkgbWludXRlczIgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyBEZXV4acOobWUgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCggaG91cnMyKyc6JyttaW51dGVzMiApO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhvdXJzMSsnOicrbWludXRlczEpO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbChob3VyczIrJzonK21pbnV0ZXMyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQobWluKyc6JytwYWQobWluTSkpO1xuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQobWF4Kyc6JytwYWQobWF4TSkpO1xuXG5cblxuICAgIGlmKCQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS5sZW5ndGggJiYgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpICkge1xuICAgICAgICBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCk7XG4gICAgfVxuXG4gICAgLy8gQXJpdGhtw6l0aXF1ZTogb24gY2FsY3VsZSBsZSBub21icmUgZCdoZXVyZSB0b3RhbCBldCBvbiBjcsOpZSBsZXMgaW50ZXJ2YWxsZXMgc291aGFpdMOpLCBvbiBtZXR0cmEgZGVzIHBvaW50cyDDp1xuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuXG4gICAgZm9yICh2YXIgeCA9IDE7IHggPCB0b3RhbDsgeCsrKXtcbiAgICAgICAgJChcIi51aS1zbGlkZXJcIiApLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdkb3RzJyBzdHlsZT0nbGVmdDpcIisgeCAqIHBlcmNlbnQgKyBcIiUnPjwvc3Bhbj5cIik7XG5cbiAgICB9XG5cbiAgICAvLyBMb3JzcXUnb24gY2hhbmdlIGxlIGRhdGVwaWNrZXJcbiAgICAkKCcjZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYgKCEkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpKXtcbiAgICAgICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWpvdXRlIHVuIDAgZGV2YW50IGxlcyBjaGlmZnJlcyBwb3VyIGwnYWZmaWNoYWdlIHRleHRlICFcbiAgICBmdW5jdGlvbiBwYWQobikge1xuICAgICAgICByZXR1cm4gKG4gPCAxMCkgPyAoXCIwXCIgKyBuKSA6IG47XG4gICAgfVxuXG4gICAgLy8gUmVpbml0aWFsaXNlIGxlcyBoYW5kbGVzXG4gICAgZnVuY3Rpb24gc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpe1xuXG4gICAgICAgIC8vJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAvLyQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcblxuICAgICAgICAvL3ZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBoZXVyZUFjdHVlbGxlICsnICcgICsgbWluICk7XG4gICAgICAgIGNvbnNvbGUubG9nKGhldXJlQWN0dWVsbGUpO1xuICAgICAgICBpZiAoICBoZXVyZUFjdHVlbGxlID4gbWF4ICAmJiAoaGV1cmVBY3R1ZWxsZSA8IDI0KSAgLyooKGhldXJlQWN0dWVsbGUgKyBtaW51dGVBY3R1ZWxsZSkgPj0gKG1heCArIG1heE0pKSAmJiBtYXhNICovICkge1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCB0aGlzICkuZGlhbG9nKCBcImNsb3NlXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZiggaGV1cmVBY3R1ZWxsZSA+PSAwICYmIGhldXJlQWN0dWVsbGUgPCBtaW4gLyooKGhldXJlQWN0dWVsbGUgKyBtaW51dGVBY3R1ZWxsZSkgIDwgKG1pbiArIG1pbk0pKSovICl7XG4gICAgICAgICAgICAkKCBcIiNyZXNlcnZhdGlvbi1kaWFsb2ctbWVzc2FnZVwiICkuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgIE9rOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3V2cmUgw6AgOWgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKCdvcHRpb24nLCAndmFsdWVzJywgWyhoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZSksIChoZXVyZUFjdHVlbGxlICogNjApICsgNjAgKyBtaW51dGVBY3R1ZWxsZV0pO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSArICc6JyArIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSAgKyAnOicgKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lMicpLmh0bWwoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcmVzZXJ2YXRpb24vY2hlY2tEaXNwb0RhdGUuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cblxuJChmdW5jdGlvbigpe1xuICAgICQoJ2EudGMtbGlua1t0aXRsZV0nKS50b29sdGlwKCk7XG59KTtcblxuLy8gQmFzaWNzIGZlYXR1cmVzXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXG4gICAgLy8gJChcIiNtYWluXCIpLm9uZXBhZ2Vfc2Nyb2xsKCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIixmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGlmKHduID4gNTApe1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5hZGRDbGFzcygnbWVudS1ibGFuYycpO1xuICAgICAgICAgICAgLy8kKFwiLm5hdmJhclwiKS5jc3Moe1wiYmFja2dyb3VuZC1jb2xvclwiOlwiI2Y4ZjhmOFwiLCBcImJvcmRlci1jb2xvclwiOiBcIiNmOGY4ZjhcIn0pLmZhZGVJbigpO1xuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNtYWluTmF2JykucmVtb3ZlQ2xhc3MoJ21lbnUtYmxhbmMnKTtcbiAgICAgICAgICAgIC8vJChcIi5uYXZiYXJcIikuY3NzKHtcImJhY2tncm91bmQtY29sb3JcIjpcInRyYW5zcGFyZW50XCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwidHJhbnNwYXJlbnRcIn0pLmZhZGVJbigpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9