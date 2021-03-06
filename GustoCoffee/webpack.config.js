var Encore = require('@symfony/webpack-encore');

Encore

    // directory where all compiled assets will be stored
    .setOutputPath('web/build/')

    // what's the public path to this directory (relative to your project's document root dir)
    .setPublicPath('/build')

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

    .autoProvideVariables({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    })

    // .addLoader({
    //     test: /\.(gif|png|jpe?g|svg)$/i,
    //     loaders: [
    //         'file-loader', {
    //             loader: 'image-webpack-loader',
    //             options: {
    //                 gifsicle: {
    //                     interlaced: false,
    //                 },
    //                 optipng: {
    //                     optimizationLevel: 7,
    //                 },
    //                 pngquant: {
    //                     quality: '65-90',
    //                     speed: 4
    //                 },
    //                 mozjpeg: {
    //                     progressive: true,
    //                     quality: 65
    //                 },
    //                 // // Specifying webp here will create a WEBP version of your JPG/PNG images
    //                 // webp: {
    //                 //     quality: 75
    //                 // }
    //             }
    //         }
    //     ]
    // })
    .createSharedEntry('vendor', [
        'jquery',
        'jquery-ui-dist/jquery-ui.js',
        'bootstrap-sass',
        'animate-sass',
        'jquery-touchswipe',
        './web/bundles/fosjsrouting/js/router.js',
        // './web/js/fos_js_routes.js',
    ])

    // will output as web/build/app.js
    .addEntry('app', [
        './web/assets/js/main.js',
        './web/assets/js/scripts.js',
        './web/assets/js/fixdiv.js',
        './web/assets/js/bootstrap-touch-slider.js',
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
        // './web/assets/scss/_helper.scss'
        './web/css/jquery-ui.css',
        'animate-sass',
        './web/bundles/bmatznerfontawesome/scss/font-awesome.scss',
        './web/assets/scss/bootstrap-touch-slider.scss',
        './web/assets/scss/global.scss',
        './web/assets/scss/home.scss',
        './web/assets/scss/cart.scss',
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

    //.enableLessLoader()
    .enablePostCssLoader()

    //.enableSourceMaps(!Encore.isProduction())

    .enableVersioning(!Encore.isProduction())

;

// export the final configuration
module.exports = Encore.getWebpackConfig();