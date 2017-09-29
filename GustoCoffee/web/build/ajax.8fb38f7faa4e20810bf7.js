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



function ajaxChangeQtePanier() {
    //J'initialise le montant total à 0.
    var total = 0;

    // Je boucle sur le nombre de produit afin de récupérer leur ID. Je commence à 1 parce que le premier ID du produit vaut 1.
    for (var i = 1; i < 5; i++) {
        //Je récupère la valeur qui se trouve dans l'Id "prix+i".
        var prix = document.getElementById('prix' + i).innerText;

        //Je récuère seulement le nombre.
        var thenum = prix.match(/\d+/)[0];

        //Je récupère la valeur du select qui a pour id "qte+i"
        var e = document.getElementById('qte' + i);
        //Je récupuère seulement la valeur que l'utilisateur aura choisi.
        var strUser = e.options[e.selectedIndex].value;

        /*Je calcule le total. Je parseFloat car j'avais que que strings.
          Je parseFloat si au cas où dans le futur, le site aura besoin de float
        */
        total = parseFloat(total) + parseFloat(thenum) * parseFloat(strUser);
    }

    //Je remets total à string pour pouvoir intégrer total à ma page html.twig
    total = total.toString();
    //J'écris dans ma page html à la span qui a pour id="montantapayer"
    document.getElementById("montantapayer").innerHTML = total + "€";
}

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
            refreshPanier(responsePanier);
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
            $('.row.panier-menu').empty().append(responsePanier);
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
            "id": $(this).val()
        },
        async: true,
        success: function success(responsePanier, textStatus) {
            $('.row.panier-menu').empty().append(responsePanier);
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

refreshPanier();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTgyMWZlMzYzZWE5ODI5YmNkMzAiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiYWpheENoYW5nZVF0ZVBhbmllciIsInRvdGFsIiwiaSIsInByaXgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJUZXh0IiwidGhlbnVtIiwibWF0Y2giLCJlIiwic3RyVXNlciIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidmFsdWUiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJpbm5lckhUTUwiLCIkIiwib24iLCJjb25zb2xlIiwibG9nIiwidmFsIiwiYWpheCIsInVybCIsIlJvdXRpbmciLCJnZW5lcmF0ZSIsInR5cGUiLCJkYXRhIiwiYXN5bmMiLCJzdWNjZXNzIiwicmVzcG9uc2VQYW5pZXIiLCJyZWZyZXNoUGFuaWVyIiwiZXJyb3IiLCJhbGVydCIsInRoYXQiLCJhcHBlbmQiLCJsb2FkIiwiZmFkZUluIiwicmVzcG9uc2VQcm9kdWl0cyIsInRleHRTdGF0dXMiLCJlbXB0eSIsImhpZGUiLCJwYXJlbnQiLCJ0YWIiLCJjaG9peERlYnV0IiwidGV4dCIsImNob2l4RmluIiwiZGF0ZSIsInJlc3BvbnNlIiwic2hvdyIsImlkU2FsbGUiLCJpc0Rpc3BvIiwiZmlyc3RTZWF0TGFiZWwiLCJyZWFkeSIsImxlbmd0aCIsImluaXRDYXJ0ZUludGVyYWN0aXZlIiwiJGNhcnQiLCIkY291bnRlciIsIiR0b3RhbCIsInNjIiwic2VhdENoYXJ0cyIsIm1hcCIsInNlYXRzIiwiZiIsInByaWNlIiwiY2xhc3NlcyIsImNhdGVnb3J5IiwibmFtaW5nIiwidG9wIiwiZ2V0TGFiZWwiLCJjaGFyYWN0ZXIiLCJyb3ciLCJjb2x1bW4iLCJsZWdlbmQiLCJub2RlIiwiaXRlbXMiLCJjbGljayIsInN0YXR1cyIsInNldHRpbmdzIiwibGFiZWwiLCJhdHRyIiwiaWQiLCJhcHBlbmRUbyIsImZpbmQiLCJyZWNhbGN1bGF0ZVRvdGFsIiwicmVtb3ZlIiwic3R5bGUiLCJnZXQiLCJwYXJlbnRzIiwiZWFjaCIsImZuIiwic2V0dXAiLCJzZWF0SWRzIiwiYW5pbWF0ZSIsImxlZnQiLCJnZXRJZCIsImZvY3VzIiwiYmx1ciIsInNlYXQiLCJzZWF0Q2hhcnRzU2V0dGluZ3MiLCJleHRlbmQiLCIkbm9kZSIsInJvbGUiLCJmb2N1c2FibGUiLCJ0YWJJbmRleCIsImFkZENsYXNzIiwiY29uY2F0Iiwiam9pbiIsImNoYXIiLCJhcmd1bWVudHMiLCJuZXdTdHlsZSIsIm9sZFN0eWxlIiwic3dpdGNoQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNlYXRTZXR0aW5ncyIsImluZGV4IiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJhcHBseSIsIiRzZWF0IiwiJG5ld1NlYXQiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0IiwiZmluZEF2YWlsYWJsZSIsIiRyb3dzIiwiJHNlYXRzIiwiJGN1cnJlbnRSb3ciLCIkbmV3Um93IiwibGFzdCIsImZpcnN0IiwiZXEiLCJoYXNDbGFzcyIsInJvd3MiLCJwdXNoIiwiY29sdW1ucyIsInNwbGl0IiwiJGhlYWRlclJvdyIsImNoYXJhY3RlcnMiLCIkcm93IiwiY2hhcmFjdGVyUGFyYW1zIiwibWF0Y2hlcyIsInBhcmFtcyIsIm92ZXJyaWRlSWQiLCJvdmVycmlkZUxhYmVsIiwiJGNvbnRhaW5lciIsImluc2VydEFmdGVyIiwiJHVsIiwiaXRlbSIsInNlYXRzSWRzIiwibmV3U3RhdHVzIiwic2VhdElkIiwiY2FsbCIsInF1ZXJ5Iiwic2VhdFNldCIsInNldCIsIlJlZ0V4cCIsImluZGV4T2YiLCJwYXJ0cyIsImFyZ3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RJLFNBQVNBLG1CQUFULEdBQStCO0FBQzNCO0FBQ0EsUUFBSUMsUUFBUSxDQUFaOztBQUVBO0FBQ0EsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQ3hCO0FBQ0EsWUFBSUMsT0FBT0MsU0FBU0MsY0FBVCxDQUF3QixTQUFTSCxDQUFqQyxFQUFvQ0ksU0FBL0M7O0FBRUE7QUFDQSxZQUFJQyxTQUFTSixLQUFLSyxLQUFMLENBQVcsS0FBWCxFQUFrQixDQUFsQixDQUFiOztBQUVBO0FBQ0EsWUFBSUMsSUFBSUwsU0FBU0MsY0FBVCxDQUF3QixRQUFRSCxDQUFoQyxDQUFSO0FBQ0E7QUFDQSxZQUFJUSxVQUFVRCxFQUFFRSxPQUFGLENB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QUFGLENBQU8yRCxRQUFQLEVBQWlCLFVBQVNqQyxLQUFULEVBQWdCbUMsTUFBaEIsRUFBd0I7QUFDeEMsVUFBSSxRQUFPNUQsR0FBRzVCLEtBQUgsQ0FBU3dGLE1BQVQsQ0FBUCxNQUE0QixRQUFoQyxFQUEwQztBQUN6Q0csZUFBUXBCLElBQVIsQ0FBYWlCLE1BQWIsRUFBcUI1RCxHQUFHNUIsS0FBSCxDQUFTd0YsTUFBVCxDQUFyQjtBQUNBO0FBQ0QsTUFKRDs7QUFNQSxZQUFPRyxPQUFQO0FBQ0EsS0FYb0IsRUFEdEI7QUFhQTtBQS9Jb0IsR0FBdEI7O0FBa0pBLFNBQU8vRCxHQUFHL0QsSUFBSCxDQUFRLFlBQVIsQ0FBUDtBQUNBLEVBbm1CRDtBQXNtQkEsQ0ExbUJELEVBMG1CR29JLE1BMW1CSCxFIiwiZmlsZSI6ImFqYXguOGZiMzhmN2ZhYTRlMjA4MTBiZjcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNTgyMWZlMzYzZWE5ODI5YmNkMzAiLCJcblxuICAgIGZ1bmN0aW9uIGFqYXhDaGFuZ2VRdGVQYW5pZXIoKSB7XG4gICAgICAgIC8vSidpbml0aWFsaXNlIGxlIG1vbnRhbnQgdG90YWwgw6AgMC5cbiAgICAgICAgdmFyIHRvdGFsID0gMDtcblxuICAgICAgICAvLyBKZSBib3VjbGUgc3VyIGxlIG5vbWJyZSBkZSBwcm9kdWl0IGFmaW4gZGUgcsOpY3Vww6lyZXIgbGV1ciBJRC4gSmUgY29tbWVuY2Ugw6AgMSBwYXJjZSBxdWUgbGUgcHJlbWllciBJRCBkdSBwcm9kdWl0IHZhdXQgMS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgIC8vSmUgcsOpY3Vww6hyZSBsYSB2YWxldXIgcXVpIHNlIHRyb3V2ZSBkYW5zIGwnSWQgXCJwcml4K2lcIi5cbiAgICAgICAgICAgIHZhciBwcml4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaXgnICsgaSkuaW5uZXJUZXh0O1xuXG4gICAgICAgICAgICAvL0plIHLDqWN1w6hyZSBzZXVsZW1lbnQgbGUgbm9tYnJlLlxuICAgICAgICAgICAgdmFyIHRoZW51bSA9IHByaXgubWF0Y2goL1xcZCsvKVswXTtcblxuICAgICAgICAgICAgLy9KZSByw6ljdXDDqHJlIGxhIHZhbGV1ciBkdSBzZWxlY3QgcXVpIGEgcG91ciBpZCBcInF0ZStpXCJcbiAgICAgICAgICAgIHZhciBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F0ZScgKyBpKTtcbiAgICAgICAgICAgIC8vSmUgcsOpY3VwdcOocmUgc2V1bGVtZW50IGxhIHZhbGV1ciBxdWUgbCd1dGlsaXNhdGV1ciBhdXJhIGNob2lzaS5cbiAgICAgICAgICAgIHZhciBzdHJVc2VyID0gZS5vcHRpb25zW2Uuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG5cbiAgICAgICAgICAgIC8qSmUgY2FsY3VsZSBsZSB0b3RhbC4gSmUgcGFyc2VGbG9hdCBjYXIgaidhdmFpcyBxdWUgcXVlIHN0cmluZ3MuXG4gICAgICAgICAgICAgIEplIHBhcnNlRmxvYXQgc2kgYXUgY2FzIG/DuSBkYW5zIGxlIGZ1dHVyLCBsZSBzaXRlIGF1cmEgYmVzb2luIGRlIGZsb2F0XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdG90YWwgPSBwYXJzZUZsb2F0KHRvdGFsKSArIHBhcnNlRmxvYXQodGhlbnVtKSAqIHBhcnNlRmxvYXQoc3RyVXNlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvL0plIHJlbWV0cyB0b3RhbCDDoCBzdHJpbmcgcG91ciBwb3V2b2lyIGludMOpZ3JlciB0b3RhbCDDoCBtYSBwYWdlIGh0bWwudHdpZ1xuICAgICAgICB0b3RhbCA9IHRvdGFsLnRvU3RyaW5nKClcbiAgICAgICAgLy9KJ8OpY3JpcyBkYW5zIG1hIHBhZ2UgaHRtbCDDoCBsYSBzcGFuIHF1aSBhIHBvdXIgaWQ9XCJtb250YW50YXBheWVyXCJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb250YW50YXBheWVyXCIpLmlubmVySFRNTCA9IHRvdGFsICsgXCLigqxcIjtcbiAgICB9XG5cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uQWRkUHJvZHVjdFBhbmllcicsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWpvdXRfcHJvZHVpdF9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXIocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4QWpvdXRQcm9kdWl0UGFuaWVyLmpzIiwiJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1wcm9kdWl0JywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpXG4gICAgLy8gdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgLy8gdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICAvLyB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAvLyB2YXIgaWRTYWxsZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGlkU2FsbGUgKyAnaWRzYWxsZScpO1xuICAgIC8vICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoKTtcbiAgICAgICAgICAgIC8vICQuZ2V0KFJvdXRpbmcuZ2VuZXJhdGUoJycpLCBmdW5jdGlvbihodG1sKXtcbiAgICAgICAgICAgIC8vICAgICAkKCcjZGlzcGxheS1wYW5pZXInKS5lbXB0eSgpLmh0bWwoaHRtbCk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstc2FsbGUnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZScpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1Jykuc2hvdygpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuc2hvdygpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hhbmdlVHVubmVsQWNoYXQuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ1dHRvblNlYXJjaCcsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tEaXNwb0RhdGUuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ0bi1zdWNjZXNzLmJ1dHRvbkFkZFNhbGxlJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAvLyAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuICAgICQoJyN0YWItbGluay1wcm9kdWl0JykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgLy8gZnVuY3Rpb24gZ2V0RGlzcG9TYWxsZSgpe1xuICAgIC8vICAgICAkLmFqYXgoe1xuICAgIC8vICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZV9hamF4JyksXG4gICAgLy8gICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgIC8vICAgICAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAvLyAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAvLyAgICAgICAgICAgICBcImlkU2FsbGVcIiA6IGlkU2FsbGUsXG4gICAgLy8gICAgICAgICB9LHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgIC8vXG4gICAgLy8gICAgICAgICB9XG4gICAgLy9cbiAgICAvL1xuICAgIC8vIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgXCJpZFNhbGxlXCIgOiBpZFNhbGxlLFxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoaXNEaXNwbywgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpvdXRfcGFuaWVyX3NhbGxlJyksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICBcImlkXCIgOiBpZFNhbGxlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBcImlkXCIgOiBpZFNhbGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICQuZ2V0KFJvdXRpbmcuZ2VuZXJhdGUoJycpLCBmdW5jdGlvbihodG1sKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgJCgnI2Rpc3BsYXktcGFuaWVyJykuZW1wdHkoKS5odG1sKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByw6ljdXDDqXJhdGlvbiBkZXMgcHJvZHV0aXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnTGEgc2FsbGUgblxcJ2VzdCBwbHVzIGRpc3BvbmlibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IGRlIGxhIHNhbGxlIGNob2lzaScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBzYWxsZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGxvcnMgZGUgbGEgdsOpcmlmaWNhdGlvbiBkZSBsYSBkaXNwb25pYmlsaXTDqSBkZSBsYSBzYWxsZSBuwrAnKyBpZFNhbGxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwiXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVQcm9kdWl0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVTYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllcigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZnJlc2hQYW5pZXIoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsInZhciBmaXJzdFNlYXRMYWJlbCA9IDE7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gICAgaWYoJCgnI3NlYXQtbWFwJykubGVuZ3RoICYmICAkKCcjc2VsZWN0ZWQtc2VhdHMnKS5sZW5ndGgpe1xuICAgICAgICBpbml0Q2FydGVJbnRlcmFjdGl2ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRDYXJ0ZUludGVyYWN0aXZlKCl7XG4gICAgICAgIHZhciAkY2FydCA9ICQoJyNzZWxlY3RlZC1zZWF0cycpLFxuICAgICAgICAgICAgJGNvdW50ZXIgPSAkKCcjY291bnRlcicpLFxuICAgICAgICAgICAgJHRvdGFsID0gJCgnI3RvdGFsJyksXG4gICAgICAgICAgICBzYyA9ICQoJyNzZWF0LW1hcCcpLnNlYXRDaGFydHMoe1xuICAgICAgICAgICAgICAgIG1hcDogW1xuICAgICAgICAgICAgICAgICAgICAnZmZfZmYnLFxuICAgICAgICAgICAgICAgICAgICAnZmZfZmYnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfX18nLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVlZWUnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2VhdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZmlyc3QtY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdGaXJzdCBDbGFzcydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ0Vjb25vbXkgQ2xhc3MnXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldExhYmVsOiBmdW5jdGlvbiAoY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0U2VhdExhYmVsKys7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogJCgnI2xlZ2VuZCcpLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ2F2YWlsYWJsZScsICdGaXJzdCBDbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydlJywgJ2F2YWlsYWJsZScsICdFY29ub215IENsYXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2YnLCAndW5hdmFpbGFibGUnLCAnQWxyZWFkeSBCb29rZWQnXVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQncyBjcmVhdGUgYSBuZXcgPGxpPiB3aGljaCB3ZSdsbCBhZGQgdG8gdGhlIGNhcnQgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxsaT4nICsgdGhpcy5kYXRhKCkuY2F0ZWdvcnkgKyAnIFNlYXQgIyAnICsgdGhpcy5zZXR0aW5ncy5sYWJlbCArICc6IDxiPiQnICsgdGhpcy5kYXRhKCkucHJpY2UgKyAnPC9iPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FuY2VsLWNhcnQtaXRlbVwiPltjYW5jZWxdPC9hPjwvbGk+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAnY2FydC1pdGVtLScgKyB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdzZWF0SWQnLCB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkY2FydCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBMZXRzIHVwZGF0ZSB0aGUgY291bnRlciBhbmQgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiAuZmluZCBmdW5jdGlvbiB3aWxsIG5vdCBmaW5kIHRoZSBjdXJyZW50IHNlYXQsIGJlY2F1c2UgaXQgd2lsbCBjaGFuZ2UgaXRzIHN0YXV0cyBvbmx5IGFmdGVyIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICogJ3NlbGVjdGVkJy4gVGhpcyBpcyB3aHkgd2UgaGF2ZSB0byBhZGQgMSB0byB0aGUgbGVuZ3RoIGFuZCB0aGUgY3VycmVudCBzZWF0IHByaWNlIHRvIHRoZSB0b3RhbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgKyB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSAtIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgdGhlIGl0ZW0gZnJvbSBvdXIgY2FydFxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiB2YWNhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2F2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAndW5hdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gYWxyZWFkeSBib29rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndW5hdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vdGhpcyB3aWxsIGhhbmRsZSBcIltjYW5jZWxdXCIgbGluayBjbGlja3NcbiAgICAgICAgJCgnI3NlbGVjdGVkLXNlYXRzJykub24oJ2NsaWNrJywgJy5jYW5jZWwtY2FydC1pdGVtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9sZXQncyBqdXN0IHRyaWdnZXIgQ2xpY2sgZXZlbnQgb24gdGhlIGFwcHJvcHJpYXRlIHNlYXQsIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVwZWF0IHRoZSBsb2dpYyBoZXJlXG4gICAgICAgICAgICBzYy5nZXQoJCh0aGlzKS5wYXJlbnRzKCdsaTpmaXJzdCcpLmRhdGEoJ3NlYXRJZCcpKS5jbGljaygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2xldCdzIHByZXRlbmQgc29tZSBzZWF0cyBoYXZlIGFscmVhZHkgYmVlbiBib29rZWRcbiAgICAgICAgc2MuZ2V0KFsnMV8yJywgJzRfMScsICc3XzEnLCAnN18yJ10pLnN0YXR1cygndW5hdmFpbGFibGUnKTtcbiAgICB9XG5cbn0pO1xuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZVRvdGFsKHNjKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIC8vYmFzaWNhbGx5IGZpbmQgZXZlcnkgc2VsZWN0ZWQgc2VhdCBhbmQgc3VtIGl0cyBwcmljZVxuICAgIHNjLmZpbmQoJ3NlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvdGFsICs9IHRoaXMuZGF0YSgpLnByaWNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvdGFsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvYWpheEdlc3Rpb25QbGFjZXMuanMiLCIvKiFcbiAqIGpRdWVyeS1TZWF0LUNoYXJ0cyB2MS4xLjUgLT4gdjIgKEthcmltIEJPVUJSSVQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXVzem1hcmtvd3NraS9qUXVlcnktU2VhdC1DaGFydHNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMywgMjAxNiBNYXRldXN6IE1hcmtvd3NraVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBVcGdyYWRlIGJ5IGF1dGhvcjogS2FyaW0gQk9VQlJJVFxuICovXG5cbihmdW5jdGlvbigkKSB7XG5cdFx0XG5cdC8vJ3VzZSBzdHJpY3QnO1x0XG5cdFx0XG5cdCQuZm4uc2VhdENoYXJ0cyA9IGZ1bmN0aW9uIChzZXR1cCkge1xuXG5cdFx0Ly9pZiB0aGVyZSdzIHNlYXRDaGFydHMgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LCByZXR1cm4gaXRcblx0XHRpZiAodGhpcy5kYXRhKCdzZWF0Q2hhcnRzJykpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3NlYXRDaGFydHMnKTtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIGZuICAgICAgID0gdGhpcyxcblx0XHRcdHNlYXRzICAgID0ge30sXG5cdFx0XHRzZWF0SWRzICA9IFtdLFxuXHRcdFx0bGVnZW5kLFxuXHRcdFx0c2V0dGluZ3MgPSB7XG5cdFx0XHRcdGFuaW1hdGUgOiBmYWxzZSwgLy9yZXF1aXJlcyBqUXVlcnkgVUlcblx0XHRcdFx0bmFtaW5nICA6IHtcblx0XHRcdFx0XHR0b3AgICAgOiB0cnVlLFxuXHRcdFx0XHRcdGxlZnQgICA6IHRydWUsXG5cdFx0XHRcdFx0Z2V0SWQgIDogZnVuY3Rpb24oY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJvdyArICdfJyArIGNvbHVtbjtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldExhYmVsIDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiBjb2x1bW47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsZWdlbmQgOiB7XG5cdFx0XHRcdFx0bm9kZSAgIDogbnVsbCxcblx0XHRcdFx0XHRpdGVtcyAgOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbGljayAgIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdzZWxlY3RlZCc7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnYXZhaWxhYmxlJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZvY3VzICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnZm9jdXNlZCc7XG5cdFx0XHRcdFx0fSBlbHNlICB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Ymx1ciAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3RhdHVzKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlYXRzICAgOiB7fVxuXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0Ly9zZWF0IHdpbGwgYmUgYmFzaWNhbGx5IGEgc2VhdCBvYmplY3Qgd2hpY2ggd2UnbGwgd2hlbiBnZW5lcmF0aW5nIHRoZSBtYXBcblx0XHRcdHNlYXQgPSAoZnVuY3Rpb24oc2VhdENoYXJ0cywgc2VhdENoYXJ0c1NldHRpbmdzKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoc2V0dXApIHtcblx0XHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLnNldHRpbmdzID0gJC5leHRlbmQoe1xuXHRcdFx0XHRcdFx0c3RhdHVzIDogJ2F2YWlsYWJsZScsIC8vYXZhaWxhYmxlLCB1bmF2YWlsYWJsZSwgc2VsZWN0ZWRcblx0XHRcdFx0XHRcdHN0eWxlICA6ICdhdmFpbGFibGUnLFxuXHRcdFx0XHRcdFx0Ly9tYWtlIHN1cmUgdGhlcmUncyBhbiBlbXB0eSBoYXNoIGlmIHVzZXIgZG9lc24ndCBwYXNzIGFueXRoaW5nXG5cdFx0XHRcdFx0XHRkYXRhICAgOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbc2V0dXAuY2hhcmFjdGVyXSB8fCB7fVxuXHRcdFx0XHRcdFx0Ly9hbnl0aGluZyBnb2VzIGhlcmU/XG5cdFx0XHRcdFx0fSwgc2V0dXApO1xuXG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUgPSAkKCc8ZGl2PjwvZGl2PicpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHQuYXR0cih7XG5cdFx0XHRcdFx0XHRcdGlkICAgICAgICAgICAgIDogZm4uc2V0dGluZ3MuaWQsXG5cdFx0XHRcdFx0XHRcdHJvbGUgICAgICAgICAgIDogJ2NoZWNrYm94Jyxcblx0XHRcdFx0XHRcdFx0J2FyaWEtY2hlY2tlZCcgOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0Zm9jdXNhYmxlICAgICAgOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR0YWJJbmRleCAgICAgICA6IC0xIC8vbWFudWFsIGZvY3VzXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LnRleHQoZm4uc2V0dGluZ3MubGFiZWwpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoWydzZWF0Q2hhcnRzLXNlYXQnLCAnc2VhdENoYXJ0cy1jZWxsJywgJ2F2YWlsYWJsZSddLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0Ly9sZXQncyBtZXJnZSBjdXN0b20gdXNlciBkZWZpbmVkIGNsYXNzZXMgd2l0aCBzdGFuZGFyZCBKU0Mgb25lc1xuXHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy5jbGFzc2VzLCBcblx0XHRcdFx0XHRcdFx0dHlwZW9mIHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tmbi5zZXR0aW5ncy5jaGFyYWN0ZXJdID09IFwidW5kZWZpbmVkXCIgPyBcblx0XHRcdFx0XHRcdFx0XHRbXSA6IHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tmbi5zZXR0aW5ncy5jaGFyYWN0ZXJdLmNsYXNzZXNcblx0XHRcdFx0XHRcdFx0KS5qb2luKCcgJykpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vYmFzaWNhbGx5IGEgd3JhcHBlciBmdW5jdGlvblxuXHRcdFx0XHRcdGZuLmRhdGEgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5kYXRhO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uY2hhciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLmNoYXJhY3Rlcjtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLm5vZGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy4kbm9kZTtcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHQgKiBDYW4gZWl0aGVyIHNldCBvciByZXR1cm4gc3RhdHVzIGRlcGVuZGluZyBvbiBhcmd1bWVudHMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB0aGVyZSdzIG5vIGFyZ3VtZW50LCBpdCB3aWxsIHJldHVybiB0aGUgY3VycmVudCBzdHlsZS5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHlvdSBwYXNzIGFuIGFyZ3VtZW50LCBpdCB3aWxsIHVwZGF0ZSBzZWF0J3Mgc3R5bGVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRmbi5zdHlsZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID9cblx0XHRcdFx0XHRcdFx0KGZ1bmN0aW9uKG5ld1N0eWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG9sZFN0eWxlID0gZm4uc2V0dGluZ3Muc3R5bGU7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIG5vdGhpbmcgY2hhbmdlcywgZG8gbm90aGluZ1xuXHRcdFx0XHRcdFx0XHRcdGlmIChuZXdTdHlsZSA9PSBvbGRTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9sZFN0eWxlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvL2ZvY3VzZWQgaXMgYSBzcGVjaWFsIHN0eWxlIHdoaWNoIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggc3RhdHVzXG5cdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3Muc3RhdHVzID0gbmV3U3R5bGUgIT0gJ2ZvY3VzZWQnID8gbmV3U3R5bGUgOiBmbi5zZXR0aW5ncy5zdGF0dXM7XG5cdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGVcblx0XHRcdFx0XHRcdFx0XHRcdC5hdHRyKCdhcmlhLWNoZWNrZWQnLCBuZXdTdHlsZSA9PSAnc2VsZWN0ZWQnKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vaWYgdXNlciB3YW50cyB0byBhbmltYXRlIHN0YXR1cyBjaGFuZ2VzLCBsZXQgaGltIGRvIHRoaXNcblx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzU2V0dGluZ3MuYW5pbWF0ZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZS5zd2l0Y2hDbGFzcyhvbGRTdHlsZSwgbmV3U3R5bGUsIDIwMCkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUucmVtb3ZlQ2xhc3Mob2xkU3R5bGUpLmFkZENsYXNzKG5ld1N0eWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5zdHlsZSA9IG5ld1N0eWxlO1xuXHRcdFx0XHRcdFx0XHR9KShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3R5bGU7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2VpdGhlciBzZXQgb3IgcmV0cmlldmVcblx0XHRcdFx0XHRmbi5zdGF0dXMgPSBmdW5jdGlvbigpIHtcblx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3RhdHVzID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gXG5cdFx0XHRcdFx0XHRcdGZuLnN0eWxlKGFyZ3VtZW50c1swXSkgOiBmbi5zZXR0aW5ncy5zdGF0dXM7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL3VzaW5nIGltbWVkaWF0ZSBmdW5jdGlvbiB0byBjb252aWVuaWV0bHkgZ2V0IHNob3J0Y3V0IHZhcmlhYmxlc1xuXHRcdFx0XHRcdChmdW5jdGlvbihzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCkge1xuXHRcdFx0XHRcdFx0Ly9hdHRhY2ggZXZlbnQgaGFuZGxlcnNcblx0XHRcdFx0XHRcdCQuZWFjaChbJ2NsaWNrJywgJ2ZvY3VzJywgJ2JsdXInXSwgZnVuY3Rpb24oaW5kZXgsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Ly93ZSB3YW50IHRvIGJlIGFibGUgdG8gY2FsbCB0aGUgZnVuY3Rpb25zIGZvciBlYWNoIHNlYXQgb2JqZWN0XG5cdFx0XHRcdFx0XHRcdGZuW2NhbGxiYWNrXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFjayA9PSAnZm9jdXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZXJlJ3MgYWxyZWFkeSBhIGZvY3VzZWQgZWxlbWVudCwgd2UgaGF2ZSB0byByZW1vdmUgZm9jdXMgZnJvbSBpdCBmaXJzdFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JykgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1tzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIHNlYXQuc2V0dGluZ3MuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ub2RlKCkuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0ICogVXNlciBjYW4gcGFzcyBoaXMgb3duIGNhbGxiYWNrIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIGZpcnN0IGNoZWNrIGlmIGl0IGV4aXN0c1xuXHRcdFx0XHRcdFx0XHRcdCAqIGFuZCBpZiBub3QsIHVzZSBvdXIgZGVmYXVsdCBjYWxsYmFjay5cblx0XHRcdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0XHRcdCAqIEVhY2ggY2FsbGJhY2sgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgaW4gdGhlIGN1cnJlbnQgc2VhdCBjb250ZXh0LlxuXHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmbi5zdHlsZSh0eXBlb2Ygc2VhdFNldHRpbmdzW2NoYXJhY3Rlcl1bY2FsbGJhY2tdID09PSAnZnVuY3Rpb24nID9cblx0XHRcdFx0XHRcdFx0XHRcdHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXS5hcHBseShzZWF0KSA6IHNlYXRDaGFydHNTZXR0aW5nc1tjYWxsYmFja10uYXBwbHkoc2VhdCkpO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vdGhlIGJlbG93IHdpbGwgYmVjb21lIHNlYXRTZXR0aW5ncywgY2hhcmFjdGVyLCBzZWF0IHRoYW5rcyB0byB0aGUgaW1tZWRpYXRlIGZ1bmN0aW9uXHRcdFxuXHRcdFx0XHRcdH0pKHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0cywgZm4uc2V0dGluZ3MuY2hhcmFjdGVyLCBmbik7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLm5vZGUoKVxuXHRcdFx0XHRcdFx0Ly90aGUgZmlyc3QgdGhyZWUgbW91c2UgZXZlbnRzIGFyZSBzaW1wbGVcblx0XHRcdFx0XHRcdC5vbignY2xpY2snLCAgICAgIGZuLmNsaWNrKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWVudGVyJywgZm4uZm9jdXMpXG5cdFx0XHRcdFx0XHQub24oJ21vdXNlbGVhdmUnLCBmbi5ibHVyKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvL2tleWRvd24gcmVxdWlyZXMgcXVpdGUgYSBsb3Qgb2YgbG9naWMsIGJlY2F1c2Ugd2UgaGF2ZSB0byBrbm93IHdoZXJlIHRvIG1vdmUgdGhlIGZvY3VzXG5cdFx0XHRcdFx0XHQub24oJ2tleWRvd24nLCAgICAoZnVuY3Rpb24oc2VhdCwgJHNlYXQpIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1NlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9ldmVyeXRoaW5nIGRlcGVuZHMgb24gdGhlIHByZXNzZWQga2V5XG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChlLndoaWNoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL3NwYWNlYmFyIHdpbGwganVzdCB0cmlnZ2VyIHRoZSBzYW1lIGV2ZW50IG1vdXNlIGNsaWNrIGRvZXNcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5jbGljaygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdC8vVVAgJiBET1dOXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVGhpcyBpcyBhIHJlY3Vyc2l2ZSwgaW1tZWRpYXRlIGZ1bmN0aW9uIHdoaWNoIHNlYXJjaGVzIGZvciB0aGUgZmlyc3QgXCJmb2N1c2FibGVcIiByb3cuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBXZSdyZSB1c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gYmVjYXVzZSB3ZSB3YW50IGEgY29udmVuaWVudCBhY2Nlc3MgdG8gc29tZSBET00gZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgcmVjdXJzaW9uIGJlY2F1c2Ugc29tZXRpbWVzIHdlIG1heSBoaXQgYW4gZW1wdHkgc3BhY2UgcmF0aGVyIHRoYW4gYSBzZWF0LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAoZnVuY3Rpb24gZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkY3VycmVudFJvdykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciAkbmV3Um93O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbGV0J3MgZGV0ZXJtaW5lIHdoaWNoIHJvdyBzaG91bGQgd2UgbW92ZSB0b1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICYmIGUud2hpY2ggPT0gMzgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhpcyBpcyB0aGUgZmlyc3Qgcm93IGFuZCB1c2VyIGhhcyBwcmVzc2VkIHVwIGFycm93LCBtb3ZlIHRvIHRoZSBsYXN0IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRyb3dzLmluZGV4KCRjdXJyZW50Um93KSA9PSAkcm93cy5sZW5ndGgtMSAmJiBlLndoaWNoID09IDQwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGxhc3Qgcm93IGFuZCB1c2VyIGhhcyBwcmVzc2VkIGRvd24gYXJyb3csIG1vdmUgdG8gdGhlIGZpcnN0IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNpbmcgZXEgdG8gZ2V0IGFuIGVsZW1lbnQgYXQgdGhlIGRlc2lyZWQgaW5kZXggcG9zaXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5lcShcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB1cCBhcnJvdywgdGhlbiBkZWNyZW1lbnQgdGhlIGluZGV4LCBpZiBkb3duIGluY3JlbWVudCBpdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkcm93cy5pbmRleCgkY3VycmVudFJvdykgKyAoZS53aGljaCA9PSAzOCA/ICgtMSkgOiAoKzEpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9ub3cgdGhhdCB3ZSBrbm93IHRoZSByb3csIGxldCdzIGdldCB0aGUgc2VhdCB1c2luZyB0aGUgY3VycmVudCBjb2x1bW4gcG9zaXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9ICRuZXdSb3cuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLmVxKCRzZWF0cy5pbmRleCgkc2VhdCkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhlIHNlYXQgd2UgZm91bmQgaXMgYSBzcGFjZSwga2VlcCBsb29raW5nIGZ1cnRoZXJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJG5ld1NlYXQuaGFzQ2xhc3MoJ3NlYXRDaGFydHMtc3BhY2UnKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaW5kQXZhaWxhYmxlKCRyb3dzLCAkc2VhdHMsICRuZXdSb3cpIDogJG5ld1NlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250YWluZXIgYW5kIHRoZW4gc2VsZWN0IGFsbCByb3dzIGJ1dCB0aGUgaGVhZGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtY29udGFpbmVyJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1yb3c6bm90KC5zZWF0Q2hhcnRzLWhlYWRlciknKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgcm93IGFuZCB0aGVuIGZpbmQgYWxsIHNlYXQgY2VsbHMgKGJvdGggc2VhdHMgJiBzcGFjZXMpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtcm93OmZpcnN0Jylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0LC5zZWF0Q2hhcnRzLXNwYWNlJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXQucGFyZW50cygnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vd2UgY291bGRuJ3QgZGV0ZXJtaW5lIHRoZSBuZXcgc2VhdCwgc28gd2UgYmV0dGVyIGdpdmUgdXBcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkbmV3U2VhdC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vcmVtb3ZlIGZvY3VzIGZyb20gdGhlIG9sZCBzZWF0IGFuZCBwdXQgaXQgb24gdGhlIG5ldyBvbmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ibHVyKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzWyRuZXdTZWF0LmF0dHIoJ2lkJyldLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0LmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBvdXIgXCJhcmlhXCIgcmVmZXJlbmNlIHdpdGggdGhlIG5ldyBzZWF0IGlkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgJG5ld1NlYXQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly9MRUZUICYgUklHSFRcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoZSBsb2dpYyBoZXJlIGlzIHNsaWdodGx5IGRpZmZlcmVudCBmcm9tIHRoZSBvbmUgZm9yIHVwL2Rvd24gYXJyb3dzLlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBVc2VyIHdpbGwgYmUgYWJsZSB0byBicm93c2UgdGhlIHdob2xlIG1hcCB1c2luZyBqdXN0IGxlZnQvcmlnaHQgYXJyb3csIGJlY2F1c2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogaXQgd2lsbCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyB3aGVuIHdlIHJlYWNoIHRoZSByaWdodC9sZWZ0LW1vc3Qgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uKCRzZWF0cykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRzZWF0cy5pbmRleCgkc2VhdCkgJiYgZS53aGljaCA9PSAzNykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2VyIGhhcyBwcmVzc2VkIGxlZnQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgbGVmdC1tb3N0IHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMubGFzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoJHNlYXRzLmluZGV4KCRzZWF0KSA9PSAkc2VhdHMubGVuZ3RoIC0xICYmIGUud2hpY2ggPT0gMzkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCByaWdodCBhcnJvdyBhbmQgd2UncmUgY3VycmVudGx5IG9uIHRoZSByaWdodC1tb3N0IHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMuZmlyc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9zaW1wbHkgbW92ZSBvbmUgc2VhdCBsZWZ0IG9yIHJpZ2h0IGRlcGVuZGluZyBvbiB0aGUga2V5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmVxKCRzZWF0cy5pbmRleCgkc2VhdCkgKyAoZS53aGljaCA9PSAzNyA/ICgtMSkgOiAoKzEpKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcjpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQ6bm90KC5zZWF0Q2hhcnRzLXNwYWNlKScpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vaGFuZGxlIGZvY3VzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1x0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzWyRuZXdTZWF0LmF0dHIoJ2lkJyldLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0LmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBvdXIgXCJhcmlhXCIgcmVmZXJlbmNlIHdpdGggdGhlIG5ldyBzZWF0IGlkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgJG5ld1NlYXQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1x0XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KShmbiwgZm4ubm9kZSgpKSk7XG5cdFx0XHRcdFx0XHQvLy5hcHBlbmRUbyhzZWF0Q2hhcnRzLmZpbmQoJy4nICsgcm93KSk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSkoZm4sIHNldHRpbmdzKTtcblx0XHRcdFxuXHRcdGZuLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNvbnRhaW5lcicpO1xuXHRcdFxuXHRcdC8vdHJ1ZSAtPiBkZWVwIGNvcHkhXG5cdFx0JC5leHRlbmQodHJ1ZSwgc2V0dGluZ3MsIHNldHVwKTtcdFx0XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IHJvdyBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcucm93cyA9IHNldHRpbmdzLm5hbWluZy5yb3dzIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciByb3dzID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3dzLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcm93cztcblx0XHR9KShzZXR0aW5ncy5tYXAubGVuZ3RoKTtcblx0XHRcblx0XHQvL0dlbmVyYXRlIGRlZmF1bHQgY29sdW1uIGlkcyB1bmxlc3MgdXNlciBwYXNzZWQgaGlzIG93blxuXHRcdHNldHRpbmdzLm5hbWluZy5jb2x1bW5zID0gc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMgfHwgKGZ1bmN0aW9uKGxlbmd0aCkge1xuXHRcdFx0dmFyIGNvbHVtbnMgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbHVtbnMucHVzaChpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjb2x1bW5zO1xuXHRcdH0pKHNldHRpbmdzLm1hcFswXS5zcGxpdCgnJykubGVuZ3RoKTtcblx0XHRcblx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLnRvcCkge1xuXHRcdFx0dmFyICRoZWFkZXJSb3cgPSAkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1yb3cgc2VhdENoYXJ0cy1oZWFkZXInKTtcblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLm5hbWluZy5sZWZ0KSB7XG5cdFx0XHRcdCRoZWFkZXJSb3cuYXBwZW5kKCQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5uYW1pbmcuY29sdW1ucywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG5cdFx0XHRcdCRoZWFkZXJSb3cuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsJylcblx0XHRcdFx0XHRcdC50ZXh0KHZhbHVlKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdFxuXHRcdGZuLmFwcGVuZCgkaGVhZGVyUm93KTtcblx0XHRcblx0XHQvL2RvIHRoaXMgZm9yIGVhY2ggbWFwIHJvd1xuXHRcdCQuZWFjaChzZXR0aW5ncy5tYXAsIGZ1bmN0aW9uKHJvdywgY2hhcmFjdGVycykge1xuXG5cdFx0XHR2YXIgJHJvdyA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93Jyk7XG5cdFx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLm5hbWluZy5sZWZ0KSB7XG5cdFx0XHRcdCRyb3cuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVxuXHRcdFx0XHRcdFx0LnRleHQoc2V0dGluZ3MubmFtaW5nLnJvd3Nbcm93XSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Lypcblx0XHRcdCAqIERvIHRoaXMgZm9yIGVhY2ggc2VhdCAobGV0dGVyKVxuXHRcdFx0ICpcblx0XHRcdCAqIE5vdyB1c2VycyB3aWxsIGJlIGFibGUgdG8gcGFzcyBjdXN0b20gSUQgYW5kIGxhYmVsIHdoaWNoIG92ZXJ3cml0ZSB0aGUgb25lIHRoYXQgc2VhdCB3b3VsZCBiZSBhc3NpZ25lZCBieSBnZXRJZCBhbmRcblx0XHRcdCAqIGdldExhYmVsXG5cdFx0XHQgKlxuXHRcdFx0ICogTmV3IGZvcm1hdCBpcyBsaWtlIHRoaXM6XG5cdFx0XHQgKiBhW0lELGxhYmVsXWFbSURdYWFhYWFcblx0XHRcdCAqXG5cdFx0XHQgKiBTbyB5b3UgY2FuIG92ZXJ3cml0ZSB0aGUgSUQgb3IgbGFiZWwgKG9yIGJvdGgpIGV2ZW4gZm9yIGp1c3Qgb25lIHNlYXQuXG5cdFx0XHQgKiBCYXNpY2FsbHkgSUQgc2hvdWxkIGJlIGZpcnN0LCBzbyBpZiB5b3Ugd2FudCB0byBvdmVyd3JpdGUganVzdCBsYWJlbCB3cml0ZSBpdCBhcyBmb2xsb3dzOlxuXHRcdFx0ICogYVssTEFCRUxdXG5cdFx0XHQgKlxuXHRcdFx0ICogQWxsb3dlZCBjaGFyYWN0ZXJzIGluIElEcyBhcmVMIDAtOSwgYS16LCBBLVosIF9cblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBsYWJlbHMgYXJlOiAwLTksIGEteiwgQS1aLCBfLCAnICcgKHNwYWNlKVxuXHRcdFx0ICpcblx0XHRcdCAqL1xuXHRcdFx0IFxuXHRcdFx0JC5lYWNoKGNoYXJhY3RlcnMubWF0Y2goL1thLXpfXXsxfShcXFtbMC05YS16X117MCx9KCxbMC05YS16XyBdKyk/XFxdKT8vZ2kpLCBmdW5jdGlvbiAoY29sdW1uLCBjaGFyYWN0ZXJQYXJhbXMpIHsgXG5cdFx0XHRcdHZhciBtYXRjaGVzICAgICAgICAgPSBjaGFyYWN0ZXJQYXJhbXMubWF0Y2goLyhbYS16X117MX0pKFxcWyhbMC05YS16XyAsXSspXFxdKT8vaSksXG5cdFx0XHRcdFx0Ly9ubyBtYXR0ZXIgaWYgdXNlciBzcGVjaWZpZXMgW10gcGFyYW1zLCB0aGUgY2hhcmFjdGVyIHNob3VsZCBiZSBpbiB0aGUgc2Vjb25kIGVsZW1lbnRcblx0XHRcdFx0XHRjaGFyYWN0ZXIgICAgICAgPSBtYXRjaGVzWzFdLFxuXHRcdFx0XHRcdC8vY2hlY2sgaWYgdXNlciBoYXMgcGFzc2VkIHNvbWUgYWRkaXRpb25hbCBwYXJhbXMgdG8gb3ZlcnJpZGUgaWQgb3IgbGFiZWxcblx0XHRcdFx0XHRwYXJhbXMgICAgICAgICAgPSB0eXBlb2YgbWF0Y2hlc1szXSAhPT0gJ3VuZGVmaW5lZCcgPyBtYXRjaGVzWzNdLnNwbGl0KCcsJykgOiBbXSxcblx0XHRcdFx0XHQvL2lkIHBhcmFtIHNob3VsZCBiZSBmaXJzdFxuXHRcdFx0XHRcdG92ZXJyaWRlSWQgICAgICA9IHBhcmFtcy5sZW5ndGggPyBwYXJhbXNbMF0gOiBudWxsLFxuXHRcdFx0XHRcdC8vbGFiZWwgcGFyYW0gc2hvdWxkIGJlIHNlY29uZFxuXHRcdFx0XHRcdG92ZXJyaWRlTGFiZWwgICA9IHBhcmFtcy5sZW5ndGggPT09IDIgPyBwYXJhbXNbMV0gOiBudWxsO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHQkcm93LmFwcGVuZChjaGFyYWN0ZXIgIT0gJ18nID9cblx0XHRcdFx0XHQvL2lmIHRoZSBjaGFyYWN0ZXIgaXMgbm90IGFuIHVuZGVyc2NvcmUgKGVtcHR5IHNwYWNlKVxuXHRcdFx0XHRcdChmdW5jdGlvbihuYW1pbmcpIHtcblx0XG5cdFx0XHRcdFx0XHQvL3NvIHVzZXJzIGRvbid0IGhhdmUgdG8gc3BlY2lmeSBlbXB0eSBvYmplY3RzXG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5zZWF0c1tjaGFyYWN0ZXJdID0gY2hhcmFjdGVyIGluIHNldHRpbmdzLnNlYXRzID8gc2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA6IHt9O1xuXHRcblx0XHRcdFx0XHRcdHZhciBpZCA9IG92ZXJyaWRlSWQgPyBvdmVycmlkZUlkIDogbmFtaW5nLmdldElkKGNoYXJhY3RlciwgbmFtaW5nLnJvd3Nbcm93XSwgbmFtaW5nLmNvbHVtbnNbY29sdW1uXSk7XG5cdFx0XHRcdFx0XHRzZWF0c1tpZF0gPSBuZXcgc2VhdCh7XG5cdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IGlkLFxuXHRcdFx0XHRcdFx0XHRsYWJlbCAgICAgOiBvdmVycmlkZUxhYmVsID9cblx0XHRcdFx0XHRcdFx0XHRvdmVycmlkZUxhYmVsIDogbmFtaW5nLmdldExhYmVsKGNoYXJhY3RlciwgbmFtaW5nLnJvd3Nbcm93XSwgbmFtaW5nLmNvbHVtbnNbY29sdW1uXSksXG5cdFx0XHRcdFx0XHRcdHJvdyAgICAgICA6IHJvdyxcblx0XHRcdFx0XHRcdFx0Y29sdW1uICAgIDogY29sdW1uLFxuXHRcdFx0XHRcdFx0XHRjaGFyYWN0ZXIgOiBjaGFyYWN0ZXJcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRzZWF0SWRzLnB1c2goaWQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRzW2lkXS5ub2RlKCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9KShzZXR0aW5ncy5uYW1pbmcpIDpcblx0XHRcdFx0XHQvL3RoaXMgaXMganVzdCBhbiBlbXB0eSBzcGFjZSAoXylcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwgc2VhdENoYXJ0cy1zcGFjZScpXHRcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRmbi5hcHBlbmQoJHJvdyk7XG5cdFx0fSk7XG5cdFxuXHRcdC8vaWYgdGhlcmUncmUgYW55IGxlZ2VuZCBpdGVtcyB0byBiZSByZW5kZXJlZFxuXHRcdHNldHRpbmdzLmxlZ2VuZC5pdGVtcy5sZW5ndGggPyAoZnVuY3Rpb24obGVnZW5kKSB7XG5cdFx0XHQvL2VpdGhlciB1c2UgdXNlci1kZWZpbmVkIGNvbnRhaW5lciBvciBjcmVhdGUgb3VyIG93biBhbmQgaW5zZXJ0IGl0IHJpZ2h0IGFmdGVyIHRoZSBzZWF0IGNoYXJ0IGRpdlxuXHRcdFx0dmFyICRjb250YWluZXIgPSAobGVnZW5kLm5vZGUgfHwgJCgnPGRpdj48L2Rpdj4nKS5pbnNlcnRBZnRlcihmbikpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmQnKTtcblx0XHRcdFx0XG5cdFx0XHR2YXIgJHVsID0gJCgnPHVsPjwvdWw+Jylcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZExpc3QnKVxuXHRcdFx0XHQuYXBwZW5kVG8oJGNvbnRhaW5lcik7XG5cdFx0XHRcblx0XHRcdCQuZWFjaChsZWdlbmQuaXRlbXMsIGZ1bmN0aW9uKGluZGV4LCBpdGVtKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRJdGVtJylcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdFx0XHQvL21lcmdlIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggb3VyIHN0YW5kYXJkIG9uZXNcblx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoWydzZWF0Q2hhcnRzLXNlYXQnLCAnc2VhdENoYXJ0cy1jZWxsJywgaXRlbVsxXV0uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0c2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2Ygc2V0dGluZ3Muc2VhdHNbaXRlbVswXV0gPT0gXCJ1bmRlZmluZWRcIiA/IFtdIDogc2V0dGluZ3Muc2VhdHNbaXRlbVswXV0uY2xhc3Nlcykuam9pbignICcpXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0LmFwcGVuZChcblx0XHRcdFx0XHRcdFx0JCgnPHNwYW4+PC9zcGFuPicpXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZERlc2NyaXB0aW9uJylcblx0XHRcdFx0XHRcdFx0XHQudGV4dChpdGVtWzJdKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiAkY29udGFpbmVyO1xuXHRcdH0pKHNldHRpbmdzLmxlZ2VuZCkgOiBudWxsO1xuXHRcblx0XHRmbi5hdHRyKHtcblx0XHRcdHRhYkluZGV4IDogMFxuXHRcdH0pO1xuXHRcdFxuXHRcdFxuXHRcdC8vd2hlbiBjb250YWluZXIncyBmb2N1c2VkLCBtb3ZlIGZvY3VzIHRvIHRoZSBmaXJzdCBzZWF0XG5cdFx0Zm4uZm9jdXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoZm4uYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JykpIHtcblx0XHRcdFx0c2VhdHNbZm4uYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JyldLmJsdXIoKTtcblx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRmbi5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSk6Zmlyc3QnKS5mb2N1cygpO1xuXHRcdFx0c2VhdHNbc2VhdElkc1swXV0uZm9jdXMoKTtcblxuXHRcdH0pO1xuXHRcblx0XHQvL3B1YmxpYyBtZXRob2RzIG9mIHNlYXRDaGFydHNcblx0XHRmbi5kYXRhKCdzZWF0Q2hhcnRzJywge1xuXHRcdFx0c2VhdHMgICA6IHNlYXRzLFxuXHRcdFx0c2VhdElkcyA6IHNlYXRJZHMsXG5cdFx0XHQvL3NldCBmb3Igb25lLCBzZXQgZm9yIG1hbnksIGdldCBmb3Igb25lXG5cdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBmbi5zZWF0c1thcmd1bWVudHNbMF1dLnN0YXR1cygpIDogKGZ1bmN0aW9uKHNlYXRzSWRzLCBuZXdTdGF0dXMpIHtcblx0XHRcdFx0XG5cdFx0XHRcdFx0cmV0dXJuIHR5cGVvZiBzZWF0c0lkcyA9PSAnc3RyaW5nJyA/IGZuLnNlYXRzW3NlYXRzSWRzXS5zdGF0dXMobmV3U3RhdHVzKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0SWRdLnN0YXR1cyhuZXdTdGF0dXMpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fSkoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdFx0fSxcblx0XHRcdGVhY2ggIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRmb3IgKHZhciBzZWF0SWQgaW4gZm4uc2VhdHMpIHtcblx0XHRcdFx0XHRpZiAoZmFsc2UgPT09IGNhbGxiYWNrLmNhbGwoZm4uc2VhdHNbc2VhdElkXSwgc2VhdElkKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRJZDsvL3JldHVybiBsYXN0IGNoZWNrZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdG5vZGUgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0Ly9iYXNpY2FsbHkgY3JlYXRlIGEgQ1NTIHF1ZXJ5IHRvIGdldCBhbGwgc2VhdHMgYnkgdGhlaXIgRE9NIGlkc1xuXHRcdFx0XHRyZXR1cm4gJCgnIycgKyBmbi5zZWF0SWRzLmpvaW4oJywjJykpO1xuXHRcdFx0fSxcblxuXHRcdFx0ZmluZCAgICAgICA6IGZ1bmN0aW9uKHF1ZXJ5KSB7Ly9ELCBhLmF2YWlsYWJsZSwgdW5hdmFpbGFibGVcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHR2YXIgc2VhdFNldCA9IGZuLnNldCgpO1xuXHRcdFx0XG5cdFx0XHRcdC8vaXMgUmVnRXhwXG5cdFx0ICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeSBpbnN0YW5jZW9mIFJlZ0V4cCA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC5tYXRjaChxdWVyeSkpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaChpZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgIH0pKCkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgKHF1ZXJ5Lmxlbmd0aCA9PSAxID9cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChjaGFyYWN0ZXIpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlciBzZWFyY2hlcyBqdXN0IGZvciBhIHBhcnRpY3VhbCBjaGFyYWN0ZXJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXIoKSA9PSBjaGFyYWN0ZXIpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKHF1ZXJ5KSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgcnVucyBhIG1vcmUgc29waGlzdGljYXRlZCBxdWVyeSwgc28gbGV0J3Mgc2VlIGlmIHRoZXJlJ3MgYSBkb3Rcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeS5pbmRleE9mKCcuJykgPiAtMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGVyZSdzIGEgZG90IHdoaWNoIHNlcGFyYXRlcyBjaGFyYWN0ZXIgYW5kIHRoZSBzdGF0dXNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gcXVlcnkuc3BsaXQoJy4nKTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoc2VhdElkKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gcGFydHNbMF0gJiYgdGhpcy5zdGF0dXMoKSA9PSBwYXJ0c1sxXSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gcXVlcnkpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRzZXQgICAgICAgIDogZnVuY3Rpb24gc2V0KCkgey8vaW5oZXJpdHMgc29tZSBtZXRob2RzXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHNlYXRzICAgICAgOiBbXSxcblx0XHRcdFx0XHRzZWF0SWRzICAgIDogW10sXG5cdFx0XHRcdFx0bGVuZ3RoICAgICA6IDAsXG5cdFx0XHRcdFx0c3RhdHVzICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHMsXG5cdFx0XHRcdFx0XHRcdHRoYXQgPSB0aGlzO1xuXHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGp1c3Qgb25lIHNlYXQgaW4gdGhlIHNldCBhbmQgdXNlciBkaWRuJ3QgcGFzcyBhbnkgcGFyYW1zLCByZXR1cm4gY3VycmVudCBzdGF0dXNcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmxlbmd0aCA9PSAxICYmIGFyZ3MubGVuZ3RoID09IDAgPyB0aGlzLnNlYXRzWzBdLnN0YXR1cygpIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHQvL290aGVyd2lzZSBjYWxsIHN0YXR1cyBmdW5jdGlvbiBmb3IgZWFjaCBvZiB0aGUgc2VhdHMgaW4gdGhlIHNldFxuXHRcdFx0XHRcdFx0XHQkLmVhY2godGhhdC5zZWF0cywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zdGF0dXMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG5vZGUgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5ub2RlLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRlYWNoICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZWFjaC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXQgICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZ2V0LmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5maW5kLmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldC5jYWxsKGZuKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHB1c2ggICAgICAgOiBmdW5jdGlvbihpZCwgc2VhdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWF0cy5wdXNoKHNlYXQpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZWF0SWRzLnB1c2goaWQpO1xuXHRcdFx0XHRcdFx0Kyt0aGlzLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0Ly9nZXQgb25lIG9iamVjdCBvciBhIHNldCBvZiBvYmplY3RzXG5cdFx0XHRnZXQgICA6IGZ1bmN0aW9uKHNlYXRzSWRzKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBzZWF0c0lkcyA9PSAnc3RyaW5nJyA/IFxuXHRcdFx0XHRcdGZuLnNlYXRzW3NlYXRzSWRzXSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0JC5lYWNoKHNlYXRzSWRzLCBmdW5jdGlvbihpbmRleCwgc2VhdElkKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZm4uc2VhdHNbc2VhdElkXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0LnB1c2goc2VhdElkLCBmbi5zZWF0c1tzZWF0SWRdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0U2V0O1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0cmV0dXJuIGZuLmRhdGEoJ3NlYXRDaGFydHMnKTtcblx0fVxuXHRcblx0XG59KShqUXVlcnkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvanF1ZXJ5LnNlYXQtY2hhcnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==