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
                    category: 'Place VIP'
                },
                p: {
                    price: 5,
                    classes: 'economy-class', //your custom CSS class
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
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/ajax/ajaxCheckDispoDate.js ./web/assets/js/ajax/ajaxChoixSalle.js ./web/assets/js/ajax/ajaxAjoutProduitPanier.js ./web/assets/js/ajax/ajaxPanier.js ./web/assets/js/ajax/ajaxChangeTunnelAchat.js ./web/assets/js/places/jquery.seat-charts.js ./web/assets/js/places/ajaxGestionPlaces.js ./web/assets/js/ajax/ajaxVilles.js ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./web/assets/js/ajax/ajaxCheckDispoDate.js */"./web/assets/js/ajax/ajaxCheckDispoDate.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChoixSalle.js */"./web/assets/js/ajax/ajaxChoixSalle.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxAjoutProduitPanier.js */"./web/assets/js/ajax/ajaxAjoutProduitPanier.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxPanier.js */"./web/assets/js/ajax/ajaxPanier.js");
__webpack_require__(/*! ./web/assets/js/ajax/ajaxChangeTunnelAchat.js */"./web/assets/js/ajax/ajaxChangeTunnelAchat.js");
__webpack_require__(/*! ./web/assets/js/places/jquery.seat-charts.js */"./web/assets/js/places/jquery.seat-charts.js");
__webpack_require__(/*! ./web/assets/js/places/ajaxGestionPlaces.js */"./web/assets/js/places/ajaxGestionPlaces.js");
module.exports = __webpack_require__(/*! ./web/assets/js/ajax/ajaxVilles.js */"./web/assets/js/ajax/ajaxVilles.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY4YjVkZGFjZjVmYTNiZjEzYmUiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhBam91dFByb2R1aXRQYW5pZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaGFuZ2VUdW5uZWxBY2hhdC5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheENoZWNrRGlzcG9EYXRlLmpzIiwid2VicGFjazovLy8uL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hvaXhTYWxsZS5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFBhbmllci5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL2FqYXgvYWpheFZpbGxlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9hamF4R2VzdGlvblBsYWNlcy5qcyIsIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2pzL3BsYWNlcy9qcXVlcnkuc2VhdC1jaGFydHMuanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50Iiwib24iLCJhamF4IiwidXJsIiwiUm91dGluZyIsImdlbmVyYXRlIiwidHlwZSIsImRhdGEiLCJ2YWwiLCJhc3luYyIsInN1Y2Nlc3MiLCJyZXNwb25zZVBhbmllciIsInRleHRTdGF0dXMiLCJlbXB0eSIsImFwcGVuZCIsInJlZnJlc2hQYW5pZXJJY29uTWVudSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwiZWZmZWN0IiwidGltZXMiLCJyZWFkeSIsInJlc3BvbnNlIiwidW5ibG9ja0FkcmVzc2VUYWIiLCJ0aGF0IiwibG9hZCIsImZhZGVJbiIsInJlc3BvbnNlUHJvZHVpdHMiLCJoaWRlIiwiZmFkZU91dCIsInBhcmVudCIsInRhYiIsImNob2l4RGVidXQiLCJ0ZXh0IiwiY2hvaXhGaW4iLCJkYXRlIiwic2hvdyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1TZXJpYWxpemUiLCJzZXJpYWxpemUiLCJ1bmJsb2NrVmFsaWRhdGlvblRhYiIsImlkIiwidG9rZW4iLCJ0b3RhbFRUQyIsInByaXgiLCJQYXlwbHVnIiwic2hvd1BheW1lbnQiLCJ2YWxpZGVBamF4UGFuaWVyIiwicmVtb3ZlQ2xhc3MiLCJ1bmJsb2NrUGF5bWVudFRhYiIsImlkU2FsbGUiLCJpc0Rpc3BvIiwiZXZlbnQiLCJ1aSIsImFqYXhSZWNoZXJjaGVTYWxsZXMiLCJmaW5kIiwidmFsdWUiLCJyZWZyZXNoUGFuaWVyIiwiZXYiLCJsZW5ndGgiLCJjcCIsImJlZm9yZVNlbmQiLCJyZW1vdmUiLCJlYWNoIiwidmlsbGUiLCJpbmRleCIsImtleXVwIiwiZmlyc3RTZWF0TGFiZWwiLCJpbml0Q2FydGVJbnRlcmFjdGl2ZSIsIiRjYXJ0IiwiJGNvdW50ZXIiLCIkdG90YWwiLCJzYyIsInNlYXRDaGFydHMiLCJtYXAiLCJzZWF0cyIsIm4iLCJwcmljZSIsImNsYXNzZXMiLCJjYXRlZ29yeSIsInAiLCJuYW1pbmciLCJ0b3AiLCJnZXRMYWJlbCIsImNoYXJhY3RlciIsInJvdyIsImNvbHVtbiIsImxlZ2VuZCIsIm5vZGUiLCJpdGVtcyIsImNsaWNrIiwic3RhdHVzIiwic2V0dGluZ3MiLCJsYWJlbCIsImF0dHIiLCJhcHBlbmRUbyIsInJlY2FsY3VsYXRlVG90YWwiLCJzdHlsZSIsImdldCIsInBhcmVudHMiLCJ0b3RhbCIsImZuIiwic2V0dXAiLCJzZWF0SWRzIiwiYW5pbWF0ZSIsImxlZnQiLCJnZXRJZCIsImZvY3VzIiwiYmx1ciIsInNlYXQiLCJzZWF0Q2hhcnRzU2V0dGluZ3MiLCJleHRlbmQiLCIkbm9kZSIsInJvbGUiLCJmb2N1c2FibGUiLCJ0YWJJbmRleCIsImFkZENsYXNzIiwiY29uY2F0Iiwiam9pbiIsImNoYXIiLCJhcmd1bWVudHMiLCJuZXdTdHlsZSIsIm9sZFN0eWxlIiwic3dpdGNoQ2xhc3MiLCJzZWF0U2V0dGluZ3MiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImFwcGx5IiwiJHNlYXQiLCIkbmV3U2VhdCIsIndoaWNoIiwiZmluZEF2YWlsYWJsZSIsIiRyb3dzIiwiJHNlYXRzIiwiJGN1cnJlbnRSb3ciLCIkbmV3Um93IiwibGFzdCIsImZpcnN0IiwiZXEiLCJoYXNDbGFzcyIsInJvd3MiLCJpIiwicHVzaCIsImNvbHVtbnMiLCJzcGxpdCIsIiRoZWFkZXJSb3ciLCJjaGFyYWN0ZXJzIiwiJHJvdyIsIm1hdGNoIiwiY2hhcmFjdGVyUGFyYW1zIiwibWF0Y2hlcyIsInBhcmFtcyIsIm92ZXJyaWRlSWQiLCJvdmVycmlkZUxhYmVsIiwiJGNvbnRhaW5lciIsImluc2VydEFmdGVyIiwiJHVsIiwiaXRlbSIsInNlYXRzSWRzIiwibmV3U3RhdHVzIiwic2VhdElkIiwiY2FsbCIsInF1ZXJ5Iiwic2VhdFNldCIsInNldCIsIlJlZ0V4cCIsImluZGV4T2YiLCJwYXJ0cyIsImFyZ3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdESTtBQUNBQSxFQUFFQyxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHlCQUF4QixFQUFtRCxZQUFVO0FBQ3pERixNQUFFRyxJQUFGLENBQU87QUFDSEMsYUFBS0MsUUFBUUMsUUFBUixDQUFpQiwyQkFBakIsQ0FERjtBQUVIQyxjQUFN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Q0ExbUJELEVBMG1CR29LLE1BMW1CSCxFIiwiZmlsZSI6ImFqYXguNmFmOWQ1YTU5OTY0NDVlNDYzNWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGY4YjVkZGFjZjVmYTNiZjEzYmUiLCIgICAgLy8gQWpvdXQgZCd1biBwcm9kdWl0IGF1IHBhbmllciBhamF4XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5idXR0b25BZGRQcm9kdWN0UGFuaWVyJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9ham91dF9wcm9kdWl0X3BhbmllcicpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiAkKHRoaXMpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBSYWZyYWljaGlzc2VtZW50IGR1IHBhbmllciBhamF4XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnJvdy5wYW5pZXItbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHJlZnJlc2ggUGFuaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllckljb25NZW51KCl7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGFuaWVyX2ljb25fbWVudScpLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICQoJyNwYW5pZXItaWNvbi1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpLmVmZmVjdCggXCJib3VuY2VcIiwge3RpbWVzOjN9LCAzMDAgKTtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSByZWZyZXNoIFBhbmllcicpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4QWpvdXRQcm9kdWl0UGFuaWVyLmpzIiwiLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIFByb2R1aXQgIzJcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3Bhbmllcl9pc19ub3RfZW1wdHknKSxcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cykge1xuICAgICAgICAgICAgaWYocmVzcG9uc2UgPSBcIlN1Y2Nlc3NcIil7XG4gICAgICAgICAgICAgICAgdW5ibG9ja0FkcmVzc2VUYWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgdsOpcmlmY2F0aW9uIGRlIHBhbmllcicpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAkLmFqYXgoe1xuICAgIC8vICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FsbG93ZWRfdmFsaWRhdGlvbicpLFxuICAgIC8vICAgICB0eXBlOiBcIkdFVFwiLFxuICAgIC8vICAgICBhc3luYzogdHJ1ZSxcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKSB7XG4gICAgLy8gICAgICAgICBpZihyZXNwb25zZSA9IFwiU3VjY2Vzc1wiKXtcbiAgICAvLyAgICAgICAgICAgICB1bmJsb2NrVmFsaWRhdGlvblRhYigpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBhY2PDqHMgw6AgbGEgdmFsaWRhdGlvbicpO1xuICAgIC8vICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcbiAgICAvL1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG59KTtcblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay1wcm9kdWl0JywgZnVuY3Rpb24oKXtcblxuICAgIC8vIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIC8vIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgLy8gdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG4gICAgLy8gdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhpZFNhbGxlICsgJ2lkc2FsbGUnKTtcbiAgICAvLyAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncHJvZHVpdHNfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUHJvZHVpdHMsIHRleHRTdGF0dXMpIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQcm9kdWl0cyk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKCkuZmFkZU91dCgpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZSgpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgIC8vICQuZ2V0KFJvdXRpbmcuZ2VuZXJhdGUoJycpLCBmdW5jdGlvbihodG1sKXtcbiAgICAgICAgICAgIC8vICAgICAkKCcjZGlzcGxheS1wYW5pZXInKS5lbXB0eSgpLmh0bWwoaHRtbCk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG5cbn0pO1xuXG4vLyBMb3JzcXUnb24gY2xpcXVlIHN1ciBsYSBib3V0b24gU2FsbGUgIzFcbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjdGFiLWxpbmstc2FsbGUnLCBmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkudGFiKCdzaG93Jyk7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcblxuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnKTtcbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcpO1xuXG4gICAgJCgnI3NsaWRlci1yYW5nZSAuaGV1cmVBY3R1ZWxsZURlZmF1dCcpLnZhbChcIlwiKTtcblxuICAgIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjAuNVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiMwMDBcIn0pO1xuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdzYWxsZXNfZGlzcG9uaWJsZScpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1Jykuc2hvdyhcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5zaG93KFwic2xvd1wiKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGxhIHJlY2hlcmNoZSBkZXMgZGlzcG9uaWJpbGl0w6lzIGRlIHNhbGxlcycpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuLy8gTG9yc3F1J29uIGNsaXF1ZSBzdXIgbGEgYm91dG9uIEZhY3R1cmF0aW9uICMzXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnI3RhYi1saW5rLWZhY3R1cmF0aW9uJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgdmFyIGRhdGUgPSAgJCgnI2RhdGVwaWNrZXItYWx0Rm9ybWF0JykudmFsKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyk7XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnKTtcblxuICAgICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG5cbiAgICB0aGF0ID0gJCh0aGlzKTtcblxuICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIwLjVcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjMDAwXCJ9KTtcbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9hZHJlc3Nlc19wYW5pZXInKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZShcInNsb3dcIik7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZXMgYWRyZXNzZXMgZGUgZmFjdHVyYXRpb24gJyk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG59KTtcblxuXG4vLyBMb3JzcXUnb24gY2xpcXVlIHN1ciBsYSBib3V0b24gVmFsaWRhdGlvbiAjNFxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0YWItbGluay12YWxpZGF0aW9uJywgZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF92YWxpZGF0aW9uX3BhbmllcicpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAkKCcucmVzZXJ2YXRpb24tc2VsZWN0LWNyZW5lYXUnKS5oaWRlKFwic2xvd1wiKTtcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoXCJzbG93XCIpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZXMgYWRyZXNzZXMgZGUgZmFjdHVyYXRpb24gJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cbi8vICQoJyNmb3JtLXZhbGlkLWFkcmVzc2UnKS5hamF4Rm9ybSh7XG4vLyAgICAgdGFyZ2V0OiAnI2Rpc3BsYXktc2FsbGUnXG4vLyB9KTtcblxuJChkb2N1bWVudCkub24oJ3N1Ym1pdCcsICcjZm9ybS12YWxpZC1hZHJlc3NlJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdXJsID0gUm91dGluZy5nZW5lcmF0ZSgnYWpheF92YWxpZGF0aW9uX3BhbmllcicpO1xuICAgIHZhciBmb3JtU2VyaWFsaXplID0gJCh0aGlzKS5zZXJpYWxpemUoKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3ZhbGlkYXRpb25fcGFuaWVyJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBmb3JtU2VyaWFsaXplLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICB1bmJsb2NrVmFsaWRhdGlvblRhYigpO1xuICAgICAgICAgICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24nKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZShcInNsb3dcIilcbiAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoXCJzbG93XCIpO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZSB2YWxpZGF0aW9uJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc3VibWl0JywgJyNhamF4UGF5bWVudCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gdmFyIGRhdGEgPSB7fTtcbiAgICAvLyBkYXRhWyQodGhpcykuY2hpbGRyZW4oJ2lucHV0JykuYXR0cigndG9rZW4nKV0gPSAkKHRoaXMpLmNoaWxkcmVuKCkuYXR0cigndG9rZW4nKS52YWwoKTtcbiAgICAvLyBkYXRhWyQodGhpcykuY2hpbGRyZW4oJ2ludXB1dCcpLmF0dHIoJ3RvdGFsVFRDJyldID0gJCh0aGlzKS5jaGlsZHJlbigpLmF0dHIoJ3RvdGFsVFRDJykudmFsKCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3BhaWVtZW50X2NvbW1hbmRlJywge2lkOiAgJCgnLmlkY29tbWFuZGUnKS52YWwoKX0pLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0ZTogJCgnLmlkY29tbWFuZGUnKS52YWwoKSxcbiAgICAgICAgICAgIHRva2VuOiAkKCcudG9rZW4nKS52YWwoKSxcbiAgICAgICAgICAgIHRvdGFsVFRDOiAkKCcudG90YWxUVEMnKS52YWwoKSxcbiAgICAgICAgICAgIHByaXg6ICQoJy5wcml4JykudmFsKCksXG5cbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgUGF5cGx1Zy5zaG93UGF5bWVudChyZXNwb25zZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBkXFwnYWNjZXMgw6AgbGEgcGFnZSBkZSB2YWxpZGF0aW9uJyk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc3VibWl0JywgJyNhamF4QWRkTmV3QWRyZXNzZScsICBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciB1cmwgPSBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2FkcmVzc2VzX3BhbmllcicpO1xuICAgIHZhciBmb3JtU2VyaWFsaXplID0gJCh0aGlzKS5zZXJpYWxpemUoKTtcblxuICAgICQoJyNkaXNwbGF5LXNhbGxlJykuYXBwZW5kKCkubG9hZCgnL2Fzc2V0cy9sb2FkZXIuaHRtbCcpLmZhZGVJbignc2xvdycpO1xuXG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfYWRyZXNzZXNfcGFuaWVyJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiBmb3JtU2VyaWFsaXplLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjZGlzcGxheS1zYWxsZScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoXCJzbG93XCIpO1xuICAgICAgICAgICAgJCgnLnJlY2hlcmNoZS1ob3JhaXJlJykuaGlkZShcInNsb3dcIik7XG5cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2Jsw6htZSBkYW5zIGRcXCdhY2NlcyDDoCBsYWpvdXQgZGUgbGFkcmVzc2UnKTtcblxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZhbHNlO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdidXR0b24udmFsaWRQYW5pZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFsaWRlQWpheFBhbmllcigpO1xufSk7XG5cbmZ1bmN0aW9uIHZhbGlkZUFqYXhQYW5pZXIoKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9hZHJlc3Nlc19wYW5pZXInKSxcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHVuYmxvY2tBZHJlc3NlVGFiKCk7XG4gICAgICAgICAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24nKS5wYXJlbnQoKS50YWIoJ3Nob3cnKTtcbiAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2UpO1xuICAgICAgICAgICAgJCgnLnJlc2VydmF0aW9uLXNlbGVjdC1jcmVuZWF1JykuaGlkZShcInNsb3dcIik7XG4gICAgICAgICAgICAkKCcucmVjaGVyY2hlLWhvcmFpcmUnKS5oaWRlKFwic2xvd1wiKTtcblxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgZFxcJ2FjY2VzIMOgIGxhIHBhZ2UgZGVzIGFkcmVzc2VzIGRlIGZhY3R1cmF0aW9uICcpO1xuXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2tBZHJlc3NlVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW5MaW5rJyk7XG4gICAgJCgnI3RhYi1saW5rLWZhY3R1cmF0aW9uID4gc3BhbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuJyk7XG59XG5cbmZ1bmN0aW9uIHVuYmxvY2tWYWxpZGF0aW9uVGFiKCl7XG4gICAgJCgnI3RhYi1saW5rLXZhbGlkYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstdmFsaWRhdGlvbiA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrUGF5bWVudFRhYigpe1xuICAgICQoJyN0YWItbGluay1wYWllbWVudCcpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuTGluaycpO1xuICAgICQoJyN0YWItbGluay1wYWllbWVudCA+IHNwYW4nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbicpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hhbmdlVHVubmVsQWNoYXQuanMiLCIkKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ1dHRvblNlYXJjaCcsIGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgY2hvaXhEZWJ1dCA9ICQoJy5zbGlkZXItdGltZScpLnRleHQoKTtcbiAgICB2YXIgY2hvaXhGaW4gPSAkKCcuc2xpZGVyLXRpbWUyJykudGV4dCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuXG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcblxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4Q2hlY2tEaXNwb0RhdGUuanMiLCIvLyBBam91dCBkJ3VuZSBzYWxsZSBlbiBhamF4IGF1IGNsaWNrIGR1IGJvdXRvbiBDaG9pc2lyIFNhbGxlXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnYnV0dG9uLmJ0bi1zdWNjZXNzLmJ1dHRvbkFkZFNhbGxlJywgZnVuY3Rpb24oKXtcblxuICAgIHZhciBjaG9peERlYnV0ID0gJCgnLnNsaWRlci10aW1lJykudGV4dCgpO1xuICAgIHZhciBjaG9peEZpbiA9ICQoJy5zbGlkZXItdGltZTInKS50ZXh0KCk7XG4gICAgLy8gdmFyIGFyclRpbWUgPSAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKCkuc3BsaXQoJzonKTtcbiAgICAvLyB2YXIgZGF0ZUR1Sm91ciA9IGFyclRpbWVbMl07XG4gICAgdmFyIGlkU2FsbGUgPSAkKHRoaXMpLnZhbCgpO1xuICAgIHZhciBkYXRlID0gICQoJyNkYXRlcGlja2VyLWFsdEZvcm1hdCcpLnZhbCgpO1xuICAgIGNvbnNvbGUubG9nKCdkYXRlIGFsdEZvcm1hdCcgKyBkYXRlKTtcblxuXG4gICAgLy9jb25zb2xlLmxvZyhpZFNhbGxlICsgJ2lkc2FsbGUnKTtcbiAgIC8vICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoXCJcIik7XG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAkKCcjZGlzcGxheS1zYWxsZScpLmFwcGVuZCgpLmxvYWQoJy9hc3NldHMvbG9hZGVyLmh0bWwnKS5mYWRlSW4oKTtcbiAgICAkKCcjdGFiLWxpbmstcHJvZHVpdCcpLnBhcmVudCgpLnRhYignc2hvdycpO1xuXG4gICAgLy8gMS0gT24gdsOpcmlmaWUgbGEgZGlzcG9uYmlsaXTDqSBkZSBsYSBzYWxsZVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnc2FsbGVzX2Rpc3BvbmlibGVfYWpheCcpLFxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgXCJoZXVyZUNob2l4RGVidXRcIjogZGF0ZSArICcgJyArIGNob2l4RGVidXQgKyc6MDAnLFxuICAgICAgICAgICAgXCJoZXVyZUNob2l4RmluXCI6IGRhdGUgKyAnICcgKyBjaG9peEZpbiArJzowMCcsXG4gICAgICAgICAgICBcImlkU2FsbGVcIiA6IGlkU2FsbGUsXG4gICAgICAgICAgICBcImRhdGVcIjogZGF0ZVxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoaXNEaXNwbywgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaXNEaXNwbyA9ICcxJykge1xuICAgICAgICAgICAgICAgIC8vMi0gT24gYWpvdXRlIGxhIHNhbGxlIGNob2lzaSBkYW5zIHNlc3Npb24gZHUgcGFuaWVyXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdham91dF9wYW5pZXJfc2FsbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peERlYnV0XCI6IGRhdGUgKyAnICcgKyBjaG9peERlYnV0ICsnOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGV1cmVDaG9peEZpblwiOiBkYXRlICsgJyAnICsgY2hvaXhGaW4gKyc6MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiIDogaWRTYWxsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBkYXRlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86w6AgbWV0dHJlIGVuIHBhcmFsbMOobGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy0gT24gbWV0cyDDoCBqb3VyIGxlIHBhbmllciBhamF4XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc0Rpc3BvID0gJzEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFBhbmllckljb25NZW51KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmJsb2NrQWRyZXNzZVRhYigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gNC0gT24gY2hhcmdlIGxhIHZ1ZSBkZXMgcHJvZHVpdHMgYWpheFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3Byb2R1aXRzX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVByb2R1aXRzLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNkaXNwbGF5LXNhbGxlJykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQcm9kdWl0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZXNlcnZhdGlvbi1zZWxlY3QtY3JlbmVhdScpLmhpZGUoKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yZWNoZXJjaGUtaG9yYWlyZScpLmhpZGUoKS5mYWRlT3V0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIHLDqWN1cMOpcmF0aW9uIGRlcyBwcm9kdXRpcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdMYSBzYWxsZSBuXFwnZXN0IHBsdXMgZGlzcG9uaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGFqb3V0IGRlIGxhIHNhbGxlIGNob2lzaScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIDItXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgYWpvdXQgc2FsbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyAxLVxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGxvcnMgZGUgbGEgdsOpcmlmaWNhdGlvbiBkZSBsYSBkaXNwb25pYmlsaXTDqSBkZSBsYSBzYWxsZSBuwrAnKyBpZFNhbGxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59KTtcblxuZnVuY3Rpb24gdW5ibG9ja0FkcmVzc2VUYWIoKXtcbiAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24nKS5yZW1vdmVDbGFzcygnZ3JheUZvcmJpZGRlbkxpbmsnKTtcbiAgICAkKCcjdGFiLWxpbmstZmFjdHVyYXRpb24gPiBzcGFuJykucmVtb3ZlQ2xhc3MoJ2dyYXlGb3JiaWRkZW4nKTtcbn1cblxuZnVuY3Rpb24gdW5ibG9ja1ZhbGlkYXRpb25UYWIoKXtcbiAgICAkKCcjdGFiLWxpbmstdmFsaWRhdGlvbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuTGluaycpO1xuICAgICQoJyN0YWItbGluay12YWxpZGF0aW9uID4gc3BhbicpLnJlbW92ZUNsYXNzKCdncmF5Rm9yYmlkZGVuJyk7XG59XG5cbiQoZG9jdW1lbnQpLm9uKCdzbGlkZXN0b3AnLCAnI3NsaWRlci1yYW5nZScgLCBmdW5jdGlvbihldmVudCwgdWkpe1xuICAgIGFqYXhSZWNoZXJjaGVTYWxsZXMoKTtcbn0pO1xuXG5mdW5jdGlvbiByZWZyZXNoUGFuaWVySWNvbk1lbnUoKXtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ2FqYXhfcGFuaWVyX2ljb25fbWVudScpLFxuICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKVxuICAgICAgICB7XG4gICAgICAgICAgICAkKCcjcGFuaWVyLWljb24tbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKS5lZmZlY3QoIFwiYm91bmNlXCIsIHt0aW1lczozfSwgMzAwICk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhamF4UmVjaGVyY2hlU2FsbGVzKCl7XG4gICAgdmFyIGNob2l4RGVidXQgPSAkKCcuc2xpZGVyLXRpbWUnKS50ZXh0KCk7XG4gICAgdmFyIGNob2l4RmluID0gJCgnLnNsaWRlci10aW1lMicpLnRleHQoKTtcbiAgICB2YXIgZGF0ZSA9ICAkKCcjZGF0ZXBpY2tlci1hbHRGb3JtYXQnKS52YWwoKTtcbiAgICAvLyB2YXIgYXJyVGltZSA9ICQoJyNzbGlkZXItcmFuZ2UgLmhldXJlQWN0dWVsbGVEZWZhdXQnKS52YWwoKS5zcGxpdCgnOicpO1xuICAgIC8vIHZhciBkYXRlRHVKb3VyID0gYXJyVGltZVsyXTtcbiAgICAvLyBpZiAoIWRhdGUgJiYgIWRhdGVEdUpvdXIpe1xuICAgIC8vICAgICBkYXRlID0gZGF0ZUR1Sm91cjtcbiAgICAvLyB9XG4gICAgLy9jb25zb2xlLmxvZyhkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcpO1xuICAgIC8vY29uc29sZS5sb2coZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyk7XG5cbiAgICAkKCcjc2xpZGVyLXJhbmdlIC5oZXVyZUFjdHVlbGxlRGVmYXV0JykudmFsKFwiXCIpO1xuXG4gICAgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMC41XCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiIzAwMFwifSk7XG4gICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5hcHBlbmQoKS5sb2FkKCcvYXNzZXRzL2xvYWRlci5odG1sJykuZmFkZUluKCk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3NhbGxlc19kaXNwb25pYmxlJyksXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBcImhldXJlQ2hvaXhEZWJ1dFwiOiBkYXRlICsgJyAnICsgY2hvaXhEZWJ1dCArJzowMCcsXG4gICAgICAgICAgICBcImhldXJlQ2hvaXhGaW5cIjogZGF0ZSArICcgJyArIGNob2l4RmluICsnOjAwJyxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSwgdGV4dFN0YXR1cylcbiAgICAgICAge1xuICAgICAgICAgICAgJCgnI2Rpc3BsYXktc2FsbGUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZSk7XG4gICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgZGFucyBsYSByZWNoZXJjaGUgZGVzIGRpc3BvbmliaWxpdMOpcyBkZSBzYWxsZXMnKTtcbiAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhDaG9peFNhbGxlLmpzIiwiICAgIC8vIFN1cHByZXNzaW9uIGQndW5lIHNhbGxlIGRlcHVpcyBsZSBQcm9kdWl0IEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpY2sgb24gJyArICQodGhpcykudmFsKCkpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2RlbGV0ZV9wYW5pZXInKSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBTdXBwcmVzc2lvbiBkJ3VuZSBzYWxsZSBkZXB1aXMgbGUgUGFuaWVyIEFqYXhcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbkRlbGV0ZVNhbGxlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ0NsaWNrIG9uICcgKyAkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgnYWpheF9kZWxldGVfcGFuaWVyX3NhbGxlJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkc2FsbGVcIjogJCh0aGlzKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlUGFuaWVyLCB0ZXh0U3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucm93LnBhbmllci1tZW51JykuZW1wdHkoKS5hcHBlbmQocmVzcG9uc2VQYW5pZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIE1vZGlmaWNhdGlvbiBsaXZlIGFqYXggZGUgbGEgcXVhbnRpdMOpIHBvdXIgdW4gcHJvZHVpdFxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnc2VsZWN0LnNlbGVjdC1xdGUtcHJvZHVpdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBhbGVydCggdGhpcy52YWx1ZSArICdpZHByb2R1aXQnKyAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5idXR0b25EZWxldGVQcm9kdWl0JykudmFsKCkgKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X2Fqb3V0X3Byb2R1aXRfcGFuaWVyJyksXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6ICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmJ1dHRvbkRlbGV0ZVByb2R1aXQnKS52YWwoKSxcbiAgICAgICAgICAgICAgICBcInF0ZVwiOiB0aGlzLnZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmM6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIpIHtcblxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgncGFuaWVyX2FqYXgnKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VQYW5pZXIsIHRleHRTdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpO1xuICAgICAgICAgICAgICAgIC8vJChcImJvZHlcIikuY3NzKHtcIm9wYWNpdHlcIjogXCIxXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiOlwiI2ZmZlwifSk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnUHJvYmzDqG1lIGRhbnMgbGEgcmVjaGVyY2hlIGRlcyBkaXNwb25pYmlsaXTDqXMgZGUgc2FsbGVzJyk7XG4gICAgICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5jc3Moe1wib3BhY2l0eVwiOiBcIjFcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCIjZmZmXCJ9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0pO1xuICAgIC8vICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnLnJvdy5wYW5pZXItbWVudScsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICByZWZyZXNoUGFuaWVySWNvbk1lbnUoKVxuICAgIC8vIH0pO1xuXG5cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hQYW5pZXJJY29uTWVudSgpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdhamF4X3Bhbmllcl9pY29uX21lbnUnKSxcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkKCcjcGFuaWVyLWljb24tbWVudScpLmVtcHR5KCkuYXBwZW5kKHJlc3BvbnNlUGFuaWVyKS5lZmZlY3QoIFwiYm91bmNlXCIsIHt0aW1lczozfSwgMzAwICk7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFBhbmllcigpe1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBSb3V0aW5nLmdlbmVyYXRlKCdwYW5pZXJfYWpheCcpLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBhc3luYzogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVBhbmllciwgdGV4dFN0YXR1cylcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgICQoJy5yb3cucGFuaWVyLW1lbnUnKS5lbXB0eSgpLmFwcGVuZChyZXNwb25zZVBhbmllcik7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdQcm9ibMOobWUgcmVmcmVzaCBQYW5pZXInKTtcbiAgICAgICAgICAgICAgICAvLyQoXCJib2R5XCIpLmNzcyh7XCJvcGFjaXR5XCI6IFwiMVwiLCBcImJhY2tncm91bmQtY29sb3JcIjpcIiNmZmZcIn0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vd2ViL2Fzc2V0cy9qcy9hamF4L2FqYXhQYW5pZXIuanMiLCIkKCcjZGlzcGxheS1zYWxsZScpLm9uKCdrZXl1cCcsICcuY3AnLCBmdW5jdGlvbihldil7XG4gICAgY29uc29sZS5sb2coJ2tleXVwJyk7XG4gICAgaWYgKCQodGhpcykudmFsKCkubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogUm91dGluZy5nZW5lcmF0ZSgndmlsbGVzJyx7Y3A6ICAkKHRoaXMpLnZhbCgpfSksXG5cbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKFwiLmxvYWRpbmctdmlsbGVcIikubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJChcImZvcm0gLnZpbGxlXCIpLnBhcmVudCgpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxvYWRpbmctdmlsbGVcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChcIi52aWxsZSBvcHRpb25cIikucmVtb3ZlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLnZpbGxlLCBmdW5jdGlvbihpbmRleCx2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiLnZpbGxlXCIpLmFwcGVuZCgkKCc8b3B0aW9uPicseyB2YWx1ZSA6IHZhbHVlICwgdGV4dDogdmFsdWUgfSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICQoXCIubG9hZGluZy12aWxsZVwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJChcIi52aWxsZVwiKS52YWwoJycpO1xuICAgIH1cbn0pO1xuXG4kKFwiLmNwXCIpLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdrZXl1cCcpO1xuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IFJvdXRpbmcuZ2VuZXJhdGUoJ3ZpbGxlcycse2NwOiAgJCh0aGlzKS52YWwoKX0pLFxuXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChcIi5sb2FkaW5nLXZpbGxlXCIpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQoXCJmb3JtIC52aWxsZVwiKS5wYXJlbnQoKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJsb2FkaW5nLXZpbGxlXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoXCIudmlsbGUgb3B0aW9uXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS52aWxsZSwgZnVuY3Rpb24oaW5kZXgsdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIi52aWxsZVwiKS5hcHBlbmQoJCgnPG9wdGlvbj4nLHsgdmFsdWUgOiB2YWx1ZSAsIHRleHQ6IHZhbHVlIH0pKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKFwiLmxvYWRpbmctdmlsbGVcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIudmlsbGVcIikudmFsKCcnKTtcbiAgICB9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvYWpheC9hamF4VmlsbGVzLmpzIiwidmFyIGZpcnN0U2VhdExhYmVsID0gMTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cbiAgICBpZigkKCcjc2VhdC1tYXAnKS5sZW5ndGggJiYgICQoJyNzZWxlY3RlZC1zZWF0cycpLmxlbmd0aCl7XG4gICAgICAgIGluaXRDYXJ0ZUludGVyYWN0aXZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdENhcnRlSW50ZXJhY3RpdmUoKXtcbiAgICAgICAgdmFyICRjYXJ0ID0gJCgnI3NlbGVjdGVkLXNlYXRzJyksXG4gICAgICAgICAgICAkY291bnRlciA9ICQoJyNjb3VudGVyJyksXG4gICAgICAgICAgICAkdG90YWwgPSAkKCcjdG90YWwnKSxcbiAgICAgICAgICAgIHNjID0gJCgnI3NlYXQtbWFwJykuc2VhdENoYXJ0cyh7XG4gICAgICAgICAgICAgICAgbWFwOiBbXG4gICAgICAgICAgICAgICAgICAgICdwcF9fX3BwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwX19fcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBfX19wcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcHBwcHBwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwcHBwcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBwcHBwcHBwcCcsXG4gICAgICAgICAgICAgICAgICAgICdwcHBwcHBwcHBwJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BwcHBwcHBwcHAnLFxuICAgICAgICAgICAgICAgICAgICAncHBwcHBwcHBwcCcsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzZWF0czoge1xuICAgICAgICAgICAgICAgICAgICBuOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6ICdmaXJzdC1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ1BsYWNlIFZJUCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2U6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiAnZWNvbm9teS1jbGFzcycsIC8veW91ciBjdXN0b20gQ1NTIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ1BsYWNlJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hbWluZzoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaXJzdFNlYXRMYWJlbCsrO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6ICQoJyNsZWdlbmQnKSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsncCcsICdhdmFpbGFibGUnLCAnUGxhY2UgZGlzcG9uaWJsZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgWydmJywgJ3VuYXZhaWxhYmxlJywgJ0TDqWrDoCByw6lzZXJ2w6knXVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMoKSA9PSAnYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQncyBjcmVhdGUgYSBuZXcgPGxpPiB3aGljaCB3ZSdsbCBhZGQgdG8gdGhlIGNhcnQgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJzxsaT4nICsgdGhpcy5kYXRhKCkuY2F0ZWdvcnkgKyAnIFBsYWNlICMgJyArIHRoaXMuc2V0dGluZ3MubGFiZWwgKyAnOiA8Yj7igqwnICsgdGhpcy5kYXRhKCkucHJpY2UgKyAnPC9iPiA8YSBocmVmPVwiI1wiIGNsYXNzPVwiY2FuY2VsLWNhcnQtaXRlbVwiPlthbm51bGVyXTwvYT48L2xpPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ2NhcnQtaXRlbS0nICsgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnc2VhdElkJywgdGhpcy5zZXR0aW5ncy5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNhcnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogTGV0cyB1cGRhdGUgdGhlIGNvdW50ZXIgYW5kIHRvdGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogLmZpbmQgZnVuY3Rpb24gd2lsbCBub3QgZmluZCB0aGUgY3VycmVudCBzZWF0LCBiZWNhdXNlIGl0IHdpbGwgY2hhbmdlIGl0cyBzdGF1dHMgb25seSBhZnRlciByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAqICdzZWxlY3RlZCcuIFRoaXMgaXMgd2h5IHdlIGhhdmUgdG8gYWRkIDEgdG8gdGhlIGxlbmd0aCBhbmQgdGhlIGN1cnJlbnQgc2VhdCBwcmljZSB0byB0aGUgdG90YWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICRjb3VudGVyLnRleHQoc2MuZmluZCgnc2VsZWN0ZWQnKS5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICR0b3RhbC50ZXh0KHJlY2FsY3VsYXRlVG90YWwoc2MpICsgdGhpcy5kYXRhKCkucHJpY2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3NlbGVjdGVkJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXR1cygpID09ICdzZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIHRoZSBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY291bnRlci50ZXh0KHNjLmZpbmQoJ3NlbGVjdGVkJykubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FuZCB0b3RhbFxuICAgICAgICAgICAgICAgICAgICAgICAgJHRvdGFsLnRleHQocmVjYWxjdWxhdGVUb3RhbChzYykgLSB0aGlzLmRhdGEoKS5wcmljZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBpdGVtIGZyb20gb3VyIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjYXJ0LWl0ZW0tJyArIHRoaXMuc2V0dGluZ3MuaWQpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXQgaGFzIGJlZW4gdmFjYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdhdmFpbGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzKCkgPT0gJ3VuYXZhaWxhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWF0IGhhcyBiZWVuIGFscmVhZHkgYm9va2VkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3VuYXZhaWxhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvL3RoaXMgd2lsbCBoYW5kbGUgXCJbY2FuY2VsXVwiIGxpbmsgY2xpY2tzXG4gICAgICAgICQoJyNzZWxlY3RlZC1zZWF0cycpLm9uKCdjbGljaycsICcuY2FuY2VsLWNhcnQtaXRlbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vbGV0J3MganVzdCB0cmlnZ2VyIENsaWNrIGV2ZW50IG9uIHRoZSBhcHByb3ByaWF0ZSBzZWF0LCBzbyB3ZSBkb24ndCBoYXZlIHRvIHJlcGVhdCB0aGUgbG9naWMgaGVyZVxuICAgICAgICAgICAgc2MuZ2V0KCQodGhpcykucGFyZW50cygnbGk6Zmlyc3QnKS5kYXRhKCdzZWF0SWQnKSkuY2xpY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9sZXQncyBwcmV0ZW5kIHNvbWUgc2VhdHMgaGF2ZSBhbHJlYWR5IGJlZW4gYm9va2VkXG4gICAgICAgIHNjLmdldChbJzFfMicsICc0XzEnLCAnN18xJywgJzdfMiddKS5zdGF0dXMoJ3VuYXZhaWxhYmxlJyk7XG4gICAgfVxuXG59KTtcblxuZnVuY3Rpb24gcmVjYWxjdWxhdGVUb3RhbChzYykge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAvL2Jhc2ljYWxseSBmaW5kIGV2ZXJ5IHNlbGVjdGVkIHNlYXQgYW5kIHN1bSBpdHMgcHJpY2VcbiAgICBzYy5maW5kKCdzZWxlY3RlZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICB0b3RhbCArPSB0aGlzLmRhdGEoKS5wcmljZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2FqYXhHZXN0aW9uUGxhY2VzLmpzIiwiLyohXG4gKiBqUXVlcnktU2VhdC1DaGFydHMgdjEuMS41IC0+IHYyIChLYXJpbSBCT1VCUklUKVxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGV1c3ptYXJrb3dza2kvalF1ZXJ5LVNlYXQtQ2hhcnRzXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIDIwMTYgTWF0ZXVzeiBNYXJrb3dza2lcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogVXBncmFkZSBieSBhdXRob3I6IEthcmltIEJPVUJSSVRcbiAqL1xuXG4oZnVuY3Rpb24oJCkge1xuXHRcdFxuXHQvLyd1c2Ugc3RyaWN0JztcdFxuXHRcdFxuXHQkLmZuLnNlYXRDaGFydHMgPSBmdW5jdGlvbiAoc2V0dXApIHtcblxuXHRcdC8vaWYgdGhlcmUncyBzZWF0Q2hhcnRzIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudCwgcmV0dXJuIGl0XG5cdFx0aWYgKHRoaXMuZGF0YSgnc2VhdENoYXJ0cycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdFx0fVxuXHRcdFxuXHRcdHZhciBmbiAgICAgICA9IHRoaXMsXG5cdFx0XHRzZWF0cyAgICA9IHt9LFxuXHRcdFx0c2VhdElkcyAgPSBbXSxcblx0XHRcdGxlZ2VuZCxcblx0XHRcdHNldHRpbmdzID0ge1xuXHRcdFx0XHRhbmltYXRlIDogZmFsc2UsIC8vcmVxdWlyZXMgalF1ZXJ5IFVJXG5cdFx0XHRcdG5hbWluZyAgOiB7XG5cdFx0XHRcdFx0dG9wICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRsZWZ0ICAgOiB0cnVlLFxuXHRcdFx0XHRcdGdldElkICA6IGZ1bmN0aW9uKGNoYXJhY3Rlciwgcm93LCBjb2x1bW4pIHtcblx0XHRcdFx0XHRcdHJldHVybiByb3cgKyAnXycgKyBjb2x1bW47XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRMYWJlbCA6IGZ1bmN0aW9uIChjaGFyYWN0ZXIsIHJvdywgY29sdW1uKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY29sdW1uO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVnZW5kIDoge1xuXHRcdFx0XHRcdG5vZGUgICA6IG51bGwsXG5cdFx0XHRcdFx0aXRlbXMgIDogW11cblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpY2sgICA6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdHVzKCkgPT0gJ2F2YWlsYWJsZScpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnc2VsZWN0ZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5zdGF0dXMoKSA9PSAnc2VsZWN0ZWQnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2F2YWlsYWJsZSc7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb2N1cyAgOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXR1cygpID09ICdhdmFpbGFibGUnKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2ZvY3VzZWQnO1xuXHRcdFx0XHRcdH0gZWxzZSAge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGJsdXIgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnN0YXR1cygpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWF0cyAgIDoge31cblx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdC8vc2VhdCB3aWxsIGJlIGJhc2ljYWxseSBhIHNlYXQgb2JqZWN0IHdoaWNoIHdlJ2xsIHdoZW4gZ2VuZXJhdGluZyB0aGUgbWFwXG5cdFx0XHRzZWF0ID0gKGZ1bmN0aW9uKHNlYXRDaGFydHMsIHNlYXRDaGFydHNTZXR0aW5ncykge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKHNldHVwKSB7XG5cdFx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncyA9ICQuZXh0ZW5kKHtcblx0XHRcdFx0XHRcdHN0YXR1cyA6ICdhdmFpbGFibGUnLCAvL2F2YWlsYWJsZSwgdW5hdmFpbGFibGUsIHNlbGVjdGVkXG5cdFx0XHRcdFx0XHRzdHlsZSAgOiAnYXZhaWxhYmxlJyxcblx0XHRcdFx0XHRcdC8vbWFrZSBzdXJlIHRoZXJlJ3MgYW4gZW1wdHkgaGFzaCBpZiB1c2VyIGRvZXNuJ3QgcGFzcyBhbnl0aGluZ1xuXHRcdFx0XHRcdFx0ZGF0YSAgIDogc2VhdENoYXJ0c1NldHRpbmdzLnNlYXRzW3NldHVwLmNoYXJhY3Rlcl0gfHwge31cblx0XHRcdFx0XHRcdC8vYW55dGhpbmcgZ29lcyBoZXJlP1xuXHRcdFx0XHRcdH0sIHNldHVwKTtcblxuXHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlID0gJCgnPGRpdj48L2Rpdj4nKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5zZXR0aW5ncy4kbm9kZVxuXHRcdFx0XHRcdFx0LmF0dHIoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgICAgICA6IGZuLnNldHRpbmdzLmlkLFxuXHRcdFx0XHRcdFx0XHRyb2xlICAgICAgICAgICA6ICdjaGVja2JveCcsXG5cdFx0XHRcdFx0XHRcdCdhcmlhLWNoZWNrZWQnIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGZvY3VzYWJsZSAgICAgIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0dGFiSW5kZXggICAgICAgOiAtMSAvL21hbnVhbCBmb2N1c1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50ZXh0KGZuLnNldHRpbmdzLmxhYmVsKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsICdhdmFpbGFibGUnXS5jb25jYXQoXG5cdFx0XHRcdFx0XHRcdC8vbGV0J3MgbWVyZ2UgY3VzdG9tIHVzZXIgZGVmaW5lZCBjbGFzc2VzIHdpdGggc3RhbmRhcmQgSlNDIG9uZXNcblx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuY2xhc3NlcywgXG5cdFx0XHRcdFx0XHRcdHR5cGVvZiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXSA9PSBcInVuZGVmaW5lZFwiID8gXG5cdFx0XHRcdFx0XHRcdFx0W10gOiBzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHNbZm4uc2V0dGluZ3MuY2hhcmFjdGVyXS5jbGFzc2VzXG5cdFx0XHRcdFx0XHRcdCkuam9pbignICcpKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL2Jhc2ljYWxseSBhIHdyYXBwZXIgZnVuY3Rpb25cblx0XHRcdFx0XHRmbi5kYXRhID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuZGF0YTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGZuLmNoYXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmbi5zZXR0aW5ncy5jaGFyYWN0ZXI7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3MuJG5vZGU7XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogQ2FuIGVpdGhlciBzZXQgb3IgcmV0dXJuIHN0YXR1cyBkZXBlbmRpbmcgb24gYXJndW1lbnRzLlxuXHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0ICogSWYgdGhlcmUncyBubyBhcmd1bWVudCwgaXQgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgc3R5bGUuXG5cdFx0XHRcdFx0ICpcblx0XHRcdFx0XHQgKiBJZiB5b3UgcGFzcyBhbiBhcmd1bWVudCwgaXQgd2lsbCB1cGRhdGUgc2VhdCdzIHN0eWxlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0Zm4uc3R5bGUgPSBmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/XG5cdFx0XHRcdFx0XHRcdChmdW5jdGlvbihuZXdTdHlsZSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvbGRTdHlsZSA9IGZuLnNldHRpbmdzLnN0eWxlO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly9pZiBub3RoaW5nIGNoYW5nZXMsIGRvIG5vdGhpbmdcblx0XHRcdFx0XHRcdFx0XHRpZiAobmV3U3R5bGUgPT0gb2xkU3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBvbGRTdHlsZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0Ly9mb2N1c2VkIGlzIGEgc3BlY2lhbCBzdHlsZSB3aGljaCBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIHN0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLnN0YXR1cyA9IG5ld1N0eWxlICE9ICdmb2N1c2VkJyA/IG5ld1N0eWxlIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0cignYXJpYS1jaGVja2VkJywgbmV3U3R5bGUgPT0gJ3NlbGVjdGVkJyk7XG5cblx0XHRcdFx0XHRcdFx0XHQvL2lmIHVzZXIgd2FudHMgdG8gYW5pbWF0ZSBzdGF0dXMgY2hhbmdlcywgbGV0IGhpbSBkbyB0aGlzXG5cdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0c1NldHRpbmdzLmFuaW1hdGUgP1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm4uc2V0dGluZ3MuJG5vZGUuc3dpdGNoQ2xhc3Mob2xkU3R5bGUsIG5ld1N0eWxlLCAyMDApIDpcblx0XHRcdFx0XHRcdFx0XHRcdGZuLnNldHRpbmdzLiRub2RlLnJlbW92ZUNsYXNzKG9sZFN0eWxlKS5hZGRDbGFzcyhuZXdTdHlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc2V0dGluZ3Muc3R5bGUgPSBuZXdTdHlsZTtcblx0XHRcdFx0XHRcdFx0fSkoYXJndW1lbnRzWzBdKSA6IGZuLnNldHRpbmdzLnN0eWxlO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly9laXRoZXIgc2V0IG9yIHJldHJpZXZlXG5cdFx0XHRcdFx0Zm4uc3RhdHVzID0gZnVuY3Rpb24oKSB7XG5cdFxuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLnNldHRpbmdzLnN0YXR1cyA9IGFyZ3VtZW50cy5sZW5ndGggPT0gMSA/IFxuXHRcdFx0XHRcdFx0XHRmbi5zdHlsZShhcmd1bWVudHNbMF0pIDogZm4uc2V0dGluZ3Muc3RhdHVzO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0Ly91c2luZyBpbW1lZGlhdGUgZnVuY3Rpb24gdG8gY29udmllbmlldGx5IGdldCBzaG9ydGN1dCB2YXJpYWJsZXNcblx0XHRcdFx0XHQoZnVuY3Rpb24oc2VhdFNldHRpbmdzLCBjaGFyYWN0ZXIsIHNlYXQpIHtcblx0XHRcdFx0XHRcdC8vYXR0YWNoIGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdFx0XHQkLmVhY2goWydjbGljaycsICdmb2N1cycsICdibHVyJ10sIGZ1bmN0aW9uKGluZGV4LCBjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vd2Ugd2FudCB0byBiZSBhYmxlIHRvIGNhbGwgdGhlIGZ1bmN0aW9ucyBmb3IgZWFjaCBzZWF0IG9iamVjdFxuXHRcdFx0XHRcdFx0XHRmbltjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgPT0gJ2ZvY3VzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGVyZSdzIGFscmVhZHkgYSBmb2N1c2VkIGVsZW1lbnQsIHdlIGhhdmUgdG8gcmVtb3ZlIGZvY3VzIGZyb20gaXQgZmlyc3Rcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VhdHNbc2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKV0uYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0c2VhdENoYXJ0cy5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBzZWF0LnNldHRpbmdzLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNlYXQubm9kZSgpLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdCAqIFVzZXIgY2FuIHBhc3MgaGlzIG93biBjYWxsYmFjayBmdW5jdGlvbiwgc28gd2UgaGF2ZSB0byBmaXJzdCBjaGVjayBpZiBpdCBleGlzdHNcblx0XHRcdFx0XHRcdFx0XHQgKiBhbmQgaWYgbm90LCB1c2Ugb3VyIGRlZmF1bHQgY2FsbGJhY2suXG5cdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHQgKiBFYWNoIGNhbGxiYWNrIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBjdXJyZW50IHNlYXQgY29udGV4dC5cblx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm4uc3R5bGUodHlwZW9mIHNlYXRTZXR0aW5nc1tjaGFyYWN0ZXJdW2NhbGxiYWNrXSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWF0U2V0dGluZ3NbY2hhcmFjdGVyXVtjYWxsYmFja10uYXBwbHkoc2VhdCkgOiBzZWF0Q2hhcnRzU2V0dGluZ3NbY2FsbGJhY2tdLmFwcGx5KHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHQvL3RoZSBiZWxvdyB3aWxsIGJlY29tZSBzZWF0U2V0dGluZ3MsIGNoYXJhY3Rlciwgc2VhdCB0aGFua3MgdG8gdGhlIGltbWVkaWF0ZSBmdW5jdGlvblx0XHRcblx0XHRcdFx0XHR9KShzZWF0Q2hhcnRzU2V0dGluZ3Muc2VhdHMsIGZuLnNldHRpbmdzLmNoYXJhY3RlciwgZm4pO1xuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRmbi5ub2RlKClcblx0XHRcdFx0XHRcdC8vdGhlIGZpcnN0IHRocmVlIG1vdXNlIGV2ZW50cyBhcmUgc2ltcGxlXG5cdFx0XHRcdFx0XHQub24oJ2NsaWNrJywgICAgICBmbi5jbGljaylcblx0XHRcdFx0XHRcdC5vbignbW91c2VlbnRlcicsIGZuLmZvY3VzKVxuXHRcdFx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlJywgZm4uYmx1cilcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Ly9rZXlkb3duIHJlcXVpcmVzIHF1aXRlIGEgbG90IG9mIGxvZ2ljLCBiZWNhdXNlIHdlIGhhdmUgdG8ga25vdyB3aGVyZSB0byBtb3ZlIHRoZSBmb2N1c1xuXHRcdFx0XHRcdFx0Lm9uKCdrZXlkb3duJywgICAgKGZ1bmN0aW9uKHNlYXQsICRzZWF0KSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0dmFyICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdC8vZXZlcnl0aGluZyBkZXBlbmRzIG9uIHRoZSBwcmVzc2VkIGtleVxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCAoZS53aGljaCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9zcGFjZWJhciB3aWxsIGp1c3QgdHJpZ2dlciB0aGUgc2FtZSBldmVudCBtb3VzZSBjbGljayBkb2VzXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL1VQICYgRE9XTlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFRoaXMgaXMgYSByZWN1cnNpdmUsIGltbWVkaWF0ZSBmdW5jdGlvbiB3aGljaCBzZWFyY2hlcyBmb3IgdGhlIGZpcnN0IFwiZm9jdXNhYmxlXCIgcm93LlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogV2UncmUgdXNpbmcgaW1tZWRpYXRlIGZ1bmN0aW9uIGJlY2F1c2Ugd2Ugd2FudCBhIGNvbnZlbmllbnQgYWNjZXNzIHRvIHNvbWUgRE9NIGVsZW1lbnRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIFdlJ3JlIHVzaW5nIHJlY3Vyc2lvbiBiZWNhdXNlIHNvbWV0aW1lcyB3ZSBtYXkgaGl0IGFuIGVtcHR5IHNwYWNlIHJhdGhlciB0aGFuIGEgc2VhdC5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdTZWF0ID0gKGZ1bmN0aW9uIGZpbmRBdmFpbGFibGUoJHJvd3MsICRzZWF0cywgJGN1cnJlbnRSb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgJG5ld1Jvdztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2xldCdzIGRldGVybWluZSB3aGljaCByb3cgc2hvdWxkIHdlIG1vdmUgdG9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRyb3dzLmluZGV4KCRjdXJyZW50Um93KSAmJiBlLndoaWNoID09IDM4KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCB1cCBhcnJvdywgbW92ZSB0byB0aGUgbGFzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5sYXN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkcm93cy5pbmRleCgkY3VycmVudFJvdykgPT0gJHJvd3MubGVuZ3RoLTEgJiYgZS53aGljaCA9PSA0MCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly9pZiB0aGlzIGlzIHRoZSBsYXN0IHJvdyBhbmQgdXNlciBoYXMgcHJlc3NlZCBkb3duIGFycm93LCBtb3ZlIHRvIHRoZSBmaXJzdCByb3dcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRuZXdSb3cgPSAkcm93cy5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzaW5nIGVxIHRvIGdldCBhbiBlbGVtZW50IGF0IHRoZSBkZXNpcmVkIGluZGV4IHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3Um93ID0gJHJvd3MuZXEoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vaWYgdXAgYXJyb3csIHRoZW4gZGVjcmVtZW50IHRoZSBpbmRleCwgaWYgZG93biBpbmNyZW1lbnQgaXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHJvd3MuaW5kZXgoJGN1cnJlbnRSb3cpICsgKGUud2hpY2ggPT0gMzggPyAoLTEpIDogKCsxKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vbm93IHRoYXQgd2Uga25vdyB0aGUgcm93LCBsZXQncyBnZXQgdGhlIHNlYXQgdXNpbmcgdGhlIGN1cnJlbnQgY29sdW1uIHBvc2l0aW9uXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JG5ld1NlYXQgPSAkbmV3Um93LmZpbmQoJy5zZWF0Q2hhcnRzLXNlYXQsLnNlYXRDaGFydHMtc3BhY2UnKS5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2lmIHRoZSBzZWF0IHdlIGZvdW5kIGlzIGEgc3BhY2UsIGtlZXAgbG9va2luZyBmdXJ0aGVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRuZXdTZWF0Lmhhc0NsYXNzKCdzZWF0Q2hhcnRzLXNwYWNlJykgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmluZEF2YWlsYWJsZSgkcm93cywgJHNlYXRzLCAkbmV3Um93KSA6ICRuZXdTZWF0O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGFpbmVyIGFuZCB0aGVuIHNlbGVjdCBhbGwgcm93cyBidXQgdGhlIGhlYWRlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLWNvbnRhaW5lcicpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtcm93Om5vdCguc2VhdENoYXJ0cy1oZWFkZXIpJyksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JHNlYXRcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL2dldCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJvdyBhbmQgdGhlbiBmaW5kIGFsbCBzZWF0IGNlbGxzIChib3RoIHNlYXRzICYgc3BhY2VzKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpmaXJzdCcpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZmluZCgnLnNlYXRDaGFydHMtc2VhdCwuc2VhdENoYXJ0cy1zcGFjZScpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHJvd1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRzZWF0LnBhcmVudHMoJy5zZWF0Q2hhcnRzLXJvdzpub3QoLnNlYXRDaGFydHMtaGVhZGVyKScpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3dlIGNvdWxkbid0IGRldGVybWluZSB0aGUgbmV3IHNlYXQsIHNvIHdlIGJldHRlciBnaXZlIHVwXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghJG5ld1NlYXQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL3JlbW92ZSBmb2N1cyBmcm9tIHRoZSBvbGQgc2VhdCBhbmQgcHV0IGl0IG9uIHRoZSBuZXcgb25lXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlYXQuYmx1cigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdC8vTEVGVCAmIFJJR0hUXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBUaGUgbG9naWMgaGVyZSBpcyBzbGlnaHRseSBkaWZmZXJlbnQgZnJvbSB0aGUgb25lIGZvciB1cC9kb3duIGFycm93cy5cblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogVXNlciB3aWxsIGJlIGFibGUgdG8gYnJvd3NlIHRoZSB3aG9sZSBtYXAgdXNpbmcganVzdCBsZWZ0L3JpZ2h0IGFycm93LCBiZWNhdXNlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIGl0IHdpbGwgbW92ZSB0byB0aGUgbmV4dCByb3cgd2hlbiB3ZSByZWFjaCB0aGUgcmlnaHQvbGVmdC1tb3N0IHNlYXQuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdCA9IChmdW5jdGlvbigkc2VhdHMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCEkc2VhdHMuaW5kZXgoJHNlYXQpICYmIGUud2hpY2ggPT0gMzcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vdXNlciBoYXMgcHJlc3NlZCBsZWZ0IGFycm93IGFuZCB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIGxlZnQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmxhc3QoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRzZWF0cy5pbmRleCgkc2VhdCkgPT0gJHNlYXRzLmxlbmd0aCAtMSAmJiBlLndoaWNoID09IDM5KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvL3VzZXIgaGFzIHByZXNzZWQgcmlnaHQgYXJyb3cgYW5kIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgcmlnaHQtbW9zdCBzZWF0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gJHNlYXRzLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vc2ltcGx5IG1vdmUgb25lIHNlYXQgbGVmdCBvciByaWdodCBkZXBlbmRpbmcgb24gdGhlIGtleVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuICRzZWF0cy5lcSgkc2VhdHMuaW5kZXgoJHNlYXQpICsgKGUud2hpY2ggPT0gMzcgPyAoLTEpIDogKCsxKSkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KSgkc2VhdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wYXJlbnRzKCcuc2VhdENoYXJ0cy1jb250YWluZXI6Zmlyc3QnKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5maW5kKCcuc2VhdENoYXJ0cy1zZWF0Om5vdCguc2VhdENoYXJ0cy1zcGFjZSknKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoISRuZXdTZWF0Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvL2hhbmRsZSBmb2N1c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0LmJsdXIoKTtcdFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0c1skbmV3U2VhdC5hdHRyKCdpZCcpXS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkbmV3U2VhdC5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly91cGRhdGUgb3VyIFwiYXJpYVwiIHJlZmVyZW5jZSB3aXRoIHRoZSBuZXcgc2VhdCBpZFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWF0Q2hhcnRzLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsICRuZXdTZWF0LmF0dHIoJ2lkJykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcdFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0fSkoZm4sIGZuLm5vZGUoKSkpO1xuXHRcdFx0XHRcdFx0Ly8uYXBwZW5kVG8oc2VhdENoYXJ0cy5maW5kKCcuJyArIHJvdykpO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0pKGZuLCBzZXR0aW5ncyk7XG5cdFx0XHRcblx0XHRmbi5hZGRDbGFzcygnc2VhdENoYXJ0cy1jb250YWluZXInKTtcblx0XHRcblx0XHQvL3RydWUgLT4gZGVlcCBjb3B5IVxuXHRcdCQuZXh0ZW5kKHRydWUsIHNldHRpbmdzLCBzZXR1cCk7XHRcdFxuXHRcdFxuXHRcdC8vR2VuZXJhdGUgZGVmYXVsdCByb3cgaWRzIHVubGVzcyB1c2VyIHBhc3NlZCBoaXMgb3duXG5cdFx0c2V0dGluZ3MubmFtaW5nLnJvd3MgPSBzZXR0aW5ncy5uYW1pbmcucm93cyB8fCAoZnVuY3Rpb24obGVuZ3RoKSB7XG5cdFx0XHR2YXIgcm93cyA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0cm93cy5wdXNoKGkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJvd3M7XG5cdFx0fSkoc2V0dGluZ3MubWFwLmxlbmd0aCk7XG5cdFx0XG5cdFx0Ly9HZW5lcmF0ZSBkZWZhdWx0IGNvbHVtbiBpZHMgdW5sZXNzIHVzZXIgcGFzc2VkIGhpcyBvd25cblx0XHRzZXR0aW5ncy5uYW1pbmcuY29sdW1ucyA9IHNldHRpbmdzLm5hbWluZy5jb2x1bW5zIHx8IChmdW5jdGlvbihsZW5ndGgpIHtcblx0XHRcdHZhciBjb2x1bW5zID0gW107XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb2x1bW5zLnB1c2goaSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY29sdW1ucztcblx0XHR9KShzZXR0aW5ncy5tYXBbMF0uc3BsaXQoJycpLmxlbmd0aCk7XG5cdFx0XG5cdFx0aWYgKHNldHRpbmdzLm5hbWluZy50b3ApIHtcblx0XHRcdHZhciAkaGVhZGVyUm93ID0gJCgnPGRpdj48L2Rpdj4nKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtcm93IHNlYXRDaGFydHMtaGVhZGVyJyk7XG5cdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZCgkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLWNlbGwnKSk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHQkLmVhY2goc2V0dGluZ3MubmFtaW5nLmNvbHVtbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHQkaGVhZGVyUm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCcpXG5cdFx0XHRcdFx0XHQudGV4dCh2YWx1ZSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRcblx0XHRmbi5hcHBlbmQoJGhlYWRlclJvdyk7XG5cdFx0XG5cdFx0Ly9kbyB0aGlzIGZvciBlYWNoIG1hcCByb3dcblx0XHQkLmVhY2goc2V0dGluZ3MubWFwLCBmdW5jdGlvbihyb3csIGNoYXJhY3RlcnMpIHtcblxuXHRcdFx0dmFyICRyb3cgPSAkKCc8ZGl2PjwvZGl2PicpLmFkZENsYXNzKCdzZWF0Q2hhcnRzLXJvdycpO1xuXHRcdFx0XHRcblx0XHRcdGlmIChzZXR0aW5ncy5uYW1pbmcubGVmdCkge1xuXHRcdFx0XHQkcm93LmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtY2VsbCBzZWF0Q2hhcnRzLXNwYWNlJylcblx0XHRcdFx0XHRcdC50ZXh0KHNldHRpbmdzLm5hbWluZy5yb3dzW3Jvd10pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdC8qXG5cdFx0XHQgKiBEbyB0aGlzIGZvciBlYWNoIHNlYXQgKGxldHRlcilcblx0XHRcdCAqXG5cdFx0XHQgKiBOb3cgdXNlcnMgd2lsbCBiZSBhYmxlIHRvIHBhc3MgY3VzdG9tIElEIGFuZCBsYWJlbCB3aGljaCBvdmVyd3JpdGUgdGhlIG9uZSB0aGF0IHNlYXQgd291bGQgYmUgYXNzaWduZWQgYnkgZ2V0SWQgYW5kXG5cdFx0XHQgKiBnZXRMYWJlbFxuXHRcdFx0ICpcblx0XHRcdCAqIE5ldyBmb3JtYXQgaXMgbGlrZSB0aGlzOlxuXHRcdFx0ICogYVtJRCxsYWJlbF1hW0lEXWFhYWFhXG5cdFx0XHQgKlxuXHRcdFx0ICogU28geW91IGNhbiBvdmVyd3JpdGUgdGhlIElEIG9yIGxhYmVsIChvciBib3RoKSBldmVuIGZvciBqdXN0IG9uZSBzZWF0LlxuXHRcdFx0ICogQmFzaWNhbGx5IElEIHNob3VsZCBiZSBmaXJzdCwgc28gaWYgeW91IHdhbnQgdG8gb3ZlcndyaXRlIGp1c3QgbGFiZWwgd3JpdGUgaXQgYXMgZm9sbG93czpcblx0XHRcdCAqIGFbLExBQkVMXVxuXHRcdFx0ICpcblx0XHRcdCAqIEFsbG93ZWQgY2hhcmFjdGVycyBpbiBJRHMgYXJlTCAwLTksIGEteiwgQS1aLCBfXG5cdFx0XHQgKiBBbGxvd2VkIGNoYXJhY3RlcnMgaW4gbGFiZWxzIGFyZTogMC05LCBhLXosIEEtWiwgXywgJyAnIChzcGFjZSlcblx0XHRcdCAqXG5cdFx0XHQgKi9cblx0XHRcdCBcblx0XHRcdCQuZWFjaChjaGFyYWN0ZXJzLm1hdGNoKC9bYS16X117MX0oXFxbWzAtOWEtel9dezAsfSgsWzAtOWEtel8gXSspP1xcXSk/L2dpKSwgZnVuY3Rpb24gKGNvbHVtbiwgY2hhcmFjdGVyUGFyYW1zKSB7IFxuXHRcdFx0XHR2YXIgbWF0Y2hlcyAgICAgICAgID0gY2hhcmFjdGVyUGFyYW1zLm1hdGNoKC8oW2Etel9dezF9KShcXFsoWzAtOWEtel8gLF0rKVxcXSk/L2kpLFxuXHRcdFx0XHRcdC8vbm8gbWF0dGVyIGlmIHVzZXIgc3BlY2lmaWVzIFtdIHBhcmFtcywgdGhlIGNoYXJhY3RlciBzaG91bGQgYmUgaW4gdGhlIHNlY29uZCBlbGVtZW50XG5cdFx0XHRcdFx0Y2hhcmFjdGVyICAgICAgID0gbWF0Y2hlc1sxXSxcblx0XHRcdFx0XHQvL2NoZWNrIGlmIHVzZXIgaGFzIHBhc3NlZCBzb21lIGFkZGl0aW9uYWwgcGFyYW1zIHRvIG92ZXJyaWRlIGlkIG9yIGxhYmVsXG5cdFx0XHRcdFx0cGFyYW1zICAgICAgICAgID0gdHlwZW9mIG1hdGNoZXNbM10gIT09ICd1bmRlZmluZWQnID8gbWF0Y2hlc1szXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Ly9pZCBwYXJhbSBzaG91bGQgYmUgZmlyc3Rcblx0XHRcdFx0XHRvdmVycmlkZUlkICAgICAgPSBwYXJhbXMubGVuZ3RoID8gcGFyYW1zWzBdIDogbnVsbCxcblx0XHRcdFx0XHQvL2xhYmVsIHBhcmFtIHNob3VsZCBiZSBzZWNvbmRcblx0XHRcdFx0XHRvdmVycmlkZUxhYmVsICAgPSBwYXJhbXMubGVuZ3RoID09PSAyID8gcGFyYW1zWzFdIDogbnVsbDtcblx0XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0JHJvdy5hcHBlbmQoY2hhcmFjdGVyICE9ICdfJyA/XG5cdFx0XHRcdFx0Ly9pZiB0aGUgY2hhcmFjdGVyIGlzIG5vdCBhbiB1bmRlcnNjb3JlIChlbXB0eSBzcGFjZSlcblx0XHRcdFx0XHQoZnVuY3Rpb24obmFtaW5nKSB7XG5cdFxuXHRcdFx0XHRcdFx0Ly9zbyB1c2VycyBkb24ndCBoYXZlIHRvIHNwZWNpZnkgZW1wdHkgb2JqZWN0c1xuXHRcdFx0XHRcdFx0c2V0dGluZ3Muc2VhdHNbY2hhcmFjdGVyXSA9IGNoYXJhY3RlciBpbiBzZXR0aW5ncy5zZWF0cyA/IHNldHRpbmdzLnNlYXRzW2NoYXJhY3Rlcl0gOiB7fTtcblx0XG5cdFx0XHRcdFx0XHR2YXIgaWQgPSBvdmVycmlkZUlkID8gb3ZlcnJpZGVJZCA6IG5hbWluZy5nZXRJZChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pO1xuXHRcdFx0XHRcdFx0c2VhdHNbaWRdID0gbmV3IHNlYXQoe1xuXHRcdFx0XHRcdFx0XHRpZCAgICAgICAgOiBpZCxcblx0XHRcdFx0XHRcdFx0bGFiZWwgICAgIDogb3ZlcnJpZGVMYWJlbCA/XG5cdFx0XHRcdFx0XHRcdFx0b3ZlcnJpZGVMYWJlbCA6IG5hbWluZy5nZXRMYWJlbChjaGFyYWN0ZXIsIG5hbWluZy5yb3dzW3Jvd10sIG5hbWluZy5jb2x1bW5zW2NvbHVtbl0pLFxuXHRcdFx0XHRcdFx0XHRyb3cgICAgICAgOiByb3csXG5cdFx0XHRcdFx0XHRcdGNvbHVtbiAgICA6IGNvbHVtbixcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyIDogY2hhcmFjdGVyXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0c2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0c1tpZF0ubm9kZSgpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0fSkoc2V0dGluZ3MubmFtaW5nKSA6XG5cdFx0XHRcdFx0Ly90aGlzIGlzIGp1c3QgYW4gZW1wdHkgc3BhY2UgKF8pXG5cdFx0XHRcdFx0JCgnPGRpdj48L2Rpdj4nKS5hZGRDbGFzcygnc2VhdENoYXJ0cy1jZWxsIHNlYXRDaGFydHMtc3BhY2UnKVx0XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Zm4uYXBwZW5kKCRyb3cpO1xuXHRcdH0pO1xuXHRcblx0XHQvL2lmIHRoZXJlJ3JlIGFueSBsZWdlbmQgaXRlbXMgdG8gYmUgcmVuZGVyZWRcblx0XHRzZXR0aW5ncy5sZWdlbmQuaXRlbXMubGVuZ3RoID8gKGZ1bmN0aW9uKGxlZ2VuZCkge1xuXHRcdFx0Ly9laXRoZXIgdXNlIHVzZXItZGVmaW5lZCBjb250YWluZXIgb3IgY3JlYXRlIG91ciBvd24gYW5kIGluc2VydCBpdCByaWdodCBhZnRlciB0aGUgc2VhdCBjaGFydCBkaXZcblx0XHRcdHZhciAkY29udGFpbmVyID0gKGxlZ2VuZC5ub2RlIHx8ICQoJzxkaXY+PC9kaXY+JykuaW5zZXJ0QWZ0ZXIoZm4pKVxuXHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kJyk7XG5cdFx0XHRcdFxuXHRcdFx0dmFyICR1bCA9ICQoJzx1bD48L3VsPicpXG5cdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmRMaXN0Jylcblx0XHRcdFx0LmFwcGVuZFRvKCRjb250YWluZXIpO1xuXHRcdFx0XG5cdFx0XHQkLmVhY2gobGVnZW5kLml0ZW1zLCBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuXHRcdFx0XHQkdWwuYXBwZW5kKFxuXHRcdFx0XHRcdCQoJzxsaT48L2xpPicpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3NlYXRDaGFydHMtbGVnZW5kSXRlbScpXG5cdFx0XHRcdFx0XHQuYXBwZW5kKFxuXHRcdFx0XHRcdFx0XHQkKCc8ZGl2PjwvZGl2PicpXG5cdFx0XHRcdFx0XHRcdFx0Ly9tZXJnZSB1c2VyIGRlZmluZWQgY2xhc3NlcyB3aXRoIG91ciBzdGFuZGFyZCBvbmVzXG5cdFx0XHRcdFx0XHRcdFx0LmFkZENsYXNzKFsnc2VhdENoYXJ0cy1zZWF0JywgJ3NlYXRDaGFydHMtY2VsbCcsIGl0ZW1bMV1dLmNvbmNhdChcblx0XHRcdFx0XHRcdFx0XHRcdHNldHRpbmdzLmNsYXNzZXMsIFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dID09IFwidW5kZWZpbmVkXCIgPyBbXSA6IHNldHRpbmdzLnNlYXRzW2l0ZW1bMF1dLmNsYXNzZXMpLmpvaW4oJyAnKVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRcdCQoJzxzcGFuPjwvc3Bhbj4nKVxuXHRcdFx0XHRcdFx0XHRcdC5hZGRDbGFzcygnc2VhdENoYXJ0cy1sZWdlbmREZXNjcmlwdGlvbicpXG5cdFx0XHRcdFx0XHRcdFx0LnRleHQoaXRlbVsyXSlcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gJGNvbnRhaW5lcjtcblx0XHR9KShzZXR0aW5ncy5sZWdlbmQpIDogbnVsbDtcblx0XG5cdFx0Zm4uYXR0cih7XG5cdFx0XHR0YWJJbmRleCA6IDBcblx0XHR9KTtcblx0XHRcblx0XHRcblx0XHQvL3doZW4gY29udGFpbmVyJ3MgZm9jdXNlZCwgbW92ZSBmb2N1cyB0byB0aGUgZmlyc3Qgc2VhdFxuXHRcdGZuLmZvY3VzKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKGZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpKSB7XG5cdFx0XHRcdHNlYXRzW2ZuLmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpXS5ibHVyKCk7XG5cdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0Zm4uZmluZCgnLnNlYXRDaGFydHMtc2VhdDpub3QoLnNlYXRDaGFydHMtc3BhY2UpOmZpcnN0JykuZm9jdXMoKTtcblx0XHRcdHNlYXRzW3NlYXRJZHNbMF1dLmZvY3VzKCk7XG5cblx0XHR9KTtcblx0XG5cdFx0Ly9wdWJsaWMgbWV0aG9kcyBvZiBzZWF0Q2hhcnRzXG5cdFx0Zm4uZGF0YSgnc2VhdENoYXJ0cycsIHtcblx0XHRcdHNlYXRzICAgOiBzZWF0cyxcblx0XHRcdHNlYXRJZHMgOiBzZWF0SWRzLFxuXHRcdFx0Ly9zZXQgZm9yIG9uZSwgc2V0IGZvciBtYW55LCBnZXQgZm9yIG9uZVxuXHRcdFx0c3RhdHVzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGZuID0gdGhpcztcblx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PSAxID8gZm4uc2VhdHNbYXJndW1lbnRzWzBdXS5zdGF0dXMoKSA6IChmdW5jdGlvbihzZWF0c0lkcywgbmV3U3RhdHVzKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBmbi5zZWF0c1tzZWF0c0lkc10uc3RhdHVzKG5ld1N0YXR1cykgOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHQkLmVhY2goc2VhdHNJZHMsIGZ1bmN0aW9uKGluZGV4LCBzZWF0SWQpIHtcblx0XHRcdFx0XHRcdFx0Zm4uc2VhdHNbc2VhdElkXS5zdGF0dXMobmV3U3RhdHVzKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdH0pKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHRcdH0sXG5cdFx0XHRlYWNoICA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0Zm9yICh2YXIgc2VhdElkIGluIGZuLnNlYXRzKSB7XG5cdFx0XHRcdFx0aWYgKGZhbHNlID09PSBjYWxsYmFjay5jYWxsKGZuLnNlYXRzW3NlYXRJZF0sIHNlYXRJZCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZWF0SWQ7Ly9yZXR1cm4gbGFzdCBjaGVja2VkXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0sXG5cdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcdC8vYmFzaWNhbGx5IGNyZWF0ZSBhIENTUyBxdWVyeSB0byBnZXQgYWxsIHNlYXRzIGJ5IHRoZWlyIERPTSBpZHNcblx0XHRcdFx0cmV0dXJuICQoJyMnICsgZm4uc2VhdElkcy5qb2luKCcsIycpKTtcblx0XHRcdH0sXG5cblx0XHRcdGZpbmQgICAgICAgOiBmdW5jdGlvbihxdWVyeSkgey8vRCwgYS5hdmFpbGFibGUsIHVuYXZhaWxhYmxlXG5cdFx0XHRcdHZhciBmbiA9IHRoaXM7XG5cdFx0XHRcblx0XHRcdFx0dmFyIHNlYXRTZXQgPSBmbi5zZXQoKTtcblx0XHRcdFxuXHRcdFx0XHQvL2lzIFJlZ0V4cFxuXHRcdCAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uIChpZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQubWF0Y2gocXVlcnkpKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2goaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgIChxdWVyeS5sZW5ndGggPT0gMSA/XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZXIgc2VhcmNoZXMganVzdCBmb3IgYSBwYXJ0aWN1YWwgY2hhcmFjdGVyXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyKCkgPT0gY2hhcmFjdGVyKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRTZXQucHVzaCh0aGlzLnNldHRpbmdzLmlkLCB0aGlzKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHRcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWF0U2V0O1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShxdWVyeSkgOlxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VyIHJ1bnMgYSBtb3JlIHNvcGhpc3RpY2F0ZWQgcXVlcnksIHNvIGxldCdzIHNlZSBpZiB0aGVyZSdzIGEgZG90XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVlcnkuaW5kZXhPZignLicpID4gLTEgP1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlcmUncyBhIGRvdCB3aGljaCBzZXBhcmF0ZXMgY2hhcmFjdGVyIGFuZCB0aGUgc3RhdHVzXG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHF1ZXJ5LnNwbGl0KCcuJyk7XG5cdFx0XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuLmVhY2goZnVuY3Rpb24gKHNlYXRJZCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcigpID09IHBhcnRzWzBdICYmIHRoaXMuc3RhdHVzKCkgPT0gcGFydHNbMV0pIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWF0U2V0LnB1c2godGhpcy5zZXR0aW5ncy5pZCwgdGhpcyk7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXHRcdFxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VhdFNldDtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpIDpcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbi5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cygpID09IHF1ZXJ5KSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhdFNldC5wdXNoKHRoaXMuc2V0dGluZ3MuaWQsIHRoaXMpO1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlYXRTZXQ7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKTtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxuXHRcdCAgICAgICAgICAgICAgICAgICAgKTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0c2V0ICAgICAgICA6IGZ1bmN0aW9uIHNldCgpIHsvL2luaGVyaXRzIHNvbWUgbWV0aG9kc1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzZWF0cyAgICAgIDogW10sXG5cdFx0XHRcdFx0c2VhdElkcyAgICA6IFtdLFxuXHRcdFx0XHRcdGxlbmd0aCAgICAgOiAwLFxuXHRcdFx0XHRcdHN0YXR1cyAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzLFxuXHRcdFx0XHRcdFx0XHR0aGF0ID0gdGhpcztcblx0XHRcdFx0XHRcdC8vaWYgdGhlcmUncyBqdXN0IG9uZSBzZWF0IGluIHRoZSBzZXQgYW5kIHVzZXIgZGlkbid0IHBhc3MgYW55IHBhcmFtcywgcmV0dXJuIGN1cnJlbnQgc3RhdHVzXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5sZW5ndGggPT0gMSAmJiBhcmdzLmxlbmd0aCA9PSAwID8gdGhpcy5zZWF0c1swXS5zdGF0dXMoKSA6IChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Ly9vdGhlcndpc2UgY2FsbCBzdGF0dXMgZnVuY3Rpb24gZm9yIGVhY2ggb2YgdGhlIHNlYXRzIGluIHRoZSBzZXRcblx0XHRcdFx0XHRcdFx0JC5lYWNoKHRoYXQuc2VhdHMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdHVzLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRub2RlICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4ubm9kZS5jYWxsKHRoaXMpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZWFjaCAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmVhY2guY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0pO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Z2V0ICAgICAgICA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZuLmdldC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRmaW5kICAgICAgIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZm4uZmluZC5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQgICAgICAgOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzZXQuY2FsbChmbik7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRwdXNoICAgICAgIDogZnVuY3Rpb24oaWQsIHNlYXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdHMucHVzaChzZWF0KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VhdElkcy5wdXNoKGlkKTtcblx0XHRcdFx0XHRcdCsrdGhpcy5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdC8vZ2V0IG9uZSBvYmplY3Qgb3IgYSBzZXQgb2Ygb2JqZWN0c1xuXHRcdFx0Z2V0ICAgOiBmdW5jdGlvbihzZWF0c0lkcykge1xuXHRcdFx0XHR2YXIgZm4gPSB0aGlzO1xuXG5cdFx0XHRcdHJldHVybiB0eXBlb2Ygc2VhdHNJZHMgPT0gJ3N0cmluZycgPyBcblx0XHRcdFx0XHRmbi5zZWF0c1tzZWF0c0lkc10gOiAoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdHZhciBzZWF0U2V0ID0gZm4uc2V0KCk7XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdCQuZWFjaChzZWF0c0lkcywgZnVuY3Rpb24oaW5kZXgsIHNlYXRJZCkge1xuXHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGZuLnNlYXRzW3NlYXRJZF0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VhdFNldC5wdXNoKHNlYXRJZCwgZm4uc2VhdHNbc2VhdElkXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VhdFNldDtcblx0XHRcdFx0XHR9KSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdHJldHVybiBmbi5kYXRhKCdzZWF0Q2hhcnRzJyk7XG5cdH1cblx0XG5cdFxufSkoalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3dlYi9hc3NldHMvanMvcGxhY2VzL2pxdWVyeS5zZWF0LWNoYXJ0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=