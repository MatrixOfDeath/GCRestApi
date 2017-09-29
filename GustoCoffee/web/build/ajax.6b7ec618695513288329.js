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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjhhNWU1ODkwOWI0Nzg0ZjRkODYiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50Iiwib24iLCJjb25zb2xlIiwibG9nIiwidmFsIiwiYWpheCIsInVybCIsIlJvdXRpbmciLCJnZW5lcmF0ZSIsInR5cGUiLCJkYXRhIiwiYXN5bmMiLCJzdWNjZXNzIiwicmVzcG9uc2VQYW5pZXIiLCJ0ZXh0U3RhdHVzIiwiZW1wdHkiLCJhcHBlbmQiLCJlcnJvciIsImFsZXJ0IiwidGhhdCIsImxvYWQiLCJmYWRlSW4iLCJyZXNwb25zZVByb2R1aXRzIiwiaGlkZSIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwicmVzcG9uc2UiLCJzaG93IiwiaWRTYWxsZSIsImlzRGlzcG8iLCJmaW5kIiwidmFsdWUiLCJyZWZyZXNoUGFuaWVyIiwiZmlyc3RTZWF0TGFiZWwiLCJyZWFkeSIsImxlbmd0aCIsImluaXRDYXJ0ZUludGVyYWN0aXZlIiwiJGNhcnQiLCIkY291bnRlciIsIiR0b3RhbCIsInNjIiwic2VhdENoYXJ0cyIsIm1hcCIsInNlYXRzIiwiZiIsInByaWNlIiwiY2xhc3NlcyIsImNhdGVnb3J5IiwiZSIsIm5hbWluZyIsInRvcCIsImdldExhYmVsIiwiY2hhcmFjdGVyIiwicm93IiwiY29sdW1uIiwibGVnZW5kIiwibm9kZSIsIml0ZW1zIiwiY2xpY2siLCJzdGF0dXMiLCJzZXR0aW5ncyIsImxhYmVsIiwiYXR0ciIsImlkIiwiYXBwZW5kVG8iLCJyZWNhbGN1bGF0ZVRvdGFsIiwicmVtb3ZlIiwic3R5bGUiLCJnZXQiLCJwYXJlbnRzIiwidG90YWwiLCJlYWNoIiwiZm4iLCJzZXR1cCIsInNlYXRJZHMiLCJhbmltYXRlIiwibGVmdCIsImdldElkIiwiZm9jdXMiLCJibHVyIiwic2VhdCIsInNlYXRDaGFydHNTZXR0aW5ncyIsImV4dGVuZCIsIiRub2RlIiwicm9sZSIsImZvY3VzYWJsZSIsInRhYkluZGV4IiwiYWRkQ2xhc3MiLCJjb25jYXQiLCJqb2luIiwiY2hhciIsImFyZ3VtZW50cyIsIm5ld1N0eWxlIiwib2xkU3R5bGUiLCJzd2l0Y2hDbGFzcyIsInJlbW92ZUNsYXNzIiwic2VhdFNldHRpbmdzIiwiaW5kZXgiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImFwcGx5IiwiJHNlYXQiLCIkbmV3U2VhdCIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJmaW5kQXZhaWxhYmxlIiwiJHJvd3MiLCIkc2VhdHMiLCIkY3VycmVudFJvdyIsIiRuZXdSb3ciLCJsYXN0IiwiZmlyc3QiLCJlcSIsImhhc0NsYXNzIiwicm93cyIsImkiLCJwdXNoIiwiY29sdW1ucyIsInNwbGl0IiwiJGhlYWRlclJvdyIsImNoYXJhY3RlcnMiLCIkcm93IiwibWF0Y2giLCJjaGFyYWN0ZXJQYXJhbXMiLCJtYXRjaGVzIiwicGFyYW1zIiwib3ZlcnJpZGVJZCIsIm92ZXJyaWRlTGFiZWwiLCIkY29udGFpbmVyIiwiaW5zZXJ0QWZ0ZXIiLCIkdWwiLCJpdGVtIiwic2VhdHNJZHMiLCJuZXdTdGF0dXMiLCJzZWF0SWQiLCJjYWxsIiwicXVlcnkiLCJzZWF0U2V0Iiwic2V0IiwiUmVnRXhwIiwiaW5kZXhPZiIsInBhcnRzIiwiYXJncyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxFQUFFQyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHlCQUF4QixFQUFtRCxZQUFVO0FBQ3pEQyxZQUFRQyxHQUFSLENBQVksY0FBY0osRUFBRSxJQUFGLEVBQVFLLEdBQVIsRUFBMUI7QUFDQUwsTUFBRU0sSUFBRixDQUFPO0FBQ0hDLGFBQUtDLFFBQVFDLFFBQVIsQ0FBaUIsMkJBQWpCLENBREY7QUFFSEMsY0FBTSxNQUZIO0FBR0hDLGNBQU07QUFDRixrQkFBTVgsRUFBRSxJQUFGLEVBQVFLLEdBQVI7QUFESixTQUhIO0FBTUhPLGVBQU8sSUFOSjtBQU9IQyxpQkFBUyxpQkFBVUMsY0FBVixFQUEwQjs7QUFFL0JkLGNBQUVNLElBQUYsQ0FBTztB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NUQsR0FBRzdCLEtBQUgsQ0FBU3lGLFFBQVQsQ0FETSxHQUNnQixZQUFXOztBQUVoQyxTQUFJSyxVQUFVakUsR0FBR2tFLEdBQUgsRUFBZDs7QUFFQS9JLE9BQUU0RSxJQUFGLENBQU82RCxRQUFQLEVBQWlCLFVBQVNuQyxLQUFULEVBQWdCcUMsTUFBaEIsRUFBd0I7QUFDeEMsVUFBSSxRQUFPOUQsR0FBRzdCLEtBQUgsQ0FBUzJGLE1BQVQsQ0FBUCxNQUE0QixRQUFoQyxFQUEwQztBQUN6Q0csZUFBUXJCLElBQVIsQ0FBYWtCLE1BQWIsRUFBcUI5RCxHQUFHN0IsS0FBSCxDQUFTMkYsTUFBVCxDQUFyQjtBQUNBO0FBQ0QsTUFKRDs7QUFNQSxZQUFPRyxPQUFQO0FBQ0EsS0FYb0IsRUFEdEI7QUFhQTtBQS9Jb0IsR0FBdEI7O0FBa0pBLFNBQU9qRSxHQUFHbEUsSUFBSCxDQUFRLFlBQVIsQ0FBUDtBQUNBLEVBbm1CRDtBQXNtQkEsQ0ExbUJELEVBMG1CR3lJLE1BMW1CSCxFIiwiZmlsZSI6ImFqYXguNmI3ZWM2MTg2OTU1MTMyODgzMjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjhhNWU1ODkwOWI0Nzg0ZjRkODYiLCIgICAgLy9cbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGFqYXhDaGFuZ2VRdGVQYW5pZXIoKSB7XG4gICAgLy8gICAgIC8vSidpbml0aWFsaXNlIGxlIG1vbnRhbnQgdG90YWwgw6AgMC5cbiAgICAvLyAgICAgdmFyIHRvdGFsID0gMDtcbiAgICAvL1xuICAgIC8vICAgICAvLyBKZSBib3VjbGUgc3VyIGxlIG5vbWJyZSBkZSBwcm9kdWl0IGFmaW4gZGUgcsOpY3Vww6lyZXIgbGV1ciBJRC4gSmUgY29tbWVuY2Ugw6AgMSBwYXJjZSBxdWUgbGUgcHJlbWllciBJRCBkdSBwcm9kdWl0IHZhdXQgMS5cbiAgICAvLyAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA1OyBpKyspIHtcbiAgICAvLyAgICAgICAgIC8vSmUgcsOpY3Vww6hyZSBsYSB2YWxldXIgcXVpIHNlIHRyb3V2ZSBkYW5zIGwnSWQgXCJwcml4K2lcIi5cbiAgICAvLyAgICAgICAgIHZhciBwcml4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaXgnICsgaSkuaW5uZXJUZXh0O1xuICAgIC8vXG4gICAgLy8gICAgICAgICAvL0plIHLDqWN1w6hyZSBzZXVsZW1lbnQgbGUgbm9tYnJlLlxuICAgIC8vICAgICAgICAgdmFyIHRoZW51bSA9IHByaXgubWF0Y2goL1xcZCsvKVswXTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgLy9KZSByw6ljdXDDqHJlIGxhIHZhbGV1ciBkdSBzZWxlY3QgcXVpIGEgcG91ciBpZCBcInF0ZStpXCJcbiAgICAvLyAgICAgICAgIHZhciBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F0ZScgKyBpKTtcbiAgICAvLyAgICAgICAgIC8vSmUgcsOpY3VwdcOocmUgc2V1bGVtZW50IGxhIHZhbGV1ciBxdWUgbCd1dGlsaXNhdGV1ciBhdXJhIGNob2lzaS5cbiAgICAvLyAgICAgICAgIHZhciBzdHJVc2VyID0gZS5vcHRpb25zW2Uuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIC8qSmUgY2FsY3VsZSBsZSB0b3RhbC4gSmUgcGFyc2VGbG9hdCBjYXIgaidhdmFpcyBxdWUgcXVlIHN0cmluZ3MuXG4gICAgLy8gICAgICAgICAgIEplIHBhcnNlRmxvYXQgc2kgYXUgY2FzIG/DuSBkYW5zIGxlIGZ1dHVyLCBsZSBzaXRlIGF1cmEgYmVzb2luIGRlIGZsb2F0XG4gICAgLy8gICAgICAgICAqL1xuICAgIC8vICAgICAgICAgdG90YWwgPSBwYXJzZUZsb2F0KHRvdGFsKSArIHBhcnNlRmxvYXQodGhlbnVtKSAqIHBhcnNlRmxvYXQoc3RyVXNlcik7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAvL0plIHJlbWV0cyB0b3RhbCDDoCBzdHJpbmcgcG91ciBwb3V2b2lyIGludMOpZ3JlciB0b3RhbCDDoCBtYSBwYWdlIGh0bWwudHdpZ1xuICAgIC8vICAgICB0b3RhbCA9IHRvdGFsLnRvU3RyaW5nKCk7XG4gICAgLy8gICAgIC8vSifDqWNyaXMgZGFucyBtYSBwYWdlIGh0bWwgw6AgbGEgc3BhbiBxdWkgYSBwb3VyIGlkPVwibW9udGFudGFwYXllclwiXG4gICAgLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9udGFudGFwYXllclwiKS5pbm5lckhUTUwgPSB0b3RhbCArIFwi4oKsXCI7XG4gICAgLy8gfVxuICAgIC8vIGFqYXhDaGFuZ2VRdGVQYW5pZXIoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uQWRkUHJvZHVjdFBhbmllcicsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWpvdXRfcHJvZHVpdF9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyKSB7XG5cbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcylcbiAgICAvLyB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICAvLyB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIC8vIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIC8vIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpO1xuICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1zYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5zaG93KCk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnV0dG9uU2VhcmNoJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGVja0Rpc3BvRGF0ZS5qcyIsIiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnRuLXN1Y2Nlc3MuYnV0dG9uQWRkU2FsbGUnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICB2YXIgaWRTYWxsZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICBjb25zb2xlLmxvZyhpZFNhbGxlICsgJ2lkc2FsbGUnKTtcbiAgIC8vICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG4gICAgJCgnI3RhYi1saW5rLXByb2R1aXQnKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICAvLyBmdW5jdGlvbiBnZXREaXNwb1NhbGxlKCl7XG4gICAgLy8gICAgICQuYWpheCh7XG4gICAgLy8gICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlX2FqYXgnKSxcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgLy8gICAgICAgICBkYXRhOiB7XG4gICAgLy8gICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgIC8vICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgIC8vICAgICAgICAgICAgIFwiaWRTYWxsZVwiIDogaWRTYWxsZSxcbiAgICAvLyAgICAgICAgIH0sc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gfVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGVfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICBcImlkU2FsbGVcIiA6IGlkU2FsbGUsXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChpc0Rpc3BvLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdham91dF9wYW5pZXJfc2FsbGUnKSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IGlkU2FsbGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIFwiaWRcIiA6IGlkU2FsbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNEaXNwbyA9ICcxJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncHJvZHVpdHNfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUHJvZHVpdHMsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAkKCcjZGlzcGxheS1wYW5pZXInKS5lbXB0eSgpLmh0bWwoaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdMYSBzYWxsZSBuXFwnZXN0IHBsdXMgZGlzcG9uaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgZGUgbGEgc2FsbGUgY2hvaXNpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IHNhbGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgbG9ycyBkZSBsYSB2w6lyaWZpY2F0aW9uIGRlIGxhIGRpc3BvbmliaWxpdMOpIGRlIGxhIHNhbGxlIG7CsCcrIGlkU2FsbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENob2l4U2FsbGUuanMiLCJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uRGVsZXRlU2FsbGUnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXJfc2FsbGUnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRzYWxsZVwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdzZWxlY3Quc2VsZWN0LXF0ZS1wcm9kdWl0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGFsZXJ0KCB0aGlzLnZhbHVlICsgJ2lkcHJvZHVpdCcrICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnKS52YWwoKSApO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWpvdXRfcHJvZHVpdF9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYnV0dG9uRGVsZXRlUHJvZHVpdCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgIFwicXRlXCI6IHRoaXMudmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllcikge1xuXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQYW5pZXIoKXtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4UGFuaWVyLmpzIiwidmFyIGZpcnN0U2VhdExhYmVsID0gMTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgICBpZigkKCcjc2VhdC1tYXAnKS5sZW5ndGggJiYgICQoJyNzZWxlY3RlZC1zZWF0cycpLmxlbmd0aCl7XG4gICAgICAgIGluaXRDYXJ0ZUludGVyYWN0aXZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdENhcnRlSW50ZXJhY3RpdmUoKXtcbiAgICAgICAgdmFyICRjYXJ0ID0gJCgnI3NlbGVjdGVkLXNlYXRzJyksXG4gICAgICAgICAgICAkY291bnRlciA9ICQoJyNjb3VudGVyJyksXG4gICAgICAgICAgICAkdG90YWwgPSAkKCcjdG90YWwnKSxcbiAgICAgICAgICAgIHNjID0gJCgnI3NlYXQtbWFwJykuc2VhdENoYXJ0cyh7XG4gICAgICAgICAgICAgICAgbWFwOiBbXG4gICAgICAgICAgICAgICAgICAgICdmZl9mZicsXG4gICAgICAgICAgICAgICAgICAgICdmZl9mZicsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9fXycsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZWVlZScsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzZWF0czoge1xuICAgICAgICAgICAgICAgICAgICBmOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdmaXJzdC1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ0ZpcnN0IENsYXNzJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdlY29ub215LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnRWNvbm9teSBDbGFzcydcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0TGFiZWw6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlyc3RTZWF0TGFiZWwrKztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgICAgICBub2RlOiAkKCcjbGVnZW5kJyksXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2YnLCAnYXZhaWxhYmxlJywgJ0ZpcnN0IENsYXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2UnLCAnYXZhaWxhYmxlJywgJ0Vjb25vbXkgQ2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZicsICd1bmF2YWlsYWJsZScsICdBbHJlYWR5IEJvb2tlZCddXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCdzIGNyZWF0ZSBhIG5ldyA8bGk+IHdoaWNoIHdlJ2xsIGFkZCB0byB0aGUgY2FydCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGxpPicgKyB0aGlzLmRhdGEoKS5jYXRlZ29yeSArICcgU2VhdCAjICcgKyB0aGlzLnNldHRpbmdzLmxhYmVsICsgJzogPGI+JCcgKyB0aGlzLmRhdGEoKS5wcmljZSArICc8L2I+IDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjYW5jZWwtY2FydC1pdGVtXCI+W2NhbmNlbF08L2E+PC9saT4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ3NlYXRJZCcsIHRoaXMuc2V0dGluZ3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCRjYXJ0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIExldHMgdXBkYXRlIHRoZSBjb3VudGVyIGFuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIC5maW5kIGZ1bmN0aW9uIHdpbGwgbm90IGZpbmQgdGhlIGN1cnJlbnQgc2VhdCwgYmVjYXVzZSBpdCB3aWxsIGNoYW5nZSBpdHMgc3RhdXRzIG9ubHkgYWZ0ZXIgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiAnc2VsZWN0ZWQnLiBUaGlzIGlzIHdoeSB3ZSBoYXZlIHRvIGFkZCAxIHRvIHRoZSBsZW5ndGggYW5kIHRoZSBjdXJyZW50IHNlYXQgcHJpY2UgdG8gdGhlIHRvdGFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSArIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSB0aGUgY291bnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbmQgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpIC0gdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSB0aGUgaXRlbSBmcm9tIG91ciBjYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FydC1pdGVtLScgKyB0aGlzLnNldHRpbmdzLmlkKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIHZhY2F0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICd1bmF2YWlsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiBhbHJlYWR5IGJvb2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1bmF2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy90aGlzIHdpbGwgaGFuZGxlIFwiW2NhbmNlbF1cIiBsaW5rIGNsaWNrc1xuICAgICAgICAkKCcjc2VsZWN0ZWQtc2VhdHMnKS5vbignY2xpY2snLCAnLmNhbmNlbC1jYXJ0LWl0ZW0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL2xldCdzIGp1c3QgdHJpZ2dlciBDbGljayBldmVudCBvbiB0aGUgYXBwcm9wcmlhdGUgc2VhdCwgc28gd2UgZG9uJ3QgaGF2ZSB0byByZXBlYXQgdGhlIGxvZ2ljIGhlcmVcbiAgICAgICAgICAgIHNjLmdldCgkKHRoaXMpLnBhcmVudHMoJ2xpOmZpcnN0JykuZGF0YSgnc2VhdElkJykpLmNsaWNrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vbGV0J3MgcHJldGVuZCBzb21lIHNlYXRzIGhhdmUgYWxyZWFkeSBiZWVuIGJvb2tlZFxuICAgICAgICBzYy5nZXQoWycxXzInLCAnNF8xJywgJzdfMScsICc3XzInXSkuc3RhdHVzKCd1bmF2YWlsYWJsZScpO1xuICAgIH1cblxufSk7XG5cbmZ1bmN0aW9uIHJlY2FsY3VsYXRlVG90YWwoc2MpIHtcbiAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgLy9iYXNpY2FsbHkgZmluZCBldmVyeSBzZWxlY3RlZCBzZWF0IGFuZCBzdW0gaXRzIHByaWNlXG4gICAgc2MuZmluZCgnc2VsZWN0ZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG90YWwgKz0gdGhpcy5kYXRhKCkucHJpY2U7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG90YWw7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIi8qIVxuICogalF1ZXJ5LVNlYXQtQ2hhcnRzIHYxLjEuNSAtPiB2MiAoS2FyaW0gQk9VQlJJVClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRldXN6bWFya293c2tpL2pRdWVyeS1TZWF0LUNoYXJ0c1xuICpcbiAqIENvcHlyaWdodCAyMDEzLCAyMDE2IE1hdGV1c3ogTWFya293c2tpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIFVwZ3JhZGUgYnkgYXV0aG9yOiBLYXJpbSBCT1VCUklUXG4gKi9cblxuKGZ1bmN0aW9uKCQpIHtcblx0XHRcblx0Ly8ndXNlIHN0cmljdCc7XHRcblx0XHRcblx0JC5mbi5zZWF0Q2hhcnRzID0gZnVuY3Rpb24gKHNldHVwKSB7XG5cblx0XHQvL2lmIHRoZXJlJ3Mgc2VhdENoYXJ0cyBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQsIHJldHVybiBpdFxuXHRcdGlmICh0aGlzLmRhdGEoJ3NlYXRDaGFydHMnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgZm4gICAgICAgPSB0aGlzLFxuXHRcdFx0c2VhdHMgICAgPSB7fSxcblx0XHRcdHNlYXRJZHMgID0gW10sXG5cdFx0XHRsZWdlbmQsXG5cdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0YW5pbWF0ZSA6IGZhbHNlLCAvL3JlcXVpcmVzIGpRdWVyeSBVSVxuXHRcdFx0XHRuYW1pbmcgIDoge1xuXHRcdFx0XHRcdHRvcCAgICA6IHRydWUsXG5cdFx0XHRcdFx0bGVmdCAgIDogdHJ1ZSxcblx0XHRcdFx0XHRnZXRJZCAgOiBmdW5jdGlvbihjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcm93ICsgJ18nICsgY29sdW1uO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0TGFiZWwgOiBmdW5jdGlvbiAoY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbHVtbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxlZ2VuZCA6IHtcblx0XHRcdFx0XHRub2RlICAgOiBudWxsLFxuXHRcdFx0XHRcdGl0ZW1zICA6IFtdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsaWNrICAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ3NlbGVjdGVkJztcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3NlbGVjdGVkJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdhdmFpbGFibGUnO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9jdXMgIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdmb2N1c2VkJztcblx0XHRcdFx0XHR9IGVsc2UgIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRibHVyICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdGF0dXMoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VhdHMgICA6IHt9XG5cdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQvL3NlYXQgd2lsbCBiZSBiYXNpY2FsbHkgYSBzZWF0IG9iamVjdCB3aGljaCB3ZSdsbCB3aGVuIGdlbmVyYXRpbmcgdGhlIG1hcFxuXHRcdFx0c2VhdCA9IChmdW5jdGlvbihzZWF0Q2hhcnRzLCBzZWF0Q2hhcnRzU2V0dGluZ3MpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChzZXR1cCkge1xuXHRcdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRzdGF0dXMgOiAnYXZhaWxhYmxlJywgLy9hdmFpbGFibGUsIHVuYXZhaWxhYmxlLCBzZWxlY3RlZFxuXHRcdFx0XHRcdFx0c3R5bGUgIDogJ2F2YWlsYWJsZScsXG5cdFx0XHRcdFx0XHQvL21ha2Ugc3VyZSB0aGVyZSdzIGFuIGVtcHR5IGhhc2ggaWYgdXNlciBkb2Vzbid0IHBhc3MgYW55dGhpbmdcblx0XHRcdFx0XHRcdGRhdGEgICA6IHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tzZXR1cC5jaGFyYWN0ZXJdIHx8IHt9XG5cdFx0XHRcdFx0XHQvL2FueXRoaW5nIGdvZXMgaGVyZT9cblx0XHRcdFx0XHR9LCBzZXR1cCk7XG5cblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGVcblx0XHRcdFx0XHRcdC5hdHRyKHtcblx0XHRcdFx0XHRcdFx0aWQgICAgICAgICAgICAgOiBmbi5zZXR0aW5ncy5pZCxcblx0XHRcdFx0XHRcdFx0cm9sZSAgICAgICAgICAgOiAnY2hlY2tib3gnLFxuXHRcdFx0XHRcdFx0XHQnYXJpYS1jaGVja2VkJyA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRmb2N1c2FibGUgICAgICA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHRhYkluZGV4ICAgICAgIDogLTEgLy9tYW51YWwgZm9jdXNcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQudGV4dChmbi5zZXR0aW5ncy5sYWJlbClcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyhbJ3NlYXRDaGFydHMtc2VhdCcsICdzZWF0Q2hhcnRzLWNlbGwnLCAnYXZhaWxhYmxlJ10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHQvL2xldCdzIG1lcmdlIGN1c3RvbSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIHN0YW5kYXJkIEpTQyBvbmVzXG5cdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHR0eXBlb2Ygc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW2ZuLnNldHRpbmdzLmNoYXJhY3Rlcl0gPT0gXCJ1bmRlZmluZWRcIiA/IFxuXHRcdFx0XHRcdFx0XHRcdFtdIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW2ZuLnNldHRpbmdzLmNoYXJhY3Rlcl0uY2xhc3Nlc1xuXHRcdFx0XHRcdFx0XHQpLmpvaW4oJyAnKSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9iYXNpY2FsbHkgYSB3cmFwcGVyIGZ1bmN0aW9uXG5cdFx0XHRcdFx0Zm4uZGF0YSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLmRhdGE7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5jaGFyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuY2hhcmFjdGVyO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4ubm9kZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLiRub2RlO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdCAqIENhbiBlaXRoZXIgc2V0IG9yIHJldHVybiBzdGF0dXMgZGVwZW5kaW5nIG9uIGFyZ3VtZW50cy5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHRoZXJlJ3Mgbm8gYXJndW1lbnQsIGl0IHdpbGwgcmV0dXJuIHRoZSBjdXJyZW50IHN0eWxlLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgeW91IHBhc3MgYW4gYXJndW1lbnQsIGl0IHdpbGwgdXBkYXRlIHNlYXQncyBzdHlsZVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGZuLnN0eWxlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09IDEgP1xuXHRcdFx0XHRcdFx0XHQoZnVuY3Rpb24obmV3U3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgb2xkU3R5bGUgPSBmbi5zZXR0aW5ncy5zdHlsZTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vaWYgbm90aGluZyBjaGFuZ2VzLCBkbyBub3RoaW5nXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG5ld1N0eWxlID09IG9sZFN0eWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb2xkU3R5bGU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZm9jdXNlZCBpcyBhIHNwZWNpYWwgc3R5bGUgd2hpY2ggaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBzdGF0dXNcblx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy5zdGF0dXMgPSBuZXdTdHlsZSAhPSAnZm9jdXNlZCcgPyBuZXdTdHlsZSA6IGZuLnNldHRpbmdzLnN0YXR1cztcblx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0XHRcdFx0LmF0dHIoJ2FyaWEtY2hlY2tlZCcsIG5ld1N0eWxlID09ICdzZWxlY3RlZCcpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiB1c2VyIHdhbnRzIHRvIGFuaW1hdGUgc3RhdHVzIGNoYW5nZXMsIGxldCBoaW0gZG8gdGhpc1xuXHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHNTZXR0aW5ncy5hbmltYXRlID9cblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnN3aXRjaENsYXNzKG9sZFN0eWxlLCBuZXdTdHlsZSwgMjAwKSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZS5yZW1vdmVDbGFzcyhvbGRTdHlsZSkuYWRkQ2xhc3MobmV3U3R5bGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0eWxlID0gbmV3U3R5bGU7XG5cdFx0XHRcdFx0XHRcdH0pKGFyZ3VtZW50c1swXSkgOiBmbi5zZXR0aW5ncy5zdHlsZTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vZWl0aGVyIHNldCBvciByZXRyaWV2ZVxuXHRcdFx0XHRcdGZuLnN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuXHRcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5zdGF0dXMgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBcblx0XHRcdFx0XHRcdFx0Zm4uc3R5bGUoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0YXR1cztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIHRvIGNvbnZpZW5pZXRseSBnZXQgc2hvcnRjdXQgdmFyaWFibGVzXG5cdFx0XHRcdFx0KGZ1bmN0aW9uKHNlYXRTZXR0aW5ncywgY2hhcmFjdGVyLCBzZWF0KSB7XG5cdFx0XHRcdFx0XHQvL2F0dGFjaCBldmVudCBoYW5kbGVyc1xuXHRcdFx0XHRcdFx0JC5lYWNoKFsnY2xpY2snLCAnZm9jdXMnLCAnYmx1ciddLCBmdW5jdGlvbihpbmRleCwgY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQvL3dlIHdhbnQgdG8gYmUgYWJsZSB0byBjYWxsIHRoZSBmdW5jdGlvbnMgZm9yIGVhY2ggc2VhdCBvYmplY3Rcblx0XHRcdFx0XHRcdFx0Zm5bY2FsbGJhY2tdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrID09ICdmb2N1cycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBhbHJlYWR5IGEgZm9jdXNlZCBlbGVtZW50LCB3ZSBoYXZlIHRvIHJlbW92ZSBmb2N1cyBmcm9tIGl0IGZpcnN0XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzW3NlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JyldLmJsdXIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jywgc2VhdC5zZXR0aW5ncy5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0Lm5vZGUoKS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHQgKiBVc2VyIGNhbiBwYXNzIGhpcyBvd24gY2FsbGJhY2sgZnVuY3Rpb24sIHNvIHdlIGhhdmUgdG8gZmlyc3QgY2hlY2sgaWYgaXQgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdFx0ICogYW5kIGlmIG5vdCwgdXNlIG91ciBkZWZhdWx0IGNhbGxiYWNrLlxuXHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0ICogRWFjaCBjYWxsYmFjayBmdW5jdGlvbiBpcyBleGVjdXRlZCBpbiB0aGUgY3VycmVudCBzZWF0IGNvbnRleHQuXG5cdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZuLnN0eWxlKHR5cGVvZiBzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10gPT09ICdmdW5jdGlvbicgP1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdFNldHRpbmdzW2NoYXJhY3Rlcl1bY2FsbGJhY2tdLmFwcGx5KHNlYXQpIDogc2VhdENoYXJ0c1NldHRpbmdzW2NhbGxiYWNrXS5hcHBseShzZWF0KSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly90aGUgYmVsb3cgd2lsbCBiZWNvbWUgc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQgdGhhbmtzIHRvIHRoZSBpbW1lZGlhdGUgZnVuY3Rpb25cdFx0XG5cdFx0XHRcdFx0fSkoc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzLCBmbi5zZXR0aW5ncy5jaGFyYWN0ZXIsIGZuKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4ubm9kZSgpXG5cdFx0XHRcdFx0XHQvL3RoZSBmaXJzdCB0aHJlZSBtb3VzZSBldmVudHMgYXJlIHNpbXBsZVxuXHRcdFx0XHRcdFx0Lm9uKCdjbGljaycsICAgICAgZm4uY2xpY2spXG5cdFx0XHRcdFx0XHQub24oJ21vdXNlZW50ZXInLCBmbi5mb2N1cylcblx0XHRcdFx0XHRcdC5vbignbW91c2VsZWF2ZScsIGZuLmJsdXIpXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8va2V5ZG93biByZXF1aXJlcyBxdWl0ZSBhIGxvdCBvZiBsb2dpYywgYmVjYXVzZSB3ZSBoYXZlIHRvIGtub3cgd2hlcmUgdG8gbW92ZSB0aGUgZm9jdXNcblx0XHRcdFx0XHRcdC5vbigna2V5ZG93bicsICAgIChmdW5jdGlvbihzZWF0LCAkc2VhdCkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHZhciAkbmV3U2VhdDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvL2V2ZXJ5dGhpbmcgZGVwZW5kcyBvbiB0aGUgcHJlc3NlZCBrZXlcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGUud2hpY2gpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vc3BhY2ViYXIgd2lsbCBqdXN0IHRyaWdnZXIgdGhlIHNhbWUgZXZlbnQgbW91c2UgY2xpY2sgZG9lc1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9VUCAmIERPV05cblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGlzIGlzIGEgcmVjdXJzaXZlLCBpbW1lZGlhdGUgZnVuY3Rpb24gd2hpY2ggc2VhcmNoZXMgZm9yIHRoZSBmaXJzdCBcImZvY3VzYWJsZVwiIHJvdy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIGltbWVkaWF0ZSBmdW5jdGlvbiBiZWNhdXNlIHdlIHdhbnQgYSBjb252ZW5pZW50IGFjY2VzcyB0byBzb21lIERPTSBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBXZSdyZSB1c2luZyByZWN1cnNpb24gYmVjYXVzZSBzb21ldGltZXMgd2UgbWF5IGhpdCBhbiBlbXB0eSBzcGFjZSByYXRoZXIgdGhhbiBhIHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbiBmaW5kQXZhaWxhYmxlKCRyb3dzLCAkc2VhdHMsICRjdXJyZW50Um93KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdSb3c7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9sZXQncyBkZXRlcm1pbmUgd2hpY2ggcm93IHNob3VsZCB3ZSBtb3ZlIHRvXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkcm93cy5pbmRleCgkY3VycmVudFJvdykgJiYgZS53aGljaCA9PSAzOCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBmaXJzdCByb3cgYW5kIHVzZXIgaGFzIHByZXNzZWQgdXAgYXJyb3csIG1vdmUgdG8gdGhlIGxhc3Qgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MubGFzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoJHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpID09ICRyb3dzLmxlbmd0aC0xICYmIGUud2hpY2ggPT0gNDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhpcyBpcyB0aGUgbGFzdCByb3cgYW5kIHVzZXIgaGFzIHByZXNzZWQgZG93biBhcnJvdywgbW92ZSB0byB0aGUgZmlyc3Qgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZmlyc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2luZyBlcSB0byBnZXQgYW4gZWxlbWVudCBhdCB0aGUgZGVzaXJlZCBpbmRleCBwb3NpdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmVxKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHVwIGFycm93LCB0aGVuIGRlY3JlbWVudCB0aGUgaW5kZXgsIGlmIGRvd24gaW5jcmVtZW50IGl0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRyb3dzLmluZGV4KCRjdXJyZW50Um93KSArIChlLndoaWNoID09IDM4ID8gKC0xKSA6ICgrMSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL25vdyB0aGF0IHdlIGtub3cgdGhlIHJvdywgbGV0J3MgZ2V0IHRoZSBzZWF0IHVzaW5nIHRoZSBjdXJyZW50IGNvbHVtbiBwb3NpdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gJG5ld1Jvdy5maW5kKCcuc2VhdENoYXJ0cy1zZWF0LC5zZWF0Q2hhcnRzLXNwYWNlJykuZXEoJHNlYXRzLmluZGV4KCRzZWF0KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGUgc2VhdCB3ZSBmb3VuZCBpcyBhIHNwYWNlLCBrZWVwIGxvb2tpbmcgZnVydGhlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkbmV3U2VhdC5oYXNDbGFzcygnc2VhdENoYXJ0cy1zcGFjZScpID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJG5ld1JvdykgOiAkbmV3U2VhdDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkoJHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRhaW5lciBhbmQgdGhlbiBzZWxlY3QgYWxsIHJvd3MgYnV0IHRoZSBoZWFkZXJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXInKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCByb3cgYW5kIHRoZW4gZmluZCBhbGwgc2VhdCBjZWxscyAoYm90aCBzZWF0cyAmIHNwYWNlcylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1yb3c6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkc2VhdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1yb3c6bm90KC5zZWF0Q2hhcnRzLWhlYWRlciknKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly93ZSBjb3VsZG4ndCBkZXRlcm1pbmUgdGhlIG5ldyBzZWF0LCBzbyB3ZSBiZXR0ZXIgZ2l2ZSB1cFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9yZW1vdmUgZm9jdXMgZnJvbSB0aGUgb2xkIHNlYXQgYW5kIHB1dCBpdCBvbiB0aGUgbmV3IG9uZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbJG5ld1NlYXQuYXR0cignaWQnKV0uZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXBkYXRlIG91ciBcImFyaWFcIiByZWZlcmVuY2Ugd2l0aCB0aGUgbmV3IHNlYXQgaWRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCAkbmV3U2VhdC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1x0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHQvL0xFRlQgJiBSSUdIVFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVGhlIGxvZ2ljIGhlcmUgaXMgc2xpZ2h0bHkgZGlmZmVyZW50IGZyb20gdGhlIG9uZSBmb3IgdXAvZG93biBhcnJvd3MuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgd2lsbCBiZSBhYmxlIHRvIGJyb3dzZSB0aGUgd2hvbGUgbWFwIHVzaW5nIGp1c3QgbGVmdC9yaWdodCBhcnJvdywgYmVjYXVzZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBpdCB3aWxsIG1vdmUgdG8gdGhlIG5leHQgcm93IHdoZW4gd2UgcmVhY2ggdGhlIHJpZ2h0L2xlZnQtbW9zdCBzZWF0LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAoZnVuY3Rpb24oJHNlYXRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJHNlYXRzLmluZGV4KCRzZWF0KSAmJiBlLndoaWNoID09IDM3KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgbGVmdCBhcnJvdyBhbmQgd2UncmUgY3VycmVudGx5IG9uIHRoZSBsZWZ0LW1vc3Qgc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkc2VhdHMuaW5kZXgoJHNlYXQpID09ICRzZWF0cy5sZW5ndGggLTEgJiYgZS53aGljaCA9PSAzOSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2VyIGhhcyBwcmVzc2VkIHJpZ2h0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIHJpZ2h0LW1vc3Qgc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3NpbXBseSBtb3ZlIG9uZSBzZWF0IGxlZnQgb3IgcmlnaHQgZGVwZW5kaW5nIG9uIHRoZSBrZXlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMuZXEoJHNlYXRzLmluZGV4KCRzZWF0KSArIChlLndoaWNoID09IDM3ID8gKC0xKSA6ICgrMSkpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkoJHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtY29udGFpbmVyOmZpcnN0Jylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkbmV3U2VhdC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9oYW5kbGUgZm9jdXNcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ibHVyKCk7XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbJG5ld1NlYXQuYXR0cignaWQnKV0uZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXBkYXRlIG91ciBcImFyaWFcIiByZWZlcmVuY2Ugd2l0aCB0aGUgbmV3IHNlYXQgaWRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCAkbmV3U2VhdC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcblx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH0pKGZuLCBmbi5ub2RlKCkpKTtcblx0XHRcdFx0XHRcdC8vLmFwcGVuZFRvKHNlYXRDaGFydHMuZmluZCgnLicgKyByb3cpKTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9KShmbiwgc2V0dGluZ3MpO1xuXHRcdFx0XG5cdFx0Zm4uYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY29udGFpbmVyJyk7XG5cdFx0XG5cdFx0Ly90cnVlIC0+IGRlZXAgY29weSFcblx0XHQkLmV4dGVuZCh0cnVlLCBzZXR0aW5ncywgc2V0dXApO1x0XHRcblx0XHRcblx0XHQvL0dlbmVyYXRlIGRlZmF1bHQgcm93IGlkcyB1bmxlc3MgdXNlciBwYXNzZWQgaGlzIG93blxuXHRcdHNldHRpbmdzLm5hbWluZy5yb3dzID0gc2V0dGluZ3MubmFtaW5nLnJvd3MgfHwgKGZ1bmN0aW9uKGxlbmd0aCkge1xuXHRcdFx0dmFyIHJvd3MgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvd3MucHVzaChpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByb3dzO1xuXHRcdH0pKHNldHRpbmdzLm1hcC5sZW5ndGgpO1xuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCBjb2x1bW4gaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLmNvbHVtbnMgPSBzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgY29sdW1ucyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29sdW1ucy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvbHVtbnM7XG5cdFx0fSkoc2V0dGluZ3MubWFwWzBdLnNwbGl0KCcnKS5sZW5ndGgpO1xuXHRcdFxuXHRcdGlmIChzZXR0aW5ncy5uYW1pbmcudG9wKSB7XG5cdFx0XHR2YXIgJGhlYWRlclJvdyA9ICQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdyBzZWF0Q2hhcnRzLWhlYWRlcicpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLmxlZnQpIHtcblx0XHRcdFx0JGhlYWRlclJvdy5hcHBlbmQoJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsJykpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0JC5lYWNoKHNldHRpbmdzLm5hbWluZy5jb2x1bW5zLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcblx0XHRcdFx0JGhlYWRlclJvdy5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKVxuXHRcdFx0XHRcdFx0LnRleHQodmFsdWUpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0XG5cdFx0Zm4uYXBwZW5kKCRoZWFkZXJSb3cpO1xuXHRcdFxuXHRcdC8vZG8gdGhpcyBmb3IgZWFjaCBtYXAgcm93XG5cdFx0JC5lYWNoKHNldHRpbmdzLm1hcCwgZnVuY3Rpb24ocm93LCBjaGFyYWN0ZXJzKSB7XG5cblx0XHRcdHZhciAkcm93ID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1yb3cnKTtcblx0XHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLmxlZnQpIHtcblx0XHRcdFx0JHJvdy5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwgc2VhdENoYXJ0cy1zcGFjZScpXG5cdFx0XHRcdFx0XHQudGV4dChzZXR0aW5ncy5uYW1pbmcucm93c1tyb3ddKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKlxuXHRcdFx0ICogRG8gdGhpcyBmb3IgZWFjaCBzZWF0IChsZXR0ZXIpXG5cdFx0XHQgKlxuXHRcdFx0ICogTm93IHVzZXJzIHdpbGwgYmUgYWJsZSB0byBwYXNzIGN1c3RvbSBJRCBhbmQgbGFiZWwgd2hpY2ggb3ZlcndyaXRlIHRoZSBvbmUgdGhhdCBzZWF0IHdvdWxkIGJlIGFzc2lnbmVkIGJ5IGdldElkIGFuZFxuXHRcdFx0ICogZ2V0TGFiZWxcblx0XHRcdCAqXG5cdFx0XHQgKiBOZXcgZm9ybWF0IGlzIGxpa2UgdGhpczpcblx0XHRcdCAqIGFbSUQsbGFiZWxdYVtJRF1hYWFhYVxuXHRcdFx0ICpcblx0XHRcdCAqIFNvIHlvdSBjYW4gb3ZlcndyaXRlIHRoZSBJRCBvciBsYWJlbCAob3IgYm90aCkgZXZlbiBmb3IganVzdCBvbmUgc2VhdC5cblx0XHRcdCAqIEJhc2ljYWxseSBJRCBzaG91bGQgYmUgZmlyc3QsIHNvIGlmIHlvdSB3YW50IHRvIG92ZXJ3cml0ZSBqdXN0IGxhYmVsIHdyaXRlIGl0IGFzIGZvbGxvd3M6XG5cdFx0XHQgKiBhWyxMQUJFTF1cblx0XHRcdCAqXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gSURzIGFyZUwgMC05LCBhLXosIEEtWiwgX1xuXHRcdFx0ICogQWxsb3dlZCBjaGFyYWN0ZXJzIGluIGxhYmVscyBhcmU6IDAtOSwgYS16LCBBLVosIF8sICcgJyAoc3BhY2UpXG5cdFx0XHQgKlxuXHRcdFx0ICovXG5cdFx0XHQgXG5cdFx0XHQkLmVhY2goY2hhcmFjdGVycy5tYXRjaCgvW2Etel9dezF9KFxcW1swLTlhLXpfXXswLH0oLFswLTlhLXpfIF0rKT9cXF0pPy9naSksIGZ1bmN0aW9uIChjb2x1bW4sIGNoYXJhY3RlclBhcmFtcykgeyBcblx0XHRcdFx0dmFyIG1hdGNoZXMgICAgICAgICA9IGNoYXJhY3RlclBhcmFtcy5tYXRjaCgvKFthLXpfXXsxfSkoXFxbKFswLTlhLXpfICxdKylcXF0pPy9pKSxcblx0XHRcdFx0XHQvL25vIG1hdHRlciBpZiB1c2VyIHNwZWNpZmllcyBbXSBwYXJhbXMsIHRoZSBjaGFyYWN0ZXIgc2hvdWxkIGJlIGluIHRoZSBzZWNvbmQgZWxlbWVudFxuXHRcdFx0XHRcdGNoYXJhY3RlciAgICAgICA9IG1hdGNoZXNbMV0sXG5cdFx0XHRcdFx0Ly9jaGVjayBpZiB1c2VyIGhhcyBwYXNzZWQgc29tZSBhZGRpdGlvbmFsIHBhcmFtcyB0byBvdmVycmlkZSBpZCBvciBsYWJlbFxuXHRcdFx0XHRcdHBhcmFtcyAgICAgICAgICA9IHR5cGVvZiBtYXRjaGVzWzNdICE9PSAndW5kZWZpbmVkJyA/IG1hdGNoZXNbM10uc3BsaXQoJywnKSA6IFtdLFxuXHRcdFx0XHRcdC8vaWQgcGFyYW0gc2hvdWxkIGJlIGZpcnN0XG5cdFx0XHRcdFx0b3ZlcnJpZGVJZCAgICAgID0gcGFyYW1zLmxlbmd0aCA/IHBhcmFtc1swXSA6IG51bGwsXG5cdFx0XHRcdFx0Ly9sYWJlbCBwYXJhbSBzaG91bGQgYmUgc2Vjb25kXG5cdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCAgID0gcGFyYW1zLmxlbmd0aCA9PT0gMiA/IHBhcmFtc1sxXSA6IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdCRyb3cuYXBwZW5kKGNoYXJhY3RlciAhPSAnXycgP1xuXHRcdFx0XHRcdC8vaWYgdGhlIGNoYXJhY3RlciBpcyBub3QgYW4gdW5kZXJzY29yZSAoZW1wdHkgc3BhY2UpXG5cdFx0XHRcdFx0KGZ1bmN0aW9uKG5hbWluZykge1xuXHRcblx0XHRcdFx0XHRcdC8vc28gdXNlcnMgZG9uJ3QgaGF2ZSB0byBzcGVjaWZ5IGVtcHR5IG9iamVjdHNcblx0XHRcdFx0XHRcdHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gPSBjaGFyYWN0ZXIgaW4gc2V0dGluZ3Muc2VhdHMgPyBzZXR0aW5ncy5zZWF0c1tjaGFyYWN0ZXJdIDoge307XG5cdFxuXHRcdFx0XHRcdFx0dmFyIGlkID0gb3ZlcnJpZGVJZCA/IG92ZXJyaWRlSWQgOiBuYW1pbmcuZ2V0SWQoY2hhcmFjdGVyLCBuYW1pbmcucm93c1tyb3ddLCBuYW1pbmcuY29sdW1uc1tjb2x1bW5dKTtcblx0XHRcdFx0XHRcdHNlYXRzW2lkXSA9IG5ldyBzZWF0KHtcblx0XHRcdFx0XHRcdFx0aWQgICAgICAgIDogaWQsXG5cdFx0XHRcdFx0XHRcdGxhYmVsICAgICA6IG92ZXJyaWRlTGFiZWwgP1xuXHRcdFx0XHRcdFx0XHRcdG92ZXJyaWRlTGFiZWwgOiBuYW1pbmcuZ2V0TGFiZWwoY2hhcmFjdGVyLCBuYW1pbmcucm93c1tyb3ddLCBuYW1pbmcuY29sdW1uc1tjb2x1bW5dKSxcblx0XHRcdFx0XHRcdFx0cm93ICAgICAgIDogcm93LFxuXHRcdFx0XHRcdFx0XHRjb2x1bW4gICAgOiBjb2x1bW4sXG5cdFx0XHRcdFx0XHRcdGNoYXJhY3RlciA6IGNoYXJhY3RlclxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHNlYXRJZHMucHVzaChpZCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdHNbaWRdLm5vZGUoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH0pKHNldHRpbmdzLm5hbWluZykgOlxuXHRcdFx0XHRcdC8vdGhpcyBpcyBqdXN0IGFuIGVtcHR5IHNwYWNlIChfKVxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcdFxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdGZuLmFwcGVuZCgkcm93KTtcblx0XHR9KTtcblx0XG5cdFx0Ly9pZiB0aGVyZSdyZSBhbnkgbGVnZW5kIGl0ZW1zIHRvIGJlIHJlbmRlcmVkXG5cdFx0c2V0dGluZ3MubGVnZW5kLml0ZW1zLmxlbmd0aCA/IChmdW5jdGlvbihsZWdlbmQpIHtcblx0XHRcdC8vZWl0aGVyIHVzZSB1c2VyLWRlZmluZWQgY29udGFpbmVyIG9yIGNyZWF0ZSBvdXIgb3duIGFuZCBpbnNlcnQgaXQgcmlnaHQgYWZ0ZXIgdGhlIHNlYXQgY2hhcnQgZGl2XG5cdFx0XHR2YXIgJGNvbnRhaW5lciA9IChsZWdlbmQubm9kZSB8fCAkKCc8ZGl2PjwvZGl2PicpLmluc2VydEFmdGVyKGZuKSlcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZCcpO1xuXHRcdFx0XHRcblx0XHRcdHZhciAkdWwgPSAkKCc8dWw+PC91bD4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kTGlzdCcpXG5cdFx0XHRcdC5hcHBlbmRUbygkY29udGFpbmVyKTtcblx0XHRcdFxuXHRcdFx0JC5lYWNoKGxlZ2VuZC5pdGVtcywgZnVuY3Rpb24oaW5kZXgsIGl0ZW0pIHtcblx0XHRcdFx0JHVsLmFwcGVuZChcblx0XHRcdFx0XHQkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZEl0ZW0nKVxuXHRcdFx0XHRcdFx0LmFwcGVuZChcblx0XHRcdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0XHRcdC8vbWVyZ2UgdXNlciBkZWZpbmVkIGNsYXNzZXMgd2l0aCBvdXIgc3RhbmRhcmQgb25lc1xuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhbJ3NlYXRDaGFydHMtc2VhdCcsICdzZWF0Q2hhcnRzLWNlbGwnLCBpdGVtWzFdXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXR0aW5ncy5jbGFzc2VzLCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiBzZXR0aW5ncy5zZWF0c1tpdGVtWzBdXSA9PSBcInVuZGVmaW5lZFwiID8gW10gOiBzZXR0aW5ncy5zZWF0c1tpdGVtWzBdXS5jbGFzc2VzKS5qb2luKCcgJylcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8c3Bhbj48L3NwYW4+Jylcblx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kRGVzY3JpcHRpb24nKVxuXHRcdFx0XHRcdFx0XHRcdC50ZXh0KGl0ZW1bMl0pXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuICRjb250YWluZXI7XG5cdFx0fSkoc2V0dGluZ3MubGVnZW5kKSA6IG51bGw7XG5cdFxuXHRcdGZuLmF0dHIoe1xuXHRcdFx0dGFiSW5kZXggOiAwXG5cdFx0fSk7XG5cdFx0XG5cdFx0XG5cdFx0Ly93aGVuIGNvbnRhaW5lcidzIGZvY3VzZWQsIG1vdmUgZm9jdXMgdG8gdGhlIGZpcnN0IHNlYXRcblx0XHRmbi5mb2N1cyhmdW5jdGlvbigpIHtcblx0XHRcdGlmIChmbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKSkge1xuXHRcdFx0XHRzZWF0c1tmbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdGZuLmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQ6bm90KC5zZWF0Q2hhcnRzLXNwYWNlKTpmaXJzdCcpLmZvY3VzKCk7XG5cdFx0XHRzZWF0c1tzZWF0SWRzWzBdXS5mb2N1cygpO1xuXG5cdFx0fSk7XG5cdFxuXHRcdC8vcHVibGljIG1ldGhvZHMgb2Ygc2VhdENoYXJ0c1xuXHRcdGZuLmRhdGEoJ3NlYXRDaGFydHMnLCB7XG5cdFx0XHRzZWF0cyAgIDogc2VhdHMsXG5cdFx0XHRzZWF0SWRzIDogc2VhdElkcyxcblx0XHRcdC8vc2V0IGZvciBvbmUsIHNldCBmb3IgbWFueSwgZ2V0IGZvciBvbmVcblx0XHRcdHN0YXR1czogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IGZuLnNlYXRzW2FyZ3VtZW50c1swXV0uc3RhdHVzKCkgOiAoZnVuY3Rpb24oc2VhdHNJZHMsIG5ld1N0YXR1cykge1xuXHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mIHNlYXRzSWRzID09ICdzdHJpbmcnID8gZm4uc2VhdHNbc2VhdHNJZHNdLnN0YXR1cyhuZXdTdGF0dXMpIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JC5lYWNoKHNlYXRzSWRzLCBmdW5jdGlvbihpbmRleCwgc2VhdElkKSB7XG5cdFx0XHRcdFx0XHRcdGZuLnNlYXRzW3NlYXRJZF0uc3RhdHVzKG5ld1N0YXR1cyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9KShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0XHR9LFxuXHRcdFx0ZWFjaCAgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdGZvciAodmFyIHNlYXRJZCBpbiBmbi5zZWF0cykge1xuXHRcdFx0XHRcdGlmIChmYWxzZSA9PT0gY2FsbGJhY2suY2FsbChmbi5zZWF0c1tzZWF0SWRdLCBzZWF0SWQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdElkOy8vcmV0dXJuIGxhc3QgY2hlY2tlZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0bm9kZSAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHQvL2Jhc2ljYWxseSBjcmVhdGUgYSBDU1MgcXVlcnkgdG8gZ2V0IGFsbCBzZWF0cyBieSB0aGVpciBET00gaWRzXG5cdFx0XHRcdHJldHVybiAkKCcjJyArIGZuLnNlYXRJZHMuam9pbignLCMnKSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24ocXVlcnkpIHsvL0QsIGEuYXZhaWxhYmxlLCB1bmF2YWlsYWJsZVxuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcblx0XHRcdFx0Ly9pcyBSZWdFeHBcblx0XHQgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5IGluc3RhbmNlb2YgUmVnRXhwID9cblx0XHQgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLm1hdGNoKHF1ZXJ5KSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKGlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgfSkoKSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAocXVlcnkubGVuZ3RoID09IDEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGNoYXJhY3Rlcikge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHNlYXJjaGVzIGp1c3QgZm9yIGEgcGFydGljdWFsIGNoYXJhY3RlclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IGNoYXJhY3Rlcikge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkocXVlcnkpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlciBydW5zIGEgbW9yZSBzb3BoaXN0aWNhdGVkIHF1ZXJ5LCBzbyBsZXQncyBzZWUgaWYgdGhlcmUncyBhIGRvdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5LmluZGV4T2YoJy4nKSA+IC0xID9cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoZXJlJ3MgYSBkb3Qgd2hpY2ggc2VwYXJhdGVzIGNoYXJhY3RlciBhbmQgdGhlIHN0YXR1c1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBxdWVyeS5zcGxpdCgnLicpO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChzZWF0SWQpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXIoKSA9PSBwYXJ0c1swXSAmJiB0aGlzLnN0YXR1cygpID09IHBhcnRzWzFdKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSBxdWVyeSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKClcblx0XHQgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdHNldCAgICAgICAgOiBmdW5jdGlvbiBzZXQoKSB7Ly9pbmhlcml0cyBzb21lIG1ldGhvZHNcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0c2VhdHMgICAgICA6IFtdLFxuXHRcdFx0XHRcdHNlYXRJZHMgICAgOiBbXSxcblx0XHRcdFx0XHRsZW5ndGggICAgIDogMCxcblx0XHRcdFx0XHRzdGF0dXMgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cyxcblx0XHRcdFx0XHRcdFx0dGhhdCA9IHRoaXM7XG5cdFx0XHRcdFx0XHQvL2lmIHRoZXJlJ3MganVzdCBvbmUgc2VhdCBpbiB0aGUgc2V0IGFuZCB1c2VyIGRpZG4ndCBwYXNzIGFueSBwYXJhbXMsIHJldHVybiBjdXJyZW50IHN0YXR1c1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMubGVuZ3RoID09IDEgJiYgYXJncy5sZW5ndGggPT0gMCA/IHRoaXMuc2VhdHNbMF0uc3RhdHVzKCkgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdC8vb3RoZXJ3aXNlIGNhbGwgc3RhdHVzIGZ1bmN0aW9uIGZvciBlYWNoIG9mIHRoZSBzZWF0cyBpbiB0aGUgc2V0XG5cdFx0XHRcdFx0XHRcdCQuZWFjaCh0aGF0LnNlYXRzLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0YXR1cy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bm9kZSAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLm5vZGUuY2FsbCh0aGlzKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVhY2ggICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5lYWNoLmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldCAgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5nZXQuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZmluZCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmZpbmQuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0ICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2V0LmNhbGwoZm4pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cHVzaCAgICAgICA6IGZ1bmN0aW9uKGlkLCBzZWF0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlYXRzLnB1c2goc2VhdCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNlYXRJZHMucHVzaChpZCk7XG5cdFx0XHRcdFx0XHQrK3RoaXMubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHQvL2dldCBvbmUgb2JqZWN0IG9yIGEgc2V0IG9mIG9iamVjdHNcblx0XHRcdGdldCAgIDogZnVuY3Rpb24oc2VhdHNJZHMpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHNlYXRzSWRzID09ICdzdHJpbmcnID8gXG5cdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdHNJZHNdIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR2YXIgc2VhdFNldCA9IGZuLnNldCgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBmbi5zZWF0c1tzZWF0SWRdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdHNlYXRTZXQucHVzaChzZWF0SWQsIGZuLnNlYXRzW3NlYXRJZF0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRTZXQ7XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0XHRyZXR1cm4gZm4uZGF0YSgnc2VhdENoYXJ0cycpO1xuXHR9XG5cdFxuXHRcbn0pKGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwic291cmNlUm9vdCI6IiJ9