'use strict';

var root = null;

function tryResolve(module) {
    try {
        return require.resolve(module);
    } catch (e) {
        return undefined;
    }
}

module.exports.root = function (dir) {
    if (root === null) {
        root = dir;
    }

    return root;
};

module.exports = function (fn) {
    return function (item) {
        var path            = 'path:./' + fn(item),
            factoryItemPath = tryResolve(path) || tryResolve(path.resolve(root, path));

        var FactoryItem = require(factoryItemPath || path);

        if (!FactoryItem) {
            throw Error(path + ' not found');
        }

        return {
            create: function (options) {
                return new FactoryItem(options);
            }
        };
    };
};
