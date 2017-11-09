(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * Polyfills utilities. Generally they're a pain the ass, 
 * this make this task much easier. 
 * Only loads the necessary polyfills in each case.
 *
 * Every polyfill is loaded , exporting global variables.
 * At the end, the promise is called.
 * 
 * @module kambo-polyfills
 */

const fetch   = [ () => !!window.fetch,   'fetch.js' ];
const promise = [ () => !!window.Promise, 'es6-promise.min.js'];

const intobs  = [ () => !!window.IntersectionObserver,  'intersection-observer.js'];
const mutobs  = [ () => !!window.MutationObserver,      'mutationobserver.min.js'];

/* Web animations */
const webAnimation = [ () => !!('animate' in document.createElement('div')), 'web-animations-next-lite.min.js'];

/* web components */
const customElements = [ () => !!window.customElements,  'custom-elements.min.js'];
const htmlImport = [ () => (!!('import' in document.createElement('link'))), 'html-import.js' ];

const DEFAULT_POLYFILLS = [ fetch, promise, 
                                   intobs, mutobs , 
				   webAnimation,
                                   htmlImport, customElements ];

/**
 * Dynamically create and add to document a script.
 * Don't block the browser rendering. 
 * 
 * @param  {String} src Absolute URL of file
 * @param  {Boolean} inorder Load script in order ? 
 * @return {HTMLScriptElement} 
 */
function loadScript( src , in_order=true, cb, errorCb) {
  var script = document.createElement('script');
  script.src = src;
  script.onload = cb;
  script.onerror = errorCb;
  script.async = !in_order;
  document.head.appendChild(script);
  return script
}

function isSupported( detect ) {
  return ( detect instanceof Function ?  detect() : detect )
}

/**
 * Apply polyfills as necessary.
 * Iterate source, runs detect_fn() and load the corresponding file if false 
 * 
 * @param  {Array} source List of polyfills as [ detect_fn(), 'filename' ] 
 * @param  {String} prefix Absolute base path where polyfills are located. 
 * @param  {Boolean} in_order Should load files in order? Default is true
 * @return {Promise} Promise when all files are loaded.
 */
function applyPolyfills( source=DEFAULT_POLYFILLS , 
                                prefix=document.currentScript,
                                in_order=true) {
  
  // Always get a working prefix
  prefix = (!!prefix ? prefix : document.location.href() );
  
  var filesToLoad = source.filter( ([detect_fn, file]) => ! isSupported(detect_fn) )
                          .map( (poly) => poly[1] )
                          .map( (file) => prefix + file );
  
  var allPromises = filesToLoad.map( (url) => {
    var scr = new Promise((resolve, reject) => {
      loadScript( url, true , resolve, reject);
    });
  });
  
  return Promise.all( allPromises )
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























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

var zenscroll$1 = require('zenscroll');
window.zenscroll = zenscroll$1;

var Scroller = function () {
    function Scroller(el) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        classCallCheck(this, Scroller);

        this.el = el;

        this.settings = settings;
        this.scroll(0);
    }

    createClass(Scroller, [{
        key: 'cycle',
        value: function cycle() {
            if (!this.settings.enabled) return;

            var next_window = zenscroll$1.getY() + this.settings.page_size;

            if (next_window > this.settings.maxHeight) {
                next_window = this.onEnd;
            }

            this.scroll(next_window);
        }
    }, {
        key: 'scroll',
        value: function scroll(x) {
            zenscroll$1.toY(x, this.settings.dur, this.update.bind(this));
        }
    }, {
        key: 'update',
        value: function update() {
            this.pct = zenscroll$1.getY() / this.settings.maxHeight;
        }
    }, {
        key: 'start',
        value: function start() {
            this._int_handler = setInterval(this.cycle.bind(this), this.settings.interval * 1000);
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this._int_handler);
            this._int_handler = undefined;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this._int_handler != undefined) {
                this.stop();
            } else {
                this.start();
            }
        }
    }, {
        key: 'settings',
        get: function get$$1() {
            return this._settings;
        },
        set: function set$$1(setts) {
            var _this = this;

            this._settings = {
                enabled: true,
                page_size: setts.page_size || this.el.clientHeight,
                maxHeight: this.el.offsetHeight,
                dur: setts.duration || 785,
                interval: setts.interval || 3,
                dir: setts.direction == 'vertical' && 'Top' || 'Left',

                set: function set$$1(prop_name, v) {
                    _this._settings[prop_name] = v;
                }
            };
        }
    }, {
        key: 'onEnd',
        get: function get$$1() {
            return this._onend_cb();
        },
        set: function set$$1(cb) {
            this._onend_cb = cb;
        }
    }]);
    return Scroller;
}();

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

window.settings = params;

var f$1 = require('kambo-functional');

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

    var controls = f$1.toPairs(props).map(function (_ref, idx) {
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

var f = require('kambo-functional');
var dom = require('kambo-dom');
var zenscroll = require('zenscroll');

applyPolyfills(DEFAULT_POLYFILLS, 'node_modules/kambo-polyfills/polyfills/').then(function () {
    window.$ = dom.$;
    window.f = f;
}).catch(function () {
    console.error('Polyfills load failed');
});

/*
 * App code
 
import TwitLine from './TwitLine'
*/
// Alias and declarations
window.setup = function () {
    console.group('App setup...');

    /* 
     * Create scroller
     */
    window.docScroller = new Scroller(document.body);
    window.docScroller.onEnd = function () {
        console.log("Arrived at end!");
        return 0; //window.settings.offset
    };

    var docScroller = window.docScroller || undefined;
    console.log(docScroller != undefined ? 'Creating scroller...OK' : 'Creating scroller...FAILED');

    /* Start GUI */
    gui_setup();

    /* Start */
    setTimeout(function () {
        docScroller.start();
        zenscroll.toY(window.settings.offset);
    }, 10);

    console.groupEnd('App setup...');
};

window.destroy = function () {
    docScroller.stop();
    docScroller = undefined;

    window.gui.destroy();
};

document.addEventListener('keypress', function (k) {
    if (k.key == "Enter") {
        window.gui.domElement.classList.toggle('transparent');
    }
});

function ignite() {
    twttr.ready(function (twttr) {
        var _timelineHTML = '<a class="twitter-timeline" \n        data-chrome="noheader nofooter noborders"\n        href="https://twitter.com/zero_likes"></a>';
        dom.$('#slideshow').innerHTML = _timelineHTML;
        twttr.widgets.load();

        twttr.events.bind('loaded', function () {
            console.log('Twitter ready... OK');
            setup();
        });
    });
}
document.addEventListener('DOMContentLoaded', ignite);

})));
