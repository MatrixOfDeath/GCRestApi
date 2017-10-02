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

// Ajout d'un produit au panier ajax
$(document).on('click', '.buttonAddProductPanier', function () {
    $.ajax({
        url: Routing.generate('ajax_ajout_produit_panier'),
        type: "POST",
        data: {
            "id": $(this).val()
        },
        async: true,
        success: function success(responsePanier) {
            // Rafraichissement du panier ajax
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
                }
            });
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
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

// Lorsqu'on clique sur la bouton Produit #2
$(document).on('click', '#tab-link-produit', function () {

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

// Lorsqu'on clique sur la bouton Salle #1
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

// Ajout d'une salle en ajax au click du bouton Choisir Salle
$(document).on('click', 'button.btn-success.buttonAddSalle', function () {

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    // var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
    // var dateDuJour = arrTime[2];
    var idSalle = $(this).val();
    var date = $('#datepicker-altFormat').val();
    console.log('date altFormat' + date);

    // if(dateDuJour.length){
    //     date = dateDuJour;
    // }

    //console.log(idSalle + 'idsalle');
    // $('#slider-range .heureActuelleDefaut').val("");
    that = $(this);

    $('#display-salle').append().load('/assets/loader.html').fadeIn();
    $('#tab-link-produit').parent().tab('show');

    // 1- On vérifie la disponbilité de la salle
    $.ajax({
        url: Routing.generate('salles_disponible_ajax'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00',
            "idSalle": idSalle,
            "date": date
        },
        success: function success(isDispo, textStatus) {
            if (isDispo = '1') {
                //2- On ajoute la salle choisi dans session du panier
                $.ajax({
                    url: Routing.generate('ajout_panier_salle'),
                    type: "POST",
                    data: {
                        "heureChoixDebut": date + ' ' + choixDebut + ':00',
                        "heureChoixFin": date + ' ' + choixFin + ':00',
                        "id": idSalle,
                        "date": date
                    },
                    async: true,
                    success: function success(response, textStatus) {
                        // TODO:à mettre en parallèle ?
                        // 3- On mets à jour le panier ajax
                        $.ajax({
                            url: Routing.generate('panier_ajax'),
                            type: "POST",
                            async: true,
                            success: function success(responsePanier, textStatus) {
                                if (isDispo = '1') {
                                    $('.row.panier-menu').empty().append(responsePanier);

                                    // 4- On charge la vue des produits ajax
                                    $.ajax({
                                        url: Routing.generate('produits_ajax'),
                                        type: "GET",
                                        async: true,
                                        success: function success(responseProduits, textStatus) {
                                            $('#display-salle').empty().append(responseProduits);
                                            $('.reservation-select-creneau').hide();
                                            $('.recherche-horaire').hide();
                                        },
                                        // 4-
                                        error: function error(data) {
                                            console.log(data);
                                            alert('Problème récupération des produtis');
                                        }
                                    });
                                } else {
                                    alert('La salle n\'est plus disponible');
                                }
                            },
                            // 3-
                            error: function error(data) {
                                console.log(data);
                                alert('Problème ajout de la salle choisi');
                            }
                        });
                    },
                    // 2-
                    error: function error(data) {
                        console.log(data);
                        alert('Problème ajout salle');
                        //$("body").css({"opacity": "1", "background-color":"#fff"});
                    }
                });
            }
        },
        // 1-
        error: function error(data) {
            alert('Problème lors de la vérification de la disponibilité de la salle n°' + idSalle);
        }
    });

    return false;
});

$(document).on('slidestop', '#slider-range', function (event, ui) {
    console.log('iiiin');
    ajaxRechercheSalles();
});

function ajaxRechercheSalles() {
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();
    // var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
    // var dateDuJour = arrTime[2];
    // if (!date && !dateDuJour){
    //     date = dateDuJour;
    // }
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
}

/***/ }),

/***/ "./web/assets/js/ajax/ajaxPanier.js":
/*!******************************************!*\
  !*** ./web/assets/js/ajax/ajaxPanier.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// Suppression d'une salle depuis le Produit Ajax
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
// Suppression d'une salle depuis le Panier Ajax
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

// Modification live ajax de la quantité pour un produit
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDViYmJiZWU3OWFiMTNmYmU0YTQiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50Iiwib24iLCJhamF4IiwidXJsIiwiUm91dGluZyIsImdlbmVyYXRlIiwidHlwZSIsImRhdGEiLCJ2YWwiLCJhc3luYyIsInN1Y2Nlc3MiLCJyZXNwb25zZVBhbmllciIsInRleHRTdGF0dXMiLCJlbXB0eSIsImFwcGVuZCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwidGhhdCIsImxvYWQiLCJmYWRlSW4iLCJyZXNwb25zZVByb2R1aXRzIiwiaGlkZSIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwicmVzcG9uc2UiLCJzaG93IiwiaWRTYWxsZSIsImlzRGlzcG8iLCJldmVudCIsInVpIiwiYWpheFJlY2hlcmNoZVNhbGxlcyIsImZpbmQiLCJ2YWx1ZSIsInJlZnJlc2hQYW5pZXIiLCJmaXJzdFNlYXRMYWJlbCIsInJlYWR5IiwibGVuZ3RoIiwiaW5pdENhcnRlSW50ZXJhY3RpdmUiLCIkY2FydCIsIiRjb3VudGVyIiwiJHRvdGFsIiwic2MiLCJzZWF0Q2hhcnRzIiwibWFwIiwic2VhdHMiLCJmIiwicHJpY2UiLCJjbGFzc2VzIiwiY2F0ZWdvcnkiLCJlIiwibmFtaW5nIiwidG9wIiwiZ2V0TGFiZWwiLCJjaGFyYWN0ZXIiLCJyb3ciLCJjb2x1bW4iLCJsZWdlbmQiLCJub2RlIiwiaXRlbXMiLCJjbGljayIsInN0YXR1cyIsInNldHRpbmdzIiwibGFiZWwiLCJhdHRyIiwiaWQiLCJhcHBlbmRUbyIsInJlY2FsY3VsYXRlVG90YWwiLCJyZW1vdmUiLCJzdHlsZSIsImdldCIsInBhcmVudHMiLCJ0b3RhbCIsImVhY2giLCJmbiIsInNldHVwIiwic2VhdElkcyIsImFuaW1hdGUiLCJsZWZ0IiwiZ2V0SWQiLCJmb2N1cyIsImJsdXIiLCJzZWF0Iiwic2VhdENoYXJ0c1NldHRpbmdzIiwiZXh0ZW5kIiwiJG5vZGUiLCJyb2xlIiwiZm9jdXNhYmxlIiwidGFiSW5kZXgiLCJhZGRDbGFzcyIsImNvbmNhdCIsImpvaW4iLCJjaGFyIiwiYXJndW1lbnRzIiwibmV3U3R5bGUiLCJvbGRTdHlsZSIsInN3aXRjaENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZWF0U2V0dGluZ3MiLCJpbmRleCIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiYXBwbHkiLCIkc2VhdCIsIiRuZXdTZWF0Iiwid2hpY2giLCJwcmV2ZW50RGVmYXVsdCIsImZpbmRBdmFpbGFibGUiLCIkcm93cyIsIiRzZWF0cyIsIiRjdXJyZW50Um93IiwiJG5ld1JvdyIsImxhc3QiLCJmaXJzdCIsImVxIiwiaGFzQ2xhc3MiLCJyb3dzIiwiaSIsInB1c2giLCJjb2x1bW5zIiwic3BsaXQiLCIkaGVhZGVyUm93IiwiY2hhcmFjdGVycyIsIiRyb3ciLCJtYXRjaCIsImNoYXJhY3RlclBhcmFtcyIsIm1hdGNoZXMiLCJwYXJhbXMiLCJvdmVycmlkZUlkIiwib3ZlcnJpZGVMYWJlbCIsIiRjb250YWluZXIiLCJpbnNlcnRBZnRlciIsIiR1bCIsIml0ZW0iLCJzZWF0c0lkcyIsIm5ld1N0YXR1cyIsInNlYXRJZCIsImNhbGwiLCJxdWVyeSIsInNlYXRTZXQiLCJzZXQiLCJSZWdFeHAiLCJpbmRleE9mIiwicGFydHMiLCJhcmdzIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3REk7QUFDQUEsRUFBRUMsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3Qix5QkFBeEIsRUFBbUQsWUFBVTtBQUN6REYsTUFBRUcsSUFBRixDQUFPO0FBQ0hDLGFBQUtDLFFBQVFDLFFBQVIsQ0FBaUIsMkJBQWpCLENBREY7QUFFSEMsY0FBTSxNQUZIO0FBR0hDLGNBQU07QUFDRixrQkFBTVIsRUFBRSxJQUFGLEVBQVFTLEdBQVI7QUFESixTQUhIO0FBTUhDLGVBQU8sSUFOSjtBQU9IQyxpQkFBUyxpQkFBVUMsY0FBVixFQUEwQjtBQUMvQjtBQUNBWixjQUFFRyxJQUFGLENBQU87QUFDSEMscUJBQUtDLFFBQVFDLFFBQVIsQ0FBaUIsYUFBakIsQ0FERjtBQUVIQyxzQkFBTSxNQUZIO0FBR0hHLHVCQUFPLElBSEo7QUFJSEMseUJBQVMsaUJBQVVDLGNBQVYsRUFBMEJDLFVBQTFCLEVBQXNDO0FBQzNDYixzQkFBRSxrQkFBRixFQUFzQmMsS0FBdEIsR0FBOEJDLE1BQTlCLENBQXFD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QUFDeEMsVUFBSSxRQUFPOUQsR0FBRzdCLEtBQUgsQ0FBUzJGLE1BQVQsQ0FBUCxNQUE0QixRQUFoQyxFQUEwQztBQUN6Q0csZUFBUXJCLElBQVIsQ0FBYWtCLE1BQWIsRUFBcUI5RCxHQUFHN0IsS0FBSCxDQUFTMkYsTUFBVCxDQUFyQjtBQUNBO0FBQ0QsTUFKRDs7QUFNQSxZQUFPRyxPQUFQO0FBQ0EsS0FYb0IsRUFEdEI7QUFhQTtBQS9Jb0IsR0FBdEI7O0FBa0pBLFNBQU9qRSxHQUFHeEUsSUFBSCxDQUFRLFlBQVIsQ0FBUDtBQUNBLEVBbm1CRDtBQXNtQkEsQ0ExbUJELEVBMG1CRytJLE1BMW1CSCxFIiwiZmlsZSI6ImFqYXguMDM4NjAyM2FjZmQzMmQ5NDQzMmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDViYmJiZWU3OWFiMTNmYmU0YTQiLCIgICAgLy8gQWpvdXQgZCd1biBwcm9kdWl0IGF1IHBhbmllciBhamF4XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25BZGRQcm9kdWN0UGFuaWVyJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9ham91dF9wcm9kdWl0X3BhbmllcicpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBSYWZyYWljaGlzc2VtZW50IGR1IHBhbmllciBhamF4XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4QWpvdXRQcm9kdWl0UGFuaWVyLmpzIiwiLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIFByb2R1aXQgIzJcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstcHJvZHVpdCcsIGZ1bmN0aW9uKCl7XG5cbiAgICAvLyB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICAvLyB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIC8vIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIC8vIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpO1xuICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIFNhbGxlICMxXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXNhbGxlJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLnNob3coKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoYW5nZVR1bm5lbEFjaGF0LmpzIiwiJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5idXR0b25TZWFyY2gnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZScpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwiLy8gQWpvdXQgZCd1bmUgc2FsbGUgZW4gYWpheCBhdSBjbGljayBkdSBib3V0b24gQ2hvaXNpciBTYWxsZVxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5idG4tc3VjY2Vzcy5idXR0b25BZGRTYWxsZScsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIC8vIHZhciBhcnJUaW1lID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgLy8gdmFyIGRhdGVEdUpvdXIgPSBhcnJUaW1lWzJdO1xuICAgIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICBjb25zb2xlLmxvZygnZGF0ZSBhbHRGb3JtYXQnICsgZGF0ZSk7XG5cblxuICAgIC8vIGlmKGRhdGVEdUpvdXIubGVuZ3RoKXtcbiAgICAvLyAgICAgZGF0ZSA9IGRhdGVEdUpvdXI7XG4gICAgLy8gfVxuXG4gICAgLy9jb25zb2xlLmxvZyhpZFNhbGxlICsgJ2lkc2FsbGUnKTtcbiAgIC8vICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcbiAgICAkKCcjdGFiLWxpbmstcHJvZHVpdCcpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgLy8gMS0gT24gdsOpcmlmaWUgbGEgZGlzcG9uYmlsaXTDqSBkZSBsYSBzYWxsZVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGVfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICBcImlkU2FsbGVcIiA6IGlkU2FsbGUsXG4gICAgICAgICAgICBcImRhdGVcIjogZGF0ZVxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoaXNEaXNwbywgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaXNEaXNwbyA9ICcxJykge1xuICAgICAgICAgICAgICAgIC8vMi0gT24gYWpvdXRlIGxhIHNhbGxlIGNob2lzaSBkYW5zIHNlc3Npb24gZHUgcGFuaWVyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdham91dF9wYW5pZXJfc2FsbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBkYXRlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86w6AgbWV0dHJlIGVuIHBhcmFsbMOobGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy0gT24gbWV0cyDDoCBqb3VyIGxlIHBhbmllciBhamF4XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc0Rpc3BvID0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LSBPbiBjaGFyZ2UgbGEgdnVlIGRlcyBwcm9kdWl0cyBhamF4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncHJvZHVpdHNfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUHJvZHVpdHMsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdMYSBzYWxsZSBuXFwnZXN0IHBsdXMgZGlzcG9uaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IGRlIGxhIHNhbGxlIGNob2lzaScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIDItXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgc2FsbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIC8vIDEtXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgbG9ycyBkZSBsYSB2w6lyaWZpY2F0aW9uIGRlIGxhIGRpc3BvbmliaWxpdMOpIGRlIGxhIHNhbGxlIG7CsCcrIGlkU2FsbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc2xpZGVzdG9wJywgJyNzbGlkZXItcmFuZ2UnICwgZnVuY3Rpb24oZXZlbnQsIHVpKXtcbiAgICBjb25zb2xlLmxvZygnaWlpaW4nKTtcbiAgICBhamF4UmVjaGVyY2hlU2FsbGVzKCk7XG59KTtcblxuXG5mdW5jdGlvbiBhamF4UmVjaGVyY2hlU2FsbGVzKCl7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAvLyB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIC8vIHZhciBkYXRlRHVKb3VyID0gYXJyVGltZVsyXTtcbiAgICAvLyBpZiAoIWRhdGUgJiYgIWRhdGVEdUpvdXIpe1xuICAgIC8vICAgICBkYXRlID0gZGF0ZUR1Sm91cjtcbiAgICAvLyB9XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwiICAgIC8vIFN1cHByZXNzaW9uIGQndW5lIHNhbGxlIGRlcHVpcyBsZSBQcm9kdWl0IEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBTdXBwcmVzc2lvbiBkJ3VuZSBzYWxsZSBkZXB1aXMgbGUgUGFuaWVyIEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVNhbGxlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyX3NhbGxlJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkc2FsbGVcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIE1vZGlmaWNhdGlvbiBsaXZlIGFqYXggZGUgbGEgcXVhbnRpdMOpIHBvdXIgdW4gcHJvZHVpdFxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnc2VsZWN0LnNlbGVjdC1xdGUtcHJvZHVpdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBhbGVydCggdGhpcy52YWx1ZSArICdpZHByb2R1aXQnKyAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5idXR0b25EZWxldGVQcm9kdWl0JykudmFsKCkgKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2Fqb3V0X3Byb2R1aXRfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnKS52YWwoKSxcbiAgICAgICAgICAgICAgICBcInF0ZVwiOiB0aGlzLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcblxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllcigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhQYW5pZXIuanMiLCJ2YXIgZmlyc3RTZWF0TGFiZWwgPSAxO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuICAgIGlmKCQoJyNzZWF0LW1hcCcpLmxlbmd0aCAmJiAgJCgnI3NlbGVjdGVkLXNlYXRzJykubGVuZ3RoKXtcbiAgICAgICAgaW5pdENhcnRlSW50ZXJhY3RpdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0Q2FydGVJbnRlcmFjdGl2ZSgpe1xuICAgICAgICB2YXIgJGNhcnQgPSAkKCcjc2VsZWN0ZWQtc2VhdHMnKSxcbiAgICAgICAgICAgICRjb3VudGVyID0gJCgnI2NvdW50ZXInKSxcbiAgICAgICAgICAgICR0b3RhbCA9ICQoJyN0b3RhbCcpLFxuICAgICAgICAgICAgc2MgPSAkKCcjc2VhdC1tYXAnKS5zZWF0Q2hhcnRzKHtcbiAgICAgICAgICAgICAgICBtYXA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2ZmX2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZmX2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX19fJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlZWVlJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNlYXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGY6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2ZpcnN0LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnRmlyc3QgQ2xhc3MnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2Vjb25vbXktY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdFY29ub215IENsYXNzJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hbWluZzoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdFNlYXRMYWJlbCsrO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6ICQoJyNsZWdlbmQnKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZicsICdhdmFpbGFibGUnLCAnRmlyc3QgQ2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZScsICdhdmFpbGFibGUnLCAnRWNvbm9teSBDbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ3VuYXZhaWxhYmxlJywgJ0FscmVhZHkgQm9va2VkJ11cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0J3MgY3JlYXRlIGEgbmV3IDxsaT4gd2hpY2ggd2UnbGwgYWRkIHRvIHRoZSBjYXJ0IGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8bGk+JyArIHRoaXMuZGF0YSgpLmNhdGVnb3J5ICsgJyBTZWF0ICMgJyArIHRoaXMuc2V0dGluZ3MubGFiZWwgKyAnOiA8Yj4kJyArIHRoaXMuZGF0YSgpLnByaWNlICsgJzwvYj4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhbmNlbC1jYXJ0LWl0ZW1cIj5bY2FuY2VsXTwvYT48L2xpPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnc2VhdElkJywgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNhcnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogTGV0cyB1cGRhdGUgdGhlIGNvdW50ZXIgYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogLmZpbmQgZnVuY3Rpb24gd2lsbCBub3QgZmluZCB0aGUgY3VycmVudCBzZWF0LCBiZWNhdXNlIGl0IHdpbGwgY2hhbmdlIGl0cyBzdGF1dHMgb25seSBhZnRlciByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqICdzZWxlY3RlZCcuIFRoaXMgaXMgd2h5IHdlIGhhdmUgdG8gYWRkIDEgdG8gdGhlIGxlbmd0aCBhbmQgdGhlIGN1cnJlbnQgc2VhdCBwcmljZSB0byB0aGUgdG90YWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpICsgdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgLSB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBpdGVtIGZyb20gb3VyIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gdmFjYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3VuYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIGFscmVhZHkgYm9va2VkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VuYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvL3RoaXMgd2lsbCBoYW5kbGUgXCJbY2FuY2VsXVwiIGxpbmsgY2xpY2tzXG4gICAgICAgICQoJyNzZWxlY3RlZC1zZWF0cycpLm9uKCdjbGljaycsICcuY2FuY2VsLWNhcnQtaXRlbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vbGV0J3MganVzdCB0cmlnZ2VyIENsaWNrIGV2ZW50IG9uIHRoZSBhcHByb3ByaWF0ZSBzZWF0LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlcGVhdCB0aGUgbG9naWMgaGVyZVxuICAgICAgICAgICAgc2MuZ2V0KCQodGhpcykucGFyZW50cygnbGk6Zmlyc3QnKS5kYXRhKCdzZWF0SWQnKSkuY2xpY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9sZXQncyBwcmV0ZW5kIHNvbWUgc2VhdHMgaGF2ZSBhbHJlYWR5IGJlZW4gYm9va2VkXG4gICAgICAgIHNjLmdldChbJzFfMicsICc0XzEnLCAnN18xJywgJzdfMiddKS5zdGF0dXMoJ3VuYXZhaWxhYmxlJyk7XG4gICAgfVxuXG59KTtcblxuZnVuY3Rpb24gcmVjYWxjdWxhdGVUb3RhbChzYykge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAvL2Jhc2ljYWxseSBmaW5kIGV2ZXJ5IHNlbGVjdGVkIHNlYXQgYW5kIHN1bSBpdHMgcHJpY2VcbiAgICBzYy5maW5kKCdzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0b3RhbCArPSB0aGlzLmRhdGEoKS5wcmljZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwiLyohXG4gKiBqUXVlcnktU2VhdC1DaGFydHMgdjEuMS41IC0+IHYyIChLYXJpbSBCT1VCUklUKVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGV1c3ptYXJrb3dza2kvalF1ZXJ5LVNlYXQtQ2hhcnRzXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIDIwMTYgTWF0ZXVzeiBNYXJrb3dza2lcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogVXBncmFkZSBieSBhdXRob3I6IEthcmltIEJPVUJSSVRcbiAqL1xuXG4oZnVuY3Rpb24oJCkge1xuXHRcdFxuXHQvLyd1c2Ugc3RyaWN0JztcdFxuXHRcdFxuXHQkLmZuLnNlYXRDaGFydHMgPSBmdW5jdGlvbiAoc2V0dXApIHtcblxuXHRcdC8vaWYgdGhlcmUncyBzZWF0Q2hhcnRzIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCwgcmV0dXJuIGl0XG5cdFx0aWYgKHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmbiAgICAgICA9IHRoaXMsXG5cdFx0XHRzZWF0cyAgICA9IHt9LFxuXHRcdFx0c2VhdElkcyAgPSBbXSxcblx0XHRcdGxlZ2VuZCxcblx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRhbmltYXRlIDogZmFsc2UsIC8vcmVxdWlyZXMgalF1ZXJ5IFVJXG5cdFx0XHRcdG5hbWluZyAgOiB7XG5cdFx0XHRcdFx0dG9wICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRsZWZ0ICAgOiB0cnVlLFxuXHRcdFx0XHRcdGdldElkICA6IGZ1bmN0aW9uKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiByb3cgKyAnXycgKyBjb2x1bW47XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRMYWJlbCA6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29sdW1uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVnZW5kIDoge1xuXHRcdFx0XHRcdG5vZGUgICA6IG51bGwsXG5cdFx0XHRcdFx0aXRlbXMgIDogW11cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpY2sgICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnc2VsZWN0ZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2F2YWlsYWJsZSc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb2N1cyAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2ZvY3VzZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSAge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJsdXIgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnN0YXR1cygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWF0cyAgIDoge31cblx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdC8vc2VhdCB3aWxsIGJlIGJhc2ljYWxseSBhIHNlYXQgb2JqZWN0IHdoaWNoIHdlJ2xsIHdoZW4gZ2VuZXJhdGluZyB0aGUgbWFwXG5cdFx0XHRzZWF0ID0gKGZ1bmN0aW9uKHNlYXRDaGFydHMsIHNlYXRDaGFydHNTZXR0aW5ncykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNldHVwKSB7XG5cdFx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0XHRcdHN0YXR1cyA6ICdhdmFpbGFibGUnLCAvL2F2YWlsYWJsZSwgdW5hdmFpbGFibGUsIHNlbGVjdGVkXG5cdFx0XHRcdFx0XHRzdHlsZSAgOiAnYXZhaWxhYmxlJyxcblx0XHRcdFx0XHRcdC8vbWFrZSBzdXJlIHRoZXJlJ3MgYW4gZW1wdHkgaGFzaCBpZiB1c2VyIGRvZXNuJ3QgcGFzcyBhbnl0aGluZ1xuXHRcdFx0XHRcdFx0ZGF0YSAgIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW3NldHVwLmNoYXJhY3Rlcl0gfHwge31cblx0XHRcdFx0XHRcdC8vYW55dGhpbmcgZ29lcyBoZXJlP1xuXHRcdFx0XHRcdH0sIHNldHVwKTtcblxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlID0gJCgnPGRpdj48L2Rpdj4nKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgICAgICA6IGZuLnNldHRpbmdzLmlkLFxuXHRcdFx0XHRcdFx0XHRyb2xlICAgICAgICAgICA6ICdjaGVja2JveCcsXG5cdFx0XHRcdFx0XHRcdCdhcmlhLWNoZWNrZWQnIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGZvY3VzYWJsZSAgICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dGFiSW5kZXggICAgICAgOiAtMSAvL21hbnVhbCBmb2N1c1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50ZXh0KGZuLnNldHRpbmdzLmxhYmVsKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsICdhdmFpbGFibGUnXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdC8vbGV0J3MgbWVyZ2UgY3VzdG9tIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggc3RhbmRhcmQgSlNDIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXSA9PSBcInVuZGVmaW5lZFwiID8gXG5cdFx0XHRcdFx0XHRcdFx0W10gOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXS5jbGFzc2VzXG5cdFx0XHRcdFx0XHRcdCkuam9pbignICcpKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2Jhc2ljYWxseSBhIHdyYXBwZXIgZnVuY3Rpb25cblx0XHRcdFx0XHRmbi5kYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuZGF0YTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLmNoYXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5jaGFyYWN0ZXI7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuJG5vZGU7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogQ2FuIGVpdGhlciBzZXQgb3IgcmV0dXJuIHN0YXR1cyBkZXBlbmRpbmcgb24gYXJndW1lbnRzLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgdGhlcmUncyBubyBhcmd1bWVudCwgaXQgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgc3R5bGUuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB5b3UgcGFzcyBhbiBhcmd1bWVudCwgaXQgd2lsbCB1cGRhdGUgc2VhdCdzIHN0eWxlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm4uc3R5bGUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/XG5cdFx0XHRcdFx0XHRcdChmdW5jdGlvbihuZXdTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvbGRTdHlsZSA9IGZuLnNldHRpbmdzLnN0eWxlO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiBub3RoaW5nIGNoYW5nZXMsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV3U3R5bGUgPT0gb2xkU3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvbGRTdHlsZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9mb2N1c2VkIGlzIGEgc3BlY2lhbCBzdHlsZSB3aGljaCBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIHN0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLnN0YXR1cyA9IG5ld1N0eWxlICE9ICdmb2N1c2VkJyA/IG5ld1N0eWxlIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0cignYXJpYS1jaGVja2VkJywgbmV3U3R5bGUgPT0gJ3NlbGVjdGVkJyk7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIHVzZXIgd2FudHMgdG8gYW5pbWF0ZSBzdGF0dXMgY2hhbmdlcywgbGV0IGhpbSBkbyB0aGlzXG5cdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0c1NldHRpbmdzLmFuaW1hdGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUuc3dpdGNoQ2xhc3Mob2xkU3R5bGUsIG5ld1N0eWxlLCAyMDApIDpcblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnJlbW92ZUNsYXNzKG9sZFN0eWxlKS5hZGRDbGFzcyhuZXdTdHlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3R5bGUgPSBuZXdTdHlsZTtcblx0XHRcdFx0XHRcdFx0fSkoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0eWxlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9laXRoZXIgc2V0IG9yIHJldHJpZXZlXG5cdFx0XHRcdFx0Zm4uc3RhdHVzID0gZnVuY3Rpb24oKSB7XG5cdFxuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0YXR1cyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IFxuXHRcdFx0XHRcdFx0XHRmbi5zdHlsZShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly91c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gdG8gY29udmllbmlldGx5IGdldCBzaG9ydGN1dCB2YXJpYWJsZXNcblx0XHRcdFx0XHQoZnVuY3Rpb24oc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQpIHtcblx0XHRcdFx0XHRcdC8vYXR0YWNoIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdFx0XHQkLmVhY2goWydjbGljaycsICdmb2N1cycsICdibHVyJ10sIGZ1bmN0aW9uKGluZGV4LCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vd2Ugd2FudCB0byBiZSBhYmxlIHRvIGNhbGwgdGhlIGZ1bmN0aW9ucyBmb3IgZWFjaCBzZWF0IG9iamVjdFxuXHRcdFx0XHRcdFx0XHRmbltjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT0gJ2ZvY3VzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGFscmVhZHkgYSBmb2N1c2VkIGVsZW1lbnQsIHdlIGhhdmUgdG8gcmVtb3ZlIGZvY3VzIGZyb20gaXQgZmlyc3Rcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBzZWF0LnNldHRpbmdzLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNlYXQubm9kZSgpLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgY2FuIHBhc3MgaGlzIG93biBjYWxsYmFjayBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBmaXJzdCBjaGVjayBpZiBpdCBleGlzdHNcblx0XHRcdFx0XHRcdFx0XHQgKiBhbmQgaWYgbm90LCB1c2Ugb3VyIGRlZmF1bHQgY2FsbGJhY2suXG5cdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHQgKiBFYWNoIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IHNlYXQgY29udGV4dC5cblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc3R5bGUodHlwZW9mIHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10uYXBwbHkoc2VhdCkgOiBzZWF0Q2hhcnRzU2V0dGluZ3NbY2FsbGJhY2tdLmFwcGx5KHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL3RoZSBiZWxvdyB3aWxsIGJlY29tZSBzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCB0aGFua3MgdG8gdGhlIGltbWVkaWF0ZSBmdW5jdGlvblx0XHRcblx0XHRcdFx0XHR9KShzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHMsIGZuLnNldHRpbmdzLmNoYXJhY3RlciwgZm4pO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlKClcblx0XHRcdFx0XHRcdC8vdGhlIGZpcnN0IHRocmVlIG1vdXNlIGV2ZW50cyBhcmUgc2ltcGxlXG5cdFx0XHRcdFx0XHQub24oJ2NsaWNrJywgICAgICBmbi5jbGljaylcblx0XHRcdFx0XHRcdC5vbignbW91c2VlbnRlcicsIGZuLmZvY3VzKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlJywgZm4uYmx1cilcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly9rZXlkb3duIHJlcXVpcmVzIHF1aXRlIGEgbG90IG9mIGxvZ2ljLCBiZWNhdXNlIHdlIGhhdmUgdG8ga25vdyB3aGVyZSB0byBtb3ZlIHRoZSBmb2N1c1xuXHRcdFx0XHRcdFx0Lm9uKCdrZXlkb3duJywgICAgKGZ1bmN0aW9uKHNlYXQsICRzZWF0KSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZXZlcnl0aGluZyBkZXBlbmRzIG9uIHRoZSBwcmVzc2VkIGtleVxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoZS53aGljaCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9zcGFjZWJhciB3aWxsIGp1c3QgdHJpZ2dlciB0aGUgc2FtZSBldmVudCBtb3VzZSBjbGljayBkb2VzXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL1VQICYgRE9XTlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoaXMgaXMgYSByZWN1cnNpdmUsIGltbWVkaWF0ZSBmdW5jdGlvbiB3aGljaCBzZWFyY2hlcyBmb3IgdGhlIGZpcnN0IFwiZm9jdXNhYmxlXCIgcm93LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIGJlY2F1c2Ugd2Ugd2FudCBhIGNvbnZlbmllbnQgYWNjZXNzIHRvIHNvbWUgRE9NIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIHJlY3Vyc2lvbiBiZWNhdXNlIHNvbWV0aW1lcyB3ZSBtYXkgaGl0IGFuIGVtcHR5IHNwYWNlIHJhdGhlciB0aGFuIGEgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uIGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJGN1cnJlbnRSb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1Jvdztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2xldCdzIGRldGVybWluZSB3aGljaCByb3cgc2hvdWxkIHdlIG1vdmUgdG9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRyb3dzLmluZGV4KCRjdXJyZW50Um93KSAmJiBlLndoaWNoID09IDM4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCB1cCBhcnJvdywgbW92ZSB0byB0aGUgbGFzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkcm93cy5pbmRleCgkY3VycmVudFJvdykgPT0gJHJvd3MubGVuZ3RoLTEgJiYgZS53aGljaCA9PSA0MCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBsYXN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCBkb3duIGFycm93LCBtb3ZlIHRvIHRoZSBmaXJzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzaW5nIGVxIHRvIGdldCBhbiBlbGVtZW50IGF0IHRoZSBkZXNpcmVkIGluZGV4IHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZXEoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdXAgYXJyb3csIHRoZW4gZGVjcmVtZW50IHRoZSBpbmRleCwgaWYgZG93biBpbmNyZW1lbnQgaXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICsgKGUud2hpY2ggPT0gMzggPyAoLTEpIDogKCsxKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbm93IHRoYXQgd2Uga25vdyB0aGUgcm93LCBsZXQncyBnZXQgdGhlIHNlYXQgdXNpbmcgdGhlIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAkbmV3Um93LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKS5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZSBzZWF0IHdlIGZvdW5kIGlzIGEgc3BhY2UsIGtlZXAgbG9va2luZyBmdXJ0aGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRuZXdTZWF0Lmhhc0NsYXNzKCdzZWF0Q2hhcnRzLXNwYWNlJykgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkbmV3Um93KSA6ICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyIGFuZCB0aGVuIHNlbGVjdCBhbGwgcm93cyBidXQgdGhlIGhlYWRlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcicpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJvdyBhbmQgdGhlbiBmaW5kIGFsbCBzZWF0IGNlbGxzIChib3RoIHNlYXRzICYgc3BhY2VzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3dlIGNvdWxkbid0IGRldGVybWluZSB0aGUgbmV3IHNlYXQsIHNvIHdlIGJldHRlciBnaXZlIHVwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3JlbW92ZSBmb2N1cyBmcm9tIHRoZSBvbGQgc2VhdCBhbmQgcHV0IGl0IG9uIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdC8vTEVGVCAmIFJJR0hUXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGUgbG9naWMgaGVyZSBpcyBzbGlnaHRseSBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIGZvciB1cC9kb3duIGFycm93cy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVXNlciB3aWxsIGJlIGFibGUgdG8gYnJvd3NlIHRoZSB3aG9sZSBtYXAgdXNpbmcganVzdCBsZWZ0L3JpZ2h0IGFycm93LCBiZWNhdXNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIGl0IHdpbGwgbW92ZSB0byB0aGUgbmV4dCByb3cgd2hlbiB3ZSByZWFjaCB0aGUgcmlnaHQvbGVmdC1tb3N0IHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbigkc2VhdHMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkc2VhdHMuaW5kZXgoJHNlYXQpICYmIGUud2hpY2ggPT0gMzcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCBsZWZ0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGxlZnQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRzZWF0cy5pbmRleCgkc2VhdCkgPT0gJHNlYXRzLmxlbmd0aCAtMSAmJiBlLndoaWNoID09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgcmlnaHQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgcmlnaHQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vc2ltcGx5IG1vdmUgb25lIHNlYXQgbGVmdCBvciByaWdodCBkZXBlbmRpbmcgb24gdGhlIGtleVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpICsgKGUud2hpY2ggPT0gMzcgPyAoLTEpIDogKCsxKSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXI6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSknKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL2hhbmRsZSBmb2N1c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSkoZm4sIGZuLm5vZGUoKSkpO1xuXHRcdFx0XHRcdFx0Ly8uYXBwZW5kVG8oc2VhdENoYXJ0cy5maW5kKCcuJyArIHJvdykpO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pKGZuLCBzZXR0aW5ncyk7XG5cdFx0XHRcblx0XHRmbi5hZGRDbGFzcygnc2VhdENoYXJ0cy1jb250YWluZXInKTtcblx0XHRcblx0XHQvL3RydWUgLT4gZGVlcCBjb3B5IVxuXHRcdCQuZXh0ZW5kKHRydWUsIHNldHRpbmdzLCBzZXR1cCk7XHRcdFxuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCByb3cgaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLnJvd3MgPSBzZXR0aW5ncy5uYW1pbmcucm93cyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgcm93cyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm93cy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSkoc2V0dGluZ3MubWFwLmxlbmd0aCk7XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IGNvbHVtbiBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyA9IHNldHRpbmdzLm5hbWluZy5jb2x1bW5zIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5zID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb2x1bW5zLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY29sdW1ucztcblx0XHR9KShzZXR0aW5ncy5tYXBbMF0uc3BsaXQoJycpLmxlbmd0aCk7XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLm5hbWluZy50b3ApIHtcblx0XHRcdHZhciAkaGVhZGVyUm93ID0gJCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93IHNlYXRDaGFydHMtaGVhZGVyJyk7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZCgkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpXG5cdFx0XHRcdFx0XHQudGV4dCh2YWx1ZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHRmbi5hcHBlbmQoJGhlYWRlclJvdyk7XG5cdFx0XG5cdFx0Ly9kbyB0aGlzIGZvciBlYWNoIG1hcCByb3dcblx0XHQkLmVhY2goc2V0dGluZ3MubWFwLCBmdW5jdGlvbihyb3csIGNoYXJhY3RlcnMpIHtcblxuXHRcdFx0dmFyICRyb3cgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdycpO1xuXHRcdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkcm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcblx0XHRcdFx0XHRcdC50ZXh0KHNldHRpbmdzLm5hbWluZy5yb3dzW3Jvd10pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBEbyB0aGlzIGZvciBlYWNoIHNlYXQgKGxldHRlcilcblx0XHRcdCAqXG5cdFx0XHQgKiBOb3cgdXNlcnMgd2lsbCBiZSBhYmxlIHRvIHBhc3MgY3VzdG9tIElEIGFuZCBsYWJlbCB3aGljaCBvdmVyd3JpdGUgdGhlIG9uZSB0aGF0IHNlYXQgd291bGQgYmUgYXNzaWduZWQgYnkgZ2V0SWQgYW5kXG5cdFx0XHQgKiBnZXRMYWJlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE5ldyBmb3JtYXQgaXMgbGlrZSB0aGlzOlxuXHRcdFx0ICogYVtJRCxsYWJlbF1hW0lEXWFhYWFhXG5cdFx0XHQgKlxuXHRcdFx0ICogU28geW91IGNhbiBvdmVyd3JpdGUgdGhlIElEIG9yIGxhYmVsIChvciBib3RoKSBldmVuIGZvciBqdXN0IG9uZSBzZWF0LlxuXHRcdFx0ICogQmFzaWNhbGx5IElEIHNob3VsZCBiZSBmaXJzdCwgc28gaWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIGp1c3QgbGFiZWwgd3JpdGUgaXQgYXMgZm9sbG93czpcblx0XHRcdCAqIGFbLExBQkVMXVxuXHRcdFx0ICpcblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBJRHMgYXJlTCAwLTksIGEteiwgQS1aLCBfXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gbGFiZWxzIGFyZTogMC05LCBhLXosIEEtWiwgXywgJyAnIChzcGFjZSlcblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdCBcblx0XHRcdCQuZWFjaChjaGFyYWN0ZXJzLm1hdGNoKC9bYS16X117MX0oXFxbWzAtOWEtel9dezAsfSgsWzAtOWEtel8gXSspP1xcXSk/L2dpKSwgZnVuY3Rpb24gKGNvbHVtbiwgY2hhcmFjdGVyUGFyYW1zKSB7IFxuXHRcdFx0XHR2YXIgbWF0Y2hlcyAgICAgICAgID0gY2hhcmFjdGVyUGFyYW1zLm1hdGNoKC8oW2Etel9dezF9KShcXFsoWzAtOWEtel8gLF0rKVxcXSk/L2kpLFxuXHRcdFx0XHRcdC8vbm8gbWF0dGVyIGlmIHVzZXIgc3BlY2lmaWVzIFtdIHBhcmFtcywgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaW4gdGhlIHNlY29uZCBlbGVtZW50XG5cdFx0XHRcdFx0Y2hhcmFjdGVyICAgICAgID0gbWF0Y2hlc1sxXSxcblx0XHRcdFx0XHQvL2NoZWNrIGlmIHVzZXIgaGFzIHBhc3NlZCBzb21lIGFkZGl0aW9uYWwgcGFyYW1zIHRvIG92ZXJyaWRlIGlkIG9yIGxhYmVsXG5cdFx0XHRcdFx0cGFyYW1zICAgICAgICAgID0gdHlwZW9mIG1hdGNoZXNbM10gIT09ICd1bmRlZmluZWQnID8gbWF0Y2hlc1szXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Ly9pZCBwYXJhbSBzaG91bGQgYmUgZmlyc3Rcblx0XHRcdFx0XHRvdmVycmlkZUlkICAgICAgPSBwYXJhbXMubGVuZ3RoID8gcGFyYW1zWzBdIDogbnVsbCxcblx0XHRcdFx0XHQvL2xhYmVsIHBhcmFtIHNob3VsZCBiZSBzZWNvbmRcblx0XHRcdFx0XHRvdmVycmlkZUxhYmVsICAgPSBwYXJhbXMubGVuZ3RoID09PSAyID8gcGFyYW1zWzFdIDogbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0JHJvdy5hcHBlbmQoY2hhcmFjdGVyICE9ICdfJyA/XG5cdFx0XHRcdFx0Ly9pZiB0aGUgY2hhcmFjdGVyIGlzIG5vdCBhbiB1bmRlcnNjb3JlIChlbXB0eSBzcGFjZSlcblx0XHRcdFx0XHQoZnVuY3Rpb24obmFtaW5nKSB7XG5cdFxuXHRcdFx0XHRcdFx0Ly9zbyB1c2VycyBkb24ndCBoYXZlIHRvIHNwZWNpZnkgZW1wdHkgb2JqZWN0c1xuXHRcdFx0XHRcdFx0c2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA9IGNoYXJhY3RlciBpbiBzZXR0aW5ncy5zZWF0cyA/IHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gOiB7fTtcblx0XG5cdFx0XHRcdFx0XHR2YXIgaWQgPSBvdmVycmlkZUlkID8gb3ZlcnJpZGVJZCA6IG5hbWluZy5nZXRJZChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pO1xuXHRcdFx0XHRcdFx0c2VhdHNbaWRdID0gbmV3IHNlYXQoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgOiBpZCxcblx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogb3ZlcnJpZGVMYWJlbCA/XG5cdFx0XHRcdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCA6IG5hbWluZy5nZXRMYWJlbChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pLFxuXHRcdFx0XHRcdFx0XHRyb3cgICAgICAgOiByb3csXG5cdFx0XHRcdFx0XHRcdGNvbHVtbiAgICA6IGNvbHVtbixcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyIDogY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0c2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0c1tpZF0ubm9kZSgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fSkoc2V0dGluZ3MubmFtaW5nKSA6XG5cdFx0XHRcdFx0Ly90aGlzIGlzIGp1c3QgYW4gZW1wdHkgc3BhY2UgKF8pXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVx0XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Zm4uYXBwZW5kKCRyb3cpO1xuXHRcdH0pO1xuXHRcblx0XHQvL2lmIHRoZXJlJ3JlIGFueSBsZWdlbmQgaXRlbXMgdG8gYmUgcmVuZGVyZWRcblx0XHRzZXR0aW5ncy5sZWdlbmQuaXRlbXMubGVuZ3RoID8gKGZ1bmN0aW9uKGxlZ2VuZCkge1xuXHRcdFx0Ly9laXRoZXIgdXNlIHVzZXItZGVmaW5lZCBjb250YWluZXIgb3IgY3JlYXRlIG91ciBvd24gYW5kIGluc2VydCBpdCByaWdodCBhZnRlciB0aGUgc2VhdCBjaGFydCBkaXZcblx0XHRcdHZhciAkY29udGFpbmVyID0gKGxlZ2VuZC5ub2RlIHx8ICQoJzxkaXY+PC9kaXY+JykuaW5zZXJ0QWZ0ZXIoZm4pKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kJyk7XG5cdFx0XHRcdFxuXHRcdFx0dmFyICR1bCA9ICQoJzx1bD48L3VsPicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRMaXN0Jylcblx0XHRcdFx0LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXHRcdFx0XG5cdFx0XHQkLmVhY2gobGVnZW5kLml0ZW1zLCBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kSXRlbScpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHRcdFx0Ly9tZXJnZSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIG91ciBzdGFuZGFyZCBvbmVzXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsIGl0ZW1bMV1dLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdHNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dID09IFwidW5kZWZpbmVkXCIgPyBbXSA6IHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dLmNsYXNzZXMpLmpvaW4oJyAnKVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxzcGFuPjwvc3Bhbj4nKVxuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmREZXNjcmlwdGlvbicpXG5cdFx0XHRcdFx0XHRcdFx0LnRleHQoaXRlbVsyXSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gJGNvbnRhaW5lcjtcblx0XHR9KShzZXR0aW5ncy5sZWdlbmQpIDogbnVsbDtcblx0XG5cdFx0Zm4uYXR0cih7XG5cdFx0XHR0YWJJbmRleCA6IDBcblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHQvL3doZW4gY29udGFpbmVyJ3MgZm9jdXNlZCwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3Qgc2VhdFxuXHRcdGZuLmZvY3VzKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpKSB7XG5cdFx0XHRcdHNlYXRzW2ZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0Zm4uZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpOmZpcnN0JykuZm9jdXMoKTtcblx0XHRcdHNlYXRzW3NlYXRJZHNbMF1dLmZvY3VzKCk7XG5cblx0XHR9KTtcblx0XG5cdFx0Ly9wdWJsaWMgbWV0aG9kcyBvZiBzZWF0Q2hhcnRzXG5cdFx0Zm4uZGF0YSgnc2VhdENoYXJ0cycsIHtcblx0XHRcdHNlYXRzICAgOiBzZWF0cyxcblx0XHRcdHNlYXRJZHMgOiBzZWF0SWRzLFxuXHRcdFx0Ly9zZXQgZm9yIG9uZSwgc2V0IGZvciBtYW55LCBnZXQgZm9yIG9uZVxuXHRcdFx0c3RhdHVzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gZm4uc2VhdHNbYXJndW1lbnRzWzBdXS5zdGF0dXMoKSA6IChmdW5jdGlvbihzZWF0c0lkcywgbmV3U3RhdHVzKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBmbi5zZWF0c1tzZWF0c0lkc10uc3RhdHVzKG5ld1N0YXR1cykgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdElkXS5zdGF0dXMobmV3U3RhdHVzKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH0pKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHRcdH0sXG5cdFx0XHRlYWNoICA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgc2VhdElkIGluIGZuLnNlYXRzKSB7XG5cdFx0XHRcdFx0aWYgKGZhbHNlID09PSBjYWxsYmFjay5jYWxsKGZuLnNlYXRzW3NlYXRJZF0sIHNlYXRJZCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0SWQ7Ly9yZXR1cm4gbGFzdCBjaGVja2VkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdC8vYmFzaWNhbGx5IGNyZWF0ZSBhIENTUyBxdWVyeSB0byBnZXQgYWxsIHNlYXRzIGJ5IHRoZWlyIERPTSBpZHNcblx0XHRcdFx0cmV0dXJuICQoJyMnICsgZm4uc2VhdElkcy5qb2luKCcsIycpKTtcblx0XHRcdH0sXG5cblx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbihxdWVyeSkgey8vRCwgYS5hdmFpbGFibGUsIHVuYXZhaWxhYmxlXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFxuXHRcdFx0XHQvL2lzIFJlZ0V4cFxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQubWF0Y2gocXVlcnkpKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2goaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgIChxdWVyeS5sZW5ndGggPT0gMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgc2VhcmNoZXMganVzdCBmb3IgYSBwYXJ0aWN1YWwgY2hhcmFjdGVyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShxdWVyeSkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHJ1bnMgYSBtb3JlIHNvcGhpc3RpY2F0ZWQgcXVlcnksIHNvIGxldCdzIHNlZSBpZiB0aGVyZSdzIGEgZG90XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkuaW5kZXhPZignLicpID4gLTEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlcmUncyBhIGRvdCB3aGljaCBzZXBhcmF0ZXMgY2hhcmFjdGVyIGFuZCB0aGUgc3RhdHVzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHF1ZXJ5LnNwbGl0KCcuJyk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKHNlYXRJZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IHBhcnRzWzBdICYmIHRoaXMuc3RhdHVzKCkgPT0gcGFydHNbMV0pIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IHF1ZXJ5KSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0c2V0ICAgICAgICA6IGZ1bmN0aW9uIHNldCgpIHsvL2luaGVyaXRzIHNvbWUgbWV0aG9kc1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzZWF0cyAgICAgIDogW10sXG5cdFx0XHRcdFx0c2VhdElkcyAgICA6IFtdLFxuXHRcdFx0XHRcdGxlbmd0aCAgICAgOiAwLFxuXHRcdFx0XHRcdHN0YXR1cyAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHR0aGF0ID0gdGhpcztcblx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBqdXN0IG9uZSBzZWF0IGluIHRoZSBzZXQgYW5kIHVzZXIgZGlkbid0IHBhc3MgYW55IHBhcmFtcywgcmV0dXJuIGN1cnJlbnQgc3RhdHVzXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sZW5ndGggPT0gMSAmJiBhcmdzLmxlbmd0aCA9PSAwID8gdGhpcy5zZWF0c1swXS5zdGF0dXMoKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Ly9vdGhlcndpc2UgY2FsbCBzdGF0dXMgZnVuY3Rpb24gZm9yIGVhY2ggb2YgdGhlIHNlYXRzIGluIHRoZSBzZXRcblx0XHRcdFx0XHRcdFx0JC5lYWNoKHRoYXQuc2VhdHMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdHVzLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4ubm9kZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZWFjaCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmVhY2guY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0ICAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmdldC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZmluZC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZXQuY2FsbChmbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwdXNoICAgICAgIDogZnVuY3Rpb24oaWQsIHNlYXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdHMucHVzaChzZWF0KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdCsrdGhpcy5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdC8vZ2V0IG9uZSBvYmplY3Qgb3IgYSBzZXQgb2Ygb2JqZWN0c1xuXHRcdFx0Z2V0ICAgOiBmdW5jdGlvbihzZWF0c0lkcykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXG5cdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBcblx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0c0lkc10gOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZuLnNlYXRzW3NlYXRJZF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VhdFNldC5wdXNoKHNlYXRJZCwgZm4uc2VhdHNbc2VhdElkXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdFNldDtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBmbi5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdH1cblx0XG5cdFxufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=