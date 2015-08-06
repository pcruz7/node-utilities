'use strict';

var path  = require('path'),
    utils = require('../utils');

var root = null;

module.exports = function (name) {
    var itemPath = utils.tryResolve('path:./' + name) || utils.tryResolve(path.resolve(root, name));
    var Item = require(itemPath || name);

    if (!Item) {
        throw Error(name + ' not found');
    }

    return Item;
};

module.exports.root = function (dir) {
    if (root === null) {
        root = dir;
    }

    return root;
};
