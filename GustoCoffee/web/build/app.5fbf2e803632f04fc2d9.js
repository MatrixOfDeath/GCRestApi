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
    $('ul.nav li.dropdown').hover(function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });

    // $('.navbar .dropdown').hover(function() {
    //     $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
    //
    // }, function() {
    //     $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
    //
    // });

    $('.dropdown-toggle').click(function () {
        var location = $(this).attr('href');
        window.location.href = location;
        return false;
    });

    $(window).on("scroll", function () {
        var wn = $(window).scrollTop();
        // if(wn > 30){
        //     $('#mainNav').css({"margin-top" : 0}).fadeIn("slow");
        // }else{
        //     $('#mainNav').css({"margin-top" : 20}).fadeIn("slow");
        // }
        if (wn > 50) {
            $('#mainNav').addClass('menu-blanc');
            $('#mainNav').removeClass('marginTop');
            $('#mainNav').css({ "width": "100%" }).fadeIn("slow");

            //$(".navbar").css({"background-color":"#f8f8f8", "border-color": "#f8f8f8"}).fadeIn();
        } else {
            $('#mainNav').removeClass('menu-blanc');
            $('#mainNav').addClass('marginTop');
            $('#mainNav').css({ "width": "98%" }).fadeIn("slow");

            //$(".navbar").css({"background-color":"transparent", "border-color": "transparent"}).fadeIn();
        }
    });
});

/***/ }),

/***/ 0:
/*!****************************************************************************************************************!*\
  !*** multi ./web/assets/js/scripts.js ./web/assets/js/fixdiv.js ./web/assets/js/reservation/checkDispoDate.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/scripts.js */"./web/assets/js/scripts.js");
