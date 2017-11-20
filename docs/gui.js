(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.radiolarian = {})));
}(this, (function (exports) { 'use strict';

var AppSettings = function AppSettings() {
    this.enabled = true;
    this.interval = 5;
    this.user_id = 'zero_likes';
    this.page_size = 650.0, this.offset = 0, this.restart = function () {
        destroy();
        setTimeout(setup, 200);
    };
};

var params = new AppSettings();

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

window.settings = params;

var f = require('kambo-functional');

// target[prop] = src[prop]
function gui_link(src, prop) {
    this.to = function (obj_target) {
        return function (v) {
            obj_target.set(prop, v);
        };
    };
    return this;
}

function gui_setup() {

    if (!window.gui) {
        window.gui = new dat.GUI();
        window.gui.useLocalStorage = true;
    }

    console.group('GUI Init...');
    var gui = window.gui;
    gui.remember(window.settings);
    console.info('Remebering GUI Presets... OK');

    /* 
     * Connecting UI to tgt
     */
    var src = window.settings;
    var tgt = window.docScroller.settings;

    var props = { 'enabled': true,
        'page_size': 10,
        'interval': 10,
        'offset': 0,
        'restart': '' };

    var controls = f.toPairs(props).map(function (_ref, idx) {
        var _ref2 = slicedToArray(_ref, 2),
            prop_name = _ref2[0],
            v = _ref2[1];

        var gui_widget = gui.add(src, prop_name);
        gui_widget.onChange(new gui_link(src, prop_name).to(tgt));
        return gui_widget;
    });

    console.groupEnd('GUI Init...');
    /*
    var c = gui.add(window.settings, 'page_size')
    c.onChange(console.log)
    gui.add(window.settings, 'interval').min(0).max( 60 ).listen()
    gui.add(window.settings, 'offset').max(100).listen()
    gui.add(window.settings, 'restart')
    */
}

exports.gui_setup = gui_setup;

Object.defineProperty(exports, '__esModule', { value: true });

})));
