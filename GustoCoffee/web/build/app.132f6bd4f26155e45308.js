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
    $("#datepicker").blur(function () {
        val = $(this).val();
        val1 = Date.parse(val);
        if (isNaN(val1) == true && val !== '') {
            alert("Aucune date pour la recherche n'est saisie !");
        } else {
            console.log(val1);
        }
    });

    // Gestion de la region fr pose problème
    // $("#datepicker").datepicker("options", "defaultDate", new Date());

    $('.ui-slider-handle').draggable();

    var min = 9; // Heure min d'ouverture du magasin
    var max = 21; // Heure max d'ouverture du magasin


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

    console.log($('#slider-range .heureActuelleDefaut'));

    if ($('#slider-range .heureActuelleDefaut').length && $('#slider-range .heureActuelleDefaut').val()) {
        var heureActuelle = $('#slider-range .heureActuelleDefaut').val();
        if (heureActuelle > max || heureActuelle < min) {
            console.log("Too late or early");
        } else {

            $("#slider-range").slider('option', 'values', [heureActuelle * 60, heureActuelle * 60 + 60]);
        }
    }
    // Arithmétique: on calcule le nombre d'heure total et on crée les intervalles souhaité, on mettra des points ç
    var total = (max - min) * 2; // car 60 minutes = 2 * 30 minutes :)
    var percent = 100 / total;
    for (var x = 1; x < total; x++) {
        $(".ui-slider").append("<span class='dots' style='left:" + x * percent + "%'></span>");
    }

    $("#reservation-dialog-message").dialog({
        modal: true,
        buttons: {
            Ok: function Ok() {
                $(this).dialog("close");
            }
        }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjRkMjJjNjMzZGRiYjQwNTQ5NTEiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwic2Nyb2xsVG9wIiwiY3NzIiwic2Nyb2xsIiwibGVuZ3RoIiwiYnRuIiwiY2xpY2siLCJzaG93Iiwic3BhbiIsImhpZGVEaXYiLCJvbiIsImUiLCJ0YXJnZXQiLCJoYXNDbGFzcyIsImhpZGVQb3B1cCIsImF0dHIiLCJoaWRlIiwibG9jYXRpb24iLCJocmVmIiwiZG9jdW1lbnQiLCJyZWFkeSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZGF0ZXBpY2tlciIsIm1heERhdGUiLCJtaW5EYXRlIiwiRGF0ZSIsImRlZmF1bHREYXRlIiwiZGF0ZUZvcm1hdCIsImFsdEZvcm1hdCIsImFsdEZpZWxkIiwicmVnaW9uYWwiLCJibHVyIiwidmFsIiwidmFsMSIsInBhcnNlIiwiaXNOYU4iLCJhbGVydCIsImNvbnNvbGUiLCJsb2ciLCJkcmFnZ2FibGUiLCJtaW4iLCJtYXgiLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJob3VyczEiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzMSIsImhvdXJzIiwibWludXRlcyIsImNoaWxkcmVuIiwiZmlyc3QiLCJ0ZXh0IiwiaG91cnMyIiwibWludXRlczIiLCJsYXN0IiwiaHRtbCIsImhldXJlQWN0dWVsbGUiLCJ0b3RhbCIsInBlcmNlbnQiLCJ4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QUFtQ0QsSUFBSUQsT0FBdkMsR0FBaUQsWUFBekU7QUFFSDs7QUFFRHBFLE1BQUcsNkJBQUgsRUFBbUN1RSxNQUFuQyxDQUEwQztBQUN0Q0MsZUFBTyxJQUQrQjtBQUV0Q0MsaUJBQVM7QUFDTEMsZ0JBQUksY0FBVztBQUNYMUUsa0JBQUcsSUFBSCxFQUFVdUUsTUFBVixDQUFrQixPQUFsQjtBQUNIO0FBSEk7QUFGNkIsS0FBMUM7QUFRSCxDQWhIRCxFOzs7Ozs7Ozs7Ozs7QUNEQSw0QiIsImZpbGUiOiJhcHAuMTMyZjZiZDRmMjYxNTVlNDUzMDguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjRkMjJjNjMzZGRiYjQwNTQ5NTEiLCJcbiAgICBmdW5jdGlvbiBmaXhEaXYoKSB7XG4gICAgICAgIHZhciAkY2FjaGUgPSAkKCcjZ2V0Rml4ZWQnKTtcbiAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IDIwMCkge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ2ZpeGVkJywgJ3RvcCc6ICcyNzVweCd9KTtcbiAgICAgICAgICAgICQoXCIjcmVtb3ZlRGl2XCIpLmNzcyh7XCJkaXNwbGF5XCI6IFwiaW5oZXJpdFwifSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAncmVsYXRpdmUnLCAndG9wJzogJy05MHB4J30pO1xuICAgICAgICAgICAgJCggXCIjcmVtb3ZlRGl2XCIgKS5jc3MoIHtcImRpc3BsYXlcIjogXCJub25lXCJ9ICk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZpeERpdik7XG4gICAgZml4RGl2KCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvZml4ZGl2LmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG4vLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgYnV0dG9uLCBvcGVuIHRoZSBtb2RhbFxuICAgIGlmKCQoJyNteUJ0bicpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIGJ1dHRvbiB0aGF0IG9wZW5zIHRoZSBtb2RhbFxuICAgICAgICB2YXIgYnRuID0gJCgnI215QnRuJyk7XG4gICAgICAgIGJ0bi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnZGl2I215TW9kYWwnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIDxzcGFuPiAoeCksIGNsb3NlIHRoZSBtb2RhbFxuICAgIGlmICgkKCcuY2xvc2UnKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSA8c3Bhbj4gZWxlbWVudCB0aGF0IGNsb3NlcyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIHNwYW4gPSAkKCcuY2xvc2UnKTtcbiAgICAgICAgc3Bhbi5jbGljayggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGlkZURpdigpO1xuICAgICAgICAgICAgLy91cGRhdGVEaXYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgJChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIiNteU1vZGFsXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdtb2RhbCcpKSB7XG4gICAgICAgICAgICB2YXIgaGlkZVBvcHVwID0gJChlLnRhcmdldCkuYXR0cignaWQnKTtcbiAgICAgICAgICAgICQoJyMnICsgaGlkZVBvcHVwKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgYW55d2hlcmUgb3V0c2lkZSBvZiB0aGUgbW9kYWwsIGNsb3NlIGl0XG4gICAgLy8gd2luZG93LmNsaWNrIChmdW5jdGlvbihldmVudCkge1xuICAgIC8vICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG1vZGFsKSB7XG4gICAgLy8gICAgICAgICBtb2RhbC5oaWRlKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZGVEaXYoKSB7XG4gICAgICAgICQoICcjbXlNb2RhbCcgKS5oaWRlKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIjbXlNb2RhbFwiICk7XG5cbiAgICB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL21vZGFsLmpzIiwiLy8gU2xpZGVyXG4kKGZ1bmN0aW9uKCkge1xuICAgIC8qKiBMaXN0ZXMgZXQgZ3JpbGxlcyBzYWxsZXMgKiovXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJyNsaXN0JykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7fSk7XG4gICAgICAgICQoJyNncmlkJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5yZW1vdmVDbGFzcygnbGlzdC1ncm91cC1pdGVtJyk7XG4gICAgICAgICQoJyNkaXNwbGF5LXNhbGxlIC5jYXJkU2FsbGUnKS5hZGRDbGFzcygnZ3JpZC1ncm91cC1pdGVtJyk7fSk7XG4gICAgfSk7XG5cbiAgICAvKiogSW5pdGlhdGUgZGF0ZXBpY2tlciAqKi9cbiAgICAkKCBcIiNkYXRlcGlja2VyXCIgKS5kYXRlcGlja2VyKHtcbiAgICAgICAgbWF4RGF0ZTogXCIrMTVkXCIsXG4gICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRlZmF1bHREYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlRm9ybWF0OiAnZGQvbW0veXknLFxuICAgICAgICBhbHRGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGFsdEZpZWxkOiAnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JyxcbiAgICAgICAgcmVnaW9uYWw6IFwiZnJcIlxuXG4gICAgICAgIC8vc2V0RGF0ZTogbmV3IERhdGUoKVxuXG4gICAgfSk7XG4gICAgJChcIiNkYXRlcGlja2VyXCIpLmJsdXIoZnVuY3Rpb24oKXtcbiAgICAgICAgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgdmFsMSA9IERhdGUucGFyc2UodmFsKTtcbiAgICAgICAgaWYgKGlzTmFOKHZhbDEpPT10cnVlICYmIHZhbCE9PScnKXtcbiAgICAgICAgICAgIGFsZXJ0KFwiQXVjdW5lIGRhdGUgcG91ciBsYSByZWNoZXJjaGUgbidlc3Qgc2Fpc2llICFcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbDEpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBHZXN0aW9uIGRlIGxhIHJlZ2lvbiBmciBwb3NlIHByb2Jsw6htZVxuICAgLy8gJChcIiNkYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoXCJvcHRpb25zXCIsIFwiZGVmYXVsdERhdGVcIiwgbmV3IERhdGUoKSk7XG5cbiAgICAkKCcudWktc2xpZGVyLWhhbmRsZScpLmRyYWdnYWJsZSgpO1xuXG4gICAgdmFyIG1pbiA9IDk7IC8vIEhldXJlIG1pbiBkJ291dmVydHVyZSBkdSBtYWdhc2luXG4gICAgdmFyIG1heCA9IDIxOyAvLyBIZXVyZSBtYXggZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuXG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgbWluOiBtaW4gKiA2MCxcbiAgICAgICAgbWF4OiBtYXggKiA2MCxcbiAgICAgICAgbWluUmFuZ2U6IDYwLFxuICAgICAgICBzdGVwOiAzMCxcbiAgICAgICAgdmFsdWVzOiBbNTQwLCAxMzIwXSxcbiAgICAgICAgc2xpZGU6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XG4gICAgICAgICAgICAvLyBPbiBsaW1pdGUgbCdpbnRlcnZhbGxlIG1pbmltYWwgw6AgMWggcG91ciB1bmUgcmVzZXJ2YXRpb24gZGUgc2FsbGVcbiAgICAgICAgICAgIGlmICggKHVpLnZhbHVlc1swXSArIDU1KSA+PSB1aS52YWx1ZXNbMV0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXIgZHUgcHJlbWllciBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dCggaG91cnMxKyc6JyttaW51dGVzMSApO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczIubGVuZ3RoIDwgMTApIGhvdXJzMj0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMi5sZW5ndGggPCAxMCkgbWludXRlczIgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMiA9PSAwKSBtaW51dGVzMiA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIERldXhpw6htZSBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KCBob3VyczIrJzonK21pbnV0ZXMyICk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxKyc6JyttaW51dGVzMSk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKGhvdXJzMisnOicrbWludXRlczIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQobWluKyc6MDAnKTtcbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KG1heCsnOjAwJyk7XG5cbiAgICBjb25zb2xlLmxvZygkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykpO1xuXG4gICAgaWYoJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLmxlbmd0aCAmJiAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkgKSB7XG4gICAgICAgIHZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICBpZiAoaGV1cmVBY3R1ZWxsZSA+IG1heCB8fCBoZXVyZUFjdHVlbGxlIDwgbWluKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRvbyBsYXRlIG9yIGVhcmx5XCIpO1xuICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKCdvcHRpb24nLCAndmFsdWVzJywgW2hldXJlQWN0dWVsbGUgKiA2MCwgKGhldXJlQWN0dWVsbGUgKiA2MCkgKyA2MF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEFyaXRobcOpdGlxdWU6IG9uIGNhbGN1bGUgbGUgbm9tYnJlIGQnaGV1cmUgdG90YWwgZXQgb24gY3LDqWUgbGVzIGludGVydmFsbGVzIHNvdWhhaXTDqSwgb24gbWV0dHJhIGRlcyBwb2ludHMgw6dcbiAgICB2YXIgdG90YWwgPSAobWF4IC0gbWluICkgKiAyOyAvLyBjYXIgNjAgbWludXRlcyA9IDIgKiAzMCBtaW51dGVzIDopXG4gICAgdmFyIHBlcmNlbnQgPSAxMDAgLyB0b3RhbDtcbiAgICBmb3IgKHZhciB4ID0gMTsgeCA8IHRvdGFsOyB4Kyspe1xuICAgICAgICAkKFwiLnVpLXNsaWRlclwiICkuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2RvdHMnIHN0eWxlPSdsZWZ0OlwiKyB4ICogcGVyY2VudCArIFwiJSc+PC9zcGFuPlwiKTtcblxuICAgIH1cblxuICAgICQoIFwiI3Jlc2VydmF0aW9uLWRpYWxvZy1tZXNzYWdlXCIgKS5kaWFsb2coe1xuICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgT2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoIHRoaXMgKS5kaWFsb2coIFwiY2xvc2VcIiApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==