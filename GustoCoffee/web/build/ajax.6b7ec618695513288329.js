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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./web/assets/js/ajax/ajaxAjoutProduitPanier.js":
/*!******************************************************!*\
  !*** ./web/assets/js/ajax/ajaxAjoutProduitPanier.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

//
//
// function ajaxChangeQtePanier() {
//     //J'initialise le montant total à 0.
//     var total = 0;
//
//     // Je boucle sur le nombre de produit afin de récupérer leur ID. Je commence à 1 parce que le premier ID du produit vaut 1.
//     for (var i = 1; i < 5; i++) {
//         //Je récupère la valeur qui se trouve dans l'Id "prix+i".
//         var prix = document.getElementById('prix' + i).innerText;
//
//         //Je récuère seulement le nombre.
//         var thenum = prix.match(/\d+/)[0];
//
//         //Je récupère la valeur du select qui a pour id "qte+i"
//         var e = document.getElementById('qte' + i);
//         //Je récupuère seulement la valeur que l'utilisateur aura choisi.
//         var strUser = e.options[e.selectedIndex].value;
//
//         /*Je calcule le total. Je parseFloat car j'avais que que strings.
//           Je parseFloat si au cas où dans le futur, le site aura besoin de float
//         */
//         total = parseFloat(total) + parseFloat(thenum) * parseFloat(strUser);
//     }
//
//     //Je remets total à string pour pouvoir intégrer total à ma page html.twig
//     total = total.toString();
//     //J'écris dans ma page html à la span qui a pour id="montantapayer"
//     document.getElementById("montantapayer").innerHTML = total + "€";
// }
// ajaxChangeQtePanier();

$(document).on('click', '.buttonAddProductPanier', function () {
    console.log('Click on ' + $(this).val());
    $.ajax({
        url: Routing.generate('ajax_ajout_produit_panier'),
        type: "POST",
        data: {
            "id": $(this).val()
        },
        async: true,
        success: function success(responsePanier) {

            $.ajax({
                url: Routing.generate('panier_ajax'),
                type: "POST",
                async: true,
                success: function success(responsePanier, textStatus) {

                    $('.row.panier-menu').empty().append(responsePanier);
                },
                error: function error(data) {
                    console.log(data);
                    alert('Problème refresh Panier');
                    //$("body").css({"opacity": "1", "background-color":"#fff"});
                }
            });
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
});

/***/ }),

/***/ "./web/assets/js/ajax/ajaxChangeTunnelAchat.js":
/*!*****************************************************!*\
  !*** ./web/assets/js/ajax/ajaxChangeTunnelAchat.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

$(document).on('click', '#tab-link-produit', function () {
    $(this);
    // var choixDebut = $('.slider-time').text();
    // var choixFin = $('.slider-time2').text();
    // var date =  $('#datepicker-altFormat').val();
    // var idSalle = $(this).val();

    //console.log(idSalle + 'idsalle');
    // $('#slider-range .heureActuelleDefaut').val("");
    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('produits_ajax'),
        type: "GET",
        async: true,
        success: function success(responseProduits, textStatus) {
            $('#display-salle').empty().append(responseProduits);
            $('.reservation-select-creneau').hide();
            $('.recherche-horaire').hide();
            // $.get(Routing.generate(''), function(html){
            //     $('#display-panier').empty().html(html);
            //
            // });
        },
        error: function error(data) {
            console.log(data);
            alert('Problème récupération des produtis');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });

    return false;
});

$(document).on('click', '#tab-link-salle', function () {
    $(this).parent().tab('show');
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();

    //console.log(date + ' ' + choixDebut +':00');
    //console.log(date + ' ' + choixFin +':00');

    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('salles_disponible'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00'
        },
        async: true,
        success: function success(response, textStatus) {
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').show();
            $('.recherche-horaire').show();
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
    return false;
});

/***/ }),

/***/ "./web/assets/js/ajax/ajaxCheckDispoDate.js":
/*!**************************************************!*\
  !*** ./web/assets/js/ajax/ajaxCheckDispoDate.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

$(document).on('click', 'button.buttonSearch', function () {

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();

    //console.log(date + ' ' + choixDebut +':00');
    //console.log(date + ' ' + choixFin +':00');

    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('salles_disponible'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00'
        },
        async: true,
        success: function success(response, textStatus) {
            $('#display-salle').empty().append(response);
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
    return false;
});

/***/ }),

/***/ "./web/assets/js/ajax/ajaxChoixSalle.js":
/*!**********************************************!*\
  !*** ./web/assets/js/ajax/ajaxChoixSalle.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

$(document).on('click', 'button.btn-success.buttonAddSalle', function () {

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();
    var idSalle = $(this).val();

    console.log(idSalle + 'idsalle');
    // $('#slider-range .heureActuelleDefaut').val("");
    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();
    $('#tab-link-produit').parent().tab('show');
    // function getDispoSalle(){
    //     $.ajax({
    //         url: Routing.generate('salles_disponible_ajax'),
    //         type: "POST",
    //         async: true,
    //         data: {
    //             "heureChoixDebut": date + ' ' + choixDebut +':00',
    //             "heureChoixFin": date + ' ' + choixFin +':00',
    //             "idSalle" : idSalle,
    //         },success: function (response, textStatus) {
    //
    //         }
    //
    //
    // }
    $.ajax({
        url: Routing.generate('salles_disponible_ajax'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00',
            "idSalle": idSalle
        },
        success: function success(isDispo, textStatus) {
            //$("body").css({"opacity": "0.5", "background-color":"#000"});

            $.ajax({
                url: Routing.generate('ajout_panier_salle'),
                type: "POST",
                data: {
                    "heureChoixDebut": date + ' ' + choixDebut + ':00',
                    "heureChoixFin": date + ' ' + choixFin + ':00',
                    "id": idSalle
                },
                async: true,
                success: function success(response, textStatus) {
                    $.ajax({
                        url: Routing.generate('panier_ajax'),
                        type: "POST",
                        // data: {
                        //     "heureChoixDebut": date + ' ' + choixDebut +':00',
                        //     "heureChoixFin": date + ' ' + choixFin +':00',
                        //     "id" : idSalle,
                        // },
                        async: true,
                        success: function success(responsePanier, textStatus) {
                            if (isDispo = '1') {
                                $('.row.panier-menu').empty().append(responsePanier);

                                $.ajax({
                                    url: Routing.generate('produits_ajax'),
                                    type: "GET",
                                    async: true,
                                    success: function success(responseProduits, textStatus) {
                                        $('#display-salle').empty().append(responseProduits);
                                        $('.reservation-select-creneau').hide();
                                        $('.recherche-horaire').hide();
                                        // $.get(Routing.generate(''), function(html){
                                        //     $('#display-panier').empty().html(html);
                                        //
                                        // });
                                    },
                                    error: function error(data) {
                                        console.log(data);
                                        alert('Problème récupération des produtis');
                                        //$("body").css({"opacity": "1", "background-color":"#fff"});
                                    }
                                });
                            } else {
                                alert('La salle n\'est plus disponible');
                            }
                        },
                        error: function error(data) {
                            console.log(data);
                            alert('Problème ajout de la salle choisi');
                            //$("body").css({"opacity": "1", "background-color":"#fff"});
                        }
                    });
                },
                error: function error(data) {
                    console.log(data);
                    alert('Problème ajout salle');
                    //$("body").css({"opacity": "1", "background-color":"#fff"});
                }
            });
        },
        error: function error(data) {
            alert('Problème lors de la vérification de la disponibilité de la salle n°' + idSalle);
        }
    });

    return false;
});

/***/ }),

/***/ "./web/assets/js/ajax/ajaxPanier.js":
/*!******************************************!*\
  !*** ./web/assets/js/ajax/ajaxPanier.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {


$(document).on('click', '.buttonDeleteProduit', function () {
    console.log('Click on ' + $(this).val());
    $.ajax({
        url: Routing.generate('ajax_delete_panier'),
        type: "POST",
        data: {
            "id": $(this).val()
        },
        async: true,
        success: function success(responsePanier, textStatus) {
            $.ajax({
                url: Routing.generate('panier_ajax'),
                type: "POST",
                async: true,
                success: function success(responsePanier, textStatus) {

                    $('.row.panier-menu').empty().append(responsePanier);
                },
                error: function error(data) {
                    console.log(data);
                    alert('Problème refresh Panier');
                    //$("body").css({"opacity": "1", "background-color":"#fff"});
                }
            });
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
});

$(document).on('click', '.buttonDeleteSalle', function () {
    console.log('Click on ' + $(this).val());
    $.ajax({
        url: Routing.generate('ajax_delete_panier_salle'),
        type: "POST",
        data: {
            "idsalle": $(this).val()
        },
        async: true,
        success: function success(responsePanier, textStatus) {
            $.ajax({
                url: Routing.generate('panier_ajax'),
                type: "POST",
                async: true,
                success: function success(responsePanier, textStatus) {

                    $('.row.panier-menu').empty().append(responsePanier);
                },
                error: function error(data) {
                    console.log(data);
                    alert('Problème refresh Panier');
                    //$("body").css({"opacity": "1", "background-color":"#fff"});
                }
            });
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
});

$(document).on('change', 'select.select-qte-produit', function () {
    // alert( this.value + 'idproduit'+ $(this).parent().parent().find('.buttonDeleteProduit').val() );

    $.ajax({
        url: Routing.generate('ajax_ajout_produit_panier'),
        type: "POST",
        data: {
            "id": $(this).parent().parent().find('.buttonDeleteProduit').val(),
            "qte": this.value
        },
        async: true,
        success: function success(responsePanier) {

            $.ajax({
                url: Routing.generate('panier_ajax'),
                type: "POST",
                async: true,
                success: function success(responsePanier, textStatus) {
                    $('.row.panier-menu').empty().append(responsePanier);
                },
                error: function error(data) {
                    console.log(data);
                    alert('Problème refresh Panier');
                    //$("body").css({"opacity": "1", "background-color":"#fff"});
                }
            });
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
});

function refreshPanier() {
    $.ajax({
        url: Routing.generate('panier_ajax'),
        type: "POST",
        async: true,
        success: function success(responsePanier, textStatus) {

            $('.row.panier-menu').empty().append(responsePanier);
        },
        error: function error(data) {
            console.log(data);
            alert('Problème refresh Panier');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
}

/***/ }),

