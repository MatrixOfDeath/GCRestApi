// Ajout d'une salle en ajax au click du bouton Choisir Salle
$(document).on('click', 'button.btn-success.buttonAddSalle', function(){

    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    // var arrTime = $('#slider-range .heureActuelleDefaut').val().split(':');
    // var dateDuJour = arrTime[2];
    var idSalle = $(this).val();
    var date =  $('#datepicker-altFormat').val();
    console.log('date altFormat' + date);


    // if(dateDuJour.length){
    //     date = dateDuJour;
    // }

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
            "heureChoixDebut": date + ' ' + choixDebut +':00',
            "heureChoixFin": date + ' ' + choixFin +':00',
            "idSalle" : idSalle,
            "date": date
        },
        success: function (isDispo, textStatus)
        {
            if(isDispo = '1') {
                //2- On ajoute la salle choisi dans session du panier
                $.ajax({
                    url: Routing.generate('ajout_panier_salle'),
                    type: "POST",
                    data: {
                        "heureChoixDebut": date + ' ' + choixDebut +':00',
                        "heureChoixFin": date + ' ' + choixFin +':00',
                        "id" : idSalle,
                        "date": date
                    },
                    async: true,
                    success: function (response, textStatus)
                    {
                        // TODO:à mettre en parallèle ?
                        // 3- On mets à jour le panier ajax
                        $.ajax({
                            url: Routing.generate('panier_ajax'),
                            type: "POST",
                            async: true,
                            success: function (responsePanier, textStatus)
                            {
                                if(isDispo = '1') {
                                    $('.row.panier-menu').empty().append(responsePanier);

                                    // 4- On charge la vue des produits ajax
                                    $.ajax({
                                        url: Routing.generate('produits_ajax'),
                                        type: "GET",
                                        async: true,
                                        success: function (responseProduits, textStatus) {
                                            $('#display-salle').empty().append(responseProduits);
                                            $('.reservation-select-creneau').hide();
                                            $('.recherche-horaire').hide();

                                        },
                                        // 4-
                                        error: function (data) {
                                            console.log(data);
                                            alert('Problème récupération des produtis');
                                        }
                                    });
                                }else{
                                    alert('La salle n\'est plus disponible');
                                }
                            },
                            // 3-
                            error: function(data) {
                                console.log(data);
                                alert('Problème ajout de la salle choisi');

                            }
                        });
                    },
                    // 2-
                    error: function(data) {
                        console.log(data);
                        alert('Problème ajout salle');
                        //$("body").css({"opacity": "1", "background-color":"#fff"});

                    }
                });
            }

        },
        // 1-
        error: function(data){
            alert('Problème lors de la vérification de la disponibilité de la salle n°'+ idSalle);
        }
    });

    return false;

});

$(document).on('slidestop', '#slider-range' , function(event, ui){
    console.log('iiiin');
    ajaxRechercheSalles();
});


function ajaxRechercheSalles(){
    var choixDebut = $('.slider-time').text();
    var choixFin = $('.slider-time2').text();
    var date =  $('#datepicker-altFormat').val();
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
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        },
        error: function(data) {
            console.log(data);
            alert('Problème dans la recherche des disponibilités de salles');
            //$("body").css({"opacity": "1", "background-color":"#fff"});

        }
    });
    return false;
}

