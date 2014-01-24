// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


// jQuery.browser nao existe mais a partir do 1.9, foi deprecated no 1.3!
// mas um monte de plugin ainda usa
(function () {
    var matched, browser;

    // Use of jQuery.browser is frowned upon.
    // More details: http://api.jquery.com/jQuery.browser
    // jQuery.uaMatch maintained for back-compat
    jQuery.uaMatch = function( ua ) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

        return {
            browser: match[ 1 ] || "",
            version: match[ 2 ] || "0"
        };
    };

    matched = jQuery.uaMatch( navigator.userAgent );
    browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    jQuery.browser = browser;
}());





(function (window, document, $, undefined) {
    'use strict';

    function isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    }

    function isEmail (email) {
        // http://xyfer.blogspot.com.br/2005/01/javascript-regexp-email-validator.html
        var emailRegex = /^(("[\w\-\s]+")|([\w\-]+(?:\.[\w\-]+)*)|("[\w\-\s]+")([\w\-]+(?:\.[\w\-]+)*))(@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
        return emailRegex.test(email);
    }

    // https://github.com/jzaefferer/jquery-validation/blob/master/src/core.js#L1033
    function isURL (value) {
        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
        return (/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(value);
    }

    function isCPF (cpf) {
        if (!cpf) {
            return false;
        }
        // http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
        var Soma, Resto, i;
        Soma = 0;

        cpf = cpf.replace(/[^\d]/g,"");

        if (/(.)\1{10}/.test(cpf)) {
            return false;
        }
        for (i = 1; i <= 9; i = i + 1) {
            Soma = Soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
        }
        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        if (Resto !== parseInt(cpf.substring(9, 10), 10)) {
            return false;
        }
        Soma = 0;
        for (i = 1; i <= 10; i = i + 1) {
            Soma = Soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
        }
        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        if (Resto !== parseInt(cpf.substring(10, 11), 10)) {
            return false;
        }
        return true;
    }

    // http://pt.wikipedia.org/wiki/CNPJ
    function isCNPJ (c) {
        var b = [6,5,4,3,2,9,8,7,6,5,4,3,2];

        if (!c) {
            return false;
        }

        if((c = c.replace(/[^\d]/g,"").split("")).length != 14) {
            return false;
        }

        for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);

        if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n)) {
            return false;
        }

        for (var j = 0, m = 0; j <= 12; m += c[j] * b[j++]);

        if(c[13] != (((m %= 11) < 2) ? 0 : 11 - m)) {
            return false;
        }

        return true;
    }


    function getURLParameter (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[undefined,""])[1].replace(/\+/g, '%20'))||null;
    }

    // http://stackoverflow.com/questions/7388001/javascript-regex-to-validate-date
    // http://jsfiddle.net/mplungjan/Mqh8D/
    function isDate (str) {
        var parms = str.split(/[\.\-\/]/);
        var yyyy = parseInt(parms[2],10);
        var mm   = parseInt(parms[1],10);
        var dd   = parseInt(parms[0],10);
        var date = new Date(yyyy,mm-1,dd,12,0,0,0);
        return mm === (date.getMonth()+1) && dd === date.getDate() && yyyy === date.getFullYear();
    }

    function stringToDate (str) {
        var parms = str.split(/[\.\-\/]/);
        var yyyy = parseInt(parms[2],10);
        var mm   = parseInt(parms[1],10);
        var dd   = parseInt(parms[0],10);
        return new Date(yyyy,mm-1,dd,0,0,0,0);
    }

    function loadJSAsync (src, id) {
        (function(d,t){
            var e=d.createElement(t), s=d.getElementsByTagName(t)[0];
            if (d.getElementById(id)) {return;}
            if (id) {
                e.id = id;
            }
            e.src=src;
            s.parentNode.insertBefore(e,s);
        }(document,'script'));
    }

    function isCssLoaded (cssLink) {
        var loaded = false;

        // load css only one time
        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href && document.styleSheets[i].href.match(cssLink)) {
                loaded = true;
            }
        }

        return loaded;
    }

    function loadCSS (cssLink) {
        if (!isCssLoaded(cssLink)) {
            if (document.createStyleSheet){ // IE
                document.createStyleSheet(cssLink);
            }
            else {
                $("head").append($('<link rel="stylesheet" href="' + cssLink  + '" type="text/css" media="screen" />'));
            }
        }
    }


    $.pvtUtils = {
        isCPF: isCPF,
        isCNPJ: isCNPJ,
        isEmail: isEmail,
        isURL: isURL,
        isNumber: isNumber,
        getURLParameter: getURLParameter,
        isDate: isDate,
        stringToDate: stringToDate,
        loadJSAsync: loadJSAsync,
        loadCSS: loadCSS
    };
}(this, document, jQuery));
