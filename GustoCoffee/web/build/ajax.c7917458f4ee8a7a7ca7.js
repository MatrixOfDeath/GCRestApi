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

// Ajout d'une salle en ajax au click du bouton Choisir Salle
$(document).on('click', 'button.btn-success.buttonAddSalle', function () {

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();
    var idSalle = $(this).val();

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
            //2- On ajoute la salle choisi dans session du panier
            $.ajax({
                url: Routing.generate('ajout_panier_salle'),
                type: "POST",
                data: {
                    "heureChoixDebut": date + ' ' + choixDebut + ':00',
                    "heureChoixFin": date + ' ' + choixFin + ':00',
                    "id": idSalle,
                    'date': date
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
        },
        // 1-
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
                p: {
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
                items: [['p', 'available', 'Place disponible'], ['f', 'unavailable', 'Déjà réservé']]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWIwNmVmNGJjZjZlZDNmZjU4N2UiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50Iiwib24iLCJhamF4IiwidXJsIiwiUm91dGluZyIsImdlbmVyYXRlIiwidHlwZSIsImRhdGEiLCJ2YWwiLCJhc3luYyIsInN1Y2Nlc3MiLCJyZXNwb25zZVBhbmllciIsInRleHRTdGF0dXMiLCJlbXB0eSIsImFwcGVuZCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwidGhhdCIsImxvYWQiLCJmYWRlSW4iLCJyZXNwb25zZVByb2R1aXRzIiwiaGlkZSIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwicmVzcG9uc2UiLCJzaG93IiwiaWRTYWxsZSIsImlzRGlzcG8iLCJmaW5kIiwidmFsdWUiLCJyZWZyZXNoUGFuaWVyIiwiZmlyc3RTZWF0TGFiZWwiLCJyZWFkeSIsImxlbmd0aCIsImluaXRDYXJ0ZUludGVyYWN0aXZlIiwiJGNhcnQiLCIkY291bnRlciIsIiR0b3RhbCIsInNjIiwic2VhdENoYXJ0cyIsIm1hcCIsInNlYXRzIiwicCIsInByaWNlIiwiY2xhc3NlcyIsImNhdGVnb3J5IiwiZSIsIm5hbWluZyIsInRvcCIsImdldExhYmVsIiwiY2hhcmFjdGVyIiwicm93IiwiY29sdW1uIiwibGVnZW5kIiwibm9kZSIsIml0ZW1zIiwiY2xpY2siLCJzdGF0dXMiLCJzZXR0aW5ncyIsImxhYmVsIiwiYXR0ciIsImlkIiwiYXBwZW5kVG8iLCJyZWNhbGN1bGF0ZVRvdGFsIiwicmVtb3ZlIiwic3R5bGUiLCJnZXQiLCJwYXJlbnRzIiwidG90YWwiLCJlYWNoIiwiZm4iLCJzZXR1cCIsInNlYXRJZHMiLCJhbmltYXRlIiwibGVmdCIsImdldElkIiwiZm9jdXMiLCJibHVyIiwic2VhdCIsInNlYXRDaGFydHNTZXR0aW5ncyIsImV4dGVuZCIsIiRub2RlIiwicm9sZSIsImZvY3VzYWJsZSIsInRhYkluZGV4IiwiYWRkQ2xhc3MiLCJjb25jYXQiLCJqb2luIiwiY2hhciIsImFyZ3VtZW50cyIsIm5ld1N0eWxlIiwib2xkU3R5bGUiLCJzd2l0Y2hDbGFzcyIsInJlbW92ZUNsYXNzIiwic2VhdFNldHRpbmdzIiwiaW5kZXgiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImFwcGx5IiwiJHNlYXQiLCIkbmV3U2VhdCIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJmaW5kQXZhaWxhYmxlIiwiJHJvd3MiLCIkc2VhdHMiLCIkY3VycmVudFJvdyIsIiRuZXdSb3ciLCJsYXN0IiwiZmlyc3QiLCJlcSIsImhhc0NsYXNzIiwicm93cyIsImkiLCJwdXNoIiwiY29sdW1ucyIsInNwbGl0IiwiJGhlYWRlclJvdyIsImNoYXJhY3RlcnMiLCIkcm93IiwibWF0Y2giLCJjaGFyYWN0ZXJQYXJhbXMiLCJtYXRjaGVzIiwicGFyYW1zIiwib3ZlcnJpZGVJZCIsIm92ZXJyaWRlTGFiZWwiLCIkY29udGFpbmVyIiwiaW5zZXJ0QWZ0ZXIiLCIkdWwiLCJpdGVtIiwic2VhdHNJZHMiLCJuZXdTdGF0dXMiLCJzZWF0SWQiLCJjYWxsIiwicXVlcnkiLCJzZWF0U2V0Iiwic2V0IiwiUmVnRXhwIiwiaW5kZXhPZiIsInBhcnRzIiwiYXJncyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RJO0FBQ0FBLEVBQUVDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IseUJBQXhCLEVBQW1ELFlBQVU7QUFDekRGLE1BQUVHLElBQUYsQ0FBTztBQUNIQyxhQUFLQyxRQUFRQyxRQUFSLENBQWlCLDJCQUFqQixDQURGO0FBRUhDLGNBQU0sTUFGSDtBQUdIQyxjQUFNO0FBQ0Ysa0JBQU1SLEVBQUUsSUFBRixFQUFRUyxHQUFSO0FBREosU0FISDtBQU1IQyxlQUFPLElBTko7QUFPSEMsaUJBQVMsaUJBQVVDLGNBQVYsRUFBMEI7QUFDL0I7QUFDQVosY0FBRUcsSUFBRixDQUFPO0FBQ0hDLHFCQUFLQyxRQUFRQyxRQUFSLENBQWlCLGFBQWpCLENBREY7QUFFSEMsc0JBQU0sTUFGSDtBQUdIRyx1QkFBTyxJQUhKO0FBSUhDLHlCQUFTLGlCQUFVQyxjQUFWLEVBQTBCQyxVQUExQixFQUFzQztBQUMzQ2Isc0JBQUUsa0JBQUYsRUFBc0JjLEtBQXRCLEdBQThCQyxNQUE5QixDQUFxQ0gsY0FBckM7QUFDSCxpQkFORTtBQU9ISSx1QkFBTyxlQUFT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Qjs7QUFrSkEsU0FBT2pFLEdBQUdyRSxJQUFILENBQVEsWUFBUixDQUFQO0FBQ0EsRUFubUJEO0FBc21CQSxDQTFtQkQsRUEwbUJHNEksTUExbUJILEUiLCJmaWxlIjoiYWpheC5jNzkxNzQ1OGY0ZWU4YTdhN2NhNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1YjA2ZWY0YmNmNmVkM2ZmNTg3ZSIsIiAgICAvLyBBam91dCBkJ3VuIHByb2R1aXQgYXUgcGFuaWVyIGFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkFkZFByb2R1Y3RQYW5pZXInLCBmdW5jdGlvbigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2Fqb3V0X3Byb2R1aXRfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllcikge1xuICAgICAgICAgICAgICAgIC8vIFJhZnJhaWNoaXNzZW1lbnQgZHUgcGFuaWVyIGFqYXhcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcylcbiAgICAvLyB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICAvLyB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIC8vIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIC8vIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpO1xuICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1zYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5zaG93KCk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnV0dG9uU2VhcmNoJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGVja0Rpc3BvRGF0ZS5qcyIsIi8vIEFqb3V0IGQndW5lIHNhbGxlIGVuIGFqYXggYXUgY2xpY2sgZHUgYm91dG9uIENob2lzaXIgU2FsbGVcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnRuLXN1Y2Nlc3MuYnV0dG9uQWRkU2FsbGUnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICB2YXIgaWRTYWxsZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGlkU2FsbGUgKyAnaWRzYWxsZScpO1xuICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuICAgICQoJyN0YWItbGluay1wcm9kdWl0JykucGFyZW50KCkudGFiKCdzaG93Jyk7XG5cbiAgICAvLyAxLSBPbiB2w6lyaWZpZSBsYSBkaXNwb25iaWxpdMOpIGRlIGxhIHNhbGxlXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZV9hamF4JyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgIFwiaWRTYWxsZVwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgIFwiZGF0ZVwiOiBkYXRlXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChpc0Rpc3BvLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLzItIE9uIGFqb3V0ZSBsYSBzYWxsZSBjaG9pc2kgZGFucyBzZXNzaW9uIGR1IHBhbmllclxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2Fqb3V0X3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGUnOiBkYXRlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOsOgIG1ldHRyZSBlbiBwYXJhbGzDqGxlID9cbiAgICAgICAgICAgICAgICAgICAgLy8gMy0gT24gbWV0cyDDoCBqb3VyIGxlIHBhbmllciBhamF4XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LSBPbiBjaGFyZ2UgbGEgdnVlIGRlcyBwcm9kdWl0cyBhamF4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gNC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnTGEgc2FsbGUgblxcJ2VzdCBwbHVzIGRpc3BvbmlibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBkZSBsYSBzYWxsZSBjaG9pc2knKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC8vIDItXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgc2FsbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvLyAxLVxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGxvcnMgZGUgbGEgdsOpcmlmaWNhdGlvbiBkZSBsYSBkaXNwb25pYmlsaXTDqSBkZSBsYSBzYWxsZSBuwrAnKyBpZFNhbGxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwiICAgIC8vIFN1cHByZXNzaW9uIGQndW5lIHNhbGxlIGRlcHVpcyBsZSBQcm9kdWl0IEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBTdXBwcmVzc2lvbiBkJ3VuZSBzYWxsZSBkZXB1aXMgbGUgUGFuaWVyIEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVNhbGxlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyX3NhbGxlJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkc2FsbGVcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIE1vZGlmaWNhdGlvbiBsaXZlIGFqYXggZGUgbGEgcXVhbnRpdMOpIHBvdXIgdW4gcHJvZHVpdFxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnc2VsZWN0LnNlbGVjdC1xdGUtcHJvZHVpdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBhbGVydCggdGhpcy52YWx1ZSArICdpZHByb2R1aXQnKyAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5idXR0b25EZWxldGVQcm9kdWl0JykudmFsKCkgKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2Fqb3V0X3Byb2R1aXRfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnKS52YWwoKSxcbiAgICAgICAgICAgICAgICBcInF0ZVwiOiB0aGlzLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcblxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllcigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhQYW5pZXIuanMiLCJ2YXIgZmlyc3RTZWF0TGFiZWwgPSAxO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuICAgIGlmKCQoJyNzZWF0LW1hcCcpLmxlbmd0aCAmJiAgJCgnI3NlbGVjdGVkLXNlYXRzJykubGVuZ3RoKXtcbiAgICAgICAgaW5pdENhcnRlSW50ZXJhY3RpdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0Q2FydGVJbnRlcmFjdGl2ZSgpe1xuICAgICAgICB2YXIgJGNhcnQgPSAkKCcjc2VsZWN0ZWQtc2VhdHMnKSxcbiAgICAgICAgICAgICRjb3VudGVyID0gJCgnI2NvdW50ZXInKSxcbiAgICAgICAgICAgICR0b3RhbCA9ICQoJyN0b3RhbCcpLFxuICAgICAgICAgICAgc2MgPSAkKCcjc2VhdC1tYXAnKS5zZWF0Q2hhcnRzKHtcbiAgICAgICAgICAgICAgICBtYXA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3BwX19fcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBfX19wcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcF9fX3BwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwcHBwcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBwcHBwcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcHBwcHBwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwcHBwcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBwcHBwcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcHBwcHBwcHBwJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNlYXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIHA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2ZpcnN0LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnRmlyc3QgQ2xhc3MnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2Vjb25vbXktY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdFY29ub215IENsYXNzJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hbWluZzoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdFNlYXRMYWJlbCsrO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6ICQoJyNsZWdlbmQnKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsncCcsICdhdmFpbGFibGUnLCAnUGxhY2UgZGlzcG9uaWJsZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ3VuYXZhaWxhYmxlJywgJ0TDqWrDoCByw6lzZXJ2w6knXVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQncyBjcmVhdGUgYSBuZXcgPGxpPiB3aGljaCB3ZSdsbCBhZGQgdG8gdGhlIGNhcnQgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxsaT4nICsgdGhpcy5kYXRhKCkuY2F0ZWdvcnkgKyAnIFNlYXQgIyAnICsgdGhpcy5zZXR0aW5ncy5sYWJlbCArICc6IDxiPiQnICsgdGhpcy5kYXRhKCkucHJpY2UgKyAnPC9iPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FuY2VsLWNhcnQtaXRlbVwiPltjYW5jZWxdPC9hPjwvbGk+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAnY2FydC1pdGVtLScgKyB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdzZWF0SWQnLCB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkY2FydCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBMZXRzIHVwZGF0ZSB0aGUgY291bnRlciBhbmQgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiAuZmluZCBmdW5jdGlvbiB3aWxsIG5vdCBmaW5kIHRoZSBjdXJyZW50IHNlYXQsIGJlY2F1c2UgaXQgd2lsbCBjaGFuZ2UgaXRzIHN0YXV0cyBvbmx5IGFmdGVyIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICogJ3NlbGVjdGVkJy4gVGhpcyBpcyB3aHkgd2UgaGF2ZSB0byBhZGQgMSB0byB0aGUgbGVuZ3RoIGFuZCB0aGUgY3VycmVudCBzZWF0IHByaWNlIHRvIHRoZSB0b3RhbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgKyB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSAtIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgdGhlIGl0ZW0gZnJvbSBvdXIgY2FydFxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiB2YWNhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2F2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAndW5hdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gYWxyZWFkeSBib29rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndW5hdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vdGhpcyB3aWxsIGhhbmRsZSBcIltjYW5jZWxdXCIgbGluayBjbGlja3NcbiAgICAgICAgJCgnI3NlbGVjdGVkLXNlYXRzJykub24oJ2NsaWNrJywgJy5jYW5jZWwtY2FydC1pdGVtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9sZXQncyBqdXN0IHRyaWdnZXIgQ2xpY2sgZXZlbnQgb24gdGhlIGFwcHJvcHJpYXRlIHNlYXQsIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVwZWF0IHRoZSBsb2dpYyBoZXJlXG4gICAgICAgICAgICBzYy5nZXQoJCh0aGlzKS5wYXJlbnRzKCdsaTpmaXJzdCcpLmRhdGEoJ3NlYXRJZCcpKS5jbGljaygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2xldCdzIHByZXRlbmQgc29tZSBzZWF0cyBoYXZlIGFscmVhZHkgYmVlbiBib29rZWRcbiAgICAgICAgc2MuZ2V0KFsnMV8yJywgJzRfMScsICc3XzEnLCAnN18yJ10pLnN0YXR1cygndW5hdmFpbGFibGUnKTtcbiAgICB9XG5cbn0pO1xuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZVRvdGFsKHNjKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIC8vYmFzaWNhbGx5IGZpbmQgZXZlcnkgc2VsZWN0ZWQgc2VhdCBhbmQgc3VtIGl0cyBwcmljZVxuICAgIHNjLmZpbmQoJ3NlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvdGFsICs9IHRoaXMuZGF0YSgpLnByaWNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvdGFsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvYWpheEdlc3Rpb25QbGFjZXMuanMiLCIvKiFcbiAqIGpRdWVyeS1TZWF0LUNoYXJ0cyB2MS4xLjUgLT4gdjIgKEthcmltIEJPVUJSSVQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXVzem1hcmtvd3NraS9qUXVlcnktU2VhdC1DaGFydHNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMywgMjAxNiBNYXRldXN6IE1hcmtvd3NraVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBVcGdyYWRlIGJ5IGF1dGhvcjogS2FyaW0gQk9VQlJJVFxuICovXG5cbihmdW5jdGlvbigkKSB7XG5cdFx0XG5cdC8vJ3VzZSBzdHJpY3QnO1x0XG5cdFx0XG5cdCQuZm4uc2VhdENoYXJ0cyA9IGZ1bmN0aW9uIChzZXR1cCkge1xuXG5cdFx0Ly9pZiB0aGVyZSdzIHNlYXRDaGFydHMgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LCByZXR1cm4gaXRcblx0XHRpZiAodGhpcy5kYXRhKCdzZWF0Q2hhcnRzJykpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3NlYXRDaGFydHMnKTtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIGZuICAgICAgID0gdGhpcyxcblx0XHRcdHNlYXRzICAgID0ge30sXG5cdFx0XHRzZWF0SWRzICA9IFtdLFxuXHRcdFx0bGVnZW5kLFxuXHRcdFx0c2V0dGluZ3MgPSB7XG5cdFx0XHRcdGFuaW1hdGUgOiBmYWxzZSwgLy9yZXF1aXJlcyBqUXVlcnkgVUlcblx0XHRcdFx0bmFtaW5nICA6IHtcblx0XHRcdFx0XHR0b3AgICAgOiB0cnVlLFxuXHRcdFx0XHRcdGxlZnQgICA6IHRydWUsXG5cdFx0XHRcdFx0Z2V0SWQgIDogZnVuY3Rpb24oY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJvdyArICdfJyArIGNvbHVtbjtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldExhYmVsIDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiBjb2x1bW47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsZWdlbmQgOiB7XG5cdFx0XHRcdFx0bm9kZSAgIDogbnVsbCxcblx0XHRcdFx0XHRpdGVtcyAgOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbGljayAgIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdzZWxlY3RlZCc7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnYXZhaWxhYmxlJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZvY3VzICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnZm9jdXNlZCc7XG5cdFx0XHRcdFx0fSBlbHNlICB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Ymx1ciAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3RhdHVzKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlYXRzICAgOiB7fVxuXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0Ly9zZWF0IHdpbGwgYmUgYmFzaWNhbGx5IGEgc2VhdCBvYmplY3Qgd2hpY2ggd2UnbGwgd2hlbiBnZW5lcmF0aW5nIHRoZSBtYXBcblx0XHRcdHNlYXQgPSAoZnVuY3Rpb24oc2VhdENoYXJ0cywgc2VhdENoYXJ0c1NldHRpbmdzKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoc2V0dXApIHtcblx0XHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLnNldHRpbmdzID0gJC5leHRlbmQoe1xuXHRcdFx0XHRcdFx0c3RhdHVzIDogJ2F2YWlsYWJsZScsIC8vYXZhaWxhYmxlLCB1bmF2YWlsYWJsZSwgc2VsZWN0ZWRcblx0XHRcdFx0XHRcdHN0eWxlICA6ICdhdmFpbGFibGUnLFxuXHRcdFx0XHRcdFx0Ly9tYWtlIHN1cmUgdGhlcmUncyBhbiBlbXB0eSBoYXNoIGlmIHVzZXIgZG9lc24ndCBwYXNzIGFueXRoaW5nXG5cdFx0XHRcdFx0XHRkYXRhICAgOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbc2V0dXAuY2hhcmFjdGVyXSB8fCB7fVxuXHRcdFx0XHRcdFx0Ly9hbnl0aGluZyBnb2VzIGhlcmU/XG5cdFx0XHRcdFx0fSwgc2V0dXApO1xuXG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUgPSAkKCc8ZGl2PjwvZGl2PicpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHQuYXR0cih7XG5cdFx0XHRcdFx0XHRcdGlkICAgICAgICAgICAgIDogZm4uc2V0dGluZ3MuaWQsXG5cdFx0XHRcdFx0XHRcdHJvbGUgICAgICAgICAgIDogJ2NoZWNrYm94Jyxcblx0XHRcdFx0XHRcdFx0J2FyaWEtY2hlY2tlZCcgOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0Zm9jdXNhYmxlICAgICAgOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR0YWJJbmRleCAgICAgICA6IC0xIC8vbWFudWFsIGZvY3VzXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LnRleHQoZm4uc2V0dGluZ3MubGFiZWwpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoWydzZWF0Q2hhcnRzLXNlYXQnLCAnc2VhdENoYXJ0cy1jZWxsJywgJ2F2YWlsYWJsZSddLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0Ly9sZXQncyBtZXJnZSBjdXN0b20gdXNlciBkZWZpbmVkIGNsYXNzZXMgd2l0aCBzdGFuZGFyZCBKU0Mgb25lc1xuXHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy5jbGFzc2VzLCBcblx0XHRcdFx0XHRcdFx0dHlwZW9mIHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tmbi5zZXR0aW5ncy5jaGFyYWN0ZXJdID09IFwidW5kZWZpbmVkXCIgPyBcblx0XHRcdFx0XHRcdFx0XHRbXSA6IHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tmbi5zZXR0aW5ncy5jaGFyYWN0ZXJdLmNsYXNzZXNcblx0XHRcdFx0XHRcdFx0KS5qb2luKCcgJykpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vYmFzaWNhbGx5IGEgd3JhcHBlciBmdW5jdGlvblxuXHRcdFx0XHRcdGZuLmRhdGEgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5kYXRhO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uY2hhciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLmNoYXJhY3Rlcjtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLm5vZGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy4kbm9kZTtcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHQgKiBDYW4gZWl0aGVyIHNldCBvciByZXR1cm4gc3RhdHVzIGRlcGVuZGluZyBvbiBhcmd1bWVudHMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB0aGVyZSdzIG5vIGFyZ3VtZW50LCBpdCB3aWxsIHJldHVybiB0aGUgY3VycmVudCBzdHlsZS5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHlvdSBwYXNzIGFuIGFyZ3VtZW50LCBpdCB3aWxsIHVwZGF0ZSBzZWF0J3Mgc3R5bGVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRmbi5zdHlsZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID9cblx0XHRcdFx0XHRcdFx0KGZ1bmN0aW9uKG5ld1N0eWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG9sZFN0eWxlID0gZm4uc2V0dGluZ3Muc3R5bGU7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIG5vdGhpbmcgY2hhbmdlcywgZG8gbm90aGluZ1xuXHRcdFx0XHRcdFx0XHRcdGlmIChuZXdTdHlsZSA9PSBvbGRTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9sZFN0eWxlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvL2ZvY3VzZWQgaXMgYSBzcGVjaWFsIHN0eWxlIHdoaWNoIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggc3RhdHVzXG5cdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3Muc3RhdHVzID0gbmV3U3R5bGUgIT0gJ2ZvY3VzZWQnID8gbmV3U3R5bGUgOiBmbi5zZXR0aW5ncy5zdGF0dXM7XG5cdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGVcblx0XHRcdFx0XHRcdFx0XHRcdC5hdHRyKCdhcmlhLWNoZWNrZWQnLCBuZXdTdHlsZSA9PSAnc2VsZWN0ZWQnKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vaWYgdXNlciB3YW50cyB0byBhbmltYXRlIHN0YXR1cyBjaGFuZ2VzLCBsZXQgaGltIGRvIHRoaXNcblx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzU2V0dGluZ3MuYW5pbWF0ZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZS5zd2l0Y2hDbGFzcyhvbGRTdHlsZSwgbmV3U3R5bGUsIDIwMCkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUucmVtb3ZlQ2xhc3Mob2xkU3R5bGUpLmFkZENsYXNzKG5ld1N0eWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5zdHlsZSA9IG5ld1N0eWxlO1xuXHRcdFx0XHRcdFx0XHR9KShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3R5bGU7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2VpdGhlciBzZXQgb3IgcmV0cmlldmVcblx0XHRcdFx0XHRmbi5zdGF0dXMgPSBmdW5jdGlvbigpIHtcblx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3RhdHVzID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gXG5cdFx0XHRcdFx0XHRcdGZuLnN0eWxlKGFyZ3VtZW50c1swXSkgOiBmbi5zZXR0aW5ncy5zdGF0dXM7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL3VzaW5nIGltbWVkaWF0ZSBmdW5jdGlvbiB0byBjb252aWVuaWV0bHkgZ2V0IHNob3J0Y3V0IHZhcmlhYmxlc1xuXHRcdFx0XHRcdChmdW5jdGlvbihzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCkge1xuXHRcdFx0XHRcdFx0Ly9hdHRhY2ggZXZlbnQgaGFuZGxlcnNcblx0XHRcdFx0XHRcdCQuZWFjaChbJ2NsaWNrJywgJ2ZvY3VzJywgJ2JsdXInXSwgZnVuY3Rpb24oaW5kZXgsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Ly93ZSB3YW50IHRvIGJlIGFibGUgdG8gY2FsbCB0aGUgZnVuY3Rpb25zIGZvciBlYWNoIHNlYXQgb2JqZWN0XG5cdFx0XHRcdFx0XHRcdGZuW2NhbGxiYWNrXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFjayA9PSAnZm9jdXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZXJlJ3MgYWxyZWFkeSBhIGZvY3VzZWQgZWxlbWVudCwgd2UgaGF2ZSB0byByZW1vdmUgZm9jdXMgZnJvbSBpdCBmaXJzdFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JykgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1tzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIHNlYXQuc2V0dGluZ3MuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ub2RlKCkuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0ICogVXNlciBjYW4gcGFzcyBoaXMgb3duIGNhbGxiYWNrIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIGZpcnN0IGNoZWNrIGlmIGl0IGV4aXN0c1xuXHRcdFx0XHRcdFx0XHRcdCAqIGFuZCBpZiBub3QsIHVzZSBvdXIgZGVmYXVsdCBjYWxsYmFjay5cblx0XHRcdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0XHRcdCAqIEVhY2ggY2FsbGJhY2sgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgaW4gdGhlIGN1cnJlbnQgc2VhdCBjb250ZXh0LlxuXHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmbi5zdHlsZSh0eXBlb2Ygc2VhdFNldHRpbmdzW2NoYXJhY3Rlcl1bY2FsbGJhY2tdID09PSAnZnVuY3Rpb24nID9cblx0XHRcdFx0XHRcdFx0XHRcdHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXS5hcHBseShzZWF0KSA6IHNlYXRDaGFydHNTZXR0aW5nc1tjYWxsYmFja10uYXBwbHkoc2VhdCkpO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vdGhlIGJlbG93IHdpbGwgYmVjb21lIHNlYXRTZXR0aW5ncywgY2hhcmFjdGVyLCBzZWF0IHRoYW5rcyB0byB0aGUgaW1tZWRpYXRlIGZ1bmN0aW9uXHRcdFxuXHRcdFx0XHRcdH0pKHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0cywgZm4uc2V0dGluZ3MuY2hhcmFjdGVyLCBmbik7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLm5vZGUoKVxuXHRcdFx0XHRcdFx0Ly90aGUgZmlyc3QgdGhyZWUgbW91c2UgZXZlbnRzIGFyZSBzaW1wbGVcblx0XHRcdFx0XHRcdC5vbignY2xpY2snLCAgICAgIGZuLmNsaWNrKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWVudGVyJywgZm4uZm9jdXMpXG5cdFx0XHRcdFx0XHQub24oJ21vdXNlbGVhdmUnLCBmbi5ibHVyKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvL2tleWRvd24gcmVxdWlyZXMgcXVpdGUgYSBsb3Qgb2YgbG9naWMsIGJlY2F1c2Ugd2UgaGF2ZSB0byBrbm93IHdoZXJlIHRvIG1vdmUgdGhlIGZvY3VzXG5cdFx0XHRcdFx0XHQub24oJ2tleWRvd24nLCAgICAoZnVuY3Rpb24oc2VhdCwgJHNlYXQpIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1NlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9ldmVyeXRoaW5nIGRlcGVuZHMgb24gdGhlIHByZXNzZWQga2V5XG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChlLndoaWNoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL3NwYWNlYmFyIHdpbGwganVzdCB0cmlnZ2VyIHRoZSBzYW1lIGV2ZW50IG1vdXNlIGNsaWNrIGRvZXNcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5jbGljaygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdC8vVVAgJiBET1dOXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVGhpcyBpcyBhIHJlY3Vyc2l2ZSwgaW1tZWRpYXRlIGZ1bmN0aW9uIHdoaWNoIHNlYXJjaGVzIGZvciB0aGUgZmlyc3QgXCJmb2N1c2FibGVcIiByb3cuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBXZSdyZSB1c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gYmVjYXVzZSB3ZSB3YW50IGEgY29udmVuaWVudCBhY2Nlc3MgdG8gc29tZSBET00gZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgcmVjdXJzaW9uIGJlY2F1c2Ugc29tZXRpbWVzIHdlIG1heSBoaXQgYW4gZW1wdHkgc3BhY2UgcmF0aGVyIHRoYW4gYSBzZWF0LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAoZnVuY3Rpb24gZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkY3VycmVudFJvdykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciAkbmV3Um93O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbGV0J3MgZGV0ZXJtaW5lIHdoaWNoIHJvdyBzaG91bGQgd2UgbW92ZSB0b1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICYmIGUud2hpY2ggPT0gMzgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhpcyBpcyB0aGUgZmlyc3Qgcm93IGFuZCB1c2VyIGhhcyBwcmVzc2VkIHVwIGFycm93LCBtb3ZlIHRvIHRoZSBsYXN0IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRyb3dzLmluZGV4KCRjdXJyZW50Um93KSA9PSAkcm93cy5sZW5ndGgtMSAmJiBlLndoaWNoID09IDQwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGxhc3Qgcm93IGFuZCB1c2VyIGhhcyBwcmVzc2VkIGRvd24gYXJyb3csIG1vdmUgdG8gdGhlIGZpcnN0IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNpbmcgZXEgdG8gZ2V0IGFuIGVsZW1lbnQgYXQgdGhlIGRlc2lyZWQgaW5kZXggcG9zaXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5lcShcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB1cCBhcnJvdywgdGhlbiBkZWNyZW1lbnQgdGhlIGluZGV4LCBpZiBkb3duIGluY3JlbWVudCBpdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkcm93cy5pbmRleCgkY3VycmVudFJvdykgKyAoZS53aGljaCA9PSAzOCA/ICgtMSkgOiAoKzEpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9ub3cgdGhhdCB3ZSBrbm93IHRoZSByb3csIGxldCdzIGdldCB0aGUgc2VhdCB1c2luZyB0aGUgY3VycmVudCBjb2x1bW4gcG9zaXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9ICRuZXdSb3cuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLmVxKCRzZWF0cy5pbmRleCgkc2VhdCkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhlIHNlYXQgd2UgZm91bmQgaXMgYSBzcGFjZSwga2VlcCBsb29raW5nIGZ1cnRoZXJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJG5ld1NlYXQuaGFzQ2xhc3MoJ3NlYXRDaGFydHMtc3BhY2UnKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaW5kQXZhaWxhYmxlKCRyb3dzLCAkc2VhdHMsICRuZXdSb3cpIDogJG5ld1NlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250YWluZXIgYW5kIHRoZW4gc2VsZWN0IGFsbCByb3dzIGJ1dCB0aGUgaGVhZGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtY29udGFpbmVyJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1yb3c6bm90KC5zZWF0Q2hhcnRzLWhlYWRlciknKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgcm93IGFuZCB0aGVuIGZpbmQgYWxsIHNlYXQgY2VsbHMgKGJvdGggc2VhdHMgJiBzcGFjZXMpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtcm93OmZpcnN0Jylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0LC5zZWF0Q2hhcnRzLXNwYWNlJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXQucGFyZW50cygnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vd2UgY291bGRuJ3QgZGV0ZXJtaW5lIHRoZSBuZXcgc2VhdCwgc28gd2UgYmV0dGVyIGdpdmUgdXBcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkbmV3U2VhdC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vcmVtb3ZlIGZvY3VzIGZyb20gdGhlIG9sZCBzZWF0IGFuZCBwdXQgaXQgb24gdGhlIG5ldyBvbmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ibHVyKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzWyRuZXdTZWF0LmF0dHIoJ2lkJyldLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0LmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBvdXIgXCJhcmlhXCIgcmVmZXJlbmNlIHdpdGggdGhlIG5ldyBzZWF0IGlkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgJG5ld1NlYXQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly9MRUZUICYgUklHSFRcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoZSBsb2dpYyBoZXJlIGlzIHNsaWdodGx5IGRpZmZlcmVudCBmcm9tIHRoZSBvbmUgZm9yIHVwL2Rvd24gYXJyb3dzLlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBVc2VyIHdpbGwgYmUgYWJsZSB0byBicm93c2UgdGhlIHdob2xlIG1hcCB1c2luZyBqdXN0IGxlZnQvcmlnaHQgYXJyb3csIGJlY2F1c2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogaXQgd2lsbCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyB3aGVuIHdlIHJlYWNoIHRoZSByaWdodC9sZWZ0LW1vc3Qgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uKCRzZWF0cykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRzZWF0cy5pbmRleCgkc2VhdCkgJiYgZS53aGljaCA9PSAzNykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2VyIGhhcyBwcmVzc2VkIGxlZnQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgbGVmdC1tb3N0IHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMubGFzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoJHNlYXRzLmluZGV4KCRzZWF0KSA9PSAkc2VhdHMubGVuZ3RoIC0xICYmIGUud2hpY2ggPT0gMzkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCByaWdodCBhcnJvdyBhbmQgd2UncmUgY3VycmVudGx5IG9uIHRoZSByaWdodC1tb3N0IHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMuZmlyc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9zaW1wbHkgbW92ZSBvbmUgc2VhdCBsZWZ0IG9yIHJpZ2h0IGRlcGVuZGluZyBvbiB0aGUga2V5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmVxKCRzZWF0cy5pbmRleCgkc2VhdCkgKyAoZS53aGljaCA9PSAzNyA/ICgtMSkgOiAoKzEpKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcjpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQ6bm90KC5zZWF0Q2hhcnRzLXNwYWNlKScpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vaGFuZGxlIGZvY3VzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1x0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzWyRuZXdTZWF0LmF0dHIoJ2lkJyldLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0LmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBvdXIgXCJhcmlhXCIgcmVmZXJlbmNlIHdpdGggdGhlIG5ldyBzZWF0IGlkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgJG5ld1NlYXQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1x0XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KShmbiwgZm4ubm9kZSgpKSk7XG5cdFx0XHRcdFx0XHQvLy5hcHBlbmRUbyhzZWF0Q2hhcnRzLmZpbmQoJy4nICsgcm93KSk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSkoZm4sIHNldHRpbmdzKTtcblx0XHRcdFxuXHRcdGZuLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNvbnRhaW5lcicpO1xuXHRcdFxuXHRcdC8vdHJ1ZSAtPiBkZWVwIGNvcHkhXG5cdFx0JC5leHRlbmQodHJ1ZSwgc2V0dGluZ3MsIHNldHVwKTtcdFx0XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IHJvdyBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcucm93cyA9IHNldHRpbmdzLm5hbWluZy5yb3dzIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciByb3dzID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3dzLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcm93cztcblx0XHR9KShzZXR0aW5ncy5tYXAubGVuZ3RoKTtcblx0XHRcblx0XHQvL0dlbmVyYXRlIGRlZmF1bHQgY29sdW1uIGlkcyB1bmxlc3MgdXNlciBwYXNzZWQgaGlzIG93blxuXHRcdHNldHRpbmdzLm5hbWluZy5jb2x1bW5zID0gc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMgfHwgKGZ1bmN0aW9uKGxlbmd0aCkge1xuXHRcdFx0dmFyIGNvbHVtbnMgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbHVtbnMucHVzaChpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjb2x1bW5zO1xuXHRcdH0pKHNldHRpbmdzLm1hcFswXS5zcGxpdCgnJykubGVuZ3RoKTtcblx0XHRcblx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLnRvcCkge1xuXHRcdFx0dmFyICRoZWFkZXJSb3cgPSAkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1yb3cgc2VhdENoYXJ0cy1oZWFkZXInKTtcblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLm5hbWluZy5sZWZ0KSB7XG5cdFx0XHRcdCRoZWFkZXJSb3cuYXBwZW5kKCQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5uYW1pbmcuY29sdW1ucywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG5cdFx0XHRcdCRoZWFkZXJSb3cuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsJylcblx0XHRcdFx0XHRcdC50ZXh0KHZhbHVlKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdFxuXHRcdGZuLmFwcGVuZCgkaGVhZGVyUm93KTtcblx0XHRcblx0XHQvL2RvIHRoaXMgZm9yIGVhY2ggbWFwIHJvd1xuXHRcdCQuZWFjaChzZXR0aW5ncy5tYXAsIGZ1bmN0aW9uKHJvdywgY2hhcmFjdGVycykge1xuXG5cdFx0XHR2YXIgJHJvdyA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93Jyk7XG5cdFx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLm5hbWluZy5sZWZ0KSB7XG5cdFx0XHRcdCRyb3cuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVxuXHRcdFx0XHRcdFx0LnRleHQoc2V0dGluZ3MubmFtaW5nLnJvd3Nbcm93XSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Lypcblx0XHRcdCAqIERvIHRoaXMgZm9yIGVhY2ggc2VhdCAobGV0dGVyKVxuXHRcdFx0ICpcblx0XHRcdCAqIE5vdyB1c2VycyB3aWxsIGJlIGFibGUgdG8gcGFzcyBjdXN0b20gSUQgYW5kIGxhYmVsIHdoaWNoIG92ZXJ3cml0ZSB0aGUgb25lIHRoYXQgc2VhdCB3b3VsZCBiZSBhc3NpZ25lZCBieSBnZXRJZCBhbmRcblx0XHRcdCAqIGdldExhYmVsXG5cdFx0XHQgKlxuXHRcdFx0ICogTmV3IGZvcm1hdCBpcyBsaWtlIHRoaXM6XG5cdFx0XHQgKiBhW0lELGxhYmVsXWFbSURdYWFhYWFcblx0XHRcdCAqXG5cdFx0XHQgKiBTbyB5b3UgY2FuIG92ZXJ3cml0ZSB0aGUgSUQgb3IgbGFiZWwgKG9yIGJvdGgpIGV2ZW4gZm9yIGp1c3Qgb25lIHNlYXQuXG5cdFx0XHQgKiBCYXNpY2FsbHkgSUQgc2hvdWxkIGJlIGZpcnN0LCBzbyBpZiB5b3Ugd2FudCB0byBvdmVyd3JpdGUganVzdCBsYWJlbCB3cml0ZSBpdCBhcyBmb2xsb3dzOlxuXHRcdFx0ICogYVssTEFCRUxdXG5cdFx0XHQgKlxuXHRcdFx0ICogQWxsb3dlZCBjaGFyYWN0ZXJzIGluIElEcyBhcmVMIDAtOSwgYS16LCBBLVosIF9cblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBsYWJlbHMgYXJlOiAwLTksIGEteiwgQS1aLCBfLCAnICcgKHNwYWNlKVxuXHRcdFx0ICpcblx0XHRcdCAqL1xuXHRcdFx0IFxuXHRcdFx0JC5lYWNoKGNoYXJhY3RlcnMubWF0Y2goL1thLXpfXXsxfShcXFtbMC05YS16X117MCx9KCxbMC05YS16XyBdKyk/XFxdKT8vZ2kpLCBmdW5jdGlvbiAoY29sdW1uLCBjaGFyYWN0ZXJQYXJhbXMpIHsgXG5cdFx0XHRcdHZhciBtYXRjaGVzICAgICAgICAgPSBjaGFyYWN0ZXJQYXJhbXMubWF0Y2goLyhbYS16X117MX0pKFxcWyhbMC05YS16XyAsXSspXFxdKT8vaSksXG5cdFx0XHRcdFx0Ly9ubyBtYXR0ZXIgaWYgdXNlciBzcGVjaWZpZXMgW10gcGFyYW1zLCB0aGUgY2hhcmFjdGVyIHNob3VsZCBiZSBpbiB0aGUgc2Vjb25kIGVsZW1lbnRcblx0XHRcdFx0XHRjaGFyYWN0ZXIgICAgICAgPSBtYXRjaGVzWzFdLFxuXHRcdFx0XHRcdC8vY2hlY2sgaWYgdXNlciBoYXMgcGFzc2VkIHNvbWUgYWRkaXRpb25hbCBwYXJhbXMgdG8gb3ZlcnJpZGUgaWQgb3IgbGFiZWxcblx0XHRcdFx0XHRwYXJhbXMgICAgICAgICAgPSB0eXBlb2YgbWF0Y2hlc1szXSAhPT0gJ3VuZGVmaW5lZCcgPyBtYXRjaGVzWzNdLnNwbGl0KCcsJykgOiBbXSxcblx0XHRcdFx0XHQvL2lkIHBhcmFtIHNob3VsZCBiZSBmaXJzdFxuXHRcdFx0XHRcdG92ZXJyaWRlSWQgICAgICA9IHBhcmFtcy5sZW5ndGggPyBwYXJhbXNbMF0gOiBudWxsLFxuXHRcdFx0XHRcdC8vbGFiZWwgcGFyYW0gc2hvdWxkIGJlIHNlY29uZFxuXHRcdFx0XHRcdG92ZXJyaWRlTGFiZWwgICA9IHBhcmFtcy5sZW5ndGggPT09IDIgPyBwYXJhbXNbMV0gOiBudWxsO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHQkcm93LmFwcGVuZChjaGFyYWN0ZXIgIT0gJ18nID9cblx0XHRcdFx0XHQvL2lmIHRoZSBjaGFyYWN0ZXIgaXMgbm90IGFuIHVuZGVyc2NvcmUgKGVtcHR5IHNwYWNlKVxuXHRcdFx0XHRcdChmdW5jdGlvbihuYW1pbmcpIHtcblx0XG5cdFx0XHRcdFx0XHQvL3NvIHVzZXJzIGRvbid0IGhhdmUgdG8gc3BlY2lmeSBlbXB0eSBvYmplY3RzXG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5zZWF0c1tjaGFyYWN0ZXJdID0gY2hhcmFjdGVyIGluIHNldHRpbmdzLnNlYXRzID8gc2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA6IHt9O1xuXHRcblx0XHRcdFx0XHRcdHZhciBpZCA9IG92ZXJyaWRlSWQgPyBvdmVycmlkZUlkIDogbmFtaW5nLmdldElkKGNoYXJhY3RlciwgbmFtaW5nLnJvd3Nbcm93XSwgbmFtaW5nLmNvbHVtbnNbY29sdW1uXSk7XG5cdFx0XHRcdFx0XHRzZWF0c1tpZF0gPSBuZXcgc2VhdCh7XG5cdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IGlkLFxuXHRcdFx0XHRcdFx0XHRsYWJlbCAgICAgOiBvdmVycmlkZUxhYmVsID9cblx0XHRcdFx0XHRcdFx0XHRvdmVycmlkZUxhYmVsIDogbmFtaW5nLmdldExhYmVsKGNoYXJhY3RlciwgbmFtaW5nLnJvd3Nbcm93XSwgbmFtaW5nLmNvbHVtbnNbY29sdW1uXSksXG5cdFx0XHRcdFx0XHRcdHJvdyAgICAgICA6IHJvdyxcblx0XHRcdFx0XHRcdFx0Y29sdW1uICAgIDogY29sdW1uLFxuXHRcdFx0XHRcdFx0XHRjaGFyYWN0ZXIgOiBjaGFyYWN0ZXJcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRzZWF0SWRzLnB1c2goaWQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRzW2lkXS5ub2RlKCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9KShzZXR0aW5ncy5uYW1pbmcpIDpcblx0XHRcdFx0XHQvL3RoaXMgaXMganVzdCBhbiBlbXB0eSBzcGFjZSAoXylcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwgc2VhdENoYXJ0cy1zcGFjZScpXHRcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRmbi5hcHBlbmQoJHJvdyk7XG5cdFx0fSk7XG5cdFxuXHRcdC8vaWYgdGhlcmUncmUgYW55IGxlZ2VuZCBpdGVtcyB0byBiZSByZW5kZXJlZFxuXHRcdHNldHRpbmdzLmxlZ2VuZC5pdGVtcy5sZW5ndGggPyAoZnVuY3Rpb24obGVnZW5kKSB7XG5cdFx0XHQvL2VpdGhlciB1c2UgdXNlci1kZWZpbmVkIGNvbnRhaW5lciBvciBjcmVhdGUgb3VyIG93biBhbmQgaW5zZXJ0IGl0IHJpZ2h0IGFmdGVyIHRoZSBzZWF0IGNoYXJ0IGRpdlxuXHRcdFx0dmFyICRjb250YWluZXIgPSAobGVnZW5kLm5vZGUgfHwgJCgnPGRpdj48L2Rpdj4nKS5pbnNlcnRBZnRlcihmbikpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmQnKTtcblx0XHRcdFx0XG5cdFx0XHR2YXIgJHVsID0gJCgnPHVsPjwvdWw+Jylcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZExpc3QnKVxuXHRcdFx0XHQuYXBwZW5kVG8oJGNvbnRhaW5lcik7XG5cdFx0XHRcblx0XHRcdCQuZWFjaChsZWdlbmQuaXRlbXMsIGZ1bmN0aW9uKGluZGV4LCBpdGVtKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRJdGVtJylcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdFx0XHQvL21lcmdlIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggb3VyIHN0YW5kYXJkIG9uZXNcblx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoWydzZWF0Q2hhcnRzLXNlYXQnLCAnc2VhdENoYXJ0cy1jZWxsJywgaXRlbVsxXV0uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0c2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2Ygc2V0dGluZ3Muc2VhdHNbaXRlbVswXV0gPT0gXCJ1bmRlZmluZWRcIiA/IFtdIDogc2V0dGluZ3Muc2VhdHNbaXRlbVswXV0uY2xhc3Nlcykuam9pbignICcpXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0LmFwcGVuZChcblx0XHRcdFx0XHRcdFx0JCgnPHNwYW4+PC9zcGFuPicpXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZERlc2NyaXB0aW9uJylcblx0XHRcdFx0XHRcdFx0XHQudGV4dChpdGVtWzJdKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiAkY29udGFpbmVyO1xuXHRcdH0pKHNldHRpbmdzLmxlZ2VuZCkgOiBudWxsO1xuXHRcblx0XHRmbi5hdHRyKHtcblx0XHRcdHRhYkluZGV4IDogMFxuXHRcdH0pO1xuXHRcdFxuXHRcdFxuXHRcdC8vd2hlbiBjb250YWluZXIncyBmb2N1c2VkLCBtb3ZlIGZvY3VzIHRvIHRoZSBmaXJzdCBzZWF0XG5cdFx0Zm4uZm9jdXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoZm4uYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JykpIHtcblx0XHRcdFx0c2VhdHNbZm4uYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JyldLmJsdXIoKTtcblx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRmbi5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSk6Zmlyc3QnKS5mb2N1cygpO1xuXHRcdFx0c2VhdHNbc2VhdElkc1swXV0uZm9jdXMoKTtcblxuXHRcdH0pO1xuXHRcblx0XHQvL3B1YmxpYyBtZXRob2RzIG9mIHNlYXRDaGFydHNcblx0XHRmbi5kYXRhKCdzZWF0Q2hhcnRzJywge1xuXHRcdFx0c2VhdHMgICA6IHNlYXRzLFxuXHRcdFx0c2VhdElkcyA6IHNlYXRJZHMsXG5cdFx0XHQvL3NldCBmb3Igb25lLCBzZXQgZm9yIG1hbnksIGdldCBmb3Igb25lXG5cdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBmbi5zZWF0c1thcmd1bWVudHNbMF1dLnN0YXR1cygpIDogKGZ1bmN0aW9uKHNlYXRzSWRzLCBuZXdTdGF0dXMpIHtcblx0XHRcdFx0XG5cdFx0XHRcdFx0cmV0dXJuIHR5cGVvZiBzZWF0c0lkcyA9PSAnc3RyaW5nJyA/IGZuLnNlYXRzW3NlYXRzSWRzXS5zdGF0dXMobmV3U3RhdHVzKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0SWRdLnN0YXR1cyhuZXdTdGF0dXMpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fSkoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdFx0fSxcblx0XHRcdGVhY2ggIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRmb3IgKHZhciBzZWF0SWQgaW4gZm4uc2VhdHMpIHtcblx0XHRcdFx0XHRpZiAoZmFsc2UgPT09IGNhbGxiYWNrLmNhbGwoZm4uc2VhdHNbc2VhdElkXSwgc2VhdElkKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRJZDsvL3JldHVybiBsYXN0IGNoZWNrZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdG5vZGUgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0Ly9iYXNpY2FsbHkgY3JlYXRlIGEgQ1NTIHF1ZXJ5IHRvIGdldCBhbGwgc2VhdHMgYnkgdGhlaXIgRE9NIGlkc1xuXHRcdFx0XHRyZXR1cm4gJCgnIycgKyBmbi5zZWF0SWRzLmpvaW4oJywjJykpO1xuXHRcdFx0fSxcblxuXHRcdFx0ZmluZCAgICAgICA6IGZ1bmN0aW9uKHF1ZXJ5KSB7Ly9ELCBhLmF2YWlsYWJsZSwgdW5hdmFpbGFibGVcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHR2YXIgc2VhdFNldCA9IGZuLnNldCgpO1xuXHRcdFx0XG5cdFx0XHRcdC8vaXMgUmVnRXhwXG5cdFx0ICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeSBpbnN0YW5jZW9mIFJlZ0V4cCA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC5tYXRjaChxdWVyeSkpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaChpZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgIH0pKCkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgKHF1ZXJ5Lmxlbmd0aCA9PSAxID9cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChjaGFyYWN0ZXIpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlciBzZWFyY2hlcyBqdXN0IGZvciBhIHBhcnRpY3VhbCBjaGFyYWN0ZXJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXIoKSA9PSBjaGFyYWN0ZXIpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKHF1ZXJ5KSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgcnVucyBhIG1vcmUgc29waGlzdGljYXRlZCBxdWVyeSwgc28gbGV0J3Mgc2VlIGlmIHRoZXJlJ3MgYSBkb3Rcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeS5pbmRleE9mKCcuJykgPiAtMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGVyZSdzIGEgZG90IHdoaWNoIHNlcGFyYXRlcyBjaGFyYWN0ZXIgYW5kIHRoZSBzdGF0dXNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gcXVlcnkuc3BsaXQoJy4nKTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoc2VhdElkKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gcGFydHNbMF0gJiYgdGhpcy5zdGF0dXMoKSA9PSBwYXJ0c1sxXSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gcXVlcnkpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRzZXQgICAgICAgIDogZnVuY3Rpb24gc2V0KCkgey8vaW5oZXJpdHMgc29tZSBtZXRob2RzXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHNlYXRzICAgICAgOiBbXSxcblx0XHRcdFx0XHRzZWF0SWRzICAgIDogW10sXG5cdFx0XHRcdFx0bGVuZ3RoICAgICA6IDAsXG5cdFx0XHRcdFx0c3RhdHVzICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHMsXG5cdFx0XHRcdFx0XHRcdHRoYXQgPSB0aGlzO1xuXHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGp1c3Qgb25lIHNlYXQgaW4gdGhlIHNldCBhbmQgdXNlciBkaWRuJ3QgcGFzcyBhbnkgcGFyYW1zLCByZXR1cm4gY3VycmVudCBzdGF0dXNcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmxlbmd0aCA9PSAxICYmIGFyZ3MubGVuZ3RoID09IDAgPyB0aGlzLnNlYXRzWzBdLnN0YXR1cygpIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHQvL290aGVyd2lzZSBjYWxsIHN0YXR1cyBmdW5jdGlvbiBmb3IgZWFjaCBvZiB0aGUgc2VhdHMgaW4gdGhlIHNldFxuXHRcdFx0XHRcdFx0XHQkLmVhY2godGhhdC5zZWF0cywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zdGF0dXMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG5vZGUgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5ub2RlLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRlYWNoICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZWFjaC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXQgICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZ2V0LmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5maW5kLmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldC5jYWxsKGZuKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHB1c2ggICAgICAgOiBmdW5jdGlvbihpZCwgc2VhdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWF0cy5wdXNoKHNlYXQpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZWF0SWRzLnB1c2goaWQpO1xuXHRcdFx0XHRcdFx0Kyt0aGlzLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0Ly9nZXQgb25lIG9iamVjdCBvciBhIHNldCBvZiBvYmplY3RzXG5cdFx0XHRnZXQgICA6IGZ1bmN0aW9uKHNlYXRzSWRzKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBzZWF0c0lkcyA9PSAnc3RyaW5nJyA/IFxuXHRcdFx0XHRcdGZuLnNlYXRzW3NlYXRzSWRzXSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0JC5lYWNoKHNlYXRzSWRzLCBmdW5jdGlvbihpbmRleCwgc2VhdElkKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZm4uc2VhdHNbc2VhdElkXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0LnB1c2goc2VhdElkLCBmbi5zZWF0c1tzZWF0SWRdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0U2V0O1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0cmV0dXJuIGZuLmRhdGEoJ3NlYXRDaGFydHMnKTtcblx0fVxuXHRcblx0XG59KShqUXVlcnkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvanF1ZXJ5LnNlYXQtY2hhcnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==