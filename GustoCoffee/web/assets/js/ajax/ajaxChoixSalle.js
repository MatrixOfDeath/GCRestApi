$(document).on('click', 'button.btn-success.buttonAddSalle', function(){

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date =  $('#datepicker-altFormat').val();

   // $('#slider-range .heureActuelleDefaut').val("");
    console.log('test');
    that = $(this);

    //$("body").css({"opacity": "0.5", "background-color":"#000"});
    $('#display-salle').append().load('/assets/loader.html').fadeIn();

    $.ajax({
        url: Routing.generate('ajout_panier_salle'),
        type: "POST",
        data: {
            "heureChoixDebut": date + ' ' + choixDebut +':00',
            "heureChoixFin": date + ' ' + choixFin +':00',
        },
        async: true,
        success: function (response, textStatus)
        {
            $('#display-salle').empty().append(response);
            //$("body").css({"opacity": "1", "background-color":"#fff"});
            $.get(Routing.generate(''), function(html){
                $('#display-panier').empty().html(html);

            });
        },
        error: function(data) {
            console.log(data);
            alert('Problème ajout de la salle choisi');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });
    return false;

});

