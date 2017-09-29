

    $(document).on('click', '.buttonDeleteProduit', function(){
        console.log('Click on ' + $(this).val());
        $.ajax({
            url: Routing.generate('ajax_delete_panier'),
            type: "POST",
            data: {
                "id": $(this).val()
            },
            async: true,
            success: function (responsePanier, textStatus) {
                $('.row.panier-menu').empty().append(responsePanier);
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            },
            error: function (data) {
                console.log(data);
                alert('Problème dans la recherche des disponibilités de salles');
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            }
        });
    });

    $(document).on('click', '.buttonDeleteSalle', function(){
        console.log('Click on ' + $(this).val());
        $.ajax({
            url: Routing.generate('ajax_delete_panier_salle'),
            type: "POST",
            data: {
                "id": $(this).val()
            },
            async: true,
            success: function (responsePanier, textStatus) {
                $('.row.panier-menu').empty().append(responsePanier);
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            },
            error: function (data) {
                console.log(data);
                alert('Problème dans la recherche des disponibilités de salles');
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            }
        });
    });
