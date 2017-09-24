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

/***/ "./web/assets/js/reservation/ajaxAjoutProduitPanier.js":
/*!*************************************************************!*\
  !*** ./web/assets/js/reservation/ajaxAjoutProduitPanier.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

function ajaxAjoutProduiPanier() {
    //J'initialise le montant total à 0.
    var total = 0;

    // Je boucle sur le nombre de produit afin de récupérer leur ID. Je commence à 1 parce que le premier ID vaut 1.
    for (var i = 1; i < 5; i++) {
        //Je récupère la valeur qui se trouve dans l'Id "prix+i".
        var prix = document.getElementById('prix' + i).innerText;

        //Je récuère seulement le nombre.
        var thenum = prix.match(/\d+/)[0];

        //Je récupère la valeur du select qui a pour id "qte+i"
        var e = document.getElementById('qte' + i);
        //Je récupuère seulement le int que l'utilisateur aura choisi.
        var strUser = e.options[e.selectedIndex].value;

        /*Je calcule le total. Je parseFloat car j'avais que que strings.
          Je parseFloat au cas si au cas où dans le futur, le site aura besoin de float
        */
        total = parseFloat(total) + parseFloat(thenum) * parseFloat(strUser);
    }

    //Je remets total à string pour pouvoir intégrer total à ma page html.twig
    total = total.toString();
    //J'écris dans ma page html.
    document.getElementById("montantapayer").innerHTML = total + "€";
}

ajaxAjoutProduiPanier();

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
/*!***********************************************************************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/scripts.js ./web/assets/js/fixdiv.js ./web/assets/js/modal.js ./web/assets/js/reservation/checkDispoDate.js ./web/assets/js/reservation/ajaxAjoutProduitPanier.js ***!
  \***********************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/scripts.js */"./web/assets/js/scripts.js");
