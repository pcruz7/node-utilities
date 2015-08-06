'use strict';

module.exports.tryResolve = function (module) {
    try {
        return require.resolve(module);
    } catch (e) {
        return undefined;
    }
};
