function ajaxAjoutProduiPanier() {
    //J'initialise le montant total à 0.
    var total = 0;

    // Je boucle sur le nombre de produit afin de récupérer leur ID. Je commence à 1 parce que le premier ID du produit vaut 1.
    for (var i = 1; i < 5; i++) {
        //Je récupère la valeur qui se trouve dans l'Id "prix+i".
        var prix = document.getElementById('prix'+i).innerText;

        //Je récuère seulement le nombre.
        var thenum = prix.match(/\d+/)[0];

        //Je récupère la valeur du select qui a pour id "qte+i"
        var e = document.getElementById('qte'+i);
        //Je récupuère seulement la valeur que l'utilisateur aura choisi.
        var strUser = e.options[e.selectedIndex].value;

        /*Je calcule le total. Je parseFloat car j'avais que que strings.
          Je parseFloat si au cas où dans le futur, le site aura besoin de float
        */
        total = parseFloat(total) + parseFloat(thenum) * parseFloat(strUser);
    }

    //Je remets total à string pour pouvoir intégrer total à ma page html.twig
    total = total.toString()
    //J'écris dans ma page html à la span qui a pour id="montantapayer"
    document.getElementById("montantapayer").innerHTML = total+"€";
}

ajaxAjoutProduiPanier();