__webpack_require__(/*! ./web/assets/js/fixdiv.js */"./web/assets/js/fixdiv.js");
__webpack_require__(/*! ./web/assets/js/modal.js */"./web/assets/js/modal.js");
__webpack_require__(/*! ./web/assets/js/reservation/checkDispoDate.js */"./web/assets/js/reservation/checkDispoDate.js");
module.exports = __webpack_require__(/*! ./web/assets/js/reservation/ajaxAjoutProduitPanier.js */"./web/assets/js/reservation/ajaxAjoutProduitPanier.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2IzY2FmZGZjOWJmMDc5ODM1ZDMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9yZXNlcnZhdGlvbi9jaGVja0Rpc3BvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3NjcmlwdHMuanMiXSwibmFtZXMiOlsiZml4RGl2IiwiJGNhY2hlIiwiJCIsIndpbmRvdyIsInNjcm9sbFRvcCIsImNzcyIsInNjcm9sbCIsImxlbmd0aCIsImJ0biIsImNsaWNrIiwic2hvdyIsInNwYW4iLCJoaWRlRGl2Iiwib24iLCJlIiwidGFyZ2V0IiwiaGFzQ2xhc3MiLCJoaWRlUG9wdXAiLCJhdHRyIiwiaGlkZSIsImxvY2F0aW9uIiwiaHJlZiIsImFqYXhBam91dFByb2R1aVBhbmllciIsInRvdGFsIiwiaSIsInByaXgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJUZXh0IiwidGhlbnVtIiwibWF0Y2giLCJzdHJVc2VyIiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJ0b1N0cmluZyIsImlubmVySFRNTCIsInJlYWR5IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJkYXRlcGlja2VyIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJEYXRlIiwiZGVmYXVsdERhdGUiLCJkYXRlRm9ybWF0IiwiYWx0Rm9ybWF0IiwiYWx0RmllbGQiLCJyZWdpb25hbCIsImRyYWdnYWJsZSIsIm1pbiIsIm1heCIsImRhdGVQaWNrZXJEYXRlIiwidmFsIiwidG9kYXkiLCJ0b2RheURhdGUiLCJhcnJUaW1lIiwic3BsaXQiLCJoZXVyZUFjdHVlbGxlIiwicGFyc2VJbnQiLCJtaW51dGVBY3R1ZWxsZSIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZXIiLCJyYW5nZSIsIm1pblJhbmdlIiwic3RlcCIsInZhbHVlcyIsInNsaWRlIiwidWkiLCJ0b3RhbFN0YXJ0VGltZSIsImhvdXJzMSIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMxIiwiaG91cnMiLCJtaW51dGVzIiwiY2hpbGRyZW4iLCJmaXJzdCIsInRleHQiLCJob3VyczIiLCJtaW51dGVzMiIsImxhc3QiLCJodG1sIiwic2V0SGFuZGxlcyIsInBlcmNlbnQiLCJ4IiwiYXBwZW5kIiwiZGlhbG9nIiwibW9kYWwiLCJidXR0b25zIiwiT2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REksU0FBU0EsTUFBVCxHQUFrQjtBQUNkLFFBQUlDLFNBQVNDLEVBQUUsV0FBRixDQUFiO0FBQ0EsUUFBSUEsRUFBRUMsTUFBRixFQUFVQyxTQUFWLEtBQXdCLEdBQTVCLEVBQWlDO0FBQzdCSCxlQUFPSSxHQUFQLENBQVcsRUFBQyxZQUFZLE9BQWIsRUFBc0IsT0FBTyxPQUE3QixFQUFYO0FBQ0FILFVBQUUsWUFBRixFQUFnQkcsR0FBaEIsQ0FBb0IsRUFBQyxXQUFXLFNBQVos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QUE4RHJCLGdCQUFjLENBQWYsR0FBcUIsR0FBckIsR0FBMkJFLGNBQXhGO0FBQ0g7QUFDSjtBQUNKLENBdkpELEU7Ozs7Ozs7Ozs7OztBQ0RBLDRCIiwiZmlsZSI6ImFwcC5lNTJiNTljNjMwMDNlODUwZTVhYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YjNjYWZkZmM5YmYwNzk4MzVkMyIsIlxuICAgIGZ1bmN0aW9uIGZpeERpdigpIHtcbiAgICAgICAgdmFyICRjYWNoZSA9ICQoJyNnZXRGaXhlZCcpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMjAwKSB7XG4gICAgICAgICAgICAkY2FjaGUuY3NzKHsncG9zaXRpb24nOiAnZml4ZWQnLCAndG9wJzogJzI3NXB4J30pO1xuICAgICAgICAgICAgJChcIiNyZW1vdmVEaXZcIikuY3NzKHtcImRpc3BsYXlcIjogXCJpbmhlcml0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICRjYWNoZS5jc3Moeydwb3NpdGlvbic6ICdyZWxhdGl2ZScsICd0b3AnOiAnLTkwcHgnfSk7XG4gICAgICAgICAgICAkKCBcIiNyZW1vdmVEaXZcIiApLmNzcygge1wiZGlzcGxheVwiOiBcIm5vbmVcIn0gKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICQod2luZG93KS5zY3JvbGwoZml4RGl2KTtcbiAgICBmaXhEaXYoKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9maXhkaXYuanMiLCIvL3ZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vIFdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBidXR0b24sIG9wZW4gdGhlIG1vZGFsXG4gICAgaWYoJCgnI215QnRuJykubGVuZ3RoKSB7XG4gICAgICAgIC8vIEdldCB0aGUgYnV0dG9uIHRoYXQgb3BlbnMgdGhlIG1vZGFsXG4gICAgICAgIHZhciBidG4gPSAkKCcjbXlCdG4nKTtcbiAgICAgICAgYnRuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdkaXYjbXlNb2RhbCcpLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gPHNwYW4+ICh4KSwgY2xvc2UgdGhlIG1vZGFsXG4gICAgaWYgKCQoJy5jbG9zZScpLmxlbmd0aCkge1xuICAgICAgICAvLyBHZXQgdGhlIDxzcGFuPiBlbGVtZW50IHRoYXQgY2xvc2VzIHRoZSBtb2RhbFxuICAgICAgICB2YXIgc3BhbiA9ICQoJy5jbG9zZScpO1xuICAgICAgICBzcGFuLmNsaWNrKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoaWRlRGl2KCk7XG4gICAgICAgICAgICAvL3VwZGF0ZURpdigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiI215TW9kYWxcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaGFzQ2xhc3MoJ21vZGFsJykpIHtcbiAgICAgICAgICAgIHZhciBoaWRlUG9wdXAgPSAkKGUudGFyZ2V0KS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgJCgnIycgKyBoaWRlUG9wdXApLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyBXaGVuIHRoZSB1c2VyIGNsaWNrcyBhbnl3aGVyZSBvdXRzaWRlIG9mIHRoZSBtb2RhbCwgY2xvc2UgaXRcbiAgICAvLyB3aW5kb3cuY2xpY2sgKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC50YXJnZXQgPT0gbW9kYWwpIHtcbiAgICAvLyAgICAgICAgIG1vZGFsLmhpZGUoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlkZURpdigpIHtcbiAgICAgICAgJCggJyNteU1vZGFsJyApLmhpZGUod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiNteU1vZGFsXCIgKTtcblxuICAgIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvbW9kYWwuanMiLCJmdW5jdGlvbiBhamF4QWpvdXRQcm9kdWlQYW5pZXIoKSB7XG4gICAgLy9KJ2luaXRpYWxpc2UgbGUgbW9udGFudCB0b3RhbCDDoCAwLlxuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAvLyBKZSBib3VjbGUgc3VyIGxlIG5vbWJyZSBkZSBwcm9kdWl0IGFmaW4gZGUgcsOpY3Vww6lyZXIgbGV1ciBJRC4gSmUgY29tbWVuY2Ugw6AgMSBwYXJjZSBxdWUgbGUgcHJlbWllciBJRCB2YXV0IDEuXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgLy9KZSByw6ljdXDDqHJlIGxhIHZhbGV1ciBxdWkgc2UgdHJvdXZlIGRhbnMgbCdJZCBcInByaXgraVwiLlxuICAgICAgICB2YXIgcHJpeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcml4JytpKS5pbm5lclRleHQ7XG5cbiAgICAgICAgLy9KZSByw6ljdcOocmUgc2V1bGVtZW50IGxlIG5vbWJyZS5cbiAgICAgICAgdmFyIHRoZW51bSA9IHByaXgubWF0Y2goL1xcZCsvKVswXTtcblxuICAgICAgICAvL0plIHLDqWN1cMOocmUgbGEgdmFsZXVyIGR1IHNlbGVjdCBxdWkgYSBwb3VyIGlkIFwicXRlK2lcIlxuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdGUnK2kpO1xuICAgICAgICAvL0plIHLDqWN1cHXDqHJlIHNldWxlbWVudCBsZSBpbnQgcXVlIGwndXRpbGlzYXRldXIgYXVyYSBjaG9pc2kuXG4gICAgICAgIHZhciBzdHJVc2VyID0gZS5vcHRpb25zW2Uuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG5cbiAgICAgICAgLypKZSBjYWxjdWxlIGxlIHRvdGFsLiBKZSBwYXJzZUZsb2F0IGNhciBqJ2F2YWlzIHF1ZSBxdWUgc3RyaW5ncy5cbiAgICAgICAgICBKZSBwYXJzZUZsb2F0IGF1IGNhcyBzaSBhdSBjYXMgb8O5IGRhbnMgbGUgZnV0dXIsIGxlIHNpdGUgYXVyYSBiZXNvaW4gZGUgZmxvYXRcbiAgICAgICAgKi9cbiAgICAgICAgdG90YWwgPSBwYXJzZUZsb2F0KHRvdGFsKSArIHBhcnNlRmxvYXQodGhlbnVtKSAqIHBhcnNlRmxvYXQoc3RyVXNlcik7XG4gICAgfVxuXG4gICAgLy9KZSByZW1ldHMgdG90YWwgw6Agc3RyaW5nIHBvdXIgcG91dm9pciBpbnTDqWdyZXIgdG90YWwgw6AgbWEgcGFnZSBodG1sLnR3aWdcbiAgICB0b3RhbCA9IHRvdGFsLnRvU3RyaW5nKClcbiAgICAvL0onw6ljcmlzIGRhbnMgbWEgcGFnZSBodG1sLlxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9udGFudGFwYXllclwiKS5pbm5lckhUTUwgPSB0b3RhbCtcIuKCrFwiO1xufVxuXG5hamF4QWpvdXRQcm9kdWlQYW5pZXIoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCIvLyBTbGlkZXJcbiQoZnVuY3Rpb24oKSB7XG4gICAgLyoqIExpc3RlcyBldCBncmlsbGVzIHNhbGxlcyAqKi9cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2xpc3QnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTt9KTtcbiAgICAgICAgJCgnI2dyaWQnKS5jbGljayhmdW5jdGlvbihldmVudCl7ZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLnJlbW92ZUNsYXNzKCdsaXN0LWdyb3VwLWl0ZW0nKTtcbiAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUgLmNhcmRTYWxsZScpLmFkZENsYXNzKCdncmlkLWdyb3VwLWl0ZW0nKTt9KTtcbiAgICB9KTtcblxuICAgIC8qKiBJbml0aWF0ZSBkYXRlcGlja2VyICoqL1xuICAgICQoIFwiI2RhdGVwaWNrZXJcIiApLmRhdGVwaWNrZXIoe1xuICAgICAgICBtYXhEYXRlOiBcIisxNWRcIixcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgZGVmYXVsdERhdGU6IG5ldyBEYXRlKCksXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdkZC9tbS95eScsXG4gICAgICAgIGFsdEZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgYWx0RmllbGQ6ICcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnLFxuICAgICAgICByZWdpb25hbDogXCJmclwiXG5cbiAgICAgICAgLy9zZXREYXRlOiBuZXcgRGF0ZSgpXG5cbiAgICB9KTtcbiAgICAvLyBHZXN0aW9uIGRlIGxhIHJlZ2lvbiBmciBwb3NlIHByb2Jsw6htZVxuICAgLy8gJChcIiNkYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoXCJvcHRpb25zXCIsIFwiZGVmYXVsdERhdGVcIiwgbmV3IERhdGUoKSk7XG5cbiAgICAkKCcudWktc2xpZGVyLWhhbmRsZScpLmRyYWdnYWJsZSgpO1xuXG4gICAgdmFyIG1pbiA9IDk7IC8vIEhldXJlIG1pbiBkJ291dmVydHVyZSBkdSBtYWdhc2luXG4gICAgdmFyIG1heCA9IDIxOyAvLyBIZXVyZSBtYXggZCdvdXZlcnR1cmUgZHUgbWFnYXNpblxuICAgIHZhciBkYXRlUGlja2VyRGF0ZSA9ICQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCk7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgdG9kYXlEYXRlID0gJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKTtcbiAgICAvL2NvbnNvbGUubG9nKHRvZGF5RGF0ZSArICcgZXQgZGF0ZSBwaWNrZXInICsgZGF0ZVBpY2tlckRhdGUpO1xuXG4gICAgaWYgKCEhJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpKSB7XG4gICAgICAgIHZhciBhcnJUaW1lID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgICAgIHZhciBoZXVyZUFjdHVlbGxlID0gcGFyc2VJbnQoYXJyVGltZVswXSwgMTApO1xuICAgICAgICB2YXIgbWludXRlQWN0dWVsbGUgPSBwYXJzZUludChhcnJUaW1lWzFdLDEwKTtcbiAgICAgICAgdmFyIHRvZGF5RGF0ZSA9IGFyclRpbWVbMl07XG4gICAgICAgIGNvbnNvbGUubG9nKHRvZGF5RGF0ZSsgJ2RhdGUgZHUgam91cnMnKTtcbiAgICAgICAgaWYgKG1pbnV0ZUFjdHVlbGxlIDwgMzApIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbnV0ZUFjdHVlbGxlID0gMzA7XG4gICAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coJ3BhcyBwYXIgZGVmYXV0Jyk7XG4gICAgfVxuXG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuc2xpZGVyKHtcbiAgICAgICAgcmFuZ2U6IHRydWUsXG4gICAgICAgIG1pbjogbWluICogNjAsXG4gICAgICAgIG1heDogbWF4ICogNjAsXG4gICAgICAgIG1pblJhbmdlOiA2MCxcbiAgICAgICAgc3RlcDogMzAsXG4gICAgICAgIHZhbHVlczogWzU0MCwgMTMyMF0sXG4gICAgICAgIHNsaWRlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuXG4gICAgICAgICAgICAvLyBPbiBsaW1pdGUgbCdpbnRlcnZhbGxlIG1pbmltYWwgw6AgMWggcG91ciB1bmUgcmVzZXJ2YXRpb24gZGUgc2FsbGVcbiAgICAgICAgICAgIGlmICggKHVpLnZhbHVlc1swXSArIDU1KSA+PSB1aS52YWx1ZXNbMV0gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGFucyBsZSBjYXMgb8O5IGMnZXN0IGxhIGRhdGUgZHUgam91ciAhXG4gICAgICAgICAgICBpZiAoJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSA9PSAnMjAxNy0wOS0yMicgfHwgISQoXCIjZGF0ZXBpY2tlci1hbHRGb3JtYXRcIikudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxTdGFydFRpbWUgPSBoZXVyZUFjdHVlbGxlICogNjAgKyBtaW51dGVBY3R1ZWxsZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1aS52YWx1ZXNbMF0gKyAnICcrIHRvdGFsU3RhcnRUaW1lKTtcblxuICAgICAgICAgICAgICAgIGlmICh1aS52YWx1ZXNbMF0gPCB0b3RhbFN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVpLnZhbHVlc1swXSArICcgZXplc2ZzZCAnICsgdG90YWxTdGFydFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyQgKCcjc2xpZGVyLXJhbmdlJykuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLmRyYWdnYWJsZSggZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGhvdXJzMSA9IE1hdGguZmxvb3IodWkudmFsdWVzWzBdIC8gNjApO1xuICAgICAgICAgICAgdmFyIG1pbnV0ZXMxID0gdWkudmFsdWVzWzBdIC0gKGhvdXJzMSAqIDYwKTtcblxuICAgICAgICAgICAgaWYoaG91cnMxLmxlbmd0aCA8IDEwKSBob3VyczE9ICcwJyArIGhvdXJzO1xuICAgICAgICAgICAgaWYobWludXRlczEubGVuZ3RoIDwgMTApIG1pbnV0ZXMxID0gJzAnICsgbWludXRlcztcblxuICAgICAgICAgICAgaWYobWludXRlczEgPT0gMCkgbWludXRlczEgPSAnMDAnO1xuXG4gICAgICAgICAgICAvLyB2YWxldXIgZHUgcHJlbWllciBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dCggaG91cnMxKyc6JyttaW51dGVzMSApO1xuXG4gICAgICAgICAgICB2YXIgaG91cnMyID0gTWF0aC5mbG9vcih1aS52YWx1ZXNbMV0gLyA2MCk7XG4gICAgICAgICAgICB2YXIgbWludXRlczIgPSB1aS52YWx1ZXNbMV0gLSAoaG91cnMyICogNjApO1xuXG4gICAgICAgICAgICBpZihob3VyczIubGVuZ3RoIDwgMTApIGhvdXJzMj0gJzAnICsgaG91cnM7XG4gICAgICAgICAgICBpZihtaW51dGVzMi5sZW5ndGggPCAxMCkgbWludXRlczIgPSAnMCcgKyBtaW51dGVzO1xuXG4gICAgICAgICAgICBpZihtaW51dGVzMiA9PSAwKSBtaW51dGVzMiA9ICcwMCc7XG5cbiAgICAgICAgICAgIC8vIERldXhpw6htZSBoYW5kbGUgZHUgc2xpZGVyXG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KCBob3VyczIrJzonK21pbnV0ZXMyICk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZScpLmh0bWwoaG91cnMxKyc6JyttaW51dGVzMSk7XG5cbiAgICAgICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKGhvdXJzMisnOicrbWludXRlczIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5maXJzdCgpLnRleHQobWluKyc6MDAnKTtcbiAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KG1heCsnOjAwJyk7XG5cblxuXG4gICAgaWYoJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLmxlbmd0aCAmJiAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkgKSB7XG4gICAgICAgIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KTtcbiAgICB9XG4gICAgLy8gQXJpdGhtw6l0aXF1ZTogb24gY2FsY3VsZSBsZSBub21icmUgZCdoZXVyZSB0b3RhbCBldCBvbiBjcsOpZSBsZXMgaW50ZXJ2YWxsZXMgc291aGFpdMOpLCBvbiBtZXR0cmEgZGVzIHBvaW50cyDDp1xuICAgIHZhciB0b3RhbCA9IChtYXggLSBtaW4gKSAqIDI7IC8vIGNhciA2MCBtaW51dGVzID0gMiAqIDMwIG1pbnV0ZXMgOilcbiAgICB2YXIgcGVyY2VudCA9IDEwMCAvIHRvdGFsO1xuICAgIGZvciAodmFyIHggPSAxOyB4IDwgdG90YWw7IHgrKyl7XG4gICAgICAgICQoXCIudWktc2xpZGVyXCIgKS5hcHBlbmQoXCI8c3BhbiBjbGFzcz0nZG90cycgc3R5bGU9J2xlZnQ6XCIrIHggKiBwZXJjZW50ICsgXCIlJz48L3NwYW4+XCIpO1xuXG4gICAgfVxuXG4gICAgLy8gTG9yc3F1J29uIGNoYW5nZSBsZSBkYXRlcGlja2VyXG4gICAgJCgnI2RhdGVwaWNrZXInKS5kYXRlcGlja2VyKCkub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmICgkKFwiI2RhdGVwaWNrZXItYWx0Rm9ybWF0XCIpLnZhbCgpID09ICcyMDE3LTA5LTIyJyB8fCAhJChcIiNkYXRlcGlja2VyLWFsdEZvcm1hdFwiKS52YWwoKSl7XG4gICAgICAgICAgICBzZXRIYW5kbGVzKGhldXJlQWN0dWVsbGUsIG1pbnV0ZUFjdHVlbGxlLCBtaW4sIG1heCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJlaW5pdCBsZXMgaGFuZGxlc1xuICAgIGZ1bmN0aW9uIHNldEhhbmRsZXMoaGV1cmVBY3R1ZWxsZSwgbWludXRlQWN0dWVsbGUsIG1pbiwgbWF4KXtcblxuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmxhc3QoKS50ZXh0KChoZXVyZUFjdHVlbGxlKzEpKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAkKCcuc2xpZGVyLXRpbWUnKS5odG1sKGhldXJlQWN0dWVsbGUrJzonKyBtaW51dGVBY3R1ZWxsZSk7XG4gICAgICAgICQoJy5zbGlkZXItdGltZTInKS5odG1sKChoZXVyZUFjdHVlbGxlKzEpKyc6JysgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAvL3ZhciBoZXVyZUFjdHVlbGxlID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpO1xuICAgICAgICBpZiAoaGV1cmVBY3R1ZWxsZSA+IG1heCAmJiBoZXVyZUFjdHVlbGxlIDwgMCkge1xuICAgICAgICAgICAgJCggXCIjcmVzZXJ2YXRpb24tZGlhbG9nLW1lc3NhZ2VcIiApLmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCB0aGlzICkuZGlhbG9nKCBcImNsb3NlXCIgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihoZXVyZUFjdHVlbGxlID4gMCAmJiBoZXVyZUFjdHVlbGxlIDwgbWluKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdPdXZyZSDDoCA5aCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5zbGlkZXIoJ29wdGlvbicsICd2YWx1ZXMnLCBbKGhldXJlQWN0dWVsbGUgKiA2MCArIG1pbnV0ZUFjdHVlbGxlKSwgKGhldXJlQWN0dWVsbGUgKiA2MCkgKyA2MCArIG1pbnV0ZUFjdHVlbGxlXSk7XG4gICAgICAgICAgICAkKFwiI3NsaWRlci1yYW5nZVwiKS5jaGlsZHJlbihcIi51aS1zbGlkZXItaGFuZGxlXCIpLmZpcnN0KCkudGV4dChoZXVyZUFjdHVlbGxlICsgJzonICsgbWludXRlQWN0dWVsbGUpO1xuICAgICAgICAgICAgJChcIiNzbGlkZXItcmFuZ2VcIikuY2hpbGRyZW4oXCIudWktc2xpZGVyLWhhbmRsZVwiKS5sYXN0KCkudGV4dCgoaGV1cmVBY3R1ZWxsZSsxKSAgKyAnOicgKyBtaW51dGVBY3R1ZWxsZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3Jlc2VydmF0aW9uL2NoZWNrRGlzcG9EYXRlLmpzIiwiLy92YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9zY3JpcHRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==