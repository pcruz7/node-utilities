'use strict';

var utilRequire = require('./util-require');

module.exports = function (fn) {
    return function (item) {
        var FactoryItem = utilRequire(fn(item));

        return {
            create: function (options) {
                return new FactoryItem(options);
            }
        };
    };
};
