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

    console.log(date + ' ' + choixDebut + ':00');
    console.log(date + ' ' + choixFin + ':00');

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
            console.log('response: ' + isDispo);
            $.ajax({
                url: Routing.generate('panier_ajax'),
                type: "POST",
                async: true,
                success: function success(responsePanier, textStatus) {
                    if (isDispo = '1') {
                        $('.reservation-select-creneau').empty().append(responsePanier);

                        // $.get(Routing.generate(''), function(html){
                        //     $('#display-panier').empty().html(html);
                        //
                        // });
                        $.ajax({
                            url: Routing.generate('produits_ajax'),
                            type: "GET",
                            async: true,
                            success: function success(responseProduits, textStatus) {
                                $('#display-salle').empty().append(responseProduits);

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
            alert('Problème lors de la vérification de la disponibilité de la salle n°' + idSalle);
        }
    });

    return false;
});

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
/*!****************************************************************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/ajax/ajaxCheckDispoDate.js ./web/assets/js/ajax/ajaxChoixSalle.js ./web/assets/js/places/jquery.seat-charts.js ./web/assets/js/places/ajaxGestionPlaces.js ***!
  \****************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/ajax/ajaxCheckDispoDate.js */"./web/assets/js/ajax/ajaxCheckDispoDate.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChoixSalle.js */"./web/assets/js/ajax/ajaxChoixSalle.js");
__webpack_require__(/*! ./web/assets/js/places/jquery.seat-charts.js */"./web/assets/js/places/jquery.seat-charts.js");
module.exports = __webpack_require__(/*! ./web/assets/js/places/ajaxGestionPlaces.js */"./web/assets/js/places/ajaxGestionPlaces.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzZlNzlkZDM2YWVlNWZiNGJjMmMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGVja0Rpc3BvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENob2l4U2FsbGUuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvYWpheEdlc3Rpb25QbGFjZXMuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9wbGFjZXMvanF1ZXJ5LnNlYXQtY2hhcnRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsIm9uIiwiY2hvaXhEZWJ1dCIsInRleHQiLCJjaG9peEZpbiIsImRhdGUiLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwidGhhdCIsImFwcGVuZCIsImxvYWQiLCJmYWRlSW4iLCJhamF4IiwidXJsIiwiUm91dGluZyIsImdlbmVyYXRlIiwidHlwZSIsImRhdGEiLCJhc3luYyIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsInRleHRTdGF0dXMiLCJlbXB0eSIsImVycm9yIiwiYWxlcnQiLCJpZFNhbGxlIiwiaXNEaXNwbyIsInJlc3BvbnNlUGFuaWVyIiwicmVzcG9uc2VQcm9kdWl0cyIsImZpcnN0U2VhdExhYmVsIiwicmVhZHkiLCJsZW5ndGgiLCJpbml0Q2FydGVJbnRlcmFjdGl2ZSIsIiRjYXJ0IiwiJGNvdW50ZXIiLCIkdG90YWwiLCJzYyIsInNlYXRDaGFydHMiLCJtYXAiLCJzZWF0cyIsImYiLCJwcmljZSIsImNsYXNzZXMiLCJjYXRlZ29yeSIsImUiLCJuYW1pbmciLCJ0b3AiLCJnZXRMYWJlbCIsImNoYXJhY3RlciIsInJvdyIsImNvbHVtbiIsImxlZ2VuZCIsIm5vZGUiLCJpdGVtcyIsImNsaWNrIiwic3RhdHVzIiwic2V0dGluZ3MiLCJsYWJlbCIsImF0dHIiLCJpZCIsImFwcGVuZFRvIiwiZmluZCIsInJlY2FsY3VsYXRlVG90YWwiLCJyZW1vdmUiLCJzdHlsZSIsImdldCIsInBhcmVudHMiLCJ0b3RhbCIsImVhY2giLCJmbiIsInNldHVwIiwic2VhdElkcyIsImFuaW1hdGUiLCJsZWZ0IiwiZ2V0SWQiLCJmb2N1cyIsImJsdXIiLCJzZWF0Iiwic2VhdENoYXJ0c1NldHRpbmdzIiwiZXh0ZW5kIiwiJG5vZGUiLCJyb2xlIiwiZm9jdXNhYmxlIiwidGFiSW5kZXgiLCJhZGRDbGFzcyIsImNvbmNhdCIsImpvaW4iLCJjaGFyIiwiYXJndW1lbnRzIiwibmV3U3R5bGUiLCJvbGRTdHlsZSIsInN3aXRjaENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzZWF0U2V0dGluZ3MiLCJpbmRleCIsImNhbGxiYWNrIiwidW5kZWZpbmVkIiwiYXBwbHkiLCIkc2VhdCIsIiRuZXdTZWF0Iiwid2hpY2giLCJwcmV2ZW50RGVmYXVsdCIsImZpbmRBdmFpbGFibGUiLCIkcm93cyIsIiRzZWF0cyIsIiRjdXJyZW50Um93IiwiJG5ld1JvdyIsImxhc3QiLCJmaXJzdCIsImVxIiwiaGFzQ2xhc3MiLCJyb3dzIiwiaSIsInB1c2giLCJjb2x1bW5zIiwic3BsaXQiLCIkaGVhZGVyUm93IiwidmFsdWUiLCJjaGFyYWN0ZXJzIiwiJHJvdyIsIm1hdGNoIiwiY2hhcmFjdGVyUGFyYW1zIiwibWF0Y2hlcyIsInBhcmFtcyIsIm92ZXJyaWRlSWQiLCJvdmVycmlkZUxhYmVsIiwiJGNvbnRhaW5lciIsImluc2VydEFmdGVyIiwiJHVsIiwiaXRlbSIsInNlYXRzSWRzIiwibmV3U3RhdHVzIiwic2VhdElkIiwiY2FsbCIsInF1ZXJ5Iiwic2VhdFNldCIsInNldCIsIlJlZ0V4cCIsImluZGV4T2YiLCJwYXJ0cyIsImFyZ3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQUEsRUFBRUMsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixxQkFBeEIsRUFBK0MsWUFBVTs7QUFFckQsUUFBSUMsYUFBYUgsRUFBRSxjQUFGLEVBQWtCSSxJQUFsQixFQUFqQjtBQUNBLFFBQUlDLFdBQVdMLEVBQUUsZUFBRixFQUFtQkksSUFBbkIsRUFBZjtBQUNBLFFBQUlFLE9BQVFOLEVBQUUsdUJBQUYsRUFBMkJPLEdBQTNCLEVBQVo7O0FBRUFDLFlBQVFDLEdBQVIsQ0FBWUgsT0FBTyxHQUFQLEdBQWFILFVBQWIsR0FBeUIsS0FBckM7QUFDQUssWUFBUUMsR0FBUixDQUFZSCxPQUFPLEdBQVAsR0FBYUQsUUFBYixHQUF1QixLQUFuQzs7QUFFQUwsTUFBRSxvQ0FBRixFQUF3Q08sR0FBeEMsQ0FBNEMsRUFBNUM7O0FBRUFHLFdBQU9WLEVBQUUsSUFBRixDQUFQOztBQUVBO0FBQ0FBLE1BQUUsZ0JBQUYsRUFBb0JXLE1BQXBCLEdBQTZCQyxJQUE3QixDQUFrQyxxQkFBbEMsRUFBeURDLE1BQXpEOztBQUVBYixNQUFFYyxJQUFGLENBQU87QUFDSEMsYUFBS0MsUUFBUUMsUUFBUixDQUFpQixtQkFBakIsQ0FERjtBQUVIQyxjQUFNLE1BRkg7QUFHSEMsY0FBTTtBQUNGLCtCQUFtQmIsT0FBTyxHQUFQLEdBQWFILFVBQWIsR0FBeUIsS0FEMUM7QUFFRiw2QkFBaUJHLE9BQU8sR0FBUCxHQUFhRCxRQUFiLEdBQXVCO0FBRnRDLFNBSEg7QUFPSGUsZUFBTyxJQVBKO0FBUUhDLGlCQUFTLGlCQUFVQyxRQUFWLEVBQW9CQyxVQUFwQixFQUNUO0FBQ0l2QixjQUFFLGdCQUFGLEVBQW9Cd0IsS0FBcEIsR0FBNEJiLE1BQTVCLENBQW1DVyxRQUFuQztBQUNBO0FBRUgsU0FiRTtBQWNIRyxlQUFPLGVBQVNOLElBQVQsRUFBZTtBQUNsQlgsb0JBQVFDLEdBQVIsQ0FBWVUsSUFBWjtBQUNBTyxrQkFBTSx5REFBTjtBQUNBO0FBRUg7QUFuQkUsS0FBUDtBQXFCQSxXQUFPLEtBQVA7QUFFSCxDQXZDRCxFOzs7Ozs7Ozs7Ozs7QUNBQTFCLEVBQUVDLFFBQUYsRUFBWUMsRUFBWixDQUFlLE9BQWYsRUFBd0IsbUNBQXhCLEVBQTZELFlBQVU7O0FBRW5FLFFBQUlDLGFBQWFILEVBQUUsY0FBRixFQUFrQkksSUFBbEIsRUFBakI7QUFDQSxRQUFJQyxXQUFXTCxFQUFFLGVBQUYsRUFBbUJJLElBQW5CLEVBQWY7QUFDQSxRQUFJRSxPQUFRTixFQUFFLHVCQUFGLEVBQTJCTyxHQUEzQixFQUFaO0FBQ0EsUUFBSW9CLFVBQVUzQixFQUFFLElBQUYsRUFBUU8sR0FBUixFQUFkOztBQUVBQyxZQUFRQyxHQUFSLENBQVlrQixVQUFVLFNBQXRCO0FBQ0Q7QUFDQ2pCLFdBQU9WLEVBQUUsSUFBRixDQUFQOztBQUVBO0FBQ0FBLE1BQUUsZ0JBQUYsRUFBb0JXLE1BQXBCLEdBQTZCQyxJQUE3QixDQUFrQyxxQkFBbEMsRUFBeURDLE1BQXpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBYixNQUFFYyxJQUFGLENBQU87QUFDSEMsYUFBS0MsUUFBUUMsUUFBUixDQUFpQix3QkFBakIsQ0FERjtBQUVIQyxjQUFNLE1BRkg7QUFHSEMsY0FBTTtBQUNGLCtCQUFtQmIsT0FBTyxHQUFQLEdBQWFILFVBQWIsR0FBeUIsS0FEMUM7QUFFRiw2QkFBaUJHLE9BQU8sR0FBUCxHQUFhRCxRQUFiLEdBQXVCLEtBRnRDO0FBR0YsdUJBQVlzQjtBQUhWLFNBSEg7QUFRSE4saUJBQVMsaUJBQVVPLE9BQVYsRUFBbUJMLFVBQW5CLEVBQ1Q7QUFDSWYsb0JBQVFDLEdBQVIsQ0FBWSxlQUFjbUIsT0FBMUI7QUFDQTVCLGNBQUVjLElBQUYsQ0FBTztBQUNIQyxxQkFBS0MsUUFBUUMsUUFBUixDQUFpQixhQUFqQixDQURGO0FBRUhDLHNCQUFNLE1BRkg7QUFHSEUsdUJBQU8sSUFISjtBQUlIQyx5QkFBUyxpQkFBVVEsY0FBVixFQUEwQk4sVUFBMUIsRUFDVDtBQUNJLHdCQUFHSyxVQUFVLEdBQWIsRUFBa0I7QUFDZDVCLDBCQUFFLDZCQUFGLEVBQWlDd0IsS0FBakMsR0FBeUNiLE1BQXpDLENBQWdEa0IsY0FBaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTdCLDBCQUFFYyxJQUFGLENBQU87QUFDSEMsaUNBQUtDLFFBQVFDLFFBQVIsQ0FBaUIsZUFBakIsQ0FERjtBQUVIQyxrQ0FBTSxLQUZIO0FBR0hFLG1DQUFPLElBSEo7QUFJSEMscUNBQVMsaUJBQVVTLGdCQUFWLEVBQTRCUCxVQUE1QixFQUF3QztBQUM3Q3ZCLGtDQUFFLGdCQUFGLEVBQW9Cd0IsS0FBcEIsR0FBNEJiLE1BQTVCLENBQW1DbUIsZ0JBQW5DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsNkJBWEU7QUFZSEwsbUNBQU8sZUFBVU4sSUFBVixFQUFnQjtBQUNuQlgsd0NBQVFDLEdBQVIsQ0FBWVUsSUFBWjtBQUNBTyxzQ0FBTSxvQ0FBTjtBQUNBO0FBRUg7QUFqQkUseUJBQVA7QUFtQkgscUJBMUJELE1BMEJLO0FBQ0RBLDhCQUFNLGlDQUFOO0FBQ0g7QUFDSixpQkFuQ0U7QUFvQ0hELHVCQUFPLGVBQVNOLElBQVQsRUFBZTtBQUNsQlgsNEJBQVFDLEdBQVIsQ0FBWVUsSUFBWjtBQUNBTywwQkFBTSxtQ0FBTjtBQUNBO0FBRUg7QUF6Q0UsYUFBUDtBQTRDSCxTQXZERTtBQXdESEQsZUFBTyxlQUFTTixJQUFULEVBQWM7QUFDakJPLGtCQUFNLHdFQUF1RUMsT0FBN0U7QUFDSDtBQTFERSxLQUFQOztBQTZEQSxXQUFPLEtBQVA7QUFFSCxDQTVGRCxFOzs7Ozs7Ozs7Ozs7QUNBQSxJQUFJSSxpQkFBaUIsQ0FBckI7O0FBRUEvQixFQUFFQyxRQUFGLEVBQVkrQixLQUFaLENBQWtCLFlBQVc7O0FBRXpCLFFBQUdoQyxFQUFFLFdBQUYsRUFBZWlDLE1BQWYsSUFBMEJqQyxFQUFFLGlCQUFGLEVBQXFCaUMsTUFBbEQsRUFBeUQ7QUFDckRDO0FBQ0g7O0FBRUQsYUFBU0Esb0JBQVQsR0FBK0I7QUFDM0IsWUFBSUMsUUFBUW5DLEVBQUUsaUJBQUYsQ0FBWjtBQUFBLFlBQ0lvQyxXQUFXcEMsRUFBRSxVQUFGLENBRGY7QUFBQSxZQUVJcUMsU0FBU3JDLEVBQUUsUUFBRixDQUZiO0FBQUEsWUFHSXNDLEtBQUt0QyxFQUFFLFdBQUYsRUFBZXVDLFVBQWYsQ0FBMEI7QUFDM0JDLGlCQUFLLENBQ0QsT0FEQyxFQUVELE9BRkMsRUFHRCxPQUhDLEVBSUQsT0FKQyxFQUtELE9BTEMsRUFNRCxPQU5DLEVBT0QsT0FQQyxFQVFELE9BUkMsRUFTRCxPQVRDLENBRHNCO0FBWTNCQyxtQkFBTztBQUNIQyxtQkFBRztBQUNDQywyQkFBTyxDQURSO0FBRUNDLDZCQUFTLGFBRlYsRUFFeUI7QUFDeEJDLDhCQUFVO0FBSFgsaUJBREE7QUFNSEMsbUJBQUc7QUFDQ0gsMkJBQU8sQ0FEUjtBQUVDQyw2QkFBUyxlQUZWLEVBRTJCO0FBQzFCQyw4QkFBVTtBQUhYOztBQU5BLGFBWm9CO0FBeUIzQkUsb0JBQVE7QUFDSkMscUJBQUssS0FERDtBQUVKQywwQkFBVSxrQkFBVUMsU0FBVixFQUFxQkMsR0FBckIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQ3hDLDJCQUFPckIsZ0JBQVA7QUFDSDtBQUpHLGFBekJtQjtBQStCM0JzQixvQkFBUTtBQUNKQyxzQkFBTXRELEVBQUUsU0FBRixDQURGO0FBRUp1RCx1QkFBTyxDQUNILENBQUMsR0FBRCxFQUFNLFdBQU4sRUFBbUIsYUFBbkIsQ0FERyxFQUVILENBQUMsR0FBRCxFQUFNLFdBQU4sRUFBbUIsZUFBbkIsQ0FGRyxFQUdILENBQUMsR0FBRCxFQUFNLGFBQU4sRUFBcUIsZ0JBQXJCLENBSEc7QUFGSCxhQS9CbUI7QUF1QzNCQyxtQkFBTyxpQkFBWTtBQUNmLG9CQUFJLEtBQUtDLE1BQUwsTUFBaUIsV0FBckIsRUFBa0M7QUFDOUI7QUFDQXpELHNCQUFFLFNBQVMsS0FBS21CLElBQUwsR0FBWTBCLFFBQXJCLEdBQWdDLFVBQWhDLEdBQTZDLEtBQUthLFFBQUwsQ0FBY0MsS0FBM0QsR0FBbUUsUUFBbkUsR0FBOEUsS0FBS3hDLElBQUwsR0FBWXdCLEtBQTFGLEdBQWtHLDZEQUFwRyxFQUNLaUIsSUFETCxDQUNVLElBRFYsRUFDZ0IsZUFBZSxLQUFLRixRQUFMLENBQWNHLEVBRDdDLEVBRUsxQyxJQUZMLENBRVUsUUFGVixFQUVvQixLQUFLdUMsUUFBTCxDQUFjRyxFQUZsQyxFQUdLQyxRQUhMLENBR2MzQixLQUhkOztBQUtBOzs7Ozs7QUFNQUMsNkJBQVNoQyxJQUFULENBQWNrQyxHQUFHeUIsSUFBSCxDQUFRLFVBQVIsRUFBb0I5QixNQUFwQixHQUE2QixDQUEzQztBQUNBSSwyQkFBT2pDLElBQVAsQ0FBWTRELGlCQUFpQjFCLEVBQWpCLElBQXVCLEtBQUtuQixJQUFMLEdBQVl3QixLQUEvQzs7QUFFQSwyQkFBTyxVQUFQO0FBQ0gsaUJBakJELE1BaUJPLElBQUksS0FBS2MsTUFBTCxNQUFpQixVQUFyQixFQUFpQztBQUNwQztBQUNBckIsNkJBQVNoQyxJQUFULENBQWNrQyxHQUFHeUIsSUFBSCxDQUFRLFVBQVIsRUFBb0I5QixNQUFwQixHQUE2QixDQUEzQztBQUNBO0FBQ0FJLDJCQUFPakMsSUFBUCxDQUFZNEQsaUJBQWlCMUIsRUFBakIsSUFBdUIsS0FBS25CLElBQUwsR0FBWXdCLEtBQS9DOztBQUVBO0FBQ0EzQyxzQkFBRSxnQkFBZ0IsS0FBSzBELFFBQUwsQ0FBY0csRUFBaEMsRUFBb0NJLE1BQXBDOztBQUVBO0FBQ0EsMkJBQU8sV0FBUDtBQUNILGlCQVhNLE1BV0EsSUFBSSxLQUFLUixNQUFMLE1BQWlCLGFBQXJCLEVBQW9DO0FBQ3ZDO0FBQ0EsMkJBQU8sYUFBUDtBQUNILGlCQUhNLE1BR0E7QUFDSCwyQkFBTyxLQUFLUyxLQUFMLEVBQVA7QUFDSDtBQUNKO0FBMUUwQixTQUExQixDQUhUOztBQWdGQTtBQUNBbEUsVUFBRSxpQkFBRixFQUFxQkUsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsbUJBQWpDLEVBQXNELFlBQVk7QUFDOUQ7QUFDQW9DLGVBQUc2QixHQUFILENBQU9uRSxFQUFFLElBQUYsRUFBUW9FLE9BQVIsQ0FBZ0IsVUFBaEIsRUFBNEJqRCxJQUE1QixDQUFpQyxRQUFqQyxDQUFQLEVBQW1EcUMsS0FBbkQ7QUFDSCxTQUhEOztBQUtBO0FBQ0FsQixXQUFHNkIsR0FBSCxDQUFPLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLENBQVAsRUFBcUNWLE1BQXJDLENBQTRDLGFBQTVDO0FBQ0g7QUFFSixDQWpHRDs7QUFtR0EsU0FBU08sZ0JBQVQsQ0FBMEIxQixFQUExQixFQUE4QjtBQUMxQixRQUFJK0IsUUFBUSxDQUFaOztBQUVBO0FBQ0EvQixPQUFHeUIsSUFBSCxDQUFRLFVBQVIsRUFBb0JPLElBQXBCLENBQXlCLFlBQVk7QUFDakNELGlCQUFTLEtBQUtsRCxJQUFMLEdBQVl3QixLQUFyQjtBQUNILEtBRkQ7O0FBSUEsV0FBTzBCLEtBQVA7QUFDSCxDOzs7Ozs7Ozs7Ozs7OztBQzlHRDs7Ozs7Ozs7O0FBU0EsQ0FBQyxVQUFTckUsQ0FBVCxFQUFZOztBQUVaOztBQUVBQSxHQUFFdUUsRUFBRixDQUFLaEMsVUFBTCxHQUFrQixVQUFVaUMsS0FBVixFQUFpQjs7QUFFbEM7QUFDQSxNQUFJLEtBQUtyRCxJQUFMLENBQVUsWUFBVixDQUFKLEVBQTZCO0FBQzVCLFVBQU8sS0FBS0EsSUFBTCxDQUFVLFlBQVYsQ0FBUDtBQUNBOztBQUVELE1BQUlvRCxLQUFXLElBQWY7QUFBQSxNQUNDOUIsUUFBVyxFQURaO0FBQUEsTUFFQ2dDLFVBQVcsRUFGWjtBQUFBLE1BR0NwQixNQUhEO0FBQUEsTUFJQ0ssV0FBVztBQUNWZ0IsWUFBVSxLQURBLEVBQ087QUFDakIzQixXQUFVO0FBQ1RDLFNBQVMsSUFEQTtBQUVUMkIsVUFBUyxJQUZBO0FBR1RDLFdBQVMsZUFBUzFCLFNBQVQsRUFBb0JDLEdBQXBCLEVBQXlCQyxNQUF6QixFQUFpQztBQUN6QyxZQUFPRCxNQUFNLEdBQU4sR0FBWUMsTUFBbkI7QUFDQSxLQUxRO0FBTVRILGNBQVcsa0JBQVVDLFNBQVYsRUFBcUJDLEdBQXJCLEVBQTBCQyxNQUExQixFQUFrQztBQUM1QyxZQUFPQSxNQUFQO0FBQ0E7O0FBUlEsSUFGQTtBQWFWQyxXQUFTO0FBQ1JDLFVBQVMsSUFERDtBQUVSQyxXQUFTO0FBRkQsSUFiQztBQWlCVkMsVUFBVSxpQkFBVzs7QUFFcEIsUUFBSSxLQUFLQyxNQUFMLE1BQWlCLFdBQXJCLEVBQWtDO0FBQ2pDLFlBQU8sVUFBUDtBQUNBLEtBRkQsTUFFTyxJQUFJLEtBQUtBLE1BQUwsTUFBaUIsVUFBckIsRUFBaUM7QUFDdkMsWUFBTyxXQUFQO0FBQ0EsS0FGTSxNQUVBO0FBQ04sWUFBTyxLQUFLUyxLQUFMLEVBQVA7QUFDQTtBQUVELElBM0JTO0FBNEJWVyxVQUFTLGlCQUFXOztBQUVuQixRQUFJLEtBQUtwQixNQUFMLE1BQWlCLFdBQXJCLEVBQWtDO0FBQ2pDLFlBQU8sU0FBUDtBQUNBLEtBRkQsTUFFUTtBQUNQLFlBQU8sS0FBS1MsS0FBTCxFQUFQO0FBQ0E7QUFDRCxJQW5DUztBQW9DVlksU0FBUyxnQkFBVztBQUNuQixXQUFPLEtBQUtyQixNQUFMLEVBQVA7QUFDQSxJQXRDUztBQXVDVmhCLFVBQVU7O0FBdkNBLEdBSlo7O0FBOENDO0FBQ0FzQyxTQUFRLFVBQVN4QyxVQUFULEVBQXFCeUMsa0JBQXJCLEVBQXlDO0FBQ2hELFVBQU8sVUFBVVIsS0FBVixFQUFpQjtBQUN2QixRQUFJRCxLQUFLLElBQVQ7O0FBRUFBLE9BQUdiLFFBQUgsR0FBYzFELEVBQUVpRixNQUFGLENBQVM7QUFDdEJ4QixhQUFTLFdBRGEsRUFDQTtBQUN0QlMsWUFBUyxXQUZhO0FBR3RCO0FBQ0EvQyxXQUFTNkQsbUJBQW1CdkMsS0FBbkIsQ0FBeUIrQixNQUFNdEIsU0FBL0IsS0FBNkM7QUFDdEQ7QUFMc0IsS0FBVCxFQU1Yc0IsS0FOVyxDQUFkOztBQVFBRCxPQUFHYixRQUFILENBQVl3QixLQUFaLEdBQW9CbEYsRUFBRSxhQUFGLENBQXBCOztBQUVBdUUsT0FBR2IsUUFBSCxDQUFZd0IsS0FBWixDQUNFdEIsSUFERixDQUNPO0FBQ0xDLFNBQWlCVSxHQUFHYixRQUFILENBQVlHLEVBRHhCO0FBRUxzQixXQUFpQixVQUZaO0FBR0wscUJBQWlCLEtBSFo7QUFJTEMsZ0JBQWlCLElBSlo7QUFLTEMsZUFBaUIsQ0FBQyxDQUxiLENBS2U7QUFMZixLQURQLEVBUUVqRixJQVJGLENBUU9tRSxHQUFHYixRQUFILENBQVlDLEtBUm5CLEVBU0UyQixRQVRGLENBU1csQ0FBQyxpQkFBRCxFQUFvQixpQkFBcEIsRUFBdUMsV0FBdkMsRUFBb0RDLE1BQXBEO0FBQ1Q7QUFDQWhCLE9BQUdiLFFBQUgsQ0FBWWQsT0FGSCxFQUdULE9BQU9vQyxtQkFBbUJ2QyxLQUFuQixDQUF5QjhCLEdBQUdiLFFBQUgsQ0FBWVIsU0FBckMsQ0FBUCxJQUEwRCxXQUExRCxHQUNDLEVBREQsR0FDTThCLG1CQUFtQnZDLEtBQW5CLENBQXlCOEIsR0FBR2IsUUFBSCxDQUFZUixTQUFyQyxFQUFnRE4sT0FKN0MsRUFLUDRDLElBTE8sQ0FLRixHQUxFLENBVFg7O0FBZ0JBO0FBQ0FqQixPQUFHcEQsSUFBSCxHQUFVLFlBQVc7QUFDcEIsWUFBT29ELEdBQUdiLFFBQUgsQ0FBWXZDLElBQW5CO0FBQ0EsS0FGRDs7QUFJQW9ELE9BQUdrQixJQUFILEdBQVUsWUFBVztBQUNwQixZQUFPbEIsR0FBR2IsUUFBSCxDQUFZUixTQUFuQjtBQUNBLEtBRkQ7O0FBSUFxQixPQUFHakIsSUFBSCxHQUFVLFlBQVc7QUFDcEIsWUFBT2lCLEdBQUdiLFFBQUgsQ0FBWXdCLEtBQW5CO0FBQ0EsS0FGRDs7QUFJQTs7Ozs7OztBQU9BWCxPQUFHTCxLQUFILEdBQVcsWUFBVzs7QUFFckIsWUFBT3dCLFVBQVV6RCxNQUFWLElBQW9CLENBQXBCLEdBQ0wsVUFBUzBELFFBQVQsRUFBbUI7QUFDbkIsVUFBSUMsV0FBV3JCLEdBQUdiLFFBQUgsQ0FBWVEsS0FBM0I7O0FBRUE7QUFDQSxVQUFJeUIsWUFBWUMsUUFBaEIsRUFBMEI7QUFDekIsY0FBT0EsUUFBUDtBQUNBOztBQUVEO0FBQ0FyQixTQUFHYixRQUFILENBQVlELE1BQVosR0FBcUJrQyxZQUFZLFNBQVosR0FBd0JBLFFBQXhCLEdBQW1DcEIsR0FBR2IsUUFBSCxDQUFZRCxNQUFwRTtBQUNBYyxTQUFHYixRQUFILENBQVl3QixLQUFaLENBQ0V0QixJQURGLENBQ08sY0FEUCxFQUN1QitCLFlBQVksVUFEbkM7O0FBR0E7QUFDQVgseUJBQW1CTixPQUFuQixHQUNDSCxHQUFHYixRQUFILENBQVl3QixLQUFaLENBQWtCVyxXQUFsQixDQUE4QkQsUUFBOUIsRUFBd0NELFFBQXhDLEVBQWtELEdBQWxELENBREQsR0FFQ3BCLEdBQUdiLFFBQUgsQ0FBWXdCLEtBQVosQ0FBa0JZLFdBQWxCLENBQThCRixRQUE5QixFQUF3Q04sUUFBeEMsQ0FBaURLLFFBQWpELENBRkQ7O0FBSUEsYUFBT3BCLEdBQUdiLFFBQUgsQ0FBWVEsS0FBWixHQUFvQnlCLFFBQTNCO0FBQ0EsTUFuQkQsQ0FtQkdELFVBQVUsQ0FBVixDQW5CSCxDQURNLEdBb0JhbkIsR0FBR2IsUUFBSCxDQUFZUSxLQXBCaEM7QUFxQkEsS0F2QkQ7O0FBeUJBO0FBQ0FLLE9BQUdkLE1BQUgsR0FBWSxZQUFXOztBQUV0QixZQUFPYyxHQUFHYixRQUFILENBQVlELE1BQVosR0FBcUJpQyxVQUFVekQsTUFBVixJQUFvQixDQUFwQixHQUMzQnNDLEdBQUdMLEtBQUgsQ0FBU3dCLFVBQVUsQ0FBVixDQUFULENBRDJCLEdBQ0ZuQixHQUFHYixRQUFILENBQVlELE1BRHRDO0FBRUEsS0FKRDs7QUFNQTtBQUNBLEtBQUMsVUFBU3NDLFlBQVQsRUFBdUI3QyxTQUF2QixFQUFrQzZCLElBQWxDLEVBQXdDO0FBQ3hDO0FBQ0EvRSxPQUFFc0UsSUFBRixDQUFPLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsTUFBbkIsQ0FBUCxFQUFtQyxVQUFTMEIsS0FBVCxFQUFnQkMsUUFBaEIsRUFBMEI7O0FBRTVEO0FBQ0ExQixTQUFHMEIsUUFBSCxJQUFlLFlBQVc7QUFDekIsV0FBSUEsWUFBWSxPQUFoQixFQUF5QjtBQUN4QjtBQUNBLFlBQUkxRCxXQUFXcUIsSUFBWCxDQUFnQix1QkFBaEIsTUFBNkNzQyxTQUFqRCxFQUE0RDtBQUMzRHpELGVBQU1GLFdBQVdxQixJQUFYLENBQWdCLHVCQUFoQixDQUFOLEVBQWdEa0IsSUFBaEQ7QUFDQTtBQUNEdkMsbUJBQVdxQixJQUFYLENBQWdCLHVCQUFoQixFQUF5Q21CLEtBQUtyQixRQUFMLENBQWNHLEVBQXZEO0FBQ0FrQixhQUFLekIsSUFBTCxHQUFZdUIsS0FBWjtBQUNBOztBQUVEOzs7Ozs7QUFNQSxjQUFPTixHQUFHTCxLQUFILENBQVMsT0FBTzZCLGFBQWE3QyxTQUFiLEVBQXdCK0MsUUFBeEIsQ0FBUCxLQUE2QyxVQUE3QyxHQUNmRixhQUFhN0MsU0FBYixFQUF3QitDLFFBQXhCLEVBQWtDRSxLQUFsQyxDQUF3Q3BCLElBQXhDLENBRGUsR0FDaUNDLG1CQUFtQmlCLFFBQW5CLEVBQTZCRSxLQUE3QixDQUFtQ3BCLElBQW5DLENBRDFDLENBQVA7QUFFQSxPQWxCRDtBQW9CQSxNQXZCRDtBQXdCRDtBQUNDLEtBM0JELEVBMkJHQyxtQkFBbUJ2QyxLQTNCdEIsRUEyQjZCOEIsR0FBR2IsUUFBSCxDQUFZUixTQTNCekMsRUEyQm9EcUIsRUEzQnBEOztBQTZCQUEsT0FBR2pCLElBQUg7QUFDQztBQURELEtBRUVwRCxFQUZGLENBRUssT0FGTCxFQUVtQnFFLEdBQUdmLEtBRnRCLEVBR0V0RCxFQUhGLENBR0ssWUFITCxFQUdtQnFFLEdBQUdNLEtBSHRCLEVBSUUzRSxFQUpGLENBSUssWUFKTCxFQUltQnFFLEdBQUdPLElBSnRCOztBQU1DO0FBTkQsS0FPRTVFLEVBUEYsQ0FPSyxTQVBMLEVBT29CLFVBQVM2RSxJQUFULEVBQWVxQixLQUFmLEVBQXNCOztBQUV4QyxZQUFPLFVBQVV0RCxDQUFWLEVBQWE7O0FBRW5CLFVBQUl1RCxRQUFKOztBQUVBO0FBQ0EsY0FBUXZELEVBQUV3RCxLQUFWO0FBQ0M7QUFDQSxZQUFLLEVBQUw7QUFDQ3hELFVBQUV5RCxjQUFGO0FBQ0F4QixhQUFLdkIsS0FBTDtBQUNBO0FBQ0Q7QUFDQSxZQUFLLEVBQUw7QUFDQSxZQUFLLEVBQUw7QUFDQ1YsVUFBRXlELGNBQUY7O0FBRUE7Ozs7Ozs7QUFPQUYsbUJBQVksU0FBU0csYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLE1BQTlCLEVBQXNDQyxXQUF0QyxFQUFtRDtBQUM5RCxhQUFJQyxPQUFKOztBQUVBOztBQUVBLGFBQUksQ0FBQ0gsTUFBTVQsS0FBTixDQUFZVyxXQUFaLENBQUQsSUFBNkI3RCxFQUFFd0QsS0FBRixJQUFXLEVBQTVDLEVBQWdEO0FBQy9DO0FBQ0FNLG9CQUFVSCxNQUFNSSxJQUFOLEVBQVY7QUFDQSxVQUhELE1BR08sSUFBSUosTUFBTVQsS0FBTixDQUFZVyxXQUFaLEtBQTRCRixNQUFNeEUsTUFBTixHQUFhLENBQXpDLElBQThDYSxFQUFFd0QsS0FBRixJQUFXLEVBQTdELEVBQWlFO0FBQ3ZFO0FBQ0FNLG9CQUFVSCxNQUFNSyxLQUFOLEVBQVY7QUFDQSxVQUhNLE1BR0E7QUFDTjtBQUNBRixvQkFBVUgsTUFBTU0sRUFBTjtBQUNUO0FBQ0FOLGdCQUFNVCxLQUFOLENBQVlXLFdBQVosS0FBNEI3RCxFQUFFd0QsS0FBRixJQUFXLEVBQVgsR0FBaUIsQ0FBQyxDQUFsQixHQUF3QixDQUFDLENBQXJELENBRlMsQ0FBVjtBQUlBOztBQUVEO0FBQ0FELG9CQUFXTyxRQUFRN0MsSUFBUixDQUFhLG9DQUFiLEVBQW1EZ0QsRUFBbkQsQ0FBc0RMLE9BQU9WLEtBQVAsQ0FBYUksS0FBYixDQUF0RCxDQUFYOztBQUVBO0FBQ0EsZ0JBQU9DLFNBQVNXLFFBQVQsQ0FBa0Isa0JBQWxCLElBQ05SLGNBQWNDLEtBQWQsRUFBcUJDLE1BQXJCLEVBQTZCRSxPQUE3QixDQURNLEdBQ2tDUCxRQUR6QztBQUdBLFNBMUJVLENBMEJSRDtBQUNGO0FBREUsU0FFQWhDLE9BRkEsQ0FFUSx1QkFGUixFQUdBTCxJQUhBLENBR0sseUNBSEwsQ0ExQlEsRUE4QlZxQztBQUNBO0FBREEsU0FFRWhDLE9BRkYsQ0FFVSx1QkFGVixFQUdFTCxJQUhGLENBR08sb0NBSFAsQ0E5QlU7QUFrQ1Y7QUFDQXFDLGNBQU1oQyxPQUFOLENBQWMseUNBQWQsQ0FuQ1UsQ0FBWDs7QUFzQ0E7QUFDQSxZQUFJLENBQUNpQyxTQUFTcEUsTUFBZCxFQUFzQjtBQUNyQjtBQUNBOztBQUVEO0FBQ0E4QyxhQUFLRCxJQUFMO0FBQ0FyQyxjQUFNNEQsU0FBU3pDLElBQVQsQ0FBYyxJQUFkLENBQU4sRUFBMkJpQixLQUEzQjtBQUNBd0IsaUJBQVN4QixLQUFUOztBQUVBO0FBQ0F0QyxtQkFBV3FCLElBQVgsQ0FBZ0IsdUJBQWhCLEVBQXlDeUMsU0FBU3pDLElBQVQsQ0FBYyxJQUFkLENBQXpDOztBQUVBO0FBQ0Q7QUFDQSxZQUFLLEVBQUw7QUFDQSxZQUFLLEVBQUw7QUFDQ2QsVUFBRXlELGNBQUY7QUFDQTs7Ozs7QUFLQUYsbUJBQVksVUFBU0ssTUFBVCxFQUFpQjs7QUFFNUIsYUFBSSxDQUFDQSxPQUFPVixLQUFQLENBQWFJLEtBQWIsQ0FBRCxJQUF3QnRELEVBQUV3RCxLQUFGLElBQVcsRUFBdkMsRUFBMkM7QUFDMUM7QUFDQSxpQkFBT0ksT0FBT0csSUFBUCxFQUFQO0FBQ0EsVUFIRCxNQUdPLElBQUlILE9BQU9WLEtBQVAsQ0FBYUksS0FBYixLQUF1Qk0sT0FBT3pFLE1BQVAsR0FBZSxDQUF0QyxJQUEyQ2EsRUFBRXdELEtBQUYsSUFBVyxFQUExRCxFQUE4RDtBQUNwRTtBQUNBLGlCQUFPSSxPQUFPSSxLQUFQLEVBQVA7QUFDQSxVQUhNLE1BR0E7QUFDTjtBQUNBLGlCQUFPSixPQUFPSyxFQUFQLENBQVVMLE9BQU9WLEtBQVAsQ0FBYUksS0FBYixLQUF1QnRELEVBQUV3RCxLQUFGLElBQVcsRUFBWCxHQUFpQixDQUFDLENBQWxCLEdBQXdCLENBQUMsQ0FBaEQsQ0FBVixDQUFQO0FBQ0E7QUFFRCxTQWJVLENBYVJGLE1BQ0RoQyxPQURDLENBQ08sNkJBRFAsRUFFREwsSUFGQyxDQUVJLHlDQUZKLENBYlEsQ0FBWDs7QUFpQkEsWUFBSSxDQUFDc0MsU0FBU3BFLE1BQWQsRUFBc0I7QUFDckI7QUFDQTs7QUFFRDtBQUNBOEMsYUFBS0QsSUFBTDtBQUNBckMsY0FBTTRELFNBQVN6QyxJQUFULENBQWMsSUFBZCxDQUFOLEVBQTJCaUIsS0FBM0I7QUFDQXdCLGlCQUFTeEIsS0FBVDs7QUFFQTtBQUNBdEMsbUJBQVdxQixJQUFYLENBQWdCLHVCQUFoQixFQUF5Q3lDLFNBQVN6QyxJQUFULENBQWMsSUFBZCxDQUF6QztBQUNBO0FBQ0Q7QUFDQzs7QUE3R0Y7QUFnSEEsTUFySEQ7QUF1SEEsS0F6SGlCLENBeUhmVyxFQXpIZSxFQXlIWEEsR0FBR2pCLElBQUgsRUF6SFcsQ0FQbkI7QUFpSUM7QUFFRCxJQWxQRDtBQW1QQSxHQXBQTSxDQW9QSmlCLEVBcFBJLEVBb1BBYixRQXBQQSxDQS9DUjs7QUFxU0FhLEtBQUdlLFFBQUgsQ0FBWSxzQkFBWjs7QUFFQTtBQUNBdEYsSUFBRWlGLE1BQUYsQ0FBUyxJQUFULEVBQWV2QixRQUFmLEVBQXlCYyxLQUF6Qjs7QUFFQTtBQUNBZCxXQUFTWCxNQUFULENBQWdCa0UsSUFBaEIsR0FBdUJ2RCxTQUFTWCxNQUFULENBQWdCa0UsSUFBaEIsSUFBeUIsVUFBU2hGLE1BQVQsRUFBaUI7QUFDaEUsT0FBSWdGLE9BQU8sRUFBWDtBQUNBLFFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLakYsTUFBckIsRUFBNkJpRixHQUE3QixFQUFrQztBQUNqQ0QsU0FBS0UsSUFBTCxDQUFVRCxDQUFWO0FBQ0E7QUFDRCxVQUFPRCxJQUFQO0FBQ0EsR0FOOEMsQ0FNNUN2RCxTQUFTbEIsR0FBVCxDQUFhUCxNQU4rQixDQUEvQzs7QUFRQTtBQUNBeUIsV0FBU1gsTUFBVCxDQUFnQnFFLE9BQWhCLEdBQTBCMUQsU0FBU1gsTUFBVCxDQUFnQnFFLE9BQWhCLElBQTRCLFVBQVNuRixNQUFULEVBQWlCO0FBQ3RFLE9BQUltRixVQUFVLEVBQWQ7QUFDQSxRQUFLLElBQUlGLElBQUksQ0FBYixFQUFnQkEsS0FBS2pGLE1BQXJCLEVBQTZCaUYsR0FBN0IsRUFBa0M7QUFDakNFLFlBQVFELElBQVIsQ0FBYUQsQ0FBYjtBQUNBO0FBQ0QsVUFBT0UsT0FBUDtBQUNBLEdBTm9ELENBTWxEMUQsU0FBU2xCLEdBQVQsQ0FBYSxDQUFiLEVBQWdCNkUsS0FBaEIsQ0FBc0IsRUFBdEIsRUFBMEJwRixNQU53QixDQUFyRDs7QUFRQSxNQUFJeUIsU0FBU1gsTUFBVCxDQUFnQkMsR0FBcEIsRUFBeUI7QUFDeEIsT0FBSXNFLGFBQWF0SCxFQUFFLGFBQUYsRUFDZnNGLFFBRGUsQ0FDTixrQ0FETSxDQUFqQjs7QUFHQSxPQUFJNUIsU0FBU1gsTUFBVCxDQUFnQjRCLElBQXBCLEVBQTBCO0FBQ3pCMkMsZUFBVzNHLE1BQVgsQ0FBa0JYLEVBQUUsYUFBRixFQUFpQnNGLFFBQWpCLENBQTBCLGlCQUExQixDQUFsQjtBQUNBOztBQUdEdEYsS0FBRXNFLElBQUYsQ0FBT1osU0FBU1gsTUFBVCxDQUFnQnFFLE9BQXZCLEVBQWdDLFVBQVNwQixLQUFULEVBQWdCdUIsS0FBaEIsRUFBdUI7QUFDdERELGVBQVczRyxNQUFYLENBQ0NYLEVBQUUsYUFBRixFQUNFc0YsUUFERixDQUNXLGlCQURYLEVBRUVsRixJQUZGLENBRU9tSCxLQUZQLENBREQ7QUFLQSxJQU5EO0FBT0E7O0FBRURoRCxLQUFHNUQsTUFBSCxDQUFVMkcsVUFBVjs7QUFFQTtBQUNBdEgsSUFBRXNFLElBQUYsQ0FBT1osU0FBU2xCLEdBQWhCLEVBQXFCLFVBQVNXLEdBQVQsRUFBY3FFLFVBQWQsRUFBMEI7O0FBRTlDLE9BQUlDLE9BQU96SCxFQUFFLGFBQUYsRUFBaUJzRixRQUFqQixDQUEwQixnQkFBMUIsQ0FBWDs7QUFFQSxPQUFJNUIsU0FBU1gsTUFBVCxDQUFnQjRCLElBQXBCLEVBQTBCO0FBQ3pCOEMsU0FBSzlHLE1BQUwsQ0FDQ1gsRUFBRSxhQUFGLEVBQ0VzRixRQURGLENBQ1csa0NBRFgsRUFFRWxGLElBRkYsQ0FFT3NELFNBQVNYLE1BQVQsQ0FBZ0JrRSxJQUFoQixDQUFxQjlELEdBQXJCLENBRlAsQ0FERDtBQUtBOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkFuRCxLQUFFc0UsSUFBRixDQUFPa0QsV0FBV0UsS0FBWCxDQUFpQixnREFBakIsQ0FBUCxFQUEyRSxVQUFVdEUsTUFBVixFQUFrQnVFLGVBQWxCLEVBQW1DO0FBQzdHLFFBQUlDLFVBQWtCRCxnQkFBZ0JELEtBQWhCLENBQXNCLG1DQUF0QixDQUF0Qjs7QUFDQztBQUNBeEUsZ0JBQWtCMEUsUUFBUSxDQUFSLENBRm5COztBQUdDO0FBQ0FDLGFBQWtCLE9BQU9ELFFBQVEsQ0FBUixDQUFQLEtBQXNCLFdBQXRCLEdBQW9DQSxRQUFRLENBQVIsRUFBV1AsS0FBWCxDQUFpQixHQUFqQixDQUFwQyxHQUE0RCxFQUovRTs7QUFLQztBQUNBUyxpQkFBa0JELE9BQU81RixNQUFQLEdBQWdCNEYsT0FBTyxDQUFQLENBQWhCLEdBQTRCLElBTi9DOztBQU9DO0FBQ0FFLG9CQUFrQkYsT0FBTzVGLE1BQVAsS0FBa0IsQ0FBbEIsR0FBc0I0RixPQUFPLENBQVAsQ0FBdEIsR0FBa0MsSUFSckQ7O0FBVUFKLFNBQUs5RyxNQUFMLENBQVl1QyxhQUFhLEdBQWI7QUFDWDtBQUNDLGNBQVNILE1BQVQsRUFBaUI7O0FBRWpCO0FBQ0FXLGNBQVNqQixLQUFULENBQWVTLFNBQWYsSUFBNEJBLGFBQWFRLFNBQVNqQixLQUF0QixHQUE4QmlCLFNBQVNqQixLQUFULENBQWVTLFNBQWYsQ0FBOUIsR0FBMEQsRUFBdEY7O0FBRUEsU0FBSVcsS0FBS2lFLGFBQWFBLFVBQWIsR0FBMEIvRSxPQUFPNkIsS0FBUCxDQUFhMUIsU0FBYixFQUF3QkgsT0FBT2tFLElBQVAsQ0FBWTlELEdBQVosQ0FBeEIsRUFBMENKLE9BQU9xRSxPQUFQLENBQWVoRSxNQUFmLENBQTFDLENBQW5DO0FBQ0FYLFdBQU1vQixFQUFOLElBQVksSUFBSWtCLElBQUosQ0FBUztBQUNwQmxCLFVBQVlBLEVBRFE7QUFFcEJGLGFBQVlvRSxnQkFDWEEsYUFEVyxHQUNLaEYsT0FBT0UsUUFBUCxDQUFnQkMsU0FBaEIsRUFBMkJILE9BQU9rRSxJQUFQLENBQVk5RCxHQUFaLENBQTNCLEVBQTZDSixPQUFPcUUsT0FBUCxDQUFlaEUsTUFBZixDQUE3QyxDQUhHO0FBSXBCRCxXQUFZQSxHQUpRO0FBS3BCQyxjQUFZQSxNQUxRO0FBTXBCRixpQkFBWUE7QUFOUSxNQUFULENBQVo7O0FBU0F1QixhQUFRMEMsSUFBUixDQUFhdEQsRUFBYjtBQUNBLFlBQU9wQixNQUFNb0IsRUFBTixFQUFVUCxJQUFWLEVBQVA7QUFFQSxLQWxCRCxDQWtCR0ksU0FBU1gsTUFsQlosQ0FGVztBQXFCWDtBQUNBL0MsTUFBRSxhQUFGLEVBQWlCc0YsUUFBakIsQ0FBMEIsa0NBQTFCLENBdEJEO0FBd0JBLElBbkNEOztBQXFDQWYsTUFBRzVELE1BQUgsQ0FBVThHLElBQVY7QUFDQSxHQXBFRDs7QUFzRUE7QUFDQS9ELFdBQVNMLE1BQVQsQ0FBZ0JFLEtBQWhCLENBQXNCdEIsTUFBdEIsR0FBZ0MsVUFBU29CLE1BQVQsRUFBaUI7QUFDaEQ7QUFDQSxPQUFJMkUsYUFBYSxDQUFDM0UsT0FBT0MsSUFBUCxJQUFldEQsRUFBRSxhQUFGLEVBQWlCaUksV0FBakIsQ0FBNkIxRCxFQUE3QixDQUFoQixFQUNmZSxRQURlLENBQ04sbUJBRE0sQ0FBakI7O0FBR0EsT0FBSTRDLE1BQU1sSSxFQUFFLFdBQUYsRUFDUnNGLFFBRFEsQ0FDQyx1QkFERCxFQUVSeEIsUUFGUSxDQUVDa0UsVUFGRCxDQUFWOztBQUlBaEksS0FBRXNFLElBQUYsQ0FBT2pCLE9BQU9FLEtBQWQsRUFBcUIsVUFBU3lDLEtBQVQsRUFBZ0JtQyxJQUFoQixFQUFzQjtBQUMxQ0QsUUFBSXZILE1BQUosQ0FDQ1gsRUFBRSxXQUFGLEVBQ0VzRixRQURGLENBQ1csdUJBRFgsRUFFRTNFLE1BRkYsQ0FHRVgsRUFBRSxhQUFGO0FBQ0M7QUFERCxLQUVFc0YsUUFGRixDQUVXLENBQUMsaUJBQUQsRUFBb0IsaUJBQXBCLEVBQXVDNkMsS0FBSyxDQUFMLENBQXZDLEVBQWdENUMsTUFBaEQsQ0FDVDdCLFNBQVNkLE9BREEsRUFFVCxPQUFPYyxTQUFTakIsS0FBVCxDQUFlMEYsS0FBSyxDQUFMLENBQWYsQ0FBUCxJQUFrQyxXQUFsQyxHQUFnRCxFQUFoRCxHQUFxRHpFLFNBQVNqQixLQUFULENBQWUwRixLQUFLLENBQUwsQ0FBZixFQUF3QnZGLE9BRnBFLEVBRTZFNEMsSUFGN0UsQ0FFa0YsR0FGbEYsQ0FGWCxDQUhGLEVBVUU3RSxNQVZGLENBV0VYLEVBQUUsZUFBRixFQUNFc0YsUUFERixDQUNXLDhCQURYLEVBRUVsRixJQUZGLENBRU8rSCxLQUFLLENBQUwsQ0FGUCxDQVhGLENBREQ7QUFpQkEsSUFsQkQ7O0FBb0JBLFVBQU9ILFVBQVA7QUFDQSxHQTlCOEIsQ0E4QjVCdEUsU0FBU0wsTUE5Qm1CLENBQS9CLEdBOEJzQixJQTlCdEI7O0FBZ0NBa0IsS0FBR1gsSUFBSCxDQUFRO0FBQ1B5QixhQUFXO0FBREosR0FBUjs7QUFLQTtBQUNBZCxLQUFHTSxLQUFILENBQVMsWUFBVztBQUNuQixPQUFJTixHQUFHWCxJQUFILENBQVEsdUJBQVIsQ0FBSixFQUFzQztBQUNyQ25CLFVBQU04QixHQUFHWCxJQUFILENBQVEsdUJBQVIsQ0FBTixFQUF3Q2tCLElBQXhDO0FBQ0E7O0FBRURQLE1BQUdSLElBQUgsQ0FBUSwrQ0FBUixFQUF5RGMsS0FBekQ7QUFDQXBDLFNBQU1nQyxRQUFRLENBQVIsQ0FBTixFQUFrQkksS0FBbEI7QUFFQSxHQVJEOztBQVVBO0FBQ0FOLEtBQUdwRCxJQUFILENBQVEsWUFBUixFQUFzQjtBQUNyQnNCLFVBQVVBLEtBRFc7QUFFckJnQyxZQUFVQSxPQUZXO0FBR3JCO0FBQ0FoQixXQUFRLGtCQUFXO0FBQ2xCLFFBQUljLEtBQUssSUFBVDs7QUFFQSxXQUFPbUIsVUFBVXpELE1BQVYsSUFBb0IsQ0FBcEIsR0FBd0JzQyxHQUFHOUIsS0FBSCxDQUFTaUQsVUFBVSxDQUFWLENBQVQsRUFBdUJqQyxNQUF2QixFQUF4QixHQUEyRCxVQUFTMkUsUUFBVCxFQUFtQkMsU0FBbkIsRUFBOEI7O0FBRS9GLFlBQU8sT0FBT0QsUUFBUCxJQUFtQixRQUFuQixHQUE4QjdELEdBQUc5QixLQUFILENBQVMyRixRQUFULEVBQW1CM0UsTUFBbkIsQ0FBMEI0RSxTQUExQixDQUE5QixHQUFzRSxZQUFXO0FBQ3ZGckksUUFBRXNFLElBQUYsQ0FBTzhELFFBQVAsRUFBaUIsVUFBU3BDLEtBQVQsRUFBZ0JzQyxNQUFoQixFQUF3QjtBQUN4Qy9ELFVBQUc5QixLQUFILENBQVM2RixNQUFULEVBQWlCN0UsTUFBakIsQ0FBd0I0RSxTQUF4QjtBQUNBLE9BRkQ7QUFHQSxNQUoyRSxFQUE1RTtBQUtBLEtBUGdFLENBTzlEM0MsVUFBVSxDQUFWLENBUDhELEVBT2hEQSxVQUFVLENBQVYsQ0FQZ0QsQ0FBakU7QUFRQSxJQWZvQjtBQWdCckJwQixTQUFRLGNBQVMyQixRQUFULEVBQW1CO0FBQzFCLFFBQUkxQixLQUFLLElBQVQ7O0FBRUEsU0FBSyxJQUFJK0QsTUFBVCxJQUFtQi9ELEdBQUc5QixLQUF0QixFQUE2QjtBQUM1QixTQUFJLFVBQVV3RCxTQUFTc0MsSUFBVCxDQUFjaEUsR0FBRzlCLEtBQUgsQ0FBUzZGLE1BQVQsQ0FBZCxFQUFnQ0EsTUFBaEMsQ0FBZCxFQUF1RDtBQUN0RCxhQUFPQSxNQUFQLENBRHNELENBQ3hDO0FBQ2Q7QUFDRDs7QUFFRCxXQUFPLElBQVA7QUFDQSxJQTFCb0I7QUEyQnJCaEYsU0FBYSxnQkFBVztBQUN2QixRQUFJaUIsS0FBSyxJQUFUO0FBQ0E7QUFDQSxXQUFPdkUsRUFBRSxNQUFNdUUsR0FBR0UsT0FBSCxDQUFXZSxJQUFYLENBQWdCLElBQWhCLENBQVIsQ0FBUDtBQUNBLElBL0JvQjs7QUFpQ3JCekIsU0FBYSxjQUFTeUUsS0FBVCxFQUFnQjtBQUFDO0FBQzdCLFFBQUlqRSxLQUFLLElBQVQ7O0FBRUEsUUFBSWtFLFVBQVVsRSxHQUFHbUUsR0FBSCxFQUFkOztBQUVBO0FBQ2MsV0FBT0YsaUJBQWlCRyxNQUFqQixHQUNGLFlBQVk7QUFDVHBFLFFBQUdELElBQUgsQ0FBUSxVQUFVVCxFQUFWLEVBQWM7QUFDbEIsVUFBSUEsR0FBRzZELEtBQUgsQ0FBU2MsS0FBVCxDQUFKLEVBQXFCO0FBQ2pCQyxlQUFRdEIsSUFBUixDQUFhdEQsRUFBYixFQUFpQixJQUFqQjtBQUNIO0FBQ0osTUFKRDtBQUtBLFlBQU80RSxPQUFQO0FBQ0gsS0FQRCxFQURHLEdBU0ZELE1BQU12RyxNQUFOLElBQWdCLENBQWhCLEdBQ1EsVUFBVWlCLFNBQVYsRUFBcUI7QUFDbEI7QUFDQXFCLFFBQUdELElBQUgsQ0FBUSxZQUFZO0FBQ2hCLFVBQUksS0FBS21CLElBQUwsTUFBZXZDLFNBQW5CLEVBQThCO0FBQzFCdUYsZUFBUXRCLElBQVIsQ0FBYSxLQUFLekQsUUFBTCxDQUFjRyxFQUEzQixFQUErQixJQUEvQjtBQUNIO0FBQ0osTUFKRDs7QUFNQSxZQUFPNEUsT0FBUDtBQUNILEtBVEQsQ0FTR0QsS0FUSCxDQURQLEdBV1EsWUFBWTtBQUNUO0FBQ0EsWUFBT0EsTUFBTUksT0FBTixDQUFjLEdBQWQsSUFBcUIsQ0FBQyxDQUF0QixHQUNGLFlBQVk7QUFDVDtBQUNBLFVBQUlDLFFBQVFMLE1BQU1uQixLQUFOLENBQVksR0FBWixDQUFaOztBQUVBOUMsU0FBR0QsSUFBSCxDQUFRLFVBQVVnRSxNQUFWLEVBQWtCO0FBQ3RCLFdBQUksS0FBSzdDLElBQUwsTUFBZW9ELE1BQU0sQ0FBTixDQUFmLElBQTJCLEtBQUtwRixNQUFMLE1BQWlCb0YsTUFBTSxDQUFOLENBQWhELEVBQTBEO0FBQ3RESixnQkFBUXRCLElBQVIsQ0FBYSxLQUFLekQsUUFBTCxDQUFjRyxFQUEzQixFQUErQixJQUEvQjtBQUNIO0FBQ0osT0FKRDs7QUFNQSxhQUFPNEUsT0FBUDtBQUNILE1BWEQsRUFERyxHQWFGLFlBQVk7QUFDVGxFLFNBQUdELElBQUgsQ0FBUSxZQUFZO0FBQ2hCLFdBQUksS0FBS2IsTUFBTCxNQUFpQitFLEtBQXJCLEVBQTRCO0FBQ3hCQyxnQkFBUXRCLElBQVIsQ0FBYSxLQUFLekQsUUFBTCxDQUFjRyxFQUEzQixFQUErQixJQUEvQjtBQUNIO0FBQ0osT0FKRDtBQUtBLGFBQU80RSxPQUFQO0FBQ0gsTUFQRCxFQWJKO0FBcUJILEtBdkJELEVBcEJaO0FBOENkLElBckZvQjtBQXNGckJDLFFBQWEsU0FBU0EsSUFBVCxHQUFlO0FBQUM7QUFDNUIsUUFBSW5FLEtBQUssSUFBVDs7QUFFQSxXQUFPO0FBQ045QixZQUFhLEVBRFA7QUFFTmdDLGNBQWEsRUFGUDtBQUdOeEMsYUFBYSxDQUhQO0FBSU53QixhQUFhLGtCQUFXO0FBQ3ZCLFVBQUlxRixPQUFPcEQsU0FBWDtBQUFBLFVBQ0NoRixPQUFPLElBRFI7QUFFQTtBQUNBLGFBQU8sS0FBS3VCLE1BQUwsSUFBZSxDQUFmLElBQW9CNkcsS0FBSzdHLE1BQUwsSUFBZSxDQUFuQyxHQUF1QyxLQUFLUSxLQUFMLENBQVcsQ0FBWCxFQUFjZ0IsTUFBZCxFQUF2QyxHQUFpRSxZQUFXO0FBQ2xGO0FBQ0F6RCxTQUFFc0UsSUFBRixDQUFPNUQsS0FBSytCLEtBQVosRUFBbUIsWUFBVztBQUM3QixhQUFLZ0IsTUFBTCxDQUFZMEMsS0FBWixDQUFrQixJQUFsQixFQUF3QjJDLElBQXhCO0FBQ0EsUUFGRDtBQUdBLE9BTHNFLEVBQXZFO0FBTUEsTUFkSztBQWVOeEYsV0FBYSxnQkFBVztBQUN2QixhQUFPaUIsR0FBR2pCLElBQUgsQ0FBUWlGLElBQVIsQ0FBYSxJQUFiLENBQVA7QUFDQSxNQWpCSztBQWtCTmpFLFdBQWEsZ0JBQVc7QUFDdkIsYUFBT0MsR0FBR0QsSUFBSCxDQUFRaUUsSUFBUixDQUFhLElBQWIsRUFBbUI3QyxVQUFVLENBQVYsQ0FBbkIsQ0FBUDtBQUNBLE1BcEJLO0FBcUJOdkIsVUFBYSxlQUFXO0FBQ3ZCLGFBQU9JLEdBQUdKLEdBQUgsQ0FBT29FLElBQVAsQ0FBWSxJQUFaLEVBQWtCN0MsVUFBVSxDQUFWLENBQWxCLENBQVA7QUFDQSxNQXZCSztBQXdCTjNCLFdBQWEsZ0JBQVc7QUFDdkIsYUFBT1EsR0FBR1IsSUFBSCxDQUFRd0UsSUFBUixDQUFhLElBQWIsRUFBbUI3QyxVQUFVLENBQVYsQ0FBbkIsQ0FBUDtBQUNBLE1BMUJLO0FBMkJOZ0QsVUFBWSxlQUFXO0FBQ3RCLGFBQU9BLEtBQUlILElBQUosQ0FBU2hFLEVBQVQsQ0FBUDtBQUNBLE1BN0JLO0FBOEJONEMsV0FBYSxjQUFTdEQsRUFBVCxFQUFha0IsSUFBYixFQUFtQjtBQUMvQixXQUFLdEMsS0FBTCxDQUFXMEUsSUFBWCxDQUFnQnBDLElBQWhCO0FBQ0EsV0FBS04sT0FBTCxDQUFhMEMsSUFBYixDQUFrQnRELEVBQWxCO0FBQ0EsUUFBRSxLQUFLNUIsTUFBUDtBQUNBO0FBbENLLEtBQVA7QUFvQ0EsSUE3SG9CO0FBOEhyQjtBQUNBa0MsUUFBUSxhQUFTaUUsUUFBVCxFQUFtQjtBQUMxQixRQUFJN0QsS0FBSyxJQUFUOztBQUVBLFdBQU8sT0FBTzZELFFBQVAsSUFBbUIsUUFBbkIsR0FDTjdELEdBQUc5QixLQUFILENBQVMyRixRQUFULENBRE0sR0FDZ0IsWUFBVzs7QUFFaEMsU0FBSUssVUFBVWxFLEdBQUdtRSxHQUFILEVBQWQ7O0FBRUExSSxPQUFFc0UsSUFBRixDQUFPOEQsUUFBUCxFQUFpQixVQUFTcEMsS0FBVCxFQUFnQnNDLE1BQWhCLEVBQXdCO0FBQ3hDLFVBQUksUUFBTy9ELEdBQUc5QixLQUFILENBQVM2RixNQUFULENBQVAsTUFBNEIsUUFBaEMsRUFBMEM7QUFDekNHLGVBQVF0QixJQUFSLENBQWFtQixNQUFiLEVBQXFCL0QsR0FBRzlCLEtBQUgsQ0FBUzZGLE1BQVQsQ0FBckI7QUFDQTtBQUNELE1BSkQ7O0FBTUEsWUFBT0csT0FBUDtBQUNBLEtBWG9CLEVBRHRCO0FBYUE7QUEvSW9CLEdBQXRCOztBQWtKQSxTQUFPbEUsR0FBR3BELElBQUgsQ0FBUSxZQUFSLENBQVA7QUFDQSxFQW5tQkQ7QUFzbUJBLENBMW1CRCxFQTBtQkc0SCxNQTFtQkgsRSIsImZpbGUiOiJhamF4LjUwYTQzZWM0MTlmMDI0YmQ2YmY5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM2ZTc5ZGQzNmFlZTVmYjRiYzJjIiwiJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5idXR0b25TZWFyY2gnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIGNvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tEaXNwb0RhdGUuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ0bi1zdWNjZXNzLmJ1dHRvbkFkZFNhbGxlJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAvLyAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgLy8gZnVuY3Rpb24gZ2V0RGlzcG9TYWxsZSgpe1xuICAgIC8vICAgICAkLmFqYXgoe1xuICAgIC8vICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZV9hamF4JyksXG4gICAgLy8gICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgIC8vICAgICAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAvLyAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAvLyAgICAgICAgICAgICBcImlkU2FsbGVcIiA6IGlkU2FsbGUsXG4gICAgLy8gICAgICAgICB9LHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgIC8vXG4gICAgLy8gICAgICAgICB9XG4gICAgLy9cbiAgICAvL1xuICAgIC8vIH1cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgXCJpZFNhbGxlXCIgOiBpZFNhbGxlLFxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoaXNEaXNwbywgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnKyBpc0Rpc3BvKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICQuZ2V0KFJvdXRpbmcuZ2VuZXJhdGUoJycpLCBmdW5jdGlvbihodG1sKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnTGEgc2FsbGUgblxcJ2VzdCBwbHVzIGRpc3BvbmlibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgZGUgbGEgc2FsbGUgY2hvaXNpJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGxvcnMgZGUgbGEgdsOpcmlmaWNhdGlvbiBkZSBsYSBkaXNwb25pYmlsaXTDqSBkZSBsYSBzYWxsZSBuwrAnKyBpZFNhbGxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwidmFyIGZpcnN0U2VhdExhYmVsID0gMTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgICBpZigkKCcjc2VhdC1tYXAnKS5sZW5ndGggJiYgICQoJyNzZWxlY3RlZC1zZWF0cycpLmxlbmd0aCl7XG4gICAgICAgIGluaXRDYXJ0ZUludGVyYWN0aXZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdENhcnRlSW50ZXJhY3RpdmUoKXtcbiAgICAgICAgdmFyICRjYXJ0ID0gJCgnI3NlbGVjdGVkLXNlYXRzJyksXG4gICAgICAgICAgICAkY291bnRlciA9ICQoJyNjb3VudGVyJyksXG4gICAgICAgICAgICAkdG90YWwgPSAkKCcjdG90YWwnKSxcbiAgICAgICAgICAgIHNjID0gJCgnI3NlYXQtbWFwJykuc2VhdENoYXJ0cyh7XG4gICAgICAgICAgICAgICAgbWFwOiBbXG4gICAgICAgICAgICAgICAgICAgICdmZl9mZicsXG4gICAgICAgICAgICAgICAgICAgICdmZl9mZicsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9fXycsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZV9lZScsXG4gICAgICAgICAgICAgICAgICAgICdlZWVlZScsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzZWF0czoge1xuICAgICAgICAgICAgICAgICAgICBmOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdmaXJzdC1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ0ZpcnN0IENsYXNzJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdlY29ub215LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnRWNvbm9teSBDbGFzcydcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0TGFiZWw6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlyc3RTZWF0TGFiZWwrKztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgICAgICBub2RlOiAkKCcjbGVnZW5kJyksXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2YnLCAnYXZhaWxhYmxlJywgJ0ZpcnN0IENsYXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2UnLCAnYXZhaWxhYmxlJywgJ0Vjb25vbXkgQ2xhc3MnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZicsICd1bmF2YWlsYWJsZScsICdBbHJlYWR5IEJvb2tlZCddXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCdzIGNyZWF0ZSBhIG5ldyA8bGk+IHdoaWNoIHdlJ2xsIGFkZCB0byB0aGUgY2FydCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGxpPicgKyB0aGlzLmRhdGEoKS5jYXRlZ29yeSArICcgU2VhdCAjICcgKyB0aGlzLnNldHRpbmdzLmxhYmVsICsgJzogPGI+JCcgKyB0aGlzLmRhdGEoKS5wcmljZSArICc8L2I+IDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjYW5jZWwtY2FydC1pdGVtXCI+W2NhbmNlbF08L2E+PC9saT4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ3NlYXRJZCcsIHRoaXMuc2V0dGluZ3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCRjYXJ0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIExldHMgdXBkYXRlIHRoZSBjb3VudGVyIGFuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIC5maW5kIGZ1bmN0aW9uIHdpbGwgbm90IGZpbmQgdGhlIGN1cnJlbnQgc2VhdCwgYmVjYXVzZSBpdCB3aWxsIGNoYW5nZSBpdHMgc3RhdXRzIG9ubHkgYWZ0ZXIgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiAnc2VsZWN0ZWQnLiBUaGlzIGlzIHdoeSB3ZSBoYXZlIHRvIGFkZCAxIHRvIHRoZSBsZW5ndGggYW5kIHRoZSBjdXJyZW50IHNlYXQgcHJpY2UgdG8gdGhlIHRvdGFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSArIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSB0aGUgY291bnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbmQgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpIC0gdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSB0aGUgaXRlbSBmcm9tIG91ciBjYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FydC1pdGVtLScgKyB0aGlzLnNldHRpbmdzLmlkKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIHZhY2F0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICd1bmF2YWlsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiBhbHJlYWR5IGJvb2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1bmF2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy90aGlzIHdpbGwgaGFuZGxlIFwiW2NhbmNlbF1cIiBsaW5rIGNsaWNrc1xuICAgICAgICAkKCcjc2VsZWN0ZWQtc2VhdHMnKS5vbignY2xpY2snLCAnLmNhbmNlbC1jYXJ0LWl0ZW0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL2xldCdzIGp1c3QgdHJpZ2dlciBDbGljayBldmVudCBvbiB0aGUgYXBwcm9wcmlhdGUgc2VhdCwgc28gd2UgZG9uJ3QgaGF2ZSB0byByZXBlYXQgdGhlIGxvZ2ljIGhlcmVcbiAgICAgICAgICAgIHNjLmdldCgkKHRoaXMpLnBhcmVudHMoJ2xpOmZpcnN0JykuZGF0YSgnc2VhdElkJykpLmNsaWNrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vbGV0J3MgcHJldGVuZCBzb21lIHNlYXRzIGhhdmUgYWxyZWFkeSBiZWVuIGJvb2tlZFxuICAgICAgICBzYy5nZXQoWycxXzInLCAnNF8xJywgJzdfMScsICc3XzInXSkuc3RhdHVzKCd1bmF2YWlsYWJsZScpO1xuICAgIH1cblxufSk7XG5cbmZ1bmN0aW9uIHJlY2FsY3VsYXRlVG90YWwoc2MpIHtcbiAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgLy9iYXNpY2FsbHkgZmluZCBldmVyeSBzZWxlY3RlZCBzZWF0IGFuZCBzdW0gaXRzIHByaWNlXG4gICAgc2MuZmluZCgnc2VsZWN0ZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG90YWwgKz0gdGhpcy5kYXRhKCkucHJpY2U7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG90YWw7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIi8qIVxuICogalF1ZXJ5LVNlYXQtQ2hhcnRzIHYxLjEuNSAtPiB2MiAoS2FyaW0gQk9VQlJJVClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRldXN6bWFya293c2tpL2pRdWVyeS1TZWF0LUNoYXJ0c1xuICpcbiAqIENvcHlyaWdodCAyMDEzLCAyMDE2IE1hdGV1c3ogTWFya293c2tpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIFVwZ3JhZGUgYnkgYXV0aG9yOiBLYXJpbSBCT1VCUklUXG4gKi9cblxuKGZ1bmN0aW9uKCQpIHtcblx0XHRcblx0Ly8ndXNlIHN0cmljdCc7XHRcblx0XHRcblx0JC5mbi5zZWF0Q2hhcnRzID0gZnVuY3Rpb24gKHNldHVwKSB7XG5cblx0XHQvL2lmIHRoZXJlJ3Mgc2VhdENoYXJ0cyBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQsIHJldHVybiBpdFxuXHRcdGlmICh0aGlzLmRhdGEoJ3NlYXRDaGFydHMnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgZm4gICAgICAgPSB0aGlzLFxuXHRcdFx0c2VhdHMgICAgPSB7fSxcblx0XHRcdHNlYXRJZHMgID0gW10sXG5cdFx0XHRsZWdlbmQsXG5cdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0YW5pbWF0ZSA6IGZhbHNlLCAvL3JlcXVpcmVzIGpRdWVyeSBVSVxuXHRcdFx0XHRuYW1pbmcgIDoge1xuXHRcdFx0XHRcdHRvcCAgICA6IHRydWUsXG5cdFx0XHRcdFx0bGVmdCAgIDogdHJ1ZSxcblx0XHRcdFx0XHRnZXRJZCAgOiBmdW5jdGlvbihjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcm93ICsgJ18nICsgY29sdW1uO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0TGFiZWwgOiBmdW5jdGlvbiAoY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbHVtbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxlZ2VuZCA6IHtcblx0XHRcdFx0XHRub2RlICAgOiBudWxsLFxuXHRcdFx0XHRcdGl0ZW1zICA6IFtdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsaWNrICAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ3NlbGVjdGVkJztcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3NlbGVjdGVkJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdhdmFpbGFibGUnO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9jdXMgIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdmb2N1c2VkJztcblx0XHRcdFx0XHR9IGVsc2UgIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRibHVyICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdGF0dXMoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VhdHMgICA6IHt9XG5cdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQvL3NlYXQgd2lsbCBiZSBiYXNpY2FsbHkgYSBzZWF0IG9iamVjdCB3aGljaCB3ZSdsbCB3aGVuIGdlbmVyYXRpbmcgdGhlIG1hcFxuXHRcdFx0c2VhdCA9IChmdW5jdGlvbihzZWF0Q2hhcnRzLCBzZWF0Q2hhcnRzU2V0dGluZ3MpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChzZXR1cCkge1xuXHRcdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRzdGF0dXMgOiAnYXZhaWxhYmxlJywgLy9hdmFpbGFibGUsIHVuYXZhaWxhYmxlLCBzZWxlY3RlZFxuXHRcdFx0XHRcdFx0c3R5bGUgIDogJ2F2YWlsYWJsZScsXG5cdFx0XHRcdFx0XHQvL21ha2Ugc3VyZSB0aGVyZSdzIGFuIGVtcHR5IGhhc2ggaWYgdXNlciBkb2Vzbid0IHBhc3MgYW55dGhpbmdcblx0XHRcdFx0XHRcdGRhdGEgICA6IHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tzZXR1cC5jaGFyYWN0ZXJdIHx8IHt9XG5cdFx0XHRcdFx0XHQvL2FueXRoaW5nIGdvZXMgaGVyZT9cblx0XHRcdFx0XHR9LCBzZXR1cCk7XG5cblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGVcblx0XHRcdFx0XHRcdC5hdHRyKHtcblx0XHRcdFx0XHRcdFx0aWQgICAgICAgICAgICAgOiBmbi5zZXR0aW5ncy5pZCxcblx0XHRcdFx0XHRcdFx0cm9sZSAgICAgICAgICAgOiAnY2hlY2tib3gnLFxuXHRcdFx0XHRcdFx0XHQnYXJpYS1jaGVja2VkJyA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRmb2N1c2FibGUgICAgICA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHRhYkluZGV4ICAgICAgIDogLTEgLy9tYW51YWwgZm9jdXNcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQudGV4dChmbi5zZXR0aW5ncy5sYWJlbClcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyhbJ3NlYXRDaGFydHMtc2VhdCcsICdzZWF0Q2hhcnRzLWNlbGwnLCAnYXZhaWxhYmxlJ10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHQvL2xldCdzIG1lcmdlIGN1c3RvbSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIHN0YW5kYXJkIEpTQyBvbmVzXG5cdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHR0eXBlb2Ygc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW2ZuLnNldHRpbmdzLmNoYXJhY3Rlcl0gPT0gXCJ1bmRlZmluZWRcIiA/IFxuXHRcdFx0XHRcdFx0XHRcdFtdIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW2ZuLnNldHRpbmdzLmNoYXJhY3Rlcl0uY2xhc3Nlc1xuXHRcdFx0XHRcdFx0XHQpLmpvaW4oJyAnKSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9iYXNpY2FsbHkgYSB3cmFwcGVyIGZ1bmN0aW9uXG5cdFx0XHRcdFx0Zm4uZGF0YSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLmRhdGE7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5jaGFyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuY2hhcmFjdGVyO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4ubm9kZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLiRub2RlO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdCAqIENhbiBlaXRoZXIgc2V0IG9yIHJldHVybiBzdGF0dXMgZGVwZW5kaW5nIG9uIGFyZ3VtZW50cy5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHRoZXJlJ3Mgbm8gYXJndW1lbnQsIGl0IHdpbGwgcmV0dXJuIHRoZSBjdXJyZW50IHN0eWxlLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgeW91IHBhc3MgYW4gYXJndW1lbnQsIGl0IHdpbGwgdXBkYXRlIHNlYXQncyBzdHlsZVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGZuLnN0eWxlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09IDEgP1xuXHRcdFx0XHRcdFx0XHQoZnVuY3Rpb24obmV3U3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgb2xkU3R5bGUgPSBmbi5zZXR0aW5ncy5zdHlsZTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vaWYgbm90aGluZyBjaGFuZ2VzLCBkbyBub3RoaW5nXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG5ld1N0eWxlID09IG9sZFN0eWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb2xkU3R5bGU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZm9jdXNlZCBpcyBhIHNwZWNpYWwgc3R5bGUgd2hpY2ggaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBzdGF0dXNcblx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy5zdGF0dXMgPSBuZXdTdHlsZSAhPSAnZm9jdXNlZCcgPyBuZXdTdHlsZSA6IGZuLnNldHRpbmdzLnN0YXR1cztcblx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0XHRcdFx0LmF0dHIoJ2FyaWEtY2hlY2tlZCcsIG5ld1N0eWxlID09ICdzZWxlY3RlZCcpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiB1c2VyIHdhbnRzIHRvIGFuaW1hdGUgc3RhdHVzIGNoYW5nZXMsIGxldCBoaW0gZG8gdGhpc1xuXHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHNTZXR0aW5ncy5hbmltYXRlID9cblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnN3aXRjaENsYXNzKG9sZFN0eWxlLCBuZXdTdHlsZSwgMjAwKSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZS5yZW1vdmVDbGFzcyhvbGRTdHlsZSkuYWRkQ2xhc3MobmV3U3R5bGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0eWxlID0gbmV3U3R5bGU7XG5cdFx0XHRcdFx0XHRcdH0pKGFyZ3VtZW50c1swXSkgOiBmbi5zZXR0aW5ncy5zdHlsZTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vZWl0aGVyIHNldCBvciByZXRyaWV2ZVxuXHRcdFx0XHRcdGZuLnN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuXHRcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5zdGF0dXMgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBcblx0XHRcdFx0XHRcdFx0Zm4uc3R5bGUoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0YXR1cztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIHRvIGNvbnZpZW5pZXRseSBnZXQgc2hvcnRjdXQgdmFyaWFibGVzXG5cdFx0XHRcdFx0KGZ1bmN0aW9uKHNlYXRTZXR0aW5ncywgY2hhcmFjdGVyLCBzZWF0KSB7XG5cdFx0XHRcdFx0XHQvL2F0dGFjaCBldmVudCBoYW5kbGVyc1xuXHRcdFx0XHRcdFx0JC5lYWNoKFsnY2xpY2snLCAnZm9jdXMnLCAnYmx1ciddLCBmdW5jdGlvbihpbmRleCwgY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQvL3dlIHdhbnQgdG8gYmUgYWJsZSB0byBjYWxsIHRoZSBmdW5jdGlvbnMgZm9yIGVhY2ggc2VhdCBvYmplY3Rcblx0XHRcdFx0XHRcdFx0Zm5bY2FsbGJhY2tdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrID09ICdmb2N1cycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBhbHJlYWR5IGEgZm9jdXNlZCBlbGVtZW50LCB3ZSBoYXZlIHRvIHJlbW92ZSBmb2N1cyBmcm9tIGl0IGZpcnN0XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzW3NlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JyldLmJsdXIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jywgc2VhdC5zZXR0aW5ncy5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0Lm5vZGUoKS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHQgKiBVc2VyIGNhbiBwYXNzIGhpcyBvd24gY2FsbGJhY2sgZnVuY3Rpb24sIHNvIHdlIGhhdmUgdG8gZmlyc3QgY2hlY2sgaWYgaXQgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdFx0ICogYW5kIGlmIG5vdCwgdXNlIG91ciBkZWZhdWx0IGNhbGxiYWNrLlxuXHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0ICogRWFjaCBjYWxsYmFjayBmdW5jdGlvbiBpcyBleGVjdXRlZCBpbiB0aGUgY3VycmVudCBzZWF0IGNvbnRleHQuXG5cdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZuLnN0eWxlKHR5cGVvZiBzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10gPT09ICdmdW5jdGlvbicgP1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdFNldHRpbmdzW2NoYXJhY3Rlcl1bY2FsbGJhY2tdLmFwcGx5KHNlYXQpIDogc2VhdENoYXJ0c1NldHRpbmdzW2NhbGxiYWNrXS5hcHBseShzZWF0KSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly90aGUgYmVsb3cgd2lsbCBiZWNvbWUgc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQgdGhhbmtzIHRvIHRoZSBpbW1lZGlhdGUgZnVuY3Rpb25cdFx0XG5cdFx0XHRcdFx0fSkoc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzLCBmbi5zZXR0aW5ncy5jaGFyYWN0ZXIsIGZuKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4ubm9kZSgpXG5cdFx0XHRcdFx0XHQvL3RoZSBmaXJzdCB0aHJlZSBtb3VzZSBldmVudHMgYXJlIHNpbXBsZVxuXHRcdFx0XHRcdFx0Lm9uKCdjbGljaycsICAgICAgZm4uY2xpY2spXG5cdFx0XHRcdFx0XHQub24oJ21vdXNlZW50ZXInLCBmbi5mb2N1cylcblx0XHRcdFx0XHRcdC5vbignbW91c2VsZWF2ZScsIGZuLmJsdXIpXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8va2V5ZG93biByZXF1aXJlcyBxdWl0ZSBhIGxvdCBvZiBsb2dpYywgYmVjYXVzZSB3ZSBoYXZlIHRvIGtub3cgd2hlcmUgdG8gbW92ZSB0aGUgZm9jdXNcblx0XHRcdFx0XHRcdC5vbigna2V5ZG93bicsICAgIChmdW5jdGlvbihzZWF0LCAkc2VhdCkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHZhciAkbmV3U2VhdDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvL2V2ZXJ5dGhpbmcgZGVwZW5kcyBvbiB0aGUgcHJlc3NlZCBrZXlcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGUud2hpY2gpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vc3BhY2ViYXIgd2lsbCBqdXN0IHRyaWdnZXIgdGhlIHNhbWUgZXZlbnQgbW91c2UgY2xpY2sgZG9lc1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9VUCAmIERPV05cblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGlzIGlzIGEgcmVjdXJzaXZlLCBpbW1lZGlhdGUgZnVuY3Rpb24gd2hpY2ggc2VhcmNoZXMgZm9yIHRoZSBmaXJzdCBcImZvY3VzYWJsZVwiIHJvdy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIGltbWVkaWF0ZSBmdW5jdGlvbiBiZWNhdXNlIHdlIHdhbnQgYSBjb252ZW5pZW50IGFjY2VzcyB0byBzb21lIERPTSBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBXZSdyZSB1c2luZyByZWN1cnNpb24gYmVjYXVzZSBzb21ldGltZXMgd2UgbWF5IGhpdCBhbiBlbXB0eSBzcGFjZSByYXRoZXIgdGhhbiBhIHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbiBmaW5kQXZhaWxhYmxlKCRyb3dzLCAkc2VhdHMsICRjdXJyZW50Um93KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdSb3c7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9sZXQncyBkZXRlcm1pbmUgd2hpY2ggcm93IHNob3VsZCB3ZSBtb3ZlIHRvXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkcm93cy5pbmRleCgkY3VycmVudFJvdykgJiYgZS53aGljaCA9PSAzOCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBmaXJzdCByb3cgYW5kIHVzZXIgaGFzIHByZXNzZWQgdXAgYXJyb3csIG1vdmUgdG8gdGhlIGxhc3Qgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MubGFzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoJHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpID09ICRyb3dzLmxlbmd0aC0xICYmIGUud2hpY2ggPT0gNDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhpcyBpcyB0aGUgbGFzdCByb3cgYW5kIHVzZXIgaGFzIHByZXNzZWQgZG93biBhcnJvdywgbW92ZSB0byB0aGUgZmlyc3Qgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZmlyc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2luZyBlcSB0byBnZXQgYW4gZWxlbWVudCBhdCB0aGUgZGVzaXJlZCBpbmRleCBwb3NpdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmVxKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHVwIGFycm93LCB0aGVuIGRlY3JlbWVudCB0aGUgaW5kZXgsIGlmIGRvd24gaW5jcmVtZW50IGl0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRyb3dzLmluZGV4KCRjdXJyZW50Um93KSArIChlLndoaWNoID09IDM4ID8gKC0xKSA6ICgrMSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL25vdyB0aGF0IHdlIGtub3cgdGhlIHJvdywgbGV0J3MgZ2V0IHRoZSBzZWF0IHVzaW5nIHRoZSBjdXJyZW50IGNvbHVtbiBwb3NpdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gJG5ld1Jvdy5maW5kKCcuc2VhdENoYXJ0cy1zZWF0LC5zZWF0Q2hhcnRzLXNwYWNlJykuZXEoJHNlYXRzLmluZGV4KCRzZWF0KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGUgc2VhdCB3ZSBmb3VuZCBpcyBhIHNwYWNlLCBrZWVwIGxvb2tpbmcgZnVydGhlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkbmV3U2VhdC5oYXNDbGFzcygnc2VhdENoYXJ0cy1zcGFjZScpID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJG5ld1JvdykgOiAkbmV3U2VhdDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkoJHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRhaW5lciBhbmQgdGhlbiBzZWxlY3QgYWxsIHJvd3MgYnV0IHRoZSBoZWFkZXJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXInKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCByb3cgYW5kIHRoZW4gZmluZCBhbGwgc2VhdCBjZWxscyAoYm90aCBzZWF0cyAmIHNwYWNlcylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1yb3c6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkc2VhdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1yb3c6bm90KC5zZWF0Q2hhcnRzLWhlYWRlciknKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly93ZSBjb3VsZG4ndCBkZXRlcm1pbmUgdGhlIG5ldyBzZWF0LCBzbyB3ZSBiZXR0ZXIgZ2l2ZSB1cFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9yZW1vdmUgZm9jdXMgZnJvbSB0aGUgb2xkIHNlYXQgYW5kIHB1dCBpdCBvbiB0aGUgbmV3IG9uZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbJG5ld1NlYXQuYXR0cignaWQnKV0uZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXBkYXRlIG91ciBcImFyaWFcIiByZWZlcmVuY2Ugd2l0aCB0aGUgbmV3IHNlYXQgaWRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCAkbmV3U2VhdC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1x0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHQvL0xFRlQgJiBSSUdIVFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVGhlIGxvZ2ljIGhlcmUgaXMgc2xpZ2h0bHkgZGlmZmVyZW50IGZyb20gdGhlIG9uZSBmb3IgdXAvZG93biBhcnJvd3MuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgd2lsbCBiZSBhYmxlIHRvIGJyb3dzZSB0aGUgd2hvbGUgbWFwIHVzaW5nIGp1c3QgbGVmdC9yaWdodCBhcnJvdywgYmVjYXVzZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBpdCB3aWxsIG1vdmUgdG8gdGhlIG5leHQgcm93IHdoZW4gd2UgcmVhY2ggdGhlIHJpZ2h0L2xlZnQtbW9zdCBzZWF0LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAoZnVuY3Rpb24oJHNlYXRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJHNlYXRzLmluZGV4KCRzZWF0KSAmJiBlLndoaWNoID09IDM3KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgbGVmdCBhcnJvdyBhbmQgd2UncmUgY3VycmVudGx5IG9uIHRoZSBsZWZ0LW1vc3Qgc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkc2VhdHMuaW5kZXgoJHNlYXQpID09ICRzZWF0cy5sZW5ndGggLTEgJiYgZS53aGljaCA9PSAzOSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2VyIGhhcyBwcmVzc2VkIHJpZ2h0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIHJpZ2h0LW1vc3Qgc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3NpbXBseSBtb3ZlIG9uZSBzZWF0IGxlZnQgb3IgcmlnaHQgZGVwZW5kaW5nIG9uIHRoZSBrZXlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMuZXEoJHNlYXRzLmluZGV4KCRzZWF0KSArIChlLndoaWNoID09IDM3ID8gKC0xKSA6ICgrMSkpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkoJHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtY29udGFpbmVyOmZpcnN0Jylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkbmV3U2VhdC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9oYW5kbGUgZm9jdXNcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ibHVyKCk7XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbJG5ld1NlYXQuYXR0cignaWQnKV0uZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXBkYXRlIG91ciBcImFyaWFcIiByZWZlcmVuY2Ugd2l0aCB0aGUgbmV3IHNlYXQgaWRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCAkbmV3U2VhdC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcblx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH0pKGZuLCBmbi5ub2RlKCkpKTtcblx0XHRcdFx0XHRcdC8vLmFwcGVuZFRvKHNlYXRDaGFydHMuZmluZCgnLicgKyByb3cpKTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9KShmbiwgc2V0dGluZ3MpO1xuXHRcdFx0XG5cdFx0Zm4uYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY29udGFpbmVyJyk7XG5cdFx0XG5cdFx0Ly90cnVlIC0+IGRlZXAgY29weSFcblx0XHQkLmV4dGVuZCh0cnVlLCBzZXR0aW5ncywgc2V0dXApO1x0XHRcblx0XHRcblx0XHQvL0dlbmVyYXRlIGRlZmF1bHQgcm93IGlkcyB1bmxlc3MgdXNlciBwYXNzZWQgaGlzIG93blxuXHRcdHNldHRpbmdzLm5hbWluZy5yb3dzID0gc2V0dGluZ3MubmFtaW5nLnJvd3MgfHwgKGZ1bmN0aW9uKGxlbmd0aCkge1xuXHRcdFx0dmFyIHJvd3MgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvd3MucHVzaChpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByb3dzO1xuXHRcdH0pKHNldHRpbmdzLm1hcC5sZW5ndGgpO1xuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCBjb2x1bW4gaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLmNvbHVtbnMgPSBzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgY29sdW1ucyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29sdW1ucy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvbHVtbnM7XG5cdFx0fSkoc2V0dGluZ3MubWFwWzBdLnNwbGl0KCcnKS5sZW5ndGgpO1xuXHRcdFxuXHRcdGlmIChzZXR0aW5ncy5uYW1pbmcudG9wKSB7XG5cdFx0XHR2YXIgJGhlYWRlclJvdyA9ICQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdyBzZWF0Q2hhcnRzLWhlYWRlcicpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLmxlZnQpIHtcblx0XHRcdFx0JGhlYWRlclJvdy5hcHBlbmQoJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsJykpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0JC5lYWNoKHNldHRpbmdzLm5hbWluZy5jb2x1bW5zLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcblx0XHRcdFx0JGhlYWRlclJvdy5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKVxuXHRcdFx0XHRcdFx0LnRleHQodmFsdWUpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0XG5cdFx0Zm4uYXBwZW5kKCRoZWFkZXJSb3cpO1xuXHRcdFxuXHRcdC8vZG8gdGhpcyBmb3IgZWFjaCBtYXAgcm93XG5cdFx0JC5lYWNoKHNldHRpbmdzLm1hcCwgZnVuY3Rpb24ocm93LCBjaGFyYWN0ZXJzKSB7XG5cblx0XHRcdHZhciAkcm93ID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1yb3cnKTtcblx0XHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLmxlZnQpIHtcblx0XHRcdFx0JHJvdy5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwgc2VhdENoYXJ0cy1zcGFjZScpXG5cdFx0XHRcdFx0XHQudGV4dChzZXR0aW5ncy5uYW1pbmcucm93c1tyb3ddKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKlxuXHRcdFx0ICogRG8gdGhpcyBmb3IgZWFjaCBzZWF0IChsZXR0ZXIpXG5cdFx0XHQgKlxuXHRcdFx0ICogTm93IHVzZXJzIHdpbGwgYmUgYWJsZSB0byBwYXNzIGN1c3RvbSBJRCBhbmQgbGFiZWwgd2hpY2ggb3ZlcndyaXRlIHRoZSBvbmUgdGhhdCBzZWF0IHdvdWxkIGJlIGFzc2lnbmVkIGJ5IGdldElkIGFuZFxuXHRcdFx0ICogZ2V0TGFiZWxcblx0XHRcdCAqXG5cdFx0XHQgKiBOZXcgZm9ybWF0IGlzIGxpa2UgdGhpczpcblx0XHRcdCAqIGFbSUQsbGFiZWxdYVtJRF1hYWFhYVxuXHRcdFx0ICpcblx0XHRcdCAqIFNvIHlvdSBjYW4gb3ZlcndyaXRlIHRoZSBJRCBvciBsYWJlbCAob3IgYm90aCkgZXZlbiBmb3IganVzdCBvbmUgc2VhdC5cblx0XHRcdCAqIEJhc2ljYWxseSBJRCBzaG91bGQgYmUgZmlyc3QsIHNvIGlmIHlvdSB3YW50IHRvIG92ZXJ3cml0ZSBqdXN0IGxhYmVsIHdyaXRlIGl0IGFzIGZvbGxvd3M6XG5cdFx0XHQgKiBhWyxMQUJFTF1cblx0XHRcdCAqXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gSURzIGFyZUwgMC05LCBhLXosIEEtWiwgX1xuXHRcdFx0ICogQWxsb3dlZCBjaGFyYWN0ZXJzIGluIGxhYmVscyBhcmU6IDAtOSwgYS16LCBBLVosIF8sICcgJyAoc3BhY2UpXG5cdFx0XHQgKlxuXHRcdFx0ICovXG5cdFx0XHQgXG5cdFx0XHQkLmVhY2goY2hhcmFjdGVycy5tYXRjaCgvW2Etel9dezF9KFxcW1swLTlhLXpfXXswLH0oLFswLTlhLXpfIF0rKT9cXF0pPy9naSksIGZ1bmN0aW9uIChjb2x1bW4sIGNoYXJhY3RlclBhcmFtcykgeyBcblx0XHRcdFx0dmFyIG1hdGNoZXMgICAgICAgICA9IGNoYXJhY3RlclBhcmFtcy5tYXRjaCgvKFthLXpfXXsxfSkoXFxbKFswLTlhLXpfICxdKylcXF0pPy9pKSxcblx0XHRcdFx0XHQvL25vIG1hdHRlciBpZiB1c2VyIHNwZWNpZmllcyBbXSBwYXJhbXMsIHRoZSBjaGFyYWN0ZXIgc2hvdWxkIGJlIGluIHRoZSBzZWNvbmQgZWxlbWVudFxuXHRcdFx0XHRcdGNoYXJhY3RlciAgICAgICA9IG1hdGNoZXNbMV0sXG5cdFx0XHRcdFx0Ly9jaGVjayBpZiB1c2VyIGhhcyBwYXNzZWQgc29tZSBhZGRpdGlvbmFsIHBhcmFtcyB0byBvdmVycmlkZSBpZCBvciBsYWJlbFxuXHRcdFx0XHRcdHBhcmFtcyAgICAgICAgICA9IHR5cGVvZiBtYXRjaGVzWzNdICE9PSAndW5kZWZpbmVkJyA/IG1hdGNoZXNbM10uc3BsaXQoJywnKSA6IFtdLFxuXHRcdFx0XHRcdC8vaWQgcGFyYW0gc2hvdWxkIGJlIGZpcnN0XG5cdFx0XHRcdFx0b3ZlcnJpZGVJZCAgICAgID0gcGFyYW1zLmxlbmd0aCA/IHBhcmFtc1swXSA6IG51bGwsXG5cdFx0XHRcdFx0Ly9sYWJlbCBwYXJhbSBzaG91bGQgYmUgc2Vjb25kXG5cdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCAgID0gcGFyYW1zLmxlbmd0aCA9PT0gMiA/IHBhcmFtc1sxXSA6IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdCRyb3cuYXBwZW5kKGNoYXJhY3RlciAhPSAnXycgP1xuXHRcdFx0XHRcdC8vaWYgdGhlIGNoYXJhY3RlciBpcyBub3QgYW4gdW5kZXJzY29yZSAoZW1wdHkgc3BhY2UpXG5cdFx0XHRcdFx0KGZ1bmN0aW9uKG5hbWluZykge1xuXHRcblx0XHRcdFx0XHRcdC8vc28gdXNlcnMgZG9uJ3QgaGF2ZSB0byBzcGVjaWZ5IGVtcHR5IG9iamVjdHNcblx0XHRcdFx0XHRcdHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gPSBjaGFyYWN0ZXIgaW4gc2V0dGluZ3Muc2VhdHMgPyBzZXR0aW5ncy5zZWF0c1tjaGFyYWN0ZXJdIDoge307XG5cdFxuXHRcdFx0XHRcdFx0dmFyIGlkID0gb3ZlcnJpZGVJZCA/IG92ZXJyaWRlSWQgOiBuYW1pbmcuZ2V0SWQoY2hhcmFjdGVyLCBuYW1pbmcucm93c1tyb3ddLCBuYW1pbmcuY29sdW1uc1tjb2x1bW5dKTtcblx0XHRcdFx0XHRcdHNlYXRzW2lkXSA9IG5ldyBzZWF0KHtcblx0XHRcdFx0XHRcdFx0aWQgICAgICAgIDogaWQsXG5cdFx0XHRcdFx0XHRcdGxhYmVsICAgICA6IG92ZXJyaWRlTGFiZWwgP1xuXHRcdFx0XHRcdFx0XHRcdG92ZXJyaWRlTGFiZWwgOiBuYW1pbmcuZ2V0TGFiZWwoY2hhcmFjdGVyLCBuYW1pbmcucm93c1tyb3ddLCBuYW1pbmcuY29sdW1uc1tjb2x1bW5dKSxcblx0XHRcdFx0XHRcdFx0cm93ICAgICAgIDogcm93LFxuXHRcdFx0XHRcdFx0XHRjb2x1bW4gICAgOiBjb2x1bW4sXG5cdFx0XHRcdFx0XHRcdGNoYXJhY3RlciA6IGNoYXJhY3RlclxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHNlYXRJZHMucHVzaChpZCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdHNbaWRdLm5vZGUoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH0pKHNldHRpbmdzLm5hbWluZykgOlxuXHRcdFx0XHRcdC8vdGhpcyBpcyBqdXN0IGFuIGVtcHR5IHNwYWNlIChfKVxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcdFxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdGZuLmFwcGVuZCgkcm93KTtcblx0XHR9KTtcblx0XG5cdFx0Ly9pZiB0aGVyZSdyZSBhbnkgbGVnZW5kIGl0ZW1zIHRvIGJlIHJlbmRlcmVkXG5cdFx0c2V0dGluZ3MubGVnZW5kLml0ZW1zLmxlbmd0aCA/IChmdW5jdGlvbihsZWdlbmQpIHtcblx0XHRcdC8vZWl0aGVyIHVzZSB1c2VyLWRlZmluZWQgY29udGFpbmVyIG9yIGNyZWF0ZSBvdXIgb3duIGFuZCBpbnNlcnQgaXQgcmlnaHQgYWZ0ZXIgdGhlIHNlYXQgY2hhcnQgZGl2XG5cdFx0XHR2YXIgJGNvbnRhaW5lciA9IChsZWdlbmQubm9kZSB8fCAkKCc8ZGl2PjwvZGl2PicpLmluc2VydEFmdGVyKGZuKSlcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZCcpO1xuXHRcdFx0XHRcblx0XHRcdHZhciAkdWwgPSAkKCc8dWw+PC91bD4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kTGlzdCcpXG5cdFx0XHRcdC5hcHBlbmRUbygkY29udGFpbmVyKTtcblx0XHRcdFxuXHRcdFx0JC5lYWNoKGxlZ2VuZC5pdGVtcywgZnVuY3Rpb24oaW5kZXgsIGl0ZW0pIHtcblx0XHRcdFx0JHVsLmFwcGVuZChcblx0XHRcdFx0XHQkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZEl0ZW0nKVxuXHRcdFx0XHRcdFx0LmFwcGVuZChcblx0XHRcdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0XHRcdC8vbWVyZ2UgdXNlciBkZWZpbmVkIGNsYXNzZXMgd2l0aCBvdXIgc3RhbmRhcmQgb25lc1xuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhbJ3NlYXRDaGFydHMtc2VhdCcsICdzZWF0Q2hhcnRzLWNlbGwnLCBpdGVtWzFdXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXR0aW5ncy5jbGFzc2VzLCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiBzZXR0aW5ncy5zZWF0c1tpdGVtWzBdXSA9PSBcInVuZGVmaW5lZFwiID8gW10gOiBzZXR0aW5ncy5zZWF0c1tpdGVtWzBdXS5jbGFzc2VzKS5qb2luKCcgJylcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8c3Bhbj48L3NwYW4+Jylcblx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kRGVzY3JpcHRpb24nKVxuXHRcdFx0XHRcdFx0XHRcdC50ZXh0KGl0ZW1bMl0pXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuICRjb250YWluZXI7XG5cdFx0fSkoc2V0dGluZ3MubGVnZW5kKSA6IG51bGw7XG5cdFxuXHRcdGZuLmF0dHIoe1xuXHRcdFx0dGFiSW5kZXggOiAwXG5cdFx0fSk7XG5cdFx0XG5cdFx0XG5cdFx0Ly93aGVuIGNvbnRhaW5lcidzIGZvY3VzZWQsIG1vdmUgZm9jdXMgdG8gdGhlIGZpcnN0IHNlYXRcblx0XHRmbi5mb2N1cyhmdW5jdGlvbigpIHtcblx0XHRcdGlmIChmbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKSkge1xuXHRcdFx0XHRzZWF0c1tmbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdGZuLmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQ6bm90KC5zZWF0Q2hhcnRzLXNwYWNlKTpmaXJzdCcpLmZvY3VzKCk7XG5cdFx0XHRzZWF0c1tzZWF0SWRzWzBdXS5mb2N1cygpO1xuXG5cdFx0fSk7XG5cdFxuXHRcdC8vcHVibGljIG1ldGhvZHMgb2Ygc2VhdENoYXJ0c1xuXHRcdGZuLmRhdGEoJ3NlYXRDaGFydHMnLCB7XG5cdFx0XHRzZWF0cyAgIDogc2VhdHMsXG5cdFx0XHRzZWF0SWRzIDogc2VhdElkcyxcblx0XHRcdC8vc2V0IGZvciBvbmUsIHNldCBmb3IgbWFueSwgZ2V0IGZvciBvbmVcblx0XHRcdHN0YXR1czogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IGZuLnNlYXRzW2FyZ3VtZW50c1swXV0uc3RhdHVzKCkgOiAoZnVuY3Rpb24oc2VhdHNJZHMsIG5ld1N0YXR1cykge1xuXHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mIHNlYXRzSWRzID09ICdzdHJpbmcnID8gZm4uc2VhdHNbc2VhdHNJZHNdLnN0YXR1cyhuZXdTdGF0dXMpIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JC5lYWNoKHNlYXRzSWRzLCBmdW5jdGlvbihpbmRleCwgc2VhdElkKSB7XG5cdFx0XHRcdFx0XHRcdGZuLnNlYXRzW3NlYXRJZF0uc3RhdHVzKG5ld1N0YXR1cyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9KShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0XHR9LFxuXHRcdFx0ZWFjaCAgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdGZvciAodmFyIHNlYXRJZCBpbiBmbi5zZWF0cykge1xuXHRcdFx0XHRcdGlmIChmYWxzZSA9PT0gY2FsbGJhY2suY2FsbChmbi5zZWF0c1tzZWF0SWRdLCBzZWF0SWQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdElkOy8vcmV0dXJuIGxhc3QgY2hlY2tlZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0bm9kZSAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHQvL2Jhc2ljYWxseSBjcmVhdGUgYSBDU1MgcXVlcnkgdG8gZ2V0IGFsbCBzZWF0cyBieSB0aGVpciBET00gaWRzXG5cdFx0XHRcdHJldHVybiAkKCcjJyArIGZuLnNlYXRJZHMuam9pbignLCMnKSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24ocXVlcnkpIHsvL0QsIGEuYXZhaWxhYmxlLCB1bmF2YWlsYWJsZVxuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcblx0XHRcdFx0Ly9pcyBSZWdFeHBcblx0XHQgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5IGluc3RhbmNlb2YgUmVnRXhwID9cblx0XHQgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLm1hdGNoKHF1ZXJ5KSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKGlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgfSkoKSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAocXVlcnkubGVuZ3RoID09IDEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGNoYXJhY3Rlcikge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHNlYXJjaGVzIGp1c3QgZm9yIGEgcGFydGljdWFsIGNoYXJhY3RlclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IGNoYXJhY3Rlcikge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkocXVlcnkpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlciBydW5zIGEgbW9yZSBzb3BoaXN0aWNhdGVkIHF1ZXJ5LCBzbyBsZXQncyBzZWUgaWYgdGhlcmUncyBhIGRvdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5LmluZGV4T2YoJy4nKSA+IC0xID9cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoZXJlJ3MgYSBkb3Qgd2hpY2ggc2VwYXJhdGVzIGNoYXJhY3RlciBhbmQgdGhlIHN0YXR1c1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBxdWVyeS5zcGxpdCgnLicpO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChzZWF0SWQpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXIoKSA9PSBwYXJ0c1swXSAmJiB0aGlzLnN0YXR1cygpID09IHBhcnRzWzFdKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSBxdWVyeSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKClcblx0XHQgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdHNldCAgICAgICAgOiBmdW5jdGlvbiBzZXQoKSB7Ly9pbmhlcml0cyBzb21lIG1ldGhvZHNcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0c2VhdHMgICAgICA6IFtdLFxuXHRcdFx0XHRcdHNlYXRJZHMgICAgOiBbXSxcblx0XHRcdFx0XHRsZW5ndGggICAgIDogMCxcblx0XHRcdFx0XHRzdGF0dXMgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cyxcblx0XHRcdFx0XHRcdFx0dGhhdCA9IHRoaXM7XG5cdFx0XHRcdFx0XHQvL2lmIHRoZXJlJ3MganVzdCBvbmUgc2VhdCBpbiB0aGUgc2V0IGFuZCB1c2VyIGRpZG4ndCBwYXNzIGFueSBwYXJhbXMsIHJldHVybiBjdXJyZW50IHN0YXR1c1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMubGVuZ3RoID09IDEgJiYgYXJncy5sZW5ndGggPT0gMCA/IHRoaXMuc2VhdHNbMF0uc3RhdHVzKCkgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdC8vb3RoZXJ3aXNlIGNhbGwgc3RhdHVzIGZ1bmN0aW9uIGZvciBlYWNoIG9mIHRoZSBzZWF0cyBpbiB0aGUgc2V0XG5cdFx0XHRcdFx0XHRcdCQuZWFjaCh0aGF0LnNlYXRzLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0YXR1cy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bm9kZSAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLm5vZGUuY2FsbCh0aGlzKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVhY2ggICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5lYWNoLmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldCAgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5nZXQuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZmluZCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmZpbmQuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0ICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2V0LmNhbGwoZm4pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cHVzaCAgICAgICA6IGZ1bmN0aW9uKGlkLCBzZWF0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlYXRzLnB1c2goc2VhdCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNlYXRJZHMucHVzaChpZCk7XG5cdFx0XHRcdFx0XHQrK3RoaXMubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHQvL2dldCBvbmUgb2JqZWN0IG9yIGEgc2V0IG9mIG9iamVjdHNcblx0XHRcdGdldCAgIDogZnVuY3Rpb24oc2VhdHNJZHMpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHNlYXRzSWRzID09ICdzdHJpbmcnID8gXG5cdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdHNJZHNdIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR2YXIgc2VhdFNldCA9IGZuLnNldCgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBmbi5zZWF0c1tzZWF0SWRdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdHNlYXRTZXQucHVzaChzZWF0SWQsIGZuLnNlYXRzW3NlYXRJZF0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRTZXQ7XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0XHRyZXR1cm4gZm4uZGF0YSgnc2VhdENoYXJ0cycpO1xuXHR9XG5cdFxuXHRcbn0pKGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwic291cmNlUm9vdCI6IiJ9