__webpack_require__(/*! ./web/assets/js/fixdiv.js */"./web/assets/js/fixdiv.js");
module.exports = __webpack_require__(/*! ./web/assets/js/reservation/checkDispoDate.js */"./web/assets/js/reservation/checkDispoDate.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTA0OTU2MmQzMzI4NmNiZTY0MGYiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3NjcmlwdHMuanMiXSwibmFtZXMiOlsiZml4RGl2IiwiJGNhY2hlIiwiJCIsIndpbmRvdyIsIndpZHRoIiwic2Nyb2xsVG9wIiwiY3NzIiwic2Nyb2xsIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNsaWNrIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwiZGF0ZXBpY2tlciIsIm1heERhdGUiLCJtaW5EYXRlIiwiRGF0ZSIsImRlZmF1bHREYXRlIiwiZGF0ZUZvcm1hdCIsImFsdEZvcm1hdCIsImFsdEZpZWxkIiwicmVnaW9uYWwiLCJkcmFnZ2FibGUiLCJhcnJNaW4iLCJ2YWwiLCJzcGxpdCIsImFyck1heCIsIm1pbkgiLCJwYXJzZUludCIsIm1pbk0iLCJtYXhIIiwibWF4TSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwiaGV1cmVBY3R1ZWxsZSIsIm1pbnV0ZUFjdHVlbGxlIiwic2xpZGVyIiwicmFuZ2UiLCJtaW5SYW5nZSIsInN0ZXAiLCJ2YWx1ZXMiLCJzbGlkZSIsInVpIiwidG90YWxTdGFydFRpbWUiLCJob3VyczEiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzMSIsImhvdXJzIiwibWludXRlcyIsImNoaWxkcmVuIiwiZmlyc3QiLCJ0ZXh0IiwiaG91cnMyIiwibWludXRlczIiLCJsYXN0IiwiaHRtbCIsInBhZCIsInNldEhhbmRsZXMiLCJ0b3RhbCIsInBlcmNlbnQiLCJ4IiwiYXBwZW5kIiwib24iLCJlIiwibiIsImRpYWxvZyIsIm1vZGFsIiwiYnV0dG9ucyIsIk9rIiwidG9vbHRpcCIsImhvdmVyIiwiZmluZCIsInN0b3AiLCJkZWxheSIsImZhZGVJbiIsImZhZGVPdXQiLCJsb2NhdGlvbiIsImF0dHIiLCJocmVmIiwid24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REksU0FBU0EsTUFBVCxHQUFrQjtBQUNkLFFBQUlDLFNBQVNDLEVBQUUsV0FBRixDQUFiO0FBQ0EsUUFBSUEsRUFBRUMsTUFBRixFQUFVQyxLQUFWLE1BQXFCLEdBQXJCLElBQTRCRixFQUFFQyxNQUFGLEVBQVVFLFNBQVYsS0FBd0IsR0FBeEQsRUFBNkQ7QUFDekRKLGVBQU9LLEdBQVAsQ0FBVyxFQUFDLFlBQVksT0FBYixFQUFzQixPQUFPLE9BQTdCLEVBQVg7QUFDQUosVUFBRSxZQUFGLEVBQWdCSSxHQUFoQixDQUFvQixFQUFDLFdBQVcsU0FBWixFQUFwQjtBQUNILEtBSEQsTUFJSztBQUNETCxlQUFPSyxHQUFQLENBQVcsRUFBQyxZQUFZLFVBQWIsRUFBeUIsT0FBTyxLQUFoQyxFQUFYO0FBQ0FKLFVBQUcsWUFBSCxFQUFrQkksR0FBbEIsQ0FBdUIsRUFBQyxXQUFXLE1BQVosRUFBdkI7QUFDSDs7QUFFRCxRQUFJSixFQUFFQyxNQUFGLEVB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LE1BQUVDLE1BQUYsRUFBVXFFLEVBQVYsQ0FBYSxRQUFiLEVBQXNCLFlBQVU7QUFDNUIsWUFBSWlCLEtBQUt2RixFQUFFQyxNQUFGLEVBQVVFLFNBQVYsRUFBVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFHb0YsS0FBSyxFQUFSLEVBQVc7QUFDUHZGLGNBQUUsVUFBRixFQUFjVyxRQUFkLENBQXVCLFlBQXZCO0FBQ0FYLGNBQUUsVUFBRixFQUFjWSxXQUFkLENBQTBCLFdBQTFCO0FBQ0FaLGNBQUUsVUFBRixFQUFjSSxHQUFkLENBQWtCLEVBQUMsU0FBVSxNQUFYLEVBQWxCLEVBQXNDOEUsTUFBdEMsQ0FBNkMsTUFBN0M7O0FBRUE7QUFDSCxTQU5ELE1BT0k7QUFDQWxGLGNBQUUsVUFBRixFQUFjWSxXQUFkLENBQTBCLFlBQTFCO0FBQ0FaLGNBQUUsVUFBRixFQUFjVyxRQUFkLENBQXVCLFdBQXZCO0FBQ0FYLGNBQUUsVUFBRixFQUFjSSxHQUFkLENBQWtCLEVBQUMsU0FBVSxLQUFYLEVBQWxCLEVBQXFDOEUsTUFBckMsQ0FBNEMsTUFBNUM7O0FBRUE7QUFDSDtBQUNKLEtBckJEO0FBc0JILENBaERELEUiLCJmaWxlIjoiYXBwLjVmYmYyZTgwMzYzMmYwNGZjMmQ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDUwNDk1NjJkMzMyODZjYmU2NDBmIiwiXG4gICAgZnVuY3Rpb24gZml4RGl2KCkge1xuICAgICAgICB2YXIgJGNhY2hlID0gJCgnI2dldEZpeGVkJyk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSA5OTEgJiYgJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAnZml4ZWQnLCAndG9wJzogJzI3NXB4J30pO1xuICAgICAgICAgICAgJChcIiNyZW1vdmVEaXZcIikuY3NzKHtcImRpc3BsYXlcIjogXCJpbmhlcml0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnMHB4J30pO1xuICAgICAgICAgICAgJCggXCIjcmVtb3ZlRGl2XCIgKS5jc3MoIHtcImRpc3BsYXlcIjogXCJub25lXCJ9ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTEgJiYgJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKXtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnMHB4J30pO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgJCh3aW5kb3cpLnNjcm9sbChmaXhEaXYpO1xuICAgIGZpeERpdigpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2ZpeGRpdi5qcyIsIi8vIFNsaWRlclxuJChmdW5jdGlvbigpIHtcbiAgICAvKiogTGlzdGVzIGV0IGdyaWxsZXMgc2FsbGVzICoqL1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjbGlzdCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO30pO1xuICAgICAgICAkKCcjZ3JpZCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykucmVtb3ZlQ2xhc3MoJ2xpc3QtZ3JvdXAtaXRlbScpO1xuICAgICAgICAkKCcjZGlzcGxheS1zYWxsZSAuY2FyZFNhbGxlJykuYWRkQ2xhc3MoJ2dyaWQtZ3JvdXAtaXRlbScpO30pO1xuICAgIH0pO1xuXG4gICAgaWYoISQoJyNzbGlkZXItcmFuZ2UnKS5sZW5ndGgpe1xuICAgICAgICBjb25zb2xlLmxvZygnbm8gc2xpZGVyICEnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBJbml0aWF0ZSBkYXRlcGlja2VyICoqL1xuICAgICQoIFwiI2RhdGVwaWNrZXJcIiApLmRhdGVwaWNrZXIoe1xuICAgICAgICBtYXhEYXRlOiBcIisxNWRcIixcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGVmYXVsdERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eScsXG4gICAgICAgIGFsdEZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgYWx0RmllbGQ6ICcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnLFxuICAgICAgICByZWdpb25hbDogXCJmclwiXG5cbiAgICB9KTtcbiAgICAvLyBHZXN0aW9uIGRlIGxhIHJlZ2lvbiBmci9lbiBwb3NlIHByb2Jsw6htZVxuICAgLy8gJChcIiNkYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoXCJvcHRpb25zXCIsIFwiZGVmYXVsdERhdGVcIiwgbmV3IERhdGUoKSk7XG5cbiAgICAkKCcudWktc2xpZGVyLWhhbmRsZScpLmRyYWdnYWJsZSgpO1xuXG4gICAgdmFyIGFyck1pbiA9ICQoJyNzbGlkZXItcmFuZ2UgLm1pbkhldXJlJykudmFsKCkuc3BsaXQoJzonKTtcbiAgICB2YXIgYXJyTWF4ID0gJCgnI3NsaWRlci1yYW5nZSAubWF4SGV1cmUnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIGNvbnNvbGUubG9nKGFyck1pbiArJyAnKyBhcnJNYXgpO1xuICAgIHZhciBtaW5IID0gcGFyc2VJbnQoYXJyTWluWzBdLDEwKTtcbiAgICB2YXIgbWluTSA9IHBhcnNlSW50KGFyck1pblsxXSwxMCk7XG4gICAgdmFyIG1heEggPSBwYXJzZUludChhcnJNYXhbMF0sMTApO1xuXG4gICAgdmFyIG1heE0gPSBwYXJzZUludChhcnJNYXhbMV0sMTApO1xuXG4gICAgdmFyIG1pbiA9IG1pbkg7IC8vIDkgSGV1cmUgbWluIGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgbWF4ID0gbWF4SDsgLy8gMjEgSGV1cmUgbWF4IGQnb3V2ZXJ0dXJlIGR1IG1hZ2FzaW5cbiAgICB2YXIgZGF0ZVBpY2tlckRhdGUgPSAkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpO1xuICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHRvZGF5RGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgLy9jb25zb2xlLmxvZyh0b2RheURhdGUgKyAnIGV0IGRhdGUgcGlja2VyJyArIGRhdGVQaWNrZXJEYXRlKTtcblxuICAgIGlmICghISQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKSkge1xuICAgICAgICB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgaGV1cmVBY3R1ZWxsZSA9IHBhcnNlSW50KGFyclRpbWVbMF0sIDEwKTtcbiAgICAgICAgdmFyIG1pbnV0ZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVsxXSwxMCk7XG4gICAgICAgIHRvZGF5RGF0ZSA9IGFyclRpbWVbMl07XG5cbiAgICAgICAgY29uc29sZS5sb2codG9kYXlEYXRlKyAnIGRhdGUgZHUgam91cnMnKTtcbiAgICAgICAgaWYgKG1pbnV0ZUFjdHVlbGxlIDwgMzApIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMzA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoe1xuICAgICAgICByYW5nZTogdHJ1ZSxcbiAgICAgICAgbWluOiBtaW4gKiA2MCArIG1pbk0sXG4gICAgICAgIG1heDogbWF4ICogNjAgKyBtYXhNLFxuICAgICAgICBtaW5SYW5nZTogNjAsXG4gICAgICAgIHN0ZXA6IDMwLFxuICAgICAgICB2YWx1ZXM6IFttaW4gKiA2MCArIG1pbk0sIG1heCAqIDYwICsgbWF4TV0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG4gICAgICAgICAgICAvLyBPbiBsaW1pdGUgbCdpbnRlcnZhbGxlIG1pbmltYWwgw6AgMWggcG91ciB1bmUgcmVzZXJ2YXRpb24gZGUgc2FsbGVcbiAgICAgICAgICAgIGlmICggKHVpLnZhbHVlc1swXSArIDU1KSA+PSB1aS52YWx1ZXNbMV0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGFucyBsZSBjYXMgb8O5IGMnZXN0IGxhIGRhdGUgZHUgam91ciAhXG4gICAgICAgICAgICBpZiAoJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSA9PSB0b2RheURhdGUgfHwgISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxTdGFydFRpbWUgPSBoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZTtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgJysgdG90YWxTdGFydFRpbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHVpLnZhbHVlc1swXSA8IHRvdGFsU3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh1aS52YWx1ZXNbMF0gKyAnIGV6ZXNmc2QgJyArIHRvdGFsU3RhcnRUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy8kICgnI3NsaWRlci1yYW5nZScpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikuZmlyc3QoKS5kcmFnZ2FibGUoIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBob3VyczEgPSBNYXRoLmZsb29yKHVpLnZhbHVlc1swXSAvIDYwKTtcbiAgICAgICAgICAgIHZhciBtaW51dGVzMSA9IHVpLnZhbHVlc1swXSAtIChob3VyczEgKiA2MCk7XG5cbiAgICAgICAgICAgIGlmKGhvdXJzMS5sZW5ndGggPCAxMCkgaG91cnMxPSAnMCcgKyBob3VycztcbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxLmxlbmd0aCA8IDEwKSBtaW51dGVzMSA9ICcwJyArIG1pbnV0ZXM7XG5cbiAgICAgICAgICAgIGlmKG1pbnV0ZXMxID09IDApIG1pbnV0ZXMxID0gJzAwJztcblxuICAgICAgICAgICAgLy8gdmFsZXVyIGR1IHByZW1pZXIgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoIGhvdXJzMSsnOicrbWludXRlczEgKTtcblxuICAgICAgICAgICAgdmFyIGhvdXJzMiA9IE1hdGguZmxvb3IodWkudmFsdWVzWzFdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMyID0gdWkudmFsdWVzWzFdIC0gKGhvdXJzMiAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMyLmxlbmd0aCA8IDEwKSBob3VyczI9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczIubGVuZ3RoIDwgMTApIG1pbnV0ZXMyID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczIgPT0gMCkgbWludXRlczIgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyBEZXV4acOobWUgaGFuZGxlIGR1IHNsaWRlclxuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCggaG91cnMyKyc6JyttaW51dGVzMiApO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhvdXJzMSsnOicrbWludXRlczEpO1xuXG4gICAgICAgICAgICAkKCcuc2xpZGVyLXRpbWUyJykuaHRtbChob3VyczIrJzonK21pbnV0ZXMyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQobWluKyc6JytwYWQobWluTSkpO1xuICAgICQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQobWF4Kyc6JytwYWQobWF4TSkpO1xuXG5cblxuICAgIGlmKCQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS5sZW5ndGggJiYgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpICkge1xuICAgICAgICBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCk7XG4gICAgfVxuXG4gICAgLy8gQXJpdGhtw6l0aXF1ZTogb24gY2FsY3VsZSBsZSBub21icmUgZCdoZXVyZSB0b3RhbCBldCBvbiBjcsOpZSBsZXMgaW50ZXJ2YWxsZXMgc291aGFpdMOpLCBvbiBtZXR0cmEgZGVzIHBvaW50cyDDp1xuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuXG4gICAgZm9yICh2YXIgeCA9IDE7IHggPCB0b3RhbDsgeCsrKXtcbiAgICAgICAgJChcIi51aS1zbGlkZXJcIiApLmFwcGVuZChcIjxzcGFuIGNsYXNzPSdkb3RzJyBzdHlsZT0nbGVmdDpcIisgeCAqIHBlcmNlbnQgKyBcIiUnPjwvc3Bhbj5cIik7XG5cbiAgICB9XG5cbiAgICAvLyBMb3JzcXUnb24gY2hhbmdlIGxlIGRhdGVwaWNrZXJcbiAgICAkKCcjZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYgKCEkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpKXtcbiAgICAgICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQWpvdXRlIHVuIDAgZGV2YW50IGxlcyBjaGlmZnJlcyBwb3VyIGwnYWZmaWNoYWdlIHRleHRlICFcbiAgICBmdW5jdGlvbiBwYWQobikge1xuICAgICAgICByZXR1cm4gKG4gPCAxMCkgPyAoXCIwXCIgKyBuKSA6IG47XG4gICAgfVxuXG4gICAgLy8gUmVpbml0aWFsaXNlIGxlcyBoYW5kbGVzXG4gICAgZnVuY3Rpb24gc2V0SGFuZGxlcyhoZXVyZUFjdHVlbGxlLCBtaW51dGVBY3R1ZWxsZSwgbWluLCBtYXgpe1xuXG4gICAgICAgIC8vJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAvLyQoXCIjc2xpZGVyLXJhbmdlXCIpLmNoaWxkcmVuKFwiLnVpLXNsaWRlci1oYW5kbGVcIikubGFzdCgpLnRleHQoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcblxuICAgICAgICAvL3ZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBoZXVyZUFjdHVlbGxlICsnICcgICsgbWluICk7XG4gICAgICAgIGNvbnNvbGUubG9nKGhldXJlQWN0dWVsbGUpO1xuICAgICAgICBpZiAoICBoZXVyZUFjdHVlbGxlID4gbWF4ICAmJiAoaGV1cmVBY3R1ZWxsZSA8IDI0KSAgLyooKGhldXJlQWN0dWVsbGUgKyBtaW51dGVBY3R1ZWxsZSkgPj0gKG1heCArIG1heE0pKSAmJiBtYXhNICovICkge1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCB0aGlzICkuZGlhbG9nKCBcImNsb3NlXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZiggaGV1cmVBY3R1ZWxsZSA+PSAwICYmIGhldXJlQWN0dWVsbGUgPCBtaW4gLyooKGhldXJlQWN0dWVsbGUgKyBtaW51dGVBY3R1ZWxsZSkgIDwgKG1pbiArIG1pbk0pKSovICl7XG4gICAgICAgICAgICAkKCBcIiNyZXNlcnZhdGlvbi1kaWFsb2ctbWVzc2FnZVwiICkuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgIE9rOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnT3V2cmUgw6AgOWgnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKCdvcHRpb24nLCAndmFsdWVzJywgWyhoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZSksIChoZXVyZUFjdHVlbGxlICogNjApICsgNjAgKyBtaW51dGVBY3R1ZWxsZV0pO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQoaGV1cmVBY3R1ZWxsZSArICc6JyArIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSAgKyAnOicgKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaGV1cmVBY3R1ZWxsZSsnOicrIHBhZChtaW51dGVBY3R1ZWxsZSkpO1xuICAgICAgICAgICAgJCgnLnNsaWRlci10aW1lMicpLmh0bWwoKGhldXJlQWN0dWVsbGUrMSkrJzonKyBwYWQobWludXRlQWN0dWVsbGUpKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcmVzZXJ2YXRpb24vY2hlY2tEaXNwb0RhdGUuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbiQoZnVuY3Rpb24oKXtcbiAgICAkKCdhLnRjLWxpbmtbdGl0bGVdJykudG9vbHRpcCgpO1xufSk7XG5cbi8vIEJhc2ljcyBmZWF0dXJlc1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcblxuXG4gICAgLy8gJChcIiNtYWluXCIpLm9uZXBhZ2Vfc2Nyb2xsKCk7XG4gICAgJCgndWwubmF2IGxpLmRyb3Bkb3duJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5zdG9wKHRydWUsIHRydWUpLmRlbGF5KDIwMCkuZmFkZUluKDUwMCk7XG4gICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5zdG9wKHRydWUsIHRydWUpLmRlbGF5KDIwMCkuZmFkZU91dCg1MDApO1xuICAgIH0pO1xuXG4gICAgLy8gJCgnLm5hdmJhciAuZHJvcGRvd24nKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJCh0aGlzKS5maW5kKCcuZHJvcGRvd24tbWVudScpLmZpcnN0KCkuc3RvcCh0cnVlLCB0cnVlKS5kZWxheSgyNTApLnNsaWRlRG93bigpO1xuICAgIC8vXG4gICAgLy8gfSwgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICQodGhpcykuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5maXJzdCgpLnN0b3AodHJ1ZSwgdHJ1ZSkuZGVsYXkoMTAwKS5zbGlkZVVwKCk7XG4gICAgLy9cbiAgICAvLyB9KTtcblxuICAgICQoJy5kcm9wZG93bi10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbG9jYXRpb247XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuXG5cbiAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIixmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd24gPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIC8vIGlmKHduID4gMzApe1xuICAgICAgICAvLyAgICAgJCgnI21haW5OYXYnKS5jc3Moe1wibWFyZ2luLXRvcFwiIDogMH0pLmZhZGVJbihcInNsb3dcIik7XG4gICAgICAgIC8vIH1lbHNle1xuICAgICAgICAvLyAgICAgJCgnI21haW5OYXYnKS5jc3Moe1wibWFyZ2luLXRvcFwiIDogMjB9KS5mYWRlSW4oXCJzbG93XCIpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmKHduID4gNTApe1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5hZGRDbGFzcygnbWVudS1ibGFuYycpO1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5yZW1vdmVDbGFzcygnbWFyZ2luVG9wJyk7XG4gICAgICAgICAgICAkKCcjbWFpbk5hdicpLmNzcyh7XCJ3aWR0aFwiIDogXCIxMDAlXCJ9KS5mYWRlSW4oXCJzbG93XCIpO1xuXG4gICAgICAgICAgICAvLyQoXCIubmF2YmFyXCIpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZjhmOGY4XCIsIFwiYm9yZGVyLWNvbG9yXCI6IFwiI2Y4ZjhmOFwifSkuZmFkZUluKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNtYWluTmF2JykucmVtb3ZlQ2xhc3MoJ21lbnUtYmxhbmMnKTtcbiAgICAgICAgICAgICQoJyNtYWluTmF2JykuYWRkQ2xhc3MoJ21hcmdpblRvcCcpO1xuICAgICAgICAgICAgJCgnI21haW5OYXYnKS5jc3Moe1wid2lkdGhcIiA6IFwiOTglXCJ9KS5mYWRlSW4oXCJzbG93XCIpO1xuXG4gICAgICAgICAgICAvLyQoXCIubmF2YmFyXCIpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCJ0cmFuc3BhcmVudFwiLCBcImJvcmRlci1jb2xvclwiOiBcInRyYW5zcGFyZW50XCJ9KS5mYWRlSW4oKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==