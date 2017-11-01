// postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {
            browsers: ['last 2 versions', '> 5%']
        },
        'cssnano': {
            autoprefixer: false
        },
        // déjà inclu dans cssnext! et cssnano 'autoprefixer': {},
    }
};