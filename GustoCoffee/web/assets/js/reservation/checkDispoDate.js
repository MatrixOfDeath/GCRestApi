// Slider
$(function() {
    /** Listes et grilles salles **/
    $(document).ready(function() {
        $('#list').click(function(event){event.preventDefault();
        $('#display-salle .cardSalle').addClass('list-group-item');});
        $('#grid').click(function(event){event.preventDefault();
        $('#display-salle .cardSalle').removeClass('list-group-item');
        $('#display-salle .cardSalle').addClass('grid-group-item');});
    });

    /** Initiate datepicker **/
    $( "#datepicker" ).datepicker({
        maxDate: "+15d",
        minDate: new Date(),
        defaultDate: new Date(),
        dateFormat: 'dd/mm/yy',
        altFormat: 'yy-mm-dd',
        altField: '#datepicker-altFormat',
        regional: "fr"

        //setDate: new Date()

    });
    // Gestion de la region fr pose problème
   // $("#datepicker").datepicker("options", "defaultDate", new Date());

    $('.ui-slider-handle').draggable();

    var min = 9; // Heure min d'ouverture du magasin
    var max = 21; // Heure max d'ouverture du magasin
    var datePickerDate = $("#datepicker-altFormat").val();
    var today = new Date();
    var todayDate = $("#datepicker-altFormat").val();
    //console.log(todayDate + ' et date picker' + datePickerDate);

    if (!!$('#slider-range .heureActuelleDefaut').val()) {
        var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
        var heureActuelle = parseInt(arrTime[0], 10);
        var minuteActuelle = parseInt(arrTime[1],10);
        var todayDate = arrTime[2];
        console.log(todayDate+ 'date du jours');
        if (minuteActuelle < 30) {
            minuteActuelle = 0;
        } else {
            minuteActuelle = 30;
        }
    }else{
        console.log('pas par defaut');
    }

    $("#slider-range").slider({
        range: true,
        min: min * 60,
        max: max * 60,
        minRange: 60,
        step: 30,
        values: [540, 1320],
        slide: function( event, ui ) {

            // On limite l'intervalle minimal à 1h pour une reservation de salle
            if ( (ui.values[0] + 55) >= ui.values[1] ) {
                return false;
            }
            // Dans le cas où c'est la date du jour !
            if ($("#datepicker-altFormat").val() == '2017-09-22' || !$("#datepicker-altFormat").val()) {
                var totalStartTime = heureActuelle * 60 + minuteActuelle;
                console.log(ui.values[0] + ' '+ totalStartTime);

                if (ui.values[0] < totalStartTime) {
                    return false;
                    console.log(ui.values[0] + ' ezesfsd ' + totalStartTime);
                    //$ ('#slider-range').children(".ui-slider-handle").first().draggable( false);
                }
            }

            var hours1 = Math.floor(ui.values[0] / 60);
            var minutes1 = ui.values[0] - (hours1 * 60);

            if(hours1.length < 10) hours1= '0' + hours;
            if(minutes1.length < 10) minutes1 = '0' + minutes;

            if(minutes1 == 0) minutes1 = '00';

            // valeur du premier handle du slider
            $("#slider-range").children(".ui-slider-handle").first().text( hours1+':'+minutes1 );

            var hours2 = Math.floor(ui.values[1] / 60);
            var minutes2 = ui.values[1] - (hours2 * 60);

            if(hours2.length < 10) hours2= '0' + hours;
            if(minutes2.length < 10) minutes2 = '0' + minutes;

            if(minutes2 == 0) minutes2 = '00';

            // Deuxième handle du slider
            $("#slider-range").children(".ui-slider-handle").last().text( hours2+':'+minutes2 );

            $('.slider-time').html(hours1+':'+minutes1);

            $('.slider-time2').html(hours2+':'+minutes2);
        }
    });
    $("#slider-range").children(".ui-slider-handle").first().text(min+':00');
    $("#slider-range").children(".ui-slider-handle").last().text(max+':00');



    if($('#slider-range .heureActuelleDefaut').length && $('#slider-range .heureActuelleDefaut').val() ) {
        setHandles(heureActuelle, minuteActuelle, min, max);
    }
    // Arithmétique: on calcule le nombre d'heure total et on crée les intervalles souhaité, on mettra des points ç
    var total = (max - min ) * 2; // car 60 minutes = 2 * 30 minutes :)
    var percent = 100 / total;
    for (var x = 1; x < total; x++){
        $(".ui-slider" ).append("<span class='dots' style='left:"+ x * percent + "%'></span>");

    }

    // Lorsqu'on change le datepicker
    $('#datepicker').datepicker().on("change", function(e){
        if ($("#datepicker-altFormat").val() == '2017-09-22' || !$("#datepicker-altFormat").val()){
            setHandles(heureActuelle, minuteActuelle, min, max);
        }
    });

    // Reinit les handles
    function setHandles(heureActuelle, minuteActuelle, min, max){

        $("#slider-range").children(".ui-slider-handle").first().text(heureActuelle+':'+ minuteActuelle);
        $("#slider-range").children(".ui-slider-handle").last().text((heureActuelle+1)+':'+ minuteActuelle);
        $('.slider-time').html(heureActuelle+':'+ minuteActuelle);
        $('.slider-time2').html((heureActuelle+1)+':'+ minuteActuelle);
        //var heureActuelle = $('#slider-range .heureActuelleDefaut').val();
        if (heureActuelle > max && heureActuelle < 0) {
            $( "#reservation-dialog-message" ).dialog({
                modal: true,
                buttons: {
                    Ok: function() {
                        $( this ).dialog( "close" );
                    }
                }
            });
        }else if(heureActuelle > 0 && heureActuelle < min){
            console.log('Ouvre à 9h');
        }
        else{
            $("#slider-range").slider('option', 'values', [(heureActuelle * 60 + minuteActuelle), (heureActuelle * 60) + 60 + minuteActuelle]);
            $("#slider-range").children(".ui-slider-handle").first().text(heureActuelle + ':' + minuteActuelle);
            $("#slider-range").children(".ui-slider-handle").last().text((heureActuelle+1)  + ':' + minuteActuelle);
        }
    }
});