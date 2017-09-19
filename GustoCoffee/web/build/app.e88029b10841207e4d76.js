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


    $("#slider-range").slider({
        range: true,
        min: 540,
        max: 1320,
        step: 30,
        values: [600, 1320],
        slide: function slide(e, ui) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - hours1 * 60;

            if (hours1.length == 1) hours1 = '0' + hours1;
            if (minutes1.length == 1) minutes1 = '0' + minutes1;
            if (minutes1 == 0) minutes1 = '00';
            if (hours1 >= 12) {
                if (hours1 == 12) {
                    hours1 = hours1;
                    minutes1 = minutes1 + " PM";
                } else {
                    hours1 = hours1 - 12;
                    minutes1 = minutes1 + " PM";
                }
            } else {
                hours1 = hours1;
                minutes1 = minutes1 + " AM";
            }
            if (hours1 == 0) {
                hours1 = 12;
                minutes1 = minutes1;
            }

            $('.slider-time').html(hours1 + ':' + minutes1);

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - hours2 * 60;

            if (hours2.length == 1) hours2 = '0' + hours2;
            if (minutes2.length == 1) minutes2 = '0' + minutes2;
            if (minutes2 == 0) minutes2 = '00';
            if (hours2 >= 12) {
                if (hours2 == 12) {
                    hours2 = hours2;
                    minutes2 = minutes2 + " PM";
                } else if (hours2 == 24) {
                    hours2 = 11;
                    minutes2 = "59 PM";
                } else {
                    hours2 = hours2 - 12;
                    minutes2 = minutes2 + " PM";
                }
            } else {
                hours2 = hours2;
                minutes2 = minutes2 + " AM";
            }

            $('.slider-time2').html(hours2 + ':' + minutes2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2NkZGM4MGM5MWNiM2ZjOTI3YTgiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvc2NyaXB0cy5qcyJdLCJuYW1lcyI6WyJmaXhEaXYiLCIkY2FjaGUiLCIkIiwid2luZG93Iiwic2Nyb2xsVG9wIiwiY3NzIiwic2Nyb2xsIiwibGVuZ3RoIiwiYnRuIiwiY2xpY2siLCJzaG93Iiwic3BhbiIsImhpZGVEaXYiLCJvbiIsImUiLCJ0YXJnZXQiLCJoYXNDbGFzcyIsImhpZGVQb3B1cCIsImF0dHIiLCJoaWRlIiwibG9jYXRpb24iLCJocmVmIiwic2xpZGVyIiwicmFuZ2UiLCJtaW4iLCJtYXgiLCJzdGVwIiwidmFsdWVzIiwic2xpZGUiLCJ1aSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaHRtbCIsImhvdXJzMiIsIm1pbnV0ZXMyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FD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cEVELEU7Ozs7Ozs7Ozs7OztBQ0RBLDRCIiwiZmlsZSI6ImFwcC5lODgwMjliMTA4NDEyMDdlNGQ3Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzY2RkYzgwYzkxY2IzZmM5MjdhOCIsIlxuICAgIGZ1bmN0aW9uIGZpeERpdigpIHtcbiAgICAgICAgdmFyICRjYWNoZSA9ICQoJyNnZXRGaXhlZCcpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAnZml4ZWQnLCAndG9wJzogJzI3NXB4J30pO1xuICAgICAgICAgICAgJChcIiNyZW1vdmVEaXZcIikuY3NzKHtcImRpc3BsYXlcIjogXCJpbmhlcml0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnLTkwcHgnfSk7XG4gICAgICAgICAgICAkKCBcIiNyZW1vdmVEaXZcIiApLmNzcygge1wiZGlzcGxheVwiOiBcIm5vbmVcIn0gKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICQod2luZG93KS5zY3JvbGwoZml4RGl2KTtcbiAgICBmaXhEaXYoKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBidXR0b24sIG9wZW4gdGhlIG1vZGFsXG4gICAgaWYoJCgnI215QnRuJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgYnV0dG9uIHRoYXQgb3BlbnMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBidG4gPSAkKCcjbXlCdG4nKTtcbiAgICAgICAgYnRuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdkaXYjbXlNb2RhbCcpLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgaWYgKCQoJy5jbG9zZScpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIDxzcGFuPiBlbGVtZW50IHRoYXQgY2xvc2VzIHRoZSBtb2RhbFxuICAgICAgICB2YXIgc3BhbiA9ICQoJy5jbG9zZScpO1xuICAgICAgICBzcGFuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoaWRlRGl2KCk7XG4gICAgICAgICAgICAvL3VwZGF0ZURpdigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiI215TW9kYWxcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ21vZGFsJykpIHtcbiAgICAgICAgICAgIHZhciBoaWRlUG9wdXAgPSAkKGUudGFyZ2V0KS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgJCgnIycgKyBoaWRlUG9wdXApLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICAvLyB3aW5kb3cuY2xpY2sgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICAvLyAgICAgICAgIG1vZGFsLmhpZGUoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlkZURpdigpIHtcbiAgICAgICAgJCggJyNteU1vZGFsJyApLmhpZGUod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiNteU1vZGFsXCIgKTtcblxuICAgIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvbW9kYWwuanMiLCIvLyBTbGlkZXJcbiQoZnVuY3Rpb24oKSB7XG4gICAgLy8gJChcIi5zbGlkZXItcmFuZ2VcIikuc2xpZGVyKHsgcmFuZ2U6IHRydWUsIG1pbjogMCwgbWF4OiAxNDQwLCBzdGVwOiAzMCwgc2xpZGU6IGZ1bmN0aW9uKGUsIHVpKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKHVpLnZhbHVlIC8gNjApOyB2YXIgbWludXRlcyA9IHVpLnZhbHVlIC0gKGhvdXJzICogNjApO1xuICAgIC8vICAgICAgICAgaWYoaG91cnMudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkgaG91cnMgPSAnMCcgKyBob3VycztcbiAgICAvLyAgICAgICAgIGlmKG1pbnV0ZXMudG9TdHJpbmcoKS5sZW5ndGggPT0gMSkgbWludXRlcyA9ICcwJyArIG1pbnV0ZXM7XG4gICAgLy8gICAgICAgICAvLyQoJyNzb21ldGhpbmcnKS5odG1sKGhvdXJzKyc6JyttaW51dGVzKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgbWluOiA1NDAsXG4gICAgICAgIG1heDogMTMyMCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogWzYwMCwgMTMyMF0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiAoZSwgdWkpIHtcbiAgICAgICAgICAgIHZhciBob3VyczEgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1swXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMSA9IHVpLnZhbHVlc1swXSAtIChob3VyczEgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmIChob3VyczEubGVuZ3RoID09IDEpIGhvdXJzMSA9ICcwJyArIGhvdXJzMTtcbiAgICAgICAgICAgIGlmIChtaW51dGVzMS5sZW5ndGggPT0gMSkgbWludXRlczEgPSAnMCcgKyBtaW51dGVzMTtcbiAgICAgICAgICAgIGlmIChtaW51dGVzMSA9PSAwKSBtaW51dGVzMSA9ICcwMCc7XG4gICAgICAgICAgICBpZiAoaG91cnMxID49IDEyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXJzMSA9PSAxMikge1xuICAgICAgICAgICAgICAgICAgICBob3VyczEgPSBob3VyczE7XG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMxID0gbWludXRlczEgKyBcIiBQTVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXJzMSA9IGhvdXJzMSAtIDEyO1xuICAgICAgICAgICAgICAgICAgICBtaW51dGVzMSA9IG1pbnV0ZXMxICsgXCIgUE1cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvdXJzMSA9IGhvdXJzMTtcbiAgICAgICAgICAgICAgICBtaW51dGVzMSA9IG1pbnV0ZXMxICsgXCIgQU1cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChob3VyczEgPT0gMCkge1xuICAgICAgICAgICAgICAgIGhvdXJzMSA9IDEyO1xuICAgICAgICAgICAgICAgIG1pbnV0ZXMxID0gbWludXRlczE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxICsgJzonICsgbWludXRlczEpO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZiAoaG91cnMyLmxlbmd0aCA9PSAxKSBob3VyczIgPSAnMCcgKyBob3VyczI7XG4gICAgICAgICAgICBpZiAobWludXRlczIubGVuZ3RoID09IDEpIG1pbnV0ZXMyID0gJzAnICsgbWludXRlczI7XG4gICAgICAgICAgICBpZiAobWludXRlczIgPT0gMCkgbWludXRlczIgPSAnMDAnO1xuICAgICAgICAgICAgaWYgKGhvdXJzMiA+PSAxMikge1xuICAgICAgICAgICAgICAgIGlmIChob3VyczIgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgaG91cnMyID0gaG91cnMyO1xuICAgICAgICAgICAgICAgICAgICBtaW51dGVzMiA9IG1pbnV0ZXMyICsgXCIgUE1cIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzMiA9PSAyNCkge1xuICAgICAgICAgICAgICAgICAgICBob3VyczIgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgbWludXRlczIgPSBcIjU5IFBNXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaG91cnMyID0gaG91cnMyIC0gMTI7XG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMyID0gbWludXRlczIgKyBcIiBQTVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG91cnMyID0gaG91cnMyO1xuICAgICAgICAgICAgICAgIG1pbnV0ZXMyID0gbWludXRlczIgKyBcIiBBTVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbChob3VyczIgKyAnOicgKyBtaW51dGVzMik7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcmVzZXJ2YXRpb24vY2hlY2tEaXNwb0RhdGUuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9