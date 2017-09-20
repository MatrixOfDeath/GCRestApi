$(document).on('click', 'button.buttonSearch', function(){

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date =  $('#datepicker-altFormat').val();

    console.log(date + ' ' + choixDebut +':00');
    console.log(date + ' ' + choixFin +':00');

    that = $(this);

    $('#display-salle').empty().load('/assets/loader.html');

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

        },
        error: function(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
        }
    });
    return false;

});