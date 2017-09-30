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
