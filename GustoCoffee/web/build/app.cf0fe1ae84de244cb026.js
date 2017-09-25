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
        $cache.css({ 'position': 'relative', 'top': '-90px' });
        $("#removeDiv").css({ "display": "none" });
    }

    if ($(window).width() < 991 && $(window).scrollTop() > 200) {
        $cache.css({ 'position': 'relative', 'top': '-90px' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTRmNzJkNzk3OTliOTc2YWYyZDciLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidmFsIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwic3BsaXQiLCJoZXVyZUFjdHVlbGxlIiwicGFyc2VJbnQiLCJtaW51dGVBY3R1ZWxsZSIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJ0b3RhbFN0YXJ0VGltZSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaG91cnMiLCJtaW51dGVzIiwiY2hpbGRyZW4iLCJmaXJzdCIsInRleHQiLCJob3VyczIiLCJtaW51dGVzMiIsImxhc3QiLCJodG1sIiwic2V0SGFuZGxlcyIsInRvdGFsIiwicGVyY2VudCIsIngiLCJhcHBlbmQiLCJkaWFsb2ciLCJtb2RhbCIsImJ1dHRvbnMiLCJPayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVESSxTQUFTQSxNQUFULEdBQWtCO0FBQ2QsUUFBSUMsU0FBU0MsRUFBRSxXQUFGLENBQWI7QUFDQSxRQUFJQSxFQUFFQyxNQUFGLEVBQVVDLEtBQVYsTUFBcUIsR0FBckIsSUFBNEJGLEVBQUVDLE1BQUYsRUFBVUUsU0FBVixLQUF3QixHQUF4RCxFQUE2RDtBQUN6REosZUFBT0ssR0FBUCxDQUFXLEVBQUMsWUFBWSxPQUFiLEVBQXNCLE9BQU8sT0FBN0IsRUFBWDtBQUNBSixVQUFFLFlBQUYsRUFBZ0JJLEdBQWhCLENBQW9CLEVBQUMsV0FBVyxTQUFaLEVBQXBCO0FBQ0gsS0FIRCxNQUlLO0FBQ0RMLGVBQU9LLEdBQVAsQ0FBVyxFQUFDLFlBQVksVUFBYixFQUF5QixPQUFPLE9BQWhDLEVBQVg7QUFDQUosVUFBRyxZQUFILEVBQWtCSSxHQUFsQixDQUF1QixFQUFDLFdBQVcsTUFBWixFQUF2QjtBQUNIOztBQUVELFFBQUlKLEVBQUVDLE1BQUYsRUFBVUMsS0FBVixLQUFvQixHQUFwQixJQUEyQkYsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEtBQXdCLEdBQXZELEVBQTJEO0FBQ3ZESixlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLFVBQWIsRUFBeUIsT0FBTyxPQUFoQyxFQUFYO0FBQ0g7QUFFSjtBQUNESixFQUFFQyxNQUFGLEVBQVVJLE1BQVYsQ0FBaUJQLE1BQWpCO0FBQ0FBLFM7Ozs7Ozs7Ozs7OztBQ2xCSjs7QUFFQTtBQUNJLElBQUdFLEVBQUUsUUFBRixFQUFZTSxNQUFmLEVBQXVCO0FBQ25CO0FBQ0EsUUFBSUMsTUFBTVAsRUFBRSxRQUFGLENBQVY7QUFDQU8sUUFBSUMsS0FBSixDQUFXLFlBQVk7QUFDbkJSLFVBQUUsYUFBRixFQUFpQlMsSUFBakI7QUFDSCxLQUZEO0FBR0g7O0FBRUQ7QUFDQSxJQUFJVCxFQUFFLFFBQUYsRUFBWU0sTUFBaEIsRUFBd0I7QUFDcEI7QUFDQSxRQUFJSSxPQUFPVixFQUFFLFFBQUYsQ0FBWDtBQUNBVSxTQUFLRixLQUFMLENBQVksWUFBWTtBQUNwQkc7QUFDQTtBQUNILEtBSEQ7QUFJSDs7QUFFRFgsRUFBRSxNQUFGLEVBQVVZLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLFVBQXRCLEVBQWtDLFVBQVNDLENBQVQsRUFBWTtBQUMxQyxRQUFJYixFQUFFYSxFQUFFQyxNQUFKLEVBQVlDLFFBQVosQ0FBcUIsT0FBckIsQ0FBSixFQUFtQztBQUMvQixZQUFJQyxZQUFZaEIsRUFBRWEsRUFBRUMsTUFBSixFQUFZRyxJQUFaLENBQWlCLElBQWpCLENBQWhCO0FBQ0FqQixVQUFFLE1BQU1nQixTQUFSLEVBQW1CRSxJQUFuQjtBQUNIO0FBQ0osQ0FMRDs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU1AsT0FBVCxHQUFtQjtBQUNmWCxNQUFHLFVBQUgsRUFBZ0JrQixJQUFoQixDQUFxQmpCLE9BQU9rQixRQUFQLENBQWdCQyxJQUFoQixHQUF1QixVQUE1QztBQUVILEM7Ozs7Ozs7Ozs7OztBQ3ZDTDtBQUNBcEIsRUFBRSxZQUFXO0FBQ1Q7QUFDQUEsTUFBRXFCLFFBQUYsRUFBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCdEIsVUFBRSxPQUFGLEVBQVdRLEtBQVgsQ0FBaUIsVUFBU2UsS0FBVCxFQUFlO0FBQUNBLGtCQUFNQyxjQUFOO0FBQ2pDeEIsY0FBRSwyQkFBRixFQUErQnlCLFFBQS9CLENBQXdDLGlCQUF4QztBQUE0RCxTQUQ1RDtBQUVBekIsVUFBRSxPQUFGLEVBQVdRLEtBQVgsQ0FBaUIsVUFBU2UsS0FBVCxFQUFlO0FBQUNBLGtCQUFNQyxjQUFOO0FBQ2pDeEIsY0FBRSwyQkFBRixFQUErQjBCLFdBQS9CLENBQTJDLGlCQUEzQztBQUNBMUIsY0FBRSwyQkFBRixFQUErQnlCLFFBQS9CLENBQXdDLGlCQUF4QztBQUE0RCxTQUY1RDtBQUdILEtBTkQ7O0FBUUE7QUFDQXpCLE1BQUcsYUFBSCxFQUFtQjJCLFVBQW5CLENBQThCO0FBQzFCQyxpQkFBUyxNQURpQjtBQUUxQkMsaUJBQVMsSUFBSUMsSUFBSixFQUZpQjtBQUcxQkMscUJBQWEsSUFBSUQsSUFBSixFQUhhO0FBSTFCRSxvQkFBWSxVQUpjO0FBSzFCQyxtQkFBVyxVQUxlO0FBTTFCQyxrQkFBVSx1QkFOZ0I7QUFPMUJDLGtCQUFVOztBQUVWOztBQVQwQixLQUE5QjtBQVlBO0FBQ0Q7O0FBRUNuQyxNQUFFLG1CQUFGLEVBQXVCb0MsU0FBdkI7O0FBRUEsUUFBSUMsTUFBTSxDQUFWLENBNUJTLENBNEJJO0FBQ2IsUUFBSUMsTUFBTSxFQUFWLENBN0JTLENBNkJLO0FBQ2QsUUFBSUMsaUJBQWlCdkMsRUFBRSx1QkFBRixFQUEyQndDLEdBQTNCLEVBQXJCO0FBQ0EsUUFBSUMsUUFBUSxJQUFJWCxJQUFKLEVBQVo7QUFDQSxRQUFJWSxZQUFZMUMsRUFBRSx1QkFBRixFQUEyQndDLEdBQTNCLEVBQWhCO0FBQ0E7O0FBRUEsUUFBSSxDQUFDLENBQUN4QyxFQUFFLG9DQUFGLEVBQXdDd0MsR0FBeEMsRUFBTixFQUFxRDtBQUNqRCxZQUFJRyxVQUFVM0MsRUFBRSxvQ0FBRixFQUF3Q3dDLEdBQXhDLEdBQThDSSxLQUE5QyxDQUFvRCxHQUFwRCxDQUFkO0FBQ0EsWUFBSUMsZ0JBQWdCQyxTQUFTSCxRQUFRLENBQVIsQ0FBVCxFQUFxQixFQUFyQixDQUFwQjtBQUNBLFlBQUlJLGlCQUFpQkQsU0FBU0gsUUFBUSxDQUFSLENBQVQsRUFBb0IsRUFBcEIsQ0FBckI7QUFDQSxZQUFJRCxZQUFZQyxRQUFRLENBQVIsQ0FBaEI7QUFDQUssZ0JBQVFDLEdBQVIsQ0FBWVAsWUFBVyxlQUF2QjtBQUNBLFlBQUlLLGlCQUFpQixFQUFyQixFQUF5QjtBQUNyQkEsNkJBQWlCLENBQWpCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hBLDZCQUFpQixFQUFqQjtBQUNIO0FBQ0osS0FYRCxNQVdLO0FBQ0RDLGdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDSDs7QUFFRGpELE1BQUUsZUFBRixFQUFtQmtELE1BQW5CLENBQTBCO0FBQ3RCQyxlQUFPLElBRGU7QUFFdEJkLGFBQUtBLE1BQU0sRUFGVztBQUd0QkMsYUFBS0EsTUFBTSxFQUhXO0FBSXRCYyxrQkFBVSxFQUpZO0FBS3RCQyxjQUFNLEVBTGdCO0FBTXRCQyxnQkFBUSxDQUFDLEdBQUQsRUFBTSxJQUFOLENBTmM7QUFPdEJDLGVBQU8sZUFBVWhDLEtBQVYsRUFBaUJpQyxFQUFqQixFQUFzQjs7QUFFekI7QUFDQSxnQkFBTUEsR0FBR0YsTUFBSCxDQUFVLENBQVYsSUFBZSxFQUFoQixJQUF1QkUsR0FBR0YsTUFBSCxDQUFVLENBQVYsQ0FBNUIsRUFBMkM7QUFDdkMsdUJBQU8sS0FBUDtBQUNIO0FBQ0Q7QUFDQSxnQkFBSXRELEVBQUUsdUJBQUYsRUFBMkJ3QyxHQUEzQixNQUFvQyxZQUFwQyxJQUFvRCxDQUFDeEMsRUFBRSx1QkFBRixFQUEyQndDLEdBQTNCLEVBQXpELEVBQTJGO0FBQ3ZGLG9CQUFJaUIsaUJBQWlCWixnQkFBZ0IsRUFBaEIsR0FBcUJFLGNBQTFDO0FBQ0FDLHdCQUFRQyxHQUFSLENBQVlPLEdBQUdGLE1BQUgsQ0FBVSxDQUFWLElBQWUsR0FBZixHQUFvQkcsY0FBaEM7O0FBRUEsb0JBQUlELEdBQUdGLE1BQUgsQ0FBVSxDQUFWLElBQWVHLGNBQW5CLEVBQW1DO0FBQy9CLDJCQUFPLEtBQVA7QUFDQVQsNEJBQVFDLEdBQVIsQ0FBWU8sR0FBR0YsTUFBSCxDQUFVLENBQVYsSUFBZSxXQUFmLEdBQTZCRyxjQUF6QztBQUNBO0FBQ0g7QUFDSjs7QUFFRCxnQkFBSUMsU0FBU0MsS0FBS0MsS0FBTCxDQUFXSixHQUFHRixNQUFILENBQVUsQ0FBVixJQUFlLEVBQTFCLENBQWI7QUFDQSxnQkFBSU8sV0FBV0wsR0FBR0YsTUFBSCxDQUFVLENBQVYsSUFBZ0JJLFNBQVMsRUFBeEM7O0FBRUEsZ0JBQUdBLE9BQU9wRCxNQUFQLEdBQWdCLEVBQW5CLEVBQXVCb0QsU0FBUSxNQUFNSSxLQUFkO0FBQ3ZCLGdCQUFHRCxTQUFTdkQsTUFBVCxHQUFrQixFQUFyQixFQUF5QnVELFdBQVcsTUFBTUUsT0FBakI7O0FBRXpCLGdCQUFHRixZQUFZLENBQWYsRUFBa0JBLFdBQVcsSUFBWDs7QUFFbEI7QUFDQTdELGNBQUUsZUFBRixFQUFtQmdFLFFBQW5CLENBQTRCLG1CQUE1QixFQUFpREMsS0FBakQsR0FBeURDLElBQXpELENBQStEUixTQUFPLEdBQVAsR0FBV0csUUFBMUU7O0FBRUEsZ0JBQUlNLFNBQVNSLEtBQUtDLEtBQUwsQ0FBV0osR0FBR0YsTUFBSCxDQUFVLENBQVYsSUFBZSxFQUExQixDQUFiO0FBQ0EsZ0JBQUljLFdBQVdaLEdBQUdGLE1BQUgsQ0FBVSxDQUFWLElBQWdCYSxTQUFTLEVBQXhDOztBQUVBLGdCQUFHQSxPQUFPN0QsTUFBUCxHQUFnQixFQUFuQixFQUF1QjZELFNBQVEsTUFBTUwsS0FBZDtBQUN2QixnQkFBR00sU0FBUzlELE1BQVQsR0FBa0IsRUFBckIsRUFBeUI4RCxXQUFXLE1BQU1MLE9BQWpCOztBQUV6QixnQkFBR0ssWUFBWSxDQUFmLEVBQWtCQSxXQUFXLElBQVg7O0FBRWxCO0FBQ0FwRSxjQUFFLGVBQUYsRUFBbUJnRSxRQUFuQixDQUE0QixtQkFBNUIsRUFBaURLLElBQWpELEdBQXdESCxJQUF4RCxDQUE4REMsU0FBTyxHQUFQLEdBQVdDLFFBQXpFOztBQUVBcEUsY0FBRSxjQUFGLEVBQWtCc0UsSUFBbEIsQ0FBdUJaLFNBQU8sR0FBUCxHQUFXRyxRQUFsQzs7QUFFQTdELGNBQUUsZUFBRixFQUFtQnNFLElBQW5CLENBQXdCSCxTQUFPLEdBQVAsR0FBV0MsUUFBbkM7QUFDSDtBQWxEcUIsS0FBMUI7QUFvREFwRSxNQUFFLGVBQUYsRUFBbUJnRSxRQUFuQixDQUE0QixtQkFBNUIsRUFBaURDLEtBQWpELEdBQXlEQyxJQUF6RCxDQUE4RDdCLE1BQUksS0FBbEU7QUFDQXJDLE1BQUUsZUFBRixFQUFtQmdFLFFBQW5CLENBQTRCLG1CQUE1QixFQUFpREssSUFBakQsR0FBd0RILElBQXhELENBQTZENUIsTUFBSSxLQUFqRTs7QUFJQSxRQUFHdEMsRUFBRSxvQ0FBRixFQUF3Q00sTUFBeEMsSUFBa0ROLEVBQUUsb0NBQUYsRUFBd0N3QyxHQUF4QyxFQUFyRCxFQUFxRztBQUNqRytCLG1CQUFXMUIsYUFBWCxFQUEwQkUsY0FBMUIsRUFBMENWLEdBQTFDLEVBQStDQyxHQUEvQztBQUNIO0FBQ0Q7QUFDQSxRQUFJa0MsUUFBUSxDQUFDbEMsTUFBTUQsR0FBUCxJQUFlLENBQTNCLENBL0dTLENBK0dxQjtBQUM5QixRQUFJb0MsVUFBVSxNQUFNRCxLQUFwQjtBQUNBLFNBQUssSUFBSUUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixLQUFwQixFQUEyQkUsR0FBM0IsRUFBK0I7QUFDM0IxRSxVQUFFLFlBQUYsRUFBaUIyRSxNQUFqQixDQUF3QixvQ0FBbUNELElBQUlELE9BQXZDLEdBQWlELFlBQXpFO0FBRUg7O0FBRUQ7QUFDQXpFLE1BQUUsYUFBRixFQUFpQjJCLFVBQWpCLEdBQThCZixFQUE5QixDQUFpQyxRQUFqQyxFQUEyQyxVQUFTQyxDQUFULEVBQVc7QUFDbEQsWUFBSWIsRUFBRSx1QkFBRixFQUEyQndDLEdBQTNCLE1BQW9DLFlBQXBDLElBQW9ELENBQUN4QyxFQUFFLHVCQUFGLEVBQTJCd0MsR0FBM0IsRUFBekQsRUFBMEY7QUFDdEYrQix1QkFBVzFCLGFBQVgsRUFBMEJFLGNBQTFCLEVBQTBDVixHQUExQyxFQUErQ0MsR0FBL0M7QUFDSDtBQUNKLEtBSkQ7O0FBTUE7QUFDQSxhQUFTaUMsVUFBVCxDQUFvQjFCLGFBQXBCLEVBQW1DRSxjQUFuQyxFQUFtRFYsR0FBbkQsRUFBd0RDLEdBQXhELEVBQTREOztBQUV4RHRDLFVBQUUsZUFBRixFQUFtQmdFLFFBQW5CLENBQTRCLG1CQUE1QixFQUFpREMsS0FBakQsR0FBeURDLElBQXpELENBQThEckIsZ0JBQWMsR0FBZCxHQUFtQkUsY0FBakY7QUFDQS9DLFVBQUUsZUFBRixFQUFtQmdFLFFBQW5CLENBQTRCLG1CQUE1QixFQUFpREssSUFBakQsR0FBd0RILElBQXhELENBQThEckIsZ0JBQWMsQ0FBZixHQUFrQixHQUFsQixHQUF1QkUsY0FBcEY7QUFDQS9DLFVBQUUsY0FBRixFQUFrQnNFLElBQWxCLENBQXVCekIsZ0JBQWMsR0FBZCxHQUFtQkUsY0FBMUM7QUFDQS9DLFVBQUUsZUFBRixFQUFtQnNFLElBQW5CLENBQXlCekIsZ0JBQWMsQ0FBZixHQUFrQixHQUFsQixHQUF1QkUsY0FBL0M7QUFDQTtBQUNBLFlBQUlGLGdCQUFnQlAsR0FBaEIsSUFBdUJPLGdCQUFnQixDQUEzQyxFQUE4QztBQUMxQzdDLGNBQUcsNkJBQUgsRUFBbUM0RSxNQUFuQyxDQUEwQztBQUN0Q0MsdUJBQU8sSUFEK0I7QUFFdENDLHlCQUFTO0FBQ0xDLHdCQUFJLGNBQVc7QUFDWC9FLDBCQUFHLElBQUgsRUFBVTRFLE1BQVYsQ0FBa0IsT0FBbEI7QUFDSDtBQUhJO0FBRjZCLGFBQTFDO0FBUUgsU0FURCxNQVNNLElBQUcvQixnQkFBZ0IsQ0FBaEIsSUFBcUJBLGdCQUFnQlIsR0FBeEMsRUFBNEM7QUFDOUNXLG9CQUFRQyxHQUFSLENBQVksWUFBWjtBQUNILFNBRkssTUFHRjtBQUNBakQsY0FBRSxlQUFGLEVBQW1Ca0QsTUFBbkIsQ0FBMEIsUUFBMUIsRUFBb0MsUUFBcEMsRUFBOEMsQ0FBRUwsZ0JBQWdCLEVBQWhCLEdBQXFCRSxjQUF2QixFQUF5Q0YsZ0JBQWdCLEVBQWpCLEdBQXVCLEVBQXZCLEdBQTRCRSxjQUFwRSxDQUE5QztBQUNBL0MsY0FBRSxlQUFGLEVBQW1CZ0UsUUFBbkIsQ0FBNEIsbUJBQTVCLEVBQWlEQyxLQUFqRCxHQUF5REMsSUFBekQsQ0FBOERyQixnQkFBZ0IsR0FBaEIsR0FBc0JFLGNBQXBGO0FBQ0EvQyxjQUFFLGVBQUYsRUFBbUJnRSxRQUFuQixDQUE0QixtQkFBNUIsRUFBaURLLElBQWpELEdBQXdESCxJQUF4RCxDQUE4RHJCLGdCQUFjLENBQWYsR0FBcUIsR0FBckIsR0FBMkJFLGNBQXhGO0FBQ0g7QUFDSjtBQUNKLENBdkpELEU7Ozs7Ozs7Ozs7OztBQ0RBLDRCIiwiZmlsZSI6ImFwcC5jZjBmZTFhZTg0ZGUyNDRjYjAyNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhNGY3MmQ3OTc5OWI5NzZhZjJkNyIsIlxuICAgIGZ1bmN0aW9uIGZpeERpdigpIHtcbiAgICAgICAgdmFyICRjYWNoZSA9ICQoJyNnZXRGaXhlZCcpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gOTkxICYmICQod2luZG93KS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ2ZpeGVkJywgJ3RvcCc6ICcyNzVweCd9KTtcbiAgICAgICAgICAgICQoXCIjcmVtb3ZlRGl2XCIpLmNzcyh7XCJkaXNwbGF5XCI6IFwiaW5oZXJpdFwifSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAncmVsYXRpdmUnLCAndG9wJzogJy05MHB4J30pO1xuICAgICAgICAgICAgJCggXCIjcmVtb3ZlRGl2XCIgKS5jc3MoIHtcImRpc3BsYXlcIjogXCJub25lXCJ9ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTEgJiYgJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKXtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnLTkwcHgnfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZpeERpdik7XG4gICAgZml4RGl2KCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvZml4ZGl2LmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCBvcGVuIHRoZSBtb2RhbFxuICAgIGlmKCQoJyNteUJ0bicpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIGJ1dHRvbiB0aGF0IG9wZW5zIHRoZSBtb2RhbFxuICAgICAgICB2YXIgYnRuID0gJCgnI215QnRuJyk7XG4gICAgICAgIGJ0bi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnZGl2I215TW9kYWwnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGlmICgkKCcuY2xvc2UnKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSA8c3Bhbj4gZWxlbWVudCB0aGF0IGNsb3NlcyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIHNwYW4gPSAkKCcuY2xvc2UnKTtcbiAgICAgICAgc3Bhbi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGlkZURpdigpO1xuICAgICAgICAgICAgLy91cGRhdGVEaXYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIiNteU1vZGFsXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdtb2RhbCcpKSB7XG4gICAgICAgICAgICB2YXIgaGlkZVBvcHVwID0gJChlLnRhcmdldCkuYXR0cignaWQnKTtcbiAgICAgICAgICAgICQoJyMnICsgaGlkZVBvcHVwKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG4gICAgLy8gd2luZG93LmNsaWNrIChmdW5jdGlvbihldmVudCkge1xuICAgIC8vICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgLy8gICAgICAgICBtb2RhbC5oaWRlKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZGVEaXYoKSB7XG4gICAgICAgICQoICcjbXlNb2RhbCcgKS5oaWRlKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIjbXlNb2RhbFwiICk7XG5cbiAgICB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL21vZGFsLmpzIiwiLy8gU2xpZGVyXG4kKGZ1bmN0aW9uKCkge1xuICAgIC8qKiBMaXN0ZXMgZXQgZ3JpbGxlcyBzYWxsZXMgKiovXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNsaXN0JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7fSk7XG4gICAgICAgICQoJyNncmlkJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5yZW1vdmVDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnZ3JpZC1ncm91cC1pdGVtJyk7fSk7XG4gICAgfSk7XG5cbiAgICAvKiogSW5pdGlhdGUgZGF0ZXBpY2tlciAqKi9cbiAgICAkKCBcIiNkYXRlcGlja2VyXCIgKS5kYXRlcGlja2VyKHtcbiAgICAgICAgbWF4RGF0ZTogXCIrMTVkXCIsXG4gICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRlZmF1bHREYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlRm9ybWF0OiAnZGQvbW0veXknLFxuICAgICAgICBhbHRGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGFsdEZpZWxkOiAnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JyxcbiAgICAgICAgcmVnaW9uYWw6IFwiZnJcIlxuXG4gICAgICAgIC8vc2V0RGF0ZTogbmV3IERhdGUoKVxuXG4gICAgfSk7XG4gICAgLy8gR2VzdGlvbiBkZSBsYSByZWdpb24gZnIgcG9zZSBwcm9ibMOobWVcbiAgIC8vICQoXCIjZGF0ZXBpY2tlclwiKS5kYXRlcGlja2VyKFwib3B0aW9uc1wiLCBcImRlZmF1bHREYXRlXCIsIG5ldyBEYXRlKCkpO1xuXG4gICAgJCgnLnVpLXNsaWRlci1oYW5kbGUnKS5kcmFnZ2FibGUoKTtcblxuICAgIHZhciBtaW4gPSA5OyAvLyBIZXVyZSBtaW4gZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBtYXggPSAyMTsgLy8gSGV1cmUgbWF4IGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgZGF0ZVBpY2tlckRhdGUgPSAkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpO1xuICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHRvZGF5RGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgLy9jb25zb2xlLmxvZyh0b2RheURhdGUgKyAnIGV0IGRhdGUgcGlja2VyJyArIGRhdGVQaWNrZXJEYXRlKTtcblxuICAgIGlmICghISQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSkge1xuICAgICAgICB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgaGV1cmVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMF0sIDEwKTtcbiAgICAgICAgdmFyIG1pbnV0ZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVsxXSwxMCk7XG4gICAgICAgIHZhciB0b2RheURhdGUgPSBhcnJUaW1lWzJdO1xuICAgICAgICBjb25zb2xlLmxvZyh0b2RheURhdGUrICdkYXRlIGR1IGpvdXJzJyk7XG4gICAgICAgIGlmIChtaW51dGVBY3R1ZWxsZSA8IDMwKSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW51dGVBY3R1ZWxsZSA9IDMwO1xuICAgICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwYXMgcGFyIGRlZmF1dCcpO1xuICAgIH1cblxuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLnNsaWRlcih7XG4gICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICBtaW46IG1pbiAqIDYwLFxuICAgICAgICBtYXg6IG1heCAqIDYwLFxuICAgICAgICBtaW5SYW5nZTogNjAsXG4gICAgICAgIHN0ZXA6IDMwLFxuICAgICAgICB2YWx1ZXM6IFs1NDAsIDEzMjBdLFxuICAgICAgICBzbGlkZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcblxuICAgICAgICAgICAgLy8gT24gbGltaXRlIGwnaW50ZXJ2YWxsZSBtaW5pbWFsIMOgIDFoIHBvdXIgdW5lIHJlc2VydmF0aW9uIGRlIHNhbGxlXG4gICAgICAgICAgICBpZiAoICh1aS52YWx1ZXNbMF0gKyA1NSkgPj0gdWkudmFsdWVzWzFdICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERhbnMgbGUgY2FzIG/DuSBjJ2VzdCBsYSBkYXRlIGR1IGpvdXIgIVxuICAgICAgICAgICAgaWYgKCQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkgPT0gJzIwMTctMDktMjInIHx8ICEkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsU3RhcnRUaW1lID0gaGV1cmVBY3R1ZWxsZSAqIDYwICsgbWludXRlQWN0dWVsbGU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codWkudmFsdWVzWzBdICsgJyAnKyB0b3RhbFN0YXJ0VGltZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodWkudmFsdWVzWzBdIDwgdG90YWxTdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1aS52YWx1ZXNbMF0gKyAnIGV6ZXNmc2QgJyArIHRvdGFsU3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy8kICgnI3NsaWRlci1yYW5nZScpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS5kcmFnZ2FibGUoIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBob3VyczEgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1swXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMSA9IHVpLnZhbHVlc1swXSAtIChob3VyczEgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmKGhvdXJzMS5sZW5ndGggPCAxMCkgaG91cnMxPSAnMCcgKyBob3VycztcbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxLmxlbmd0aCA8IDEwKSBtaW51dGVzMSA9ICcwJyArIG1pbnV0ZXM7XG5cbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxID09IDApIG1pbnV0ZXMxID0gJzAwJztcblxuICAgICAgICAgICAgLy8gdmFsZXVyIGR1IHByZW1pZXIgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoIGhvdXJzMSsnOicrbWludXRlczEgKTtcblxuICAgICAgICAgICAgdmFyIGhvdXJzMiA9IE1hdGguZmxvb3IodWkudmFsdWVzWzFdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMyID0gdWkudmFsdWVzWzFdIC0gKGhvdXJzMiAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMyLmxlbmd0aCA8IDEwKSBob3VyczI9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczIubGVuZ3RoIDwgMTApIG1pbnV0ZXMyID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczIgPT0gMCkgbWludXRlczIgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyBEZXV4acOobWUgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCggaG91cnMyKyc6JyttaW51dGVzMiApO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhvdXJzMSsnOicrbWludXRlczEpO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbChob3VyczIrJzonK21pbnV0ZXMyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KG1pbisnOjAwJyk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dChtYXgrJzowMCcpO1xuXG5cblxuICAgIGlmKCQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS5sZW5ndGggJiYgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpICkge1xuICAgICAgICBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCk7XG4gICAgfVxuICAgIC8vIEFyaXRobcOpdGlxdWU6IG9uIGNhbGN1bGUgbGUgbm9tYnJlIGQnaGV1cmUgdG90YWwgZXQgb24gY3LDqWUgbGVzIGludGVydmFsbGVzIHNvdWhhaXTDqSwgb24gbWV0dHJhIGRlcyBwb2ludHMgw6dcbiAgICB2YXIgdG90YWwgPSAobWF4IC0gbWluICkgKiAyOyAvLyBjYXIgNjAgbWludXRlcyA9IDIgKiAzMCBtaW51dGVzIDopXG4gICAgdmFyIHBlcmNlbnQgPSAxMDAgLyB0b3RhbDtcbiAgICBmb3IgKHZhciB4ID0gMTsgeCA8IHRvdGFsOyB4Kyspe1xuICAgICAgICAkKFwiLnVpLXNsaWRlclwiICkuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2RvdHMnIHN0eWxlPSdsZWZ0OlwiKyB4ICogcGVyY2VudCArIFwiJSc+PC9zcGFuPlwiKTtcblxuICAgIH1cblxuICAgIC8vIExvcnNxdSdvbiBjaGFuZ2UgbGUgZGF0ZXBpY2tlclxuICAgICQoJyNkYXRlcGlja2VyJykuZGF0ZXBpY2tlcigpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiAoJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSA9PSAnMjAxNy0wOS0yMicgfHwgISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpe1xuICAgICAgICAgICAgc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBSZWluaXQgbGVzIGhhbmRsZXNcbiAgICBmdW5jdGlvbiBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCl7XG5cbiAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSsnOicrIG1pbnV0ZUFjdHVlbGxlKTtcbiAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSsnOicrIG1pbnV0ZUFjdHVlbGxlKTtcbiAgICAgICAgJCgnLnNsaWRlci10aW1lJykuaHRtbChoZXVyZUFjdHVlbGxlKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbCgoaGV1cmVBY3R1ZWxsZSsxKSsnOicrIG1pbnV0ZUFjdHVlbGxlKTtcbiAgICAgICAgLy92YXIgaGV1cmVBY3R1ZWxsZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKTtcbiAgICAgICAgaWYgKGhldXJlQWN0dWVsbGUgPiBtYXggJiYgaGV1cmVBY3R1ZWxsZSA8IDApIHtcbiAgICAgICAgICAgICQoIFwiI3Jlc2VydmF0aW9uLWRpYWxvZy1tZXNzYWdlXCIgKS5kaWFsb2coe1xuICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgT2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCggdGhpcyApLmRpYWxvZyggXCJjbG9zZVwiICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2UgaWYoaGV1cmVBY3R1ZWxsZSA+IDAgJiYgaGV1cmVBY3R1ZWxsZSA8IG1pbil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3V2cmUgw6AgOWgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKCdvcHRpb24nLCAndmFsdWVzJywgWyhoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZSksIChoZXVyZUFjdHVlbGxlICogNjApICsgNjAgKyBtaW51dGVBY3R1ZWxsZV0pO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSArICc6JyArIG1pbnV0ZUFjdHVlbGxlKTtcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoKGhldXJlQWN0dWVsbGUrMSkgICsgJzonICsgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=