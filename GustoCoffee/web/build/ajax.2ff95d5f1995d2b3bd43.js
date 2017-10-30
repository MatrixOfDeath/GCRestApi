webpackJsonp([1],{

/***/ "./web/assets/js/ajax/ajaxAjoutProduitPanier.js":
/*!******************************************************!*\
  !*** ./web/assets/js/ajax/ajaxAjoutProduitPanier.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Ajout d'un produit au panier ajax
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/ajax/ajaxChangeTunnelAchat.js":
/*!*****************************************************!*\
  !*** ./web/assets/js/ajax/ajaxChangeTunnelAchat.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Lorsqu'on clique sur la bouton Produit #2

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/ajax/ajaxCheckDispoDate.js":
/*!**************************************************!*\
  !*** ./web/assets/js/ajax/ajaxCheckDispoDate.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(document).on('click', 'button.buttonSearch', function () {

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js":
/*!*******************************************************!*\
  !*** ./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(document).on('click', 'button.buttonSearchPlace', function () {

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/ajax/ajaxChoixPlace.js":
/*!**********************************************!*\
  !*** ./web/assets/js/ajax/ajaxChoixPlace.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Ajout d'une salle en ajax au click du bouton Choisir Salle
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/ajax/ajaxChoixSalle.js":
/*!**********************************************!*\
  !*** ./web/assets/js/ajax/ajaxChoixSalle.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Ajout d'une salle en ajax au click du bouton Choisir Salle
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/ajax/ajaxPanier.js":
/*!******************************************!*\
  !*** ./web/assets/js/ajax/ajaxPanier.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// Suppression d'une salle depuis le Produit Ajax
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/ajax/ajaxVilles.js":
/*!******************************************!*\
  !*** ./web/assets/js/ajax/ajaxVilles.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$('#display-salle').on('keyup', '.cp', function (ev) {
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/places/ajaxGestionPlaces.js":
/*!***************************************************!*\
  !*** ./web/assets/js/places/ajaxGestionPlaces.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery, $) {var firstSeatLabel = 1;
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./web/assets/js/places/jquery.seat-charts.js":
/*!****************************************************!*\
  !*** ./web/assets/js/places/jquery.seat-charts.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 2:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./web/assets/js/ajax/ajaxCheckDispoDate.js ./web/assets/js/ajax/ajaxCheckPlaceDispoDate.js ./web/assets/js/ajax/ajaxChoixSalle.js ./web/assets/js/ajax/ajaxChoixPlace.js ./web/assets/js/ajax/ajaxAjoutProduitPanier.js ./web/assets/js/ajax/ajaxPanier.js ./web/assets/js/ajax/ajaxChangeTunnelAchat.js ./web/assets/js/places/jquery.seat-charts.js ./web/assets/js/places/ajaxGestionPlaces.js ./web/assets/js/ajax/ajaxVilles.js ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
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

},[2]);