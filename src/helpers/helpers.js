

module.exports.register = function (Handlebars, options) {
    'use strict';

    Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {
        if (haystack && needle) {
            return haystack.replace(needle, replacement);
        } else {
            return '';
        }
    });

    Handlebars.registerHelper('ellipsis', function (text, chars) {
        if (text.length > chars) {
            var trimmedText = text.substr(0, chars);
            trimmedText = trimmedText.substr(0, Math.min(trimmedText.length, trimmedText.lastIndexOf(" ")));
            return trimmedText + "...";
        }
        return text;
    });
};