# utilities

Utility functions for Node. It provides Ember and Backbone based style pattern of Modules and also a Factory method to load the same modules. 

It also provides a utility require to avoid the `../../../` hell.

# Usage

For all Factory and utilRequire initialize it first with:

```
var utilRequire = require('utilities').utilRequire;
utilRequire.root(__dirname);
```

## Base Module

```
// lib/my-base.js

'use strict';

var _    = require('lodash'),
    Base = require('toolbox-utilities').Base;

module.exports = Base.extend({
    constructor: function (options) {
        if (_.isFunction(this.initialize)) {
            this.initialize.apply(this, arguments);
        }
    }
});


// my-module-two.js

var utilRequire = require('toolbox-utilities').utilRequire,
    MyBase = utilRequire('lib/my-base');

module.exports = MyBase.extend({
    initialize: function (options) {
        if (_.isFunction(this.initialize)) {
            this.initialize.apply(this, arguments);
        }
    }
}, {
    method: function () {

    }
}, {
    // N other objects you need to extend your module
});
```

## Factory

```
'use strict';

var Factory = require('toolbox-utilities').Factory;

module.exports = Factory(function (name) {
    return 'lib/my/path/' + name;
});

```

And then use it like:

```
var Modules = utilRequire('lib/modules');

Modules('path/to/module').create({ foo: 'bar' })
```
