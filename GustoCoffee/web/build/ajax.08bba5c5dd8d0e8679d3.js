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
                    refreshPanierIconMenu();
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

function refreshPanierIconMenu() {
    $.ajax({
        url: Routing.generate('ajax_panier_icon_menu'),
        type: "GET",
        async: true,
        success: function success(responsePanier, textStatus) {
            $('#panier-icon-menu').empty().append(responsePanier).effect("bounce", { times: 3 }, 300);
        },
        error: function error(data) {
            console.log(data);
            alert('Problème refresh Panier');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
}

/***/ }),

/***/ "./web/assets/js/ajax/ajaxChangeTunnelAchat.js":
/*!*****************************************************!*\
  !*** ./web/assets/js/ajax/ajaxChangeTunnelAchat.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// Lorsqu'on clique sur la bouton Produit #2

$(document).ready(function () {
    $.ajax({
        url: Routing.generate('ajax_panier_is_not_empty'),
        type: "GET",
        async: true,
        success: function success(response, textStatus) {
            if (response = "Success") {
                unblockAdresseTab();
            }
        },
        error: function error(data) {
            console.log(data);
            alert('Problème vérifcation de panier');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });

    // $.ajax({
    //     url: Routing.generate('allowed_validation'),
    //     type: "GET",
    //     async: true,
    //     success: function (response, textStatus) {
    //         if(response = "Success"){
    //             unblockValidationTab();
    //         }
    //     },
    //     error: function (data) {
    //         console.log(data);
    //         alert('Problème accès à la validation');
    //         //$("body").css({"opacity": "1", "background-color":"#fff"});
    //
    //     }
    // });
});

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
            $('.reservation-select-creneau').hide().fadeOut();
            $('.recherche-horaire').hide().fadeOut();
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
    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

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
            $('.reservation-select-creneau').show("slow");
            $('.recherche-horaire').show("slow");
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

// // Lorsqu'on clique sur la bouton Place #1bis
// $(document).on('click', '#tab-link-place', function(){
//     $(this).parent().tab('show');
//     var choixDebut = $('.slider-time').text();
//     var choixFin = $('.slider-time2').text();
//     var date =  $('#datepicker-altFormat').val();
//
//     //console.log(date + ' ' + choixDebut +':00');
//     //console.log(date + ' ' + choixFin +':00');
//
//     $('#slider-range .heureActuelleDefaut').val("");
//
//     that = $(this);
//
//     //$("body").css({"opacity": "0.5", "background-color":"#000"});
//     $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');
//
//     $.ajax({
//         url: Routing.generate('places_disponible'),
//         type: "POST",
//         data: {
//             "heureChoixDebut": date + ' ' + choixDebut +':00',
//             "heureChoixFin": date + ' ' + choixFin +':00',
//         },
//         async: true,
//         success: function (response, textStatus)
//         {
//             $('#display-salle').empty().append(response);
//             $('.reservation-select-creneau').show("slow");
//             $('.recherche-horaire').show("slow");
//             //$("body").css({"opacity": "1", "background-color":"#fff"});
//
//         },
//         error: function(data) {
//             console.log(data);
//             alert('Problème dans la recherche des disponibilités de places');
//             //$("body").css({"opacity": "1", "background-color":"#fff"});
//
//         }
//     });
//     return false;
//
// });

// Lorsqu'on clique sur la bouton Facturation #3
$(document).on('click', '#tab-link-facturation', function () {
    $(this).parent().tab('show');
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();

    //console.log(date + ' ' + choixDebut +':00');
    //console.log(date + ' ' + choixFin +':00');

    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

    $.ajax({
        url: Routing.generate('ajax_adresses_panier'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00'
        },
        async: true,
        success: function success(response, textStatus) {
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide("slow");
            $('.recherche-horaire').hide("slow");
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page des adresses de facturation ');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
    return false;
});

// Lorsqu'on clique sur la bouton Validation #4
$(document).on('click', '#tab-link-validation', function () {
    $(this).parent().tab('show');

    that = $(this);

    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

    $.ajax({
        url: Routing.generate('ajax_validation_panier'),
        type: "POST",
        async: true,
        success: function success(response, textStatus) {
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide("slow");
            $('.recherche-horaire').hide("slow");
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page des adresses de facturation ');
        }
    });
    return false;
});

// $('#form-valid-adresse').ajaxForm({
//     target: '#display-salle'
// });

$(document).on('submit', '#form-valid-adresse', function (e) {
    e.preventDefault();
    var url = Routing.generate('ajax_validation_panier');
    var formSerialize = $(this).serialize();

    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

    $.ajax({
        url: Routing.generate('ajax_validation_panier'),
        type: "POST",
        data: formSerialize,
        async: true,
        success: function success(response, textStatus) {
            unblockValidationTab();
            $('#tab-link-validation').parent().tab('show');
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide("slow");
            $('.recherche-horaire').hide("slow");
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page de validation');
        }
    });
    return false;
});

$(document).on('submit', '#ajaxPayment', function (e) {
    e.preventDefault();
    // var data = {};
    // data[$(this).children('input').attr('token')] = $(this).children().attr('token').val();
    // data[$(this).children('inuput').attr('totalTTC')] = $(this).children().attr('totalTTC').val();
    $.ajax({
        url: Routing.generate('ajax_paiement_commande', { id: $('.idcommande').val() }),
        type: "POST",
        data: {
            date: $('.idcommande').val(),
            token: $('.token').val(),
            totalTTC: $('.totalTTC').val(),
            prix: $('.prix').val()

        },
        async: true,
        success: function success(response, textStatus) {
            Payplug.showPayment(response);
            e.preventDefault();
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page de validation');
        }
    });
    return false;
});

$(document).on('submit', '#ajaxAddNewAdresse', function (e) {
    e.preventDefault();
    var url = Routing.generate('ajax_adresses_panier');
    var formSerialize = $(this).serialize();

    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

    $.ajax({
        url: Routing.generate('ajax_adresses_panier'),
        type: "POST",
        data: formSerialize,
        async: true,
        success: function success(response, textStatus) {
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide("slow");
            $('.recherche-horaire').hide("slow");
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans d\'acces à lajout de ladresse');
        }
    });
    return false;
});

$(document).on('click', 'button.validPanier', function () {
    valideAjaxPanier();
});

function valideAjaxPanier() {
    $(this).parent().tab('show');

    that = $(this);

    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

    $.ajax({
        url: Routing.generate('ajax_adresses_panier'),
        type: "POST",
        async: true,
        success: function success(response, textStatus) {
            unblockAdresseTab();
            $('#tab-link-facturation').parent().tab('show');
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide("slow");
            $('.recherche-horaire').hide("slow");
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page des adresses de facturation ');
        }
    });
    return false;
}

function unblockAdresseTab() {
    $('#tab-link-facturation').removeClass('grayForbiddenLink');
    $('#tab-link-facturation > span').removeClass('grayForbidden');
}

function unblockValidationTab() {
    $('#tab-link-validation').removeClass('grayForbiddenLink');
    $('#tab-link-validation > span').removeClass('grayForbidden');
}

function unblockPaymentTab() {
    $('#tab-link-paiement').removeClass('grayForbiddenLink');
    $('#tab-link-paiement > span').removeClass('grayForbidden');
}

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

/***/ "./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js":
/*!*******************************************************!*\
  !*** ./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

$(document).on('click', 'button.buttonSearchPlace', function () {

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();

    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('places_disponible'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00'
        },
        async: true,
        success: function success(response, textStatus) {

            //initCarteInteractive(response);
            $('#display-salle').empty().append(response);
            $(this).getMap();
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de places');
        }
    });
    return false;
});

/***/ }),