/***/ "./web/assets/js/places/ajaxGestionPlaces.js":
/*!***************************************************!*\
  !*** ./web/assets/js/places/ajaxGestionPlaces.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var firstSeatLabel = 1;

$(document).ready(function () {

    if ($('#seat-map').length && $('#selected-seats').length) {
        initCarteInteractive();
    }

    function initCarteInteractive() {
        var $cart = $('#selected-seats'),
            $counter = $('#counter'),
            $total = $('#total'),
            sc = $('#seat-map').seatCharts({
            map: ['ff_ff', 'ff_ff', 'ee_ee', 'ee_ee', 'ee___', 'ee_ee', 'ee_ee', 'ee_ee', 'eeeee'],
            seats: {
                f: {
                    price: 5,
                    classes: 'first-class', //your custom CSS class
                    category: 'First Class'
                },
                e: {
                    price: 5,
                    classes: 'economy-class', //your custom CSS class
                    category: 'Economy Class'
                }

            },
            naming: {
                top: false,
                getLabel: function getLabel(character, row, column) {
                    return firstSeatLabel++;
                }
            },
            legend: {
                node: $('#legend'),
                items: [['f', 'available', 'First Class'], ['e', 'available', 'Economy Class'], ['f', 'unavailable', 'Already Booked']]
            },
            click: function click() {
                if (this.status() == 'available') {
                    //let's create a new <li> which we'll add to the cart items
                    $('<li>' + this.data().category + ' Seat # ' + this.settings.label + ': <b>$' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>').attr('id', 'cart-item-' + this.settings.id).data('seatId', this.settings.id).appendTo($cart);

                    /*
                     * Lets update the counter and total
                     *
                     * .find function will not find the current seat, because it will change its stauts only after return
                     * 'selected'. This is why we have to add 1 to the length and the current seat price to the total.
                     */
                    $counter.text(sc.find('selected').length + 1);
                    $total.text(recalculateTotal(sc) + this.data().price);

                    return 'selected';
                } else if (this.status() == 'selected') {
                    //update the counter
                    $counter.text(sc.find('selected').length - 1);
                    //and total
                    $total.text(recalculateTotal(sc) - this.data().price);

                    //remove the item from our cart
                    $('#cart-item-' + this.settings.id).remove();

                    //seat has been vacated
                    return 'available';
                } else if (this.status() == 'unavailable') {
                    //seat has been already booked
                    return 'unavailable';
                } else {
                    return this.style();
                }
            }
        });

        //this will handle "[cancel]" link clicks
        $('#selected-seats').on('click', '.cancel-cart-item', function () {
            //let's just trigger Click event on the appropriate seat, so we don't have to repeat the logic here
            sc.get($(this).parents('li:first').data('seatId')).click();
        });

        //let's pretend some seats have already been booked
        sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
    }
});

function recalculateTotal(sc) {
    var total = 0;

    //basically find every selected seat and sum its price
    sc.find('selected').each(function () {
        total += this.data().price;
    });

    return total;
}

/***/ }),

/***/ "./web/assets/js/places/jquery.seat-charts.js":
/*!****************************************************!*\
  !*** ./web/assets/js/places/jquery.seat-charts.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery-Seat-Charts v1.1.5 -> v2 (Karim BOUBRIT)
 * https://github.com/mateuszmarkowski/jQuery-Seat-Charts
 *
 * Copyright 2013, 2016 Mateusz Markowski
 * Released under the MIT license
 * Upgrade by author: Karim BOUBRIT
 */

