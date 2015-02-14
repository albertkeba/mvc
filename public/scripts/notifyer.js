/**
 * This tiny script just helps us demonstrate
 * what the various example callbacks are doing
 */
/*global $*/
app.notifyer = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.delay(100).fadeIn().delay(1000).fadeOut();
    };

    return that;
}());