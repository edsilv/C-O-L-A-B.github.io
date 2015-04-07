
module.exports.register = function (Handlebars, options) {
    'use strict';

    Handlebars.registerHelper('replaceStr', function (haystack, needle, replacement) {
        if (haystack && needle) {
            return haystack.replace(needle, replacement);
        } else {
            return '';
        }
    });

    Handlebars.registerHelper('breaklines', function(text) {
        text = Handlebars.Utils.escapeExpression(text);
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        return new Handlebars.SafeString(text);
    });

    Handlebars.registerHelper('jsonFriendly', function(options) {
        var text = options.fn(this);
        //var text = Handlebars.Utils.escapeExpression(options.fn(this));
        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
        text = text.replace(/"/g, "\'");
        return new Handlebars.SafeString(text);
    });

    Handlebars.registerHelper('json', function(obj) {
        return JSON.stringify(obj);
    });
};