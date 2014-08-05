/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        var em1 = "ed";
        var em2 = "@";
        var em3 = "edsilv.com";
        var em4 = em1 + em2 + em3;

        $(".mailto").prop('href', 'mailto:' + em4).prop('title', em4);

    });

}(jQuery));