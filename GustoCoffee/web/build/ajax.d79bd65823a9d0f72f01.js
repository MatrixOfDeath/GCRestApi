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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDEyYjZiMGEyYjQ2NDM1MzRmMzgiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiYWpheENoYW5nZVF0ZVBhbmllciIsInRvdGFsIiwiaSIsInByaXgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJUZXh0IiwidGhlbnVtIiwibWF0Y2giLCJlIiwic3RyVXNlciIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidmFsdWUiLCJwYXJzZUZsb2F0IiwidG9TdHJpbmciLCJpbm5lckhUTUwiLCIkIiwib24iLCJjb25zb2xlIiwibG9nIiwidmFsIiwiYWpheCIsInVybCIsIlJvdXRpbmciLCJnZW5lcmF0ZSIsInR5cGUiLCJkYXRhIiwiYXN5bmMiLCJzdWNjZXNzIiwicmVzcG9uc2VQYW5pZXIiLCJ0ZXh0U3RhdHVzIiwiZW1wdHkiLCJhcHBlbmQiLCJlcnJvciIsImFsZXJ0IiwidGhhdCIsImxvYWQiLCJmYWRlSW4iLCJyZXNwb25zZVByb2R1aXRzIiwiaGlkZSIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwicmVzcG9uc2UiLCJzaG93IiwiaWRTYWxsZSIsImlzRGlzcG8iLCJyZWZyZXNoUGFuaWVyIiwiZmlyc3RTZWF0TGFiZWwiLCJyZWFkeSIsImxlbmd0aCIsImluaXRDYXJ0ZUludGVyYWN0aXZlIiwiJGNhcnQiLCIkY291bnRlciIsIiR0b3RhbCIsInNjIiwic2VhdENoYXJ0cyIsIm1hcCIsInNlYXRzIiwiZiIsInByaWNlIiwiY2xhc3NlcyIsImNhdGVnb3J5IiwibmFtaW5nIiwidG9wIiwiZ2V0TGFiZWwiLCJjaGFyYWN0ZXIiLCJyb3ciLCJjb2x1bW4iLCJsZWdlbmQiLCJub2RlIiwiaXRlbXMiLCJjbGljayIsInN0YXR1cyIsInNldHRpbmdzIiwibGFiZWwiLCJhdHRyIiwiaWQiLCJhcHBlbmRUbyIsImZpbmQiLCJyZWNhbGN1bGF0ZVRvdGFsIiwicmVtb3ZlIiwic3R5bGUiLCJnZXQiLCJwYXJlbnRzIiwiZWFjaCIsImZuIiwic2V0dXAiLCJzZWF0SWRzIiwiYW5pbWF0ZSIsImxlZnQiLCJnZXRJZCIsImZvY3VzIiwiYmx1ciIsInNlYXQiLCJzZWF0Q2hhcnRzU2V0dGluZ3MiLCJleHRlbmQiLCIkbm9kZSIsInJvbGUiLCJmb2N1c2FibGUiLCJ0YWJJbmRleCIsImFkZENsYXNzIiwiY29uY2F0Iiwiam9pbiIsImNoYXIiLCJhcmd1bWVudHMiLCJuZXdTdHlsZSIsIm9sZFN0eWxlIiwic3dpdGNoQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInNlYXRTZXR0aW5ncyIsImluZGV4IiwiY2FsbGJhY2siLCJ1bmRlZmluZWQiLCJhcHBseSIsIiRzZWF0IiwiJG5ld1NlYXQiLCJ3aGljaCIsInByZXZlbnREZWZhdWx0IiwiZmluZEF2YWlsYWJsZSIsIiRyb3dzIiwiJHNlYXRzIiwiJGN1cnJlbnRSb3ciLCIkbmV3Um93IiwibGFzdCIsImZpcnN0IiwiZXEiLCJoYXNDbGFzcyIsInJvd3MiLCJwdXNoIiwiY29sdW1ucyIsInNwbGl0IiwiJGhlYWRlclJvdyIsImNoYXJhY3RlcnMiLCIkcm93IiwiY2hhcmFjdGVyUGFyYW1zIiwibWF0Y2hlcyIsInBhcmFtcyIsIm92ZXJyaWRlSWQiLCJvdmVycmlkZUxhYmVsIiwiJGNvbnRhaW5lciIsImluc2VydEFmdGVyIiwiJHVsIiwiaXRlbSIsInNlYXRzSWRzIiwibmV3U3RhdHVzIiwic2VhdElkIiwiY2FsbCIsInF1ZXJ5Iiwic2VhdFNldCIsInNldCIsIlJlZ0V4cCIsImluZGV4T2YiLCJwYXJ0cyIsImFyZ3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDM0RJLFNBQVNBLG1CQUFULEdBQStCO0FBQzNCO0FBQ0EsUUFBSUMsUUFBUSxDQUFaOztBQUVBO0FBQ0EsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQ3hCO0FBQ0EsWUFBSUMsT0FBT0MsU0FBU0MsY0FBVCxDQUF3QixTQUFTSCxDQUFqQyxFQUFvQ0ksU0FBL0M7O0FBRUE7QUFDQSxZQUFJQyxTQUFTSixLQUFLSyxLQUFMLENBQVcsS0FBWCxFQUFrQixDQUFsQixDQUFiOztBQUVBO0FBQ0EsWUFBSUMsSUFBSUwsU0FBU0MsY0FBVCxDQUF3QixRQUFRSCxDQUFoQyxDQUFSO0FBQ0E7QUFDQSxZQUFJUSxVQUFVRCxFQUFFRSxPQUFGLENB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cEIsSUFBUixDQUFhaUIsTUFBYixFQUFxQjVELEdBQUc1QixLQUFILENBQVN3RixNQUFULENBQXJCO0FBQ0E7QUFDRCxNQUpEOztBQU1BLFlBQU9HLE9BQVA7QUFDQSxLQVhvQixFQUR0QjtBQWFBO0FBL0lvQixHQUF0Qjs7QUFrSkEsU0FBTy9ELEdBQUcvRCxJQUFILENBQVEsWUFBUixDQUFQO0FBQ0EsRUFubUJEO0FBc21CQSxDQTFtQkQsRUEwbUJHb0ksTUExbUJILEUiLCJmaWxlIjoiYWpheC5kNzliZDY1ODIzYTlkMGY3MmYwMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MTJiNmIwYTJiNDY0MzUzNGYzOCIsIlxuXG4gICAgZnVuY3Rpb24gYWpheENoYW5nZVF0ZVBhbmllcigpIHtcbiAgICAgICAgLy9KJ2luaXRpYWxpc2UgbGUgbW9udGFudCB0b3RhbCDDoCAwLlxuICAgICAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgICAgIC8vIEplIGJvdWNsZSBzdXIgbGUgbm9tYnJlIGRlIHByb2R1aXQgYWZpbiBkZSByw6ljdXDDqXJlciBsZXVyIElELiBKZSBjb21tZW5jZSDDoCAxIHBhcmNlIHF1ZSBsZSBwcmVtaWVyIElEIGR1IHByb2R1aXQgdmF1dCAxLlxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgLy9KZSByw6ljdXDDqHJlIGxhIHZhbGV1ciBxdWkgc2UgdHJvdXZlIGRhbnMgbCdJZCBcInByaXgraVwiLlxuICAgICAgICAgICAgdmFyIHByaXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpeCcgKyBpKS5pbm5lclRleHQ7XG5cbiAgICAgICAgICAgIC8vSmUgcsOpY3XDqHJlIHNldWxlbWVudCBsZSBub21icmUuXG4gICAgICAgICAgICB2YXIgdGhlbnVtID0gcHJpeC5tYXRjaCgvXFxkKy8pWzBdO1xuXG4gICAgICAgICAgICAvL0plIHLDqWN1cMOocmUgbGEgdmFsZXVyIGR1IHNlbGVjdCBxdWkgYSBwb3VyIGlkIFwicXRlK2lcIlxuICAgICAgICAgICAgdmFyIGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncXRlJyArIGkpO1xuICAgICAgICAgICAgLy9KZSByw6ljdXB1w6hyZSBzZXVsZW1lbnQgbGEgdmFsZXVyIHF1ZSBsJ3V0aWxpc2F0ZXVyIGF1cmEgY2hvaXNpLlxuICAgICAgICAgICAgdmFyIHN0clVzZXIgPSBlLm9wdGlvbnNbZS5zZWxlY3RlZEluZGV4XS52YWx1ZTtcblxuICAgICAgICAgICAgLypKZSBjYWxjdWxlIGxlIHRvdGFsLiBKZSBwYXJzZUZsb2F0IGNhciBqJ2F2YWlzIHF1ZSBxdWUgc3RyaW5ncy5cbiAgICAgICAgICAgICAgSmUgcGFyc2VGbG9hdCBzaSBhdSBjYXMgb8O5IGRhbnMgbGUgZnV0dXIsIGxlIHNpdGUgYXVyYSBiZXNvaW4gZGUgZmxvYXRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0b3RhbCA9IHBhcnNlRmxvYXQodG90YWwpICsgcGFyc2VGbG9hdCh0aGVudW0pICogcGFyc2VGbG9hdChzdHJVc2VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vSmUgcmVtZXRzIHRvdGFsIMOgIHN0cmluZyBwb3VyIHBvdXZvaXIgaW50w6lncmVyIHRvdGFsIMOgIG1hIHBhZ2UgaHRtbC50d2lnXG4gICAgICAgIHRvdGFsID0gdG90YWwudG9TdHJpbmcoKVxuICAgICAgICAvL0onw6ljcmlzIGRhbnMgbWEgcGFnZSBodG1sIMOgIGxhIHNwYW4gcXVpIGEgcG91ciBpZD1cIm1vbnRhbnRhcGF5ZXJcIlxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vbnRhbnRhcGF5ZXJcIikuaW5uZXJIVE1MID0gdG90YWwgKyBcIuKCrFwiO1xuICAgIH1cblxuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25BZGRQcm9kdWN0UGFuaWVyJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9ham91dF9wcm9kdWl0X3BhbmllcicpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcblxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheEFqb3V0UHJvZHVpdFBhbmllci5qcyIsIiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstcHJvZHVpdCcsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKVxuICAgIC8vIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIC8vIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgLy8gdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgLy8gdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhpZFNhbGxlICsgJ2lkc2FsbGUnKTtcbiAgICAvLyAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncHJvZHVpdHNfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUHJvZHVpdHMsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQcm9kdWl0cyk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCk7XG4gICAgICAgICAgICAvLyAkLmdldChSb3V0aW5nLmdlbmVyYXRlKCcnKSwgZnVuY3Rpb24oaHRtbCl7XG4gICAgICAgICAgICAvLyAgICAgJCgnI2Rpc3BsYXktcGFuaWVyJykuZW1wdHkoKS5odG1sKGh0bWwpO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByw6ljdXDDqXJhdGlvbiBkZXMgcHJvZHV0aXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXNhbGxlJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLnNob3coKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoYW5nZVR1bm5lbEFjaGF0LmpzIiwiJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5idXR0b25TZWFyY2gnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZScpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwiJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5idG4tc3VjY2Vzcy5idXR0b25BZGRTYWxsZScsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcblxuICAgIGNvbnNvbGUubG9nKGlkU2FsbGUgKyAnaWRzYWxsZScpO1xuICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcbiAgICAkKCcjdGFiLWxpbmstcHJvZHVpdCcpLnBhcmVudCgpLnRhYignc2hvdycpO1xuICAgIC8vIGZ1bmN0aW9uIGdldERpc3BvU2FsbGUoKXtcbiAgICAvLyAgICAgJC5hamF4KHtcbiAgICAvLyAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGVfYWpheCcpLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgLy8gICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAvLyAgICAgICAgIGRhdGE6IHtcbiAgICAvLyAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgLy8gICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgLy8gICAgICAgICAgICAgXCJpZFNhbGxlXCIgOiBpZFNhbGxlLFxuICAgIC8vICAgICAgICAgfSxzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAvL1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vXG4gICAgLy9cbiAgICAvLyB9XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZV9hamF4JyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgIFwiaWRTYWxsZVwiIDogaWRTYWxsZSxcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGlzRGlzcG8sIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2Fqb3V0X3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJpZFwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc0Rpc3BvID0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQcm9kdWl0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAkLmdldChSb3V0aW5nLmdlbmVyYXRlKCcnKSwgZnVuY3Rpb24oaHRtbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0xhIHNhbGxlIG5cXCdlc3QgcGx1cyBkaXNwb25pYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBkZSBsYSBzYWxsZSBjaG9pc2knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgc2FsbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBsb3JzIGRlIGxhIHbDqXJpZmljYXRpb24gZGUgbGEgZGlzcG9uaWJpbGl0w6kgZGUgbGEgc2FsbGUgbsKwJysgaWRTYWxsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIlxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uRGVsZXRlUHJvZHVpdCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3BhbmllcicpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVTYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiByZWZyZXNoUGFuaWVyKCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsInZhciBmaXJzdFNlYXRMYWJlbCA9IDE7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gICAgaWYoJCgnI3NlYXQtbWFwJykubGVuZ3RoICYmICAkKCcjc2VsZWN0ZWQtc2VhdHMnKS5sZW5ndGgpe1xuICAgICAgICBpbml0Q2FydGVJbnRlcmFjdGl2ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRDYXJ0ZUludGVyYWN0aXZlKCl7XG4gICAgICAgIHZhciAkY2FydCA9ICQoJyNzZWxlY3RlZC1zZWF0cycpLFxuICAgICAgICAgICAgJGNvdW50ZXIgPSAkKCcjY291bnRlcicpLFxuICAgICAgICAgICAgJHRvdGFsID0gJCgnI3RvdGFsJyksXG4gICAgICAgICAgICBzYyA9ICQoJyNzZWF0LW1hcCcpLnNlYXRDaGFydHMoe1xuICAgICAgICAgICAgICAgIG1hcDogW1xuICAgICAgICAgICAgICAgICAgICAnZmZfZmYnLFxuICAgICAgICAgICAgICAgICAgICAnZmZfZmYnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfX18nLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVfZWUnLFxuICAgICAgICAgICAgICAgICAgICAnZWVlZWUnLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc2VhdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgZjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZmlyc3QtY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdGaXJzdCBDbGFzcydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ0Vjb25vbXkgQ2xhc3MnXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmFtaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGdldExhYmVsOiBmdW5jdGlvbiAoY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0U2VhdExhYmVsKys7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogJCgnI2xlZ2VuZCcpLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ2F2YWlsYWJsZScsICdGaXJzdCBDbGFzcyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydlJywgJ2F2YWlsYWJsZScsICdFY29ub215IENsYXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2YnLCAndW5hdmFpbGFibGUnLCAnQWxyZWFkeSBCb29rZWQnXVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQncyBjcmVhdGUgYSBuZXcgPGxpPiB3aGljaCB3ZSdsbCBhZGQgdG8gdGhlIGNhcnQgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxsaT4nICsgdGhpcy5kYXRhKCkuY2F0ZWdvcnkgKyAnIFNlYXQgIyAnICsgdGhpcy5zZXR0aW5ncy5sYWJlbCArICc6IDxiPiQnICsgdGhpcy5kYXRhKCkucHJpY2UgKyAnPC9iPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FuY2VsLWNhcnQtaXRlbVwiPltjYW5jZWxdPC9hPjwvbGk+JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAnY2FydC1pdGVtLScgKyB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdzZWF0SWQnLCB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbygkY2FydCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBMZXRzIHVwZGF0ZSB0aGUgY291bnRlciBhbmQgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiAuZmluZCBmdW5jdGlvbiB3aWxsIG5vdCBmaW5kIHRoZSBjdXJyZW50IHNlYXQsIGJlY2F1c2UgaXQgd2lsbCBjaGFuZ2UgaXRzIHN0YXV0cyBvbmx5IGFmdGVyIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICogJ3NlbGVjdGVkJy4gVGhpcyBpcyB3aHkgd2UgaGF2ZSB0byBhZGQgMSB0byB0aGUgbGVuZ3RoIGFuZCB0aGUgY3VycmVudCBzZWF0IHByaWNlIHRvIHRoZSB0b3RhbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgKyB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnc2VsZWN0ZWQnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSAtIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgdGhlIGl0ZW0gZnJvbSBvdXIgY2FydFxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiB2YWNhdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2F2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAndW5hdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gYWxyZWFkeSBib29rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAndW5hdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vdGhpcyB3aWxsIGhhbmRsZSBcIltjYW5jZWxdXCIgbGluayBjbGlja3NcbiAgICAgICAgJCgnI3NlbGVjdGVkLXNlYXRzJykub24oJ2NsaWNrJywgJy5jYW5jZWwtY2FydC1pdGVtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9sZXQncyBqdXN0IHRyaWdnZXIgQ2xpY2sgZXZlbnQgb24gdGhlIGFwcHJvcHJpYXRlIHNlYXQsIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVwZWF0IHRoZSBsb2dpYyBoZXJlXG4gICAgICAgICAgICBzYy5nZXQoJCh0aGlzKS5wYXJlbnRzKCdsaTpmaXJzdCcpLmRhdGEoJ3NlYXRJZCcpKS5jbGljaygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL2xldCdzIHByZXRlbmQgc29tZSBzZWF0cyBoYXZlIGFscmVhZHkgYmVlbiBib29rZWRcbiAgICAgICAgc2MuZ2V0KFsnMV8yJywgJzRfMScsICc3XzEnLCAnN18yJ10pLnN0YXR1cygndW5hdmFpbGFibGUnKTtcbiAgICB9XG5cbn0pO1xuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZVRvdGFsKHNjKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIC8vYmFzaWNhbGx5IGZpbmQgZXZlcnkgc2VsZWN0ZWQgc2VhdCBhbmQgc3VtIGl0cyBwcmljZVxuICAgIHNjLmZpbmQoJ3NlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvdGFsICs9IHRoaXMuZGF0YSgpLnByaWNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvdGFsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvYWpheEdlc3Rpb25QbGFjZXMuanMiLCIvKiFcbiAqIGpRdWVyeS1TZWF0LUNoYXJ0cyB2MS4xLjUgLT4gdjIgKEthcmltIEJPVUJSSVQpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXVzem1hcmtvd3NraS9qUXVlcnktU2VhdC1DaGFydHNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMywgMjAxNiBNYXRldXN6IE1hcmtvd3NraVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBVcGdyYWRlIGJ5IGF1dGhvcjogS2FyaW0gQk9VQlJJVFxuICovXG5cbihmdW5jdGlvbigkKSB7XG5cdFx0XG5cdC8vJ3VzZSBzdHJpY3QnO1x0XG5cdFx0XG5cdCQuZm4uc2VhdENoYXJ0cyA9IGZ1bmN0aW9uIChzZXR1cCkge1xuXG5cdFx0Ly9pZiB0aGVyZSdzIHNlYXRDaGFydHMgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCBlbGVtZW50LCByZXR1cm4gaXRcblx0XHRpZiAodGhpcy5kYXRhKCdzZWF0Q2hhcnRzJykpIHtcblx0XHRcdHJldHVybiB0aGlzLmRhdGEoJ3NlYXRDaGFydHMnKTtcblx0XHR9XG5cdFx0XG5cdFx0dmFyIGZuICAgICAgID0gdGhpcyxcblx0XHRcdHNlYXRzICAgID0ge30sXG5cdFx0XHRzZWF0SWRzICA9IFtdLFxuXHRcdFx0bGVnZW5kLFxuXHRcdFx0c2V0dGluZ3MgPSB7XG5cdFx0XHRcdGFuaW1hdGUgOiBmYWxzZSwgLy9yZXF1aXJlcyBqUXVlcnkgVUlcblx0XHRcdFx0bmFtaW5nICA6IHtcblx0XHRcdFx0XHR0b3AgICAgOiB0cnVlLFxuXHRcdFx0XHRcdGxlZnQgICA6IHRydWUsXG5cdFx0XHRcdFx0Z2V0SWQgIDogZnVuY3Rpb24oY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJvdyArICdfJyArIGNvbHVtbjtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldExhYmVsIDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiBjb2x1bW47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRsZWdlbmQgOiB7XG5cdFx0XHRcdFx0bm9kZSAgIDogbnVsbCxcblx0XHRcdFx0XHRpdGVtcyAgOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRjbGljayAgIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdzZWxlY3RlZCc7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnYXZhaWxhYmxlJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZvY3VzICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnZm9jdXNlZCc7XG5cdFx0XHRcdFx0fSBlbHNlICB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0Ymx1ciAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3RhdHVzKCk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNlYXRzICAgOiB7fVxuXHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0Ly9zZWF0IHdpbGwgYmUgYmFzaWNhbGx5IGEgc2VhdCBvYmplY3Qgd2hpY2ggd2UnbGwgd2hlbiBnZW5lcmF0aW5nIHRoZSBtYXBcblx0XHRcdHNlYXQgPSAoZnVuY3Rpb24oc2VhdENoYXJ0cywgc2VhdENoYXJ0c1NldHRpbmdzKSB7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoc2V0dXApIHtcblx0XHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLnNldHRpbmdzID0gJC5leHRlbmQoe1xuXHRcdFx0XHRcdFx0c3RhdHVzIDogJ2F2YWlsYWJsZScsIC8vYXZhaWxhYmxlLCB1bmF2YWlsYWJsZSwgc2VsZWN0ZWRcblx0XHRcdFx0XHRcdHN0eWxlICA6ICdhdmFpbGFibGUnLFxuXHRcdFx0XHRcdFx0Ly9tYWtlIHN1cmUgdGhlcmUncyBhbiBlbXB0eSBoYXNoIGlmIHVzZXIgZG9lc24ndCBwYXNzIGFueXRoaW5nXG5cdFx0XHRcdFx0XHRkYXRhICAgOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbc2V0dXAuY2hhcmFjdGVyXSB8fCB7fVxuXHRcdFx0XHRcdFx0Ly9hbnl0aGluZyBnb2VzIGhlcmU/XG5cdFx0XHRcdFx0fSwgc2V0dXApO1xuXG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUgPSAkKCc8ZGl2PjwvZGl2PicpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHQuYXR0cih7XG5cdFx0XHRcdFx0XHRcdGlkICAgICAgICAgICAgIDogZm4uc2V0dGluZ3MuaWQsXG5cdFx0XHRcdFx0XHRcdHJvbGUgICAgICAgICAgIDogJ2NoZWNrYm94Jyxcblx0XHRcdFx0XHRcdFx0J2FyaWEtY2hlY2tlZCcgOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0Zm9jdXNhYmxlICAgICAgOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHR0YWJJbmRleCAgICAgICA6IC0xIC8vbWFudWFsIGZvY3VzXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LnRleHQoZm4uc2V0dGluZ3MubGFiZWwpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoWydzZWF0Q2hhcnRzLXNlYXQnLCAnc2VhdENoYXJ0cy1jZWxsJywgJ2F2YWlsYWJsZSddLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0Ly9sZXQncyBtZXJnZSBjdXN0b20gdXNlciBkZWZpbmVkIGNsYXNzZXMgd2l0aCBzdGFuZGFyZCBKU0Mgb25lc1xuXHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy5jbGFzc2VzLCBcblx0XHRcdFx0XHRcdFx0dHlwZW9mIHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tmbi5zZXR0aW5ncy5jaGFyYWN0ZXJdID09IFwidW5kZWZpbmVkXCIgPyBcblx0XHRcdFx0XHRcdFx0XHRbXSA6IHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tmbi5zZXR0aW5ncy5jaGFyYWN0ZXJdLmNsYXNzZXNcblx0XHRcdFx0XHRcdFx0KS5qb2luKCcgJykpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vYmFzaWNhbGx5IGEgd3JhcHBlciBmdW5jdGlvblxuXHRcdFx0XHRcdGZuLmRhdGEgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5kYXRhO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uY2hhciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLmNoYXJhY3Rlcjtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLm5vZGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy4kbm9kZTtcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Lypcblx0XHRcdFx0XHQgKiBDYW4gZWl0aGVyIHNldCBvciByZXR1cm4gc3RhdHVzIGRlcGVuZGluZyBvbiBhcmd1bWVudHMuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB0aGVyZSdzIG5vIGFyZ3VtZW50LCBpdCB3aWxsIHJldHVybiB0aGUgY3VycmVudCBzdHlsZS5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHlvdSBwYXNzIGFuIGFyZ3VtZW50LCBpdCB3aWxsIHVwZGF0ZSBzZWF0J3Mgc3R5bGVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRmbi5zdHlsZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID9cblx0XHRcdFx0XHRcdFx0KGZ1bmN0aW9uKG5ld1N0eWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG9sZFN0eWxlID0gZm4uc2V0dGluZ3Muc3R5bGU7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIG5vdGhpbmcgY2hhbmdlcywgZG8gbm90aGluZ1xuXHRcdFx0XHRcdFx0XHRcdGlmIChuZXdTdHlsZSA9PSBvbGRTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9sZFN0eWxlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvL2ZvY3VzZWQgaXMgYSBzcGVjaWFsIHN0eWxlIHdoaWNoIGlzIG5vdCBhc3NvY2lhdGVkIHdpdGggc3RhdHVzXG5cdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3Muc3RhdHVzID0gbmV3U3R5bGUgIT0gJ2ZvY3VzZWQnID8gbmV3U3R5bGUgOiBmbi5zZXR0aW5ncy5zdGF0dXM7XG5cdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGVcblx0XHRcdFx0XHRcdFx0XHRcdC5hdHRyKCdhcmlhLWNoZWNrZWQnLCBuZXdTdHlsZSA9PSAnc2VsZWN0ZWQnKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vaWYgdXNlciB3YW50cyB0byBhbmltYXRlIHN0YXR1cyBjaGFuZ2VzLCBsZXQgaGltIGRvIHRoaXNcblx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzU2V0dGluZ3MuYW5pbWF0ZSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZS5zd2l0Y2hDbGFzcyhvbGRTdHlsZSwgbmV3U3R5bGUsIDIwMCkgOlxuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUucmVtb3ZlQ2xhc3Mob2xkU3R5bGUpLmFkZENsYXNzKG5ld1N0eWxlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5zdHlsZSA9IG5ld1N0eWxlO1xuXHRcdFx0XHRcdFx0XHR9KShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3R5bGU7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2VpdGhlciBzZXQgb3IgcmV0cmlldmVcblx0XHRcdFx0XHRmbi5zdGF0dXMgPSBmdW5jdGlvbigpIHtcblx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3RhdHVzID0gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gXG5cdFx0XHRcdFx0XHRcdGZuLnN0eWxlKGFyZ3VtZW50c1swXSkgOiBmbi5zZXR0aW5ncy5zdGF0dXM7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL3VzaW5nIGltbWVkaWF0ZSBmdW5jdGlvbiB0byBjb252aWVuaWV0bHkgZ2V0IHNob3J0Y3V0IHZhcmlhYmxlc1xuXHRcdFx0XHRcdChmdW5jdGlvbihzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCkge1xuXHRcdFx0XHRcdFx0Ly9hdHRhY2ggZXZlbnQgaGFuZGxlcnNcblx0XHRcdFx0XHRcdCQuZWFjaChbJ2NsaWNrJywgJ2ZvY3VzJywgJ2JsdXInXSwgZnVuY3Rpb24oaW5kZXgsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0Ly93ZSB3YW50IHRvIGJlIGFibGUgdG8gY2FsbCB0aGUgZnVuY3Rpb25zIGZvciBlYWNoIHNlYXQgb2JqZWN0XG5cdFx0XHRcdFx0XHRcdGZuW2NhbGxiYWNrXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFjayA9PSAnZm9jdXMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZXJlJ3MgYWxyZWFkeSBhIGZvY3VzZWQgZWxlbWVudCwgd2UgaGF2ZSB0byByZW1vdmUgZm9jdXMgZnJvbSBpdCBmaXJzdFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JykgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1tzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIHNlYXQuc2V0dGluZ3MuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ub2RlKCkuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0ICogVXNlciBjYW4gcGFzcyBoaXMgb3duIGNhbGxiYWNrIGZ1bmN0aW9uLCBzbyB3ZSBoYXZlIHRvIGZpcnN0IGNoZWNrIGlmIGl0IGV4aXN0c1xuXHRcdFx0XHRcdFx0XHRcdCAqIGFuZCBpZiBub3QsIHVzZSBvdXIgZGVmYXVsdCBjYWxsYmFjay5cblx0XHRcdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0XHRcdCAqIEVhY2ggY2FsbGJhY2sgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgaW4gdGhlIGN1cnJlbnQgc2VhdCBjb250ZXh0LlxuXHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmbi5zdHlsZSh0eXBlb2Ygc2VhdFNldHRpbmdzW2NoYXJhY3Rlcl1bY2FsbGJhY2tdID09PSAnZnVuY3Rpb24nID9cblx0XHRcdFx0XHRcdFx0XHRcdHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXS5hcHBseShzZWF0KSA6IHNlYXRDaGFydHNTZXR0aW5nc1tjYWxsYmFja10uYXBwbHkoc2VhdCkpO1xuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdC8vdGhlIGJlbG93IHdpbGwgYmVjb21lIHNlYXRTZXR0aW5ncywgY2hhcmFjdGVyLCBzZWF0IHRoYW5rcyB0byB0aGUgaW1tZWRpYXRlIGZ1bmN0aW9uXHRcdFxuXHRcdFx0XHRcdH0pKHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0cywgZm4uc2V0dGluZ3MuY2hhcmFjdGVyLCBmbik7XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLm5vZGUoKVxuXHRcdFx0XHRcdFx0Ly90aGUgZmlyc3QgdGhyZWUgbW91c2UgZXZlbnRzIGFyZSBzaW1wbGVcblx0XHRcdFx0XHRcdC5vbignY2xpY2snLCAgICAgIGZuLmNsaWNrKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWVudGVyJywgZm4uZm9jdXMpXG5cdFx0XHRcdFx0XHQub24oJ21vdXNlbGVhdmUnLCBmbi5ibHVyKVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQvL2tleWRvd24gcmVxdWlyZXMgcXVpdGUgYSBsb3Qgb2YgbG9naWMsIGJlY2F1c2Ugd2UgaGF2ZSB0byBrbm93IHdoZXJlIHRvIG1vdmUgdGhlIGZvY3VzXG5cdFx0XHRcdFx0XHQub24oJ2tleWRvd24nLCAgICAoZnVuY3Rpb24oc2VhdCwgJHNlYXQpIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1NlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9ldmVyeXRoaW5nIGRlcGVuZHMgb24gdGhlIHByZXNzZWQga2V5XG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoIChlLndoaWNoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL3NwYWNlYmFyIHdpbGwganVzdCB0cmlnZ2VyIHRoZSBzYW1lIGV2ZW50IG1vdXNlIGNsaWNrIGRvZXNcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5jbGljaygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdC8vVVAgJiBET1dOXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVGhpcyBpcyBhIHJlY3Vyc2l2ZSwgaW1tZWRpYXRlIGZ1bmN0aW9uIHdoaWNoIHNlYXJjaGVzIGZvciB0aGUgZmlyc3QgXCJmb2N1c2FibGVcIiByb3cuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBXZSdyZSB1c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gYmVjYXVzZSB3ZSB3YW50IGEgY29udmVuaWVudCBhY2Nlc3MgdG8gc29tZSBET00gZWxlbWVudHNcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgcmVjdXJzaW9uIGJlY2F1c2Ugc29tZXRpbWVzIHdlIG1heSBoaXQgYW4gZW1wdHkgc3BhY2UgcmF0aGVyIHRoYW4gYSBzZWF0LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAoZnVuY3Rpb24gZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkY3VycmVudFJvdykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciAkbmV3Um93O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbGV0J3MgZGV0ZXJtaW5lIHdoaWNoIHJvdyBzaG91bGQgd2UgbW92ZSB0b1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICYmIGUud2hpY2ggPT0gMzgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhpcyBpcyB0aGUgZmlyc3Qgcm93IGFuZCB1c2VyIGhhcyBwcmVzc2VkIHVwIGFycm93LCBtb3ZlIHRvIHRoZSBsYXN0IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRyb3dzLmluZGV4KCRjdXJyZW50Um93KSA9PSAkcm93cy5sZW5ndGgtMSAmJiBlLndoaWNoID09IDQwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGxhc3Qgcm93IGFuZCB1c2VyIGhhcyBwcmVzc2VkIGRvd24gYXJyb3csIG1vdmUgdG8gdGhlIGZpcnN0IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNpbmcgZXEgdG8gZ2V0IGFuIGVsZW1lbnQgYXQgdGhlIGRlc2lyZWQgaW5kZXggcG9zaXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5lcShcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB1cCBhcnJvdywgdGhlbiBkZWNyZW1lbnQgdGhlIGluZGV4LCBpZiBkb3duIGluY3JlbWVudCBpdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkcm93cy5pbmRleCgkY3VycmVudFJvdykgKyAoZS53aGljaCA9PSAzOCA/ICgtMSkgOiAoKzEpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9ub3cgdGhhdCB3ZSBrbm93IHRoZSByb3csIGxldCdzIGdldCB0aGUgc2VhdCB1c2luZyB0aGUgY3VycmVudCBjb2x1bW4gcG9zaXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9ICRuZXdSb3cuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLmVxKCRzZWF0cy5pbmRleCgkc2VhdCkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhlIHNlYXQgd2UgZm91bmQgaXMgYSBzcGFjZSwga2VlcCBsb29raW5nIGZ1cnRoZXJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJG5ld1NlYXQuaGFzQ2xhc3MoJ3NlYXRDaGFydHMtc3BhY2UnKSA/XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmaW5kQXZhaWxhYmxlKCRyb3dzLCAkc2VhdHMsICRuZXdSb3cpIDogJG5ld1NlYXQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250YWluZXIgYW5kIHRoZW4gc2VsZWN0IGFsbCByb3dzIGJ1dCB0aGUgaGVhZGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtY29udGFpbmVyJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1yb3c6bm90KC5zZWF0Q2hhcnRzLWhlYWRlciknKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgcm93IGFuZCB0aGVuIGZpbmQgYWxsIHNlYXQgY2VsbHMgKGJvdGggc2VhdHMgJiBzcGFjZXMpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtcm93OmZpcnN0Jylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0LC5zZWF0Q2hhcnRzLXNwYWNlJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXQucGFyZW50cygnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJylcblx0XHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vd2UgY291bGRuJ3QgZGV0ZXJtaW5lIHRoZSBuZXcgc2VhdCwgc28gd2UgYmV0dGVyIGdpdmUgdXBcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkbmV3U2VhdC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vcmVtb3ZlIGZvY3VzIGZyb20gdGhlIG9sZCBzZWF0IGFuZCBwdXQgaXQgb24gdGhlIG5ldyBvbmVcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ibHVyKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzWyRuZXdTZWF0LmF0dHIoJ2lkJyldLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0LmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBvdXIgXCJhcmlhXCIgcmVmZXJlbmNlIHdpdGggdGhlIG5ldyBzZWF0IGlkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgJG5ld1NlYXQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0Ly9MRUZUICYgUklHSFRcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoZSBsb2dpYyBoZXJlIGlzIHNsaWdodGx5IGRpZmZlcmVudCBmcm9tIHRoZSBvbmUgZm9yIHVwL2Rvd24gYXJyb3dzLlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBVc2VyIHdpbGwgYmUgYWJsZSB0byBicm93c2UgdGhlIHdob2xlIG1hcCB1c2luZyBqdXN0IGxlZnQvcmlnaHQgYXJyb3csIGJlY2F1c2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogaXQgd2lsbCBtb3ZlIHRvIHRoZSBuZXh0IHJvdyB3aGVuIHdlIHJlYWNoIHRoZSByaWdodC9sZWZ0LW1vc3Qgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uKCRzZWF0cykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRzZWF0cy5pbmRleCgkc2VhdCkgJiYgZS53aGljaCA9PSAzNykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2VyIGhhcyBwcmVzc2VkIGxlZnQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgbGVmdC1tb3N0IHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMubGFzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoJHNlYXRzLmluZGV4KCRzZWF0KSA9PSAkc2VhdHMubGVuZ3RoIC0xICYmIGUud2hpY2ggPT0gMzkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCByaWdodCBhcnJvdyBhbmQgd2UncmUgY3VycmVudGx5IG9uIHRoZSByaWdodC1tb3N0IHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMuZmlyc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9zaW1wbHkgbW92ZSBvbmUgc2VhdCBsZWZ0IG9yIHJpZ2h0IGRlcGVuZGluZyBvbiB0aGUga2V5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmVxKCRzZWF0cy5pbmRleCgkc2VhdCkgKyAoZS53aGljaCA9PSAzNyA/ICgtMSkgOiAoKzEpKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pKCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcjpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQ6bm90KC5zZWF0Q2hhcnRzLXNwYWNlKScpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vaGFuZGxlIGZvY3VzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1x0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzWyRuZXdTZWF0LmF0dHIoJ2lkJyldLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0LmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VwZGF0ZSBvdXIgXCJhcmlhXCIgcmVmZXJlbmNlIHdpdGggdGhlIG5ldyBzZWF0IGlkXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgJG5ld1NlYXQuYXR0cignaWQnKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1x0XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KShmbiwgZm4ubm9kZSgpKSk7XG5cdFx0XHRcdFx0XHQvLy5hcHBlbmRUbyhzZWF0Q2hhcnRzLmZpbmQoJy4nICsgcm93KSk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSkoZm4sIHNldHRpbmdzKTtcblx0XHRcdFxuXHRcdGZuLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNvbnRhaW5lcicpO1xuXHRcdFxuXHRcdC8vdHJ1ZSAtPiBkZWVwIGNvcHkhXG5cdFx0JC5leHRlbmQodHJ1ZSwgc2V0dGluZ3MsIHNldHVwKTtcdFx0XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IHJvdyBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcucm93cyA9IHNldHRpbmdzLm5hbWluZy5yb3dzIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciByb3dzID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3dzLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcm93cztcblx0XHR9KShzZXR0aW5ncy5tYXAubGVuZ3RoKTtcblx0XHRcblx0XHQvL0dlbmVyYXRlIGRlZmF1bHQgY29sdW1uIGlkcyB1bmxlc3MgdXNlciBwYXNzZWQgaGlzIG93blxuXHRcdHNldHRpbmdzLm5hbWluZy5jb2x1bW5zID0gc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMgfHwgKGZ1bmN0aW9uKGxlbmd0aCkge1xuXHRcdFx0dmFyIGNvbHVtbnMgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbHVtbnMucHVzaChpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjb2x1bW5zO1xuXHRcdH0pKHNldHRpbmdzLm1hcFswXS5zcGxpdCgnJykubGVuZ3RoKTtcblx0XHRcblx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLnRvcCkge1xuXHRcdFx0dmFyICRoZWFkZXJSb3cgPSAkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1yb3cgc2VhdENoYXJ0cy1oZWFkZXInKTtcblx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLm5hbWluZy5sZWZ0KSB7XG5cdFx0XHRcdCRoZWFkZXJSb3cuYXBwZW5kKCQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdCQuZWFjaChzZXR0aW5ncy5uYW1pbmcuY29sdW1ucywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG5cdFx0XHRcdCRoZWFkZXJSb3cuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsJylcblx0XHRcdFx0XHRcdC50ZXh0KHZhbHVlKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdFxuXHRcdGZuLmFwcGVuZCgkaGVhZGVyUm93KTtcblx0XHRcblx0XHQvL2RvIHRoaXMgZm9yIGVhY2ggbWFwIHJvd1xuXHRcdCQuZWFjaChzZXR0aW5ncy5tYXAsIGZ1bmN0aW9uKHJvdywgY2hhcmFjdGVycykge1xuXG5cdFx0XHR2YXIgJHJvdyA9ICQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93Jyk7XG5cdFx0XHRcdFxuXHRcdFx0aWYgKHNldHRpbmdzLm5hbWluZy5sZWZ0KSB7XG5cdFx0XHRcdCRyb3cuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVxuXHRcdFx0XHRcdFx0LnRleHQoc2V0dGluZ3MubmFtaW5nLnJvd3Nbcm93XSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Lypcblx0XHRcdCAqIERvIHRoaXMgZm9yIGVhY2ggc2VhdCAobGV0dGVyKVxuXHRcdFx0ICpcblx0XHRcdCAqIE5vdyB1c2VycyB3aWxsIGJlIGFibGUgdG8gcGFzcyBjdXN0b20gSUQgYW5kIGxhYmVsIHdoaWNoIG92ZXJ3cml0ZSB0aGUgb25lIHRoYXQgc2VhdCB3b3VsZCBiZSBhc3NpZ25lZCBieSBnZXRJZCBhbmRcblx0XHRcdCAqIGdldExhYmVsXG5cdFx0XHQgKlxuXHRcdFx0ICogTmV3IGZvcm1hdCBpcyBsaWtlIHRoaXM6XG5cdFx0XHQgKiBhW0lELGxhYmVsXWFbSURdYWFhYWFcblx0XHRcdCAqXG5cdFx0XHQgKiBTbyB5b3UgY2FuIG92ZXJ3cml0ZSB0aGUgSUQgb3IgbGFiZWwgKG9yIGJvdGgpIGV2ZW4gZm9yIGp1c3Qgb25lIHNlYXQuXG5cdFx0XHQgKiBCYXNpY2FsbHkgSUQgc2hvdWxkIGJlIGZpcnN0LCBzbyBpZiB5b3Ugd2FudCB0byBvdmVyd3JpdGUganVzdCBsYWJlbCB3cml0ZSBpdCBhcyBmb2xsb3dzOlxuXHRcdFx0ICogYVssTEFCRUxdXG5cdFx0XHQgKlxuXHRcdFx0ICogQWxsb3dlZCBjaGFyYWN0ZXJzIGluIElEcyBhcmVMIDAtOSwgYS16LCBBLVosIF9cblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBsYWJlbHMgYXJlOiAwLTksIGEteiwgQS1aLCBfLCAnICcgKHNwYWNlKVxuXHRcdFx0ICpcblx0XHRcdCAqL1xuXHRcdFx0IFxuXHRcdFx0JC5lYWNoKGNoYXJhY3RlcnMubWF0Y2goL1thLXpfXXsxfShcXFtbMC05YS16X117MCx9KCxbMC05YS16XyBdKyk/XFxdKT8vZ2kpLCBmdW5jdGlvbiAoY29sdW1uLCBjaGFyYWN0ZXJQYXJhbXMpIHsgXG5cdFx0XHRcdHZhciBtYXRjaGVzICAgICAgICAgPSBjaGFyYWN0ZXJQYXJhbXMubWF0Y2goLyhbYS16X117MX0pKFxcWyhbMC05YS16XyAsXSspXFxdKT8vaSksXG5cdFx0XHRcdFx0Ly9ubyBtYXR0ZXIgaWYgdXNlciBzcGVjaWZpZXMgW10gcGFyYW1zLCB0aGUgY2hhcmFjdGVyIHNob3VsZCBiZSBpbiB0aGUgc2Vjb25kIGVsZW1lbnRcblx0XHRcdFx0XHRjaGFyYWN0ZXIgICAgICAgPSBtYXRjaGVzWzFdLFxuXHRcdFx0XHRcdC8vY2hlY2sgaWYgdXNlciBoYXMgcGFzc2VkIHNvbWUgYWRkaXRpb25hbCBwYXJhbXMgdG8gb3ZlcnJpZGUgaWQgb3IgbGFiZWxcblx0XHRcdFx0XHRwYXJhbXMgICAgICAgICAgPSB0eXBlb2YgbWF0Y2hlc1szXSAhPT0gJ3VuZGVmaW5lZCcgPyBtYXRjaGVzWzNdLnNwbGl0KCcsJykgOiBbXSxcblx0XHRcdFx0XHQvL2lkIHBhcmFtIHNob3VsZCBiZSBmaXJzdFxuXHRcdFx0XHRcdG92ZXJyaWRlSWQgICAgICA9IHBhcmFtcy5sZW5ndGggPyBwYXJhbXNbMF0gOiBudWxsLFxuXHRcdFx0XHRcdC8vbGFiZWwgcGFyYW0gc2hvdWxkIGJlIHNlY29uZFxuXHRcdFx0XHRcdG92ZXJyaWRlTGFiZWwgICA9IHBhcmFtcy5sZW5ndGggPT09IDIgPyBwYXJhbXNbMV0gOiBudWxsO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHQkcm93LmFwcGVuZChjaGFyYWN0ZXIgIT0gJ18nID9cblx0XHRcdFx0XHQvL2lmIHRoZSBjaGFyYWN0ZXIgaXMgbm90IGFuIHVuZGVyc2NvcmUgKGVtcHR5IHNwYWNlKVxuXHRcdFx0XHRcdChmdW5jdGlvbihuYW1pbmcpIHtcblx0XG5cdFx0XHRcdFx0XHQvL3NvIHVzZXJzIGRvbid0IGhhdmUgdG8gc3BlY2lmeSBlbXB0eSBvYmplY3RzXG5cdFx0XHRcdFx0XHRzZXR0aW5ncy5zZWF0c1tjaGFyYWN0ZXJdID0gY2hhcmFjdGVyIGluIHNldHRpbmdzLnNlYXRzID8gc2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA6IHt9O1xuXHRcblx0XHRcdFx0XHRcdHZhciBpZCA9IG92ZXJyaWRlSWQgPyBvdmVycmlkZUlkIDogbmFtaW5nLmdldElkKGNoYXJhY3RlciwgbmFtaW5nLnJvd3Nbcm93XSwgbmFtaW5nLmNvbHVtbnNbY29sdW1uXSk7XG5cdFx0XHRcdFx0XHRzZWF0c1tpZF0gPSBuZXcgc2VhdCh7XG5cdFx0XHRcdFx0XHRcdGlkICAgICAgICA6IGlkLFxuXHRcdFx0XHRcdFx0XHRsYWJlbCAgICAgOiBvdmVycmlkZUxhYmVsID9cblx0XHRcdFx0XHRcdFx0XHRvdmVycmlkZUxhYmVsIDogbmFtaW5nLmdldExhYmVsKGNoYXJhY3RlciwgbmFtaW5nLnJvd3Nbcm93XSwgbmFtaW5nLmNvbHVtbnNbY29sdW1uXSksXG5cdFx0XHRcdFx0XHRcdHJvdyAgICAgICA6IHJvdyxcblx0XHRcdFx0XHRcdFx0Y29sdW1uICAgIDogY29sdW1uLFxuXHRcdFx0XHRcdFx0XHRjaGFyYWN0ZXIgOiBjaGFyYWN0ZXJcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHRzZWF0SWRzLnB1c2goaWQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRzW2lkXS5ub2RlKCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHR9KShzZXR0aW5ncy5uYW1pbmcpIDpcblx0XHRcdFx0XHQvL3RoaXMgaXMganVzdCBhbiBlbXB0eSBzcGFjZSAoXylcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwgc2VhdENoYXJ0cy1zcGFjZScpXHRcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRmbi5hcHBlbmQoJHJvdyk7XG5cdFx0fSk7XG5cdFxuXHRcdC8vaWYgdGhlcmUncmUgYW55IGxlZ2VuZCBpdGVtcyB0byBiZSByZW5kZXJlZFxuXHRcdHNldHRpbmdzLmxlZ2VuZC5pdGVtcy5sZW5ndGggPyAoZnVuY3Rpb24obGVnZW5kKSB7XG5cdFx0XHQvL2VpdGhlciB1c2UgdXNlci1kZWZpbmVkIGNvbnRhaW5lciBvciBjcmVhdGUgb3VyIG93biBhbmQgaW5zZXJ0IGl0IHJpZ2h0IGFmdGVyIHRoZSBzZWF0IGNoYXJ0IGRpdlxuXHRcdFx0dmFyICRjb250YWluZXIgPSAobGVnZW5kLm5vZGUgfHwgJCgnPGRpdj48L2Rpdj4nKS5pbnNlcnRBZnRlcihmbikpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmQnKTtcblx0XHRcdFx0XG5cdFx0XHR2YXIgJHVsID0gJCgnPHVsPjwvdWw+Jylcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZExpc3QnKVxuXHRcdFx0XHQuYXBwZW5kVG8oJGNvbnRhaW5lcik7XG5cdFx0XHRcblx0XHRcdCQuZWFjaChsZWdlbmQuaXRlbXMsIGZ1bmN0aW9uKGluZGV4LCBpdGVtKSB7XG5cdFx0XHRcdCR1bC5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGxpPjwvbGk+Jylcblx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRJdGVtJylcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0XHRcdFx0XHQvL21lcmdlIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggb3VyIHN0YW5kYXJkIG9uZXNcblx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoWydzZWF0Q2hhcnRzLXNlYXQnLCAnc2VhdENoYXJ0cy1jZWxsJywgaXRlbVsxXV0uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHRcdFx0c2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlb2Ygc2V0dGluZ3Muc2VhdHNbaXRlbVswXV0gPT0gXCJ1bmRlZmluZWRcIiA/IFtdIDogc2V0dGluZ3Muc2VhdHNbaXRlbVswXV0uY2xhc3Nlcykuam9pbignICcpXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0LmFwcGVuZChcblx0XHRcdFx0XHRcdFx0JCgnPHNwYW4+PC9zcGFuPicpXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZERlc2NyaXB0aW9uJylcblx0XHRcdFx0XHRcdFx0XHQudGV4dChpdGVtWzJdKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdHJldHVybiAkY29udGFpbmVyO1xuXHRcdH0pKHNldHRpbmdzLmxlZ2VuZCkgOiBudWxsO1xuXHRcblx0XHRmbi5hdHRyKHtcblx0XHRcdHRhYkluZGV4IDogMFxuXHRcdH0pO1xuXHRcdFxuXHRcdFxuXHRcdC8vd2hlbiBjb250YWluZXIncyBmb2N1c2VkLCBtb3ZlIGZvY3VzIHRvIHRoZSBmaXJzdCBzZWF0XG5cdFx0Zm4uZm9jdXMoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoZm4uYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JykpIHtcblx0XHRcdFx0c2VhdHNbZm4uYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JyldLmJsdXIoKTtcblx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRmbi5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSk6Zmlyc3QnKS5mb2N1cygpO1xuXHRcdFx0c2VhdHNbc2VhdElkc1swXV0uZm9jdXMoKTtcblxuXHRcdH0pO1xuXHRcblx0XHQvL3B1YmxpYyBtZXRob2RzIG9mIHNlYXRDaGFydHNcblx0XHRmbi5kYXRhKCdzZWF0Q2hhcnRzJywge1xuXHRcdFx0c2VhdHMgICA6IHNlYXRzLFxuXHRcdFx0c2VhdElkcyA6IHNlYXRJZHMsXG5cdFx0XHQvL3NldCBmb3Igb25lLCBzZXQgZm9yIG1hbnksIGdldCBmb3Igb25lXG5cdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBmbi5zZWF0c1thcmd1bWVudHNbMF1dLnN0YXR1cygpIDogKGZ1bmN0aW9uKHNlYXRzSWRzLCBuZXdTdGF0dXMpIHtcblx0XHRcdFx0XG5cdFx0XHRcdFx0cmV0dXJuIHR5cGVvZiBzZWF0c0lkcyA9PSAnc3RyaW5nJyA/IGZuLnNlYXRzW3NlYXRzSWRzXS5zdGF0dXMobmV3U3RhdHVzKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0SWRdLnN0YXR1cyhuZXdTdGF0dXMpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0fSkoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdFx0fSxcblx0XHRcdGVhY2ggIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRmb3IgKHZhciBzZWF0SWQgaW4gZm4uc2VhdHMpIHtcblx0XHRcdFx0XHRpZiAoZmFsc2UgPT09IGNhbGxiYWNrLmNhbGwoZm4uc2VhdHNbc2VhdElkXSwgc2VhdElkKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRJZDsvL3JldHVybiBsYXN0IGNoZWNrZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdG5vZGUgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0Ly9iYXNpY2FsbHkgY3JlYXRlIGEgQ1NTIHF1ZXJ5IHRvIGdldCBhbGwgc2VhdHMgYnkgdGhlaXIgRE9NIGlkc1xuXHRcdFx0XHRyZXR1cm4gJCgnIycgKyBmbi5zZWF0SWRzLmpvaW4oJywjJykpO1xuXHRcdFx0fSxcblxuXHRcdFx0ZmluZCAgICAgICA6IGZ1bmN0aW9uKHF1ZXJ5KSB7Ly9ELCBhLmF2YWlsYWJsZSwgdW5hdmFpbGFibGVcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHR2YXIgc2VhdFNldCA9IGZuLnNldCgpO1xuXHRcdFx0XG5cdFx0XHRcdC8vaXMgUmVnRXhwXG5cdFx0ICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeSBpbnN0YW5jZW9mIFJlZ0V4cCA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKGlkKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZC5tYXRjaChxdWVyeSkpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaChpZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgIH0pKCkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgKHF1ZXJ5Lmxlbmd0aCA9PSAxID9cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uIChjaGFyYWN0ZXIpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlciBzZWFyY2hlcyBqdXN0IGZvciBhIHBhcnRpY3VhbCBjaGFyYWN0ZXJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXIoKSA9PSBjaGFyYWN0ZXIpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKHF1ZXJ5KSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgcnVucyBhIG1vcmUgc29waGlzdGljYXRlZCBxdWVyeSwgc28gbGV0J3Mgc2VlIGlmIHRoZXJlJ3MgYSBkb3Rcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdWVyeS5pbmRleE9mKCcuJykgPiAtMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGVyZSdzIGEgZG90IHdoaWNoIHNlcGFyYXRlcyBjaGFyYWN0ZXIgYW5kIHRoZSBzdGF0dXNcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gcXVlcnkuc3BsaXQoJy4nKTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoc2VhdElkKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gcGFydHNbMF0gJiYgdGhpcy5zdGF0dXMoKSA9PSBwYXJ0c1sxXSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gcXVlcnkpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpXG5cdFx0ICAgICAgICAgICAgICAgICAgICApO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRzZXQgICAgICAgIDogZnVuY3Rpb24gc2V0KCkgey8vaW5oZXJpdHMgc29tZSBtZXRob2RzXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHNlYXRzICAgICAgOiBbXSxcblx0XHRcdFx0XHRzZWF0SWRzICAgIDogW10sXG5cdFx0XHRcdFx0bGVuZ3RoICAgICA6IDAsXG5cdFx0XHRcdFx0c3RhdHVzICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHMsXG5cdFx0XHRcdFx0XHRcdHRoYXQgPSB0aGlzO1xuXHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGp1c3Qgb25lIHNlYXQgaW4gdGhlIHNldCBhbmQgdXNlciBkaWRuJ3QgcGFzcyBhbnkgcGFyYW1zLCByZXR1cm4gY3VycmVudCBzdGF0dXNcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmxlbmd0aCA9PSAxICYmIGFyZ3MubGVuZ3RoID09IDAgPyB0aGlzLnNlYXRzWzBdLnN0YXR1cygpIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHQvL290aGVyd2lzZSBjYWxsIHN0YXR1cyBmdW5jdGlvbiBmb3IgZWFjaCBvZiB0aGUgc2VhdHMgaW4gdGhlIHNldFxuXHRcdFx0XHRcdFx0XHQkLmVhY2godGhhdC5zZWF0cywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zdGF0dXMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSkoKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG5vZGUgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5ub2RlLmNhbGwodGhpcyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRlYWNoICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZWFjaC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXQgICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZ2V0LmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5maW5kLmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNldC5jYWxsKGZuKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHB1c2ggICAgICAgOiBmdW5jdGlvbihpZCwgc2VhdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWF0cy5wdXNoKHNlYXQpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZWF0SWRzLnB1c2goaWQpO1xuXHRcdFx0XHRcdFx0Kyt0aGlzLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0Ly9nZXQgb25lIG9iamVjdCBvciBhIHNldCBvZiBvYmplY3RzXG5cdFx0XHRnZXQgICA6IGZ1bmN0aW9uKHNlYXRzSWRzKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBzZWF0c0lkcyA9PSAnc3RyaW5nJyA/IFxuXHRcdFx0XHRcdGZuLnNlYXRzW3NlYXRzSWRzXSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0JC5lYWNoKHNlYXRzSWRzLCBmdW5jdGlvbihpbmRleCwgc2VhdElkKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZm4uc2VhdHNbc2VhdElkXSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0LnB1c2goc2VhdElkLCBmbi5zZWF0c1tzZWF0SWRdKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0U2V0O1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0cmV0dXJuIGZuLmRhdGEoJ3NlYXRDaGFydHMnKTtcblx0fVxuXHRcblx0XG59KShqUXVlcnkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvanF1ZXJ5LnNlYXQtY2hhcnRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==