/***/ "./web/assets/js/ajax/ajaxChoixPlace.js":
/*!**********************************************!*\
  !*** ./web/assets/js/ajax/ajaxChoixPlace.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// Ajout d'une salle en ajax au click du bouton Choisir Salle
$(document).on('click', 'div.seatCharts-seat.seatCharts-cell', function () {

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();

    var idPlace = $(this).attr('id');
    var date = $('#datepicker-altFormat').val();

    that = $(this);

    $('#display-salle').append().load('/assets/loader.html').fadeIn();
    $('#tab-link-produit').parent().tab('show');

    // 1- On vérifie la disponbilité de la salle
    $.ajax({
        url: Routing.generate('places_disponible_ajax'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00',
            "idPlace": idPlace,
            "date": date
        },
        success: function success(isDispo, textStatus) {
            if (isDispo = '1') {
                //2- On ajoute la salle choisi dans session du panier
                $.ajax({
                    url: Routing.generate('ajout_panier_place'),
                    type: "POST",
                    data: {
                        "heureChoixDebut": date + ' ' + choixDebut + ':00',
                        "heureChoixFin": date + ' ' + choixFin + ':00',
                        "id": idPlace,
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
                                    refreshPanierIconMenu();
                                    unblockAdresseTab();
                                    // 4- On charge la vue des produits ajax
                                    $.ajax({
                                        url: Routing.generate('produits_ajax'),
                                        type: "GET",
                                        async: true,
                                        success: function success(responseProduits, textStatus) {
                                            $('#display-salle').empty().append(responseProduits);
                                            $('.reservation-select-creneau').hide().fadeOut();
                                            $('.recherche-horaire').hide().fadeOut();
                                        },
                                        // 4-
                                        error: function error(data) {
                                            console.log(data);
                                            alert('Problème récupération des produtis');
                                        }
                                    });
                                } else {
                                    alert('La place n\'est plus disponible');
                                }
                            },
                            // 3-
                            error: function error(data) {
                                console.log(data);
                                alert('Problème ajout de la place choisi');
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

function unblockAdresseTab() {
    $('#tab-link-facturation').removeClass('grayForbiddenLink');
    $('#tab-link-facturation > span').removeClass('grayForbidden');
}

function unblockValidationTab() {
    $('#tab-link-validation').removeClass('grayForbiddenLink');
    $('#tab-link-validation > span').removeClass('grayForbidden');
}

function refreshPanierIconMenu() {
    $.ajax({
        url: Routing.generate('ajax_panier_icon_menu'),
        type: "GET",
        async: true,
        success: function success(responsePanier, textStatus) {
            $('#panier-icon-menu').empty().append(responsePanier).effect("bounce", { times: 3 }, 300);
        },
        error: function error(data) {
            console.log(data);
            alert('Problème refresh Panier');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
}

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
                                    refreshPanierIconMenu();
                                    unblockAdresseTab();
                                    // 4- On charge la vue des produits ajax
                                    $.ajax({
                                        url: Routing.generate('produits_ajax'),
                                        type: "GET",
                                        async: true,
                                        success: function success(responseProduits, textStatus) {
                                            $('#display-salle').empty().append(responseProduits);
                                            $('.reservation-select-creneau').hide().fadeOut();
                                            $('.recherche-horaire').hide().fadeOut();
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

function unblockAdresseTab() {
    $('#tab-link-facturation').removeClass('grayForbiddenLink');
    $('#tab-link-facturation > span').removeClass('grayForbidden');
}

function unblockValidationTab() {
    $('#tab-link-validation').removeClass('grayForbiddenLink');
    $('#tab-link-validation > span').removeClass('grayForbidden');
}

$(document).on('slidestop', '#slider-range', function (event, ui) {

    ajaxRechercheSalles();
});

function refreshPanierIconMenu() {
    $.ajax({
        url: Routing.generate('ajax_panier_icon_menu'),
        type: "GET",
        async: true,
        success: function success(responsePanier, textStatus) {
            $('#panier-icon-menu').empty().append(responsePanier).effect("bounce", { times: 3 }, 300);
        },
        error: function error(data) {
            console.log(data);
            alert('Problème refresh Panier');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
}

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

    if ($('#tab-link-place').length) $url = 'places_disponible';else $url = 'salles_disponible';
    $.ajax({
        url: Routing.generate($url),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00'
        },
        async: true,
        success: function success(response, textStatus) {

            $('#display-salle').empty().append(response);
            //$("body").css({"opacity": "1", "background-color":"#fff"});
            if ($('#tab-link-place').length) {
                $(this).getMap();
            }
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
            refreshPanierIconMenu();
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
            refreshPanierIconMenu();
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
});

// // Suppression d'une place depuis le Panier Ajax
// $(document).on('click', '.buttonDeletePlace', function(){
//     $.ajax({
//         url: Routing.generate('ajax_delete_panier_place'),
//         type: "POST",
//         data: {
//             "idplace": $(this).val()
//         },
//         async: true,
//         success: function (responsePanier, textStatus) {
//             $.ajax({
//                 url: Routing.generate('panier_ajax'),
//                 type: "POST",
//                 async: true,
//                 success: function (responsePanier, textStatus)
//                 {
//
//                     $('.row.panier-menu').empty().append(responsePanier);
//
//                 },
//                 error: function(data) {
//                     console.log(data);
//                     alert('Problème refresh Panier');
//
//                 }
//             });
//             refreshPanierIconMenu();
//
//         },
//         error: function (data) {
//             console.log(data);
//             alert('Problème dans la recherche des disponibilités de places');
//
//         }
//     });
// });


// Suppression d'une place depuis le Panier Ajax
$(document).on('click', '.buttonDeletePlace', function () {
    $.ajax({
        url: Routing.generate('ajax_delete_panier_place'),
        type: "POST",
        data: {
            "idplace": $(this).val()
        },
        async: true,
        success: function success(responsePanier, textStatus) {
            $.ajax({
                url: Routing.generate('panier_ajax'),
                type: "POST",
                async: true,
                success: function success(responsePanier, textStatus) {

                    $('.row.panier-menu').empty().append(responsePanier);
                    $(this).sc_global.status(String($(this).val()), 'available');
                },
                error: function error(data) {
                    console.log(data);
                    alert('Problème refresh Panier');
                }
            });
            refreshPanierIconMenu();
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de places');
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
            refreshPanierIconMenu();
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
});
// $(document).on('change', '.row.panier-menu', function() {
//     refreshPanierIconMenu()
// });


function refreshPanierIconMenu() {
    $.ajax({
        url: Routing.generate('ajax_panier_icon_menu'),
        type: "GET",
        async: true,
        success: function success(responsePanier, textStatus) {
            $('#panier-icon-menu').empty().append(responsePanier).effect("bounce", { times: 3 }, 300);
        },
        error: function error(data) {
            console.log(data);
            alert('Problème refresh Panier');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
}

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

/***/ "./web/assets/js/ajax/ajaxVilles.js":
/*!******************************************!*\
  !*** ./web/assets/js/ajax/ajaxVilles.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

$('#display-salle').on('keyup', '.cp', function (ev) {
    console.log('keyup');
    if ($(this).val().length === 5) {
        $.ajax({
            type: 'GET',
            url: Routing.generate('villes', { cp: $(this).val() }),

            beforeSend: function beforeSend() {
                if ($(".loading-ville").length == 0) {
                    $("form .ville").parent().append('<div class="loading-ville"></div>');
                }
                $(".ville option").remove();
            },
            success: function success(data) {
                $.each(data.ville, function (index, value) {
                    $(".ville").append($('<option>', { value: value, text: value }));
                });
                $(".loading-ville").remove();
            }
        });
    } else {
        $(".ville").val('');
    }
});

$(".cp").keyup(function () {
    console.log('keyup');
    if ($(this).val().length === 5) {
        $.ajax({
            type: 'GET',
            url: Routing.generate('villes', { cp: $(this).val() }),

            beforeSend: function beforeSend() {
                if ($(".loading-ville").length == 0) {
                    $("form .ville").parent().append('<div class="loading-ville"></div>');
                }
                $(".ville option").remove();
            },
            success: function success(data) {
                $.each(data.ville, function (index, value) {
                    $(".ville").append($('<option>', { value: value, text: value }));
                });
                $(".loading-ville").remove();
            }
        });
    } else {
        $(".ville").val('');
    }
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
var sc_global = [];

(function ($) {
    function initCarteInteractive(map) {
        var $cart = $('#selected-seats'),
            $counter = $('#counter'),
            $total = $('#total'),
            sc = $('#seat-map').seatCharts({
            map: $.parseJSON(map),

            seats: {
                n: {
                    price: 5,
                    classes: 'first-class', //your custom CSS class
                    category: 'Place VIP'
                },
                p: {
                    price: 5,
                    classes: 'economy-class', //your custom CSS class
                    category: 'Place'
                },
                f: {
                    price: 0,
                    classes: 'economy-class unavailable',
                    category: 'Place'
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
                    $('<li>' + this.data().category + ' Place # ' + this.settings.label + ': <b>€' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[annuler]</a></li>').attr('id', 'cart-item-' + this.settings.id).data('seatId', this.settings.id).appendTo($cart);

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

        /** On refresh en live automatiquement les places toutes les minutes en fonction du créneau selectionné **/
        var choixDebut = $('.slider-time').text();
        var choixFin = $('.slider-time2').text();
        var idPlace = $(this).attr('id');
        var date = $('#datepicker-altFormat').val();
        setInterval(function () {
            $.ajax({
                url: Routing.generate('ajax_places_unavailable'),

                type: "POST",
                data: {
                    "heureChoixDebut": date + ' ' + choixDebut + ':00',
                    "heureChoixFin": date + ' ' + choixFin + ':00',
                    "idPlace": idPlace,
                    "date": date
                },
                dataType: 'json',
                success: function success(response) {
                    //iterate through all bookings for our event
                    $.each(response, function (index, place) {
                        //console.log(place.idplace);
                        //find seat by id and set its status to unavailable
                        sc.status(String(place.idplace), 'unavailable');
                    });
                }
            });
        }, 60000); //every 60 seconds
        //let's pretend some seats have already been booked
        //sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
        return sc;
    }

    $.fn.sc_global = [];

    $.fn.getMap = function () {
        var choixDebut = $('.slider-time').text();
        var choixFin = $('.slider-time2').text();
        var date = $('#datepicker-altFormat').val();
        //$('#display-salle').append().load('/assets/loader.html').fadeIn();
        $.ajax({
            url: Routing.generate('ajax_places_map'),
            type: "POST",
            data: {
                "heureChoixDebut": date + ' ' + choixDebut + ':00',
                "heureChoixFin": date + ' ' + choixFin + ':00'
            },
            async: true,
            success: function success(map, textStatus) {
                sc_global = initCarteInteractive(map);
                //$("body").css({"opacity": "1", "background-color":"#fff"});
            },
            error: function error(data) {
                console.log(data);
                alert('Problème initialisation des places');
                //$("body").css({"opacity": "1", "background-color":"#fff"});
            }
        });
    };

    function recalculateTotal(sc) {
        var total = 0;

        //basically find every selected seat and sum its price
        sc.find('selected').each(function () {
            total += this.data().price;
        });

        return total;
    }
})(jQuery);

