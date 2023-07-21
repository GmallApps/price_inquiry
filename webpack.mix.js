const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);

mix.js('resources/js/pages/inquiry/inquiry_index.js','public/js/pages/inquiry')
    .js('resources/js/pages/login.js','public/js/pages')
    .js('resources/js/pages/ads/ads.js','public/js/pages/ads')
    .js('resources/js/pages/terminal/terminal.js','public/js/pages/terminal')
    .js('resources/js/pages/ip_check/ip_check.js','public/js/pages/ip_check')
    .js('resources/js/pages/theme_color/theme_color.js','public/js/pages/theme_color')
    .js('resources/js/pages/logo_wpi/logo_wpi.js','public/js/pages/logo_wpi')
    // .js('resources/js/livewire-alert.js','public/js/pages')

// mix.js('resources/js/pages/sls/sls_index.js','public/js/pages/sls')

