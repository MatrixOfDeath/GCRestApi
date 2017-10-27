var firstSeatLabel = 1;
var sc_global = [];

(function($) {
    function initCarteInteractive(map){
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
                    f:{
                        price: 0,
                        classes: 'economy-class unavailable',
                        category: 'Place'
                    }

                },
                naming: {
                    top: false,
                    getLabel: function (character, row, column) {
                        return firstSeatLabel++;
                    },
                },
                legend: {
                    node: $('#legend'),
                    items: [
                        ['p', 'available', 'Place disponible'],
                        ['f', 'unavailable', 'Déjà réservé']
                    ]
                },
                click: function () {
                    if (this.status() == 'available') {
                        //let's create a new <li> which we'll add to the cart items
                        $('<li>' + this.data().category + ' Place # ' + this.settings.label + ': <b>€' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[annuler]</a></li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);

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
        var date =  $('#datepicker-altFormat').val();
        setInterval(function() {
            $.ajax({
                url: Routing.generate('ajax_places_unavailable'),

                type: "POST",
                data: {
                    "heureChoixDebut": date + ' ' + choixDebut +':00',
                    "heureChoixFin": date + ' ' + choixFin +':00',
                    "idPlace" : idPlace,
                    "date": date
                },
                dataType : 'json',
                success  : function(response) {
                    //iterate through all bookings for our event
                    $.each(response, function(index, place) {
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

    $.fn.getMap = function (){
        var choixDebut = $('.slider-time').text();
        var choixFin = $('.slider-time2').text();
        var date =  $('#datepicker-altFormat').val();
        //$('#display-salle').append().load('/assets/loader.html').fadeIn();
        $.ajax({
            url: Routing.generate('ajax_places_map'),
            type: "POST",
            data: {
                "heureChoixDebut": date + ' ' + choixDebut +':00',
                "heureChoixFin": date + ' ' + choixFin +':00',
            },
            async: true,
            success: function (map, textStatus)
            {
                sc_global = initCarteInteractive(map);
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            },
            error: function(data) {
                console.log(data);
                alert('Problème initialisation des places');
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            }
        });
    }

    function recalculateTotal(sc) {
        var total = 0;

        //basically find every selected seat and sum its price
        sc.find('selected').each(function () {
            total += this.data().price;
        });

        return total;
    }
})(jQuery);

function getMap(){
    //$('#display-salle').append().load('/assets/loader.html').fadeIn();
    $.ajax({
        url: Routing.generate('ajax_places_map'),
        type: "GET",
        async: true,
        success: function (map, textStatus)
        {
            sc_global = initCarteInteractive(map);
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        },
        error: function(data) {
            console.log(data);
            alert('Problème initialisation des places');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });
}
$(document).ready(function() {

    if($('#seat-map').length &&  $('#selected-seats').length){

        //$('#display-salle').append().load('/assets/loader.html').fadeIn();
        $.ajax({
            url: Routing.generate('ajax_places_map'),
            type: "GET",
            async: true,
            success: function (map, textStatus)
            {
                initCarteInteractive(map);
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            },
            error: function(data) {
                console.log(data);
                alert('Problème initialisation des places');
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            }
        });

    }

});

function initCarteInteractive(map){
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
                f:{
                    price: 0,
                    classes: 'economy-class unavailable',
                    category: 'Place'
                }

            },
            naming: {
                top: false,
                getLabel: function (character, row, column) {
                    return firstSeatLabel++;
                },
            },
            legend: {
                node: $('#legend'),
                items: [
                    ['p', 'available', 'Place disponible'],
                    ['f', 'unavailable', 'Déjà réservé']
                ]
            },
            click: function () {
                if (this.status() == 'available') {
                    //let's create a new <li> which we'll add to the cart items
                    $('<li>' + this.data().category + ' Place # ' + this.settings.label + ': <b>€' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[annuler]</a></li>')
                        .attr('id', 'cart-item-' + this.settings.id)
                        .data('seatId', this.settings.id)
                        .appendTo($cart);

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
    var date =  $('#datepicker-altFormat').val();

    setInterval(function() {
        $.ajax({
            url: Routing.generate('ajax_places_unavailable'),

            type: "POST",
            data: {
                "heureChoixDebut": date + ' ' + choixDebut +':00',
                "heureChoixFin": date + ' ' + choixFin +':00',

            },
            dataType : 'json',
            success  : function(response) {
                //iterate through all bookings for our event
                $.each(response, function(index, place) {
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
$(document).on('click', '#tab-link-place', function(){
    $(this).parent().tab('show');
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date =  $('#datepicker-altFormat').val();

    $('#slider-range .heureActuelleDefaut').val("");

    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn('slow');

    $.ajax({
        url: Routing.generate('places_disponible'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut +':00',
            "heureChoixFin": date + ' ' + choixFin +':00',
        },
        async: true,
        success: function (response, textStatus)
        {
            getMap();
            $('#display-salle').empty().append(response);
            $('.reservation-select-creneau').show("slow");
            $('.recherche-horaire').show("slow");
            $('.panier-menu').show("slide", { direction: "right" }, 1000);
            $('.reservation-result-container').removeClass('col-md-12').addClass('col-md-9');

        },
        error: function(data) {
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