(function ($) {

	//'use strict';	

	$.fn.seatCharts = function (setup) {

		//if there's seatCharts object associated with the current element, return it
		if (this.data('seatCharts')) {
			return this.data('seatCharts');
		}

		var fn = this,
		    seats = {},
		    seatIds = [],
		    legend,
		    settings = {
			animate: false, //requires jQuery UI
			naming: {
				top: true,
				left: true,
				getId: function getId(character, row, column) {
					return row + '_' + column;
				},
				getLabel: function getLabel(character, row, column) {
					return column;
				}

			},
			legend: {
				node: null,
				items: []
			},
			click: function click() {

				if (this.status() == 'available') {
					return 'selected';
				} else if (this.status() == 'selected') {
					return 'available';
				} else {
					return this.style();
				}
			},
			focus: function focus() {

				if (this.status() == 'available') {
					return 'focused';
				} else {
					return this.style();
				}
			},
			blur: function blur() {
				return this.status();
			},
			seats: {}

		},

		//seat will be basically a seat object which we'll when generating the map
		seat = function (seatCharts, seatChartsSettings) {
			return function (setup) {
				var fn = this;

				fn.settings = $.extend({
					status: 'available', //available, unavailable, selected
					style: 'available',
					//make sure there's an empty hash if user doesn't pass anything
					data: seatChartsSettings.seats[setup.character] || {}
					//anything goes here?
				}, setup);

				fn.settings.$node = $('<div></div>');

				fn.settings.$node.attr({
					id: fn.settings.id,
					role: 'checkbox',
					'aria-checked': false,
					focusable: true,
					tabIndex: -1 //manual focus
				}).text(fn.settings.label).addClass(['seatCharts-seat', 'seatCharts-cell', 'available'].concat(
				//let's merge custom user defined classes with standard JSC ones
				fn.settings.classes, typeof seatChartsSettings.seats[fn.settings.character] == "undefined" ? [] : seatChartsSettings.seats[fn.settings.character].classes).join(' '));

				//basically a wrapper function
				fn.data = function () {
					return fn.settings.data;
				};

				fn.char = function () {
					return fn.settings.character;
				};

				fn.node = function () {
					return fn.settings.$node;
				};

				/*
     * Can either set or return status depending on arguments.
     *
     * If there's no argument, it will return the current style.
     *
     * If you pass an argument, it will update seat's style
     */
				fn.style = function () {

					return arguments.length == 1 ? function (newStyle) {
						var oldStyle = fn.settings.style;

						//if nothing changes, do nothing
						if (newStyle == oldStyle) {
							return oldStyle;
						}

						//focused is a special style which is not associated with status
						fn.settings.status = newStyle != 'focused' ? newStyle : fn.settings.status;
						fn.settings.$node.attr('aria-checked', newStyle == 'selected');

						//if user wants to animate status changes, let him do this
						seatChartsSettings.animate ? fn.settings.$node.switchClass(oldStyle, newStyle, 200) : fn.settings.$node.removeClass(oldStyle).addClass(newStyle);

						return fn.settings.style = newStyle;
					}(arguments[0]) : fn.settings.style;
				};

				//either set or retrieve
				fn.status = function () {

					return fn.settings.status = arguments.length == 1 ? fn.style(arguments[0]) : fn.settings.status;
				};

				//using immediate function to convienietly get shortcut variables
				(function (seatSettings, character, seat) {
					//attach event handlers
					$.each(['click', 'focus', 'blur'], function (index, callback) {

						//we want to be able to call the functions for each seat object
						fn[callback] = function () {
							if (callback == 'focus') {
								//if there's already a focused element, we have to remove focus from it first
								if (seatCharts.attr('aria-activedescendant') !== undefined) {
									seats[seatCharts.attr('aria-activedescendant')].blur();
								}
								seatCharts.attr('aria-activedescendant', seat.settings.id);
								seat.node().focus();
							}

							/*
        * User can pass his own callback function, so we have to first check if it exists
        * and if not, use our default callback.
        *
        * Each callback function is executed in the current seat context.
        */
							return fn.style(typeof seatSettings[character][callback] === 'function' ? seatSettings[character][callback].apply(seat) : seatChartsSettings[callback].apply(seat));
						};
					});
					//the below will become seatSettings, character, seat thanks to the immediate function		
				})(seatChartsSettings.seats, fn.settings.character, fn);

				fn.node()
				//the first three mouse events are simple
				.on('click', fn.click).on('mouseenter', fn.focus).on('mouseleave', fn.blur)

				//keydown requires quite a lot of logic, because we have to know where to move the focus
				.on('keydown', function (seat, $seat) {

					return function (e) {

						var $newSeat;

						//everything depends on the pressed key
						switch (e.which) {
							//spacebar will just trigger the same event mouse click does
							case 32:
								e.preventDefault();
								seat.click();
								break;
							//UP & DOWN
							case 40:
							case 38:
								e.preventDefault();

								/*
         * This is a recursive, immediate function which searches for the first "focusable" row.
         * 
         * We're using immediate function because we want a convenient access to some DOM elements
         * We're using recursion because sometimes we may hit an empty space rather than a seat.
         *
         */
								$newSeat = function findAvailable($rows, $seats, $currentRow) {
									var $newRow;

									//let's determine which row should we move to

									if (!$rows.index($currentRow) && e.which == 38) {
										//if this is the first row and user has pressed up arrow, move to the last row
										$newRow = $rows.last();
									} else if ($rows.index($currentRow) == $rows.length - 1 && e.which == 40) {
										//if this is the last row and user has pressed down arrow, move to the first row
										$newRow = $rows.first();
									} else {
										//using eq to get an element at the desired index position
										$newRow = $rows.eq(
										//if up arrow, then decrement the index, if down increment it
										$rows.index($currentRow) + (e.which == 38 ? -1 : +1));
									}

									//now that we know the row, let's get the seat using the current column position
									$newSeat = $newRow.find('.seatCharts-seat,.seatCharts-space').eq($seats.index($seat));

									//if the seat we found is a space, keep looking further
									return $newSeat.hasClass('seatCharts-space') ? findAvailable($rows, $seats, $newRow) : $newSeat;
								}($seat
								//get a reference to the parent container and then select all rows but the header
								.parents('.seatCharts-container').find('.seatCharts-row:not(.seatCharts-header)'), $seat
								//get a reference to the parent row and then find all seat cells (both seats & spaces)
								.parents('.seatCharts-row:first').find('.seatCharts-seat,.seatCharts-space'),
								//get a reference to the current row
								$seat.parents('.seatCharts-row:not(.seatCharts-header)'));

								//we couldn't determine the new seat, so we better give up
								if (!$newSeat.length) {
									return;
								}

								//remove focus from the old seat and put it on the new one
								seat.blur();
								seats[$newSeat.attr('id')].focus();
								$newSeat.focus();

								//update our "aria" reference with the new seat id
								seatCharts.attr('aria-activedescendant', $newSeat.attr('id'));

								break;
							//LEFT & RIGHT
							case 37:
							case 39:
								e.preventDefault();
								/*
         * The logic here is slightly different from the one for up/down arrows.
         * User will be able to browse the whole map using just left/right arrow, because
         * it will move to the next row when we reach the right/left-most seat.
         */
								$newSeat = function ($seats) {

									if (!$seats.index($seat) && e.which == 37) {
										//user has pressed left arrow and we're currently on the left-most seat
										return $seats.last();
									} else if ($seats.index($seat) == $seats.length - 1 && e.which == 39) {
										//user has pressed right arrow and we're currently on the right-most seat
										return $seats.first();
									} else {
										//simply move one seat left or right depending on the key
										return $seats.eq($seats.index($seat) + (e.which == 37 ? -1 : +1));
									}
								}($seat.parents('.seatCharts-container:first').find('.seatCharts-seat:not(.seatCharts-space)'));

								if (!$newSeat.length) {
									return;
								}

								//handle focus
								seat.blur();
								seats[$newSeat.attr('id')].focus();
								$newSeat.focus();

								//update our "aria" reference with the new seat id
								seatCharts.attr('aria-activedescendant', $newSeat.attr('id'));
								break;
							default:
								break;

						}
					};
				}(fn, fn.node()));
				//.appendTo(seatCharts.find('.' + row));
			};
		}(fn, settings);

		fn.addClass('seatCharts-container');

		//true -> deep copy!
		$.extend(true, settings, setup);

		//Generate default row ids unless user passed his own
		settings.naming.rows = settings.naming.rows || function (length) {
			var rows = [];
			for (var i = 1; i <= length; i++) {
				rows.push(i);
			}
			return rows;
		}(settings.map.length);

		//Generate default column ids unless user passed his own
		settings.naming.columns = settings.naming.columns || function (length) {
			var columns = [];
			for (var i = 1; i <= length; i++) {
				columns.push(i);
			}
			return columns;
		}(settings.map[0].split('').length);

		if (settings.naming.top) {
			var $headerRow = $('<div></div>').addClass('seatCharts-row seatCharts-header');

			if (settings.naming.left) {
				$headerRow.append($('<div></div>').addClass('seatCharts-cell'));
			}

			$.each(settings.naming.columns, function (index, value) {
				$headerRow.append($('<div></div>').addClass('seatCharts-cell').text(value));
			});
		}

		fn.append($headerRow);

		//do this for each map row
		$.each(settings.map, function (row, characters) {

			var $row = $('<div></div>').addClass('seatCharts-row');

			if (settings.naming.left) {
				$row.append($('<div></div>').addClass('seatCharts-cell seatCharts-space').text(settings.naming.rows[row]));
			}

			/*
    * Do this for each seat (letter)
    *
    * Now users will be able to pass custom ID and label which overwrite the one that seat would be assigned by getId and
    * getLabel
    *
    * New format is like this:
    * a[ID,label]a[ID]aaaaa
    *
    * So you can overwrite the ID or label (or both) even for just one seat.
    * Basically ID should be first, so if you want to overwrite just label write it as follows:
    * a[,LABEL]
    *
    * Allowed characters in IDs areL 0-9, a-z, A-Z, _
    * Allowed characters in labels are: 0-9, a-z, A-Z, _, ' ' (space)
    *
    */

			$.each(characters.match(/[a-z_]{1}(\[[0-9a-z_]{0,}(,[0-9a-z_ ]+)?\])?/gi), function (column, characterParams) {
				var matches = characterParams.match(/([a-z_]{1})(\[([0-9a-z_ ,]+)\])?/i),

				//no matter if user specifies [] params, the character should be in the second element
				character = matches[1],

				//check if user has passed some additional params to override id or label
				params = typeof matches[3] !== 'undefined' ? matches[3].split(',') : [],

				//id param should be first
				overrideId = params.length ? params[0] : null,

				//label param should be second
				overrideLabel = params.length === 2 ? params[1] : null;

				$row.append(character != '_' ?
				//if the character is not an underscore (empty space)
				function (naming) {

					//so users don't have to specify empty objects
					settings.seats[character] = character in settings.seats ? settings.seats[character] : {};

					var id = overrideId ? overrideId : naming.getId(character, naming.rows[row], naming.columns[column]);
					seats[id] = new seat({
						id: id,
						label: overrideLabel ? overrideLabel : naming.getLabel(character, naming.rows[row], naming.columns[column]),
						row: row,
						column: column,
						character: character
					});

					seatIds.push(id);
					return seats[id].node();
				}(settings.naming) :
				//this is just an empty space (_)
				$('<div></div>').addClass('seatCharts-cell seatCharts-space'));
			});

			fn.append($row);
		});

		//if there're any legend items to be rendered
		settings.legend.items.length ? function (legend) {
			//either use user-defined container or create our own and insert it right after the seat chart div
			var $container = (legend.node || $('<div></div>').insertAfter(fn)).addClass('seatCharts-legend');

			var $ul = $('<ul></ul>').addClass('seatCharts-legendList').appendTo($container);

			$.each(legend.items, function (index, item) {
				$ul.append($('<li></li>').addClass('seatCharts-legendItem').append($('<div></div>')
				//merge user defined classes with our standard ones
				.addClass(['seatCharts-seat', 'seatCharts-cell', item[1]].concat(settings.classes, typeof settings.seats[item[0]] == "undefined" ? [] : settings.seats[item[0]].classes).join(' '))).append($('<span></span>').addClass('seatCharts-legendDescription').text(item[2])));
			});

			return $container;
		}(settings.legend) : null;

		fn.attr({
			tabIndex: 0
		});

		//when container's focused, move focus to the first seat
		fn.focus(function () {
			if (fn.attr('aria-activedescendant')) {
				seats[fn.attr('aria-activedescendant')].blur();
			}

			fn.find('.seatCharts-seat:not(.seatCharts-space):first').focus();
			seats[seatIds[0]].focus();
		});

		//public methods of seatCharts
		fn.data('seatCharts', {
			seats: seats,
			seatIds: seatIds,
			//set for one, set for many, get for one
			status: function status() {
				var fn = this;

				return arguments.length == 1 ? fn.seats[arguments[0]].status() : function (seatsIds, newStatus) {

					return typeof seatsIds == 'string' ? fn.seats[seatsIds].status(newStatus) : function () {
						$.each(seatsIds, function (index, seatId) {
							fn.seats[seatId].status(newStatus);
						});
					}();
				}(arguments[0], arguments[1]);
			},
			each: function each(callback) {
				var fn = this;

				for (var seatId in fn.seats) {
					if (false === callback.call(fn.seats[seatId], seatId)) {
						return seatId; //return last checked
					}
				}

				return true;
			},
			node: function node() {
				var fn = this;
				//basically create a CSS query to get all seats by their DOM ids
				return $('#' + fn.seatIds.join(',#'));
			},

			find: function find(query) {
				//D, a.available, unavailable
				var fn = this;

				var seatSet = fn.set();

				//is RegExp
				return query instanceof RegExp ? function () {
					fn.each(function (id) {
						if (id.match(query)) {
							seatSet.push(id, this);
						}
					});
					return seatSet;
				}() : query.length == 1 ? function (character) {
					//user searches just for a particual character
					fn.each(function () {
						if (this.char() == character) {
							seatSet.push(this.settings.id, this);
						}
					});

					return seatSet;
				}(query) : function () {
					//user runs a more sophisticated query, so let's see if there's a dot
					return query.indexOf('.') > -1 ? function () {
						//there's a dot which separates character and the status
						var parts = query.split('.');

						fn.each(function (seatId) {
							if (this.char() == parts[0] && this.status() == parts[1]) {
								seatSet.push(this.settings.id, this);
							}
						});

						return seatSet;
					}() : function () {
						fn.each(function () {
							if (this.status() == query) {
								seatSet.push(this.settings.id, this);
							}
						});
						return seatSet;
					}();
				}();
			},
			set: function _set() {
				//inherits some methods
				var fn = this;

				return {
					seats: [],
					seatIds: [],
					length: 0,
					status: function status() {
						var args = arguments,
						    that = this;
						//if there's just one seat in the set and user didn't pass any params, return current status
						return this.length == 1 && args.length == 0 ? this.seats[0].status() : function () {
							//otherwise call status function for each of the seats in the set
							$.each(that.seats, function () {
								this.status.apply(this, args);
							});
						}();
					},
					node: function node() {
						return fn.node.call(this);
					},
					each: function each() {
						return fn.each.call(this, arguments[0]);
					},
					get: function get() {
						return fn.get.call(this, arguments[0]);
					},
					find: function find() {
						return fn.find.call(this, arguments[0]);
					},
					set: function set() {
						return _set.call(fn);
					},
					push: function push(id, seat) {
						this.seats.push(seat);
						this.seatIds.push(id);
						++this.length;
					}
				};
			},
			//get one object or a set of objects
			get: function get(seatsIds) {
				var fn = this;

				return typeof seatsIds == 'string' ? fn.seats[seatsIds] : function () {

					var seatSet = fn.set();

					$.each(seatsIds, function (index, seatId) {
						if (_typeof(fn.seats[seatId]) === 'object') {
							seatSet.push(seatId, fn.seats[seatId]);
						}
					});

					return seatSet;
				}();
			}
		});

		return fn.data('seatCharts');
	};
})(jQuery);

