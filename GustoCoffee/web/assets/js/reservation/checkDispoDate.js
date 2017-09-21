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
    $("#datepicker").blur(function(){
        val = $(this).val();
        val1 = Date.parse(val);
        if (isNaN(val1)==true && val!==''){
            alert("Aucune date pour la recherche n'est saisie !");
        }
        else{
            console.log(val1);
        }
    });

    // Gestion de la region fr pose problème
   // $("#datepicker").datepicker("options", "defaultDate", new Date());

    $('.ui-slider-handle').draggable();

    var min = 9; // Heure min d'ouverture du magasin
    var max = 21; // Heure max d'ouverture du magasin


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

    console.log($('#slider-range .heureActuelleDefaut'));

    if($('#slider-range .heureActuelleDefaut').length && $('#slider-range .heureActuelleDefaut').val() ) {
        var heureActuelle = $('#slider-range .heureActuelleDefaut').val();
        if (heureActuelle > max || heureActuelle < min) {
            console.log("Too late or early");
        }else{

            $("#slider-range").slider('option', 'values', [heureActuelle * 60, (heureActuelle * 60) + 60]);
        }
    }
    // Arithmétique: on calcule le nombre d'heure total et on crée les intervalles souhaité, on mettra des points ç
    var total = (max - min ) * 2; // car 60 minutes = 2 * 30 minutes :)
    var percent = 100 / total;
    for (var x = 1; x < total; x++){
        $(".ui-slider" ).append("<span class='dots' style='left:"+ x * percent + "%'></span>");

    }

    $( "#reservation-dialog-message" ).dialog({
        modal: true,
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
});