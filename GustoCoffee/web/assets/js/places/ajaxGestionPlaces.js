var firstSeatLabel = 1;

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
                        console.log(place.idplace);
                        //find seat by id and set its status to unavailable
                        sc.status(String(place.idplace), 'unavailable');
                    });
                }
            });
        }, 60000); //every 10 seconds
        //let's pretend some seats have already been booked
        //sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
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
