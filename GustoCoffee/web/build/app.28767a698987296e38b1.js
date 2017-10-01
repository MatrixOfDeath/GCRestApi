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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDUxMzU0NzM0ZTUyYzNjOWU5NDQiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwid2lkdGgiLCJzY3JvbGxUb3AiLCJjc3MiLCJzY3JvbGwiLCJsZW5ndGgiLCJidG4iLCJjbGljayIsInNob3ciLCJzcGFuIiwiaGlkZURpdiIsIm9uIiwiZSIsInRhcmdldCIsImhhc0NsYXNzIiwiaGlkZVBvcHVwIiwiYXR0ciIsImhpZGUiLCJsb2NhdGlvbiIsImhyZWYiLCJkb2N1bWVudCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidmFsIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwic3BsaXQiLCJoZXVyZUFjdHVlbGxlIiwicGFyc2VJbnQiLCJtaW51dGVBY3R1ZWxsZSIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJ0b3RhbFN0YXJ0VGltZSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaG91cnMiLCJtaW51dGVzIiwiY2hpbGRyZW4iLCJmaXJzdCIsInRleHQiLCJob3VyczIiLCJtaW51dGVzMiIsImxhc3QiLCJodG1sIiwic2V0SGFuZGxlcyIsInRvdGFsIiwicGVyY2VudCIsIngiLCJhcHBlbmQiLCJwYWQiLCJuIiwiZGlhbG9nIiwibW9kYWwiLCJidXR0b25zIiwiT2siLCJ0b29sdGlwIiwid24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REksU0FBU0EsTUFBVCxHQUFrQjtBQUNkLFFBQUlDLFNBQVNDLEVBQUUsV0FBRixDQUFiO0FBQ0EsUUFBSUEsRUFBRUMsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXJCLElBQTRCRixFQUFFQyxNQUFGLEVBQVVFLFNBQVYsS0FBd0IsR0FBeEQsRUFBNkQ7QUFDekRKLGVBQU9LLEdBQVAsQ0FBVyxFQUFDLFlBQVksT0FBYixFQUFzQixPQUFPLE9BQTdCLEVBQVg7QUFDQUosVUFBRSxZQUFGLEVBQWdCSSxHQUFoQixDQUFvQixFQUFDLFdBQVcsU0FBWixFQUFwQjtBQUNILEtBSEQsTUFJSztBQUNETCxlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLFVBQWIsRUFBeUIsT0FBTyxLQUFoQyxFQUFYO0FBQ0FKLFVBQUcsWUFBSCxFQUFrQkksR0FBbEIsQ0FBdUIsRUFBQyxXQUFXLE1BQVosRUFBdkI7QUFDSDs7QUFFRCxRQUFJSixF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bEIsQ0FBdUJ6QixnQkFBYyxHQUFkLEdBQW1CK0IsSUFBSTdCLGNBQUosQ0FBMUM7QUFDQS9DLGNBQUUsZUFBRixFQUFtQnNFLElBQW5CLENBQXlCekIsZ0JBQWMsQ0FBZixHQUFrQixHQUFsQixHQUF1QitCLElBQUk3QixjQUFKLENBQS9DO0FBQ0g7QUFDSjtBQUNKLENBM0pELEU7Ozs7Ozs7Ozs7OztBQ0RBOzs7QUFHQS9DLEVBQUUsWUFBVTtBQUNSQSxNQUFFLGtCQUFGLEVBQXNCa0YsT0FBdEI7QUFDSCxDQUZEOztBQUlBO0FBQ0FsRixFQUFFcUIsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVU7O0FBRXhCOztBQUVBdEIsTUFBRUMsTUFBRixFQUFVVyxFQUFWLENBQWEsUUFBYixFQUFzQixZQUFVO0FBQzVCLFlBQUl1RSxLQUFLbkYsRUFBRUMsTUFBRixFQUFVRSxTQUFWLEVBQVQ7QUFDQSxZQUFHZ0YsS0FBSyxFQUFSLEVBQVc7QUFDUG5GLGNBQUUsVUFBRixFQUFjeUIsUUFBZCxDQUF1QixZQUF2QjtBQUNBO0FBRUgsU0FKRCxNQUtJO0FBQ0F6QixjQUFFLFVBQUYsRUFBYzBCLFdBQWQsQ0FBMEIsWUFBMUI7QUFDQTtBQUNIO0FBQ0osS0FYRDtBQVlILENBaEJELEUiLCJmaWxlIjoiYXBwLjI4NzY3YTY5ODk4NzI5NmUzOGIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA1MTM1NDczNGU1MmMzYzllOTQ0IiwiXG4gICAgZnVuY3Rpb24gZml4RGl2KCkge1xuICAgICAgICB2YXIgJGNhY2hlID0gJCgnI2dldEZpeGVkJyk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA5OTEgJiYgJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAnZml4ZWQnLCAndG9wJzogJzI3NXB4J30pO1xuICAgICAgICAgICAgJChcIiNyZW1vdmVEaXZcIikuY3NzKHtcImRpc3BsYXlcIjogXCJpbmhlcml0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnMHB4J30pO1xuICAgICAgICAgICAgJCggXCIjcmVtb3ZlRGl2XCIgKS5jc3MoIHtcImRpc3BsYXlcIjogXCJub25lXCJ9ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTEgJiYgJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKXtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnMHB4J30pO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmaXhEaXYpO1xuICAgIGZpeERpdigpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2ZpeGRpdi5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGJ1dHRvbiwgb3BlbiB0aGUgbW9kYWxcbiAgICBpZigkKCcjbXlCdG4nKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBidXR0b24gdGhhdCBvcGVucyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIGJ0biA9ICQoJyNteUJ0bicpO1xuICAgICAgICBidG4uY2xpY2soIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2RpdiNteU1vZGFsJykuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbiAgICBpZiAoJCgnLmNsb3NlJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgPHNwYW4+IGVsZW1lbnQgdGhhdCBjbG9zZXMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBzcGFuID0gJCgnLmNsb3NlJyk7XG4gICAgICAgIHNwYW4uY2xpY2soIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZGVEaXYoKTtcbiAgICAgICAgICAgIC8vdXBkYXRlRGl2KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIjbXlNb2RhbFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygnbW9kYWwnKSkge1xuICAgICAgICAgICAgdmFyIGhpZGVQb3B1cCA9ICQoZS50YXJnZXQpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAkKCcjJyArIGhpZGVQb3B1cCkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxuICAgIC8vIHdpbmRvdy5jbGljayAoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAvLyAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBtb2RhbCkge1xuICAgIC8vICAgICAgICAgbW9kYWwuaGlkZSgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICBmdW5jdGlvbiBoaWRlRGl2KCkge1xuICAgICAgICAkKCAnI215TW9kYWwnICkuaGlkZSh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiI215TW9kYWxcIiApO1xuXG4gICAgfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIi8vIFNsaWRlclxuJChmdW5jdGlvbigpIHtcbiAgICAvKiogTGlzdGVzIGV0IGdyaWxsZXMgc2FsbGVzICoqL1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbGlzdCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO30pO1xuICAgICAgICAkKCcjZ3JpZCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykucmVtb3ZlQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2dyaWQtZ3JvdXAtaXRlbScpO30pO1xuICAgIH0pO1xuXG4gICAgLyoqIEluaXRpYXRlIGRhdGVwaWNrZXIgKiovXG4gICAgJCggXCIjZGF0ZXBpY2tlclwiICkuZGF0ZXBpY2tlcih7XG4gICAgICAgIG1heERhdGU6IFwiKzE1ZFwiLFxuICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkZWZhdWx0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ2RkL21tL3l5JyxcbiAgICAgICAgYWx0Rm9ybWF0OiAneXktbW0tZGQnLFxuICAgICAgICBhbHRGaWVsZDogJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcsXG4gICAgICAgIHJlZ2lvbmFsOiBcImZyXCJcblxuICAgIH0pO1xuICAgIC8vIEdlc3Rpb24gZGUgbGEgcmVnaW9uIGZyL2VuIHBvc2UgcHJvYmzDqG1lXG4gICAvLyAkKFwiI2RhdGVwaWNrZXJcIikuZGF0ZXBpY2tlcihcIm9wdGlvbnNcIiwgXCJkZWZhdWx0RGF0ZVwiLCBuZXcgRGF0ZSgpKTtcblxuICAgICQoJy51aS1zbGlkZXItaGFuZGxlJykuZHJhZ2dhYmxlKCk7XG5cbiAgICB2YXIgbWluID0gOTsgLy8gSGV1cmUgbWluIGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgbWF4ID0gMjE7IC8vIEhldXJlIG1heCBkJ291dmVydHVyZSBkdSBtYWdhc2luXG4gICAgdmFyIGRhdGVQaWNrZXJEYXRlID0gJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKTtcbiAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciB0b2RheURhdGUgPSAkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpO1xuICAgIC8vY29uc29sZS5sb2codG9kYXlEYXRlICsgJyBldCBkYXRlIHBpY2tlcicgKyBkYXRlUGlja2VyRGF0ZSk7XG5cbiAgICBpZiAoISEkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkpIHtcbiAgICAgICAgdmFyIGFyclRpbWUgPSAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkuc3BsaXQoJzonKTtcbiAgICAgICAgdmFyIGhldXJlQWN0dWVsbGUgPSBwYXJzZUludChhcnJUaW1lWzBdLCAxMCk7XG4gICAgICAgIHZhciBtaW51dGVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMV0sMTApO1xuICAgICAgICB0b2RheURhdGUgPSBhcnJUaW1lWzJdO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRvZGF5RGF0ZSsgJ2RhdGUgZHUgam91cnMnKTtcbiAgICAgICAgaWYgKG1pbnV0ZUFjdHVlbGxlIDwgMzApIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMzA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgbWluOiBtaW4gKiA2MCxcbiAgICAgICAgbWF4OiBtYXggKiA2MCxcbiAgICAgICAgbWluUmFuZ2U6IDYwLFxuICAgICAgICBzdGVwOiAzMCxcbiAgICAgICAgdmFsdWVzOiBbNTQwLCAxMzIwXSxcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG5cbiAgICAgICAgICAgIC8vIE9uIGxpbWl0ZSBsJ2ludGVydmFsbGUgbWluaW1hbCDDoCAxaCBwb3VyIHVuZSByZXNlcnZhdGlvbiBkZSBzYWxsZVxuICAgICAgICAgICAgaWYgKCAodWkudmFsdWVzWzBdICsgNTUpID49IHVpLnZhbHVlc1sxXSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEYW5zIGxlIGNhcyBvw7kgYydlc3QgbGEgZGF0ZSBkdSBqb3VyICFcbiAgICAgICAgICAgIGlmICgkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpID09IHRvZGF5RGF0ZSB8fCAhJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbFN0YXJ0VGltZSA9IGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlO1xuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codWkudmFsdWVzWzBdICsgJyAnKyB0b3RhbFN0YXJ0VGltZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodWkudmFsdWVzWzBdIDwgdG90YWxTdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgZXplc2ZzZCAnICsgdG90YWxTdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyQgKCcjc2xpZGVyLXJhbmdlJykuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLmRyYWdnYWJsZSggZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXIgZHUgcHJlbWllciBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dCggaG91cnMxKyc6JyttaW51dGVzMSApO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczIubGVuZ3RoIDwgMTApIGhvdXJzMj0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMi5sZW5ndGggPCAxMCkgbWludXRlczIgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMiA9PSAwKSBtaW51dGVzMiA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIERldXhpw6htZSBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KCBob3VyczIrJzonK21pbnV0ZXMyICk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxKyc6JyttaW51dGVzMSk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKGhvdXJzMisnOicrbWludXRlczIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQobWluKyc6MDAnKTtcbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KG1heCsnOjAwJyk7XG5cblxuXG4gICAgaWYoJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLmxlbmd0aCAmJiAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkgKSB7XG4gICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gQXJpdGhtw6l0aXF1ZTogb24gY2FsY3VsZSBsZSBub21icmUgZCdoZXVyZSB0b3RhbCBldCBvbiBjcsOpZSBsZXMgaW50ZXJ2YWxsZXMgc291aGFpdMOpLCBvbiBtZXR0cmEgZGVzIHBvaW50cyDDp1xuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuXG4gICAgZm9yICh2YXIgeCA9IDE7IHggPCB0b3RhbDsgeCsrKXtcbiAgICAgICAgJChcIi51aS1zbGlkZXJcIiApLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdkb3RzJyBzdHlsZT0nbGVmdDpcIisgeCAqIHBlcmNlbnQgKyBcIiUnPjwvc3Bhbj5cIik7XG5cbiAgICB9XG5cbiAgICAvLyBMb3JzcXUnb24gY2hhbmdlIGxlIGRhdGVwaWNrZXJcbiAgICAkKCcjZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYgKCQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkgPT0gJzIwMTctMDktMjInIHx8ICEkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpKXtcbiAgICAgICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWpvdXRlIHVuIDAgZGV2YW50IGxlcyBjaGlmZnJlcyBwb3VyIGwnYWZmaWNoYWdlIHRleHRlICFcbiAgICBmdW5jdGlvbiBwYWQobikge1xuICAgICAgICByZXR1cm4gKG4gPCAxMCkgPyAoXCIwXCIgKyBuKSA6IG47XG4gICAgfVxuICAgIC8vIFJlaW5pdGlhbGlzZSBsZXMgaGFuZGxlc1xuICAgIGZ1bmN0aW9uIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KXtcblxuICAgICAgICAvLyQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KGhldXJlQWN0dWVsbGUrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgLy8kKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG5cbiAgICAgICAgLy92YXIgaGV1cmVBY3R1ZWxsZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyggaGV1cmVBY3R1ZWxsZSArJyAnICArIG1pbiApO1xuICAgICAgICBpZiAoaGV1cmVBY3R1ZWxsZSA+PSBtYXggJiYgaGV1cmVBY3R1ZWxsZSA8IDI0KSB7XG4gICAgICAgICAgICAkKCBcIiNyZXNlcnZhdGlvbi1kaWFsb2ctbWVzc2FnZVwiICkuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoIHRoaXMgKS5kaWFsb2coIFwiY2xvc2VcIiApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNlIGlmKGhldXJlQWN0dWVsbGUgPj0gMCAmJiBoZXVyZUFjdHVlbGxlIDwgbWluKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXZyZSDDoCA5aCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoJ29wdGlvbicsICd2YWx1ZXMnLCBbKGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlKSwgKGhldXJlQWN0dWVsbGUgKiA2MCkgKyA2MCArIG1pbnV0ZUFjdHVlbGxlXSk7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlICsgJzonICsgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpICArICc6JyArIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lJykuaHRtbChoZXVyZUFjdHVlbGxlKyc6JysgcGFkKG1pbnV0ZUFjdHVlbGxlKSk7XG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbCgoaGV1cmVBY3R1ZWxsZSsxKSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuXG4kKGZ1bmN0aW9uKCl7XG4gICAgJCgnYS50Yy1saW5rW3RpdGxlXScpLnRvb2x0aXAoKTtcbn0pO1xuXG4vLyBCYXNpY3MgZmVhdHVyZXNcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAvLyAkKFwiI21haW5cIikub25lcGFnZV9zY3JvbGwoKTtcblxuICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3biA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgaWYod24gPiA1MCl7XG4gICAgICAgICAgICAkKCcjbWFpbk5hdicpLmFkZENsYXNzKCdtZW51LWJsYW5jJyk7XG4gICAgICAgICAgICAvLyQoXCIubmF2YmFyXCIpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZjhmOGY4XCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwiI2Y4ZjhmOFwifSkuZmFkZUluKCk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5yZW1vdmVDbGFzcygnbWVudS1ibGFuYycpO1xuICAgICAgICAgICAgLy8kKFwiLm5hdmJhclwiKS5jc3Moe1wiYmFja2dyb3VuZC1jb2xvclwiOlwidHJhbnNwYXJlbnRcIiwgXCJib3JkZXItY29sb3JcIjogXCJ0cmFuc3BhcmVudFwifSkuZmFkZUluKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=
