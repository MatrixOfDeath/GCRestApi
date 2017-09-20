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
    // $(".slider-range").slider({ range: true, min: 0, max: 1440, step: 30, slide: function(e, ui)
    //     {
    //         var hours = Math.floor(ui.value / 60); var minutes = ui.value - (hours * 60);
    //         if(hours.toString().length == 1) hours = '0' + hours;
    //         if(minutes.toString().length == 1) minutes = '0' + minutes;
    //         //$('#something').html(hours+':'+minutes);
    //     }
    // });

    $(document).ready(function () {
        $('#list').click(function (event) {
            event.preventDefault();
            $('#display-salle .cardSalle').addClass('list-group-item');
        });
        $('#grid').click(function (event) {
            event.preventDefault();
            $('#display-salle .cardSalle').removeClass('list-group-item');$('#display-salle .cardSalle').addClass('grid-group-item');
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
        setDate: new Date()

    });

    $('#datepicker').val(new Date());

    $('.ui-slider-handle').draggable();

    var min = 10; // Heure min d'ouverture
    var max = 21; // Heure max d'ouverture


    $("#slider-range").slider({
        range: true,
        min: min * 60,
        max: max * 60,
        step: 30,
        values: [600, 1320],
        slide: function slide(event, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - hours1 * 60;

            if (hours1.length < 10) hours1 = '0' + hours;
            if (minutes1.length < 10) minutes1 = '0' + minutes;

            if (minutes1 == 0) minutes1 = '00';

            // valeur
            $("#slider-range").children(".ui-slider-handle").first().text(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - hours2 * 60;

            if (hours2.length < 10) hours2 = '0' + hours;
            if (minutes2.length < 10) minutes2 = '0' + minutes;

            if (minutes2 == 0) minutes2 = '00';

            $("#slider-range").children(".ui-slider-handle").last().text(hours2 + ':' + minutes2);

            $('.slider-time').html(hours1 + ':' + minutes1);

            $('.slider-time2').html(hours2 + ':' + minutes2);
        }
    });
    $("#slider-range").children(".ui-slider-handle").first().text('9:00');
    $("#slider-range").children(".ui-slider-handle").last().text('21:00');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTczMmVlNjhmMTRiZjc0NzIwYzciLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwic2Nyb2xsVG9wIiwiY3NzIiwic2Nyb2xsIiwibGVuZ3RoIiwiYnRuIiwiY2xpY2siLCJzaG93Iiwic3BhbiIsImhpZGVEaXYiLCJvbiIsImUiLCJ0YXJnZXQiLCJoYXNDbGFzcyIsImhpZGVQb3B1cCIsImF0dHIiLCJoaWRlIiwibG9jYXRpb24iLCJocmVmIiwiZG9jdW1lbnQiLCJyZWFkeSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZGF0ZXBpY2tlciIsIm1heERhdGUiLCJtaW5EYXRlIiwiRGF0ZSIsImRlZmF1bHREYXRlIiwiZGF0ZUZvcm1hdCIsImFsdEZvcm1hdCIsImFsdEZpZWxkIiwic2V0RGF0ZSIsInZhbCIsImRyYWdnYWJsZSIsIm1pbiIsIm1heCIsInNsaWRlciIsInJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJob3VyczEiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzMSIsImhvdXJzIiwibWludXRlcyIsImNoaWxkcmVuIiwiZmlyc3QiLCJ0ZXh0IiwiaG91cnMyIiwibWludXRlczIiLCJsYXN0IiwiaHRtbCIsInRvdGFsIiwicGVyY2VudCIsIngiLCJhcHBlbmQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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RUFBMkJFLEdBQTNCLEVBQStCO0FBQzNCNUQsVUFBRSxZQUFGLEVBQWlCNkQsTUFBakIsQ0FBd0Isb0NBQW1DRCxJQUFJRCxPQUF2QyxHQUFpRCxZQUF6RTtBQUVIO0FBQ0osQ0EvRUQsRTs7Ozs7Ozs7Ozs7O0FDREEsNEIiLCJmaWxlIjoiYXBwLjViODY0OTFiYjc5MjY2MDYyOTA1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3MzJlZTY4ZjE0YmY3NDcyMGM3IiwiXG4gICAgZnVuY3Rpb24gZml4RGl2KCkge1xuICAgICAgICB2YXIgJGNhY2hlID0gJCgnI2dldEZpeGVkJyk7XG4gICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAyMDApIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdmaXhlZCcsICd0b3AnOiAnMjc1cHgnfSk7XG4gICAgICAgICAgICAkKFwiI3JlbW92ZURpdlwiKS5jc3Moe1wiZGlzcGxheVwiOiBcImluaGVyaXRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJGNhY2hlLmNzcyh7J3Bvc2l0aW9uJzogJ3JlbGF0aXZlJywgJ3RvcCc6ICctOTBweCd9KTtcbiAgICAgICAgICAgICQoIFwiI3JlbW92ZURpdlwiICkuY3NzKCB7XCJkaXNwbGF5XCI6IFwibm9uZVwifSApO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmaXhEaXYpO1xuICAgIGZpeERpdigpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2ZpeGRpdi5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuLy8gV2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIGJ1dHRvbiwgb3BlbiB0aGUgbW9kYWxcbiAgICBpZigkKCcjbXlCdG4nKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBidXR0b24gdGhhdCBvcGVucyB0aGUgbW9kYWxcbiAgICAgICAgdmFyIGJ0biA9ICQoJyNteUJ0bicpO1xuICAgICAgICBidG4uY2xpY2soIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ2RpdiNteU1vZGFsJykuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiA8c3Bhbj4gKHgpLCBjbG9zZSB0aGUgbW9kYWxcbiAgICBpZiAoJCgnLmNsb3NlJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgPHNwYW4+IGVsZW1lbnQgdGhhdCBjbG9zZXMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBzcGFuID0gJCgnLmNsb3NlJyk7XG4gICAgICAgIHNwYW4uY2xpY2soIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZGVEaXYoKTtcbiAgICAgICAgICAgIC8vdXBkYXRlRGl2KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCIjbXlNb2RhbFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5oYXNDbGFzcygnbW9kYWwnKSkge1xuICAgICAgICAgICAgdmFyIGhpZGVQb3B1cCA9ICQoZS50YXJnZXQpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAkKCcjJyArIGhpZGVQb3B1cCkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIGFueXdoZXJlIG91dHNpZGUgb2YgdGhlIG1vZGFsLCBjbG9zZSBpdFxuICAgIC8vIHdpbmRvdy5jbGljayAoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAvLyAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBtb2RhbCkge1xuICAgIC8vICAgICAgICAgbW9kYWwuaGlkZSgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICBmdW5jdGlvbiBoaWRlRGl2KCkge1xuICAgICAgICAkKCAnI215TW9kYWwnICkuaGlkZSh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiI215TW9kYWxcIiApO1xuXG4gICAgfVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIi8vIFNsaWRlclxuJChmdW5jdGlvbigpIHtcbiAgICAvLyAkKFwiLnNsaWRlci1yYW5nZVwiKS5zbGlkZXIoeyByYW5nZTogdHJ1ZSwgbWluOiAwLCBtYXg6IDE0NDAsIHN0ZXA6IDMwLCBzbGlkZTogZnVuY3Rpb24oZSwgdWkpXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIHZhciBob3VycyA9IE1hdGguZmxvb3IodWkudmFsdWUgLyA2MCk7IHZhciBtaW51dGVzID0gdWkudmFsdWUgLSAoaG91cnMgKiA2MCk7XG4gICAgLy8gICAgICAgICBpZihob3Vycy50b1N0cmluZygpLmxlbmd0aCA9PSAxKSBob3VycyA9ICcwJyArIGhvdXJzO1xuICAgIC8vICAgICAgICAgaWYobWludXRlcy50b1N0cmluZygpLmxlbmd0aCA9PSAxKSBtaW51dGVzID0gJzAnICsgbWludXRlcztcbiAgICAvLyAgICAgICAgIC8vJCgnI3NvbWV0aGluZycpLmh0bWwoaG91cnMrJzonK21pbnV0ZXMpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2xpc3QnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTt9KTtcbiAgICAgICAgJCgnI2dyaWQnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLnJlbW92ZUNsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTskKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2dyaWQtZ3JvdXAtaXRlbScpO30pO1xuICAgIH0pO1xuXG4gICAgLyoqIEluaXRpYXRlIGRhdGVwaWNrZXIgKiovXG4gICAgJCggXCIjZGF0ZXBpY2tlclwiICkuZGF0ZXBpY2tlcih7XG4gICAgICAgIG1heERhdGU6IFwiKzE1ZFwiLFxuICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkZWZhdWx0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ2RkL21tL3l5JyxcbiAgICAgICAgYWx0Rm9ybWF0OiAneXktbW0tZGQnLFxuICAgICAgICBhbHRGaWVsZDogJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcsXG4gICAgICAgIHNldERhdGU6IG5ldyBEYXRlKClcblxuICAgIH0pO1xuXG4gICAgJCgnI2RhdGVwaWNrZXInKS52YWwobmV3IERhdGUoKSk7XG5cbiAgICAkKCcudWktc2xpZGVyLWhhbmRsZScpLmRyYWdnYWJsZSgpO1xuXG4gICAgdmFyIG1pbiA9IDEwOyAvLyBIZXVyZSBtaW4gZCdvdXZlcnR1cmVcbiAgICB2YXIgbWF4ID0gMjE7IC8vIEhldXJlIG1heCBkJ291dmVydHVyZVxuXG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgbWluOiBtaW4gKiA2MCxcbiAgICAgICAgbWF4OiBtYXggKiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogWzYwMCwgMTMyMF0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXJcbiAgICAgICAgICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KCBob3VyczErJzonK21pbnV0ZXMxICk7XG5cbiAgICAgICAgICAgIHZhciBob3VyczIgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1sxXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMiA9IHVpLnZhbHVlc1sxXSAtIChob3VyczIgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmKGhvdXJzMi5sZW5ndGggPCAxMCkgaG91cnMyPSAnMCcgKyBob3VycztcbiAgICAgICAgICAgIGlmKG1pbnV0ZXMyLmxlbmd0aCA8IDEwKSBtaW51dGVzMiA9ICcwJyArIG1pbnV0ZXM7XG5cbiAgICAgICAgICAgIGlmKG1pbnV0ZXMyID09IDApIG1pbnV0ZXMyID0gJzAwJztcblxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCggaG91cnMyKyc6JyttaW51dGVzMiApO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhvdXJzMSsnOicrbWludXRlczEpO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbChob3VyczIrJzonK21pbnV0ZXMyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS50ZXh0KCc5OjAwJyk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgnMjE6MDAnKTtcblxuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuICAgIGZvciAodmFyIHggPSAxOyB4IDwgdG90YWw7IHgrKyl7XG4gICAgICAgICQoXCIudWktc2xpZGVyXCIgKS5hcHBlbmQoXCI8c3BhbiBjbGFzcz0nZG90cycgc3R5bGU9J2xlZnQ6XCIrIHggKiBwZXJjZW50ICsgXCIlJz48L3NwYW4+XCIpO1xuXG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIi8vdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=