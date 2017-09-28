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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzZlNzlkZDM2YWVlNWZiNGJjMmMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidmFsIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwic3BsaXQiLCJoZXVyZUFjdHVlbGxlIiwicGFyc2VJbnQiLCJtaW51dGVBY3R1ZWxsZSIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJ0b3RhbFN0YXJ0VGltZSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaG91cnMiLCJtaW51dGVzIiwiY2hpbGRyZW4iLCJmaXJzdCIsInRleHQiLCJob3VyczIiLCJtaW51dGVzMiIsImxhc3QiLCJodG1sIiwic2V0SGFuZGxlcyIsInRvdGFsIiwicGVyY2VudCIsIngiLCJhcHBlbmQiLCJwYWQiLCJuIiwiZGlhbG9nIiwibW9kYWwiLCJidXR0b25zIiwiT2siLCJ0b29sdGlwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNURJLFNBQVNBLE1BQVQsR0FBa0I7QUFDZCxRQUFJQyxTQUFTQyxFQUFFLFdBQUYsQ0FBYjtBQUNBLFFBQUlBLEVBQUVDLE1BQUYsRUFBVUMsS0FBVixNQUFxQixHQUFyQixJQUE0QkYsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEtBQXdCLEdBQXhELEVBQTZEO0FBQ3pESixlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLE9BQWIsRUFBc0IsT0FBTyxPQUE3QixFQUFYO0FBQ0FKLFVBQUUsWUFBRixFQUFnQkksR0FBaEIsQ0FBb0IsRUFBQyxXQUFXLFNBQVosRUFBcEI7QUFDSCxLQUhELE1BSUs7QUFDREwsZUFBT0ssR0FBUCxDQUFXLEVBQUMsWUFBWSxVQUFiLEVBQXlCLE9BQU8sS0FBaEMsRUFBWDtBQUNBSixVQUFHLFlBQUgsRUFBa0JJLEdBQWxCLENBQXVCLEVBQUMsV0FBVyxNQUFaLEVBQXZCO0FBQ0g7O0FBRUQsUUFBSUosRUFBRUMs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LElBQXhELENBQThEckIsZ0JBQWMsQ0FBZixHQUFxQixHQUFyQixHQUEyQitCLElBQUk3QixjQUFKLENBQXhGO0FBQ0EvQyxjQUFFLGNBQUYsRUFBa0JzRSxJQUFsQixDQUF1QnpCLGdCQUFjLEdBQWQsR0FBbUIrQixJQUFJN0IsY0FBSixDQUExQztBQUNBL0MsY0FBRSxlQUFGLEVBQW1Cc0UsSUFBbkIsQ0FBeUJ6QixnQkFBYyxDQUFmLEdBQWtCLEdBQWxCLEdBQXVCK0IsSUFBSTdCLGNBQUosQ0FBL0M7QUFDSDtBQUNKO0FBQ0osQ0E5SkQsRTs7Ozs7Ozs7Ozs7O0FDREE7OztBQUdBL0MsRUFBRSxZQUFVO0FBQ1JBLE1BQUUsa0JBQUYsRUFBc0JrRixPQUF0QjtBQUNILENBRkQsRSIsImZpbGUiOiJhcHAuYTU1OWQ2NzJmZDJiZDI2MTY4ZGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzZlNzlkZDM2YWVlNWZiNGJjMmMiLCJcbiAgICBmdW5jdGlvbiBmaXhEaXYoKSB7XG4gICAgICAgIHZhciAkY2FjaGUgPSAkKCcjZ2V0Rml4ZWQnKTtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdmaXhlZCcsICd0b3AnOiAnMjc1cHgnfSk7XG4gICAgICAgICAgICAkKFwiI3JlbW92ZURpdlwiKS5jc3Moe1wiZGlzcGxheVwiOiBcImluaGVyaXRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgICAgICAkKCBcIiNyZW1vdmVEaXZcIiApLmNzcygge1wiZGlzcGxheVwiOiBcIm5vbmVcIn0gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDk5MSAmJiAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApe1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICcwcHgnfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZpeERpdik7XG4gICAgZml4RGl2KCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvZml4ZGl2LmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCBvcGVuIHRoZSBtb2RhbFxuICAgIGlmKCQoJyNteUJ0bicpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIGJ1dHRvbiB0aGF0IG9wZW5zIHRoZSBtb2RhbFxuICAgICAgICB2YXIgYnRuID0gJCgnI215QnRuJyk7XG4gICAgICAgIGJ0bi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnZGl2I215TW9kYWwnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGlmICgkKCcuY2xvc2UnKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSA8c3Bhbj4gZWxlbWVudCB0aGF0IGNsb3NlcyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIHNwYW4gPSAkKCcuY2xvc2UnKTtcbiAgICAgICAgc3Bhbi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGlkZURpdigpO1xuICAgICAgICAgICAgLy91cGRhdGVEaXYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIiNteU1vZGFsXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdtb2RhbCcpKSB7XG4gICAgICAgICAgICB2YXIgaGlkZVBvcHVwID0gJChlLnRhcmdldCkuYXR0cignaWQnKTtcbiAgICAgICAgICAgICQoJyMnICsgaGlkZVBvcHVwKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG4gICAgLy8gd2luZG93LmNsaWNrIChmdW5jdGlvbihldmVudCkge1xuICAgIC8vICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgLy8gICAgICAgICBtb2RhbC5oaWRlKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZGVEaXYoKSB7XG4gICAgICAgICQoICcjbXlNb2RhbCcgKS5oaWRlKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIjbXlNb2RhbFwiICk7XG5cbiAgICB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL21vZGFsLmpzIiwiLy8gU2xpZGVyXG4kKGZ1bmN0aW9uKCkge1xuICAgIC8qKiBMaXN0ZXMgZXQgZ3JpbGxlcyBzYWxsZXMgKiovXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNsaXN0JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7fSk7XG4gICAgICAgICQoJyNncmlkJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5yZW1vdmVDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnZ3JpZC1ncm91cC1pdGVtJyk7fSk7XG4gICAgfSk7XG5cbiAgICAvKiogSW5pdGlhdGUgZGF0ZXBpY2tlciAqKi9cbiAgICAkKCBcIiNkYXRlcGlja2VyXCIgKS5kYXRlcGlja2VyKHtcbiAgICAgICAgbWF4RGF0ZTogXCIrMTVkXCIsXG4gICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRlZmF1bHREYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlRm9ybWF0OiAnZGQvbW0veXknLFxuICAgICAgICBhbHRGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGFsdEZpZWxkOiAnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JyxcbiAgICAgICAgcmVnaW9uYWw6IFwiZnJcIlxuXG4gICAgICAgIC8vc2V0RGF0ZTogbmV3IERhdGUoKVxuXG4gICAgfSk7XG4gICAgLy8gR2VzdGlvbiBkZSBsYSByZWdpb24gZnIgcG9zZSBwcm9ibMOobWVcbiAgIC8vICQoXCIjZGF0ZXBpY2tlclwiKS5kYXRlcGlja2VyKFwib3B0aW9uc1wiLCBcImRlZmF1bHREYXRlXCIsIG5ldyBEYXRlKCkpO1xuXG4gICAgJCgnLnVpLXNsaWRlci1oYW5kbGUnKS5kcmFnZ2FibGUoKTtcblxuICAgIHZhciBtaW4gPSA5OyAvLyBIZXVyZSBtaW4gZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBtYXggPSAyMTsgLy8gSGV1cmUgbWF4IGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgZGF0ZVBpY2tlckRhdGUgPSAkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpO1xuICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHRvZGF5RGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgLy9jb25zb2xlLmxvZyh0b2RheURhdGUgKyAnIGV0IGRhdGUgcGlja2VyJyArIGRhdGVQaWNrZXJEYXRlKTtcblxuICAgIGlmICghISQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSkge1xuICAgICAgICB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgaGV1cmVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMF0sIDEwKTtcbiAgICAgICAgdmFyIG1pbnV0ZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVsxXSwxMCk7XG4gICAgICAgIHZhciB0b2RheURhdGUgPSBhcnJUaW1lWzJdO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2RheURhdGUrICdkYXRlIGR1IGpvdXJzJyk7XG4gICAgICAgIGlmIChtaW51dGVBY3R1ZWxsZSA8IDMwKSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9IDMwO1xuICAgICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXMgcGFyIGRlZmF1dCcpO1xuICAgIH1cblxuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcih7XG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBtaW46IG1pbiAqIDYwLFxuICAgICAgICBtYXg6IG1heCAqIDYwLFxuICAgICAgICBtaW5SYW5nZTogNjAsXG4gICAgICAgIHN0ZXA6IDMwLFxuICAgICAgICB2YWx1ZXM6IFs1NDAsIDEzMjBdLFxuICAgICAgICBzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuICAgICAgICAgICAgLy8gT24gbGltaXRlIGwnaW50ZXJ2YWxsZSBtaW5pbWFsIMOgIDFoIHBvdXIgdW5lIHJlc2VydmF0aW9uIGRlIHNhbGxlXG4gICAgICAgICAgICBpZiAoICh1aS52YWx1ZXNbMF0gKyA1NSkgPj0gdWkudmFsdWVzWzFdICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERhbnMgbGUgY2FzIG/DuSBjJ2VzdCBsYSBkYXRlIGR1IGpvdXIgIVxuICAgICAgICAgICAgaWYgKCQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkgPT0gdG9kYXlEYXRlIHx8ICEkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsU3RhcnRUaW1lID0gaGV1cmVBY3R1ZWxsZSAqIDYwICsgbWludXRlQWN0dWVsbGU7XG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1aS52YWx1ZXNbMF0gKyAnICcrIHRvdGFsU3RhcnRUaW1lKTtcblxuICAgICAgICAgICAgICAgIGlmICh1aS52YWx1ZXNbMF0gPCB0b3RhbFN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codWkudmFsdWVzWzBdICsgJyBlemVzZnNkICcgKyB0b3RhbFN0YXJ0VGltZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vJCAoJyNzbGlkZXItcmFuZ2UnKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkuZHJhZ2dhYmxlKCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaG91cnMxID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMF0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczEgPSB1aS52YWx1ZXNbMF0gLSAoaG91cnMxICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczEubGVuZ3RoIDwgMTApIGhvdXJzMT0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMS5sZW5ndGggPCAxMCkgbWludXRlczEgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMSA9PSAwKSBtaW51dGVzMSA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIHZhbGV1ciBkdSBwcmVtaWVyIGhhbmRsZSBkdSBzbGlkZXJcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KCBob3VyczErJzonK21pbnV0ZXMxICk7XG5cbiAgICAgICAgICAgIHZhciBob3VyczIgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1sxXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMiA9IHVpLnZhbHVlc1sxXSAtIChob3VyczIgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmKGhvdXJzMi5sZW5ndGggPCAxMCkgaG91cnMyPSAnMCcgKyBob3VycztcbiAgICAgICAgICAgIGlmKG1pbnV0ZXMyLmxlbmd0aCA8IDEwKSBtaW51dGVzMiA9ICcwJyArIG1pbnV0ZXM7XG5cbiAgICAgICAgICAgIGlmKG1pbnV0ZXMyID09IDApIG1pbnV0ZXMyID0gJzAwJztcblxuICAgICAgICAgICAgLy8gRGV1eGnDqG1lIGhhbmRsZSBkdSBzbGlkZXJcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoIGhvdXJzMisnOicrbWludXRlczIgKTtcblxuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lJykuaHRtbChob3VyczErJzonK21pbnV0ZXMxKTtcblxuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lMicpLmh0bWwoaG91cnMyKyc6JyttaW51dGVzMik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChtaW4rJzowMCcpO1xuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQobWF4Kyc6MDAnKTtcblxuXG5cbiAgICBpZigkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykubGVuZ3RoICYmICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSApIHtcbiAgICAgICAgc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpO1xuICAgIH1cbiAgICAvLyBBcml0aG3DqXRpcXVlOiBvbiBjYWxjdWxlIGxlIG5vbWJyZSBkJ2hldXJlIHRvdGFsIGV0IG9uIGNyw6llIGxlcyBpbnRlcnZhbGxlcyBzb3VoYWl0w6ksIG9uIG1ldHRyYSBkZXMgcG9pbnRzIMOnXG4gICAgdmFyIHRvdGFsID0gKG1heCAtIG1pbiApICogMjsgLy8gY2FyIDYwIG1pbnV0ZXMgPSAyICogMzAgbWludXRlcyA6KVxuICAgIHZhciBwZXJjZW50ID0gMTAwIC8gdG90YWw7XG5cbiAgICBmb3IgKHZhciB4ID0gMTsgeCA8IHRvdGFsOyB4Kyspe1xuICAgICAgICAkKFwiLnVpLXNsaWRlclwiICkuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2RvdHMnIHN0eWxlPSdsZWZ0OlwiKyB4ICogcGVyY2VudCArIFwiJSc+PC9zcGFuPlwiKTtcblxuICAgIH1cblxuICAgIC8vIExvcnNxdSdvbiBjaGFuZ2UgbGUgZGF0ZXBpY2tlclxuICAgICQoJyNkYXRlcGlja2VyJykuZGF0ZXBpY2tlcigpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiAoJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSA9PSAnMjAxNy0wOS0yMicgfHwgISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpe1xuICAgICAgICAgICAgc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBham91dGUgdW4gMCBkZXZhbnQgbGVzIGNoaWZmcmVzIHBvdXIgbCdhZmZpY2hhZ2UgdGV4dGUgIVxuICAgIGZ1bmN0aW9uIHBhZChuKSB7XG4gICAgICAgIHJldHVybiAobiA8IDEwKSA/IChcIjBcIiArIG4pIDogbjtcbiAgICB9XG4gICAgLy8gUmVpbml0IGxlcyBoYW5kbGVzXG4gICAgZnVuY3Rpb24gc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpe1xuXG4gICAgICAgIC8vJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAvLyQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcblxuICAgICAgICAvL3ZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICBjb25zb2xlLmxvZyggaGV1cmVBY3R1ZWxsZSArJyAnICArIG1pbiApO1xuICAgICAgICBpZiAoaGV1cmVBY3R1ZWxsZSA+IG1heCAmJiBoZXVyZUFjdHVlbGxlIDwgMjQpIHtcbiAgICAgICAgICAgICQoIFwiI3Jlc2VydmF0aW9uLWRpYWxvZy1tZXNzYWdlXCIgKS5kaWFsb2coe1xuICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgT2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCggdGhpcyApLmRpYWxvZyggXCJjbG9zZVwiICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2UgaWYoaGV1cmVBY3R1ZWxsZSA+PSAwICYmIGhldXJlQWN0dWVsbGUgPCBtaW4pe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ091dnJlIMOgIDloJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcignb3B0aW9uJywgJ3ZhbHVlcycsIFsoaGV1cmVBY3R1ZWxsZSAqIDYwICsgbWludXRlQWN0dWVsbGUpLCAoaGV1cmVBY3R1ZWxsZSAqIDYwKSArIDYwICsgbWludXRlQWN0dWVsbGVdKTtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KGhldXJlQWN0dWVsbGUgKyAnOicgKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoKGhldXJlQWN0dWVsbGUrMSkgICsgJzonICsgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhldXJlQWN0dWVsbGUrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKChoZXVyZUFjdHVlbGxlKzEpKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG5cbiQoZnVuY3Rpb24oKXtcbiAgICAkKCdhLnRjLWxpbmtbdGl0bGVdJykudG9vbHRpcCgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9