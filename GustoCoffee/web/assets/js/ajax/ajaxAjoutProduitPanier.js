    // Ajout d'un produit au panier ajax
    $(document).on('click', '.buttonAddProductPanier', function(){
        $.ajax({
            url: Routing.generate('ajax_ajout_produit_panier'),
            type: "POST",
            data: {
                "id": $(this).val()
            },
            async: true,
            success: function (responsePanier) {
                // Rafraichissement du panier ajax
                $.ajax({
                    url: Routing.generate('panier_ajax'),
                    type: "POST",
                    async: true,
                    success: function (responsePanier, textStatus) {
                        $('.row.panier-menu').empty().append(responsePanier);
                        refreshPanierIconMenu();
                    },
                    error: function(data) {
                        console.log(data);
                        alert('Problème refresh Panier');
                    }
                });
            },
            error: function (data) {
                console.log(data);
                alert('Problème dans la recherche des disponibilités de salles');
            }
        });
    });

    function refreshPanierIconMenu(){
        $.ajax({
            url: Routing.generate('ajax_panier_icon_menu'),
            type: "GET",
            async: true,
            success: function (responsePanier, textStatus)
            {
                $('#panier-icon-menu').empty().append(responsePanier).effect( "bounce", {times:3}, 300 );

            },
            error: function(data) {
                console.log(data);
                alert('Problème refresh Panier');
                //$("body").css({"opacity": "1", "background-color":"#fff"});

            }
        });
    }