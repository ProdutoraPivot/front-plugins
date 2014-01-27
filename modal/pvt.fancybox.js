// check isset
var PVT = PVT || {};

// module name
PVT.fancybox = {};

(function (window, document, $, undefined) {
    'use strict';

    PVT.fancybox.open = function (url, args, callback) {
        var options = {
            afterClose: function() {
                if (callback) callback();
            },
            afterShow: function() {},
            autoSize: false,
            beforeShow: function () {
                $('.fancybox-skin').css({
                    'border-radius': 0
                });
            },
            closeClick: false,
            closeEffect: 'fade', // fade/elastic
            fitToView: true, // if set to true, fancyBox is resized to fit inside viewport before opening
            height: 300,
            helpers: {
                overlay : true,
                css: {}
            },
            href: url,
            keys: {
                next: {
                    13: 'left', // enter
                    34: 'up',   // page down
                    39: 'left', // right arrow
                    40: 'up'    // down arrow
                },
                prev: {
                    8: 'right',  // backspace
                    33: 'down',   // page up
                    37: 'right',  // left arrow
                    38: 'down'    // up arrow
                },
                close: [27], // escape key
                play: [32], // space - start/stop slideshow
                toggle: [70]  // letter "f" - toggle fullscreen
            },
            margin: 0,
            openEffect: 'fade', // fade/elastic
            padding: 0,
            topRatio: 0.3,
            swf: {
                wmode: 'transparent',
                allowfullscreen: 'true',
                allowscriptaccess: 'always'
            },
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="">',
                error: '<p class="fancybox-error">O conteúdo solicitado não pode ser carregado.</p>',
                closeBtn: '<a title="Fechar" class="fancybox-close" href="javascript:;"></a>',
                next: '<a title="Próxima" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Anterior" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            type: 'inline',
            width:  500
        },
        obj = $.extend({}, options, args);

        $.fancybox.open(obj);
    };

}(this, document, jQuery));
