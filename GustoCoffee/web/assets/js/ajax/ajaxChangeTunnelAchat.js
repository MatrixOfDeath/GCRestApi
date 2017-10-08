// Lorsqu'on clique sur la bouton Produit #2

$(document).ready(function() {
    $.ajax({
        url: Routing.generate('panier_is_not_empty'),
        type: "GET",
        async: true,
        success: function (response, textStatus) {
            if(response = "Success"){
                unblockAdresseTab();
            }
        },
        error: function (data) {
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

$(document).on('click', '#tab-link-produit', function(){

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
        success: function (responseProduits, textStatus) {
            $('#display-salle').empty().append(responseProduits);
            $('.reservation-select-creneau').hide().fadeOut();
            $('.recherche-horaire').hide().fadeOut();
            // $.get(Routing.generate(''), function(html){
            //     $('#display-panier').empty().html(html);
            //
            // });
        },
        error: function (data) {
            console.log(data);
            alert('Problème récupération des produtis');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });

    return false;

});

// Lorsqu'on clique sur la bouton Salle #1
$(document).on('click', '#tab-link-salle', function(){
    $(this).parent().tab('show');
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date =  $('#datepicker-altFormat').val();

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
            "heureChoixDebut": date + ' ' + choixDebut +':00',
            "heureChoixFin": date + ' ' + choixFin +':00',
        },
        async: true,
        success: function (response, textStatus)
        {
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').show().fadeIn();
            $('.recherche-horaire').show().fadeIn();
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        },
        error: function(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });
    return false;

});

// Lorsqu'on clique sur la bouton Facturation #3
$(document).on('click', '#tab-link-facturation', function(){
    $(this).parent().tab('show');
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date =  $('#datepicker-altFormat').val();

    //console.log(date + ' ' + choixDebut +':00');
    //console.log(date + ' ' + choixFin +':00');

    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('ajax_adresses_panier'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut +':00',
            "heureChoixFin": date + ' ' + choixFin +':00',
        },
        async: true,
        success: function (response, textStatus)
        {
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide().fadeOut();
            $('.recherche-horaire').hide().fadeOut();
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        },
        error: function(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page des adresses de facturation ');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });
    return false;

});


// Lorsqu'on clique sur la bouton Facturation #3
$(document).on('click', '#tab-link-validation', function(){
    $(this).parent().tab('show');


    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('ajax_validation_panier'),
        type: "POST",
        async: true,
        success: function (response, textStatus)
        {
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide().fadeOut();
            $('.recherche-horaire').hide().fadeOut();

        },
        error: function(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page des adresses de facturation ');

        }
    });
    return false;

});

$('#valid-adresse').ajaxForm(function(response) {
    alert(response);
});

$(document).on('click', 'button.validPanier', function () {
    valideAjaxPanier();
});

function valideAjaxPanier(){
    $(this).parent().tab('show');

    that = $(this);

    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('ajax_adresses_panier'),
        type: "POST",
        async: true,
        success: function (response, textStatus)
        {
            unblockAdresseTab();
            $('#tab-link-facturation').parent().tab('show');
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').hide().fadeOut();
            $('.recherche-horaire').hide().fadeOut();

        },
        error: function(data) {
            console.log(data);
            alert('Problème dans d\'acces à la page des adresses de facturation ');

        }
    });
    return false;
}

function unblockAdresseTab(){
    $('#tab-link-facturation').removeClass('grayForbiddenLink');
    $('#tab-link-facturation > span').removeClass('grayForbidden');
}

function unblockValidationTab(){
    $('#tab-link-validation').removeClass('grayForbiddenLink');
    $('#tab-link-validation > span').removeClass('grayForbidden');
}