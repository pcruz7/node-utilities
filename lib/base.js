'use strict';

var assign = require('lodash.assign');
var Base   = function () {};

function extend(parent, proto) {
    var child, Ctor = function () {};

    if (proto && proto.hasOwnProperty('constructor')) {
        child = proto.constructor;
    } else {
        child = function () {
            return parent.apply(this, arguments);
        };
    }

    assign(child, parent);

    Ctor.prototype = parent.prototype;
    child.prototype = new Ctor();

    if (proto) {
        assign(child.prototype, proto);
    }

    child.prototype.constructor = child;

    return child;
}

function extendIt() {
    var args  = arguments,
        proto = {}, child;

    Object.keys(arguments).each(function (key) {
        proto = assign(proto, args[key]);
    }).value();

    child = extend(this, proto);
    child.extend = extendIt;

    return child;
}

Base.extend = extendIt;

module.exports = Base;
