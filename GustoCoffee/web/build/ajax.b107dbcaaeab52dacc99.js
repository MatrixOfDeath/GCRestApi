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
            map: ['pp___ppppp', 'pp___ppppp', 'pp___ppppp', 'pppppppppp', 'pppppppppp', 'pppppppppp', 'pppppppppp', 'pppppppppp', 'pppppppppp'],
            seats: {
                n: {
                    price: 5,
                    classes: 'first-class', //your custom CSS class
                    category: 'First Class'
                },
                p: {
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
                items: [['p', 'available', 'Place disponible'], ['f', 'unavailable', 'Déjà réservé']]
            },
            click: function click() {
                if (this.status() == 'available') {
                    //let's create a new <li> which we'll add to the cart items
                    $('<li>' + this.data().category + ' Place # ' + this.settings.label + ': <b>$' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[annuler]</a></li>').attr('id', 'cart-item-' + this.settings.id).data('seatId', this.settings.id).appendTo($cart);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzA1MTM3ZmRjMGVkMGIyMDZiY2QiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50Iiwib24iLCJhamF4IiwidXJsIiwiUm91dGluZyIsImdlbmVyYXRlIiwidHlwZSIsImRhdGEiLCJ2YWwiLCJhc3luYyIsInN1Y2Nlc3MiLCJyZXNwb25zZVBhbmllciIsInRleHRTdGF0dXMiLCJlbXB0eSIsImFwcGVuZCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwidGhhdCIsImxvYWQiLCJmYWRlSW4iLCJyZXNwb25zZVByb2R1aXRzIiwiaGlkZSIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwicmVzcG9uc2UiLCJzaG93IiwiaWRTYWxsZSIsImlzRGlzcG8iLCJldmVudCIsInVpIiwiYWpheFJlY2hlcmNoZVNhbGxlcyIsImZpbmQiLCJ2YWx1ZSIsInJlZnJlc2hQYW5pZXIiLCJmaXJzdFNlYXRMYWJlbCIsInJlYWR5IiwibGVuZ3RoIiwiaW5pdENhcnRlSW50ZXJhY3RpdmUiLCIkY2FydCIsIiRjb3VudGVyIiwiJHRvdGFsIiwic2MiLCJzZWF0Q2hhcnRzIiwibWFwIiwic2VhdHMiLCJuIiwicHJpY2UiLCJjbGFzc2VzIiwiY2F0ZWdvcnkiLCJwIiwibmFtaW5nIiwidG9wIiwiZ2V0TGFiZWwiLCJjaGFyYWN0ZXIiLCJyb3ciLCJjb2x1bW4iLCJsZWdlbmQiLCJub2RlIiwiaXRlbXMiLCJjbGljayIsInN0YXR1cyIsInNldHRpbmdzIiwibGFiZWwiLCJhdHRyIiwiaWQiLCJhcHBlbmRUbyIsInJlY2FsY3VsYXRlVG90YWwiLCJyZW1vdmUiLCJzdHlsZSIsImdldCIsInBhcmVudHMiLCJ0b3RhbCIsImVhY2giLCJmbiIsInNldHVwIiwic2VhdElkcyIsImFuaW1hdGUiLCJsZWZ0IiwiZ2V0SWQiLCJmb2N1cyIsImJsdXIiLCJzZWF0Iiwic2VhdENoYXJ0c1NldHRpbmdzIiwiZXh0ZW5kIiwiJG5vZGUiLCJyb2xlIiwiZm9jdXNhYmxlIiwidGFiSW5kZXgiLCJhZGRDbGFzcyIsImNvbmNhdCIsImpvaW4iLCJjaGFyIiwiYXJndW1lbnRzIiwibmV3U3R5bGUiLCJvbGRTdHlsZSIsInN3aXRjaENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZWF0U2V0dGluZ3MiLCJpbmRleCIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiYXBwbHkiLCIkc2VhdCIsImUiLCIkbmV3U2VhdCIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJmaW5kQXZhaWxhYmxlIiwiJHJvd3MiLCIkc2VhdHMiLCIkY3VycmVudFJvdyIsIiRuZXdSb3ciLCJsYXN0IiwiZmlyc3QiLCJlcSIsImhhc0NsYXNzIiwicm93cyIsImkiLCJwdXNoIiwiY29sdW1ucyIsInNwbGl0IiwiJGhlYWRlclJvdyIsImNoYXJhY3RlcnMiLCIkcm93IiwibWF0Y2giLCJjaGFyYWN0ZXJQYXJhbXMiLCJtYXRjaGVzIiwicGFyYW1zIiwib3ZlcnJpZGVJZCIsIm92ZXJyaWRlTGFiZWwiLCIkY29udGFpbmVyIiwiaW5zZXJ0QWZ0ZXIiLCIkdWwiLCJpdGVtIiwic2VhdHNJZHMiLCJuZXdTdGF0dXMiLCJzZWF0SWQiLCJjYWxsIiwicXVlcnkiLCJzZWF0U2V0Iiwic2V0IiwiUmVnRXhwIiwiaW5kZXhPZiIsInBhcnRzIiwiYXJncyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RJO0FBQ0FBLEVBQUVDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IseUJBQXhCLEVBQW1ELFlBQVU7QUFDekRGLE1BQUVHLElBQUYsQ0FBTztBQUNIQyxhQUFLQyxRQUFRQyxRQUFSLENBQWlCLDJCQUFqQixDQURGO0FBRUhDLGNBQU0sTUFGSDtBQUdIQyxjQUFNO0FBQ0Ysa0JBQU1SLEVBQUUsSUFBRixFQUFRUyxHQUFSO0FBREosU0FISDtBQU1IQyxlQUFPLElBTko7QUFPSEMsaUJBQVMsaUJBQVVDLGNBQVYsRUFBMEI7QUFDL0I7QUFDQVosY0FBRUcsSUFBRixDQUFPO0FBQ0hDLHFCQUFLQyxRQUFRQyxRQUFSLENBQWlCLGFBQWpCLENBREY7QUFFSEMsc0JBQU0sTUFGSDtBQUdIRyx1QkFBTyxJQUhKO0FBSUhDLHlCQUFTLGlCQUFVQyxjQUFWLEVBQTBCQyxVQUExQixFQUFzQztBQUMzQ2Isc0JBQUUsa0JBQUYsRUFBc0JjLEtBQXRCLEdBQThCQyxNQUE5QixD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LFFBQWhDLEVBQTBDO0FBQ3pDRyxlQUFRckIsSUFBUixDQUFha0IsTUFBYixFQUFxQi9ELEdBQUc3QixLQUFILENBQVM0RixNQUFULENBQXJCO0FBQ0E7QUFDRCxNQUpEOztBQU1BLFlBQU9HLE9BQVA7QUFDQSxLQVhvQixFQUR0QjtBQWFBO0FBL0lvQixHQUF0Qjs7QUFrSkEsU0FBT2xFLEdBQUd4RSxJQUFILENBQVEsWUFBUixDQUFQO0FBQ0EsRUFubUJEO0FBc21CQSxDQTFtQkQsRUEwbUJHZ0osTUExbUJILEUiLCJmaWxlIjoiYWpheC5iMTA3ZGJjYWFlYWI1MmRhY2M5OS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzMDUxMzdmZGMwZWQwYjIwNmJjZCIsIiAgICAvLyBBam91dCBkJ3VuIHByb2R1aXQgYXUgcGFuaWVyIGFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkFkZFByb2R1Y3RQYW5pZXInLCBmdW5jdGlvbigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2Fqb3V0X3Byb2R1aXRfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllcikge1xuICAgICAgICAgICAgICAgIC8vIFJhZnJhaWNoaXNzZW1lbnQgZHUgcGFuaWVyIGFqYXhcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCIvLyBMb3JzcXUnb24gY2xpcXVlIHN1ciBsYSBib3V0b24gUHJvZHVpdCAjMlxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1wcm9kdWl0JywgZnVuY3Rpb24oKXtcblxuICAgIC8vIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIC8vIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgLy8gdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgLy8gdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhpZFNhbGxlICsgJ2lkc2FsbGUnKTtcbiAgICAvLyAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncHJvZHVpdHNfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUHJvZHVpdHMsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQcm9kdWl0cyk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCk7XG4gICAgICAgICAgICAvLyAkLmdldChSb3V0aW5nLmdlbmVyYXRlKCcnKSwgZnVuY3Rpb24oaHRtbCl7XG4gICAgICAgICAgICAvLyAgICAgJCgnI2Rpc3BsYXktcGFuaWVyJykuZW1wdHkoKS5odG1sKGh0bWwpO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByw6ljdXDDqXJhdGlvbiBkZXMgcHJvZHV0aXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG4vLyBMb3JzcXUnb24gY2xpcXVlIHN1ciBsYSBib3V0b24gU2FsbGUgIzFcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstc2FsbGUnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZScpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1Jykuc2hvdygpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuc2hvdygpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hhbmdlVHVubmVsQWNoYXQuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ1dHRvblNlYXJjaCcsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tEaXNwb0RhdGUuanMiLCIvLyBBam91dCBkJ3VuZSBzYWxsZSBlbiBhamF4IGF1IGNsaWNrIGR1IGJvdXRvbiBDaG9pc2lyIFNhbGxlXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ0bi1zdWNjZXNzLmJ1dHRvbkFkZFNhbGxlJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgLy8gdmFyIGFyclRpbWUgPSAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkuc3BsaXQoJzonKTtcbiAgICAvLyB2YXIgZGF0ZUR1Sm91ciA9IGFyclRpbWVbMl07XG4gICAgdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIGNvbnNvbGUubG9nKCdkYXRlIGFsdEZvcm1hdCcgKyBkYXRlKTtcblxuXG4gICAgLy8gaWYoZGF0ZUR1Sm91ci5sZW5ndGgpe1xuICAgIC8vICAgICBkYXRlID0gZGF0ZUR1Sm91cjtcbiAgICAvLyB9XG5cbiAgICAvL2NvbnNvbGUubG9nKGlkU2FsbGUgKyAnaWRzYWxsZScpO1xuICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuICAgICQoJyN0YWItbGluay1wcm9kdWl0JykucGFyZW50KCkudGFiKCdzaG93Jyk7XG5cbiAgICAvLyAxLSBPbiB2w6lyaWZpZSBsYSBkaXNwb25iaWxpdMOpIGRlIGxhIHNhbGxlXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZV9hamF4JyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgIFwiaWRTYWxsZVwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgIFwiZGF0ZVwiOiBkYXRlXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChpc0Rpc3BvLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihpc0Rpc3BvID0gJzEnKSB7XG4gICAgICAgICAgICAgICAgLy8yLSBPbiBham91dGUgbGEgc2FsbGUgY2hvaXNpIGRhbnMgc2Vzc2lvbiBkdSBwYW5pZXJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2Fqb3V0X3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCIgOiBpZFNhbGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IGRhdGVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzrDoCBtZXR0cmUgZW4gcGFyYWxsw6hsZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzLSBPbiBtZXRzIMOgIGpvdXIgbGUgcGFuaWVyIGFqYXhcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQtIE9uIGNoYXJnZSBsYSB2dWUgZGVzIHByb2R1aXRzIGFqYXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gNC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0xhIHNhbGxlIG5cXCdlc3QgcGx1cyBkaXNwb25pYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgZGUgbGEgc2FsbGUgY2hvaXNpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gMi1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBzYWxsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgLy8gMS1cbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBsb3JzIGRlIGxhIHbDqXJpZmljYXRpb24gZGUgbGEgZGlzcG9uaWJpbGl0w6kgZGUgbGEgc2FsbGUgbsKwJysgaWRTYWxsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdzbGlkZXN0b3AnLCAnI3NsaWRlci1yYW5nZScgLCBmdW5jdGlvbihldmVudCwgdWkpe1xuICAgIGNvbnNvbGUubG9nKCdpaWlpbicpO1xuICAgIGFqYXhSZWNoZXJjaGVTYWxsZXMoKTtcbn0pO1xuXG5cbmZ1bmN0aW9uIGFqYXhSZWNoZXJjaGVTYWxsZXMoKXtcbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIC8vIHZhciBhcnJUaW1lID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgLy8gdmFyIGRhdGVEdUpvdXIgPSBhcnJUaW1lWzJdO1xuICAgIC8vIGlmICghZGF0ZSAmJiAhZGF0ZUR1Sm91cil7XG4gICAgLy8gICAgIGRhdGUgPSBkYXRlRHVKb3VyO1xuICAgIC8vIH1cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENob2l4U2FsbGUuanMiLCIgICAgLy8gU3VwcHJlc3Npb24gZCd1bmUgc2FsbGUgZGVwdWlzIGxlIFByb2R1aXQgQWpheFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uRGVsZXRlUHJvZHVpdCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3BhbmllcicpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIFN1cHByZXNzaW9uIGQndW5lIHNhbGxlIGRlcHVpcyBsZSBQYW5pZXIgQWpheFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uRGVsZXRlU2FsbGUnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXJfc2FsbGUnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRzYWxsZVwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gTW9kaWZpY2F0aW9uIGxpdmUgYWpheCBkZSBsYSBxdWFudGl0w6kgcG91ciB1biBwcm9kdWl0XG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdzZWxlY3Quc2VsZWN0LXF0ZS1wcm9kdWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGFsZXJ0KCB0aGlzLnZhbHVlICsgJ2lkcHJvZHVpdCcrICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnKS52YWwoKSApO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWpvdXRfcHJvZHVpdF9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYnV0dG9uRGVsZXRlUHJvZHVpdCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgIFwicXRlXCI6IHRoaXMudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllcikge1xuXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoUGFuaWVyKCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsInZhciBmaXJzdFNlYXRMYWJlbCA9IDE7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gICAgaWYoJCgnI3NlYXQtbWFwJykubGVuZ3RoICYmICAkKCcjc2VsZWN0ZWQtc2VhdHMnKS5sZW5ndGgpe1xuICAgICAgICBpbml0Q2FydGVJbnRlcmFjdGl2ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRDYXJ0ZUludGVyYWN0aXZlKCl7XG4gICAgICAgIHZhciAkY2FydCA9ICQoJyNzZWxlY3RlZC1zZWF0cycpLFxuICAgICAgICAgICAgJGNvdW50ZXIgPSAkKCcjY291bnRlcicpLFxuICAgICAgICAgICAgJHRvdGFsID0gJCgnI3RvdGFsJyksXG4gICAgICAgICAgICBzYyA9ICQoJyNzZWF0LW1hcCcpLnNlYXRDaGFydHMoe1xuICAgICAgICAgICAgICAgIG1hcDogW1xuICAgICAgICAgICAgICAgICAgICAncHBfX19wcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcF9fX3BwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwX19fcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBwcHBwcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcHBwcHBwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwcHBwcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBwcHBwcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcHBwcHBwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwcHBwcHBwcHAnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2VhdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZmlyc3QtY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdGaXJzdCBDbGFzcydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ0Vjb25vbXkgQ2xhc3MnXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldExhYmVsOiBmdW5jdGlvbiAoY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0U2VhdExhYmVsKys7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogJCgnI2xlZ2VuZCcpLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgWydwJywgJ2F2YWlsYWJsZScsICdQbGFjZSBkaXNwb25pYmxlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2YnLCAndW5hdmFpbGFibGUnLCAnRMOpasOgIHLDqXNlcnbDqSddXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCdzIGNyZWF0ZSBhIG5ldyA8bGk+IHdoaWNoIHdlJ2xsIGFkZCB0byB0aGUgY2FydCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGxpPicgKyB0aGlzLmRhdGEoKS5jYXRlZ29yeSArICcgUGxhY2UgIyAnICsgdGhpcy5zZXR0aW5ncy5sYWJlbCArICc6IDxiPiQnICsgdGhpcy5kYXRhKCkucHJpY2UgKyAnPC9iPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FuY2VsLWNhcnQtaXRlbVwiPlthbm51bGVyXTwvYT48L2xpPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnc2VhdElkJywgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNhcnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogTGV0cyB1cGRhdGUgdGhlIGNvdW50ZXIgYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogLmZpbmQgZnVuY3Rpb24gd2lsbCBub3QgZmluZCB0aGUgY3VycmVudCBzZWF0LCBiZWNhdXNlIGl0IHdpbGwgY2hhbmdlIGl0cyBzdGF1dHMgb25seSBhZnRlciByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqICdzZWxlY3RlZCcuIFRoaXMgaXMgd2h5IHdlIGhhdmUgdG8gYWRkIDEgdG8gdGhlIGxlbmd0aCBhbmQgdGhlIGN1cnJlbnQgc2VhdCBwcmljZSB0byB0aGUgdG90YWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpICsgdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgLSB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBpdGVtIGZyb20gb3VyIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gdmFjYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3VuYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIGFscmVhZHkgYm9va2VkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VuYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvL3RoaXMgd2lsbCBoYW5kbGUgXCJbY2FuY2VsXVwiIGxpbmsgY2xpY2tzXG4gICAgICAgICQoJyNzZWxlY3RlZC1zZWF0cycpLm9uKCdjbGljaycsICcuY2FuY2VsLWNhcnQtaXRlbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vbGV0J3MganVzdCB0cmlnZ2VyIENsaWNrIGV2ZW50IG9uIHRoZSBhcHByb3ByaWF0ZSBzZWF0LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlcGVhdCB0aGUgbG9naWMgaGVyZVxuICAgICAgICAgICAgc2MuZ2V0KCQodGhpcykucGFyZW50cygnbGk6Zmlyc3QnKS5kYXRhKCdzZWF0SWQnKSkuY2xpY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9sZXQncyBwcmV0ZW5kIHNvbWUgc2VhdHMgaGF2ZSBhbHJlYWR5IGJlZW4gYm9va2VkXG4gICAgICAgIHNjLmdldChbJzFfMicsICc0XzEnLCAnN18xJywgJzdfMiddKS5zdGF0dXMoJ3VuYXZhaWxhYmxlJyk7XG4gICAgfVxuXG59KTtcblxuZnVuY3Rpb24gcmVjYWxjdWxhdGVUb3RhbChzYykge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAvL2Jhc2ljYWxseSBmaW5kIGV2ZXJ5IHNlbGVjdGVkIHNlYXQgYW5kIHN1bSBpdHMgcHJpY2VcbiAgICBzYy5maW5kKCdzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0b3RhbCArPSB0aGlzLmRhdGEoKS5wcmljZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwiLyohXG4gKiBqUXVlcnktU2VhdC1DaGFydHMgdjEuMS41IC0+IHYyIChLYXJpbSBCT1VCUklUKVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGV1c3ptYXJrb3dza2kvalF1ZXJ5LVNlYXQtQ2hhcnRzXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIDIwMTYgTWF0ZXVzeiBNYXJrb3dza2lcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogVXBncmFkZSBieSBhdXRob3I6IEthcmltIEJPVUJSSVRcbiAqL1xuXG4oZnVuY3Rpb24oJCkge1xuXHRcdFxuXHQvLyd1c2Ugc3RyaWN0JztcdFxuXHRcdFxuXHQkLmZuLnNlYXRDaGFydHMgPSBmdW5jdGlvbiAoc2V0dXApIHtcblxuXHRcdC8vaWYgdGhlcmUncyBzZWF0Q2hhcnRzIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCwgcmV0dXJuIGl0XG5cdFx0aWYgKHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmbiAgICAgICA9IHRoaXMsXG5cdFx0XHRzZWF0cyAgICA9IHt9LFxuXHRcdFx0c2VhdElkcyAgPSBbXSxcblx0XHRcdGxlZ2VuZCxcblx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRhbmltYXRlIDogZmFsc2UsIC8vcmVxdWlyZXMgalF1ZXJ5IFVJXG5cdFx0XHRcdG5hbWluZyAgOiB7XG5cdFx0XHRcdFx0dG9wICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRsZWZ0ICAgOiB0cnVlLFxuXHRcdFx0XHRcdGdldElkICA6IGZ1bmN0aW9uKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiByb3cgKyAnXycgKyBjb2x1bW47XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRMYWJlbCA6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29sdW1uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVnZW5kIDoge1xuXHRcdFx0XHRcdG5vZGUgICA6IG51bGwsXG5cdFx0XHRcdFx0aXRlbXMgIDogW11cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpY2sgICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnc2VsZWN0ZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2F2YWlsYWJsZSc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb2N1cyAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2ZvY3VzZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSAge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJsdXIgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnN0YXR1cygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWF0cyAgIDoge31cblx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdC8vc2VhdCB3aWxsIGJlIGJhc2ljYWxseSBhIHNlYXQgb2JqZWN0IHdoaWNoIHdlJ2xsIHdoZW4gZ2VuZXJhdGluZyB0aGUgbWFwXG5cdFx0XHRzZWF0ID0gKGZ1bmN0aW9uKHNlYXRDaGFydHMsIHNlYXRDaGFydHNTZXR0aW5ncykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNldHVwKSB7XG5cdFx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0XHRcdHN0YXR1cyA6ICdhdmFpbGFibGUnLCAvL2F2YWlsYWJsZSwgdW5hdmFpbGFibGUsIHNlbGVjdGVkXG5cdFx0XHRcdFx0XHRzdHlsZSAgOiAnYXZhaWxhYmxlJyxcblx0XHRcdFx0XHRcdC8vbWFrZSBzdXJlIHRoZXJlJ3MgYW4gZW1wdHkgaGFzaCBpZiB1c2VyIGRvZXNuJ3QgcGFzcyBhbnl0aGluZ1xuXHRcdFx0XHRcdFx0ZGF0YSAgIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW3NldHVwLmNoYXJhY3Rlcl0gfHwge31cblx0XHRcdFx0XHRcdC8vYW55dGhpbmcgZ29lcyBoZXJlP1xuXHRcdFx0XHRcdH0sIHNldHVwKTtcblxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlID0gJCgnPGRpdj48L2Rpdj4nKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgICAgICA6IGZuLnNldHRpbmdzLmlkLFxuXHRcdFx0XHRcdFx0XHRyb2xlICAgICAgICAgICA6ICdjaGVja2JveCcsXG5cdFx0XHRcdFx0XHRcdCdhcmlhLWNoZWNrZWQnIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGZvY3VzYWJsZSAgICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dGFiSW5kZXggICAgICAgOiAtMSAvL21hbnVhbCBmb2N1c1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50ZXh0KGZuLnNldHRpbmdzLmxhYmVsKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsICdhdmFpbGFibGUnXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdC8vbGV0J3MgbWVyZ2UgY3VzdG9tIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggc3RhbmRhcmQgSlNDIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXSA9PSBcInVuZGVmaW5lZFwiID8gXG5cdFx0XHRcdFx0XHRcdFx0W10gOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXS5jbGFzc2VzXG5cdFx0XHRcdFx0XHRcdCkuam9pbignICcpKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2Jhc2ljYWxseSBhIHdyYXBwZXIgZnVuY3Rpb25cblx0XHRcdFx0XHRmbi5kYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuZGF0YTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLmNoYXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5jaGFyYWN0ZXI7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuJG5vZGU7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogQ2FuIGVpdGhlciBzZXQgb3IgcmV0dXJuIHN0YXR1cyBkZXBlbmRpbmcgb24gYXJndW1lbnRzLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgdGhlcmUncyBubyBhcmd1bWVudCwgaXQgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgc3R5bGUuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB5b3UgcGFzcyBhbiBhcmd1bWVudCwgaXQgd2lsbCB1cGRhdGUgc2VhdCdzIHN0eWxlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm4uc3R5bGUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/XG5cdFx0XHRcdFx0XHRcdChmdW5jdGlvbihuZXdTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvbGRTdHlsZSA9IGZuLnNldHRpbmdzLnN0eWxlO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiBub3RoaW5nIGNoYW5nZXMsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV3U3R5bGUgPT0gb2xkU3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvbGRTdHlsZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9mb2N1c2VkIGlzIGEgc3BlY2lhbCBzdHlsZSB3aGljaCBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIHN0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLnN0YXR1cyA9IG5ld1N0eWxlICE9ICdmb2N1c2VkJyA/IG5ld1N0eWxlIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0cignYXJpYS1jaGVja2VkJywgbmV3U3R5bGUgPT0gJ3NlbGVjdGVkJyk7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIHVzZXIgd2FudHMgdG8gYW5pbWF0ZSBzdGF0dXMgY2hhbmdlcywgbGV0IGhpbSBkbyB0aGlzXG5cdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0c1NldHRpbmdzLmFuaW1hdGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUuc3dpdGNoQ2xhc3Mob2xkU3R5bGUsIG5ld1N0eWxlLCAyMDApIDpcblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnJlbW92ZUNsYXNzKG9sZFN0eWxlKS5hZGRDbGFzcyhuZXdTdHlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3R5bGUgPSBuZXdTdHlsZTtcblx0XHRcdFx0XHRcdFx0fSkoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0eWxlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9laXRoZXIgc2V0IG9yIHJldHJpZXZlXG5cdFx0XHRcdFx0Zm4uc3RhdHVzID0gZnVuY3Rpb24oKSB7XG5cdFxuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0YXR1cyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IFxuXHRcdFx0XHRcdFx0XHRmbi5zdHlsZShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly91c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gdG8gY29udmllbmlldGx5IGdldCBzaG9ydGN1dCB2YXJpYWJsZXNcblx0XHRcdFx0XHQoZnVuY3Rpb24oc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQpIHtcblx0XHRcdFx0XHRcdC8vYXR0YWNoIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdFx0XHQkLmVhY2goWydjbGljaycsICdmb2N1cycsICdibHVyJ10sIGZ1bmN0aW9uKGluZGV4LCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vd2Ugd2FudCB0byBiZSBhYmxlIHRvIGNhbGwgdGhlIGZ1bmN0aW9ucyBmb3IgZWFjaCBzZWF0IG9iamVjdFxuXHRcdFx0XHRcdFx0XHRmbltjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT0gJ2ZvY3VzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGFscmVhZHkgYSBmb2N1c2VkIGVsZW1lbnQsIHdlIGhhdmUgdG8gcmVtb3ZlIGZvY3VzIGZyb20gaXQgZmlyc3Rcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBzZWF0LnNldHRpbmdzLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNlYXQubm9kZSgpLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgY2FuIHBhc3MgaGlzIG93biBjYWxsYmFjayBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBmaXJzdCBjaGVjayBpZiBpdCBleGlzdHNcblx0XHRcdFx0XHRcdFx0XHQgKiBhbmQgaWYgbm90LCB1c2Ugb3VyIGRlZmF1bHQgY2FsbGJhY2suXG5cdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHQgKiBFYWNoIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IHNlYXQgY29udGV4dC5cblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc3R5bGUodHlwZW9mIHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10uYXBwbHkoc2VhdCkgOiBzZWF0Q2hhcnRzU2V0dGluZ3NbY2FsbGJhY2tdLmFwcGx5KHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL3RoZSBiZWxvdyB3aWxsIGJlY29tZSBzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCB0aGFua3MgdG8gdGhlIGltbWVkaWF0ZSBmdW5jdGlvblx0XHRcblx0XHRcdFx0XHR9KShzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHMsIGZuLnNldHRpbmdzLmNoYXJhY3RlciwgZm4pO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlKClcblx0XHRcdFx0XHRcdC8vdGhlIGZpcnN0IHRocmVlIG1vdXNlIGV2ZW50cyBhcmUgc2ltcGxlXG5cdFx0XHRcdFx0XHQub24oJ2NsaWNrJywgICAgICBmbi5jbGljaylcblx0XHRcdFx0XHRcdC5vbignbW91c2VlbnRlcicsIGZuLmZvY3VzKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlJywgZm4uYmx1cilcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly9rZXlkb3duIHJlcXVpcmVzIHF1aXRlIGEgbG90IG9mIGxvZ2ljLCBiZWNhdXNlIHdlIGhhdmUgdG8ga25vdyB3aGVyZSB0byBtb3ZlIHRoZSBmb2N1c1xuXHRcdFx0XHRcdFx0Lm9uKCdrZXlkb3duJywgICAgKGZ1bmN0aW9uKHNlYXQsICRzZWF0KSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZXZlcnl0aGluZyBkZXBlbmRzIG9uIHRoZSBwcmVzc2VkIGtleVxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoZS53aGljaCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9zcGFjZWJhciB3aWxsIGp1c3QgdHJpZ2dlciB0aGUgc2FtZSBldmVudCBtb3VzZSBjbGljayBkb2VzXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL1VQICYgRE9XTlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoaXMgaXMgYSByZWN1cnNpdmUsIGltbWVkaWF0ZSBmdW5jdGlvbiB3aGljaCBzZWFyY2hlcyBmb3IgdGhlIGZpcnN0IFwiZm9jdXNhYmxlXCIgcm93LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIGJlY2F1c2Ugd2Ugd2FudCBhIGNvbnZlbmllbnQgYWNjZXNzIHRvIHNvbWUgRE9NIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIHJlY3Vyc2lvbiBiZWNhdXNlIHNvbWV0aW1lcyB3ZSBtYXkgaGl0IGFuIGVtcHR5IHNwYWNlIHJhdGhlciB0aGFuIGEgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uIGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJGN1cnJlbnRSb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1Jvdztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2xldCdzIGRldGVybWluZSB3aGljaCByb3cgc2hvdWxkIHdlIG1vdmUgdG9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRyb3dzLmluZGV4KCRjdXJyZW50Um93KSAmJiBlLndoaWNoID09IDM4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCB1cCBhcnJvdywgbW92ZSB0byB0aGUgbGFzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkcm93cy5pbmRleCgkY3VycmVudFJvdykgPT0gJHJvd3MubGVuZ3RoLTEgJiYgZS53aGljaCA9PSA0MCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBsYXN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCBkb3duIGFycm93LCBtb3ZlIHRvIHRoZSBmaXJzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzaW5nIGVxIHRvIGdldCBhbiBlbGVtZW50IGF0IHRoZSBkZXNpcmVkIGluZGV4IHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZXEoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdXAgYXJyb3csIHRoZW4gZGVjcmVtZW50IHRoZSBpbmRleCwgaWYgZG93biBpbmNyZW1lbnQgaXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICsgKGUud2hpY2ggPT0gMzggPyAoLTEpIDogKCsxKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbm93IHRoYXQgd2Uga25vdyB0aGUgcm93LCBsZXQncyBnZXQgdGhlIHNlYXQgdXNpbmcgdGhlIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAkbmV3Um93LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKS5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZSBzZWF0IHdlIGZvdW5kIGlzIGEgc3BhY2UsIGtlZXAgbG9va2luZyBmdXJ0aGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRuZXdTZWF0Lmhhc0NsYXNzKCdzZWF0Q2hhcnRzLXNwYWNlJykgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkbmV3Um93KSA6ICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyIGFuZCB0aGVuIHNlbGVjdCBhbGwgcm93cyBidXQgdGhlIGhlYWRlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcicpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJvdyBhbmQgdGhlbiBmaW5kIGFsbCBzZWF0IGNlbGxzIChib3RoIHNlYXRzICYgc3BhY2VzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3dlIGNvdWxkbid0IGRldGVybWluZSB0aGUgbmV3IHNlYXQsIHNvIHdlIGJldHRlciBnaXZlIHVwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3JlbW92ZSBmb2N1cyBmcm9tIHRoZSBvbGQgc2VhdCBhbmQgcHV0IGl0IG9uIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdC8vTEVGVCAmIFJJR0hUXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGUgbG9naWMgaGVyZSBpcyBzbGlnaHRseSBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIGZvciB1cC9kb3duIGFycm93cy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVXNlciB3aWxsIGJlIGFibGUgdG8gYnJvd3NlIHRoZSB3aG9sZSBtYXAgdXNpbmcganVzdCBsZWZ0L3JpZ2h0IGFycm93LCBiZWNhdXNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIGl0IHdpbGwgbW92ZSB0byB0aGUgbmV4dCByb3cgd2hlbiB3ZSByZWFjaCB0aGUgcmlnaHQvbGVmdC1tb3N0IHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbigkc2VhdHMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkc2VhdHMuaW5kZXgoJHNlYXQpICYmIGUud2hpY2ggPT0gMzcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCBsZWZ0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGxlZnQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRzZWF0cy5pbmRleCgkc2VhdCkgPT0gJHNlYXRzLmxlbmd0aCAtMSAmJiBlLndoaWNoID09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgcmlnaHQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgcmlnaHQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vc2ltcGx5IG1vdmUgb25lIHNlYXQgbGVmdCBvciByaWdodCBkZXBlbmRpbmcgb24gdGhlIGtleVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpICsgKGUud2hpY2ggPT0gMzcgPyAoLTEpIDogKCsxKSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXI6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSknKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL2hhbmRsZSBmb2N1c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSkoZm4sIGZuLm5vZGUoKSkpO1xuXHRcdFx0XHRcdFx0Ly8uYXBwZW5kVG8oc2VhdENoYXJ0cy5maW5kKCcuJyArIHJvdykpO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pKGZuLCBzZXR0aW5ncyk7XG5cdFx0XHRcblx0XHRmbi5hZGRDbGFzcygnc2VhdENoYXJ0cy1jb250YWluZXInKTtcblx0XHRcblx0XHQvL3RydWUgLT4gZGVlcCBjb3B5IVxuXHRcdCQuZXh0ZW5kKHRydWUsIHNldHRpbmdzLCBzZXR1cCk7XHRcdFxuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCByb3cgaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLnJvd3MgPSBzZXR0aW5ncy5uYW1pbmcucm93cyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgcm93cyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm93cy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSkoc2V0dGluZ3MubWFwLmxlbmd0aCk7XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IGNvbHVtbiBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyA9IHNldHRpbmdzLm5hbWluZy5jb2x1bW5zIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5zID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb2x1bW5zLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY29sdW1ucztcblx0XHR9KShzZXR0aW5ncy5tYXBbMF0uc3BsaXQoJycpLmxlbmd0aCk7XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLm5hbWluZy50b3ApIHtcblx0XHRcdHZhciAkaGVhZGVyUm93ID0gJCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93IHNlYXRDaGFydHMtaGVhZGVyJyk7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZCgkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpXG5cdFx0XHRcdFx0XHQudGV4dCh2YWx1ZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHRmbi5hcHBlbmQoJGhlYWRlclJvdyk7XG5cdFx0XG5cdFx0Ly9kbyB0aGlzIGZvciBlYWNoIG1hcCByb3dcblx0XHQkLmVhY2goc2V0dGluZ3MubWFwLCBmdW5jdGlvbihyb3csIGNoYXJhY3RlcnMpIHtcblxuXHRcdFx0dmFyICRyb3cgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdycpO1xuXHRcdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkcm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcblx0XHRcdFx0XHRcdC50ZXh0KHNldHRpbmdzLm5hbWluZy5yb3dzW3Jvd10pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBEbyB0aGlzIGZvciBlYWNoIHNlYXQgKGxldHRlcilcblx0XHRcdCAqXG5cdFx0XHQgKiBOb3cgdXNlcnMgd2lsbCBiZSBhYmxlIHRvIHBhc3MgY3VzdG9tIElEIGFuZCBsYWJlbCB3aGljaCBvdmVyd3JpdGUgdGhlIG9uZSB0aGF0IHNlYXQgd291bGQgYmUgYXNzaWduZWQgYnkgZ2V0SWQgYW5kXG5cdFx0XHQgKiBnZXRMYWJlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE5ldyBmb3JtYXQgaXMgbGlrZSB0aGlzOlxuXHRcdFx0ICogYVtJRCxsYWJlbF1hW0lEXWFhYWFhXG5cdFx0XHQgKlxuXHRcdFx0ICogU28geW91IGNhbiBvdmVyd3JpdGUgdGhlIElEIG9yIGxhYmVsIChvciBib3RoKSBldmVuIGZvciBqdXN0IG9uZSBzZWF0LlxuXHRcdFx0ICogQmFzaWNhbGx5IElEIHNob3VsZCBiZSBmaXJzdCwgc28gaWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIGp1c3QgbGFiZWwgd3JpdGUgaXQgYXMgZm9sbG93czpcblx0XHRcdCAqIGFbLExBQkVMXVxuXHRcdFx0ICpcblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBJRHMgYXJlTCAwLTksIGEteiwgQS1aLCBfXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gbGFiZWxzIGFyZTogMC05LCBhLXosIEEtWiwgXywgJyAnIChzcGFjZSlcblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdCBcblx0XHRcdCQuZWFjaChjaGFyYWN0ZXJzLm1hdGNoKC9bYS16X117MX0oXFxbWzAtOWEtel9dezAsfSgsWzAtOWEtel8gXSspP1xcXSk/L2dpKSwgZnVuY3Rpb24gKGNvbHVtbiwgY2hhcmFjdGVyUGFyYW1zKSB7IFxuXHRcdFx0XHR2YXIgbWF0Y2hlcyAgICAgICAgID0gY2hhcmFjdGVyUGFyYW1zLm1hdGNoKC8oW2Etel9dezF9KShcXFsoWzAtOWEtel8gLF0rKVxcXSk/L2kpLFxuXHRcdFx0XHRcdC8vbm8gbWF0dGVyIGlmIHVzZXIgc3BlY2lmaWVzIFtdIHBhcmFtcywgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaW4gdGhlIHNlY29uZCBlbGVtZW50XG5cdFx0XHRcdFx0Y2hhcmFjdGVyICAgICAgID0gbWF0Y2hlc1sxXSxcblx0XHRcdFx0XHQvL2NoZWNrIGlmIHVzZXIgaGFzIHBhc3NlZCBzb21lIGFkZGl0aW9uYWwgcGFyYW1zIHRvIG92ZXJyaWRlIGlkIG9yIGxhYmVsXG5cdFx0XHRcdFx0cGFyYW1zICAgICAgICAgID0gdHlwZW9mIG1hdGNoZXNbM10gIT09ICd1bmRlZmluZWQnID8gbWF0Y2hlc1szXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Ly9pZCBwYXJhbSBzaG91bGQgYmUgZmlyc3Rcblx0XHRcdFx0XHRvdmVycmlkZUlkICAgICAgPSBwYXJhbXMubGVuZ3RoID8gcGFyYW1zWzBdIDogbnVsbCxcblx0XHRcdFx0XHQvL2xhYmVsIHBhcmFtIHNob3VsZCBiZSBzZWNvbmRcblx0XHRcdFx0XHRvdmVycmlkZUxhYmVsICAgPSBwYXJhbXMubGVuZ3RoID09PSAyID8gcGFyYW1zWzFdIDogbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0JHJvdy5hcHBlbmQoY2hhcmFjdGVyICE9ICdfJyA/XG5cdFx0XHRcdFx0Ly9pZiB0aGUgY2hhcmFjdGVyIGlzIG5vdCBhbiB1bmRlcnNjb3JlIChlbXB0eSBzcGFjZSlcblx0XHRcdFx0XHQoZnVuY3Rpb24obmFtaW5nKSB7XG5cdFxuXHRcdFx0XHRcdFx0Ly9zbyB1c2VycyBkb24ndCBoYXZlIHRvIHNwZWNpZnkgZW1wdHkgb2JqZWN0c1xuXHRcdFx0XHRcdFx0c2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA9IGNoYXJhY3RlciBpbiBzZXR0aW5ncy5zZWF0cyA/IHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gOiB7fTtcblx0XG5cdFx0XHRcdFx0XHR2YXIgaWQgPSBvdmVycmlkZUlkID8gb3ZlcnJpZGVJZCA6IG5hbWluZy5nZXRJZChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pO1xuXHRcdFx0XHRcdFx0c2VhdHNbaWRdID0gbmV3IHNlYXQoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgOiBpZCxcblx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogb3ZlcnJpZGVMYWJlbCA/XG5cdFx0XHRcdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCA6IG5hbWluZy5nZXRMYWJlbChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pLFxuXHRcdFx0XHRcdFx0XHRyb3cgICAgICAgOiByb3csXG5cdFx0XHRcdFx0XHRcdGNvbHVtbiAgICA6IGNvbHVtbixcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyIDogY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0c2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0c1tpZF0ubm9kZSgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fSkoc2V0dGluZ3MubmFtaW5nKSA6XG5cdFx0XHRcdFx0Ly90aGlzIGlzIGp1c3QgYW4gZW1wdHkgc3BhY2UgKF8pXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVx0XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Zm4uYXBwZW5kKCRyb3cpO1xuXHRcdH0pO1xuXHRcblx0XHQvL2lmIHRoZXJlJ3JlIGFueSBsZWdlbmQgaXRlbXMgdG8gYmUgcmVuZGVyZWRcblx0XHRzZXR0aW5ncy5sZWdlbmQuaXRlbXMubGVuZ3RoID8gKGZ1bmN0aW9uKGxlZ2VuZCkge1xuXHRcdFx0Ly9laXRoZXIgdXNlIHVzZXItZGVmaW5lZCBjb250YWluZXIgb3IgY3JlYXRlIG91ciBvd24gYW5kIGluc2VydCBpdCByaWdodCBhZnRlciB0aGUgc2VhdCBjaGFydCBkaXZcblx0XHRcdHZhciAkY29udGFpbmVyID0gKGxlZ2VuZC5ub2RlIHx8ICQoJzxkaXY+PC9kaXY+JykuaW5zZXJ0QWZ0ZXIoZm4pKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kJyk7XG5cdFx0XHRcdFxuXHRcdFx0dmFyICR1bCA9ICQoJzx1bD48L3VsPicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRMaXN0Jylcblx0XHRcdFx0LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXHRcdFx0XG5cdFx0XHQkLmVhY2gobGVnZW5kLml0ZW1zLCBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kSXRlbScpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHRcdFx0Ly9tZXJnZSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIG91ciBzdGFuZGFyZCBvbmVzXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsIGl0ZW1bMV1dLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdHNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dID09IFwidW5kZWZpbmVkXCIgPyBbXSA6IHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dLmNsYXNzZXMpLmpvaW4oJyAnKVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxzcGFuPjwvc3Bhbj4nKVxuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmREZXNjcmlwdGlvbicpXG5cdFx0XHRcdFx0XHRcdFx0LnRleHQoaXRlbVsyXSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gJGNvbnRhaW5lcjtcblx0XHR9KShzZXR0aW5ncy5sZWdlbmQpIDogbnVsbDtcblx0XG5cdFx0Zm4uYXR0cih7XG5cdFx0XHR0YWJJbmRleCA6IDBcblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHQvL3doZW4gY29udGFpbmVyJ3MgZm9jdXNlZCwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3Qgc2VhdFxuXHRcdGZuLmZvY3VzKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpKSB7XG5cdFx0XHRcdHNlYXRzW2ZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0Zm4uZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpOmZpcnN0JykuZm9jdXMoKTtcblx0XHRcdHNlYXRzW3NlYXRJZHNbMF1dLmZvY3VzKCk7XG5cblx0XHR9KTtcblx0XG5cdFx0Ly9wdWJsaWMgbWV0aG9kcyBvZiBzZWF0Q2hhcnRzXG5cdFx0Zm4uZGF0YSgnc2VhdENoYXJ0cycsIHtcblx0XHRcdHNlYXRzICAgOiBzZWF0cyxcblx0XHRcdHNlYXRJZHMgOiBzZWF0SWRzLFxuXHRcdFx0Ly9zZXQgZm9yIG9uZSwgc2V0IGZvciBtYW55LCBnZXQgZm9yIG9uZVxuXHRcdFx0c3RhdHVzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gZm4uc2VhdHNbYXJndW1lbnRzWzBdXS5zdGF0dXMoKSA6IChmdW5jdGlvbihzZWF0c0lkcywgbmV3U3RhdHVzKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBmbi5zZWF0c1tzZWF0c0lkc10uc3RhdHVzKG5ld1N0YXR1cykgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdElkXS5zdGF0dXMobmV3U3RhdHVzKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH0pKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHRcdH0sXG5cdFx0XHRlYWNoICA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgc2VhdElkIGluIGZuLnNlYXRzKSB7XG5cdFx0XHRcdFx0aWYgKGZhbHNlID09PSBjYWxsYmFjay5jYWxsKGZuLnNlYXRzW3NlYXRJZF0sIHNlYXRJZCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0SWQ7Ly9yZXR1cm4gbGFzdCBjaGVja2VkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdC8vYmFzaWNhbGx5IGNyZWF0ZSBhIENTUyBxdWVyeSB0byBnZXQgYWxsIHNlYXRzIGJ5IHRoZWlyIERPTSBpZHNcblx0XHRcdFx0cmV0dXJuICQoJyMnICsgZm4uc2VhdElkcy5qb2luKCcsIycpKTtcblx0XHRcdH0sXG5cblx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbihxdWVyeSkgey8vRCwgYS5hdmFpbGFibGUsIHVuYXZhaWxhYmxlXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFxuXHRcdFx0XHQvL2lzIFJlZ0V4cFxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQubWF0Y2gocXVlcnkpKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2goaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgIChxdWVyeS5sZW5ndGggPT0gMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgc2VhcmNoZXMganVzdCBmb3IgYSBwYXJ0aWN1YWwgY2hhcmFjdGVyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShxdWVyeSkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHJ1bnMgYSBtb3JlIHNvcGhpc3RpY2F0ZWQgcXVlcnksIHNvIGxldCdzIHNlZSBpZiB0aGVyZSdzIGEgZG90XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkuaW5kZXhPZignLicpID4gLTEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlcmUncyBhIGRvdCB3aGljaCBzZXBhcmF0ZXMgY2hhcmFjdGVyIGFuZCB0aGUgc3RhdHVzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHF1ZXJ5LnNwbGl0KCcuJyk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKHNlYXRJZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IHBhcnRzWzBdICYmIHRoaXMuc3RhdHVzKCkgPT0gcGFydHNbMV0pIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IHF1ZXJ5KSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0c2V0ICAgICAgICA6IGZ1bmN0aW9uIHNldCgpIHsvL2luaGVyaXRzIHNvbWUgbWV0aG9kc1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzZWF0cyAgICAgIDogW10sXG5cdFx0XHRcdFx0c2VhdElkcyAgICA6IFtdLFxuXHRcdFx0XHRcdGxlbmd0aCAgICAgOiAwLFxuXHRcdFx0XHRcdHN0YXR1cyAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHR0aGF0ID0gdGhpcztcblx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBqdXN0IG9uZSBzZWF0IGluIHRoZSBzZXQgYW5kIHVzZXIgZGlkbid0IHBhc3MgYW55IHBhcmFtcywgcmV0dXJuIGN1cnJlbnQgc3RhdHVzXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sZW5ndGggPT0gMSAmJiBhcmdzLmxlbmd0aCA9PSAwID8gdGhpcy5zZWF0c1swXS5zdGF0dXMoKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Ly9vdGhlcndpc2UgY2FsbCBzdGF0dXMgZnVuY3Rpb24gZm9yIGVhY2ggb2YgdGhlIHNlYXRzIGluIHRoZSBzZXRcblx0XHRcdFx0XHRcdFx0JC5lYWNoKHRoYXQuc2VhdHMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdHVzLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4ubm9kZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZWFjaCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmVhY2guY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0ICAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmdldC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZmluZC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZXQuY2FsbChmbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwdXNoICAgICAgIDogZnVuY3Rpb24oaWQsIHNlYXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdHMucHVzaChzZWF0KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdCsrdGhpcy5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdC8vZ2V0IG9uZSBvYmplY3Qgb3IgYSBzZXQgb2Ygb2JqZWN0c1xuXHRcdFx0Z2V0ICAgOiBmdW5jdGlvbihzZWF0c0lkcykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXG5cdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBcblx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0c0lkc10gOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZuLnNlYXRzW3NlYXRJZF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VhdFNldC5wdXNoKHNlYXRJZCwgZm4uc2VhdHNbc2VhdElkXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdFNldDtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBmbi5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdH1cblx0XG5cdFxufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=