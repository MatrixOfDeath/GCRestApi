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
            //alert('Problème vérifcation de panier');
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
            $('.panier-menu').show("slide", { direction: "right" }, 1000);
            $('.reservation-result-container').removeClass('col-md-12').addClass('col-md-9');

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
            $('.panier-menu').show("slide", { direction: "right" }, 1000);
            $('.reservation-result-container').removeClass('col-md-12').addClass('col-md-9');

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
            $('.panier-menu').show("slide", { direction: "right" }, 1000);
            $('.reservation-result-container').removeClass('col-md-12').addClass('col-md-9');
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
            $('.reservation-result-container').removeClass('col-md-9').addClass('col-md-12');
            $('.panier-menu').hide("slide", { direction: "left" }, 600);
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
            $('.reservation-result-container').removeClass('col-md-9').addClass('col-md-12');
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
    //$('.panier-menu').toggleClass('col-md-3 col-md-0')
    $('.reservation-result-container').removeClass('col-md-9').addClass('col-md-12');
    $('.panier-menu').hide("slide", { direction: "left" }, 600);

    $('#tab-link-validation').removeClass('grayForbiddenLink');
    $('#tab-link-validation > span').removeClass('grayForbidden');
}

function unblockPaymentTab() {
    //$('.panier-menu').toggleClass('col-md-3 col-md-0')
    $('.reservation-result-container').removeClass('col-md-9').addClass('col-md-12');
    $('.panier-menu').hide("slide", { direction: "left" }, 600);

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
    var date = $('#datepicker-altFormat').val();

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
            $('.panier-menu').show("slide", { direction: "right" }, 1000);
            $('.reservation-result-container').removeClass('col-md-12').addClass('col-md-9');
        },
        error: function error(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de places');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjM4ODU3NWMyN2ZhZjI4OTUyYjciLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tQbGFjZURpc3BvRGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENob2l4UGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4UGFuaWVyLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4VmlsbGVzLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJvbiIsImFqYXgiLCJ1cmwiLCJSb3V0aW5nIiwiZ2VuZXJhdGUiLCJ0eXBlIiwiZGF0YSIsInZhbCIsImFzeW5jIiwic3VjY2VzcyIsInJlc3BvbnNlUGFuaWVyIiwidGV4dFN0YXR1cyIsImVtcHR5IiwiYXBwZW5kIiwicmVmcmVzaFBhbmllckljb25NZW51IiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiYWxlcnQiLCJlZmZlY3QiLCJ0aW1lcyIsInJlYWR5IiwicmVzcG9uc2UiLCJ1bmJsb2NrQWRyZXNzZVRhYiIsInRoYXQiLCJsb2FkIiwiZmFkZUluIiwicmVzcG9uc2VQcm9kdWl0cyIsImhpZGUiLCJmYWRlT3V0Iiwic2hvdyIsImRpcmVjdGlvbiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJ0YWIiLCJjaG9peERlYnV0IiwidGV4dCIsImNob2l4RmluIiwiZGF0ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1TZXJpYWxpemUiLCJzZXJpYWxpemUiLCJ1bmJsb2NrVmFsaWRhdGlvblRhYiIsImlkIiwidG9rZW4iLCJ0b3RhbFRUQyIsInByaXgiLCJQYXlwbHVnIiwic2hvd1BheW1lbnQiLCJ2YWxpZGVBamF4UGFuaWVyIiwidW5ibG9ja1BheW1lbnRUYWIiLCJnZXRNYXAiLCJpZFBsYWNlIiwiYXR0ciIsImlzRGlzcG8iLCJpZFNhbGxlIiwiZXZlbnQiLCJ1aSIsImFqYXhSZWNoZXJjaGVTYWxsZXMiLCJsZW5ndGgiLCIkdXJsIiwic2NfZ2xvYmFsIiwic3RhdHVzIiwiU3RyaW5nIiwiZmluZCIsInZhbHVlIiwicmVmcmVzaFBhbmllciIsImV2IiwiY3AiLCJiZWZvcmVTZW5kIiwicmVtb3ZlIiwiZWFjaCIsInZpbGxlIiwiaW5kZXgiLCJrZXl1cCIsImZpcnN0U2VhdExhYmVsIiwiaW5pdENhcnRlSW50ZXJhY3RpdmUiLCJtYXAiLCIkY2FydCIsIiRjb3VudGVyIiwiJHRvdGFsIiwic2MiLCJzZWF0Q2hhcnRzIiwicGFyc2VKU09OIiwic2VhdHMiLCJuIiwicHJpY2UiLCJjbGFzc2VzIiwiY2F0ZWdvcnkiLCJwIiwiZiIsIm5hbWluZyIsInRvcCIsImdldExhYmVsIiwiY2hhcmFjdGVyIiwicm93IiwiY29sdW1uIiwibGVnZW5kIiwibm9kZSIsIml0ZW1zIiwiY2xpY2siLCJzZXR0aW5ncyIsImxhYmVsIiwiYXBwZW5kVG8iLCJyZWNhbGN1bGF0ZVRvdGFsIiwic3R5bGUiLCJnZXQiLCJwYXJlbnRzIiwic2V0SW50ZXJ2YWwiLCJkYXRhVHlwZSIsInBsYWNlIiwiaWRwbGFjZSIsImZuIiwidG90YWwiLCJqUXVlcnkiLCJzZXR1cCIsInNlYXRJZHMiLCJhbmltYXRlIiwibGVmdCIsImdldElkIiwiZm9jdXMiLCJibHVyIiwic2VhdCIsInNlYXRDaGFydHNTZXR0aW5ncyIsImV4dGVuZCIsIiRub2RlIiwicm9sZSIsImZvY3VzYWJsZSIsInRhYkluZGV4IiwiY29uY2F0Iiwiam9pbiIsImNoYXIiLCJhcmd1bWVudHMiLCJuZXdTdHlsZSIsIm9sZFN0eWxlIiwic3dpdGNoQ2xhc3MiLCJzZWF0U2V0dGluZ3MiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImFwcGx5IiwiJHNlYXQiLCIkbmV3U2VhdCIsIndoaWNoIiwiZmluZEF2YWlsYWJsZSIsIiRyb3dzIiwiJHNlYXRzIiwiJGN1cnJlbnRSb3ciLCIkbmV3Um93IiwibGFzdCIsImZpcnN0IiwiZXEiLCJoYXNDbGFzcyIsInJvd3MiLCJpIiwicHVzaCIsImNvbHVtbnMiLCJzcGxpdCIsIiRoZWFkZXJSb3ciLCJjaGFyYWN0ZXJzIiwiJHJvdyIsIm1hdGNoIiwiY2hhcmFjdGVyUGFyYW1zIiwibWF0Y2hlcyIsInBhcmFtcyIsIm92ZXJyaWRlSWQiLCJvdmVycmlkZUxhYmVsIiwiJGNvbnRhaW5lciIsImluc2VydEFmdGVyIiwiJHVsIiwiaXRlbSIsInNlYXRzSWRzIiwibmV3U3RhdHVzIiwic2VhdElkIiwiY2FsbCIsInF1ZXJ5Iiwic2VhdFNldCIsInNldCIsIlJlZ0V4cCIsImluZGV4T2YiLCJwYXJ0cyIsImFyZ3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZE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UUFBUCxJQUFtQixRQUFuQixHQUNOMUQsR0FBRzVCLEtBQUgsQ0FBU3NGLFFBQVQsQ0FETSxHQUNnQixZQUFXOztBQUVoQyxTQUFJSyxVQUFVL0QsR0FBR2dFLEdBQUgsRUFBZDs7QUFFQXBMLE9BQUUyRSxJQUFGLENBQU9tRyxRQUFQLEVBQWlCLFVBQVNqRyxLQUFULEVBQWdCbUcsTUFBaEIsRUFBd0I7QUFDeEMsVUFBSSxRQUFPNUQsR0FBRzVCLEtBQUgsQ0FBU3dGLE1BQVQsQ0FBUCxNQUE0QixRQUFoQyxFQUEwQztBQUN6Q0csZUFBUXJCLElBQVIsQ0FBYWtCLE1BQWIsRUFBcUI1RCxHQUFHNUIsS0FBSCxDQUFTd0YsTUFBVCxDQUFyQjtBQUNBO0FBQ0QsTUFKRDs7QUFNQSxZQUFPRyxPQUFQO0FBQ0EsS0FYb0IsRUFEdEI7QUFhQTtBQS9Jb0IsR0FBdEI7O0FBa0pBLFNBQU8vRCxHQUFHNUcsSUFBSCxDQUFRLFlBQVIsQ0FBUDtBQUNBLEVBbm1CRDtBQXNtQkEsQ0ExbUJELEVBMG1CRzhHLE1BMW1CSCxFIiwiZmlsZSI6ImFqYXguZGIzNTYxNWVjZjUzYjRlZDhjZTQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjM4ODU3NWMyN2ZhZjI4OTUyYjciLCIgICAgLy8gQWpvdXQgZCd1biBwcm9kdWl0IGF1IHBhbmllciBhamF4XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25BZGRQcm9kdWN0UGFuaWVyJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9ham91dF9wcm9kdWl0X3BhbmllcicpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBSYWZyYWljaGlzc2VtZW50IGR1IHBhbmllciBhamF4XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllckljb25NZW51KCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGFuaWVyX2ljb25fbWVudScpLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQoJyNwYW5pZXItaWNvbi1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpLmVmZmVjdCggXCJib3VuY2VcIiwge3RpbWVzOjN9LCAzMDAgKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4QWpvdXRQcm9kdWl0UGFuaWVyLmpzIiwiLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIFByb2R1aXQgIzJcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3Bhbmllcl9pc19ub3RfZW1wdHknKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgaWYocmVzcG9uc2UgPSBcIlN1Y2Nlc3NcIil7XG4gICAgICAgICAgICAgICAgdW5ibG9ja0FkcmVzc2VUYWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIC8vYWxlcnQoJ1Byb2Jsw6htZSB2w6lyaWZjYXRpb24gZGUgcGFuaWVyJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vICQuYWpheCh7XG4gICAgLy8gICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWxsb3dlZF92YWxpZGF0aW9uJyksXG4gICAgLy8gICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgLy8gICAgIGFzeW5jOiB0cnVlLFxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpIHtcbiAgICAvLyAgICAgICAgIGlmKHJlc3BvbnNlID0gXCJTdWNjZXNzXCIpe1xuICAgIC8vICAgICAgICAgICAgIHVuYmxvY2tWYWxpZGF0aW9uVGFiKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgLy8gICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFjY8OocyDDoCBsYSB2YWxpZGF0aW9uJyk7XG4gICAgLy8gICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuICAgIC8vXG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXByb2R1aXQnLCBmdW5jdGlvbigpe1xuXG4gICAgLy8gdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgLy8gdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICAvLyB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAvLyB2YXIgaWRTYWxsZSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGlkU2FsbGUgKyAnaWRzYWxsZScpO1xuICAgIC8vICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVByb2R1aXRzKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCkuZmFkZU91dCgpO1xuICAgICAgICAgICAgJCgnLnBhbmllci1tZW51Jykuc2hvdyhcInNsaWRlXCIsIHsgZGlyZWN0aW9uOiBcInJpZ2h0XCIgfSwgMTAwMCk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tcmVzdWx0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtMTInKS5hZGRDbGFzcygnY29sLW1kLTknKTtcblxuICAgICAgICAgICAgLy8gJC5nZXQoUm91dGluZy5nZW5lcmF0ZSgnJyksIGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgLy8gICAgICQoJyNkaXNwbGF5LXBhbmllcicpLmVtcHR5KCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcsOpY3Vww6lyYXRpb24gZGVzIHByb2R1dGlzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbi8vIExvcnNxdSdvbiBjbGlxdWUgc3VyIGxhIGJvdXRvbiBTYWxsZSAjMVxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1zYWxsZScsIGZ1bmN0aW9uKCl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZScpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1Jykuc2hvdyhcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5zaG93KFwic2xvd1wiKTtcbiAgICAgICAgICAgICQoJy5wYW5pZXItbWVudScpLnNob3coXCJzbGlkZVwiLCB7IGRpcmVjdGlvbjogXCJyaWdodFwiIH0sIDEwMDApO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXJlc3VsdC1jb250YWluZXInKS5yZW1vdmVDbGFzcygnY29sLW1kLTEyJykuYWRkQ2xhc3MoJ2NvbC1tZC05Jyk7XG5cbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuLy8gLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIFBsYWNlICMxYmlzXG4vLyAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXBsYWNlJywgZnVuY3Rpb24oKXtcbi8vICAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuLy8gICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuLy8gICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4vLyAgICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4vL1xuLy8gICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbi8vICAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuLy9cbi8vICAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuLy9cbi8vICAgICB0aGF0ID0gJCh0aGlzKTtcbi8vXG4vLyAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuLy8gICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuLy9cbi8vICAgICAkLmFqYXgoe1xuLy8gICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3BsYWNlc19kaXNwb25pYmxlJyksXG4vLyAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuLy8gICAgICAgICBkYXRhOiB7XG4vLyAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4vLyAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbi8vICAgICAgICAgfSxcbi8vICAgICAgICAgYXN5bmM6IHRydWUsXG4vLyAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5zaG93KFwic2xvd1wiKTtcbi8vICAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLnNob3coXCJzbG93XCIpO1xuLy8gICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcbi8vXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbi8vICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBwbGFjZXMnKTtcbi8vICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG4vL1xuLy8gICAgICAgICB9XG4vLyAgICAgfSk7XG4vLyAgICAgcmV0dXJuIGZhbHNlO1xuLy9cbi8vIH0pO1xuXG4vLyBMb3JzcXUnb24gY2xpcXVlIHN1ciBsYSBib3V0b24gRmFjdHVyYXRpb24gIzNcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstZmFjdHVyYXRpb24nLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9hZHJlc3Nlc19wYW5pZXInKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZShcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucGFuaWVyLW1lbnUnKS5zaG93KFwic2xpZGVcIiwgeyBkaXJlY3Rpb246IFwicmlnaHRcIiB9LCAxMDAwKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1yZXN1bHQtY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2NvbC1tZC0xMicpLmFkZENsYXNzKCdjb2wtbWQtOScpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgZFxcJ2FjY2VzIMOgIGxhIHBhZ2UgZGVzIGFkcmVzc2VzIGRlIGZhY3R1cmF0aW9uICcpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbi8vIExvcnNxdSdvbiBjbGlxdWUgc3VyIGxhIGJvdXRvbiBWYWxpZGF0aW9uICM0XG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXZhbGlkYXRpb24nLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudGFiKCdzaG93Jyk7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3ZhbGlkYXRpb25fcGFuaWVyJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZShcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tcmVzdWx0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtOScpLmFkZENsYXNzKCdjb2wtbWQtMTInKTtcbiAgICAgICAgICAgICQoJy5wYW5pZXItbWVudScpLmhpZGUoXCJzbGlkZVwiLCB7IGRpcmVjdGlvbjogXCJsZWZ0XCIgfSwgNjAwKTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgZFxcJ2FjY2VzIMOgIGxhIHBhZ2UgZGVzIGFkcmVzc2VzIGRlIGZhY3R1cmF0aW9uICcpO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG4vLyAkKCcjZm9ybS12YWxpZC1hZHJlc3NlJykuYWpheEZvcm0oe1xuLy8gICAgIHRhcmdldDogJyNkaXNwbGF5LXNhbGxlJ1xuLy8gfSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdzdWJtaXQnLCAnI2Zvcm0tdmFsaWQtYWRyZXNzZScsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHVybCA9IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfdmFsaWRhdGlvbl9wYW5pZXInKTtcbiAgICB2YXIgZm9ybVNlcmlhbGl6ZSA9ICQodGhpcykuc2VyaWFsaXplKCk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF92YWxpZGF0aW9uX3BhbmllcicpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YTogZm9ybVNlcmlhbGl6ZSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgdW5ibG9ja1ZhbGlkYXRpb25UYWIoKTtcbiAgICAgICAgICAgICQoJyN0YWItbGluay12YWxpZGF0aW9uJykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpXG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKFwic2xvd1wiKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1yZXN1bHQtY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2NvbC1tZC05JykuYWRkQ2xhc3MoJ2NvbC1tZC0xMicpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZSB2YWxpZGF0aW9uJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc3VibWl0JywgJyNhamF4UGF5bWVudCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdmFyIGRhdGEgPSB7fTtcbiAgICAvLyBkYXRhWyQodGhpcykuY2hpbGRyZW4oJ2lucHV0JykuYXR0cigndG9rZW4nKV0gPSAkKHRoaXMpLmNoaWxkcmVuKCkuYXR0cigndG9rZW4nKS52YWwoKTtcbiAgICAvLyBkYXRhWyQodGhpcykuY2hpbGRyZW4oJ2ludXB1dCcpLmF0dHIoJ3RvdGFsVFRDJyldID0gJCh0aGlzKS5jaGlsZHJlbigpLmF0dHIoJ3RvdGFsVFRDJykudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BhaWVtZW50X2NvbW1hbmRlJywge2lkOiAgJCgnLmlkY29tbWFuZGUnKS52YWwoKX0pLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0ZTogJCgnLmlkY29tbWFuZGUnKS52YWwoKSxcbiAgICAgICAgICAgIHRva2VuOiAkKCcudG9rZW4nKS52YWwoKSxcbiAgICAgICAgICAgIHRvdGFsVFRDOiAkKCcudG90YWxUVEMnKS52YWwoKSxcbiAgICAgICAgICAgIHByaXg6ICQoJy5wcml4JykudmFsKCksXG5cbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgUGF5cGx1Zy5zaG93UGF5bWVudChyZXNwb25zZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZSB2YWxpZGF0aW9uJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc3VibWl0JywgJyNhamF4QWRkTmV3QWRyZXNzZScsICBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1cmwgPSBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2FkcmVzc2VzX3BhbmllcicpO1xuICAgIHZhciBmb3JtU2VyaWFsaXplID0gJCh0aGlzKS5zZXJpYWxpemUoKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWRyZXNzZXNfcGFuaWVyJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBmb3JtU2VyaWFsaXplLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZShcInNsb3dcIik7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGRcXCdhY2NlcyDDoCBsYWpvdXQgZGUgbGFkcmVzc2UnKTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24udmFsaWRQYW5pZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFsaWRlQWpheFBhbmllcigpO1xufSk7XG5cbmZ1bmN0aW9uIHZhbGlkZUFqYXhQYW5pZXIoKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9hZHJlc3Nlc19wYW5pZXInKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVuYmxvY2tBZHJlc3NlVGFiKCk7XG4gICAgICAgICAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24nKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZShcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKFwic2xvd1wiKTtcblxuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZXMgYWRyZXNzZXMgZGUgZmFjdHVyYXRpb24gJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gdW5ibG9ja0FkcmVzc2VUYWIoKXtcbiAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24gPiBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gdW5ibG9ja1ZhbGlkYXRpb25UYWIoKXtcbiAgICAvLyQoJy5wYW5pZXItbWVudScpLnRvZ2dsZUNsYXNzKCdjb2wtbWQtMyBjb2wtbWQtMCcpXG4gICAgJCgnLnJlc2VydmF0aW9uLXJlc3VsdC1jb250YWluZXInKS5yZW1vdmVDbGFzcygnY29sLW1kLTknKS5hZGRDbGFzcygnY29sLW1kLTEyJyk7XG4gICAgJCgnLnBhbmllci1tZW51JykuaGlkZShcInNsaWRlXCIsIHsgZGlyZWN0aW9uOiBcImxlZnRcIiB9LCA2MDApO1xuXG4gICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstdmFsaWRhdGlvbiA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrUGF5bWVudFRhYigpe1xuICAgIC8vJCgnLnBhbmllci1tZW51JykudG9nZ2xlQ2xhc3MoJ2NvbC1tZC0zIGNvbC1tZC0wJylcbiAgICAkKCcucmVzZXJ2YXRpb24tcmVzdWx0LWNvbnRhaW5lcicpLnJlbW92ZUNsYXNzKCdjb2wtbWQtOScpLmFkZENsYXNzKCdjb2wtbWQtMTInKTtcbiAgICAkKCcucGFuaWVyLW1lbnUnKS5oaWRlKFwic2xpZGVcIiwgeyBkaXJlY3Rpb246IFwibGVmdFwiIH0sIDYwMCk7XG5cbiAgICAkKCcjdGFiLWxpbmstcGFpZW1lbnQnKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstcGFpZW1lbnQgPiBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW4nKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoYW5nZVR1bm5lbEFjaGF0LmpzIiwiJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5idXR0b25TZWFyY2gnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGVja0Rpc3BvRGF0ZS5qcyIsIiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24uYnV0dG9uU2VhcmNoUGxhY2UnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGxhY2VzX2Rpc3BvbmlibGUnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIC8vaW5pdENhcnRlSW50ZXJhY3RpdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAkKHRoaXMpLmdldE1hcCgpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBwbGFjZXMnKTtcblxuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrUGxhY2VEaXNwb0RhdGUuanMiLCIvLyBBam91dCBkJ3VuZSBzYWxsZSBlbiBhamF4IGF1IGNsaWNrIGR1IGJvdXRvbiBDaG9pc2lyIFNhbGxlXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnZGl2LnNlYXRDaGFydHMtc2VhdC5zZWF0Q2hhcnRzLWNlbGwnLCBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcblxuICAgIHZhciBpZFBsYWNlID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcbiAgICAkKCcjdGFiLWxpbmstcHJvZHVpdCcpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgLy8gMS0gT24gdsOpcmlmaWUgbGEgZGlzcG9uYmlsaXTDqSBkZSBsYSBzYWxsZVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGxhY2VzX2Rpc3BvbmlibGVfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICBcImlkUGxhY2VcIiA6IGlkUGxhY2UsXG4gICAgICAgICAgICBcImRhdGVcIjogZGF0ZVxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoaXNEaXNwbywgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaXNEaXNwbyA9ICcxJykge1xuICAgICAgICAgICAgICAgIC8vMi0gT24gYWpvdXRlIGxhIHNhbGxlIGNob2lzaSBkYW5zIHNlc3Npb24gZHUgcGFuaWVyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdham91dF9wYW5pZXJfcGxhY2UnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiIDogaWRQbGFjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBkYXRlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86w6AgbWV0dHJlIGVuIHBhcmFsbMOobGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy0gT24gbWV0cyDDoCBqb3VyIGxlIHBhbmllciBhamF4XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc0Rpc3BvID0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBhbmllckljb25NZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmJsb2NrQWRyZXNzZVRhYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gNC0gT24gY2hhcmdlIGxhIHZ1ZSBkZXMgcHJvZHVpdHMgYWpheFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQcm9kdWl0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoKS5mYWRlT3V0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdMYSBwbGFjZSBuXFwnZXN0IHBsdXMgZGlzcG9uaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IGRlIGxhIHBsYWNlIGNob2lzaScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIDItXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgc2FsbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyAxLVxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGxvcnMgZGUgbGEgdsOpcmlmaWNhdGlvbiBkZSBsYSBkaXNwb25pYmlsaXTDqSBkZSBsYSBzYWxsZSBuwrAnKyBpZFNhbGxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuZnVuY3Rpb24gdW5ibG9ja0FkcmVzc2VUYWIoKXtcbiAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24gPiBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gdW5ibG9ja1ZhbGlkYXRpb25UYWIoKXtcbiAgICAkKCcjdGFiLWxpbmstdmFsaWRhdGlvbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuTGluaycpO1xuICAgICQoJyN0YWItbGluay12YWxpZGF0aW9uID4gc3BhbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpe1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9wYW5pZXJfaWNvbl9tZW51JyksXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNwYW5pZXItaWNvbi1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpLmVmZmVjdCggXCJib3VuY2VcIiwge3RpbWVzOjN9LCAzMDAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFBsYWNlLmpzIiwiLy8gQWpvdXQgZCd1bmUgc2FsbGUgZW4gYWpheCBhdSBjbGljayBkdSBib3V0b24gQ2hvaXNpciBTYWxsZVxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2J1dHRvbi5idG4tc3VjY2Vzcy5idXR0b25BZGRTYWxsZScsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIC8vIHZhciBhcnJUaW1lID0gJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbCgpLnNwbGl0KCc6Jyk7XG4gICAgLy8gdmFyIGRhdGVEdUpvdXIgPSBhcnJUaW1lWzJdO1xuICAgIHZhciBpZFNhbGxlID0gJCh0aGlzKS52YWwoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICBjb25zb2xlLmxvZygnZGF0ZSBhbHRGb3JtYXQnICsgZGF0ZSk7XG5cblxuICAgIC8vY29uc29sZS5sb2coaWRTYWxsZSArICdpZHNhbGxlJyk7XG4gICAvLyAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG4gICAgJCgnI3RhYi1saW5rLXByb2R1aXQnKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcblxuICAgIC8vIDEtIE9uIHbDqXJpZmllIGxhIGRpc3BvbmJpbGl0w6kgZGUgbGEgc2FsbGVcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlX2FqYXgnKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgXCJpZFNhbGxlXCIgOiBpZFNhbGxlLFxuICAgICAgICAgICAgXCJkYXRlXCI6IGRhdGVcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGlzRGlzcG8sIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGlzRGlzcG8gPSAnMScpIHtcbiAgICAgICAgICAgICAgICAvLzItIE9uIGFqb3V0ZSBsYSBzYWxsZSBjaG9pc2kgZGFucyBzZXNzaW9uIGR1IHBhbmllclxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpvdXRfcGFuaWVyX3NhbGxlJyksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIiA6IGlkU2FsbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogZGF0ZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOsOgIG1ldHRyZSBlbiBwYXJhbGzDqGxlID9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMtIE9uIG1ldHMgw6Agam91ciBsZSBwYW5pZXIgYWpheFxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNEaXNwbyA9ICcxJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5ibG9ja0FkcmVzc2VUYWIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQtIE9uIGNoYXJnZSBsYSB2dWUgZGVzIHByb2R1aXRzIGFqYXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwcm9kdWl0c19hamF4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQcm9kdWl0cywgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUHJvZHVpdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCkuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKCkuZmFkZU91dCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA0LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByw6ljdXDDqXJhdGlvbiBkZXMgcHJvZHV0aXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnTGEgc2FsbGUgblxcJ2VzdCBwbHVzIGRpc3BvbmlibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBham91dCBkZSBsYSBzYWxsZSBjaG9pc2knKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyAyLVxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IHNhbGxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gMS1cbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBsb3JzIGRlIGxhIHbDqXJpZmljYXRpb24gZGUgbGEgZGlzcG9uaWJpbGl0w6kgZGUgbGEgc2FsbGUgbsKwJysgaWRTYWxsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbmZ1bmN0aW9uIHVuYmxvY2tBZHJlc3NlVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW5MaW5rJyk7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uID4gc3BhbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2tWYWxpZGF0aW9uVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstdmFsaWRhdGlvbiA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG4kKGRvY3VtZW50KS5vbignc2xpZGVzdG9wJywgJyNzbGlkZXItcmFuZ2UnICwgZnVuY3Rpb24oZXZlbnQsIHVpKXtcblxuICAgIGFqYXhSZWNoZXJjaGVTYWxsZXMoKTtcbn0pO1xuXG5mdW5jdGlvbiByZWZyZXNoUGFuaWVySWNvbk1lbnUoKXtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGFuaWVyX2ljb25fbWVudScpLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjcGFuaWVyLWljb24tbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKS5lZmZlY3QoIFwiYm91bmNlXCIsIHt0aW1lczozfSwgMzAwICk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhamF4UmVjaGVyY2hlU2FsbGVzKCl7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAvLyB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIC8vIHZhciBkYXRlRHVKb3VyID0gYXJyVGltZVsyXTtcbiAgICAvLyBpZiAoIWRhdGUgJiYgIWRhdGVEdUpvdXIpe1xuICAgIC8vICAgICBkYXRlID0gZGF0ZUR1Sm91cjtcbiAgICAvLyB9XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICBpZigkKCcjdGFiLWxpbmstcGxhY2UnKS5sZW5ndGgpXG4gICAgICAgICR1cmwgPSAncGxhY2VzX2Rpc3BvbmlibGUnO1xuICAgIGVsc2VcbiAgICAgICAgJHVybCA9ICdzYWxsZXNfZGlzcG9uaWJsZSc7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCR1cmwpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcblxuXG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG4gICAgICAgICAgICBpZigkKCcjdGFiLWxpbmstcGxhY2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmdldE1hcCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwiICAgIC8vIFN1cHByZXNzaW9uIGQndW5lIHNhbGxlIGRlcHVpcyBsZSBQcm9kdWl0IEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBTdXBwcmVzc2lvbiBkJ3VuZSBzYWxsZSBkZXB1aXMgbGUgUGFuaWVyIEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVNhbGxlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyX3NhbGxlJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkc2FsbGVcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIC8vIFN1cHByZXNzaW9uIGQndW5lIHBsYWNlIGRlcHVpcyBsZSBQYW5pZXIgQWpheFxuICAgIC8vICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnV0dG9uRGVsZXRlUGxhY2UnLCBmdW5jdGlvbigpe1xuICAgIC8vICAgICAkLmFqYXgoe1xuICAgIC8vICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXJfcGxhY2UnKSxcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgICAgIFwiaWRwbGFjZVwiOiAkKHRoaXMpLnZhbCgpXG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbiAgICAvLyAgICAgICAgICAgICAkLmFqYXgoe1xuICAgIC8vICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Bhbmllcl9hamF4JyksXG4gICAgLy8gICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgIC8vICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAvLyAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgIC8vICAgICAgICAgICAgICAgICB7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBwbGFjZXMnKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9KTtcblxuXG4gICAgLy8gU3VwcHJlc3Npb24gZCd1bmUgcGxhY2UgZGVwdWlzIGxlIFBhbmllciBBamF4XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVQbGFjZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfZGVsZXRlX3Bhbmllcl9wbGFjZScpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZHBsYWNlXCI6ICQodGhpcykudmFsKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuc2NfZ2xvYmFsLnN0YXR1cyhTdHJpbmcoJCh0aGlzKS52YWwoKSksICdhdmFpbGFibGUnKTtcblxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHBsYWNlcycpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIE1vZGlmaWNhdGlvbiBsaXZlIGFqYXggZGUgbGEgcXVhbnRpdMOpIHBvdXIgdW4gcHJvZHVpdFxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnc2VsZWN0LnNlbGVjdC1xdGUtcHJvZHVpdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBhbGVydCggdGhpcy52YWx1ZSArICdpZHByb2R1aXQnKyAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5idXR0b25EZWxldGVQcm9kdWl0JykudmFsKCkgKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2Fqb3V0X3Byb2R1aXRfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnKS52YWwoKSxcbiAgICAgICAgICAgICAgICBcInF0ZVwiOiB0aGlzLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcblxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0pO1xuICAgIC8vICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnLnJvdy5wYW5pZXItbWVudScsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKVxuICAgIC8vIH0pO1xuXG5cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3Bhbmllcl9pY29uX21lbnUnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkKCcjcGFuaWVyLWljb24tbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKS5lZmZlY3QoIFwiYm91bmNlXCIsIHt0aW1lczozfSwgMzAwICk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllcigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhQYW5pZXIuanMiLCIkKCcjZGlzcGxheS1zYWxsZScpLm9uKCdrZXl1cCcsICcuY3AnLCBmdW5jdGlvbihldil7XG4gICAgY29uc29sZS5sb2coJ2tleXVwJyk7XG4gICAgaWYgKCQodGhpcykudmFsKCkubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgndmlsbGVzJyx7Y3A6ICAkKHRoaXMpLnZhbCgpfSksXG5cbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKFwiLmxvYWRpbmctdmlsbGVcIikubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJChcImZvcm0gLnZpbGxlXCIpLnBhcmVudCgpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxvYWRpbmctdmlsbGVcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChcIi52aWxsZSBvcHRpb25cIikucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLnZpbGxlLCBmdW5jdGlvbihpbmRleCx2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiLnZpbGxlXCIpLmFwcGVuZCgkKCc8b3B0aW9uPicseyB2YWx1ZSA6IHZhbHVlICwgdGV4dDogdmFsdWUgfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICQoXCIubG9hZGluZy12aWxsZVwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJChcIi52aWxsZVwiKS52YWwoJycpO1xuICAgIH1cbn0pO1xuXG4kKFwiLmNwXCIpLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdrZXl1cCcpO1xuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3ZpbGxlcycse2NwOiAgJCh0aGlzKS52YWwoKX0pLFxuXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5sb2FkaW5nLXZpbGxlXCIpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCJmb3JtIC52aWxsZVwiKS5wYXJlbnQoKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXZpbGxlXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoXCIudmlsbGUgb3B0aW9uXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS52aWxsZSwgZnVuY3Rpb24oaW5kZXgsdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIi52aWxsZVwiKS5hcHBlbmQoJCgnPG9wdGlvbj4nLHsgdmFsdWUgOiB2YWx1ZSAsIHRleHQ6IHZhbHVlIH0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmctdmlsbGVcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIudmlsbGVcIikudmFsKCcnKTtcbiAgICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4VmlsbGVzLmpzIiwidmFyIGZpcnN0U2VhdExhYmVsID0gMTtcbnZhciBzY19nbG9iYWwgPSBbXTtcblxuKGZ1bmN0aW9uKCQpIHtcbiAgICBmdW5jdGlvbiBpbml0Q2FydGVJbnRlcmFjdGl2ZShtYXApe1xuICAgICAgICB2YXIgJGNhcnQgPSAkKCcjc2VsZWN0ZWQtc2VhdHMnKSxcbiAgICAgICAgICAgICRjb3VudGVyID0gJCgnI2NvdW50ZXInKSxcbiAgICAgICAgICAgICR0b3RhbCA9ICQoJyN0b3RhbCcpLFxuXG4gICAgICAgICAgICBzYyA9ICQoJyNzZWF0LW1hcCcpLnNlYXRDaGFydHMoe1xuICAgICAgICAgICAgICAgIG1hcDogJC5wYXJzZUpTT04obWFwKSxcblxuICAgICAgICAgICAgICAgIHNlYXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIG46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2ZpcnN0LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnUGxhY2UgVklQJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdlY29ub215LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnUGxhY2UnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGY6e1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcyB1bmF2YWlsYWJsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ1BsYWNlJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hbWluZzoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdFNlYXRMYWJlbCsrO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6ICQoJyNsZWdlbmQnKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsncCcsICdhdmFpbGFibGUnLCAnUGxhY2UgZGlzcG9uaWJsZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ3VuYXZhaWxhYmxlJywgJ0TDqWrDoCByw6lzZXJ2w6knXVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQncyBjcmVhdGUgYSBuZXcgPGxpPiB3aGljaCB3ZSdsbCBhZGQgdG8gdGhlIGNhcnQgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxsaT4nICsgdGhpcy5kYXRhKCkuY2F0ZWdvcnkgKyAnIFBsYWNlICMgJyArIHRoaXMuc2V0dGluZ3MubGFiZWwgKyAnOiA8Yj7igqwnICsgdGhpcy5kYXRhKCkucHJpY2UgKyAnPC9iPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FuY2VsLWNhcnQtaXRlbVwiPlthbm51bGVyXTwvYT48L2xpPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnc2VhdElkJywgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNhcnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogTGV0cyB1cGRhdGUgdGhlIGNvdW50ZXIgYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogLmZpbmQgZnVuY3Rpb24gd2lsbCBub3QgZmluZCB0aGUgY3VycmVudCBzZWF0LCBiZWNhdXNlIGl0IHdpbGwgY2hhbmdlIGl0cyBzdGF1dHMgb25seSBhZnRlciByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqICdzZWxlY3RlZCcuIFRoaXMgaXMgd2h5IHdlIGhhdmUgdG8gYWRkIDEgdG8gdGhlIGxlbmd0aCBhbmQgdGhlIGN1cnJlbnQgc2VhdCBwcmljZSB0byB0aGUgdG90YWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpICsgdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgLSB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBpdGVtIGZyb20gb3VyIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gdmFjYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3VuYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIGFscmVhZHkgYm9va2VkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VuYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvL3RoaXMgd2lsbCBoYW5kbGUgXCJbY2FuY2VsXVwiIGxpbmsgY2xpY2tzXG4gICAgICAgICQoJyNzZWxlY3RlZC1zZWF0cycpLm9uKCdjbGljaycsICcuY2FuY2VsLWNhcnQtaXRlbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vbGV0J3MganVzdCB0cmlnZ2VyIENsaWNrIGV2ZW50IG9uIHRoZSBhcHByb3ByaWF0ZSBzZWF0LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlcGVhdCB0aGUgbG9naWMgaGVyZVxuICAgICAgICAgICAgc2MuZ2V0KCQodGhpcykucGFyZW50cygnbGk6Zmlyc3QnKS5kYXRhKCdzZWF0SWQnKSkuY2xpY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqIE9uIHJlZnJlc2ggZW4gbGl2ZSBhdXRvbWF0aXF1ZW1lbnQgbGVzIHBsYWNlcyB0b3V0ZXMgbGVzIG1pbnV0ZXMgZW4gZm9uY3Rpb24gZHUgY3LDqW5lYXUgc2VsZWN0aW9ubsOpICoqL1xuICAgICAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICAgICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICAgICAgdmFyIGlkUGxhY2UgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BsYWNlc191bmF2YWlsYWJsZScpLFxuXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICBcImlkUGxhY2VcIiA6IGlkUGxhY2UsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBkYXRlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzICA6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaXRlcmF0ZSB0aHJvdWdoIGFsbCBib29raW5ncyBmb3Igb3VyIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZSwgZnVuY3Rpb24oaW5kZXgsIHBsYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBsYWNlLmlkcGxhY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9maW5kIHNlYXQgYnkgaWQgYW5kIHNldCBpdHMgc3RhdHVzIHRvIHVuYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICBzYy5zdGF0dXMoU3RyaW5nKHBsYWNlLmlkcGxhY2UpLCAndW5hdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDYwMDAwKTsgLy9ldmVyeSA2MCBzZWNvbmRzXG4gICAgICAgIC8vbGV0J3MgcHJldGVuZCBzb21lIHNlYXRzIGhhdmUgYWxyZWFkeSBiZWVuIGJvb2tlZFxuICAgICAgICAvL3NjLmdldChbJzFfMicsICc0XzEnLCAnN18xJywgJzdfMiddKS5zdGF0dXMoJ3VuYXZhaWxhYmxlJyk7XG4gICAgICAgIHJldHVybiBzYztcbiAgICB9XG5cbiAgICAkLmZuLnNjX2dsb2JhbCA9IFtdO1xuXG4gICAgJC5mbi5nZXRNYXAgPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgICAgICAvLyQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbigpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BsYWNlc19tYXAnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtYXAsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2NfZ2xvYmFsID0gaW5pdENhcnRlSW50ZXJhY3RpdmUobWFwKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGluaXRpYWxpc2F0aW9uIGRlcyBwbGFjZXMnKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2FsY3VsYXRlVG90YWwoc2MpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMDtcblxuICAgICAgICAvL2Jhc2ljYWxseSBmaW5kIGV2ZXJ5IHNlbGVjdGVkIHNlYXQgYW5kIHN1bSBpdHMgcHJpY2VcbiAgICAgICAgc2MuZmluZCgnc2VsZWN0ZWQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRvdGFsICs9IHRoaXMuZGF0YSgpLnByaWNlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdG90YWw7XG4gICAgfVxufSkoalF1ZXJ5KTtcblxuZnVuY3Rpb24gZ2V0TWFwKCl7XG4gICAgLy8kKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGxhY2VzX21hcCcpLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1hcCwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgc2NfZ2xvYmFsID0gaW5pdENhcnRlSW50ZXJhY3RpdmUobWFwKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBpbml0aWFsaXNhdGlvbiBkZXMgcGxhY2VzJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gICAgaWYoJCgnI3NlYXQtbWFwJykubGVuZ3RoICYmICAkKCcjc2VsZWN0ZWQtc2VhdHMnKS5sZW5ndGgpe1xuXG4gICAgICAgIC8vJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGxhY2VzX21hcCcpLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1hcCwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbml0Q2FydGVJbnRlcmFjdGl2ZShtYXApO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgaW5pdGlhbGlzYXRpb24gZGVzIHBsYWNlcycpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn0pO1xuXG5mdW5jdGlvbiBpbml0Q2FydGVJbnRlcmFjdGl2ZShtYXApe1xuICAgIHZhciAkY2FydCA9ICQoJyNzZWxlY3RlZC1zZWF0cycpLFxuICAgICAgICAkY291bnRlciA9ICQoJyNjb3VudGVyJyksXG4gICAgICAgICR0b3RhbCA9ICQoJyN0b3RhbCcpLFxuXG4gICAgICAgIHNjID0gJCgnI3NlYXQtbWFwJykuc2VhdENoYXJ0cyh7XG4gICAgICAgICAgICBtYXA6ICQucGFyc2VKU09OKG1hcCksXG5cbiAgICAgICAgICAgIHNlYXRzOiB7XG4gICAgICAgICAgICAgICAgbjoge1xuICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogJ2ZpcnN0LWNsYXNzJywgLy95b3VyIGN1c3RvbSBDU1MgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdQbGFjZSBWSVAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwOiB7XG4gICAgICAgICAgICAgICAgICAgIHByaWNlOiA1LFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnUGxhY2UnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmOntcbiAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDAsXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdlY29ub215LWNsYXNzIHVuYXZhaWxhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdQbGFjZSdcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1pbmc6IHtcbiAgICAgICAgICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdldExhYmVsOiBmdW5jdGlvbiAoY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlyc3RTZWF0TGFiZWwrKztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgICAgIG5vZGU6ICQoJyNsZWdlbmQnKSxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICBbJ3AnLCAnYXZhaWxhYmxlJywgJ1BsYWNlIGRpc3BvbmlibGUnXSxcbiAgICAgICAgICAgICAgICAgICAgWydmJywgJ3VuYXZhaWxhYmxlJywgJ0TDqWrDoCByw6lzZXJ2w6knXVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0J3MgY3JlYXRlIGEgbmV3IDxsaT4gd2hpY2ggd2UnbGwgYWRkIHRvIHRoZSBjYXJ0IGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgICQoJzxsaT4nICsgdGhpcy5kYXRhKCkuY2F0ZWdvcnkgKyAnIFBsYWNlICMgJyArIHRoaXMuc2V0dGluZ3MubGFiZWwgKyAnOiA8Yj7igqwnICsgdGhpcy5kYXRhKCkucHJpY2UgKyAnPC9iPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FuY2VsLWNhcnQtaXRlbVwiPlthbm51bGVyXTwvYT48L2xpPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignaWQnLCAnY2FydC1pdGVtLScgKyB0aGlzLnNldHRpbmdzLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ3NlYXRJZCcsIHRoaXMuc2V0dGluZ3MuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNhcnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAqIExldHMgdXBkYXRlIHRoZSBjb3VudGVyIGFuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgKiAuZmluZCBmdW5jdGlvbiB3aWxsIG5vdCBmaW5kIHRoZSBjdXJyZW50IHNlYXQsIGJlY2F1c2UgaXQgd2lsbCBjaGFuZ2UgaXRzIHN0YXV0cyBvbmx5IGFmdGVyIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgKiAnc2VsZWN0ZWQnLiBUaGlzIGlzIHdoeSB3ZSBoYXZlIHRvIGFkZCAxIHRvIHRoZSBsZW5ndGggYW5kIHRoZSBjdXJyZW50IHNlYXQgcHJpY2UgdG8gdGhlIHRvdGFsLlxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgJGNvdW50ZXIudGV4dChzYy5maW5kKCdzZWxlY3RlZCcpLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgICAgICAgICAkdG90YWwudGV4dChyZWNhbGN1bGF0ZVRvdGFsKHNjKSArIHRoaXMuZGF0YSgpLnByaWNlKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdGVkJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSB0aGUgY291bnRlclxuICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIC8vYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpIC0gdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBpdGVtIGZyb20gb3VyIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZCkucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIHZhY2F0ZWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAndW5hdmFpbGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vc2VhdCBoYXMgYmVlbiBhbHJlYWR5IGJvb2tlZFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VuYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAvL3RoaXMgd2lsbCBoYW5kbGUgXCJbY2FuY2VsXVwiIGxpbmsgY2xpY2tzXG4gICAgJCgnI3NlbGVjdGVkLXNlYXRzJykub24oJ2NsaWNrJywgJy5jYW5jZWwtY2FydC1pdGVtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2xldCdzIGp1c3QgdHJpZ2dlciBDbGljayBldmVudCBvbiB0aGUgYXBwcm9wcmlhdGUgc2VhdCwgc28gd2UgZG9uJ3QgaGF2ZSB0byByZXBlYXQgdGhlIGxvZ2ljIGhlcmVcbiAgICAgICAgc2MuZ2V0KCQodGhpcykucGFyZW50cygnbGk6Zmlyc3QnKS5kYXRhKCdzZWF0SWQnKSkuY2xpY2soKTtcbiAgICB9KTtcblxuICAgIC8qKiBPbiByZWZyZXNoIGVuIGxpdmUgYXV0b21hdGlxdWVtZW50IGxlcyBwbGFjZXMgdG91dGVzIGxlcyBtaW51dGVzIGVuIGZvbmN0aW9uIGR1IGNyw6luZWF1IHNlbGVjdGlvbm7DqSAqKi9cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGxhY2VzX3VuYXZhaWxhYmxlJyksXG5cbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzcyAgOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIC8vaXRlcmF0ZSB0aHJvdWdoIGFsbCBib29raW5ncyBmb3Igb3VyIGV2ZW50XG4gICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLCBmdW5jdGlvbihpbmRleCwgcGxhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwbGFjZS5pZHBsYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgLy9maW5kIHNlYXQgYnkgaWQgYW5kIHNldCBpdHMgc3RhdHVzIHRvIHVuYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgIHNjLnN0YXR1cyhTdHJpbmcocGxhY2UuaWRwbGFjZSksICd1bmF2YWlsYWJsZScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCA2MDAwMCk7IC8vZXZlcnkgNjAgc2Vjb25kc1xuICAgIHJldHVybiBzYztcbn1cblxuZnVuY3Rpb24gcmVjYWxjdWxhdGVUb3RhbChzYykge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAvL2Jhc2ljYWxseSBmaW5kIGV2ZXJ5IHNlbGVjdGVkIHNlYXQgYW5kIHN1bSBpdHMgcHJpY2VcbiAgICBzYy5maW5kKCdzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0b3RhbCArPSB0aGlzLmRhdGEoKS5wcmljZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIFBsYWNlICMxYmlzXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLXBsYWNlJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCdzbG93Jyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3BsYWNlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgZ2V0TWFwKCk7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLnNob3coXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuc2hvdyhcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucGFuaWVyLW1lbnUnKS5zaG93KFwic2xpZGVcIiwgeyBkaXJlY3Rpb246IFwicmlnaHRcIiB9LCAxMDAwKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1yZXN1bHQtY29udGFpbmVyJykucmVtb3ZlQ2xhc3MoJ2NvbC1tZC0xMicpLmFkZENsYXNzKCdjb2wtbWQtOScpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBwbGFjZXMnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbi8vIC8vIFN1cHByZXNzaW9uIGQndW5lIHBsYWNlIGRlcHVpcyBsZSBQYW5pZXIgQWpheFxuLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25EZWxldGVQbGFjZScsIGZ1bmN0aW9uKCl7XG4vLyAgICAgJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXJfcGxhY2UnKSxcbi8vICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4vLyAgICAgICAgIGRhdGE6IHtcbi8vICAgICAgICAgICAgIFwiaWRwbGFjZVwiOiAkKHRoaXMpLnZhbCgpXG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIGFzeW5jOiB0cnVlLFxuLy8gICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpIHtcbi8vICAgICAgICAgICAgICQuYWpheCh7XG4vLyAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuLy8gICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuLy8gICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbi8vICAgICAgICAgICAgICAgICB7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuLy8gICAgICAgICAgICAgICAgICAgICBzY19nbG9iYWwuc3RhdHVzKFN0cmluZygkKHRoaXMpLnZhbCgpKSwgJ2F2YWlsYWJsZScpO1xuLy9cbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4vL1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgICAgcmVmcmVzaFBhbmllckljb25NZW51KCk7XG4vL1xuLy8gICAgICAgICB9LFxuLy8gICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuLy8gICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHBsYWNlcycpO1xuLy9cbi8vICAgICAgICAgfVxuLy8gICAgIH0pO1xuLy8gfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIi8qIVxuICogalF1ZXJ5LVNlYXQtQ2hhcnRzIHYxLjEuNSAtPiB2MiAoS2FyaW0gQk9VQlJJVClcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRldXN6bWFya293c2tpL2pRdWVyeS1TZWF0LUNoYXJ0c1xuICpcbiAqIENvcHlyaWdodCAyMDEzLCAyMDE2IE1hdGV1c3ogTWFya293c2tpXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIFVwZ3JhZGUgYnkgYXV0aG9yOiBLYXJpbSBCT1VCUklUXG4gKi9cblxuKGZ1bmN0aW9uKCQpIHtcblx0XHRcblx0Ly8ndXNlIHN0cmljdCc7XHRcblx0XHRcblx0JC5mbi5zZWF0Q2hhcnRzID0gZnVuY3Rpb24gKHNldHVwKSB7XG5cblx0XHQvL2lmIHRoZXJlJ3Mgc2VhdENoYXJ0cyBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQsIHJldHVybiBpdFxuXHRcdGlmICh0aGlzLmRhdGEoJ3NlYXRDaGFydHMnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpO1xuXHRcdH1cblx0XHRcblx0XHR2YXIgZm4gICAgICAgPSB0aGlzLFxuXHRcdFx0c2VhdHMgICAgPSB7fSxcblx0XHRcdHNlYXRJZHMgID0gW10sXG5cdFx0XHRsZWdlbmQsXG5cdFx0XHRzZXR0aW5ncyA9IHtcblx0XHRcdFx0YW5pbWF0ZSA6IGZhbHNlLCAvL3JlcXVpcmVzIGpRdWVyeSBVSVxuXHRcdFx0XHRuYW1pbmcgIDoge1xuXHRcdFx0XHRcdHRvcCAgICA6IHRydWUsXG5cdFx0XHRcdFx0bGVmdCAgIDogdHJ1ZSxcblx0XHRcdFx0XHRnZXRJZCAgOiBmdW5jdGlvbihjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcm93ICsgJ18nICsgY29sdW1uO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0TGFiZWwgOiBmdW5jdGlvbiAoY2hhcmFjdGVyLCByb3csIGNvbHVtbikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNvbHVtbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxlZ2VuZCA6IHtcblx0XHRcdFx0XHRub2RlICAgOiBudWxsLFxuXHRcdFx0XHRcdGl0ZW1zICA6IFtdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsaWNrICAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ3NlbGVjdGVkJztcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3NlbGVjdGVkJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdhdmFpbGFibGUnO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9jdXMgIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuXHRcdFx0XHRcdFx0cmV0dXJuICdmb2N1c2VkJztcblx0XHRcdFx0XHR9IGVsc2UgIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRibHVyICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdGF0dXMoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VhdHMgICA6IHt9XG5cdFx0XHRcblx0XHRcdH0sXG5cdFx0XHQvL3NlYXQgd2lsbCBiZSBiYXNpY2FsbHkgYSBzZWF0IG9iamVjdCB3aGljaCB3ZSdsbCB3aGVuIGdlbmVyYXRpbmcgdGhlIG1hcFxuXHRcdFx0c2VhdCA9IChmdW5jdGlvbihzZWF0Q2hhcnRzLCBzZWF0Q2hhcnRzU2V0dGluZ3MpIHtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChzZXR1cCkge1xuXHRcdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRzdGF0dXMgOiAnYXZhaWxhYmxlJywgLy9hdmFpbGFibGUsIHVuYXZhaWxhYmxlLCBzZWxlY3RlZFxuXHRcdFx0XHRcdFx0c3R5bGUgIDogJ2F2YWlsYWJsZScsXG5cdFx0XHRcdFx0XHQvL21ha2Ugc3VyZSB0aGVyZSdzIGFuIGVtcHR5IGhhc2ggaWYgdXNlciBkb2Vzbid0IHBhc3MgYW55dGhpbmdcblx0XHRcdFx0XHRcdGRhdGEgICA6IHNlYXRDaGFydHNTZXR0aW5ncy5zZWF0c1tzZXR1cC5jaGFyYWN0ZXJdIHx8IHt9XG5cdFx0XHRcdFx0XHQvL2FueXRoaW5nIGdvZXMgaGVyZT9cblx0XHRcdFx0XHR9LCBzZXR1cCk7XG5cblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZSA9ICQoJzxkaXY+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGVcblx0XHRcdFx0XHRcdC5hdHRyKHtcblx0XHRcdFx0XHRcdFx0aWQgICAgICAgICAgICAgOiBmbi5zZXR0aW5ncy5pZCxcblx0XHRcdFx0XHRcdFx0cm9sZSAgICAgICAgICAgOiAnY2hlY2tib3gnLFxuXHRcdFx0XHRcdFx0XHQnYXJpYS1jaGVja2VkJyA6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRmb2N1c2FibGUgICAgICA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdHRhYkluZGV4ICAgICAgIDogLTEgLy9tYW51YWwgZm9jdXNcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQudGV4dChmbi5zZXR0aW5ncy5sYWJlbClcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyhbJ3NlYXRDaGFydHMtc2VhdCcsICdzZWF0Q2hhcnRzLWNlbGwnLCAnYXZhaWxhYmxlJ10uY29uY2F0KFxuXHRcdFx0XHRcdFx0XHQvL2xldCdzIG1lcmdlIGN1c3RvbSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIHN0YW5kYXJkIEpTQyBvbmVzXG5cdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHR0eXBlb2Ygc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW2ZuLnNldHRpbmdzLmNoYXJhY3Rlcl0gPT0gXCJ1bmRlZmluZWRcIiA/IFxuXHRcdFx0XHRcdFx0XHRcdFtdIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW2ZuLnNldHRpbmdzLmNoYXJhY3Rlcl0uY2xhc3Nlc1xuXHRcdFx0XHRcdFx0XHQpLmpvaW4oJyAnKSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9iYXNpY2FsbHkgYSB3cmFwcGVyIGZ1bmN0aW9uXG5cdFx0XHRcdFx0Zm4uZGF0YSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLmRhdGE7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5jaGFyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuY2hhcmFjdGVyO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4ubm9kZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLiRub2RlO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdCAqIENhbiBlaXRoZXIgc2V0IG9yIHJldHVybiBzdGF0dXMgZGVwZW5kaW5nIG9uIGFyZ3VtZW50cy5cblx0XHRcdFx0XHQgKlxuXHRcdFx0XHRcdCAqIElmIHRoZXJlJ3Mgbm8gYXJndW1lbnQsIGl0IHdpbGwgcmV0dXJuIHRoZSBjdXJyZW50IHN0eWxlLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgeW91IHBhc3MgYW4gYXJndW1lbnQsIGl0IHdpbGwgdXBkYXRlIHNlYXQncyBzdHlsZVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGZuLnN0eWxlID0gZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09IDEgP1xuXHRcdFx0XHRcdFx0XHQoZnVuY3Rpb24obmV3U3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgb2xkU3R5bGUgPSBmbi5zZXR0aW5ncy5zdHlsZTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vaWYgbm90aGluZyBjaGFuZ2VzLCBkbyBub3RoaW5nXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG5ld1N0eWxlID09IG9sZFN0eWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb2xkU3R5bGU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZm9jdXNlZCBpcyBhIHNwZWNpYWwgc3R5bGUgd2hpY2ggaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBzdGF0dXNcblx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy5zdGF0dXMgPSBuZXdTdHlsZSAhPSAnZm9jdXNlZCcgPyBuZXdTdHlsZSA6IGZuLnNldHRpbmdzLnN0YXR1cztcblx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0XHRcdFx0LmF0dHIoJ2FyaWEtY2hlY2tlZCcsIG5ld1N0eWxlID09ICdzZWxlY3RlZCcpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiB1c2VyIHdhbnRzIHRvIGFuaW1hdGUgc3RhdHVzIGNoYW5nZXMsIGxldCBoaW0gZG8gdGhpc1xuXHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHNTZXR0aW5ncy5hbmltYXRlID9cblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnN3aXRjaENsYXNzKG9sZFN0eWxlLCBuZXdTdHlsZSwgMjAwKSA6XG5cdFx0XHRcdFx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZS5yZW1vdmVDbGFzcyhvbGRTdHlsZSkuYWRkQ2xhc3MobmV3U3R5bGUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0eWxlID0gbmV3U3R5bGU7XG5cdFx0XHRcdFx0XHRcdH0pKGFyZ3VtZW50c1swXSkgOiBmbi5zZXR0aW5ncy5zdHlsZTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vZWl0aGVyIHNldCBvciByZXRyaWV2ZVxuXHRcdFx0XHRcdGZuLnN0YXR1cyA9IGZ1bmN0aW9uKCkge1xuXHRcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5zdGF0dXMgPSBhcmd1bWVudHMubGVuZ3RoID09IDEgPyBcblx0XHRcdFx0XHRcdFx0Zm4uc3R5bGUoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0YXR1cztcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIHRvIGNvbnZpZW5pZXRseSBnZXQgc2hvcnRjdXQgdmFyaWFibGVzXG5cdFx0XHRcdFx0KGZ1bmN0aW9uKHNlYXRTZXR0aW5ncywgY2hhcmFjdGVyLCBzZWF0KSB7XG5cdFx0XHRcdFx0XHQvL2F0dGFjaCBldmVudCBoYW5kbGVyc1xuXHRcdFx0XHRcdFx0JC5lYWNoKFsnY2xpY2snLCAnZm9jdXMnLCAnYmx1ciddLCBmdW5jdGlvbihpbmRleCwgY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHQvL3dlIHdhbnQgdG8gYmUgYWJsZSB0byBjYWxsIHRoZSBmdW5jdGlvbnMgZm9yIGVhY2ggc2VhdCBvYmplY3Rcblx0XHRcdFx0XHRcdFx0Zm5bY2FsbGJhY2tdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrID09ICdmb2N1cycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBhbHJlYWR5IGEgZm9jdXNlZCBlbGVtZW50LCB3ZSBoYXZlIHRvIHJlbW92ZSBmb2N1cyBmcm9tIGl0IGZpcnN0XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXRzW3NlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JyldLmJsdXIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHNlYXRDaGFydHMuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jywgc2VhdC5zZXR0aW5ncy5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0Lm5vZGUoKS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHQgKiBVc2VyIGNhbiBwYXNzIGhpcyBvd24gY2FsbGJhY2sgZnVuY3Rpb24sIHNvIHdlIGhhdmUgdG8gZmlyc3QgY2hlY2sgaWYgaXQgZXhpc3RzXG5cdFx0XHRcdFx0XHRcdFx0ICogYW5kIGlmIG5vdCwgdXNlIG91ciBkZWZhdWx0IGNhbGxiYWNrLlxuXHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0ICogRWFjaCBjYWxsYmFjayBmdW5jdGlvbiBpcyBleGVjdXRlZCBpbiB0aGUgY3VycmVudCBzZWF0IGNvbnRleHQuXG5cdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZuLnN0eWxlKHR5cGVvZiBzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10gPT09ICdmdW5jdGlvbicgP1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdFNldHRpbmdzW2NoYXJhY3Rlcl1bY2FsbGJhY2tdLmFwcGx5KHNlYXQpIDogc2VhdENoYXJ0c1NldHRpbmdzW2NhbGxiYWNrXS5hcHBseShzZWF0KSk7XG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0Ly90aGUgYmVsb3cgd2lsbCBiZWNvbWUgc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQgdGhhbmtzIHRvIHRoZSBpbW1lZGlhdGUgZnVuY3Rpb25cdFx0XG5cdFx0XHRcdFx0fSkoc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzLCBmbi5zZXR0aW5ncy5jaGFyYWN0ZXIsIGZuKTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0Zm4ubm9kZSgpXG5cdFx0XHRcdFx0XHQvL3RoZSBmaXJzdCB0aHJlZSBtb3VzZSBldmVudHMgYXJlIHNpbXBsZVxuXHRcdFx0XHRcdFx0Lm9uKCdjbGljaycsICAgICAgZm4uY2xpY2spXG5cdFx0XHRcdFx0XHQub24oJ21vdXNlZW50ZXInLCBmbi5mb2N1cylcblx0XHRcdFx0XHRcdC5vbignbW91c2VsZWF2ZScsIGZuLmJsdXIpXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdC8va2V5ZG93biByZXF1aXJlcyBxdWl0ZSBhIGxvdCBvZiBsb2dpYywgYmVjYXVzZSB3ZSBoYXZlIHRvIGtub3cgd2hlcmUgdG8gbW92ZSB0aGUgZm9jdXNcblx0XHRcdFx0XHRcdC5vbigna2V5ZG93bicsICAgIChmdW5jdGlvbihzZWF0LCAkc2VhdCkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdHZhciAkbmV3U2VhdDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvL2V2ZXJ5dGhpbmcgZGVwZW5kcyBvbiB0aGUgcHJlc3NlZCBrZXlcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2ggKGUud2hpY2gpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vc3BhY2ViYXIgd2lsbCBqdXN0IHRyaWdnZXIgdGhlIHNhbWUgZXZlbnQgbW91c2UgY2xpY2sgZG9lc1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9VUCAmIERPV05cblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGlzIGlzIGEgcmVjdXJzaXZlLCBpbW1lZGlhdGUgZnVuY3Rpb24gd2hpY2ggc2VhcmNoZXMgZm9yIHRoZSBmaXJzdCBcImZvY3VzYWJsZVwiIHJvdy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIGltbWVkaWF0ZSBmdW5jdGlvbiBiZWNhdXNlIHdlIHdhbnQgYSBjb252ZW5pZW50IGFjY2VzcyB0byBzb21lIERPTSBlbGVtZW50c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBXZSdyZSB1c2luZyByZWN1cnNpb24gYmVjYXVzZSBzb21ldGltZXMgd2UgbWF5IGhpdCBhbiBlbXB0eSBzcGFjZSByYXRoZXIgdGhhbiBhIHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbiBmaW5kQXZhaWxhYmxlKCRyb3dzLCAkc2VhdHMsICRjdXJyZW50Um93KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdSb3c7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9sZXQncyBkZXRlcm1pbmUgd2hpY2ggcm93IHNob3VsZCB3ZSBtb3ZlIHRvXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkcm93cy5pbmRleCgkY3VycmVudFJvdykgJiYgZS53aGljaCA9PSAzOCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBmaXJzdCByb3cgYW5kIHVzZXIgaGFzIHByZXNzZWQgdXAgYXJyb3csIG1vdmUgdG8gdGhlIGxhc3Qgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MubGFzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoJHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpID09ICRyb3dzLmxlbmd0aC0xICYmIGUud2hpY2ggPT0gNDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdGhpcyBpcyB0aGUgbGFzdCByb3cgYW5kIHVzZXIgaGFzIHByZXNzZWQgZG93biBhcnJvdywgbW92ZSB0byB0aGUgZmlyc3Qgcm93XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZmlyc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2luZyBlcSB0byBnZXQgYW4gZWxlbWVudCBhdCB0aGUgZGVzaXJlZCBpbmRleCBwb3NpdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1JvdyA9ICRyb3dzLmVxKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHVwIGFycm93LCB0aGVuIGRlY3JlbWVudCB0aGUgaW5kZXgsIGlmIGRvd24gaW5jcmVtZW50IGl0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRyb3dzLmluZGV4KCRjdXJyZW50Um93KSArIChlLndoaWNoID09IDM4ID8gKC0xKSA6ICgrMSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL25vdyB0aGF0IHdlIGtub3cgdGhlIHJvdywgbGV0J3MgZ2V0IHRoZSBzZWF0IHVzaW5nIHRoZSBjdXJyZW50IGNvbHVtbiBwb3NpdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gJG5ld1Jvdy5maW5kKCcuc2VhdENoYXJ0cy1zZWF0LC5zZWF0Q2hhcnRzLXNwYWNlJykuZXEoJHNlYXRzLmluZGV4KCRzZWF0KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGUgc2VhdCB3ZSBmb3VuZCBpcyBhIHNwYWNlLCBrZWVwIGxvb2tpbmcgZnVydGhlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkbmV3U2VhdC5oYXNDbGFzcygnc2VhdENoYXJ0cy1zcGFjZScpID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJG5ld1JvdykgOiAkbmV3U2VhdDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkoJHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRhaW5lciBhbmQgdGhlbiBzZWxlY3QgYWxsIHJvd3MgYnV0IHRoZSBoZWFkZXJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXInKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9nZXQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCByb3cgYW5kIHRoZW4gZmluZCBhbGwgc2VhdCBjZWxscyAoYm90aCBzZWF0cyAmIHNwYWNlcylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1yb3c6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkc2VhdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1yb3c6bm90KC5zZWF0Q2hhcnRzLWhlYWRlciknKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly93ZSBjb3VsZG4ndCBkZXRlcm1pbmUgdGhlIG5ldyBzZWF0LCBzbyB3ZSBiZXR0ZXIgZ2l2ZSB1cFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9yZW1vdmUgZm9jdXMgZnJvbSB0aGUgb2xkIHNlYXQgYW5kIHB1dCBpdCBvbiB0aGUgbmV3IG9uZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbJG5ld1NlYXQuYXR0cignaWQnKV0uZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXBkYXRlIG91ciBcImFyaWFcIiByZWZlcmVuY2Ugd2l0aCB0aGUgbmV3IHNlYXQgaWRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCAkbmV3U2VhdC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1x0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHQvL0xFRlQgJiBSSUdIVFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Lypcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVGhlIGxvZ2ljIGhlcmUgaXMgc2xpZ2h0bHkgZGlmZmVyZW50IGZyb20gdGhlIG9uZSBmb3IgdXAvZG93biBhcnJvd3MuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgd2lsbCBiZSBhYmxlIHRvIGJyb3dzZSB0aGUgd2hvbGUgbWFwIHVzaW5nIGp1c3QgbGVmdC9yaWdodCBhcnJvdywgYmVjYXVzZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBpdCB3aWxsIG1vdmUgdG8gdGhlIG5leHQgcm93IHdoZW4gd2UgcmVhY2ggdGhlIHJpZ2h0L2xlZnQtbW9zdCBzZWF0LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAoZnVuY3Rpb24oJHNlYXRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJHNlYXRzLmluZGV4KCRzZWF0KSAmJiBlLndoaWNoID09IDM3KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgbGVmdCBhcnJvdyBhbmQgd2UncmUgY3VycmVudGx5IG9uIHRoZSBsZWZ0LW1vc3Qgc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkc2VhdHMuaW5kZXgoJHNlYXQpID09ICRzZWF0cy5sZW5ndGggLTEgJiYgZS53aGljaCA9PSAzOSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91c2VyIGhhcyBwcmVzc2VkIHJpZ2h0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIHJpZ2h0LW1vc3Qgc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3NpbXBseSBtb3ZlIG9uZSBzZWF0IGxlZnQgb3IgcmlnaHQgZGVwZW5kaW5nIG9uIHRoZSBrZXlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAkc2VhdHMuZXEoJHNlYXRzLmluZGV4KCRzZWF0KSArIChlLndoaWNoID09IDM3ID8gKC0xKSA6ICgrMSkpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkoJHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQucGFyZW50cygnLnNlYXRDaGFydHMtY29udGFpbmVyOmZpcnN0Jylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkbmV3U2VhdC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9oYW5kbGUgZm9jdXNcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdC5ibHVyKCk7XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbJG5ld1NlYXQuYXR0cignaWQnKV0uZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXBkYXRlIG91ciBcImFyaWFcIiByZWZlcmVuY2Ugd2l0aCB0aGUgbmV3IHNlYXQgaWRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCAkbmV3U2VhdC5hdHRyKCdpZCcpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcblx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdH0pKGZuLCBmbi5ub2RlKCkpKTtcblx0XHRcdFx0XHRcdC8vLmFwcGVuZFRvKHNlYXRDaGFydHMuZmluZCgnLicgKyByb3cpKTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9KShmbiwgc2V0dGluZ3MpO1xuXHRcdFx0XG5cdFx0Zm4uYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY29udGFpbmVyJyk7XG5cdFx0XG5cdFx0Ly90cnVlIC0+IGRlZXAgY29weSFcblx0XHQkLmV4dGVuZCh0cnVlLCBzZXR0aW5ncywgc2V0dXApO1x0XHRcblx0XHRcblx0XHQvL0dlbmVyYXRlIGRlZmF1bHQgcm93IGlkcyB1bmxlc3MgdXNlciBwYXNzZWQgaGlzIG93blxuXHRcdHNldHRpbmdzLm5hbWluZy5yb3dzID0gc2V0dGluZ3MubmFtaW5nLnJvd3MgfHwgKGZ1bmN0aW9uKGxlbmd0aCkge1xuXHRcdFx0dmFyIHJvd3MgPSBbXTtcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHJvd3MucHVzaChpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByb3dzO1xuXHRcdH0pKHNldHRpbmdzLm1hcC5sZW5ndGgpO1xuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCBjb2x1bW4gaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLmNvbHVtbnMgPSBzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgY29sdW1ucyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29sdW1ucy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvbHVtbnM7XG5cdFx0fSkoc2V0dGluZ3MubWFwWzBdLnNwbGl0KCcnKS5sZW5ndGgpO1xuXHRcdFxuXHRcdGlmIChzZXR0aW5ncy5uYW1pbmcudG9wKSB7XG5cdFx0XHR2YXIgJGhlYWRlclJvdyA9ICQoJzxkaXY+PC9kaXY+Jylcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdyBzZWF0Q2hhcnRzLWhlYWRlcicpO1xuXHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLmxlZnQpIHtcblx0XHRcdFx0JGhlYWRlclJvdy5hcHBlbmQoJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsJykpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0JC5lYWNoKHNldHRpbmdzLm5hbWluZy5jb2x1bW5zLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcblx0XHRcdFx0JGhlYWRlclJvdy5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKVxuXHRcdFx0XHRcdFx0LnRleHQodmFsdWUpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0XG5cdFx0Zm4uYXBwZW5kKCRoZWFkZXJSb3cpO1xuXHRcdFxuXHRcdC8vZG8gdGhpcyBmb3IgZWFjaCBtYXAgcm93XG5cdFx0JC5lYWNoKHNldHRpbmdzLm1hcCwgZnVuY3Rpb24ocm93LCBjaGFyYWN0ZXJzKSB7XG5cblx0XHRcdHZhciAkcm93ID0gJCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1yb3cnKTtcblx0XHRcdFx0XG5cdFx0XHRpZiAoc2V0dGluZ3MubmFtaW5nLmxlZnQpIHtcblx0XHRcdFx0JHJvdy5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwgc2VhdENoYXJ0cy1zcGFjZScpXG5cdFx0XHRcdFx0XHQudGV4dChzZXR0aW5ncy5uYW1pbmcucm93c1tyb3ddKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKlxuXHRcdFx0ICogRG8gdGhpcyBmb3IgZWFjaCBzZWF0IChsZXR0ZXIpXG5cdFx0XHQgKlxuXHRcdFx0ICogTm93IHVzZXJzIHdpbGwgYmUgYWJsZSB0byBwYXNzIGN1c3RvbSBJRCBhbmQgbGFiZWwgd2hpY2ggb3ZlcndyaXRlIHRoZSBvbmUgdGhhdCBzZWF0IHdvdWxkIGJlIGFzc2lnbmVkIGJ5IGdldElkIGFuZFxuXHRcdFx0ICogZ2V0TGFiZWxcblx0XHRcdCAqXG5cdFx0XHQgKiBOZXcgZm9ybWF0IGlzIGxpa2UgdGhpczpcblx0XHRcdCAqIGFbSUQsbGFiZWxdYVtJRF1hYWFhYVxuXHRcdFx0ICpcblx0XHRcdCAqIFNvIHlvdSBjYW4gb3ZlcndyaXRlIHRoZSBJRCBvciBsYWJlbCAob3IgYm90aCkgZXZlbiBmb3IganVzdCBvbmUgc2VhdC5cblx0XHRcdCAqIEJhc2ljYWxseSBJRCBzaG91bGQgYmUgZmlyc3QsIHNvIGlmIHlvdSB3YW50IHRvIG92ZXJ3cml0ZSBqdXN0IGxhYmVsIHdyaXRlIGl0IGFzIGZvbGxvd3M6XG5cdFx0XHQgKiBhWyxMQUJFTF1cblx0XHRcdCAqXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gSURzIGFyZUwgMC05LCBhLXosIEEtWiwgX1xuXHRcdFx0ICogQWxsb3dlZCBjaGFyYWN0ZXJzIGluIGxhYmVscyBhcmU6IDAtOSwgYS16LCBBLVosIF8sICcgJyAoc3BhY2UpXG5cdFx0XHQgKlxuXHRcdFx0ICovXG5cdFx0XHQgXG5cdFx0XHQkLmVhY2goY2hhcmFjdGVycy5tYXRjaCgvW2Etel9dezF9KFxcW1swLTlhLXpfXXswLH0oLFswLTlhLXpfIF0rKT9cXF0pPy9naSksIGZ1bmN0aW9uIChjb2x1bW4sIGNoYXJhY3RlclBhcmFtcykgeyBcblx0XHRcdFx0dmFyIG1hdGNoZXMgICAgICAgICA9IGNoYXJhY3RlclBhcmFtcy5tYXRjaCgvKFthLXpfXXsxfSkoXFxbKFswLTlhLXpfICxdKylcXF0pPy9pKSxcblx0XHRcdFx0XHQvL25vIG1hdHRlciBpZiB1c2VyIHNwZWNpZmllcyBbXSBwYXJhbXMsIHRoZSBjaGFyYWN0ZXIgc2hvdWxkIGJlIGluIHRoZSBzZWNvbmQgZWxlbWVudFxuXHRcdFx0XHRcdGNoYXJhY3RlciAgICAgICA9IG1hdGNoZXNbMV0sXG5cdFx0XHRcdFx0Ly9jaGVjayBpZiB1c2VyIGhhcyBwYXNzZWQgc29tZSBhZGRpdGlvbmFsIHBhcmFtcyB0byBvdmVycmlkZSBpZCBvciBsYWJlbFxuXHRcdFx0XHRcdHBhcmFtcyAgICAgICAgICA9IHR5cGVvZiBtYXRjaGVzWzNdICE9PSAndW5kZWZpbmVkJyA/IG1hdGNoZXNbM10uc3BsaXQoJywnKSA6IFtdLFxuXHRcdFx0XHRcdC8vaWQgcGFyYW0gc2hvdWxkIGJlIGZpcnN0XG5cdFx0XHRcdFx0b3ZlcnJpZGVJZCAgICAgID0gcGFyYW1zLmxlbmd0aCA/IHBhcmFtc1swXSA6IG51bGwsXG5cdFx0XHRcdFx0Ly9sYWJlbCBwYXJhbSBzaG91bGQgYmUgc2Vjb25kXG5cdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCAgID0gcGFyYW1zLmxlbmd0aCA9PT0gMiA/IHBhcmFtc1sxXSA6IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdCRyb3cuYXBwZW5kKGNoYXJhY3RlciAhPSAnXycgP1xuXHRcdFx0XHRcdC8vaWYgdGhlIGNoYXJhY3RlciBpcyBub3QgYW4gdW5kZXJzY29yZSAoZW1wdHkgc3BhY2UpXG5cdFx0XHRcdFx0KGZ1bmN0aW9uKG5hbWluZykge1xuXHRcblx0XHRcdFx0XHRcdC8vc28gdXNlcnMgZG9uJ3QgaGF2ZSB0byBzcGVjaWZ5IGVtcHR5IG9iamVjdHNcblx0XHRcdFx0XHRcdHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gPSBjaGFyYWN0ZXIgaW4gc2V0dGluZ3Muc2VhdHMgPyBzZXR0aW5ncy5zZWF0c1tjaGFyYWN0ZXJdIDoge307XG5cdFxuXHRcdFx0XHRcdFx0dmFyIGlkID0gb3ZlcnJpZGVJZCA/IG92ZXJyaWRlSWQgOiBuYW1pbmcuZ2V0SWQoY2hhcmFjdGVyLCBuYW1pbmcucm93c1tyb3ddLCBuYW1pbmcuY29sdW1uc1tjb2x1bW5dKTtcblx0XHRcdFx0XHRcdHNlYXRzW2lkXSA9IG5ldyBzZWF0KHtcblx0XHRcdFx0XHRcdFx0aWQgICAgICAgIDogaWQsXG5cdFx0XHRcdFx0XHRcdGxhYmVsICAgICA6IG92ZXJyaWRlTGFiZWwgP1xuXHRcdFx0XHRcdFx0XHRcdG92ZXJyaWRlTGFiZWwgOiBuYW1pbmcuZ2V0TGFiZWwoY2hhcmFjdGVyLCBuYW1pbmcucm93c1tyb3ddLCBuYW1pbmcuY29sdW1uc1tjb2x1bW5dKSxcblx0XHRcdFx0XHRcdFx0cm93ICAgICAgIDogcm93LFxuXHRcdFx0XHRcdFx0XHRjb2x1bW4gICAgOiBjb2x1bW4sXG5cdFx0XHRcdFx0XHRcdGNoYXJhY3RlciA6IGNoYXJhY3RlclxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdHNlYXRJZHMucHVzaChpZCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdHNbaWRdLm5vZGUoKTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdH0pKHNldHRpbmdzLm5hbWluZykgOlxuXHRcdFx0XHRcdC8vdGhpcyBpcyBqdXN0IGFuIGVtcHR5IHNwYWNlIChfKVxuXHRcdFx0XHRcdCQoJzxkaXY+PC9kaXY+JykuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcdFxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdGZuLmFwcGVuZCgkcm93KTtcblx0XHR9KTtcblx0XG5cdFx0Ly9pZiB0aGVyZSdyZSBhbnkgbGVnZW5kIGl0ZW1zIHRvIGJlIHJlbmRlcmVkXG5cdFx0c2V0dGluZ3MubGVnZW5kLml0ZW1zLmxlbmd0aCA/IChmdW5jdGlvbihsZWdlbmQpIHtcblx0XHRcdC8vZWl0aGVyIHVzZSB1c2VyLWRlZmluZWQgY29udGFpbmVyIG9yIGNyZWF0ZSBvdXIgb3duIGFuZCBpbnNlcnQgaXQgcmlnaHQgYWZ0ZXIgdGhlIHNlYXQgY2hhcnQgZGl2XG5cdFx0XHR2YXIgJGNvbnRhaW5lciA9IChsZWdlbmQubm9kZSB8fCAkKCc8ZGl2PjwvZGl2PicpLmluc2VydEFmdGVyKGZuKSlcblx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZCcpO1xuXHRcdFx0XHRcblx0XHRcdHZhciAkdWwgPSAkKCc8dWw+PC91bD4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kTGlzdCcpXG5cdFx0XHRcdC5hcHBlbmRUbygkY29udGFpbmVyKTtcblx0XHRcdFxuXHRcdFx0JC5lYWNoKGxlZ2VuZC5pdGVtcywgZnVuY3Rpb24oaW5kZXgsIGl0ZW0pIHtcblx0XHRcdFx0JHVsLmFwcGVuZChcblx0XHRcdFx0XHQkKCc8bGk+PC9saT4nKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCdzZWF0Q2hhcnRzLWxlZ2VuZEl0ZW0nKVxuXHRcdFx0XHRcdFx0LmFwcGVuZChcblx0XHRcdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHRcdFx0XHRcdC8vbWVyZ2UgdXNlciBkZWZpbmVkIGNsYXNzZXMgd2l0aCBvdXIgc3RhbmRhcmQgb25lc1xuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyhbJ3NlYXRDaGFydHMtc2VhdCcsICdzZWF0Q2hhcnRzLWNlbGwnLCBpdGVtWzFdXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXR0aW5ncy5jbGFzc2VzLCBcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGVvZiBzZXR0aW5ncy5zZWF0c1tpdGVtWzBdXSA9PSBcInVuZGVmaW5lZFwiID8gW10gOiBzZXR0aW5ncy5zZWF0c1tpdGVtWzBdXS5jbGFzc2VzKS5qb2luKCcgJylcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8c3Bhbj48L3NwYW4+Jylcblx0XHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kRGVzY3JpcHRpb24nKVxuXHRcdFx0XHRcdFx0XHRcdC50ZXh0KGl0ZW1bMl0pXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuICRjb250YWluZXI7XG5cdFx0fSkoc2V0dGluZ3MubGVnZW5kKSA6IG51bGw7XG5cdFxuXHRcdGZuLmF0dHIoe1xuXHRcdFx0dGFiSW5kZXggOiAwXG5cdFx0fSk7XG5cdFx0XG5cdFx0XG5cdFx0Ly93aGVuIGNvbnRhaW5lcidzIGZvY3VzZWQsIG1vdmUgZm9jdXMgdG8gdGhlIGZpcnN0IHNlYXRcblx0XHRmbi5mb2N1cyhmdW5jdGlvbigpIHtcblx0XHRcdGlmIChmbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKSkge1xuXHRcdFx0XHRzZWF0c1tmbi5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdGZuLmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQ6bm90KC5zZWF0Q2hhcnRzLXNwYWNlKTpmaXJzdCcpLmZvY3VzKCk7XG5cdFx0XHRzZWF0c1tzZWF0SWRzWzBdXS5mb2N1cygpO1xuXG5cdFx0fSk7XG5cdFxuXHRcdC8vcHVibGljIG1ldGhvZHMgb2Ygc2VhdENoYXJ0c1xuXHRcdGZuLmRhdGEoJ3NlYXRDaGFydHMnLCB7XG5cdFx0XHRzZWF0cyAgIDogc2VhdHMsXG5cdFx0XHRzZWF0SWRzIDogc2VhdElkcyxcblx0XHRcdC8vc2V0IGZvciBvbmUsIHNldCBmb3IgbWFueSwgZ2V0IGZvciBvbmVcblx0XHRcdHN0YXR1czogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IGZuLnNlYXRzW2FyZ3VtZW50c1swXV0uc3RhdHVzKCkgOiAoZnVuY3Rpb24oc2VhdHNJZHMsIG5ld1N0YXR1cykge1xuXHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mIHNlYXRzSWRzID09ICdzdHJpbmcnID8gZm4uc2VhdHNbc2VhdHNJZHNdLnN0YXR1cyhuZXdTdGF0dXMpIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JC5lYWNoKHNlYXRzSWRzLCBmdW5jdGlvbihpbmRleCwgc2VhdElkKSB7XG5cdFx0XHRcdFx0XHRcdGZuLnNlYXRzW3NlYXRJZF0uc3RhdHVzKG5ld1N0YXR1cyk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHR9KShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0XHR9LFxuXHRcdFx0ZWFjaCAgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdGZvciAodmFyIHNlYXRJZCBpbiBmbi5zZWF0cykge1xuXHRcdFx0XHRcdGlmIChmYWxzZSA9PT0gY2FsbGJhY2suY2FsbChmbi5zZWF0c1tzZWF0SWRdLCBzZWF0SWQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdElkOy8vcmV0dXJuIGxhc3QgY2hlY2tlZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0bm9kZSAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHQvL2Jhc2ljYWxseSBjcmVhdGUgYSBDU1MgcXVlcnkgdG8gZ2V0IGFsbCBzZWF0cyBieSB0aGVpciBET00gaWRzXG5cdFx0XHRcdHJldHVybiAkKCcjJyArIGZuLnNlYXRJZHMuam9pbignLCMnKSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24ocXVlcnkpIHsvL0QsIGEuYXZhaWxhYmxlLCB1bmF2YWlsYWJsZVxuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XG5cdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcblx0XHRcdFx0Ly9pcyBSZWdFeHBcblx0XHQgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5IGluc3RhbmNlb2YgUmVnRXhwID9cblx0XHQgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoaWQpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLm1hdGNoKHF1ZXJ5KSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKGlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgfSkoKSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAocXVlcnkubGVuZ3RoID09IDEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGNoYXJhY3Rlcikge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHNlYXJjaGVzIGp1c3QgZm9yIGEgcGFydGljdWFsIGNoYXJhY3RlclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IGNoYXJhY3Rlcikge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkocXVlcnkpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlciBydW5zIGEgbW9yZSBzb3BoaXN0aWNhdGVkIHF1ZXJ5LCBzbyBsZXQncyBzZWUgaWYgdGhlcmUncyBhIGRvdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5LmluZGV4T2YoJy4nKSA+IC0xID9cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoZXJlJ3MgYSBkb3Qgd2hpY2ggc2VwYXJhdGVzIGNoYXJhY3RlciBhbmQgdGhlIHN0YXR1c1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBxdWVyeS5zcGxpdCgnLicpO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChzZWF0SWQpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXIoKSA9PSBwYXJ0c1swXSAmJiB0aGlzLnN0YXR1cygpID09IHBhcnRzWzFdKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKSA6XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4uZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSBxdWVyeSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKClcblx0XHQgICAgICAgICAgICAgICAgICAgICk7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdHNldCAgICAgICAgOiBmdW5jdGlvbiBzZXQoKSB7Ly9pbmhlcml0cyBzb21lIG1ldGhvZHNcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0c2VhdHMgICAgICA6IFtdLFxuXHRcdFx0XHRcdHNlYXRJZHMgICAgOiBbXSxcblx0XHRcdFx0XHRsZW5ndGggICAgIDogMCxcblx0XHRcdFx0XHRzdGF0dXMgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cyxcblx0XHRcdFx0XHRcdFx0dGhhdCA9IHRoaXM7XG5cdFx0XHRcdFx0XHQvL2lmIHRoZXJlJ3MganVzdCBvbmUgc2VhdCBpbiB0aGUgc2V0IGFuZCB1c2VyIGRpZG4ndCBwYXNzIGFueSBwYXJhbXMsIHJldHVybiBjdXJyZW50IHN0YXR1c1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMubGVuZ3RoID09IDEgJiYgYXJncy5sZW5ndGggPT0gMCA/IHRoaXMuc2VhdHNbMF0uc3RhdHVzKCkgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdC8vb3RoZXJ3aXNlIGNhbGwgc3RhdHVzIGZ1bmN0aW9uIGZvciBlYWNoIG9mIHRoZSBzZWF0cyBpbiB0aGUgc2V0XG5cdFx0XHRcdFx0XHRcdCQuZWFjaCh0aGF0LnNlYXRzLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0YXR1cy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bm9kZSAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLm5vZGUuY2FsbCh0aGlzKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVhY2ggICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5lYWNoLmNhbGwodGhpcywgYXJndW1lbnRzWzBdKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldCAgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5nZXQuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZmluZCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmZpbmQuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c2V0ICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2V0LmNhbGwoZm4pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cHVzaCAgICAgICA6IGZ1bmN0aW9uKGlkLCBzZWF0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlYXRzLnB1c2goc2VhdCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNlYXRJZHMucHVzaChpZCk7XG5cdFx0XHRcdFx0XHQrK3RoaXMubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHQvL2dldCBvbmUgb2JqZWN0IG9yIGEgc2V0IG9mIG9iamVjdHNcblx0XHRcdGdldCAgIDogZnVuY3Rpb24oc2VhdHNJZHMpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHNlYXRzSWRzID09ICdzdHJpbmcnID8gXG5cdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdHNJZHNdIDogKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR2YXIgc2VhdFNldCA9IGZuLnNldCgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBmbi5zZWF0c1tzZWF0SWRdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdHNlYXRTZXQucHVzaChzZWF0SWQsIGZuLnNlYXRzW3NlYXRJZF0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlYXRTZXQ7XG5cdFx0XHRcdFx0fSkoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRcblx0XHRyZXR1cm4gZm4uZGF0YSgnc2VhdENoYXJ0cycpO1xuXHR9XG5cdFxuXHRcbn0pKGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwic291cmNlUm9vdCI6IiJ9