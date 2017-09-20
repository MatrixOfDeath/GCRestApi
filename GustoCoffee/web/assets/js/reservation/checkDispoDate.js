// Slider
$(function() {
    // $(".slider-range").slider({ range: true, min: 0, max: 1440, step: 30, slide: function(e, ui)
    //     {
    //         var hours = Math.floor(ui.value / 60); var minutes = ui.value - (hours * 60);
    //         if(hours.toString().length == 1) hours = '0' + hours;
    //         if(minutes.toString().length == 1) minutes = '0' + minutes;
    //         //$('#something').html(hours+':'+minutes);
    //     }
    // });

    $(document).ready(function() {
        $('#list').click(function(event){event.preventDefault();
        $('#display-salle .cardSalle').addClass('list-group-item');});
        $('#grid').click(function(event){event.preventDefault();
        $('#display-salle .cardSalle').removeClass('list-group-item');$('#display-salle .cardSalle').addClass('grid-group-item');});
    });

    /** Initiate datepicker **/
    $( "#datepicker" ).datepicker({
        maxDate: "+15d",
        minDate: new Date(),
        defaultDate: new Date(),
        dateFormat: 'dd/mm/yy',
        altFormat: 'yy-mm-dd',
        altField: '#datepicker-altFormat',
        setDate: new Date()

    });

    $('#datepicker').val(new Date());

    $('.ui-slider-handle').draggable();

    var min = 10; // Heure min d'ouverture
    var max = 21; // Heure max d'ouverture


    $("#slider-range").slider({
        range: true,
        min: min * 60,
        max: max * 60,
        step: 30,
        values: [600, 1320],
        slide: function( event, ui ) {
            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if(hours1.length < 10) hours1= '0' + hours;
            if(minutes1.length < 10) minutes1 = '0' + minutes;

            if(minutes1 == 0) minutes1 = '00';

            // valeur
            $("#slider-range").children(".ui-slider-handle").first().text( hours1+':'+minutes1 );

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if(hours2.length < 10) hours2= '0' + hours;
            if(minutes2.length < 10) minutes2 = '0' + minutes;

            if(minutes2 == 0) minutes2 = '00';

            $("#slider-range").children(".ui-slider-handle").last().text( hours2+':'+minutes2 );

            $('.slider-time').html(hours1+':'+minutes1);

            $('.slider-time2').html(hours2+':'+minutes2);
        }
    });
    $("#slider-range").children(".ui-slider-handle").first().text('9:00');
    $("#slider-range").children(".ui-slider-handle").last().text('21:00');

    var total = (max - min ) * 2; // car 60 minutes = 2 * 30 minutes :)
    var percent = 100 / total;
    for (var x = 1; x < total; x++){
        $(".ui-slider" ).append("<span class='dots' style='left:"+ x * percent + "%'></span>");

    }
});