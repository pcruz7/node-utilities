'use strict';

var _    = require('lodash');
var Base = function () {};

function extend(parent, proto) {
    var child, Ctor = function () {};

    if (proto && proto.hasOwnProperty('constructor')) {
        child = proto.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    _.assign(child, parent);

    Ctor.prototype = parent.prototype;
    child.prototype = new Ctor();

    if (proto) {
        _.extend(child.prototype, proto);
    }

    child.prototype.constructor = child;

    return child;
}

function extendIt() {
    var args  = arguments,
        proto = {}, child;

    _(arguments).keys().each(function (key) {
        proto = _.assign(proto, args[key]);
    }).value();

    child = extend(this, proto);
    child.extend = extendIt;

    return child;
}

Base.extend = extendIt;

module.exports = Base;
