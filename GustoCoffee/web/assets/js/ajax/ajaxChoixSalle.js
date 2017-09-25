$(document).on('click', 'button.btn-success.buttonAddSalle', function(){

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date =  $('#datepicker-altFormat').val();
    var idSalle = $(this).val();

    console.log(idSalle + 'idsalle');
   // $('#slider-range .heureActuelleDefaut').val("");
    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('panier_ajax'),
        type: "POST",
        async: true,
        success: function (response, textStatus)
        {
            $('#display-salle').empty().append(response);

            // $.get(Routing.generate(''), function(html){
            //     $('#display-panier').empty().html(html);
            //
            // });
        },
        error: function(data) {
            console.log(data);
            alert('Problème ajout de la salle choisi');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });
    $.ajax({
        url: Routing.generate('ajout_panier_salle', {id: idSalle}),
        type: "POST",
        data: {
            "id": idSalle,
            "heureChoixDebut": date + ' ' + choixDebut +':00',
            "heureChoixFin": date + ' ' + choixFin +':00',
        },
        async: true,
        success: function (response, textStatus)
        {
            $('#display-salle').empty().append(response);

            // $.get(Routing.generate(''), function(html){
            //     $('#display-panier').empty().html(html);
            //
            // });
        },
        error: function(data) {
            console.log(data);
            alert('Problème ajout de la salle choisi');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });
    return false;

});