function getMap() {
    //$('#display-salle').append().load('/assets/loader.html').fadeIn();
    $.ajax({
        url: Routing.generate('ajax_places_map'),
        type: "GET",
        async: true,
        success: function success(map, textStatus) {
            sc_global = initCarteInteractive(map);
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème initialisation des places');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
}
$(document).ready(function () {

    if ($('#seat-map').length && $('#selected-seats').length) {

        //$('#display-salle').append().load('/assets/loader.html').fadeIn();
        $.ajax({
            url: Routing.generate('ajax_places_map'),
            type: "GET",
            async: true,
            success: function success(map, textStatus) {
                initCarteInteractive(map);
                //$("body").css({"opacity": "1", "background-color":"#fff"});
            },
            error: function error(data) {
                console.log(data);
                alert('Problème initialisation des places');
                //$("body").css({"opacity": "1", "background-color":"#fff"});
            }
        });
    }
});

function initCarteInteractive(map) {
    var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total'),
        sc = $('#seat-map').seatCharts({
        map: $.parseJSON(map),

        seats: {
            n: {
                price: 5,
                classes: 'first-class', //your custom CSS class
                category: 'Place VIP'
            },
            p: {
                price: 5,
                classes: 'economy-class', //your custom CSS class
                category: 'Place'
            },
            f: {
                price: 0,
                classes: 'economy-class unavailable',
                category: 'Place'
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
                $('<li>' + this.data().category + ' Place # ' + this.settings.label + ': <b>€' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[annuler]</a></li>').attr('id', 'cart-item-' + this.settings.id).data('seatId', this.settings.id).appendTo($cart);

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

    /** On refresh en live automatiquement les places toutes les minutes en fonction du créneau selectionné **/
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();

    setInterval(function () {
        $.ajax({
            url: Routing.generate('ajax_places_unavailable'),

            type: "POST",
            data: {
                "heureChoixDebut": date + ' ' + choixDebut + ':00',
                "heureChoixFin": date + ' ' + choixFin + ':00'

            },
            dataType: 'json',
            success: function success(response) {
                //iterate through all bookings for our event
                $.each(response, function (index, place) {
                    //console.log(place.idplace);
                    //find seat by id and set its status to unavailable
                    sc.status(String(place.idplace), 'unavailable');
                });
            }
        });
    }, 60000); //every 60 seconds
    //let's pretend some seats have already been booked
    //sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
    return sc;
}

function recalculateTotal(sc) {
    var total = 0;

    //basically find every selected seat and sum its price
    sc.find('selected').each(function () {
        total += this.data().price;
    });

    return total;
}

// Lorsqu'on clique sur la bouton Place #1bis
$(document).on('click', '#tab-link-place', function () {
    $(this).parent().tab('show');
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date = $('#datepicker-altFormat').val();

    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

    $.ajax({
        url: Routing.generate('places_disponible'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut + ':00',
            "heureChoixFin": date + ' ' + choixFin + ':00'
        },
        async: true,
        success: function success(response, textStatus) {
            getMap();
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').show("slow");
            $('.recherche-horaire').show("slow");
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de places');
            //$("body").css({"opacity": "1", "background-color":"#fff"});
        }
    });
    return false;
});

// // Suppression d'une place depuis le Panier Ajax
// $(document).on('click', '.buttonDeletePlace', function(){
//     $.ajax({
//         url: Routing.generate('ajax_delete_panier_place'),
//         type: "POST",
//         data: {
//             "idplace": $(this).val()
//         },
//         async: true,
//         success: function (responsePanier, textStatus) {
//             $.ajax({
//                 url: Routing.generate('panier_ajax'),
//                 type: "POST",
//                 async: true,
//                 success: function (responsePanier, textStatus)
//                 {
//
//                     $('.row.panier-menu').empty().append(responsePanier);
//                     sc_global.status(String($(this).val()), 'available');
//
//                 },
//                 error: function(data) {
//                     console.log(data);
//                     alert('Problème refresh Panier');
//
//                 }
//             });
//             refreshPanierIconMenu();
//
//         },
//         error: function (data) {
//             console.log(data);
//             alert('Problème dans la recherche des disponibilités de places');
//
//         }
//     });
// });

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
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/ajax/ajaxCheckDispoDate.js ./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js ./web/assets/js/ajax/ajaxChoixSalle.js ./web/assets/js/ajax/ajaxChoixPlace.js ./web/assets/js/ajax/ajaxAjoutProduitPanier.js ./web/assets/js/ajax/ajaxPanier.js ./web/assets/js/ajax/ajaxChangeTunnelAchat.js ./web/assets/js/places/jquery.seat-charts.js ./web/assets/js/places/ajaxGestionPlaces.js ./web/assets/js/ajax/ajaxVilles.js ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/ajax/ajaxCheckDispoDate.js */"./web/assets/js/ajax/ajaxCheckDispoDate.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js */"./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChoixSalle.js */"./web/assets/js/ajax/ajaxChoixSalle.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChoixPlace.js */"./web/assets/js/ajax/ajaxChoixPlace.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxAjoutProduitPanier.js */"./web/assets/js/ajax/ajaxAjoutProduitPanier.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxPanier.js */"./web/assets/js/ajax/ajaxPanier.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChangeTunnelAchat.js */"./web/assets/js/ajax/ajaxChangeTunnelAchat.js");
__webpack_require__(/*! ./web/assets/js/places/jquery.seat-charts.js */"./web/assets/js/places/jquery.seat-charts.js");
__webpack_require__(/*! ./web/assets/js/places/ajaxGestionPlaces.js */"./web/assets/js/places/ajaxGestionPlaces.js");
module.exports = __webpack_require__(/*! ./web/assets/js/ajax/ajaxVilles.js */"./web/assets/js/ajax/ajaxVilles.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTA0OTU2MmQzMzI4NmNiZTY0MGYiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tQbGFjZURpc3BvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENob2l4UGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4UGFuaWVyLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4VmlsbGVzLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJvbiIsImFqYXgiLCJ1cmwiLCJSb3V0aW5nIiwiZ2VuZXJhdGUiLCJ0eXBlIiwiZGF0YSIsInZhbCIsImFzeW5jIiwic3VjY2VzcyIsInJlc3BvbnNlUGFuaWVyIiwidGV4dFN0YXR1cyIsImVtcHR5IiwiYXBwZW5kIiwicmVmcmVzaFBhbmllckljb25NZW51IiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiYWxlcnQiLCJlZmZlY3QiLCJ0aW1lcyIsInJlYWR5IiwicmVzcG9uc2UiLCJ1bmJsb2NrQWRyZXNzZVRhYiIsInRoYXQiLCJsb2FkIiwiZmFkZUluIiwicmVzcG9uc2VQcm9kdWl0cyIsImhpZGUiLCJmYWRlT3V0IiwicGFyZW50IiwidGFiIiwiY2hvaXhEZWJ1dCIsInRleHQiLCJjaG9peEZpbiIsImRhdGUiLCJzaG93IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybVNlcmlhbGl6ZSIsInNlcmlhbGl6ZSIsInVuYmxvY2tWYWxpZGF0aW9uVGFiIiwiaWQiLCJ0b2tlbiIsInRvdGFsVFRDIiwicHJpeCIsIlBheXBsdWciLCJzaG93UGF5bWVudCIsInZhbGlkZUFqYXhQYW5pZXIiLCJyZW1vdmVDbGFzcyIsInVuYmxvY2tQYXltZW50VGFiIiwiZ2V0TWFwIiwiaWRQbGFjZSIsImF0dHIiLCJpc0Rpc3BvIiwiaWRTYWxsZSIsImV2ZW50IiwidWkiLCJhamF4UmVjaGVyY2hlU2FsbGVzIiwibGVuZ3RoIiwiJHVybCIsInNjX2dsb2JhbCIsInN0YXR1cyIsIlN0cmluZyIsImZpbmQiLCJ2YWx1ZSIsInJlZnJlc2hQYW5pZXIiLCJldiIsImNwIiwiYmVmb3JlU2VuZCIsInJlbW92ZSIsImVhY2giLCJ2aWxsZSIsImluZGV4Iiwia2V5dXAiLCJmaXJzdFNlYXRMYWJlbCIsImluaXRDYXJ0ZUludGVyYWN0aXZlIiwibWFwIiwiJGNhcnQiLCIkY291bnRlciIsIiR0b3RhbCIsInNjIiwic2VhdENoYXJ0cyIsInBhcnNlSlNPTiIsInNlYXRzIiwibiIsInByaWNlIiwiY2xhc3NlcyIsImNhdGVnb3J5IiwicCIsImYiLCJuYW1pbmciLCJ0b3AiLCJnZXRMYWJlbCIsImNoYXJhY3RlciIsInJvdyIsImNvbHVtbiIsImxlZ2VuZCIsIm5vZGUiLCJpdGVtcyIsImNsaWNrIiwic2V0dGluZ3MiLCJsYWJlbCIsImFwcGVuZFRvIiwicmVjYWxjdWxhdGVUb3RhbCIsInN0eWxlIiwiZ2V0IiwicGFyZW50cyIsInNldEludGVydmFsIiwiZGF0YVR5cGUiLCJwbGFjZSIsImlkcGxhY2UiLCJmbiIsInRvdGFsIiwialF1ZXJ5Iiwic2V0dXAiLCJzZWF0SWRzIiwiYW5pbWF0ZSIsImxlZnQiLCJnZXRJZCIsImZvY3VzIiwiYmx1ciIsInNlYXQiLCJzZWF0Q2hhcnRzU2V0dGluZ3MiLCJleHRlbmQiLCIkbm9kZSIsInJvbGUiLCJmb2N1c2FibGUiLCJ0YWJJbmRleCIsImFkZENsYXNzIiwiY29uY2F0Iiwiam9pbiIsImNoYXIiLCJhcmd1bWVudHMiLCJuZXdTdHlsZSIsIm9sZFN0eWxlIiwic3dpdGNoQ2xhc3MiLCJzZWF0U2V0dGluZ3MiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImFwcGx5IiwiJHNlYXQiLCIkbmV3U2VhdCIsIndoaWNoIiwiZmluZEF2YWlsYWJsZSIsIiRyb3dzIiwiJHNlYXRzIiwiJGN1cnJlbnRSb3ciLCIkbmV3Um93IiwibGFzdCIsImZpcnN0IiwiZXEiLCJoYXNDbGFzcyIsInJvd3MiLCJpIiwicHVzaCIsImNvbHVtbnMiLCJzcGxpdCIsIiRoZWFkZXJSb3ciLCJjaGFyYWN0ZXJzIiwiJHJvdyIsIm1hdGNoIiwiY2hhcmFjdGVyUGFyYW1zIiwibWF0Y2hlcyIsInBhcmFtcyIsIm92ZXJyaWRlSWQiLCJvdmVycmlkZUxhYmVsIiwiJGNvbnRhaW5lciIsImluc2VydEFmdGVyIiwiJHVsIiwiaXRlbSIsInNlYXRzSWRzIiwibmV3U3RhdHVzIiwic2VhdElkIiwiY2FsbCIsInF1ZXJ5Iiwic2VhdFNldCIsInNldCIsIlJlZ0V4cCIsImluZGV4T2YiLCJwYXJ0cyIsImFyZ3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFl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QVFyQixJQUFSLENBQWFrQixNQUFiLEVBQXFCN0QsR0FBRzVCLEtBQUgsQ0FBU3lGLE1BQVQsQ0FBckI7QUFDQTtBQUNELE1BSkQ7O0FBTUEsWUFBT0csT0FBUDtBQUNBLEtBWG9CLEVBRHRCO0FBYUE7QUEvSW9CLEdBQXRCOztBQWtKQSxTQUFPaEUsR0FBRzFHLElBQUgsQ0FBUSxZQUFSLENBQVA7QUFDQSxFQW5tQkQ7QUFzbUJBLENBMW1CRCxFQTBtQkc0RyxNQTFtQkgsRSIsImZpbGUiOiJhamF4LjA4YmJhNWM1ZGQ4ZDBlODY3OWQzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDUwNDk1NjJkMzMyODZjYmU2NDBmIiwiICAgIC8vIEFqb3V0IGQndW4gcHJvZHVpdCBhdSBwYW5pZXIgYWpheFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uQWRkUHJvZHVjdFBhbmllcicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWpvdXRfcHJvZHVpdF9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyKSB7XG4gICAgICAgICAgICAgICAgLy8gUmFmcmFpY2hpc3NlbWVudCBkdSBwYW5pZXIgYWpheFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3Bhbmllcl9pY29uX21lbnUnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkKCcjcGFuaWVyLWljb24tbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKS5lZmZlY3QoIFwiYm91bmNlXCIsIHt0aW1lczozfSwgMzAwICk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheEFqb3V0UHJvZHVpdFBhbmllci5qcyIsIi8vIExvcnNxdSdvbiBjbGlxdWUgc3VyIGxhIGJvdXRvbiBQcm9kdWl0ICMyXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9wYW5pZXJfaXNfbm90X2VtcHR5JyksXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlID0gXCJTdWNjZXNzXCIpe1xuICAgICAgICAgICAgICAgIHVuYmxvY2tBZHJlc3NlVGFiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHbDqXJpZmNhdGlvbiBkZSBwYW5pZXInKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gJC5hamF4KHtcbiAgICAvLyAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhbGxvd2VkX3ZhbGlkYXRpb24nKSxcbiAgICAvLyAgICAgdHlwZTogXCJHRVRcIixcbiAgICAvLyAgICAgYXN5bmM6IHRydWUsXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgIC8vICAgICAgICAgaWYocmVzcG9uc2UgPSBcIlN1Y2Nlc3NcIil7XG4gICAgLy8gICAgICAgICAgICAgdW5ibG9ja1ZhbGlkYXRpb25UYWIoKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvLyAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWNjw6hzIMOgIGxhIHZhbGlkYXRpb24nKTtcbiAgICAvLyAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG4gICAgLy9cbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstcHJvZHVpdCcsIGZ1bmN0aW9uKCl7XG5cbiAgICAvLyB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICAvLyB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIC8vIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIC8vIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAvLyAkLmdldChSb3V0aW5nLmdlbmVyYXRlKCcnKSwgZnVuY3Rpb24oaHRtbCl7XG4gICAgICAgICAgICAvLyAgICAgJCgnI2Rpc3BsYXktcGFuaWVyJykuZW1wdHkoKS5odG1sKGh0bWwpO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByw6ljdXDDqXJhdGlvbiBkZXMgcHJvZHV0aXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIFNhbGxlICMxXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXNhbGxlJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLnNob3coXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuc2hvdyhcInNsb3dcIik7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbi8vIC8vIExvcnNxdSdvbiBjbGlxdWUgc3VyIGxhIGJvdXRvbiBQbGFjZSAjMWJpc1xuLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1wbGFjZScsIGZ1bmN0aW9uKCl7XG4vLyAgICAgJCh0aGlzKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbi8vICAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbi8vICAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuLy8gICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuLy9cbi8vICAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4vLyAgICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcbi8vXG4vLyAgICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbi8vXG4vLyAgICAgdGhhdCA9ICQodGhpcyk7XG4vL1xuLy8gICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbi8vICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcbi8vXG4vLyAgICAgJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwbGFjZXNfZGlzcG9uaWJsZScpLFxuLy8gICAgICAgICB0eXBlOiBcIlBPU1RcIixcbi8vICAgICAgICAgZGF0YToge1xuLy8gICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuLy8gICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGFzeW5jOiB0cnVlLFxuLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1Jykuc2hvdyhcInNsb3dcIik7XG4vLyAgICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5zaG93KFwic2xvd1wiKTtcbi8vICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG4vL1xuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgcGxhY2VzJyk7XG4vLyAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuLy9cbi8vICAgICAgICAgfVxuLy8gICAgIH0pO1xuLy8gICAgIHJldHVybiBmYWxzZTtcbi8vXG4vLyB9KTtcblxuLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIEZhY3R1cmF0aW9uICMzXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLWZhY3R1cmF0aW9uJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9hZHJlc3Nlc19wYW5pZXInKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZShcInNsb3dcIik7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZXMgYWRyZXNzZXMgZGUgZmFjdHVyYXRpb24gJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG59KTtcblxuXG4vLyBMb3JzcXUnb24gY2xpcXVlIHN1ciBsYSBib3V0b24gVmFsaWRhdGlvbiAjNFxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay12YWxpZGF0aW9uJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF92YWxpZGF0aW9uX3BhbmllcicpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKFwic2xvd1wiKTtcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoXCJzbG93XCIpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZXMgYWRyZXNzZXMgZGUgZmFjdHVyYXRpb24gJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbi8vICQoJyNmb3JtLXZhbGlkLWFkcmVzc2UnKS5hamF4Rm9ybSh7XG4vLyAgICAgdGFyZ2V0OiAnI2Rpc3BsYXktc2FsbGUnXG4vLyB9KTtcblxuJChkb2N1bWVudCkub24oJ3N1Ym1pdCcsICcjZm9ybS12YWxpZC1hZHJlc3NlJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdXJsID0gUm91dGluZy5nZW5lcmF0ZSgnYWpheF92YWxpZGF0aW9uX3BhbmllcicpO1xuICAgIHZhciBmb3JtU2VyaWFsaXplID0gJCh0aGlzKS5zZXJpYWxpemUoKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3ZhbGlkYXRpb25fcGFuaWVyJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBmb3JtU2VyaWFsaXplLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICB1bmJsb2NrVmFsaWRhdGlvblRhYigpO1xuICAgICAgICAgICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24nKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZShcInNsb3dcIilcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoXCJzbG93XCIpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZSB2YWxpZGF0aW9uJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc3VibWl0JywgJyNhamF4UGF5bWVudCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdmFyIGRhdGEgPSB7fTtcbiAgICAvLyBkYXRhWyQodGhpcykuY2hpbGRyZW4oJ2lucHV0JykuYXR0cigndG9rZW4nKV0gPSAkKHRoaXMpLmNoaWxkcmVuKCkuYXR0cigndG9rZW4nKS52YWwoKTtcbiAgICAvLyBkYXRhWyQodGhpcykuY2hpbGRyZW4oJ2ludXB1dCcpLmF0dHIoJ3RvdGFsVFRDJyldID0gJCh0aGlzKS5jaGlsZHJlbigpLmF0dHIoJ3RvdGFsVFRDJykudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BhaWVtZW50X2NvbW1hbmRlJywge2lkOiAgJCgnLmlkY29tbWFuZGUnKS52YWwoKX0pLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0ZTogJCgnLmlkY29tbWFuZGUnKS52YWwoKSxcbiAgICAgICAgICAgIHRva2VuOiAkKCcudG9rZW4nKS52YWwoKSxcbiAgICAgICAgICAgIHRvdGFsVFRDOiAkKCcudG90YWxUVEMnKS52YWwoKSxcbiAgICAgICAgICAgIHByaXg6ICQoJy5wcml4JykudmFsKCksXG5cbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgUGF5cGx1Zy5zaG93UGF5bWVudChyZXNwb25zZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZSB2YWxpZGF0aW9uJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc3VibWl0JywgJyNhamF4QWRkTmV3QWRyZXNzZScsICBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1cmwgPSBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2FkcmVzc2VzX3BhbmllcicpO1xuICAgIHZhciBmb3JtU2VyaWFsaXplID0gJCh0aGlzKS5zZXJpYWxpemUoKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWRyZXNzZXNfcGFuaWVyJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBmb3JtU2VyaWFsaXplLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZShcInNsb3dcIik7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGRcXCdhY2NlcyDDoCBsYWpvdXQgZGUgbGFkcmVzc2UnKTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24udmFsaWRQYW5pZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFsaWRlQWpheFBhbmllcigpO1xufSk7XG5cbmZ1bmN0aW9uIHZhbGlkZUFqYXhQYW5pZXIoKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9hZHJlc3Nlc19wYW5pZXInKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVuYmxvY2tBZHJlc3NlVGFiKCk7XG4gICAgICAgICAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24nKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZShcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKFwic2xvd1wiKTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgZFxcJ2FjY2VzIMOgIGxhIHBhZ2UgZGVzIGFkcmVzc2VzIGRlIGZhY3R1cmF0aW9uICcpO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2tBZHJlc3NlVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW5MaW5rJyk7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uID4gc3BhbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2tWYWxpZGF0aW9uVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstdmFsaWRhdGlvbiA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrUGF5bWVudFRhYigpe1xuICAgICQoJyN0YWItbGluay1wYWllbWVudCcpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuTGluaycpO1xuICAgICQoJyN0YWItbGluay1wYWllbWVudCA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hhbmdlVHVubmVsQWNoYXQuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ1dHRvblNlYXJjaCcsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tEaXNwb0RhdGUuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ1dHRvblNlYXJjaFBsYWNlJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3BsYWNlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuXG4gICAgICAgICAgICAvL2luaXRDYXJ0ZUludGVyYWN0aXZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCh0aGlzKS5nZXRNYXAoKTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgcGxhY2VzJyk7XG5cblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGVja1BsYWNlRGlzcG9EYXRlLmpzIiwiLy8gQWpvdXQgZCd1bmUgc2FsbGUgZW4gYWpheCBhdSBjbGljayBkdSBib3V0b24gQ2hvaXNpciBTYWxsZVxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2Rpdi5zZWF0Q2hhcnRzLXNlYXQuc2VhdENoYXJ0cy1jZWxsJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG5cbiAgICB2YXIgaWRQbGFjZSA9ICQodGhpcykuYXR0cignaWQnKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG4gICAgJCgnI3RhYi1saW5rLXByb2R1aXQnKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcblxuICAgIC8vIDEtIE9uIHbDqXJpZmllIGxhIGRpc3BvbmJpbGl0w6kgZGUgbGEgc2FsbGVcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3BsYWNlc19kaXNwb25pYmxlX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgXCJpZFBsYWNlXCIgOiBpZFBsYWNlLFxuICAgICAgICAgICAgXCJkYXRlXCI6IGRhdGVcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGlzRGlzcG8sIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAvLzItIE9uIGFqb3V0ZSBsYSBzYWxsZSBjaG9pc2kgZGFucyBzZXNzaW9uIGR1IHBhbmllclxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpvdXRfcGFuaWVyX3BsYWNlJyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IGlkUGxhY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogZGF0ZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOsOgIG1ldHRyZSBlbiBwYXJhbGzDqGxlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMtIE9uIG1ldHMgw6Agam91ciBsZSBwYW5pZXIgYWpheFxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNEaXNwbyA9ICcxJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5ibG9ja0FkcmVzc2VUYWIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQtIE9uIGNoYXJnZSBsYSB2dWUgZGVzIHByb2R1aXRzIGFqYXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCkuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCkuZmFkZU91dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByw6ljdXDDqXJhdGlvbiBkZXMgcHJvZHV0aXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnTGEgcGxhY2UgblxcJ2VzdCBwbHVzIGRpc3BvbmlibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBkZSBsYSBwbGFjZSBjaG9pc2knKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyAyLVxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IHNhbGxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gMS1cbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBsb3JzIGRlIGxhIHbDqXJpZmljYXRpb24gZGUgbGEgZGlzcG9uaWJpbGl0w6kgZGUgbGEgc2FsbGUgbsKwJysgaWRTYWxsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbmZ1bmN0aW9uIHVuYmxvY2tBZHJlc3NlVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW5MaW5rJyk7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uID4gc3BhbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2tWYWxpZGF0aW9uVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstdmFsaWRhdGlvbiA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG5mdW5jdGlvbiByZWZyZXNoUGFuaWVySWNvbk1lbnUoKXtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGFuaWVyX2ljb25fbWVudScpLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjcGFuaWVyLWljb24tbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKS5lZmZlY3QoIFwiYm91bmNlXCIsIHt0aW1lczozfSwgMzAwICk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhQbGFjZS5qcyIsIi8vIEFqb3V0IGQndW5lIHNhbGxlIGVuIGFqYXggYXUgY2xpY2sgZHUgYm91dG9uIENob2lzaXIgU2FsbGVcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnRuLXN1Y2Nlc3MuYnV0dG9uQWRkU2FsbGUnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICAvLyB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIC8vIHZhciBkYXRlRHVKb3VyID0gYXJyVGltZVsyXTtcbiAgICB2YXIgaWRTYWxsZSA9ICQodGhpcykudmFsKCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgY29uc29sZS5sb2coJ2RhdGUgYWx0Rm9ybWF0JyArIGRhdGUpO1xuXG5cbiAgICAvL2NvbnNvbGUubG9nKGlkU2FsbGUgKyAnaWRzYWxsZScpO1xuICAgLy8gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuICAgICQoJyN0YWItbGluay1wcm9kdWl0JykucGFyZW50KCkudGFiKCdzaG93Jyk7XG5cbiAgICAvLyAxLSBPbiB2w6lyaWZpZSBsYSBkaXNwb25iaWxpdMOpIGRlIGxhIHNhbGxlXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZV9hamF4JyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgIFwiaWRTYWxsZVwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgIFwiZGF0ZVwiOiBkYXRlXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChpc0Rpc3BvLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihpc0Rpc3BvID0gJzEnKSB7XG4gICAgICAgICAgICAgICAgLy8yLSBPbiBham91dGUgbGEgc2FsbGUgY2hvaXNpIGRhbnMgc2Vzc2lvbiBkdSBwYW5pZXJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2Fqb3V0X3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCIgOiBpZFNhbGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IGRhdGVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzrDoCBtZXR0cmUgZW4gcGFyYWxsw6hsZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzLSBPbiBtZXRzIMOgIGpvdXIgbGUgcGFuaWVyIGFqYXhcbiAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuYmxvY2tBZHJlc3NlVGFiKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LSBPbiBjaGFyZ2UgbGEgdnVlIGRlcyBwcm9kdWl0cyBhamF4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncHJvZHVpdHNfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUHJvZHVpdHMsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZSgpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpLmZhZGVPdXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gNC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0xhIHNhbGxlIG5cXCdlc3QgcGx1cyBkaXNwb25pYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgZGUgbGEgc2FsbGUgY2hvaXNpJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gMi1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBzYWxsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIDEtXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgbG9ycyBkZSBsYSB2w6lyaWZpY2F0aW9uIGRlIGxhIGRpc3BvbmliaWxpdMOpIGRlIGxhIHNhbGxlIG7CsCcrIGlkU2FsbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5mdW5jdGlvbiB1bmJsb2NrQWRyZXNzZVRhYigpe1xuICAgICQoJyN0YWItbGluay1mYWN0dXJhdGlvbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuTGluaycpO1xuICAgICQoJyN0YWItbGluay1mYWN0dXJhdGlvbiA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrVmFsaWRhdGlvblRhYigpe1xuICAgICQoJyN0YWItbGluay12YWxpZGF0aW9uJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW5MaW5rJyk7XG4gICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24gPiBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW4nKTtcbn1cblxuJChkb2N1bWVudCkub24oJ3NsaWRlc3RvcCcsICcjc2xpZGVyLXJhbmdlJyAsIGZ1bmN0aW9uKGV2ZW50LCB1aSl7XG5cbiAgICBhamF4UmVjaGVyY2hlU2FsbGVzKCk7XG59KTtcblxuZnVuY3Rpb24gcmVmcmVzaFBhbmllckljb25NZW51KCl7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3Bhbmllcl9pY29uX21lbnUnKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI3Bhbmllci1pY29uLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcikuZWZmZWN0KCBcImJvdW5jZVwiLCB7dGltZXM6M30sIDMwMCApO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYWpheFJlY2hlcmNoZVNhbGxlcygpe1xuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgLy8gdmFyIGFyclRpbWUgPSAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkuc3BsaXQoJzonKTtcbiAgICAvLyB2YXIgZGF0ZUR1Sm91ciA9IGFyclRpbWVbMl07XG4gICAgLy8gaWYgKCFkYXRlICYmICFkYXRlRHVKb3VyKXtcbiAgICAvLyAgICAgZGF0ZSA9IGRhdGVEdUpvdXI7XG4gICAgLy8gfVxuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgaWYoJCgnI3RhYi1saW5rLXBsYWNlJykubGVuZ3RoKVxuICAgICAgICAkdXJsID0gJ3BsYWNlc19kaXNwb25pYmxlJztcbiAgICBlbHNlXG4gICAgICAgICR1cmwgPSAnc2FsbGVzX2Rpc3BvbmlibGUnO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgkdXJsKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG5cblxuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuICAgICAgICAgICAgaWYoJCgnI3RhYi1saW5rLXBsYWNlJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5nZXRNYXAoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIiAgICAvLyBTdXBwcmVzc2lvbiBkJ3VuZSBzYWxsZSBkZXB1aXMgbGUgUHJvZHVpdCBBamF4XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVQcm9kdWl0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8gU3VwcHJlc3Npb24gZCd1bmUgc2FsbGUgZGVwdWlzIGxlIFBhbmllciBBamF4XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVTYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDbGljayBvbiAnICsgJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3Bhbmllcl9zYWxsZScpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZHNhbGxlXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcblxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyAvLyBTdXBwcmVzc2lvbiBkJ3VuZSBwbGFjZSBkZXB1aXMgbGUgUGFuaWVyIEFqYXhcbiAgICAvLyAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVBsYWNlJywgZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgJC5hamF4KHtcbiAgICAvLyAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyX3BsYWNlJyksXG4gICAgLy8gICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgICAgIGRhdGE6IHtcbiAgICAvLyAgICAgICAgICAgICBcImlkcGxhY2VcIjogJCh0aGlzKS52YWwoKVxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgIC8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgLy8gICAgICAgICAgICAgJC5hamF4KHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgIC8vICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAvLyAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgLy8gICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICAgICAgcmVmcmVzaFBhbmllckljb25NZW51KCk7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvLyAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgcGxhY2VzJyk7XG4gICAgLy9cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cblxuICAgIC8vIFN1cHByZXNzaW9uIGQndW5lIHBsYWNlIGRlcHVpcyBsZSBQYW5pZXIgQWpheFxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uRGVsZXRlUGxhY2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXJfcGxhY2UnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRwbGFjZVwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnNjX2dsb2JhbC5zdGF0dXMoU3RyaW5nKCQodGhpcykudmFsKCkpLCAnYXZhaWxhYmxlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBwbGFjZXMnKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBNb2RpZmljYXRpb24gbGl2ZSBhamF4IGRlIGxhIHF1YW50aXTDqSBwb3VyIHVuIHByb2R1aXRcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJ3NlbGVjdC5zZWxlY3QtcXRlLXByb2R1aXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gYWxlcnQoIHRoaXMudmFsdWUgKyAnaWRwcm9kdWl0JysgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYnV0dG9uRGVsZXRlUHJvZHVpdCcpLnZhbCgpICk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9ham91dF9wcm9kdWl0X3BhbmllcicpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5idXR0b25EZWxldGVQcm9kdWl0JykudmFsKCksXG4gICAgICAgICAgICAgICAgXCJxdGVcIjogdGhpcy52YWx1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyKSB7XG5cbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbiAgICAvLyAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJy5yb3cucGFuaWVyLW1lbnUnLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgcmVmcmVzaFBhbmllckljb25NZW51KClcbiAgICAvLyB9KTtcblxuXG5cbiAgICBmdW5jdGlvbiByZWZyZXNoUGFuaWVySWNvbk1lbnUoKXtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9wYW5pZXJfaWNvbl9tZW51JyksXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJCgnI3Bhbmllci1pY29uLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcikuZWZmZWN0KCBcImJvdW5jZVwiLCB7dGltZXM6M30sIDMwMCApO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQYW5pZXIoKXtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4UGFuaWVyLmpzIiwiJCgnI2Rpc3BsYXktc2FsbGUnKS5vbigna2V5dXAnLCAnLmNwJywgZnVuY3Rpb24oZXYpe1xuICAgIGNvbnNvbGUubG9nKCdrZXl1cCcpO1xuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3ZpbGxlcycse2NwOiAgJCh0aGlzKS52YWwoKX0pLFxuXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5sb2FkaW5nLXZpbGxlXCIpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCJmb3JtIC52aWxsZVwiKS5wYXJlbnQoKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXZpbGxlXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoXCIudmlsbGUgb3B0aW9uXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS52aWxsZSwgZnVuY3Rpb24oaW5kZXgsdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIi52aWxsZVwiKS5hcHBlbmQoJCgnPG9wdGlvbj4nLHsgdmFsdWUgOiB2YWx1ZSAsIHRleHQ6IHZhbHVlIH0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmctdmlsbGVcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIudmlsbGVcIikudmFsKCcnKTtcbiAgICB9XG59KTtcblxuJChcIi5jcFwiKS5rZXl1cChmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygna2V5dXAnKTtcbiAgICBpZiAoJCh0aGlzKS52YWwoKS5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCd2aWxsZXMnLHtjcDogICQodGhpcykudmFsKCl9KSxcblxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoXCIubG9hZGluZy12aWxsZVwiKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiZm9ybSAudmlsbGVcIikucGFyZW50KCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwibG9hZGluZy12aWxsZVwiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKFwiLnZpbGxlIG9wdGlvblwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEudmlsbGUsIGZ1bmN0aW9uKGluZGV4LHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCIudmlsbGVcIikuYXBwZW5kKCQoJzxvcHRpb24+Jyx7IHZhbHVlIDogdmFsdWUgLCB0ZXh0OiB2YWx1ZSB9KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJChcIi5sb2FkaW5nLXZpbGxlXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiLnZpbGxlXCIpLnZhbCgnJyk7XG4gICAgfVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFZpbGxlcy5qcyIsInZhciBmaXJzdFNlYXRMYWJlbCA9IDE7XG52YXIgc2NfZ2xvYmFsID0gW107XG5cbihmdW5jdGlvbigkKSB7XG4gICAgZnVuY3Rpb24gaW5pdENhcnRlSW50ZXJhY3RpdmUobWFwKXtcbiAgICAgICAgdmFyICRjYXJ0ID0gJCgnI3NlbGVjdGVkLXNlYXRzJyksXG4gICAgICAgICAgICAkY291bnRlciA9ICQoJyNjb3VudGVyJyksXG4gICAgICAgICAgICAkdG90YWwgPSAkKCcjdG90YWwnKSxcblxuICAgICAgICAgICAgc2MgPSAkKCcjc2VhdC1tYXAnKS5zZWF0Q2hhcnRzKHtcbiAgICAgICAgICAgICAgICBtYXA6ICQucGFyc2VKU09OKG1hcCksXG5cbiAgICAgICAgICAgICAgICBzZWF0czoge1xuICAgICAgICAgICAgICAgICAgICBuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdmaXJzdC1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ1BsYWNlIFZJUCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ1BsYWNlJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmOntcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2Vjb25vbXktY2xhc3MgdW5hdmFpbGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdQbGFjZSdcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYW1pbmc6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0TGFiZWw6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlyc3RTZWF0TGFiZWwrKztcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgICAgICBub2RlOiAkKCcjbGVnZW5kJyksXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ3AnLCAnYXZhaWxhYmxlJywgJ1BsYWNlIGRpc3BvbmlibGUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZicsICd1bmF2YWlsYWJsZScsICdEw6lqw6AgcsOpc2VydsOpJ11cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0J3MgY3JlYXRlIGEgbmV3IDxsaT4gd2hpY2ggd2UnbGwgYWRkIHRvIHRoZSBjYXJ0IGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCc8bGk+JyArIHRoaXMuZGF0YSgpLmNhdGVnb3J5ICsgJyBQbGFjZSAjICcgKyB0aGlzLnNldHRpbmdzLmxhYmVsICsgJzogPGI+4oKsJyArIHRoaXMuZGF0YSgpLnByaWNlICsgJzwvYj4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhbmNlbC1jYXJ0LWl0ZW1cIj5bYW5udWxlcl08L2E+PC9saT4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdpZCcsICdjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ3NlYXRJZCcsIHRoaXMuc2V0dGluZ3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCRjYXJ0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIExldHMgdXBkYXRlIHRoZSBjb3VudGVyIGFuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIC5maW5kIGZ1bmN0aW9uIHdpbGwgbm90IGZpbmQgdGhlIGN1cnJlbnQgc2VhdCwgYmVjYXVzZSBpdCB3aWxsIGNoYW5nZSBpdHMgc3RhdXRzIG9ubHkgYWZ0ZXIgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiAnc2VsZWN0ZWQnLiBUaGlzIGlzIHdoeSB3ZSBoYXZlIHRvIGFkZCAxIHRvIHRoZSBsZW5ndGggYW5kIHRoZSBjdXJyZW50IHNlYXQgcHJpY2UgdG8gdGhlIHRvdGFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSArIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSB0aGUgY291bnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbmQgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpIC0gdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSB0aGUgaXRlbSBmcm9tIG91ciBjYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjY2FydC1pdGVtLScgKyB0aGlzLnNldHRpbmdzLmlkKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIHZhY2F0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICd1bmF2YWlsYWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiBhbHJlYWR5IGJvb2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1bmF2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy90aGlzIHdpbGwgaGFuZGxlIFwiW2NhbmNlbF1cIiBsaW5rIGNsaWNrc1xuICAgICAgICAkKCcjc2VsZWN0ZWQtc2VhdHMnKS5vbignY2xpY2snLCAnLmNhbmNlbC1jYXJ0LWl0ZW0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL2xldCdzIGp1c3QgdHJpZ2dlciBDbGljayBldmVudCBvbiB0aGUgYXBwcm9wcmlhdGUgc2VhdCwgc28gd2UgZG9uJ3QgaGF2ZSB0byByZXBlYXQgdGhlIGxvZ2ljIGhlcmVcbiAgICAgICAgICAgIHNjLmdldCgkKHRoaXMpLnBhcmVudHMoJ2xpOmZpcnN0JykuZGF0YSgnc2VhdElkJykpLmNsaWNrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKiBPbiByZWZyZXNoIGVuIGxpdmUgYXV0b21hdGlxdWVtZW50IGxlcyBwbGFjZXMgdG91dGVzIGxlcyBtaW51dGVzIGVuIGZvbmN0aW9uIGR1IGNyw6luZWF1IHNlbGVjdGlvbm7DqSAqKi9cbiAgICAgICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgICAgIHZhciBpZFBsYWNlID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9wbGFjZXNfdW5hdmFpbGFibGUnKSxcblxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgXCJpZFBsYWNlXCIgOiBpZFBsYWNlLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogZGF0ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzcyAgOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvL2l0ZXJhdGUgdGhyb3VnaCBhbGwgYm9va2luZ3MgZm9yIG91ciBldmVudFxuICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzcG9uc2UsIGZ1bmN0aW9uKGluZGV4LCBwbGFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwbGFjZS5pZHBsYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmluZCBzZWF0IGJ5IGlkIGFuZCBzZXQgaXRzIHN0YXR1cyB0byB1bmF2YWlsYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Muc3RhdHVzKFN0cmluZyhwbGFjZS5pZHBsYWNlKSwgJ3VuYXZhaWxhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCA2MDAwMCk7IC8vZXZlcnkgNjAgc2Vjb25kc1xuICAgICAgICAvL2xldCdzIHByZXRlbmQgc29tZSBzZWF0cyBoYXZlIGFscmVhZHkgYmVlbiBib29rZWRcbiAgICAgICAgLy9zYy5nZXQoWycxXzInLCAnNF8xJywgJzdfMScsICc3XzInXSkuc3RhdHVzKCd1bmF2YWlsYWJsZScpO1xuICAgICAgICByZXR1cm4gc2M7XG4gICAgfVxuXG4gICAgJC5mbi5zY19nbG9iYWwgPSBbXTtcblxuICAgICQuZm4uZ2V0TWFwID0gZnVuY3Rpb24gKCl7XG4gICAgICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgICAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgICAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAgICAgLy8kKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9wbGFjZXNfbWFwJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobWFwLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNjX2dsb2JhbCA9IGluaXRDYXJ0ZUludGVyYWN0aXZlKG1hcCk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBpbml0aWFsaXNhdGlvbiBkZXMgcGxhY2VzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNhbGN1bGF0ZVRvdGFsKHNjKSB7XG4gICAgICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAgICAgLy9iYXNpY2FsbHkgZmluZCBldmVyeSBzZWxlY3RlZCBzZWF0IGFuZCBzdW0gaXRzIHByaWNlXG4gICAgICAgIHNjLmZpbmQoJ3NlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0b3RhbCArPSB0aGlzLmRhdGEoKS5wcmljZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cbn0pKGpRdWVyeSk7XG5cbmZ1bmN0aW9uIGdldE1hcCgpe1xuICAgIC8vJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BsYWNlc19tYXAnKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtYXAsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNjX2dsb2JhbCA9IGluaXRDYXJ0ZUludGVyYWN0aXZlKG1hcCk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgaW5pdGlhbGlzYXRpb24gZGVzIHBsYWNlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG59XG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuICAgIGlmKCQoJyNzZWF0LW1hcCcpLmxlbmd0aCAmJiAgJCgnI3NlbGVjdGVkLXNlYXRzJykubGVuZ3RoKXtcblxuICAgICAgICAvLyQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BsYWNlc19tYXAnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtYXAsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5pdENhcnRlSW50ZXJhY3RpdmUobWFwKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGluaXRpYWxpc2F0aW9uIGRlcyBwbGFjZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59KTtcblxuZnVuY3Rpb24gaW5pdENhcnRlSW50ZXJhY3RpdmUobWFwKXtcbiAgICB2YXIgJGNhcnQgPSAkKCcjc2VsZWN0ZWQtc2VhdHMnKSxcbiAgICAgICAgJGNvdW50ZXIgPSAkKCcjY291bnRlcicpLFxuICAgICAgICAkdG90YWwgPSAkKCcjdG90YWwnKSxcblxuICAgICAgICBzYyA9ICQoJyNzZWF0LW1hcCcpLnNlYXRDaGFydHMoe1xuICAgICAgICAgICAgbWFwOiAkLnBhcnNlSlNPTihtYXApLFxuXG4gICAgICAgICAgICBzZWF0czoge1xuICAgICAgICAgICAgICAgIG46IHtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdmaXJzdC1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnUGxhY2UgVklQJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcDoge1xuICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2Vjb25vbXktY2xhc3MnLCAvL3lvdXIgY3VzdG9tIENTUyBjbGFzc1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ1BsYWNlJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZjp7XG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiAwLFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcyB1bmF2YWlsYWJsZScsXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnUGxhY2UnXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmFtaW5nOiB7XG4gICAgICAgICAgICAgICAgdG9wOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpcnN0U2VhdExhYmVsKys7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgICAgICBub2RlOiAkKCcjbGVnZW5kJyksXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgWydwJywgJ2F2YWlsYWJsZScsICdQbGFjZSBkaXNwb25pYmxlJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnZicsICd1bmF2YWlsYWJsZScsICdEw6lqw6AgcsOpc2VydsOpJ11cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAvL2xldCdzIGNyZWF0ZSBhIG5ldyA8bGk+IHdoaWNoIHdlJ2xsIGFkZCB0byB0aGUgY2FydCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAkKCc8bGk+JyArIHRoaXMuZGF0YSgpLmNhdGVnb3J5ICsgJyBQbGFjZSAjICcgKyB0aGlzLnNldHRpbmdzLmxhYmVsICsgJzogPGI+4oKsJyArIHRoaXMuZGF0YSgpLnByaWNlICsgJzwvYj4gPGEgaHJlZj1cIiNcIiBjbGFzcz1cImNhbmNlbC1jYXJ0LWl0ZW1cIj5bYW5udWxlcl08L2E+PC9saT4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdzZWF0SWQnLCB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKCRjYXJ0KTtcblxuICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgKiBMZXRzIHVwZGF0ZSB0aGUgY291bnRlciBhbmQgdG90YWxcbiAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICogLmZpbmQgZnVuY3Rpb24gd2lsbCBub3QgZmluZCB0aGUgY3VycmVudCBzZWF0LCBiZWNhdXNlIGl0IHdpbGwgY2hhbmdlIGl0cyBzdGF1dHMgb25seSBhZnRlciByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICogJ3NlbGVjdGVkJy4gVGhpcyBpcyB3aHkgd2UgaGF2ZSB0byBhZGQgMSB0byB0aGUgbGVuZ3RoIGFuZCB0aGUgY3VycmVudCBzZWF0IHByaWNlIHRvIHRoZSB0b3RhbC5cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgKyB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdzZWxlY3RlZCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy91cGRhdGUgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAvL2FuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSAtIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSB0aGUgaXRlbSBmcm9tIG91ciBjYXJ0XG4gICAgICAgICAgICAgICAgICAgICQoJyNjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiB2YWNhdGVkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3VuYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gYWxyZWFkeSBib29rZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1bmF2YWlsYWJsZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgLy90aGlzIHdpbGwgaGFuZGxlIFwiW2NhbmNlbF1cIiBsaW5rIGNsaWNrc1xuICAgICQoJyNzZWxlY3RlZC1zZWF0cycpLm9uKCdjbGljaycsICcuY2FuY2VsLWNhcnQtaXRlbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9sZXQncyBqdXN0IHRyaWdnZXIgQ2xpY2sgZXZlbnQgb24gdGhlIGFwcHJvcHJpYXRlIHNlYXQsIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVwZWF0IHRoZSBsb2dpYyBoZXJlXG4gICAgICAgIHNjLmdldCgkKHRoaXMpLnBhcmVudHMoJ2xpOmZpcnN0JykuZGF0YSgnc2VhdElkJykpLmNsaWNrKCk7XG4gICAgfSk7XG5cbiAgICAvKiogT24gcmVmcmVzaCBlbiBsaXZlIGF1dG9tYXRpcXVlbWVudCBsZXMgcGxhY2VzIHRvdXRlcyBsZXMgbWludXRlcyBlbiBmb25jdGlvbiBkdSBjcsOpbmVhdSBzZWxlY3Rpb25uw6kgKiovXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcblxuICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BsYWNlc191bmF2YWlsYWJsZScpLFxuXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIHN1Y2Nlc3MgIDogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAvL2l0ZXJhdGUgdGhyb3VnaCBhbGwgYm9va2luZ3MgZm9yIG91ciBldmVudFxuICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZSwgZnVuY3Rpb24oaW5kZXgsIHBsYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocGxhY2UuaWRwbGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vZmluZCBzZWF0IGJ5IGlkIGFuZCBzZXQgaXRzIHN0YXR1cyB0byB1bmF2YWlsYWJsZVxuICAgICAgICAgICAgICAgICAgICBzYy5zdGF0dXMoU3RyaW5nKHBsYWNlLmlkcGxhY2UpLCAndW5hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgNjAwMDApOyAvL2V2ZXJ5IDYwIHNlY29uZHNcbiAgICAvL2xldCdzIHByZXRlbmQgc29tZSBzZWF0cyBoYXZlIGFscmVhZHkgYmVlbiBib29rZWRcbiAgICAvL3NjLmdldChbJzFfMicsICc0XzEnLCAnN18xJywgJzdfMiddKS5zdGF0dXMoJ3VuYXZhaWxhYmxlJyk7XG4gICAgcmV0dXJuIHNjO1xufVxuXG5mdW5jdGlvbiByZWNhbGN1bGF0ZVRvdGFsKHNjKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIC8vYmFzaWNhbGx5IGZpbmQgZXZlcnkgc2VsZWN0ZWQgc2VhdCBhbmQgc3VtIGl0cyBwcmljZVxuICAgIHNjLmZpbmQoJ3NlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvdGFsICs9IHRoaXMuZGF0YSgpLnByaWNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvdGFsO1xufVxuXG4vLyBMb3JzcXUnb24gY2xpcXVlIHN1ciBsYSBib3V0b24gUGxhY2UgIzFiaXNcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstcGxhY2UnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGxhY2VzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICBnZXRNYXAoKTtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1Jykuc2hvdyhcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5zaG93KFwic2xvd1wiKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHBsYWNlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuLy8gLy8gU3VwcHJlc3Npb24gZCd1bmUgcGxhY2UgZGVwdWlzIGxlIFBhbmllciBBamF4XG4vLyAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVBsYWNlJywgZnVuY3Rpb24oKXtcbi8vICAgICAkLmFqYXgoe1xuLy8gICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3Bhbmllcl9wbGFjZScpLFxuLy8gICAgICAgICB0eXBlOiBcIlBPU1RcIixcbi8vICAgICAgICAgZGF0YToge1xuLy8gICAgICAgICAgICAgXCJpZHBsYWNlXCI6ICQodGhpcykudmFsKClcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYXN5bmM6IHRydWUsXG4vLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuLy8gICAgICAgICAgICAgJC5hamF4KHtcbi8vICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4vLyAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4vLyAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuLy8gICAgICAgICAgICAgICAgIHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4vLyAgICAgICAgICAgICAgICAgICAgIHNjX2dsb2JhbC5zdGF0dXMoU3RyaW5nKCQodGhpcykudmFsKCkpLCAnYXZhaWxhYmxlJyk7XG4vL1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcbi8vXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgcGxhY2VzJyk7XG4vL1xuLy8gICAgICAgICB9XG4vLyAgICAgfSk7XG4vLyB9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwiLyohXG4gKiBqUXVlcnktU2VhdC1DaGFydHMgdjEuMS41IC0+IHYyIChLYXJpbSBCT1VCUklUKVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGV1c3ptYXJrb3dza2kvalF1ZXJ5LVNlYXQtQ2hhcnRzXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIDIwMTYgTWF0ZXVzeiBNYXJrb3dza2lcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogVXBncmFkZSBieSBhdXRob3I6IEthcmltIEJPVUJSSVRcbiAqL1xuXG4oZnVuY3Rpb24oJCkge1xuXHRcdFxuXHQvLyd1c2Ugc3RyaWN0JztcdFxuXHRcdFxuXHQkLmZuLnNlYXRDaGFydHMgPSBmdW5jdGlvbiAoc2V0dXApIHtcblxuXHRcdC8vaWYgdGhlcmUncyBzZWF0Q2hhcnRzIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCwgcmV0dXJuIGl0XG5cdFx0aWYgKHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmbiAgICAgICA9IHRoaXMsXG5cdFx0XHRzZWF0cyAgICA9IHt9LFxuXHRcdFx0c2VhdElkcyAgPSBbXSxcblx0XHRcdGxlZ2VuZCxcblx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRhbmltYXRlIDogZmFsc2UsIC8vcmVxdWlyZXMgalF1ZXJ5IFVJXG5cdFx0XHRcdG5hbWluZyAgOiB7XG5cdFx0XHRcdFx0dG9wICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRsZWZ0ICAgOiB0cnVlLFxuXHRcdFx0XHRcdGdldElkICA6IGZ1bmN0aW9uKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiByb3cgKyAnXycgKyBjb2x1bW47XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRMYWJlbCA6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29sdW1uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVnZW5kIDoge1xuXHRcdFx0XHRcdG5vZGUgICA6IG51bGwsXG5cdFx0XHRcdFx0aXRlbXMgIDogW11cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpY2sgICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnc2VsZWN0ZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2F2YWlsYWJsZSc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb2N1cyAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2ZvY3VzZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSAge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJsdXIgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnN0YXR1cygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWF0cyAgIDoge31cblx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdC8vc2VhdCB3aWxsIGJlIGJhc2ljYWxseSBhIHNlYXQgb2JqZWN0IHdoaWNoIHdlJ2xsIHdoZW4gZ2VuZXJhdGluZyB0aGUgbWFwXG5cdFx0XHRzZWF0ID0gKGZ1bmN0aW9uKHNlYXRDaGFydHMsIHNlYXRDaGFydHNTZXR0aW5ncykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNldHVwKSB7XG5cdFx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0XHRcdHN0YXR1cyA6ICdhdmFpbGFibGUnLCAvL2F2YWlsYWJsZSwgdW5hdmFpbGFibGUsIHNlbGVjdGVkXG5cdFx0XHRcdFx0XHRzdHlsZSAgOiAnYXZhaWxhYmxlJyxcblx0XHRcdFx0XHRcdC8vbWFrZSBzdXJlIHRoZXJlJ3MgYW4gZW1wdHkgaGFzaCBpZiB1c2VyIGRvZXNuJ3QgcGFzcyBhbnl0aGluZ1xuXHRcdFx0XHRcdFx0ZGF0YSAgIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW3NldHVwLmNoYXJhY3Rlcl0gfHwge31cblx0XHRcdFx0XHRcdC8vYW55dGhpbmcgZ29lcyBoZXJlP1xuXHRcdFx0XHRcdH0sIHNldHVwKTtcblxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlID0gJCgnPGRpdj48L2Rpdj4nKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgICAgICA6IGZuLnNldHRpbmdzLmlkLFxuXHRcdFx0XHRcdFx0XHRyb2xlICAgICAgICAgICA6ICdjaGVja2JveCcsXG5cdFx0XHRcdFx0XHRcdCdhcmlhLWNoZWNrZWQnIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGZvY3VzYWJsZSAgICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dGFiSW5kZXggICAgICAgOiAtMSAvL21hbnVhbCBmb2N1c1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50ZXh0KGZuLnNldHRpbmdzLmxhYmVsKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsICdhdmFpbGFibGUnXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdC8vbGV0J3MgbWVyZ2UgY3VzdG9tIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggc3RhbmRhcmQgSlNDIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXSA9PSBcInVuZGVmaW5lZFwiID8gXG5cdFx0XHRcdFx0XHRcdFx0W10gOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXS5jbGFzc2VzXG5cdFx0XHRcdFx0XHRcdCkuam9pbignICcpKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2Jhc2ljYWxseSBhIHdyYXBwZXIgZnVuY3Rpb25cblx0XHRcdFx0XHRmbi5kYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuZGF0YTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLmNoYXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5jaGFyYWN0ZXI7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuJG5vZGU7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogQ2FuIGVpdGhlciBzZXQgb3IgcmV0dXJuIHN0YXR1cyBkZXBlbmRpbmcgb24gYXJndW1lbnRzLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgdGhlcmUncyBubyBhcmd1bWVudCwgaXQgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgc3R5bGUuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB5b3UgcGFzcyBhbiBhcmd1bWVudCwgaXQgd2lsbCB1cGRhdGUgc2VhdCdzIHN0eWxlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm4uc3R5bGUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/XG5cdFx0XHRcdFx0XHRcdChmdW5jdGlvbihuZXdTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvbGRTdHlsZSA9IGZuLnNldHRpbmdzLnN0eWxlO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiBub3RoaW5nIGNoYW5nZXMsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV3U3R5bGUgPT0gb2xkU3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvbGRTdHlsZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9mb2N1c2VkIGlzIGEgc3BlY2lhbCBzdHlsZSB3aGljaCBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIHN0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLnN0YXR1cyA9IG5ld1N0eWxlICE9ICdmb2N1c2VkJyA/IG5ld1N0eWxlIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0cignYXJpYS1jaGVja2VkJywgbmV3U3R5bGUgPT0gJ3NlbGVjdGVkJyk7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIHVzZXIgd2FudHMgdG8gYW5pbWF0ZSBzdGF0dXMgY2hhbmdlcywgbGV0IGhpbSBkbyB0aGlzXG5cdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0c1NldHRpbmdzLmFuaW1hdGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUuc3dpdGNoQ2xhc3Mob2xkU3R5bGUsIG5ld1N0eWxlLCAyMDApIDpcblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnJlbW92ZUNsYXNzKG9sZFN0eWxlKS5hZGRDbGFzcyhuZXdTdHlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3R5bGUgPSBuZXdTdHlsZTtcblx0XHRcdFx0XHRcdFx0fSkoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0eWxlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9laXRoZXIgc2V0IG9yIHJldHJpZXZlXG5cdFx0XHRcdFx0Zm4uc3RhdHVzID0gZnVuY3Rpb24oKSB7XG5cdFxuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0YXR1cyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IFxuXHRcdFx0XHRcdFx0XHRmbi5zdHlsZShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly91c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gdG8gY29udmllbmlldGx5IGdldCBzaG9ydGN1dCB2YXJpYWJsZXNcblx0XHRcdFx0XHQoZnVuY3Rpb24oc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQpIHtcblx0XHRcdFx0XHRcdC8vYXR0YWNoIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdFx0XHQkLmVhY2goWydjbGljaycsICdmb2N1cycsICdibHVyJ10sIGZ1bmN0aW9uKGluZGV4LCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vd2Ugd2FudCB0byBiZSBhYmxlIHRvIGNhbGwgdGhlIGZ1bmN0aW9ucyBmb3IgZWFjaCBzZWF0IG9iamVjdFxuXHRcdFx0XHRcdFx0XHRmbltjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT0gJ2ZvY3VzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGFscmVhZHkgYSBmb2N1c2VkIGVsZW1lbnQsIHdlIGhhdmUgdG8gcmVtb3ZlIGZvY3VzIGZyb20gaXQgZmlyc3Rcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBzZWF0LnNldHRpbmdzLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNlYXQubm9kZSgpLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgY2FuIHBhc3MgaGlzIG93biBjYWxsYmFjayBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBmaXJzdCBjaGVjayBpZiBpdCBleGlzdHNcblx0XHRcdFx0XHRcdFx0XHQgKiBhbmQgaWYgbm90LCB1c2Ugb3VyIGRlZmF1bHQgY2FsbGJhY2suXG5cdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHQgKiBFYWNoIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IHNlYXQgY29udGV4dC5cblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc3R5bGUodHlwZW9mIHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10uYXBwbHkoc2VhdCkgOiBzZWF0Q2hhcnRzU2V0dGluZ3NbY2FsbGJhY2tdLmFwcGx5KHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL3RoZSBiZWxvdyB3aWxsIGJlY29tZSBzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCB0aGFua3MgdG8gdGhlIGltbWVkaWF0ZSBmdW5jdGlvblx0XHRcblx0XHRcdFx0XHR9KShzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHMsIGZuLnNldHRpbmdzLmNoYXJhY3RlciwgZm4pO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlKClcblx0XHRcdFx0XHRcdC8vdGhlIGZpcnN0IHRocmVlIG1vdXNlIGV2ZW50cyBhcmUgc2ltcGxlXG5cdFx0XHRcdFx0XHQub24oJ2NsaWNrJywgICAgICBmbi5jbGljaylcblx0XHRcdFx0XHRcdC5vbignbW91c2VlbnRlcicsIGZuLmZvY3VzKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlJywgZm4uYmx1cilcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly9rZXlkb3duIHJlcXVpcmVzIHF1aXRlIGEgbG90IG9mIGxvZ2ljLCBiZWNhdXNlIHdlIGhhdmUgdG8ga25vdyB3aGVyZSB0byBtb3ZlIHRoZSBmb2N1c1xuXHRcdFx0XHRcdFx0Lm9uKCdrZXlkb3duJywgICAgKGZ1bmN0aW9uKHNlYXQsICRzZWF0KSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZXZlcnl0aGluZyBkZXBlbmRzIG9uIHRoZSBwcmVzc2VkIGtleVxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoZS53aGljaCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9zcGFjZWJhciB3aWxsIGp1c3QgdHJpZ2dlciB0aGUgc2FtZSBldmVudCBtb3VzZSBjbGljayBkb2VzXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL1VQICYgRE9XTlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoaXMgaXMgYSByZWN1cnNpdmUsIGltbWVkaWF0ZSBmdW5jdGlvbiB3aGljaCBzZWFyY2hlcyBmb3IgdGhlIGZpcnN0IFwiZm9jdXNhYmxlXCIgcm93LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIGJlY2F1c2Ugd2Ugd2FudCBhIGNvbnZlbmllbnQgYWNjZXNzIHRvIHNvbWUgRE9NIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIHJlY3Vyc2lvbiBiZWNhdXNlIHNvbWV0aW1lcyB3ZSBtYXkgaGl0IGFuIGVtcHR5IHNwYWNlIHJhdGhlciB0aGFuIGEgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uIGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJGN1cnJlbnRSb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1Jvdztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2xldCdzIGRldGVybWluZSB3aGljaCByb3cgc2hvdWxkIHdlIG1vdmUgdG9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRyb3dzLmluZGV4KCRjdXJyZW50Um93KSAmJiBlLndoaWNoID09IDM4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCB1cCBhcnJvdywgbW92ZSB0byB0aGUgbGFzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkcm93cy5pbmRleCgkY3VycmVudFJvdykgPT0gJHJvd3MubGVuZ3RoLTEgJiYgZS53aGljaCA9PSA0MCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBsYXN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCBkb3duIGFycm93LCBtb3ZlIHRvIHRoZSBmaXJzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzaW5nIGVxIHRvIGdldCBhbiBlbGVtZW50IGF0IHRoZSBkZXNpcmVkIGluZGV4IHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZXEoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdXAgYXJyb3csIHRoZW4gZGVjcmVtZW50IHRoZSBpbmRleCwgaWYgZG93biBpbmNyZW1lbnQgaXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICsgKGUud2hpY2ggPT0gMzggPyAoLTEpIDogKCsxKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbm93IHRoYXQgd2Uga25vdyB0aGUgcm93LCBsZXQncyBnZXQgdGhlIHNlYXQgdXNpbmcgdGhlIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAkbmV3Um93LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKS5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZSBzZWF0IHdlIGZvdW5kIGlzIGEgc3BhY2UsIGtlZXAgbG9va2luZyBmdXJ0aGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRuZXdTZWF0Lmhhc0NsYXNzKCdzZWF0Q2hhcnRzLXNwYWNlJykgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkbmV3Um93KSA6ICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyIGFuZCB0aGVuIHNlbGVjdCBhbGwgcm93cyBidXQgdGhlIGhlYWRlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcicpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJvdyBhbmQgdGhlbiBmaW5kIGFsbCBzZWF0IGNlbGxzIChib3RoIHNlYXRzICYgc3BhY2VzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3dlIGNvdWxkbid0IGRldGVybWluZSB0aGUgbmV3IHNlYXQsIHNvIHdlIGJldHRlciBnaXZlIHVwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3JlbW92ZSBmb2N1cyBmcm9tIHRoZSBvbGQgc2VhdCBhbmQgcHV0IGl0IG9uIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdC8vTEVGVCAmIFJJR0hUXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGUgbG9naWMgaGVyZSBpcyBzbGlnaHRseSBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIGZvciB1cC9kb3duIGFycm93cy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVXNlciB3aWxsIGJlIGFibGUgdG8gYnJvd3NlIHRoZSB3aG9sZSBtYXAgdXNpbmcganVzdCBsZWZ0L3JpZ2h0IGFycm93LCBiZWNhdXNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIGl0IHdpbGwgbW92ZSB0byB0aGUgbmV4dCByb3cgd2hlbiB3ZSByZWFjaCB0aGUgcmlnaHQvbGVmdC1tb3N0IHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbigkc2VhdHMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkc2VhdHMuaW5kZXgoJHNlYXQpICYmIGUud2hpY2ggPT0gMzcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCBsZWZ0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGxlZnQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRzZWF0cy5pbmRleCgkc2VhdCkgPT0gJHNlYXRzLmxlbmd0aCAtMSAmJiBlLndoaWNoID09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgcmlnaHQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgcmlnaHQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vc2ltcGx5IG1vdmUgb25lIHNlYXQgbGVmdCBvciByaWdodCBkZXBlbmRpbmcgb24gdGhlIGtleVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpICsgKGUud2hpY2ggPT0gMzcgPyAoLTEpIDogKCsxKSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXI6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSknKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL2hhbmRsZSBmb2N1c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSkoZm4sIGZuLm5vZGUoKSkpO1xuXHRcdFx0XHRcdFx0Ly8uYXBwZW5kVG8oc2VhdENoYXJ0cy5maW5kKCcuJyArIHJvdykpO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pKGZuLCBzZXR0aW5ncyk7XG5cdFx0XHRcblx0XHRmbi5hZGRDbGFzcygnc2VhdENoYXJ0cy1jb250YWluZXInKTtcblx0XHRcblx0XHQvL3RydWUgLT4gZGVlcCBjb3B5IVxuXHRcdCQuZXh0ZW5kKHRydWUsIHNldHRpbmdzLCBzZXR1cCk7XHRcdFxuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCByb3cgaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLnJvd3MgPSBzZXR0aW5ncy5uYW1pbmcucm93cyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgcm93cyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm93cy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSkoc2V0dGluZ3MubWFwLmxlbmd0aCk7XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IGNvbHVtbiBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyA9IHNldHRpbmdzLm5hbWluZy5jb2x1bW5zIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5zID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb2x1bW5zLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY29sdW1ucztcblx0XHR9KShzZXR0aW5ncy5tYXBbMF0uc3BsaXQoJycpLmxlbmd0aCk7XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLm5hbWluZy50b3ApIHtcblx0XHRcdHZhciAkaGVhZGVyUm93ID0gJCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93IHNlYXRDaGFydHMtaGVhZGVyJyk7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZCgkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpXG5cdFx0XHRcdFx0XHQudGV4dCh2YWx1ZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHRmbi5hcHBlbmQoJGhlYWRlclJvdyk7XG5cdFx0XG5cdFx0Ly9kbyB0aGlzIGZvciBlYWNoIG1hcCByb3dcblx0XHQkLmVhY2goc2V0dGluZ3MubWFwLCBmdW5jdGlvbihyb3csIGNoYXJhY3RlcnMpIHtcblxuXHRcdFx0dmFyICRyb3cgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdycpO1xuXHRcdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkcm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcblx0XHRcdFx0XHRcdC50ZXh0KHNldHRpbmdzLm5hbWluZy5yb3dzW3Jvd10pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBEbyB0aGlzIGZvciBlYWNoIHNlYXQgKGxldHRlcilcblx0XHRcdCAqXG5cdFx0XHQgKiBOb3cgdXNlcnMgd2lsbCBiZSBhYmxlIHRvIHBhc3MgY3VzdG9tIElEIGFuZCBsYWJlbCB3aGljaCBvdmVyd3JpdGUgdGhlIG9uZSB0aGF0IHNlYXQgd291bGQgYmUgYXNzaWduZWQgYnkgZ2V0SWQgYW5kXG5cdFx0XHQgKiBnZXRMYWJlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE5ldyBmb3JtYXQgaXMgbGlrZSB0aGlzOlxuXHRcdFx0ICogYVtJRCxsYWJlbF1hW0lEXWFhYWFhXG5cdFx0XHQgKlxuXHRcdFx0ICogU28geW91IGNhbiBvdmVyd3JpdGUgdGhlIElEIG9yIGxhYmVsIChvciBib3RoKSBldmVuIGZvciBqdXN0IG9uZSBzZWF0LlxuXHRcdFx0ICogQmFzaWNhbGx5IElEIHNob3VsZCBiZSBmaXJzdCwgc28gaWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIGp1c3QgbGFiZWwgd3JpdGUgaXQgYXMgZm9sbG93czpcblx0XHRcdCAqIGFbLExBQkVMXVxuXHRcdFx0ICpcblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBJRHMgYXJlTCAwLTksIGEteiwgQS1aLCBfXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gbGFiZWxzIGFyZTogMC05LCBhLXosIEEtWiwgXywgJyAnIChzcGFjZSlcblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdCBcblx0XHRcdCQuZWFjaChjaGFyYWN0ZXJzLm1hdGNoKC9bYS16X117MX0oXFxbWzAtOWEtel9dezAsfSgsWzAtOWEtel8gXSspP1xcXSk/L2dpKSwgZnVuY3Rpb24gKGNvbHVtbiwgY2hhcmFjdGVyUGFyYW1zKSB7IFxuXHRcdFx0XHR2YXIgbWF0Y2hlcyAgICAgICAgID0gY2hhcmFjdGVyUGFyYW1zLm1hdGNoKC8oW2Etel9dezF9KShcXFsoWzAtOWEtel8gLF0rKVxcXSk/L2kpLFxuXHRcdFx0XHRcdC8vbm8gbWF0dGVyIGlmIHVzZXIgc3BlY2lmaWVzIFtdIHBhcmFtcywgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaW4gdGhlIHNlY29uZCBlbGVtZW50XG5cdFx0XHRcdFx0Y2hhcmFjdGVyICAgICAgID0gbWF0Y2hlc1sxXSxcblx0XHRcdFx0XHQvL2NoZWNrIGlmIHVzZXIgaGFzIHBhc3NlZCBzb21lIGFkZGl0aW9uYWwgcGFyYW1zIHRvIG92ZXJyaWRlIGlkIG9yIGxhYmVsXG5cdFx0XHRcdFx0cGFyYW1zICAgICAgICAgID0gdHlwZW9mIG1hdGNoZXNbM10gIT09ICd1bmRlZmluZWQnID8gbWF0Y2hlc1szXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Ly9pZCBwYXJhbSBzaG91bGQgYmUgZmlyc3Rcblx0XHRcdFx0XHRvdmVycmlkZUlkICAgICAgPSBwYXJhbXMubGVuZ3RoID8gcGFyYW1zWzBdIDogbnVsbCxcblx0XHRcdFx0XHQvL2xhYmVsIHBhcmFtIHNob3VsZCBiZSBzZWNvbmRcblx0XHRcdFx0XHRvdmVycmlkZUxhYmVsICAgPSBwYXJhbXMubGVuZ3RoID09PSAyID8gcGFyYW1zWzFdIDogbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0JHJvdy5hcHBlbmQoY2hhcmFjdGVyICE9ICdfJyA/XG5cdFx0XHRcdFx0Ly9pZiB0aGUgY2hhcmFjdGVyIGlzIG5vdCBhbiB1bmRlcnNjb3JlIChlbXB0eSBzcGFjZSlcblx0XHRcdFx0XHQoZnVuY3Rpb24obmFtaW5nKSB7XG5cdFxuXHRcdFx0XHRcdFx0Ly9zbyB1c2VycyBkb24ndCBoYXZlIHRvIHNwZWNpZnkgZW1wdHkgb2JqZWN0c1xuXHRcdFx0XHRcdFx0c2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA9IGNoYXJhY3RlciBpbiBzZXR0aW5ncy5zZWF0cyA/IHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gOiB7fTtcblx0XG5cdFx0XHRcdFx0XHR2YXIgaWQgPSBvdmVycmlkZUlkID8gb3ZlcnJpZGVJZCA6IG5hbWluZy5nZXRJZChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pO1xuXHRcdFx0XHRcdFx0c2VhdHNbaWRdID0gbmV3IHNlYXQoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgOiBpZCxcblx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogb3ZlcnJpZGVMYWJlbCA/XG5cdFx0XHRcdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCA6IG5hbWluZy5nZXRMYWJlbChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pLFxuXHRcdFx0XHRcdFx0XHRyb3cgICAgICAgOiByb3csXG5cdFx0XHRcdFx0XHRcdGNvbHVtbiAgICA6IGNvbHVtbixcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyIDogY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0c2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0c1tpZF0ubm9kZSgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fSkoc2V0dGluZ3MubmFtaW5nKSA6XG5cdFx0XHRcdFx0Ly90aGlzIGlzIGp1c3QgYW4gZW1wdHkgc3BhY2UgKF8pXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVx0XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Zm4uYXBwZW5kKCRyb3cpO1xuXHRcdH0pO1xuXHRcblx0XHQvL2lmIHRoZXJlJ3JlIGFueSBsZWdlbmQgaXRlbXMgdG8gYmUgcmVuZGVyZWRcblx0XHRzZXR0aW5ncy5sZWdlbmQuaXRlbXMubGVuZ3RoID8gKGZ1bmN0aW9uKGxlZ2VuZCkge1xuXHRcdFx0Ly9laXRoZXIgdXNlIHVzZXItZGVmaW5lZCBjb250YWluZXIgb3IgY3JlYXRlIG91ciBvd24gYW5kIGluc2VydCBpdCByaWdodCBhZnRlciB0aGUgc2VhdCBjaGFydCBkaXZcblx0XHRcdHZhciAkY29udGFpbmVyID0gKGxlZ2VuZC5ub2RlIHx8ICQoJzxkaXY+PC9kaXY+JykuaW5zZXJ0QWZ0ZXIoZm4pKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kJyk7XG5cdFx0XHRcdFxuXHRcdFx0dmFyICR1bCA9ICQoJzx1bD48L3VsPicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRMaXN0Jylcblx0XHRcdFx0LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXHRcdFx0XG5cdFx0XHQkLmVhY2gobGVnZW5kLml0ZW1zLCBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kSXRlbScpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHRcdFx0Ly9tZXJnZSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIG91ciBzdGFuZGFyZCBvbmVzXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsIGl0ZW1bMV1dLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdHNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dID09IFwidW5kZWZpbmVkXCIgPyBbXSA6IHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dLmNsYXNzZXMpLmpvaW4oJyAnKVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxzcGFuPjwvc3Bhbj4nKVxuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmREZXNjcmlwdGlvbicpXG5cdFx0XHRcdFx0XHRcdFx0LnRleHQoaXRlbVsyXSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gJGNvbnRhaW5lcjtcblx0XHR9KShzZXR0aW5ncy5sZWdlbmQpIDogbnVsbDtcblx0XG5cdFx0Zm4uYXR0cih7XG5cdFx0XHR0YWJJbmRleCA6IDBcblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHQvL3doZW4gY29udGFpbmVyJ3MgZm9jdXNlZCwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3Qgc2VhdFxuXHRcdGZuLmZvY3VzKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpKSB7XG5cdFx0XHRcdHNlYXRzW2ZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0Zm4uZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpOmZpcnN0JykuZm9jdXMoKTtcblx0XHRcdHNlYXRzW3NlYXRJZHNbMF1dLmZvY3VzKCk7XG5cblx0XHR9KTtcblx0XG5cdFx0Ly9wdWJsaWMgbWV0aG9kcyBvZiBzZWF0Q2hhcnRzXG5cdFx0Zm4uZGF0YSgnc2VhdENoYXJ0cycsIHtcblx0XHRcdHNlYXRzICAgOiBzZWF0cyxcblx0XHRcdHNlYXRJZHMgOiBzZWF0SWRzLFxuXHRcdFx0Ly9zZXQgZm9yIG9uZSwgc2V0IGZvciBtYW55LCBnZXQgZm9yIG9uZVxuXHRcdFx0c3RhdHVzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gZm4uc2VhdHNbYXJndW1lbnRzWzBdXS5zdGF0dXMoKSA6IChmdW5jdGlvbihzZWF0c0lkcywgbmV3U3RhdHVzKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBmbi5zZWF0c1tzZWF0c0lkc10uc3RhdHVzKG5ld1N0YXR1cykgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdElkXS5zdGF0dXMobmV3U3RhdHVzKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH0pKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHRcdH0sXG5cdFx0XHRlYWNoICA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgc2VhdElkIGluIGZuLnNlYXRzKSB7XG5cdFx0XHRcdFx0aWYgKGZhbHNlID09PSBjYWxsYmFjay5jYWxsKGZuLnNlYXRzW3NlYXRJZF0sIHNlYXRJZCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0SWQ7Ly9yZXR1cm4gbGFzdCBjaGVja2VkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdC8vYmFzaWNhbGx5IGNyZWF0ZSBhIENTUyBxdWVyeSB0byBnZXQgYWxsIHNlYXRzIGJ5IHRoZWlyIERPTSBpZHNcblx0XHRcdFx0cmV0dXJuICQoJyMnICsgZm4uc2VhdElkcy5qb2luKCcsIycpKTtcblx0XHRcdH0sXG5cblx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbihxdWVyeSkgey8vRCwgYS5hdmFpbGFibGUsIHVuYXZhaWxhYmxlXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFxuXHRcdFx0XHQvL2lzIFJlZ0V4cFxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQubWF0Y2gocXVlcnkpKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2goaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgIChxdWVyeS5sZW5ndGggPT0gMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgc2VhcmNoZXMganVzdCBmb3IgYSBwYXJ0aWN1YWwgY2hhcmFjdGVyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShxdWVyeSkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHJ1bnMgYSBtb3JlIHNvcGhpc3RpY2F0ZWQgcXVlcnksIHNvIGxldCdzIHNlZSBpZiB0aGVyZSdzIGEgZG90XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkuaW5kZXhPZignLicpID4gLTEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlcmUncyBhIGRvdCB3aGljaCBzZXBhcmF0ZXMgY2hhcmFjdGVyIGFuZCB0aGUgc3RhdHVzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHF1ZXJ5LnNwbGl0KCcuJyk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKHNlYXRJZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IHBhcnRzWzBdICYmIHRoaXMuc3RhdHVzKCkgPT0gcGFydHNbMV0pIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IHF1ZXJ5KSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0c2V0ICAgICAgICA6IGZ1bmN0aW9uIHNldCgpIHsvL2luaGVyaXRzIHNvbWUgbWV0aG9kc1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzZWF0cyAgICAgIDogW10sXG5cdFx0XHRcdFx0c2VhdElkcyAgICA6IFtdLFxuXHRcdFx0XHRcdGxlbmd0aCAgICAgOiAwLFxuXHRcdFx0XHRcdHN0YXR1cyAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHR0aGF0ID0gdGhpcztcblx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBqdXN0IG9uZSBzZWF0IGluIHRoZSBzZXQgYW5kIHVzZXIgZGlkbid0IHBhc3MgYW55IHBhcmFtcywgcmV0dXJuIGN1cnJlbnQgc3RhdHVzXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sZW5ndGggPT0gMSAmJiBhcmdzLmxlbmd0aCA9PSAwID8gdGhpcy5zZWF0c1swXS5zdGF0dXMoKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Ly9vdGhlcndpc2UgY2FsbCBzdGF0dXMgZnVuY3Rpb24gZm9yIGVhY2ggb2YgdGhlIHNlYXRzIGluIHRoZSBzZXRcblx0XHRcdFx0XHRcdFx0JC5lYWNoKHRoYXQuc2VhdHMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdHVzLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4ubm9kZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZWFjaCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmVhY2guY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0ICAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmdldC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZmluZC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZXQuY2FsbChmbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwdXNoICAgICAgIDogZnVuY3Rpb24oaWQsIHNlYXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdHMucHVzaChzZWF0KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdCsrdGhpcy5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdC8vZ2V0IG9uZSBvYmplY3Qgb3IgYSBzZXQgb2Ygb2JqZWN0c1xuXHRcdFx0Z2V0ICAgOiBmdW5jdGlvbihzZWF0c0lkcykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXG5cdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBcblx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0c0lkc10gOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZuLnNlYXRzW3NlYXRJZF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VhdFNldC5wdXNoKHNlYXRJZCwgZm4uc2VhdHNbc2VhdElkXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdFNldDtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBmbi5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdH1cblx0XG5cdFxufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=