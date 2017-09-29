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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmZlYThmYmVlM2ZlMTI2M2MyNGIiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiYWpheENoYW5nZVF0ZVBhbmllciIsInRvdGFsIiwiaSIsInByaXgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJUZXh0IiwidGhlbnVtIiwibWF0Y2giLCJlIiwic3RyVXNlciIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidmFsdWUiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJpbm5lckhUTUwiLCIkIiwib24iLCJjb25zb2xlIiwibG9nIiwidmFsIiwiYWpheCIsInVybCIsIlJvdXRpbmciLCJnZW5lcmF0ZSIsInR5cGUiLCJkYXRhIiwiYXN5bmMiLCJzdWNjZXNzIiwicmVzcG9uc2VQYW5pZXIiLCJ0ZXh0U3RhdHVzIiwiZW1wdHkiLCJhcHBlbmQiLCJlcnJvciIsImFsZXJ0IiwidGhhdCIsImxvYWQiLCJmYWRlSW4iLCJyZXNwb25zZVByb2R1aXRzIiwiaGlkZSIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwicmVzcG9uc2UiLCJzaG93IiwiaWRTYWxsZSIsImlzRGlzcG8iLCJyZWZyZXNoUGFuaWVyIiwiZmlyc3RTZWF0TGFiZWwiLCJyZWFkeSIsImxlbmd0aCIsImluaXRDYXJ0ZUludGVyYWN0aXZlIiwiJGNhcnQiLCIkY291bnRlciIsIiR0b3RhbCIsInNjIiwic2VhdENoYXJ0cyIsIm1hcCIsInNlYXRzIiwiZiIsInByaWNlIiwiY2xhc3NlcyIsImNhdGVnb3J5IiwibmFtaW5nIiwidG9wIiwiZ2V0TGFiZWwiLCJjaGFyYWN0ZXIiLCJyb3ciLCJjb2x1bW4iLCJsZWdlbmQiLCJub2RlIiwiaXRlbXMiLCJjbGljayIsInN0YXR1cyIsInNldHRpbmdzIiwibGFiZWwiLCJhdHRyIiwiaWQiLCJhcHBlbmRUbyIsImZpbmQiLCJyZWNhbGN1bGF0ZVRvdGFsIiwicmVtb3ZlIiwic3R5bGUiLCJnZXQiLCJwYXJlbnRzIiwiZWFjaCIsImZuIiwic2V0dXAiLCJzZWF0SWRzIiwiYW5pbWF0ZSIsImxlZnQiLCJnZXRJZCIsImZvY3VzIiwiYmx1ciIsInNlYXQiLCJzZWF0Q2hhcnRzU2V0dGluZ3MiLCJleHRlbmQiLCIkbm9kZSIsInJvbGUiLCJmb2N1c2FibGUiLCJ0YWJJbmRleCIsImFkZENsYXNzIiwiY29uY2F0Iiwiam9pbiIsImNoYXIiLCJhcmd1bWVudHMiLCJuZXdTdHlsZSIsIm9sZFN0eWxlIiwic3dpdGNoQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNlYXRTZXR0aW5ncyIsImluZGV4IiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJhcHBseSIsIiRzZWF0IiwiJG5ld1NlYXQiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0IiwiZmluZEF2YWlsYWJsZSIsIiRyb3dzIiwiJHNlYXRzIiwiJGN1cnJlbnRSb3ciLCIkbmV3Um93IiwibGFzdCIsImZpcnN0IiwiZXEiLCJoYXNDbGFzcyIsInJvd3MiLCJwdXNoIiwiY29sdW1ucyIsInNwbGl0IiwiJGhlYWRlclJvdyIsImNoYXJhY3RlcnMiLCIkcm93IiwiY2hhcmFjdGVyUGFyYW1zIiwibWF0Y2hlcyIsInBhcmFtcyIsIm92ZXJyaWRlSWQiLCJvdmVycmlkZUxhYmVsIiwiJGNvbnRhaW5lciIsImluc2VydEFmdGVyIiwiJHVsIiwiaXRlbSIsInNlYXRzSWRzIiwibmV3U3RhdHVzIiwic2VhdElkIiwiY2FsbCIsInF1ZXJ5Iiwic2VhdFNldCIsInNldCIsIlJlZ0V4cCIsImluZGV4T2YiLCJwYXJ0cyIsImFyZ3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RJLFNBQVNBLG1CQUFULEdBQStCO0FBQzNCO0FBQ0EsUUFBSUMsUUFBUSxDQUFaOztBQUVBO0FBQ0EsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQ3hCO0FBQ0EsWUFBSUMsT0FBT0MsU0FBU0MsY0FBVCxDQUF3QixTQUFTSCxDQUFqQyxFQUFvQ0ksU0FBL0M7O0FBRUE7QUFDQSxZQUFJQyxTQUFTSixLQUFLSyxLQUFMLENBQVcsS0FBWCxFQUFrQixDQUFsQixDQUFiOztBQUVBO0FBQ0EsWUFBSUMsSUFBSUwsU0FBU0MsY0FBVCxDQUF3QixRQUFRSCxDQUFoQyxDQUFSO0FBQ0E7QUFDQSxZQUFJUSxVQUFVRCxFQUFFRSxPQUFGLENB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eUMsSUFBYixDQUFrQnBELEVBQWxCO0FBQ0EsUUFBRSxLQUFLM0IsTUFBUDtBQUNBO0FBbENLLEtBQVA7QUFvQ0EsSUE3SG9CO0FBOEhyQjtBQUNBaUMsUUFBUSxhQUFTNkQsUUFBVCxFQUFtQjtBQUMxQixRQUFJMUQsS0FBSyxJQUFUOztBQUVBLFdBQU8sT0FBTzBELFFBQVAsSUFBbUIsUUFBbkIsR0FDTjFELEdBQUc1QixLQUFILENBQVNzRixRQUFULENBRE0sR0FDZ0IsWUFBVzs7QUFFaEMsU0FBSUssVUFBVS9ELEdBQUdnRSxHQUFILEVBQWQ7O0FBRUF6SSxPQUFFd0UsSUFBRixDQUFPMkQsUUFBUCxFQUFpQixVQUFTakMsS0FBVCxFQUFnQm1DLE1BQWhCLEVBQXdCO0FBQ3hDLFVBQUksUUFBTzVELEdBQUc1QixLQUFILENBQVN3RixNQUFULENBQVAsTUFBNEIsUUFBaEMsRUFBMEM7QUFDekNHLGVBQVFwQixJQUFSLENBQWFpQixNQUFiLEVBQXFCNUQsR0FBRzVCLEtBQUgsQ0FBU3dGLE1BQVQsQ0FBckI7QUFDQTtBQUNELE1BSkQ7O0FBTUEsWUFBT0csT0FBUDtBQUNBLEtBWG9CLEVBRHRCO0FBYUE7QUEvSW9CLEdBQXRCOztBQWtKQSxTQUFPL0QsR0FBRy9ELElBQUgsQ0FBUSxZQUFSLENBQVA7QUFDQSxFQW5tQkQ7QUFzbUJBLENBMW1CRCxFQTBtQkdvSSxNQTFtQkgsRSIsImZpbGUiOiJhamF4LjFjMmM1ODgwNjI1YzFlN2YyODI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZmZWE4ZmJlZTNmZTEyNjNjMjRiIiwiXG5cbiAgICBmdW5jdGlvbiBhamF4Q2hhbmdlUXRlUGFuaWVyKCkge1xuICAgICAgICAvL0onaW5pdGlhbGlzZSBsZSBtb250YW50IHRvdGFsIMOgIDAuXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAgICAgLy8gSmUgYm91Y2xlIHN1ciBsZSBub21icmUgZGUgcHJvZHVpdCBhZmluIGRlIHLDqWN1cMOpcmVyIGxldXIgSUQuIEplIGNvbW1lbmNlIMOgIDEgcGFyY2UgcXVlIGxlIHByZW1pZXIgSUQgZHUgcHJvZHVpdCB2YXV0IDEuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICAvL0plIHLDqWN1cMOocmUgbGEgdmFsZXVyIHF1aSBzZSB0cm91dmUgZGFucyBsJ0lkIFwicHJpeCtpXCIuXG4gICAgICAgICAgICB2YXIgcHJpeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcml4JyArIGkpLmlubmVyVGV4dDtcblxuICAgICAgICAgICAgLy9KZSByw6ljdcOocmUgc2V1bGVtZW50IGxlIG5vbWJyZS5cbiAgICAgICAgICAgIHZhciB0aGVudW0gPSBwcml4Lm1hdGNoKC9cXGQrLylbMF07XG5cbiAgICAgICAgICAgIC8vSmUgcsOpY3Vww6hyZSBsYSB2YWxldXIgZHUgc2VsZWN0IHF1aSBhIHBvdXIgaWQgXCJxdGUraVwiXG4gICAgICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdGUnICsgaSk7XG4gICAgICAgICAgICAvL0plIHLDqWN1cHXDqHJlIHNldWxlbWVudCBsYSB2YWxldXIgcXVlIGwndXRpbGlzYXRldXIgYXVyYSBjaG9pc2kuXG4gICAgICAgICAgICB2YXIgc3RyVXNlciA9IGUub3B0aW9uc1tlLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuXG4gICAgICAgICAgICAvKkplIGNhbGN1bGUgbGUgdG90YWwuIEplIHBhcnNlRmxvYXQgY2FyIGonYXZhaXMgcXVlIHF1ZSBzdHJpbmdzLlxuICAgICAgICAgICAgICBKZSBwYXJzZUZsb2F0IHNpIGF1IGNhcyBvw7kgZGFucyBsZSBmdXR1ciwgbGUgc2l0ZSBhdXJhIGJlc29pbiBkZSBmbG9hdFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRvdGFsID0gcGFyc2VGbG9hdCh0b3RhbCkgKyBwYXJzZUZsb2F0KHRoZW51bSkgKiBwYXJzZUZsb2F0KHN0clVzZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9KZSByZW1ldHMgdG90YWwgw6Agc3RyaW5nIHBvdXIgcG91dm9pciBpbnTDqWdyZXIgdG90YWwgw6AgbWEgcGFnZSBodG1sLnR3aWdcbiAgICAgICAgdG90YWwgPSB0b3RhbC50b1N0cmluZygpXG4gICAgICAgIC8vSifDqWNyaXMgZGFucyBtYSBwYWdlIGh0bWwgw6AgbGEgc3BhbiBxdWkgYSBwb3VyIGlkPVwibW9udGFudGFwYXllclwiXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9udGFudGFwYXllclwiKS5pbm5lckhUTUwgPSB0b3RhbCArIFwi4oKsXCI7XG4gICAgfVxuXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkFkZFByb2R1Y3RQYW5pZXInLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2Fqb3V0X3Byb2R1aXRfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllcikge1xuXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4QWpvdXRQcm9kdWl0UGFuaWVyLmpzIiwiJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1wcm9kdWl0JywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpXG4gICAgLy8gdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgLy8gdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICAvLyB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAvLyB2YXIgaWRTYWxsZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGlkU2FsbGUgKyAnaWRzYWxsZScpO1xuICAgIC8vICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoKTtcbiAgICAgICAgICAgIC8vICQuZ2V0KFJvdXRpbmcuZ2VuZXJhdGUoJycpLCBmdW5jdGlvbihodG1sKXtcbiAgICAgICAgICAgIC8vICAgICAkKCcjZGlzcGxheS1wYW5pZXInKS5lbXB0eSgpLmh0bWwoaHRtbCk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstc2FsbGUnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZScpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1Jykuc2hvdygpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuc2hvdygpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hhbmdlVHVubmVsQWNoYXQuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ1dHRvblNlYXJjaCcsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tEaXNwb0RhdGUuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ0bi1zdWNjZXNzLmJ1dHRvbkFkZFNhbGxlJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAvLyAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuICAgICQoJyN0YWItbGluay1wcm9kdWl0JykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgLy8gZnVuY3Rpb24gZ2V0RGlzcG9TYWxsZSgpe1xuICAgIC8vICAgICAkLmFqYXgoe1xuICAgIC8vICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZV9hamF4JyksXG4gICAgLy8gICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgIC8vICAgICAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAvLyAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAvLyAgICAgICAgICAgICBcImlkU2FsbGVcIiA6IGlkU2FsbGUsXG4gICAgLy8gICAgICAgICB9LHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgIC8vXG4gICAgLy8gICAgICAgICB9XG4gICAgLy9cbiAgICAvL1xuICAgIC8vIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgXCJpZFNhbGxlXCIgOiBpZFNhbGxlLFxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoaXNEaXNwbywgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpvdXRfcGFuaWVyX3NhbGxlJyksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICBcImlkXCIgOiBpZFNhbGxlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBcImlkXCIgOiBpZFNhbGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICQuZ2V0KFJvdXRpbmcuZ2VuZXJhdGUoJycpLCBmdW5jdGlvbihodG1sKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgJCgnI2Rpc3BsYXktcGFuaWVyJykuZW1wdHkoKS5odG1sKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByw6ljdXDDqXJhdGlvbiBkZXMgcHJvZHV0aXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnTGEgc2FsbGUgblxcJ2VzdCBwbHVzIGRpc3BvbmlibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IGRlIGxhIHNhbGxlIGNob2lzaScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBzYWxsZScpO1xuICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGxvcnMgZGUgbGEgdsOpcmlmaWNhdGlvbiBkZSBsYSBkaXNwb25pYmlsaXTDqSBkZSBsYSBzYWxsZSBuwrAnKyBpZFNhbGxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwiXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVQcm9kdWl0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVTYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllcigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhQYW5pZXIuanMiLCJ2YXIgZmlyc3RTZWF0TGFiZWwgPSAxO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuICAgIGlmKCQoJyNzZWF0LW1hcCcpLmxlbmd0aCAmJiAgJCgnI3NlbGVjdGVkLXNlYXRzJykubGVuZ3RoKXtcbiAgICAgICAgaW5pdENhcnRlSW50ZXJhY3RpdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0Q2FydGVJbnRlcmFjdGl2ZSgpe1xuICAgICAgICB2YXIgJGNhcnQgPSAkKCcjc2VsZWN0ZWQtc2VhdHMnKSxcbiAgICAgICAgICAgICRjb3VudGVyID0gJCgnI2NvdW50ZXInKSxcbiAgICAgICAgICAgICR0b3RhbCA9ICQoJyN0b3RhbCcpLFxuICAgICAgICAgICAgc2MgPSAkKCcjc2VhdC1tYXAnKS5zZWF0Q2hhcnRzKHtcbiAgICAgICAgICAgICAgICBtYXA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2ZmX2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZmX2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX19fJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlX2VlJyxcbiAgICAgICAgICAgICAgICAgICAgJ2VlZWVlJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHNlYXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIGY6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2ZpcnN0LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnRmlyc3QgQ2xhc3MnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2Vjb25vbXktY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdFY29ub215IENsYXNzJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hbWluZzoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdFNlYXRMYWJlbCsrO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6ICQoJyNsZWdlbmQnKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZicsICdhdmFpbGFibGUnLCAnRmlyc3QgQ2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZScsICdhdmFpbGFibGUnLCAnRWNvbm9teSBDbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ3VuYXZhaWxhYmxlJywgJ0FscmVhZHkgQm9va2VkJ11cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0J3MgY3JlYXRlIGEgbmV3IDxsaT4gd2hpY2ggd2UnbGwgYWRkIHRvIHRoZSBjYXJ0IGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8bGk+JyArIHRoaXMuZGF0YSgpLmNhdGVnb3J5ICsgJyBTZWF0ICMgJyArIHRoaXMuc2V0dGluZ3MubGFiZWwgKyAnOiA8Yj4kJyArIHRoaXMuZGF0YSgpLnByaWNlICsgJzwvYj4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhbmNlbC1jYXJ0LWl0ZW1cIj5bY2FuY2VsXTwvYT48L2xpPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnc2VhdElkJywgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNhcnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogTGV0cyB1cGRhdGUgdGhlIGNvdW50ZXIgYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogLmZpbmQgZnVuY3Rpb24gd2lsbCBub3QgZmluZCB0aGUgY3VycmVudCBzZWF0LCBiZWNhdXNlIGl0IHdpbGwgY2hhbmdlIGl0cyBzdGF1dHMgb25seSBhZnRlciByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqICdzZWxlY3RlZCcuIFRoaXMgaXMgd2h5IHdlIGhhdmUgdG8gYWRkIDEgdG8gdGhlIGxlbmd0aCBhbmQgdGhlIGN1cnJlbnQgc2VhdCBwcmljZSB0byB0aGUgdG90YWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpICsgdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgLSB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBpdGVtIGZyb20gb3VyIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gdmFjYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3VuYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIGFscmVhZHkgYm9va2VkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VuYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvL3RoaXMgd2lsbCBoYW5kbGUgXCJbY2FuY2VsXVwiIGxpbmsgY2xpY2tzXG4gICAgICAgICQoJyNzZWxlY3RlZC1zZWF0cycpLm9uKCdjbGljaycsICcuY2FuY2VsLWNhcnQtaXRlbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vbGV0J3MganVzdCB0cmlnZ2VyIENsaWNrIGV2ZW50IG9uIHRoZSBhcHByb3ByaWF0ZSBzZWF0LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlcGVhdCB0aGUgbG9naWMgaGVyZVxuICAgICAgICAgICAgc2MuZ2V0KCQodGhpcykucGFyZW50cygnbGk6Zmlyc3QnKS5kYXRhKCdzZWF0SWQnKSkuY2xpY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9sZXQncyBwcmV0ZW5kIHNvbWUgc2VhdHMgaGF2ZSBhbHJlYWR5IGJlZW4gYm9va2VkXG4gICAgICAgIHNjLmdldChbJzFfMicsICc0XzEnLCAnN18xJywgJzdfMiddKS5zdGF0dXMoJ3VuYXZhaWxhYmxlJyk7XG4gICAgfVxuXG59KTtcblxuZnVuY3Rpb24gcmVjYWxjdWxhdGVUb3RhbChzYykge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAvL2Jhc2ljYWxseSBmaW5kIGV2ZXJ5IHNlbGVjdGVkIHNlYXQgYW5kIHN1bSBpdHMgcHJpY2VcbiAgICBzYy5maW5kKCdzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0b3RhbCArPSB0aGlzLmRhdGEoKS5wcmljZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwiLyohXG4gKiBqUXVlcnktU2VhdC1DaGFydHMgdjEuMS41IC0+IHYyIChLYXJpbSBCT1VCUklUKVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGV1c3ptYXJrb3dza2kvalF1ZXJ5LVNlYXQtQ2hhcnRzXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIDIwMTYgTWF0ZXVzeiBNYXJrb3dza2lcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogVXBncmFkZSBieSBhdXRob3I6IEthcmltIEJPVUJSSVRcbiAqL1xuXG4oZnVuY3Rpb24oJCkge1xuXHRcdFxuXHQvLyd1c2Ugc3RyaWN0JztcdFxuXHRcdFxuXHQkLmZuLnNlYXRDaGFydHMgPSBmdW5jdGlvbiAoc2V0dXApIHtcblxuXHRcdC8vaWYgdGhlcmUncyBzZWF0Q2hhcnRzIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCwgcmV0dXJuIGl0XG5cdFx0aWYgKHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmbiAgICAgICA9IHRoaXMsXG5cdFx0XHRzZWF0cyAgICA9IHt9LFxuXHRcdFx0c2VhdElkcyAgPSBbXSxcblx0XHRcdGxlZ2VuZCxcblx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRhbmltYXRlIDogZmFsc2UsIC8vcmVxdWlyZXMgalF1ZXJ5IFVJXG5cdFx0XHRcdG5hbWluZyAgOiB7XG5cdFx0XHRcdFx0dG9wICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRsZWZ0ICAgOiB0cnVlLFxuXHRcdFx0XHRcdGdldElkICA6IGZ1bmN0aW9uKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiByb3cgKyAnXycgKyBjb2x1bW47XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRMYWJlbCA6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29sdW1uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVnZW5kIDoge1xuXHRcdFx0XHRcdG5vZGUgICA6IG51bGwsXG5cdFx0XHRcdFx0aXRlbXMgIDogW11cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpY2sgICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnc2VsZWN0ZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2F2YWlsYWJsZSc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb2N1cyAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2ZvY3VzZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSAge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJsdXIgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnN0YXR1cygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWF0cyAgIDoge31cblx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdC8vc2VhdCB3aWxsIGJlIGJhc2ljYWxseSBhIHNlYXQgb2JqZWN0IHdoaWNoIHdlJ2xsIHdoZW4gZ2VuZXJhdGluZyB0aGUgbWFwXG5cdFx0XHRzZWF0ID0gKGZ1bmN0aW9uKHNlYXRDaGFydHMsIHNlYXRDaGFydHNTZXR0aW5ncykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNldHVwKSB7XG5cdFx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0XHRcdHN0YXR1cyA6ICdhdmFpbGFibGUnLCAvL2F2YWlsYWJsZSwgdW5hdmFpbGFibGUsIHNlbGVjdGVkXG5cdFx0XHRcdFx0XHRzdHlsZSAgOiAnYXZhaWxhYmxlJyxcblx0XHRcdFx0XHRcdC8vbWFrZSBzdXJlIHRoZXJlJ3MgYW4gZW1wdHkgaGFzaCBpZiB1c2VyIGRvZXNuJ3QgcGFzcyBhbnl0aGluZ1xuXHRcdFx0XHRcdFx0ZGF0YSAgIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW3NldHVwLmNoYXJhY3Rlcl0gfHwge31cblx0XHRcdFx0XHRcdC8vYW55dGhpbmcgZ29lcyBoZXJlP1xuXHRcdFx0XHRcdH0sIHNldHVwKTtcblxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlID0gJCgnPGRpdj48L2Rpdj4nKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgICAgICA6IGZuLnNldHRpbmdzLmlkLFxuXHRcdFx0XHRcdFx0XHRyb2xlICAgICAgICAgICA6ICdjaGVja2JveCcsXG5cdFx0XHRcdFx0XHRcdCdhcmlhLWNoZWNrZWQnIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGZvY3VzYWJsZSAgICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dGFiSW5kZXggICAgICAgOiAtMSAvL21hbnVhbCBmb2N1c1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50ZXh0KGZuLnNldHRpbmdzLmxhYmVsKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsICdhdmFpbGFibGUnXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdC8vbGV0J3MgbWVyZ2UgY3VzdG9tIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggc3RhbmRhcmQgSlNDIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXSA9PSBcInVuZGVmaW5lZFwiID8gXG5cdFx0XHRcdFx0XHRcdFx0W10gOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXS5jbGFzc2VzXG5cdFx0XHRcdFx0XHRcdCkuam9pbignICcpKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2Jhc2ljYWxseSBhIHdyYXBwZXIgZnVuY3Rpb25cblx0XHRcdFx0XHRmbi5kYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuZGF0YTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLmNoYXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5jaGFyYWN0ZXI7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuJG5vZGU7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogQ2FuIGVpdGhlciBzZXQgb3IgcmV0dXJuIHN0YXR1cyBkZXBlbmRpbmcgb24gYXJndW1lbnRzLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgdGhlcmUncyBubyBhcmd1bWVudCwgaXQgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgc3R5bGUuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB5b3UgcGFzcyBhbiBhcmd1bWVudCwgaXQgd2lsbCB1cGRhdGUgc2VhdCdzIHN0eWxlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm4uc3R5bGUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/XG5cdFx0XHRcdFx0XHRcdChmdW5jdGlvbihuZXdTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvbGRTdHlsZSA9IGZuLnNldHRpbmdzLnN0eWxlO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiBub3RoaW5nIGNoYW5nZXMsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV3U3R5bGUgPT0gb2xkU3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvbGRTdHlsZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9mb2N1c2VkIGlzIGEgc3BlY2lhbCBzdHlsZSB3aGljaCBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIHN0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLnN0YXR1cyA9IG5ld1N0eWxlICE9ICdmb2N1c2VkJyA/IG5ld1N0eWxlIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0cignYXJpYS1jaGVja2VkJywgbmV3U3R5bGUgPT0gJ3NlbGVjdGVkJyk7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIHVzZXIgd2FudHMgdG8gYW5pbWF0ZSBzdGF0dXMgY2hhbmdlcywgbGV0IGhpbSBkbyB0aGlzXG5cdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0c1NldHRpbmdzLmFuaW1hdGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUuc3dpdGNoQ2xhc3Mob2xkU3R5bGUsIG5ld1N0eWxlLCAyMDApIDpcblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnJlbW92ZUNsYXNzKG9sZFN0eWxlKS5hZGRDbGFzcyhuZXdTdHlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3R5bGUgPSBuZXdTdHlsZTtcblx0XHRcdFx0XHRcdFx0fSkoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0eWxlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9laXRoZXIgc2V0IG9yIHJldHJpZXZlXG5cdFx0XHRcdFx0Zm4uc3RhdHVzID0gZnVuY3Rpb24oKSB7XG5cdFxuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0YXR1cyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IFxuXHRcdFx0XHRcdFx0XHRmbi5zdHlsZShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly91c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gdG8gY29udmllbmlldGx5IGdldCBzaG9ydGN1dCB2YXJpYWJsZXNcblx0XHRcdFx0XHQoZnVuY3Rpb24oc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQpIHtcblx0XHRcdFx0XHRcdC8vYXR0YWNoIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdFx0XHQkLmVhY2goWydjbGljaycsICdmb2N1cycsICdibHVyJ10sIGZ1bmN0aW9uKGluZGV4LCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vd2Ugd2FudCB0byBiZSBhYmxlIHRvIGNhbGwgdGhlIGZ1bmN0aW9ucyBmb3IgZWFjaCBzZWF0IG9iamVjdFxuXHRcdFx0XHRcdFx0XHRmbltjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT0gJ2ZvY3VzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGFscmVhZHkgYSBmb2N1c2VkIGVsZW1lbnQsIHdlIGhhdmUgdG8gcmVtb3ZlIGZvY3VzIGZyb20gaXQgZmlyc3Rcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBzZWF0LnNldHRpbmdzLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNlYXQubm9kZSgpLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgY2FuIHBhc3MgaGlzIG93biBjYWxsYmFjayBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBmaXJzdCBjaGVjayBpZiBpdCBleGlzdHNcblx0XHRcdFx0XHRcdFx0XHQgKiBhbmQgaWYgbm90LCB1c2Ugb3VyIGRlZmF1bHQgY2FsbGJhY2suXG5cdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHQgKiBFYWNoIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IHNlYXQgY29udGV4dC5cblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc3R5bGUodHlwZW9mIHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10uYXBwbHkoc2VhdCkgOiBzZWF0Q2hhcnRzU2V0dGluZ3NbY2FsbGJhY2tdLmFwcGx5KHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL3RoZSBiZWxvdyB3aWxsIGJlY29tZSBzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCB0aGFua3MgdG8gdGhlIGltbWVkaWF0ZSBmdW5jdGlvblx0XHRcblx0XHRcdFx0XHR9KShzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHMsIGZuLnNldHRpbmdzLmNoYXJhY3RlciwgZm4pO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlKClcblx0XHRcdFx0XHRcdC8vdGhlIGZpcnN0IHRocmVlIG1vdXNlIGV2ZW50cyBhcmUgc2ltcGxlXG5cdFx0XHRcdFx0XHQub24oJ2NsaWNrJywgICAgICBmbi5jbGljaylcblx0XHRcdFx0XHRcdC5vbignbW91c2VlbnRlcicsIGZuLmZvY3VzKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlJywgZm4uYmx1cilcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly9rZXlkb3duIHJlcXVpcmVzIHF1aXRlIGEgbG90IG9mIGxvZ2ljLCBiZWNhdXNlIHdlIGhhdmUgdG8ga25vdyB3aGVyZSB0byBtb3ZlIHRoZSBmb2N1c1xuXHRcdFx0XHRcdFx0Lm9uKCdrZXlkb3duJywgICAgKGZ1bmN0aW9uKHNlYXQsICRzZWF0KSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZXZlcnl0aGluZyBkZXBlbmRzIG9uIHRoZSBwcmVzc2VkIGtleVxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoZS53aGljaCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9zcGFjZWJhciB3aWxsIGp1c3QgdHJpZ2dlciB0aGUgc2FtZSBldmVudCBtb3VzZSBjbGljayBkb2VzXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL1VQICYgRE9XTlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoaXMgaXMgYSByZWN1cnNpdmUsIGltbWVkaWF0ZSBmdW5jdGlvbiB3aGljaCBzZWFyY2hlcyBmb3IgdGhlIGZpcnN0IFwiZm9jdXNhYmxlXCIgcm93LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIGJlY2F1c2Ugd2Ugd2FudCBhIGNvbnZlbmllbnQgYWNjZXNzIHRvIHNvbWUgRE9NIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIHJlY3Vyc2lvbiBiZWNhdXNlIHNvbWV0aW1lcyB3ZSBtYXkgaGl0IGFuIGVtcHR5IHNwYWNlIHJhdGhlciB0aGFuIGEgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uIGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJGN1cnJlbnRSb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1Jvdztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2xldCdzIGRldGVybWluZSB3aGljaCByb3cgc2hvdWxkIHdlIG1vdmUgdG9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRyb3dzLmluZGV4KCRjdXJyZW50Um93KSAmJiBlLndoaWNoID09IDM4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCB1cCBhcnJvdywgbW92ZSB0byB0aGUgbGFzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkcm93cy5pbmRleCgkY3VycmVudFJvdykgPT0gJHJvd3MubGVuZ3RoLTEgJiYgZS53aGljaCA9PSA0MCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBsYXN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCBkb3duIGFycm93LCBtb3ZlIHRvIHRoZSBmaXJzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzaW5nIGVxIHRvIGdldCBhbiBlbGVtZW50IGF0IHRoZSBkZXNpcmVkIGluZGV4IHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZXEoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdXAgYXJyb3csIHRoZW4gZGVjcmVtZW50IHRoZSBpbmRleCwgaWYgZG93biBpbmNyZW1lbnQgaXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICsgKGUud2hpY2ggPT0gMzggPyAoLTEpIDogKCsxKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbm93IHRoYXQgd2Uga25vdyB0aGUgcm93LCBsZXQncyBnZXQgdGhlIHNlYXQgdXNpbmcgdGhlIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAkbmV3Um93LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKS5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZSBzZWF0IHdlIGZvdW5kIGlzIGEgc3BhY2UsIGtlZXAgbG9va2luZyBmdXJ0aGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRuZXdTZWF0Lmhhc0NsYXNzKCdzZWF0Q2hhcnRzLXNwYWNlJykgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkbmV3Um93KSA6ICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyIGFuZCB0aGVuIHNlbGVjdCBhbGwgcm93cyBidXQgdGhlIGhlYWRlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcicpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJvdyBhbmQgdGhlbiBmaW5kIGFsbCBzZWF0IGNlbGxzIChib3RoIHNlYXRzICYgc3BhY2VzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3dlIGNvdWxkbid0IGRldGVybWluZSB0aGUgbmV3IHNlYXQsIHNvIHdlIGJldHRlciBnaXZlIHVwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3JlbW92ZSBmb2N1cyBmcm9tIHRoZSBvbGQgc2VhdCBhbmQgcHV0IGl0IG9uIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdC8vTEVGVCAmIFJJR0hUXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGUgbG9naWMgaGVyZSBpcyBzbGlnaHRseSBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIGZvciB1cC9kb3duIGFycm93cy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVXNlciB3aWxsIGJlIGFibGUgdG8gYnJvd3NlIHRoZSB3aG9sZSBtYXAgdXNpbmcganVzdCBsZWZ0L3JpZ2h0IGFycm93LCBiZWNhdXNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIGl0IHdpbGwgbW92ZSB0byB0aGUgbmV4dCByb3cgd2hlbiB3ZSByZWFjaCB0aGUgcmlnaHQvbGVmdC1tb3N0IHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbigkc2VhdHMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkc2VhdHMuaW5kZXgoJHNlYXQpICYmIGUud2hpY2ggPT0gMzcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCBsZWZ0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGxlZnQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRzZWF0cy5pbmRleCgkc2VhdCkgPT0gJHNlYXRzLmxlbmd0aCAtMSAmJiBlLndoaWNoID09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgcmlnaHQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgcmlnaHQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vc2ltcGx5IG1vdmUgb25lIHNlYXQgbGVmdCBvciByaWdodCBkZXBlbmRpbmcgb24gdGhlIGtleVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpICsgKGUud2hpY2ggPT0gMzcgPyAoLTEpIDogKCsxKSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXI6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSknKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL2hhbmRsZSBmb2N1c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSkoZm4sIGZuLm5vZGUoKSkpO1xuXHRcdFx0XHRcdFx0Ly8uYXBwZW5kVG8oc2VhdENoYXJ0cy5maW5kKCcuJyArIHJvdykpO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pKGZuLCBzZXR0aW5ncyk7XG5cdFx0XHRcblx0XHRmbi5hZGRDbGFzcygnc2VhdENoYXJ0cy1jb250YWluZXInKTtcblx0XHRcblx0XHQvL3RydWUgLT4gZGVlcCBjb3B5IVxuXHRcdCQuZXh0ZW5kKHRydWUsIHNldHRpbmdzLCBzZXR1cCk7XHRcdFxuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCByb3cgaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLnJvd3MgPSBzZXR0aW5ncy5uYW1pbmcucm93cyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgcm93cyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm93cy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSkoc2V0dGluZ3MubWFwLmxlbmd0aCk7XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IGNvbHVtbiBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyA9IHNldHRpbmdzLm5hbWluZy5jb2x1bW5zIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5zID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb2x1bW5zLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY29sdW1ucztcblx0XHR9KShzZXR0aW5ncy5tYXBbMF0uc3BsaXQoJycpLmxlbmd0aCk7XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLm5hbWluZy50b3ApIHtcblx0XHRcdHZhciAkaGVhZGVyUm93ID0gJCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93IHNlYXRDaGFydHMtaGVhZGVyJyk7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZCgkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpXG5cdFx0XHRcdFx0XHQudGV4dCh2YWx1ZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHRmbi5hcHBlbmQoJGhlYWRlclJvdyk7XG5cdFx0XG5cdFx0Ly9kbyB0aGlzIGZvciBlYWNoIG1hcCByb3dcblx0XHQkLmVhY2goc2V0dGluZ3MubWFwLCBmdW5jdGlvbihyb3csIGNoYXJhY3RlcnMpIHtcblxuXHRcdFx0dmFyICRyb3cgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdycpO1xuXHRcdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkcm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcblx0XHRcdFx0XHRcdC50ZXh0KHNldHRpbmdzLm5hbWluZy5yb3dzW3Jvd10pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBEbyB0aGlzIGZvciBlYWNoIHNlYXQgKGxldHRlcilcblx0XHRcdCAqXG5cdFx0XHQgKiBOb3cgdXNlcnMgd2lsbCBiZSBhYmxlIHRvIHBhc3MgY3VzdG9tIElEIGFuZCBsYWJlbCB3aGljaCBvdmVyd3JpdGUgdGhlIG9uZSB0aGF0IHNlYXQgd291bGQgYmUgYXNzaWduZWQgYnkgZ2V0SWQgYW5kXG5cdFx0XHQgKiBnZXRMYWJlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE5ldyBmb3JtYXQgaXMgbGlrZSB0aGlzOlxuXHRcdFx0ICogYVtJRCxsYWJlbF1hW0lEXWFhYWFhXG5cdFx0XHQgKlxuXHRcdFx0ICogU28geW91IGNhbiBvdmVyd3JpdGUgdGhlIElEIG9yIGxhYmVsIChvciBib3RoKSBldmVuIGZvciBqdXN0IG9uZSBzZWF0LlxuXHRcdFx0ICogQmFzaWNhbGx5IElEIHNob3VsZCBiZSBmaXJzdCwgc28gaWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIGp1c3QgbGFiZWwgd3JpdGUgaXQgYXMgZm9sbG93czpcblx0XHRcdCAqIGFbLExBQkVMXVxuXHRcdFx0ICpcblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBJRHMgYXJlTCAwLTksIGEteiwgQS1aLCBfXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gbGFiZWxzIGFyZTogMC05LCBhLXosIEEtWiwgXywgJyAnIChzcGFjZSlcblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdCBcblx0XHRcdCQuZWFjaChjaGFyYWN0ZXJzLm1hdGNoKC9bYS16X117MX0oXFxbWzAtOWEtel9dezAsfSgsWzAtOWEtel8gXSspP1xcXSk/L2dpKSwgZnVuY3Rpb24gKGNvbHVtbiwgY2hhcmFjdGVyUGFyYW1zKSB7IFxuXHRcdFx0XHR2YXIgbWF0Y2hlcyAgICAgICAgID0gY2hhcmFjdGVyUGFyYW1zLm1hdGNoKC8oW2Etel9dezF9KShcXFsoWzAtOWEtel8gLF0rKVxcXSk/L2kpLFxuXHRcdFx0XHRcdC8vbm8gbWF0dGVyIGlmIHVzZXIgc3BlY2lmaWVzIFtdIHBhcmFtcywgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaW4gdGhlIHNlY29uZCBlbGVtZW50XG5cdFx0XHRcdFx0Y2hhcmFjdGVyICAgICAgID0gbWF0Y2hlc1sxXSxcblx0XHRcdFx0XHQvL2NoZWNrIGlmIHVzZXIgaGFzIHBhc3NlZCBzb21lIGFkZGl0aW9uYWwgcGFyYW1zIHRvIG92ZXJyaWRlIGlkIG9yIGxhYmVsXG5cdFx0XHRcdFx0cGFyYW1zICAgICAgICAgID0gdHlwZW9mIG1hdGNoZXNbM10gIT09ICd1bmRlZmluZWQnID8gbWF0Y2hlc1szXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Ly9pZCBwYXJhbSBzaG91bGQgYmUgZmlyc3Rcblx0XHRcdFx0XHRvdmVycmlkZUlkICAgICAgPSBwYXJhbXMubGVuZ3RoID8gcGFyYW1zWzBdIDogbnVsbCxcblx0XHRcdFx0XHQvL2xhYmVsIHBhcmFtIHNob3VsZCBiZSBzZWNvbmRcblx0XHRcdFx0XHRvdmVycmlkZUxhYmVsICAgPSBwYXJhbXMubGVuZ3RoID09PSAyID8gcGFyYW1zWzFdIDogbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0JHJvdy5hcHBlbmQoY2hhcmFjdGVyICE9ICdfJyA/XG5cdFx0XHRcdFx0Ly9pZiB0aGUgY2hhcmFjdGVyIGlzIG5vdCBhbiB1bmRlcnNjb3JlIChlbXB0eSBzcGFjZSlcblx0XHRcdFx0XHQoZnVuY3Rpb24obmFtaW5nKSB7XG5cdFxuXHRcdFx0XHRcdFx0Ly9zbyB1c2VycyBkb24ndCBoYXZlIHRvIHNwZWNpZnkgZW1wdHkgb2JqZWN0c1xuXHRcdFx0XHRcdFx0c2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA9IGNoYXJhY3RlciBpbiBzZXR0aW5ncy5zZWF0cyA/IHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gOiB7fTtcblx0XG5cdFx0XHRcdFx0XHR2YXIgaWQgPSBvdmVycmlkZUlkID8gb3ZlcnJpZGVJZCA6IG5hbWluZy5nZXRJZChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pO1xuXHRcdFx0XHRcdFx0c2VhdHNbaWRdID0gbmV3IHNlYXQoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgOiBpZCxcblx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogb3ZlcnJpZGVMYWJlbCA/XG5cdFx0XHRcdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCA6IG5hbWluZy5nZXRMYWJlbChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pLFxuXHRcdFx0XHRcdFx0XHRyb3cgICAgICAgOiByb3csXG5cdFx0XHRcdFx0XHRcdGNvbHVtbiAgICA6IGNvbHVtbixcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyIDogY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0c2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0c1tpZF0ubm9kZSgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fSkoc2V0dGluZ3MubmFtaW5nKSA6XG5cdFx0XHRcdFx0Ly90aGlzIGlzIGp1c3QgYW4gZW1wdHkgc3BhY2UgKF8pXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVx0XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Zm4uYXBwZW5kKCRyb3cpO1xuXHRcdH0pO1xuXHRcblx0XHQvL2lmIHRoZXJlJ3JlIGFueSBsZWdlbmQgaXRlbXMgdG8gYmUgcmVuZGVyZWRcblx0XHRzZXR0aW5ncy5sZWdlbmQuaXRlbXMubGVuZ3RoID8gKGZ1bmN0aW9uKGxlZ2VuZCkge1xuXHRcdFx0Ly9laXRoZXIgdXNlIHVzZXItZGVmaW5lZCBjb250YWluZXIgb3IgY3JlYXRlIG91ciBvd24gYW5kIGluc2VydCBpdCByaWdodCBhZnRlciB0aGUgc2VhdCBjaGFydCBkaXZcblx0XHRcdHZhciAkY29udGFpbmVyID0gKGxlZ2VuZC5ub2RlIHx8ICQoJzxkaXY+PC9kaXY+JykuaW5zZXJ0QWZ0ZXIoZm4pKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kJyk7XG5cdFx0XHRcdFxuXHRcdFx0dmFyICR1bCA9ICQoJzx1bD48L3VsPicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRMaXN0Jylcblx0XHRcdFx0LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXHRcdFx0XG5cdFx0XHQkLmVhY2gobGVnZW5kLml0ZW1zLCBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kSXRlbScpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHRcdFx0Ly9tZXJnZSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIG91ciBzdGFuZGFyZCBvbmVzXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsIGl0ZW1bMV1dLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdHNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dID09IFwidW5kZWZpbmVkXCIgPyBbXSA6IHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dLmNsYXNzZXMpLmpvaW4oJyAnKVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxzcGFuPjwvc3Bhbj4nKVxuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmREZXNjcmlwdGlvbicpXG5cdFx0XHRcdFx0XHRcdFx0LnRleHQoaXRlbVsyXSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gJGNvbnRhaW5lcjtcblx0XHR9KShzZXR0aW5ncy5sZWdlbmQpIDogbnVsbDtcblx0XG5cdFx0Zm4uYXR0cih7XG5cdFx0XHR0YWJJbmRleCA6IDBcblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHQvL3doZW4gY29udGFpbmVyJ3MgZm9jdXNlZCwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3Qgc2VhdFxuXHRcdGZuLmZvY3VzKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpKSB7XG5cdFx0XHRcdHNlYXRzW2ZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0Zm4uZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpOmZpcnN0JykuZm9jdXMoKTtcblx0XHRcdHNlYXRzW3NlYXRJZHNbMF1dLmZvY3VzKCk7XG5cblx0XHR9KTtcblx0XG5cdFx0Ly9wdWJsaWMgbWV0aG9kcyBvZiBzZWF0Q2hhcnRzXG5cdFx0Zm4uZGF0YSgnc2VhdENoYXJ0cycsIHtcblx0XHRcdHNlYXRzICAgOiBzZWF0cyxcblx0XHRcdHNlYXRJZHMgOiBzZWF0SWRzLFxuXHRcdFx0Ly9zZXQgZm9yIG9uZSwgc2V0IGZvciBtYW55LCBnZXQgZm9yIG9uZVxuXHRcdFx0c3RhdHVzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gZm4uc2VhdHNbYXJndW1lbnRzWzBdXS5zdGF0dXMoKSA6IChmdW5jdGlvbihzZWF0c0lkcywgbmV3U3RhdHVzKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBmbi5zZWF0c1tzZWF0c0lkc10uc3RhdHVzKG5ld1N0YXR1cykgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdElkXS5zdGF0dXMobmV3U3RhdHVzKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH0pKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHRcdH0sXG5cdFx0XHRlYWNoICA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgc2VhdElkIGluIGZuLnNlYXRzKSB7XG5cdFx0XHRcdFx0aWYgKGZhbHNlID09PSBjYWxsYmFjay5jYWxsKGZuLnNlYXRzW3NlYXRJZF0sIHNlYXRJZCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0SWQ7Ly9yZXR1cm4gbGFzdCBjaGVja2VkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdC8vYmFzaWNhbGx5IGNyZWF0ZSBhIENTUyBxdWVyeSB0byBnZXQgYWxsIHNlYXRzIGJ5IHRoZWlyIERPTSBpZHNcblx0XHRcdFx0cmV0dXJuICQoJyMnICsgZm4uc2VhdElkcy5qb2luKCcsIycpKTtcblx0XHRcdH0sXG5cblx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbihxdWVyeSkgey8vRCwgYS5hdmFpbGFibGUsIHVuYXZhaWxhYmxlXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFxuXHRcdFx0XHQvL2lzIFJlZ0V4cFxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQubWF0Y2gocXVlcnkpKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2goaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgIChxdWVyeS5sZW5ndGggPT0gMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgc2VhcmNoZXMganVzdCBmb3IgYSBwYXJ0aWN1YWwgY2hhcmFjdGVyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShxdWVyeSkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHJ1bnMgYSBtb3JlIHNvcGhpc3RpY2F0ZWQgcXVlcnksIHNvIGxldCdzIHNlZSBpZiB0aGVyZSdzIGEgZG90XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkuaW5kZXhPZignLicpID4gLTEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlcmUncyBhIGRvdCB3aGljaCBzZXBhcmF0ZXMgY2hhcmFjdGVyIGFuZCB0aGUgc3RhdHVzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHF1ZXJ5LnNwbGl0KCcuJyk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKHNlYXRJZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IHBhcnRzWzBdICYmIHRoaXMuc3RhdHVzKCkgPT0gcGFydHNbMV0pIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IHF1ZXJ5KSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0c2V0ICAgICAgICA6IGZ1bmN0aW9uIHNldCgpIHsvL2luaGVyaXRzIHNvbWUgbWV0aG9kc1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzZWF0cyAgICAgIDogW10sXG5cdFx0XHRcdFx0c2VhdElkcyAgICA6IFtdLFxuXHRcdFx0XHRcdGxlbmd0aCAgICAgOiAwLFxuXHRcdFx0XHRcdHN0YXR1cyAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHR0aGF0ID0gdGhpcztcblx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBqdXN0IG9uZSBzZWF0IGluIHRoZSBzZXQgYW5kIHVzZXIgZGlkbid0IHBhc3MgYW55IHBhcmFtcywgcmV0dXJuIGN1cnJlbnQgc3RhdHVzXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sZW5ndGggPT0gMSAmJiBhcmdzLmxlbmd0aCA9PSAwID8gdGhpcy5zZWF0c1swXS5zdGF0dXMoKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Ly9vdGhlcndpc2UgY2FsbCBzdGF0dXMgZnVuY3Rpb24gZm9yIGVhY2ggb2YgdGhlIHNlYXRzIGluIHRoZSBzZXRcblx0XHRcdFx0XHRcdFx0JC5lYWNoKHRoYXQuc2VhdHMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdHVzLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4ubm9kZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZWFjaCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmVhY2guY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0ICAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmdldC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZmluZC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZXQuY2FsbChmbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwdXNoICAgICAgIDogZnVuY3Rpb24oaWQsIHNlYXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdHMucHVzaChzZWF0KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdCsrdGhpcy5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdC8vZ2V0IG9uZSBvYmplY3Qgb3IgYSBzZXQgb2Ygb2JqZWN0c1xuXHRcdFx0Z2V0ICAgOiBmdW5jdGlvbihzZWF0c0lkcykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXG5cdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBcblx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0c0lkc10gOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZuLnNlYXRzW3NlYXRJZF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VhdFNldC5wdXNoKHNlYXRJZCwgZm4uc2VhdHNbc2VhdElkXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdFNldDtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBmbi5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdH1cblx0XG5cdFxufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=