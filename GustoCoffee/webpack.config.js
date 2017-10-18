var Encore = require('@symfony/webpack-encore');

Encore

    // directory where all compiled assets will be stored
    .setOutputPath('web/build/')

    // what's the public path to this directory (relative to your project's document root dir)
    .setPublicPath('/build')

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    // will output as web/build/app.js
    .addEntry('app', [
        './web/assets/js/scripts.js',
        './web/assets/js/fixdiv.js',
        // './web/assets/js/modal.js',
        './web/assets/js/reservation/checkDispoDate.js'
    ])

    // Wil output Web/build/ajax.js
    .addEntry('ajax', [
        './web/assets/js/ajax/ajaxCheckDispoDate.js',
        './web/assets/js/ajax/ajaxCheckPlaceDispoDate.js',
        './web/assets/js/ajax/ajaxChoixSalle.js',
        './web/assets/js/ajax/ajaxChoixPlace.js',
        './web/assets/js/ajax/ajaxAjoutProduitPanier.js',
        './web/assets/js/ajax/ajaxPanier.js',
        './web/assets/js/ajax/ajaxChangeTunnelAchat.js',
        './web/assets/js/places/jquery.seat-charts.js',
        './web/assets/js/places/ajaxGestionPlaces.js',
        './web/assets/js/ajax/ajaxVilles.js'
    ])

    // will output as web/build/global.css
    .addStyleEntry('global', [
        // './web/assets/scss/_helper.scss',
        './web/assets/scss/global.scss',
        './web/assets/scss/home.scss',
        // './web/assets/scss/onepage-scroll.scss',
        './web/assets/scss/evenement.scss',
        './web/assets/scss/reservation.scss',
        './web/assets/scss/reservation-private.scss',
        './web/assets/scss/reservation-private-salle.scss',
        './web/assets/scss/contact.scss',
        './web/assets/scss/login.scss',
        './web/assets/scss/annonce.scss',
        './web/assets/scss/request.scss',
        './web/assets/scss/register.scss',
        './web/assets/scss/dashboard.scss',
        './web/assets/scss/main.scss',
        './web/assets/scss/produit.scss',
        './web/assets/scss/tunnel-achat-workflow.scss',
        './web/assets/scss/faq.scss',
        './web/assets/scss/coffee-animation.scss',
        './web/assets/scss/coffee-loader.scss',
        './web/assets/scss/reservation/checkDispoDate.scss',
        //'./web/assets/scss/places/carte-places.scss',
        './web/assets/scss/places/places-individuelles.scss'

    ])

    // allow sass/scss files to be processed
    .enableSassLoader()

    .enableLessLoader()

    //.autoProvidejQuery()

    .enableSourceMaps(!Encore.isProduction())

    // .enableVersioning()
    .enableVersioning()

;

// export the final configuration
module.exports = Encore.getWebpackConfig();