/***/ }),

/***/ 1:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/ajax/ajaxCheckDispoDate.js ./web/assets/js/ajax/ajaxChoixSalle.js ./web/assets/js/ajax/ajaxAjoutProduitPanier.js ./web/assets/js/ajax/ajaxPanier.js ./web/assets/js/ajax/ajaxChangeTunnelAchat.js ./web/assets/js/places/jquery.seat-charts.js ./web/assets/js/places/ajaxGestionPlaces.js ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/ajax/ajaxCheckDispoDate.js */"./web/assets/js/ajax/ajaxCheckDispoDate.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChoixSalle.js */"./web/assets/js/ajax/ajaxChoixSalle.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxAjoutProduitPanier.js */"./web/assets/js/ajax/ajaxAjoutProduitPanier.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxPanier.js */"./web/assets/js/ajax/ajaxPanier.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChangeTunnelAchat.js */"./web/assets/js/ajax/ajaxChangeTunnelAchat.js");
__webpack_require__(/*! ./web/assets/js/places/jquery.seat-charts.js */"./web/assets/js/places/jquery.seat-charts.js");
module.exports = __webpack_require__(/*! ./web/assets/js/places/ajaxGestionPlaces.js */"./web/assets/js/places/ajaxGestionPlaces.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjhhNWU1ODkwOWI0Nzg0ZjRkODYiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50Iiwib24iLCJjb25zb2xlIiwibG9nIiwidmFsIiwiYWpheCIsInVybCIsIlJvdXRpbmciLCJnZW5lcmF0ZSIsInR5cGUiLCJkYXRhIiwiYXN5bmMiLCJzdWNjZXNzIiwicmVzcG9uc2VQYW5pZXIiLCJ0ZXh0U3RhdHVzIiwiZW1wdHkiLCJhcHBlbmQiLCJlcnJvciIsImFsZXJ0IiwidGhhdCIsImxvYWQiLCJmYWRlSW4iLCJyZXNwb25zZVByb2R1aXRzIiwiaGlkZSIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwicmVzcG9uc2UiLCJzaG93IiwiaWRTYWxsZSIsImlzRGlzcG8iLCJmaW5kIiwidmFsdWUiLCJyZWZyZXNoUGFuaWVyIiwiZmlyc3RTZWF0TGFiZWwiLCJyZWFkeSIsImxlbmd0aCIsImluaXRDYXJ0ZUludGVyYWN0aXZlIiwiJGNhcnQiLCIkY291bnRlciIsIiR0b3RhbCIsInNjIiwic2VhdENoYXJ0cyIsIm1hcCIsInNlYXRzIiwiZiIsInByaWNlIiwiY2xhc3NlcyIsImNhdGVnb3J5IiwiZSIsIm5hbWluZyIsInRvcCIsImdldExhYmVsIiwiY2hhcmFjdGVyIiwicm93IiwiY29sdW1uIiwibGVnZW5kIiwibm9kZSIsIml0ZW1zIiwiY2xpY2siLCJzdGF0dXMiLCJzZXR0aW5ncyIsImxhYmVsIiwiYXR0ciIsImlkIiwiYXBwZW5kVG8iLCJyZWNhbGN1bGF0ZVRvdGFsIiwicmVtb3ZlIiwic3R5bGUiLCJnZXQiLCJwYXJlbnRzIiwidG90YWwiLCJlYWNoIiwiZm4iLCJzZXR1cCIsInNlYXRJZHMiLCJhbmltYXRlIiwibGVmdCIsImdldElkIiwiZm9jdXMiLCJibHVyIiwic2VhdCIsInNlYXRDaGFydHNTZXR0aW5ncyIsImV4dGVuZCIsIiRub2RlIiwicm9sZSIsImZvY3VzYWJsZSIsInRhYkluZGV4IiwiYWRkQ2xhc3MiLCJjb25jYXQiLCJqb2luIiwiY2hhciIsImFyZ3VtZW50cyIsIm5ld1N0eWxlIiwib2xkU3R5bGUiLCJzd2l0Y2hDbGFzcyIsInJlbW92ZUNsYXNzIiwic2VhdFNldHRpbmdzIiwiaW5kZXgiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImFwcGx5IiwiJHNlYXQiLCIkbmV3U2VhdCIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJmaW5kQXZhaWxhYmxlIiwiJHJvd3MiLCIkc2VhdHMiLCIkY3VycmVudFJvdyIsIiRuZXdSb3ciLCJsYXN0IiwiZmlyc3QiLCJlcSIsImhhc0NsYXNzIiwicm93cyIsImkiLCJwdXNoIiwiY29sdW1ucyIsInNwbGl0IiwiJGhlYWRlclJvdyIsImNoYXJhY3RlcnMiLCIkcm93IiwibWF0Y2giLCJjaGFyYWN0ZXJQYXJhbXMiLCJtYXRjaGVzIiwicGFyYW1zIiwib3ZlcnJpZGVJZCIsIm92ZXJyaWRlTGFiZWwiLCIkY29udGFpbmVyIiwiaW5zZXJ0QWZ0ZXIiLCIkdWwiLCJpdGVtIiwic2VhdHNJZHMiLCJuZXdTdGF0dXMiLCJzZWF0SWQiLCJjYWxsIiwicXVlcnkiLCJzZWF0U2V0Iiwic2V0IiwiUmVnRXhwIiwiaW5kZXhPZiIsInBhcnRzIiwiYXJncyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxFQUFFQyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHlCQUF4QixFQUFtRCxZQUFVO0FBQ3pEQyxZQUFRQyxHQUFSLENBQVksY0FBY0osRUFBRSxJQUFGLEVBQVFLLEdBQVIsRUFBMUI7QUFDQUwsTUFBRU0sSUFBRixDQUFPO0FBQ0hDLGFBQUtDLFFBQVFDLFFBQVIsQ0FBaUIsMkJBQWpCLENBREY7QUFFSEMsY0FBTSxNQUZIO0FBR0hDLGNBQU07QUFDRixrQkFBTVgsRUFBRSxJQUFGLEVBQVFLLEdBQVI7QUFESixTQUhIO0FBTUhPLGVBQU8sSUFOSjtBQU9IQyxpQkFBUyxpQkFBVUMsY0FBVixFQUEwQjs7QUFFL0JkLGNBQUVNLElBQUYsQ0FBTztB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NUQsR0FBRzdCLEtBQUgsQ0FBU3lGLFFBQVQsQ0FETSxHQUNnQixZQUFXOztBQUVoQyxTQUFJSyxVQUFVakUsR0FBR2tFLEdBQUgsRUFBZDs7QUFFQS9JLE9BQUU0RSxJQUFGLENBQU82RCxRQUFQLEVBQWlCLFVBQVNuQyxLQUFULEVBQWdCcUMsTUFBaEIsRUFBd0I7QUFDeEMsVUFBSSxRQUFPOUQsR0FBRzdCLEtBQUgsQ0FBUzJGLE1BQVQsQ0FBUCxNQUE0QixRQUFoQyxFQUEwQztBQUN6Q0csZUFBUXJCLElBQVIsQ0FBYWtCLE1BQWIsRUFBcUI5RCxHQUFHN0IsS0FBSCxDQUFTMkYsTUFBVCxDQUFyQjtBQUNBO0FBQ0QsTUFKRDs7QUFNQSxZQUFPRyxPQUFQO0FBQ0EsS0FYb0IsRUFEdEI7QUFhQTtBQS9Jb0IsR0FBdEI7O0FBa0pBLFNBQU9qRSxHQUFHbEUsSUFBSCxDQUFRLFlBQVIsQ0FBUDtBQUNBLEVBbm1CRDtBQXNtQkEsQ0ExbUJELEVBMG1CR3lJLE1BMW1CSCxFIiwiZmlsZSI6ImFqYXguNmI3ZWM2MTg2OTU1MTMyODgzMjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjhhNWU1ODkwOWI0Nzg0ZjRkODYiLCIgICAgLy9cbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGFqYXhDaGFuZ2VRdGVQYW5pZXIoKSB7XG4gICAgLy8gICAgIC8vSidpbml0aWFsaXNlIGxlIG1vbnRhbnQgdG90YWwgw6AgMC5cbiAgICAvLyAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAvL1xuICAgIC8vICAgICAvLyBKZSBib3VjbGUgc3VyIGxlIG5vbWJyZSBkZSBwcm9kdWl0IGFmaW4gZGUgcsOpY3Vww6lyZXIgbGV1ciBJRC4gSmUgY29tbWVuY2Ugw6AgMSBwYXJjZSBxdWUgbGUgcHJlbWllciBJRCBkdSBwcm9kdWl0IHZhdXQgMS5cbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAvLyAgICAgICAgIC8vSmUgcsOpY3Vww6hyZSBsYSB2YWxldXIgcXVpIHNlIHRyb3V2ZSBkYW5zIGwnSWQgXCJwcml4K2lcIi5cbiAgICAvLyAgICAgICAgIHZhciBwcml4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaXgnICsgaSkuaW5uZXJUZXh0O1xuICAgIC8vXG4gICAgLy8gICAgICAgICAvL0plIHLDqWN1w6hyZSBzZXVsZW1lbnQgbGUgbm9tYnJlLlxuICAgIC8vICAgICAgICAgdmFyIHRoZW51bSA9IHByaXgubWF0Y2goL1xcZCsvKVswXTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgLy9KZSByw6ljdXDDqHJlIGxhIHZhbGV1ciBkdSBzZWxlY3QgcXVpIGEgcG91ciBpZCBcInF0ZStpXCJcbiAgICAvLyAgICAgICAgIHZhciBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F0ZScgKyBpKTtcbiAgICAvLyAgICAgICAgIC8vSmUgcsOpY3VwdcOocmUgc2V1bGVtZW50IGxhIHZhbGV1ciBxdWUgbCd1dGlsaXNhdGV1ciBhdXJhIGNob2lzaS5cbiAgICAvLyAgICAgICAgIHZhciBzdHJVc2VyID0gZS5vcHRpb25zW2Uuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIC8qSmUgY2FsY3VsZSBsZSB0b3RhbC4gSmUgcGFyc2VGbG9hdCBjYXIgaidhdmFpcyBxdWUgcXVlIHN0cmluZ3MuXG4gICAgLy8gICAgICAgICAgIEplIHBhcnNlRmxvYXQgc2kgYXUgY2FzIG/DuSBkYW5zIGxlIGZ1dHVyLCBsZSBzaXRlIGF1cmEgYmVzb2luIGRlIGZsb2F0XG4gICAgLy8gICAgICAgICAqL1xuICAgIC8vICAgICAgICAgdG90YWwgPSBwYXJzZUZsb2F0KHRvdGFsKSArIHBhcnNlRmxvYXQodGhlbnVtKSAqIHBhcnNlRmxvYXQoc3RyVXNlcik7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAvL0plIHJlbWV0cyB0b3RhbCDDoCBzdHJpbmcgcG91ciBwb3V2b2lyIGludMOpZ3JlciB0b3RhbCDDoCBtYSBwYWdlIGh0bWwudHdpZ1xuICAgIC8vICAgICB0b3RhbCA9IHRvdGFsLnRvU3RyaW5nKCk7XG4gICAgLy8gICAgIC8vSifDqWNyaXMgZGFucyBtYSBwYWdlIGh0bWwgw6AgbGEgc3BhbiBxdWkgYSBwb3VyIGlkPVwibW9udGFudGFwYXllclwiXG4gICAgLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9udGFudGFwYXllclwiKS5pbm5lckhUTUwgPSB0b3RhbCArIFwi4oKsXCI7XG4gICAgLy8gfVxuICAgIC8vIGFqYXhDaGFuZ2VRdGVQYW5pZXIoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uQWRkUHJvZHVjdFBhbmllcicsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWpvdXRfcHJvZHVpdF9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyKSB7XG5cbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcylcbiAgICAvLyB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICAvLyB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIC8vIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIC8vIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpO1xuICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1zYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5zaG93KCk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnV0dG9uU2VhcmNoJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGVja0Rpc3BvRGF0ZS5qcyIsIiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnRuLXN1Y2Nlc3MuYnV0dG9uQWRkU2FsbGUnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICB2YXIgaWRTYWxsZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICBjb25zb2xlLmxvZyhpZFNhbGxlICsgJ2lkc2FsbGUnKTtcbiAgIC8vICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG4gICAgJCgnI3RhYi1saW5rLXByb2R1aXQnKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICAvLyBmdW5jdGlvbiBnZXREaXNwb1NhbGxlKCl7XG4gICAgLy8gICAgICQuYWpheCh7XG4gICAgLy8gICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlX2FqYXgnKSxcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgLy8gICAgICAgICBkYXRhOiB7XG4gICAgLy8gICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgIC8vICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgIC8vICAgICAgICAgICAgIFwiaWRTYWxsZVwiIDogaWRTYWxsZSxcbiAgICAvLyAgICAgICAgIH0sc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gfVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGVfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICBcImlkU2FsbGVcIiA6IGlkU2FsbGUsXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChpc0Rpc3BvLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdham91dF9wYW5pZXJfc2FsbGUnKSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IGlkU2FsbGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFwiaWRcIiA6IGlkU2FsbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNEaXNwbyA9ICcxJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncHJvZHVpdHNfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUHJvZHVpdHMsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAkKCcjZGlzcGxheS1wYW5pZXInKS5lbXB0eSgpLmh0bWwoaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdMYSBzYWxsZSBuXFwnZXN0IHBsdXMgZGlzcG9uaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgZGUgbGEgc2FsbGUgY2hvaXNpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IHNhbGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgbG9ycyBkZSBsYSB2w6lyaWZpY2F0aW9uIGRlIGxhIGRpc3BvbmliaWxpdMOpIGRlIGxhIHNhbGxlIG7CsCcrIGlkU2FsbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENob2l4U2FsbGUuanMiLCJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uRGVsZXRlU2FsbGUnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXJfc2FsbGUnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRzYWxsZVwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdzZWxlY3Quc2VsZWN0LXF0ZS1wcm9kdWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGFsZXJ0KCB0aGlzLnZhbHVlICsgJ2lkcHJvZHVpdCcrICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnKS52YWwoKSApO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWpvdXRfcHJvZHVpdF9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYnV0dG9uRGVsZXRlUHJvZHVpdCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgIFwicXRlXCI6IHRoaXMudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllcikge1xuXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSlcblxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllcigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhQYW5pZXIuanMiLCJ2YXIgZmlyc3RTZWF0TGFiZWwgPSAxO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuICAgIGlmKCQoJyNzZWF0LW1hcCcpLmxlbmd0aCAmJiAgJCgnI3NlbGVjdGVkLXNlYXRzJykubGVuZ3RoKXtcbiAgICAgICAgaW5pdENhcnRlSW50ZXJhY3RpdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0Q2FydGVJbnRlcmFjdGl2ZSgpe1xuICAgICAgICB2YXIgJGNhcnQgPSAkKCcjc2VsZWN0ZWQtc2VhdHMnKSxcbiAgICAgICAgICAgICRjb3VudGVyID0gJCgnI2NvdW50ZXInKSxcbiAgICAgICAgICAgICR0b3RhbCA9ICQoJyN0b3RhbCcpLFxuICAgICAgICAgICAgc2MgPSAkKCcjc2VhdC1tYXAnKS5zZWF0Q2hhcnRzKHtcbiAgICAgICAgICAgICAgICBtYXA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2ZmX2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZmX2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX19fJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlZWVlJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNlYXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGY6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2ZpcnN0LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnRmlyc3QgQ2xhc3MnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2Vjb25vbXktY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdFY29ub215IENsYXNzJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hbWluZzoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdFNlYXRMYWJlbCsrO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6ICQoJyNsZWdlbmQnKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZicsICdhdmFpbGFibGUnLCAnRmlyc3QgQ2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZScsICdhdmFpbGFibGUnLCAnRWNvbm9teSBDbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ3VuYXZhaWxhYmxlJywgJ0FscmVhZHkgQm9va2VkJ11cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0J3MgY3JlYXRlIGEgbmV3IDxsaT4gd2hpY2ggd2UnbGwgYWRkIHRvIHRoZSBjYXJ0IGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8bGk+JyArIHRoaXMuZGF0YSgpLmNhdGVnb3J5ICsgJyBTZWF0ICMgJyArIHRoaXMuc2V0dGluZ3MubGFiZWwgKyAnOiA8Yj4kJyArIHRoaXMuZGF0YSgpLnByaWNlICsgJzwvYj4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhbmNlbC1jYXJ0LWl0ZW1cIj5bY2FuY2VsXTwvYT48L2xpPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnc2VhdElkJywgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNhcnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogTGV0cyB1cGRhdGUgdGhlIGNvdW50ZXIgYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogLmZpbmQgZnVuY3Rpb24gd2lsbCBub3QgZmluZCB0aGUgY3VycmVudCBzZWF0LCBiZWNhdXNlIGl0IHdpbGwgY2hhbmdlIGl0cyBzdGF1dHMgb25seSBhZnRlciByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqICdzZWxlY3RlZCcuIFRoaXMgaXMgd2h5IHdlIGhhdmUgdG8gYWRkIDEgdG8gdGhlIGxlbmd0aCBhbmQgdGhlIGN1cnJlbnQgc2VhdCBwcmljZSB0byB0aGUgdG90YWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpICsgdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgLSB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBpdGVtIGZyb20gb3VyIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gdmFjYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3VuYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIGFscmVhZHkgYm9va2VkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VuYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvL3RoaXMgd2lsbCBoYW5kbGUgXCJbY2FuY2VsXVwiIGxpbmsgY2xpY2tzXG4gICAgICAgICQoJyNzZWxlY3RlZC1zZWF0cycpLm9uKCdjbGljaycsICcuY2FuY2VsLWNhcnQtaXRlbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vbGV0J3MganVzdCB0cmlnZ2VyIENsaWNrIGV2ZW50IG9uIHRoZSBhcHByb3ByaWF0ZSBzZWF0LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlcGVhdCB0aGUgbG9naWMgaGVyZVxuICAgICAgICAgICAgc2MuZ2V0KCQodGhpcykucGFyZW50cygnbGk6Zmlyc3QnKS5kYXRhKCdzZWF0SWQnKSkuY2xpY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9sZXQncyBwcmV0ZW5kIHNvbWUgc2VhdHMgaGF2ZSBhbHJlYWR5IGJlZW4gYm9va2VkXG4gICAgICAgIHNjLmdldChbJzFfMicsICc0XzEnLCAnN18xJywgJzdfMiddKS5zdGF0dXMoJ3VuYXZhaWxhYmxlJyk7XG4gICAgfVxuXG59KTtcblxuZnVuY3Rpb24gcmVjYWxjdWxhdGVUb3RhbChzYykge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAvL2Jhc2ljYWxseSBmaW5kIGV2ZXJ5IHNlbGVjdGVkIHNlYXQgYW5kIHN1bSBpdHMgcHJpY2VcbiAgICBzYy5maW5kKCdzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0b3RhbCArPSB0aGlzLmRhdGEoKS5wcmljZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwiLyohXG4gKiBqUXVlcnktU2VhdC1DaGFydHMgdjEuMS41IC0+IHYyIChLYXJpbSBCT1VCUklUKVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGV1c3ptYXJrb3dza2kvalF1ZXJ5LVNlYXQtQ2hhcnRzXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIDIwMTYgTWF0ZXVzeiBNYXJrb3dza2lcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogVXBncmFkZSBieSBhdXRob3I6IEthcmltIEJPVUJSSVRcbiAqL1xuXG4oZnVuY3Rpb24oJCkge1xuXHRcdFxuXHQvLyd1c2Ugc3RyaWN0JztcdFxuXHRcdFxuXHQkLmZuLnNlYXRDaGFydHMgPSBmdW5jdGlvbiAoc2V0dXApIHtcblxuXHRcdC8vaWYgdGhlcmUncyBzZWF0Q2hhcnRzIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCwgcmV0dXJuIGl0XG5cdFx0aWYgKHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmbiAgICAgICA9IHRoaXMsXG5cdFx0XHRzZWF0cyAgICA9IHt9LFxuXHRcdFx0c2VhdElkcyAgPSBbXSxcblx0XHRcdGxlZ2VuZCxcblx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRhbmltYXRlIDogZmFsc2UsIC8vcmVxdWlyZXMgalF1ZXJ5IFVJXG5cdFx0XHRcdG5hbWluZyAgOiB7XG5cdFx0XHRcdFx0dG9wICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRsZWZ0ICAgOiB0cnVlLFxuXHRcdFx0XHRcdGdldElkICA6IGZ1bmN0aW9uKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiByb3cgKyAnXycgKyBjb2x1bW47XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRMYWJlbCA6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29sdW1uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVnZW5kIDoge1xuXHRcdFx0XHRcdG5vZGUgICA6IG51bGwsXG5cdFx0XHRcdFx0aXRlbXMgIDogW11cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpY2sgICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnc2VsZWN0ZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2F2YWlsYWJsZSc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb2N1cyAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2ZvY3VzZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSAge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJsdXIgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnN0YXR1cygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWF0cyAgIDoge31cblx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdC8vc2VhdCB3aWxsIGJlIGJhc2ljYWxseSBhIHNlYXQgb2JqZWN0IHdoaWNoIHdlJ2xsIHdoZW4gZ2VuZXJhdGluZyB0aGUgbWFwXG5cdFx0XHRzZWF0ID0gKGZ1bmN0aW9uKHNlYXRDaGFydHMsIHNlYXRDaGFydHNTZXR0aW5ncykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNldHVwKSB7XG5cdFx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0XHRcdHN0YXR1cyA6ICdhdmFpbGFibGUnLCAvL2F2YWlsYWJsZSwgdW5hdmFpbGFibGUsIHNlbGVjdGVkXG5cdFx0XHRcdFx0XHRzdHlsZSAgOiAnYXZhaWxhYmxlJyxcblx0XHRcdFx0XHRcdC8vbWFrZSBzdXJlIHRoZXJlJ3MgYW4gZW1wdHkgaGFzaCBpZiB1c2VyIGRvZXNuJ3QgcGFzcyBhbnl0aGluZ1xuXHRcdFx0XHRcdFx0ZGF0YSAgIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW3NldHVwLmNoYXJhY3Rlcl0gfHwge31cblx0XHRcdFx0XHRcdC8vYW55dGhpbmcgZ29lcyBoZXJlP1xuXHRcdFx0XHRcdH0sIHNldHVwKTtcblxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlID0gJCgnPGRpdj48L2Rpdj4nKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgICAgICA6IGZuLnNldHRpbmdzLmlkLFxuXHRcdFx0XHRcdFx0XHRyb2xlICAgICAgICAgICA6ICdjaGVja2JveCcsXG5cdFx0XHRcdFx0XHRcdCdhcmlhLWNoZWNrZWQnIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGZvY3VzYWJsZSAgICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dGFiSW5kZXggICAgICAgOiAtMSAvL21hbnVhbCBmb2N1c1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50ZXh0KGZuLnNldHRpbmdzLmxhYmVsKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsICdhdmFpbGFibGUnXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdC8vbGV0J3MgbWVyZ2UgY3VzdG9tIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggc3RhbmRhcmQgSlNDIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXSA9PSBcInVuZGVmaW5lZFwiID8gXG5cdFx0XHRcdFx0XHRcdFx0W10gOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXS5jbGFzc2VzXG5cdFx0XHRcdFx0XHRcdCkuam9pbignICcpKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2Jhc2ljYWxseSBhIHdyYXBwZXIgZnVuY3Rpb25cblx0XHRcdFx0XHRmbi5kYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuZGF0YTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLmNoYXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5jaGFyYWN0ZXI7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuJG5vZGU7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogQ2FuIGVpdGhlciBzZXQgb3IgcmV0dXJuIHN0YXR1cyBkZXBlbmRpbmcgb24gYXJndW1lbnRzLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgdGhlcmUncyBubyBhcmd1bWVudCwgaXQgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgc3R5bGUuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB5b3UgcGFzcyBhbiBhcmd1bWVudCwgaXQgd2lsbCB1cGRhdGUgc2VhdCdzIHN0eWxlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm4uc3R5bGUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/XG5cdFx0XHRcdFx0XHRcdChmdW5jdGlvbihuZXdTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvbGRTdHlsZSA9IGZuLnNldHRpbmdzLnN0eWxlO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiBub3RoaW5nIGNoYW5nZXMsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV3U3R5bGUgPT0gb2xkU3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvbGRTdHlsZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9mb2N1c2VkIGlzIGEgc3BlY2lhbCBzdHlsZSB3aGljaCBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIHN0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLnN0YXR1cyA9IG5ld1N0eWxlICE9ICdmb2N1c2VkJyA/IG5ld1N0eWxlIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0cignYXJpYS1jaGVja2VkJywgbmV3U3R5bGUgPT0gJ3NlbGVjdGVkJyk7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIHVzZXIgd2FudHMgdG8gYW5pbWF0ZSBzdGF0dXMgY2hhbmdlcywgbGV0IGhpbSBkbyB0aGlzXG5cdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0c1NldHRpbmdzLmFuaW1hdGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUuc3dpdGNoQ2xhc3Mob2xkU3R5bGUsIG5ld1N0eWxlLCAyMDApIDpcblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnJlbW92ZUNsYXNzKG9sZFN0eWxlKS5hZGRDbGFzcyhuZXdTdHlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3R5bGUgPSBuZXdTdHlsZTtcblx0XHRcdFx0XHRcdFx0fSkoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0eWxlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9laXRoZXIgc2V0IG9yIHJldHJpZXZlXG5cdFx0XHRcdFx0Zm4uc3RhdHVzID0gZnVuY3Rpb24oKSB7XG5cdFxuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0YXR1cyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IFxuXHRcdFx0XHRcdFx0XHRmbi5zdHlsZShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly91c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gdG8gY29udmllbmlldGx5IGdldCBzaG9ydGN1dCB2YXJpYWJsZXNcblx0XHRcdFx0XHQoZnVuY3Rpb24oc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQpIHtcblx0XHRcdFx0XHRcdC8vYXR0YWNoIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdFx0XHQkLmVhY2goWydjbGljaycsICdmb2N1cycsICdibHVyJ10sIGZ1bmN0aW9uKGluZGV4LCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vd2Ugd2FudCB0byBiZSBhYmxlIHRvIGNhbGwgdGhlIGZ1bmN0aW9ucyBmb3IgZWFjaCBzZWF0IG9iamVjdFxuXHRcdFx0XHRcdFx0XHRmbltjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT0gJ2ZvY3VzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGFscmVhZHkgYSBmb2N1c2VkIGVsZW1lbnQsIHdlIGhhdmUgdG8gcmVtb3ZlIGZvY3VzIGZyb20gaXQgZmlyc3Rcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBzZWF0LnNldHRpbmdzLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNlYXQubm9kZSgpLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgY2FuIHBhc3MgaGlzIG93biBjYWxsYmFjayBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBmaXJzdCBjaGVjayBpZiBpdCBleGlzdHNcblx0XHRcdFx0XHRcdFx0XHQgKiBhbmQgaWYgbm90LCB1c2Ugb3VyIGRlZmF1bHQgY2FsbGJhY2suXG5cdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHQgKiBFYWNoIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IHNlYXQgY29udGV4dC5cblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc3R5bGUodHlwZW9mIHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10uYXBwbHkoc2VhdCkgOiBzZWF0Q2hhcnRzU2V0dGluZ3NbY2FsbGJhY2tdLmFwcGx5KHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL3RoZSBiZWxvdyB3aWxsIGJlY29tZSBzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCB0aGFua3MgdG8gdGhlIGltbWVkaWF0ZSBmdW5jdGlvblx0XHRcblx0XHRcdFx0XHR9KShzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHMsIGZuLnNldHRpbmdzLmNoYXJhY3RlciwgZm4pO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlKClcblx0XHRcdFx0XHRcdC8vdGhlIGZpcnN0IHRocmVlIG1vdXNlIGV2ZW50cyBhcmUgc2ltcGxlXG5cdFx0XHRcdFx0XHQub24oJ2NsaWNrJywgICAgICBmbi5jbGljaylcblx0XHRcdFx0XHRcdC5vbignbW91c2VlbnRlcicsIGZuLmZvY3VzKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlJywgZm4uYmx1cilcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly9rZXlkb3duIHJlcXVpcmVzIHF1aXRlIGEgbG90IG9mIGxvZ2ljLCBiZWNhdXNlIHdlIGhhdmUgdG8ga25vdyB3aGVyZSB0byBtb3ZlIHRoZSBmb2N1c1xuXHRcdFx0XHRcdFx0Lm9uKCdrZXlkb3duJywgICAgKGZ1bmN0aW9uKHNlYXQsICRzZWF0KSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZXZlcnl0aGluZyBkZXBlbmRzIG9uIHRoZSBwcmVzc2VkIGtleVxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoZS53aGljaCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9zcGFjZWJhciB3aWxsIGp1c3QgdHJpZ2dlciB0aGUgc2FtZSBldmVudCBtb3VzZSBjbGljayBkb2VzXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL1VQICYgRE9XTlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoaXMgaXMgYSByZWN1cnNpdmUsIGltbWVkaWF0ZSBmdW5jdGlvbiB3aGljaCBzZWFyY2hlcyBmb3IgdGhlIGZpcnN0IFwiZm9jdXNhYmxlXCIgcm93LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIGJlY2F1c2Ugd2Ugd2FudCBhIGNvbnZlbmllbnQgYWNjZXNzIHRvIHNvbWUgRE9NIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIHJlY3Vyc2lvbiBiZWNhdXNlIHNvbWV0aW1lcyB3ZSBtYXkgaGl0IGFuIGVtcHR5IHNwYWNlIHJhdGhlciB0aGFuIGEgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uIGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJGN1cnJlbnRSb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1Jvdztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2xldCdzIGRldGVybWluZSB3aGljaCByb3cgc2hvdWxkIHdlIG1vdmUgdG9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRyb3dzLmluZGV4KCRjdXJyZW50Um93KSAmJiBlLndoaWNoID09IDM4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCB1cCBhcnJvdywgbW92ZSB0byB0aGUgbGFzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkcm93cy5pbmRleCgkY3VycmVudFJvdykgPT0gJHJvd3MubGVuZ3RoLTEgJiYgZS53aGljaCA9PSA0MCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBsYXN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCBkb3duIGFycm93LCBtb3ZlIHRvIHRoZSBmaXJzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzaW5nIGVxIHRvIGdldCBhbiBlbGVtZW50IGF0IHRoZSBkZXNpcmVkIGluZGV4IHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZXEoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdXAgYXJyb3csIHRoZW4gZGVjcmVtZW50IHRoZSBpbmRleCwgaWYgZG93biBpbmNyZW1lbnQgaXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICsgKGUud2hpY2ggPT0gMzggPyAoLTEpIDogKCsxKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbm93IHRoYXQgd2Uga25vdyB0aGUgcm93LCBsZXQncyBnZXQgdGhlIHNlYXQgdXNpbmcgdGhlIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAkbmV3Um93LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKS5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZSBzZWF0IHdlIGZvdW5kIGlzIGEgc3BhY2UsIGtlZXAgbG9va2luZyBmdXJ0aGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRuZXdTZWF0Lmhhc0NsYXNzKCdzZWF0Q2hhcnRzLXNwYWNlJykgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkbmV3Um93KSA6ICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyIGFuZCB0aGVuIHNlbGVjdCBhbGwgcm93cyBidXQgdGhlIGhlYWRlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcicpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJvdyBhbmQgdGhlbiBmaW5kIGFsbCBzZWF0IGNlbGxzIChib3RoIHNlYXRzICYgc3BhY2VzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3dlIGNvdWxkbid0IGRldGVybWluZSB0aGUgbmV3IHNlYXQsIHNvIHdlIGJldHRlciBnaXZlIHVwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3JlbW92ZSBmb2N1cyBmcm9tIHRoZSBvbGQgc2VhdCBhbmQgcHV0IGl0IG9uIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdC8vTEVGVCAmIFJJR0hUXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGUgbG9naWMgaGVyZSBpcyBzbGlnaHRseSBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIGZvciB1cC9kb3duIGFycm93cy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVXNlciB3aWxsIGJlIGFibGUgdG8gYnJvd3NlIHRoZSB3aG9sZSBtYXAgdXNpbmcganVzdCBsZWZ0L3JpZ2h0IGFycm93LCBiZWNhdXNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIGl0IHdpbGwgbW92ZSB0byB0aGUgbmV4dCByb3cgd2hlbiB3ZSByZWFjaCB0aGUgcmlnaHQvbGVmdC1tb3N0IHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbigkc2VhdHMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkc2VhdHMuaW5kZXgoJHNlYXQpICYmIGUud2hpY2ggPT0gMzcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCBsZWZ0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGxlZnQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRzZWF0cy5pbmRleCgkc2VhdCkgPT0gJHNlYXRzLmxlbmd0aCAtMSAmJiBlLndoaWNoID09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgcmlnaHQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgcmlnaHQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vc2ltcGx5IG1vdmUgb25lIHNlYXQgbGVmdCBvciByaWdodCBkZXBlbmRpbmcgb24gdGhlIGtleVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpICsgKGUud2hpY2ggPT0gMzcgPyAoLTEpIDogKCsxKSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXI6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSknKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL2hhbmRsZSBmb2N1c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSkoZm4sIGZuLm5vZGUoKSkpO1xuXHRcdFx0XHRcdFx0Ly8uYXBwZW5kVG8oc2VhdENoYXJ0cy5maW5kKCcuJyArIHJvdykpO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pKGZuLCBzZXR0aW5ncyk7XG5cdFx0XHRcblx0XHRmbi5hZGRDbGFzcygnc2VhdENoYXJ0cy1jb250YWluZXInKTtcblx0XHRcblx0XHQvL3RydWUgLT4gZGVlcCBjb3B5IVxuXHRcdCQuZXh0ZW5kKHRydWUsIHNldHRpbmdzLCBzZXR1cCk7XHRcdFxuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCByb3cgaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLnJvd3MgPSBzZXR0aW5ncy5uYW1pbmcucm93cyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgcm93cyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm93cy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSkoc2V0dGluZ3MubWFwLmxlbmd0aCk7XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IGNvbHVtbiBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyA9IHNldHRpbmdzLm5hbWluZy5jb2x1bW5zIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5zID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb2x1bW5zLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY29sdW1ucztcblx0XHR9KShzZXR0aW5ncy5tYXBbMF0uc3BsaXQoJycpLmxlbmd0aCk7XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLm5hbWluZy50b3ApIHtcblx0XHRcdHZhciAkaGVhZGVyUm93ID0gJCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93IHNlYXRDaGFydHMtaGVhZGVyJyk7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZCgkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpXG5cdFx0XHRcdFx0XHQudGV4dCh2YWx1ZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHRmbi5hcHBlbmQoJGhlYWRlclJvdyk7XG5cdFx0XG5cdFx0Ly9kbyB0aGlzIGZvciBlYWNoIG1hcCByb3dcblx0XHQkLmVhY2goc2V0dGluZ3MubWFwLCBmdW5jdGlvbihyb3csIGNoYXJhY3RlcnMpIHtcblxuXHRcdFx0dmFyICRyb3cgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdycpO1xuXHRcdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkcm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcblx0XHRcdFx0XHRcdC50ZXh0KHNldHRpbmdzLm5hbWluZy5yb3dzW3Jvd10pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBEbyB0aGlzIGZvciBlYWNoIHNlYXQgKGxldHRlcilcblx0XHRcdCAqXG5cdFx0XHQgKiBOb3cgdXNlcnMgd2lsbCBiZSBhYmxlIHRvIHBhc3MgY3VzdG9tIElEIGFuZCBsYWJlbCB3aGljaCBvdmVyd3JpdGUgdGhlIG9uZSB0aGF0IHNlYXQgd291bGQgYmUgYXNzaWduZWQgYnkgZ2V0SWQgYW5kXG5cdFx0XHQgKiBnZXRMYWJlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE5ldyBmb3JtYXQgaXMgbGlrZSB0aGlzOlxuXHRcdFx0ICogYVtJRCxsYWJlbF1hW0lEXWFhYWFhXG5cdFx0XHQgKlxuXHRcdFx0ICogU28geW91IGNhbiBvdmVyd3JpdGUgdGhlIElEIG9yIGxhYmVsIChvciBib3RoKSBldmVuIGZvciBqdXN0IG9uZSBzZWF0LlxuXHRcdFx0ICogQmFzaWNhbGx5IElEIHNob3VsZCBiZSBmaXJzdCwgc28gaWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIGp1c3QgbGFiZWwgd3JpdGUgaXQgYXMgZm9sbG93czpcblx0XHRcdCAqIGFbLExBQkVMXVxuXHRcdFx0ICpcblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBJRHMgYXJlTCAwLTksIGEteiwgQS1aLCBfXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gbGFiZWxzIGFyZTogMC05LCBhLXosIEEtWiwgXywgJyAnIChzcGFjZSlcblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdCBcblx0XHRcdCQuZWFjaChjaGFyYWN0ZXJzLm1hdGNoKC9bYS16X117MX0oXFxbWzAtOWEtel9dezAsfSgsWzAtOWEtel8gXSspP1xcXSk/L2dpKSwgZnVuY3Rpb24gKGNvbHVtbiwgY2hhcmFjdGVyUGFyYW1zKSB7IFxuXHRcdFx0XHR2YXIgbWF0Y2hlcyAgICAgICAgID0gY2hhcmFjdGVyUGFyYW1zLm1hdGNoKC8oW2Etel9dezF9KShcXFsoWzAtOWEtel8gLF0rKVxcXSk/L2kpLFxuXHRcdFx0XHRcdC8vbm8gbWF0dGVyIGlmIHVzZXIgc3BlY2lmaWVzIFtdIHBhcmFtcywgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaW4gdGhlIHNlY29uZCBlbGVtZW50XG5cdFx0XHRcdFx0Y2hhcmFjdGVyICAgICAgID0gbWF0Y2hlc1sxXSxcblx0XHRcdFx0XHQvL2NoZWNrIGlmIHVzZXIgaGFzIHBhc3NlZCBzb21lIGFkZGl0aW9uYWwgcGFyYW1zIHRvIG92ZXJyaWRlIGlkIG9yIGxhYmVsXG5cdFx0XHRcdFx0cGFyYW1zICAgICAgICAgID0gdHlwZW9mIG1hdGNoZXNbM10gIT09ICd1bmRlZmluZWQnID8gbWF0Y2hlc1szXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Ly9pZCBwYXJhbSBzaG91bGQgYmUgZmlyc3Rcblx0XHRcdFx0XHRvdmVycmlkZUlkICAgICAgPSBwYXJhbXMubGVuZ3RoID8gcGFyYW1zWzBdIDogbnVsbCxcblx0XHRcdFx0XHQvL2xhYmVsIHBhcmFtIHNob3VsZCBiZSBzZWNvbmRcblx0XHRcdFx0XHRvdmVycmlkZUxhYmVsICAgPSBwYXJhbXMubGVuZ3RoID09PSAyID8gcGFyYW1zWzFdIDogbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0JHJvdy5hcHBlbmQoY2hhcmFjdGVyICE9ICdfJyA/XG5cdFx0XHRcdFx0Ly9pZiB0aGUgY2hhcmFjdGVyIGlzIG5vdCBhbiB1bmRlcnNjb3JlIChlbXB0eSBzcGFjZSlcblx0XHRcdFx0XHQoZnVuY3Rpb24obmFtaW5nKSB7XG5cdFxuXHRcdFx0XHRcdFx0Ly9zbyB1c2VycyBkb24ndCBoYXZlIHRvIHNwZWNpZnkgZW1wdHkgb2JqZWN0c1xuXHRcdFx0XHRcdFx0c2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA9IGNoYXJhY3RlciBpbiBzZXR0aW5ncy5zZWF0cyA/IHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gOiB7fTtcblx0XG5cdFx0XHRcdFx0XHR2YXIgaWQgPSBvdmVycmlkZUlkID8gb3ZlcnJpZGVJZCA6IG5hbWluZy5nZXRJZChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pO1xuXHRcdFx0XHRcdFx0c2VhdHNbaWRdID0gbmV3IHNlYXQoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgOiBpZCxcblx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogb3ZlcnJpZGVMYWJlbCA/XG5cdFx0XHRcdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCA6IG5hbWluZy5nZXRMYWJlbChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pLFxuXHRcdFx0XHRcdFx0XHRyb3cgICAgICAgOiByb3csXG5cdFx0XHRcdFx0XHRcdGNvbHVtbiAgICA6IGNvbHVtbixcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyIDogY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0c2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0c1tpZF0ubm9kZSgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fSkoc2V0dGluZ3MubmFtaW5nKSA6XG5cdFx0XHRcdFx0Ly90aGlzIGlzIGp1c3QgYW4gZW1wdHkgc3BhY2UgKF8pXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVx0XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Zm4uYXBwZW5kKCRyb3cpO1xuXHRcdH0pO1xuXHRcblx0XHQvL2lmIHRoZXJlJ3JlIGFueSBsZWdlbmQgaXRlbXMgdG8gYmUgcmVuZGVyZWRcblx0XHRzZXR0aW5ncy5sZWdlbmQuaXRlbXMubGVuZ3RoID8gKGZ1bmN0aW9uKGxlZ2VuZCkge1xuXHRcdFx0Ly9laXRoZXIgdXNlIHVzZXItZGVmaW5lZCBjb250YWluZXIgb3IgY3JlYXRlIG91ciBvd24gYW5kIGluc2VydCBpdCByaWdodCBhZnRlciB0aGUgc2VhdCBjaGFydCBkaXZcblx0XHRcdHZhciAkY29udGFpbmVyID0gKGxlZ2VuZC5ub2RlIHx8ICQoJzxkaXY+PC9kaXY+JykuaW5zZXJ0QWZ0ZXIoZm4pKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kJyk7XG5cdFx0XHRcdFxuXHRcdFx0dmFyICR1bCA9ICQoJzx1bD48L3VsPicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRMaXN0Jylcblx0XHRcdFx0LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXHRcdFx0XG5cdFx0XHQkLmVhY2gobGVnZW5kLml0ZW1zLCBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kSXRlbScpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHRcdFx0Ly9tZXJnZSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIG91ciBzdGFuZGFyZCBvbmVzXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsIGl0ZW1bMV1dLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdHNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dID09IFwidW5kZWZpbmVkXCIgPyBbXSA6IHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dLmNsYXNzZXMpLmpvaW4oJyAnKVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxzcGFuPjwvc3Bhbj4nKVxuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmREZXNjcmlwdGlvbicpXG5cdFx0XHRcdFx0XHRcdFx0LnRleHQoaXRlbVsyXSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gJGNvbnRhaW5lcjtcblx0XHR9KShzZXR0aW5ncy5sZWdlbmQpIDogbnVsbDtcblx0XG5cdFx0Zm4uYXR0cih7XG5cdFx0XHR0YWJJbmRleCA6IDBcblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHQvL3doZW4gY29udGFpbmVyJ3MgZm9jdXNlZCwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3Qgc2VhdFxuXHRcdGZuLmZvY3VzKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpKSB7XG5cdFx0XHRcdHNlYXRzW2ZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0Zm4uZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpOmZpcnN0JykuZm9jdXMoKTtcblx0XHRcdHNlYXRzW3NlYXRJZHNbMF1dLmZvY3VzKCk7XG5cblx0XHR9KTtcblx0XG5cdFx0Ly9wdWJsaWMgbWV0aG9kcyBvZiBzZWF0Q2hhcnRzXG5cdFx0Zm4uZGF0YSgnc2VhdENoYXJ0cycsIHtcblx0XHRcdHNlYXRzICAgOiBzZWF0cyxcblx0XHRcdHNlYXRJZHMgOiBzZWF0SWRzLFxuXHRcdFx0Ly9zZXQgZm9yIG9uZSwgc2V0IGZvciBtYW55LCBnZXQgZm9yIG9uZVxuXHRcdFx0c3RhdHVzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gZm4uc2VhdHNbYXJndW1lbnRzWzBdXS5zdGF0dXMoKSA6IChmdW5jdGlvbihzZWF0c0lkcywgbmV3U3RhdHVzKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBmbi5zZWF0c1tzZWF0c0lkc10uc3RhdHVzKG5ld1N0YXR1cykgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdElkXS5zdGF0dXMobmV3U3RhdHVzKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH0pKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHRcdH0sXG5cdFx0XHRlYWNoICA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgc2VhdElkIGluIGZuLnNlYXRzKSB7XG5cdFx0XHRcdFx0aWYgKGZhbHNlID09PSBjYWxsYmFjay5jYWxsKGZuLnNlYXRzW3NlYXRJZF0sIHNlYXRJZCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0SWQ7Ly9yZXR1cm4gbGFzdCBjaGVja2VkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdC8vYmFzaWNhbGx5IGNyZWF0ZSBhIENTUyBxdWVyeSB0byBnZXQgYWxsIHNlYXRzIGJ5IHRoZWlyIERPTSBpZHNcblx0XHRcdFx0cmV0dXJuICQoJyMnICsgZm4uc2VhdElkcy5qb2luKCcsIycpKTtcblx0XHRcdH0sXG5cblx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbihxdWVyeSkgey8vRCwgYS5hdmFpbGFibGUsIHVuYXZhaWxhYmxlXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFxuXHRcdFx0XHQvL2lzIFJlZ0V4cFxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQubWF0Y2gocXVlcnkpKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2goaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgIChxdWVyeS5sZW5ndGggPT0gMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgc2VhcmNoZXMganVzdCBmb3IgYSBwYXJ0aWN1YWwgY2hhcmFjdGVyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShxdWVyeSkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHJ1bnMgYSBtb3JlIHNvcGhpc3RpY2F0ZWQgcXVlcnksIHNvIGxldCdzIHNlZSBpZiB0aGVyZSdzIGEgZG90XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkuaW5kZXhPZignLicpID4gLTEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlcmUncyBhIGRvdCB3aGljaCBzZXBhcmF0ZXMgY2hhcmFjdGVyIGFuZCB0aGUgc3RhdHVzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHF1ZXJ5LnNwbGl0KCcuJyk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKHNlYXRJZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IHBhcnRzWzBdICYmIHRoaXMuc3RhdHVzKCkgPT0gcGFydHNbMV0pIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IHF1ZXJ5KSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0c2V0ICAgICAgICA6IGZ1bmN0aW9uIHNldCgpIHsvL2luaGVyaXRzIHNvbWUgbWV0aG9kc1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzZWF0cyAgICAgIDogW10sXG5cdFx0XHRcdFx0c2VhdElkcyAgICA6IFtdLFxuXHRcdFx0XHRcdGxlbmd0aCAgICAgOiAwLFxuXHRcdFx0XHRcdHN0YXR1cyAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHR0aGF0ID0gdGhpcztcblx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBqdXN0IG9uZSBzZWF0IGluIHRoZSBzZXQgYW5kIHVzZXIgZGlkbid0IHBhc3MgYW55IHBhcmFtcywgcmV0dXJuIGN1cnJlbnQgc3RhdHVzXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sZW5ndGggPT0gMSAmJiBhcmdzLmxlbmd0aCA9PSAwID8gdGhpcy5zZWF0c1swXS5zdGF0dXMoKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Ly9vdGhlcndpc2UgY2FsbCBzdGF0dXMgZnVuY3Rpb24gZm9yIGVhY2ggb2YgdGhlIHNlYXRzIGluIHRoZSBzZXRcblx0XHRcdFx0XHRcdFx0JC5lYWNoKHRoYXQuc2VhdHMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdHVzLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4ubm9kZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZWFjaCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmVhY2guY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0ICAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmdldC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZmluZC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZXQuY2FsbChmbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwdXNoICAgICAgIDogZnVuY3Rpb24oaWQsIHNlYXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdHMucHVzaChzZWF0KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdCsrdGhpcy5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdC8vZ2V0IG9uZSBvYmplY3Qgb3IgYSBzZXQgb2Ygb2JqZWN0c1xuXHRcdFx0Z2V0ICAgOiBmdW5jdGlvbihzZWF0c0lkcykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXG5cdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBcblx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0c0lkc10gOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZuLnNlYXRzW3NlYXRJZF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VhdFNldC5wdXNoKHNlYXRJZCwgZm4uc2VhdHNbc2VhdElkXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdFNldDtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBmbi5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdH1cblx0XG5cdFxufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=