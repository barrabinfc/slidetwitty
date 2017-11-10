(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.app = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
window.settings = params;

// Alias and declarations
window.setup = function () {
    console.group('App setup...');

    /* 
     * Create scroller
     */
    this.docScroller = new Scroller(document.body);
    this.docScroller.onEnd = function () {
        console.log("Arrived at end!");
        return 0; //window.settings.offset
    };

    console.log(this.docScroller != undefined ? 'Creating scroller...OK' : 'Creating scroller...FAILED');

    /* Setup GUI */
    gui_setup();

    console.groupEnd('App setup...');
    start();
    console.log("App Start...OK");
};

window.start = function () {
    /* Start */
    docScroller.settings = window.settings;
    docScroller.start();
    zenscroll.toY(window.settings.offset);
};

window.destroy = function () {
    docScroller.stop();
    docScroller = undefined;

    window.gui.destroy();
};

document.addEventListener('keypress', function (k) {
    /*
    if (k.key == "Enter") {
        window.gui.domElement.classList.toggle('transparent');
    }
    */
});

function ignite() {
    twttr.ready(function (twttr) {
        var _timelineHTML = '<a class="twitter-timeline" \n        data-chrome="noheader nofooter noborders"\n        href="https://twitter.com/zero_likes"></a>';
        dom.$('#slideshow').innerHTML = _timelineHTML;
        twttr.widgets.load();

        twttr.events.bind('loaded', function () {
            console.log('Twitter ready... OK');
            setup.call(window);
        });
    });
}
document.addEventListener('DOMContentLoaded', ignite);

})));

},{"kambo-dom":2,"kambo-functional":4,"zenscroll":5}],2:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.kambo = global.kambo || {})));
}(this, (function (exports) { 'use strict';

/**
 * DOM Utilities for browsers
 * @module kambo-dom
 */
var _ = require('kambo-functional');

/** 
 *  2017 made nodeList iterable by default. Finally!
 *  We still want a functor with map, forEach.
 */
function toFunctor( nodeList ) {
  return _.toArray( nodeList );
}


/**
 * Get a single DOM element
 * @param  {String|HTMLElement} el
 * @return {HTMLElement|null} 
 */
function getDOMElement( el ) {
  if ( _.isType( el, HTMLElement) ||
       _.isType( el, HTMLDocument)) { return el }
  else if(       _.isType( el, String) ){ return document.querySelector(el) }
  
  return undefined
}

/**
 * Get matched elements identified by CSS Selector `selector`.
 * @param {String} selector A CSS Selector (eg: `.button`)
 * @param {HTMLElement|String} container Filter `selector` with parent of `container`
 * @return {Array(HTMLElement)|HTMLElement | undefined}
 */
function $( selector, containerSel=document ){
  var container = getDOMElement( containerSel );
  if(! container) throw new Error(`$: No container "${containerSel}" `)
  
  var els = [];
  if( _.isType(selector, String))
    els = container.querySelectorAll( selector );
  else if( _.isType(selector, Array))
    els = selector.map( s => $(s, container) );
  
  return ( _.isType(els, NodeList)
          ? (els.length == 0 ? undefined :
              (els.length == 1 ? els[0] : toFunctor(els) ))
          :  els )
}

exports.getDOMElement = getDOMElement;
exports.$ = $;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"kambo-functional":3}],3:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.kambo = global.kambo || {})));
}(this, (function (exports) { 'use strict';

/**
 * Functional Utilities for javascript. Sane functors and type helpers 
 * @module kambo-functional
 */

/**
 * check if `v` is of the type `t`
 * @param {Any} v
 * @param {Constructor} t
 * @return {Boolean}
 * @example 
 *   isType( x, Number )
 *   isType( a, Object )
 *   isType( c, Animal ) 
 */
function isType( v , t ) {
  return (v !== null && v.constructor === t || v instanceof t);
}

/**
 * converts `obj` into an array of pairs [key, value] 
 * @param  {Object} obj [description]
 * @return {Array}      Array of [key,value], ... 
 */
function toPairs( obj ) {
  let asPairs = [];
  for( var key in obj ) {
    var pair = [key, obj[key]];
    asPairs.push( pair ); 
  }
  return asPairs
}

/**
 * converts Array of pairs to an Object
 * @param  {Array} array of [key, value] , ...
 * @return {Object}
 */
function fromPairs( arrayPairs ) {
  let obj = {};
  for (var i = 0; i < arrayPairs.length; i++) {
    var [key,value] = arrayPairs[i];
    obj[key] = value;
  }
  return obj
}



/**
 * Converts `p` to a true array, that can be mapped/reduced.
 * @param  {*} p 
 * @return {Array}
 */
function toArray( p ) {
  if( isType( p, Number) || 
      isType( p, Boolean) ) return [p]
  if( isType( p, NodeList) ) return [].slice.call( p )
  if( isType( p , Object) ) return toPairs( p )
  
  return [...p] 
}


/**
 * Clone object
 * @param  {Object} object to be cloned
 * @return {Object} 
 */
const clone = obj => Object.assign({}, obj);

/**
 * Merge A and B key/values into a new object
 * @param  {Object} A 
 * @param  {Object} B 
 * @return {Object} Merged object
 */
const merge = (obj, ...src) => Object.assign({}, obj, ...src);

/**
 * Does `prop` is in Array `arr` ? 
 * @param  {Array} arr
 * @param  {Any} element
 * @return {Boolean}
 */
const includes = (arr, element) => (arr.indexOf(element) !== -1);

/**
 * Return 'prop' for every item in `arr` 
 * @param  {Array} arr  
 * @param  {String} prop Property address (may be deep, ex: anakin.parent)
 * @return {Array}
 */
const pluck = (arr, prop) => arr.map(c => getit(c, prop));

/** Does key exist in `obj` ? 
 */
const hasKey = (obj, key) => key in obj;

/**
 * Get `key` from `obj`
 * @param  {Object} obj 
 * @param  {String} key Address to retrieve, that can be deep (ex: children.someprop.otherProp)
 * @return {Any|undefined}        Property value or undefined if not found.
 */
const getit = (obj, key) => key.split('.').reduce((nestedObject, key) => {
  if (nestedObject && key in nestedObject) {
    return nestedObject[key]
  }
  return undefined
}, obj);

/**
 * return `val` or `fallback`, if `val` is true 
 * @param  {[type]} val      [description]
 * @param  {[type]} fallback [description]
 * @return {[type]}          [description]
 */
const either = (val, fallback) => ((val === undefined || !val) ? fallback : val);


/**
 *  Composition two or more functions
 * @param  {Function} functions 
 * @return {Function}           
 */
// let randomRange = (start,end) => Math.round( start + Math.random()*(end-start)) )
const pipe = functions => data => functions.reduce(
    (value, func) => func(value),
    data
  );
  
  
  /**
   * Caches results of `fn`
   */
  const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) 
      return cache[n];
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
};

exports.isType = isType;
exports.toPairs = toPairs;
exports.fromPairs = fromPairs;
exports.toArray = toArray;
exports.clone = clone;
exports.merge = merge;
exports.includes = includes;
exports.pluck = pluck;
exports.hasKey = hasKey;
exports.getit = getit;
exports.either = either;
exports.pipe = pipe;
exports.memoize = memoize;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],4:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['kambo-functional'] = global['kambo-functional'] || {})));
}(this, (function (exports) { 'use strict';

/**
 * Functional Utilities for javascript. Sane functors and type helpers 
 * @module kambo-functional
 */

const identity = _ => (_);
const not = _ => (! _);

const Type   = (v) => (v.constructor);


/**
 * check if `v` is of the type `t`
 * @param {Any} v
 * @param {Constructor} t
 * @return {Boolean}
 * @example 
 *   isType( x, Number )
 *   isType( a, Object )
 *   isType( c, Animal ) 
 */
const isType = ( v , t ) => (v !== null && v.constructor === t || v instanceof t);

/**
 * converts `obj` into an array of pairs [key, value] 
 * @param  {Object} obj [description]
 * @return {Array}      Array of [key,value], ... 
 */
function toPairs( obj ) {
  let asPairs = [];
  for( var key in obj ) {
    var pair = [key, obj[key]];
    asPairs.push( pair ); 
  }
  return asPairs
}

/**
 * converts Array of pairs to an Object
 * @param  {Array} array of [key, value] , ...
 * @return {Object}
 */
function fromPairs( arrayPairs ) {
  let obj = {};
  for (var i = 0; i < arrayPairs.length; i++) {
    var [key,value] = arrayPairs[i];
    obj[key] = value;
  }
  return obj
}



/**
 * Converts `p` to a true array, that can be mapped/reduced.
 * @param  {*} p 
 * @return {Array}
 */
function toArray( p ) {
  if( isType( p, Number) || 
      isType( p, Boolean) ) return [p]
  if( isType( p, NodeList) ) return [].slice.call( p )
  if( isType( p , Object) ) return toPairs( p )
  
  return [...p] 
}


/**
 * Clone object
 * @param  {Object} object to be cloned
 * @return {Object} 
 */
const clone = obj => Object.assign({}, obj);

/**
 * Merge A and B key/values into a new object
 * @param  {Object} A 
 * @param  {Object} B 
 * @return {Object} Merged object
 */
const merge = (obj, ...src) => Object.assign({}, obj, ...src);

/**
 * Does `prop` is in Array `arr` ? 
 * @param  {Array} arr
 * @param  {Any} element
 * @return {Boolean}
 */
const includes = (arr, element) => (arr.indexOf(element) !== -1);
let any   = (element, ...opts) => (includes(opts,element));


/*
 * Apply pattern matching single arity
 *
 */
const arity = (fn , [arity, arityFn]=[0, identity] ) => (...args) => {
  let arity_args = args.slice(0,arity);
  return ( args.length == arity ? arityFn(...arity_args)
                                : fn(...args))
};

/*
 * Example of arity usage 
 
any = arity( any,
          [2, 
              (element, opts) => {
                  return (isType(opts, Array) 
                          ? includes(opts, element)
                          : includes([opts], element))
              } ])
console.log( 'Any arity', any('a', 'a','b','c','d','e') )
console.log( 'TWo arity', any('d', ['Hello','c','a','d'])) 
*/

/**
 * Return 'prop' for every item in `arr` 
 * @param  {Array} arr  
 * @param  {String} prop Property address (may be deep, ex: anakin.parent)
 * @return {Array}
 */
const pluck = (arr, prop) => arr.map(c => getit(c, prop));

/** Does key exist in `obj` ? 
 */
const hasKey = (obj, key) => key in obj;

/**
 * Get `key` from `obj`
 * @param  {Object} obj 
 * @param  {String} key Address to retrieve, that can be deep (ex: children.someprop.otherProp)
 * @return {Any|undefined}        Property value or undefined if not found.
 */
const getit = (obj, key) => key.split('.').reduce((nestedObject, key) => {
  if (nestedObject && key in nestedObject) {
    return nestedObject[key]
  }
  return undefined
}, obj);

/**
 * return `val` or `fallback`, if `val` is true 
 * @param  {[type]} val      [description]
 * @param  {[type]} fallback [description]
 * @return {[type]}          [description]
 */
const either = (val, fallback) => ((val === undefined || !val) ? fallback : val);


/**
 *  pipe two or more functions
 * @param  {Function} functions 
 * @return {Function}           
 */
// let randomRange = (start,end) => Math.round( start + Math.random()*(end-start)) )
const pipe = functions => data => functions.reduce(
    (value, func) => func(value),
    data
);

/* Zip two arrays in a object
 * zip( ['a','b'],[10,20] ) => {a: 10, b: 20} 
 */
const zip = (a,b) => {
  let ß = {};
  a.map( (prop,i) => {
    ß[prop] = b[i];
  });
  return ß
};
  
/**
 * Caches results of `fn`
 */
const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) 
      return cache[n];
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
};


/*
  * Retry N times decorator
  * 
  * new Retry( 3, openFile ).waitFor(1000).do('config.json')
  *         .then( (config) => proceed )
  *         .catch( abort )
  * 
  * function proceed(){}
  * function abort(){}
  */
function Retry( n , lambda ) {

  this._waitInterval = 800;
  this._n = n-1;

  this.waitFor = ( interval ) => {
    this._waitInterval = interval;
    return this
  };

  /* Special retry promise.
    * Try to call lambda at least N times, waiting 1s between each try
    *
    * if success, resolve
    * if fail,  reject
    */
  this.retry_promise = (...args) => (resolve, reject) => {
    
    /* Resolve if no exception */
    var r = this.plz_try(...args);
    
    if( r !== null && !( r instanceof Error )) { resolve(r);
    } else {
      /* Retry N times */
      if(this._n == 0) {
        reject(r);
      }
      else {
        this._n = this._n - 1;
        window.setTimeout( this.retry_promise(...args), this._waitInterval,
                           ...[resolve,reject] );
      }
    }
  };

  this.do = (...args) => {
    return new Promise( this.retry_promise(...args) )
  };

  this.plz_try = ( ...args ) => {
    try {
      return lambda(...args)
    } catch (err) {
      return err
    }
  };
}

exports.identity = identity;
exports.not = not;
exports.Type = Type;
exports.isType = isType;
exports.toPairs = toPairs;
exports.fromPairs = fromPairs;
exports.toArray = toArray;
exports.clone = clone;
exports.merge = merge;
exports.includes = includes;
exports.any = any;
exports.arity = arity;
exports.pluck = pluck;
exports.hasKey = hasKey;
exports.getit = getit;
exports.either = either;
exports.pipe = pipe;
exports.zip = zip;
exports.memoize = memoize;
exports.Retry = Retry;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],5:[function(require,module,exports){
/**
 * Zenscroll 4.0.0
 * https://github.com/zengabor/zenscroll/
 *
 * Copyright 2015–2017 Gabor Lenard
 *
 * This is free and unencumbered software released into the public domain.
 * 
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 * 
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * For more information, please refer to <http://unlicense.org>
 * 
 */

/*jshint devel:true, asi:true */

/*global define, module */


(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory())
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory()
	} else {
		(function install() {
			// To make sure Zenscroll can be referenced from the header, before `body` is available
			if (document && document.body) {
				root.zenscroll = factory()
			} else {
				// retry 9ms later
				setTimeout(install, 9)
			}
		})()
	}
}(this, function () {
	"use strict"


	// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
	var isNativeSmoothScrollEnabledOn = function (elem) {
		return ("getComputedStyle" in window) &&
			window.getComputedStyle(elem)["scroll-behavior"] === "smooth"
	}


	// Exit if it’s not a browser environment:
	if (typeof window === "undefined" || !("document" in window)) {
		return {}
	}


	var makeScroller = function (container, defaultDuration, edgeOffset) {

		// Use defaults if not provided
		defaultDuration = defaultDuration || 999 //ms
		if (!edgeOffset && edgeOffset !== 0) {
			// When scrolling, this amount of distance is kept from the edges of the container:
			edgeOffset = 9 //px
		}

		// Handling the life-cycle of the scroller
		var scrollTimeoutId
		var setScrollTimeoutId = function (newValue) {
			scrollTimeoutId = newValue
		}

		/**
		 * Stop the current smooth scroll operation immediately
		 */
		var stopScroll = function () {
			clearTimeout(scrollTimeoutId)
			setScrollTimeoutId(0)
		}

		var getTopWithEdgeOffset = function (elem) {
			return Math.max(0, container.getTopOf(elem) - edgeOffset)
		}

		/**
		 * Scrolls to a specific vertical position in the document.
		 *
		 * @param {targetY} The vertical position within the document.
		 * @param {duration} Optionally the duration of the scroll operation.
		 *        If not provided the default duration is used.
		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
		 */
		var scrollToY = function (targetY, duration, onDone) {
			stopScroll()
			if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
				container.toY(targetY)
				if (onDone) {
					onDone()
				}
			} else {
				var startY = container.getY()
				var distance = Math.max(0, targetY) - startY
				var startTime = new Date().getTime()
				duration = duration || Math.min(Math.abs(distance), defaultDuration);
				(function loopScroll() {
					setScrollTimeoutId(setTimeout(function () {
						// Calculate percentage:
						var p = Math.min(1, (new Date().getTime() - startTime) / duration)
						// Calculate the absolute vertical position:
						var y = Math.max(0, Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)))
						container.toY(y)
						if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
							loopScroll()
						} else {
							setTimeout(stopScroll, 99) // with cooldown time
							if (onDone) {
								onDone()
							}
						}
					}, 9))
				})()
			}
		}

		/**
		 * Scrolls to the top of a specific element.
		 *
		 * @param {elem} The element to scroll to.
		 * @param {duration} Optionally the duration of the scroll operation.
		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
		 */
		var scrollToElem = function (elem, duration, onDone) {
			scrollToY(getTopWithEdgeOffset(elem), duration, onDone)
		}

		/**
		 * Scrolls an element into view if necessary.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
		 */
		var scrollIntoView = function (elem, duration, onDone) {
			var elemHeight = elem.getBoundingClientRect().height
			var elemBottom = container.getTopOf(elem) + elemHeight
			var containerHeight = container.getHeight()
			var y = container.getY()
			var containerBottom = y + containerHeight
			if (getTopWithEdgeOffset(elem) < y || (elemHeight + edgeOffset) > containerHeight) {
				// Element is clipped at top or is higher than screen.
				scrollToElem(elem, duration, onDone)
			} else if ((elemBottom + edgeOffset) > containerBottom) {
				// Element is clipped at the bottom.
				scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone)
			} else if (onDone) {
				onDone()
			}
		}

		/**
		 * Scrolls to the center of an element.
		 *
		 * @param {elem} The element.
		 * @param {duration} Optionally the duration of the scroll operation.
		 * @param {offset} Optionally the offset of the top of the element from the center of the screen.
		 * @param {onDone} An optional callback function to be invoked once the scroll finished.
		 */
		var scrollToCenterOf = function (elem, duration, offset, onDone) {
			scrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight()/2 + (offset || elem.getBoundingClientRect().height/2)), duration, onDone)
		}

		/**
		 * Changes default settings for this scroller.
		 *
		 * @param {newDefaultDuration} Optionally a new value for default duration, used for each scroll method by default.
		 *        Ignored if null or undefined.
		 * @param {newEdgeOffset} Optionally a new value for the edge offset, used by each scroll method by default. Ignored if null or undefined.
		 * @returns An object with the current values.
		 */
		var setup = function (newDefaultDuration, newEdgeOffset) {
			if (newDefaultDuration === 0 || newDefaultDuration) {
				defaultDuration = newDefaultDuration
			}
			if (newEdgeOffset === 0 || newEdgeOffset) {
				edgeOffset = newEdgeOffset
			}
			return {
				defaultDuration: defaultDuration,
				edgeOffset: edgeOffset
			}
		}

		return {
			setup: setup,
			to: scrollToElem,
			toY: scrollToY,
			intoView: scrollIntoView,
			center: scrollToCenterOf,
			stop: stopScroll,
			moving: function () { return !!scrollTimeoutId },
			getY: container.getY,
			getTopOf: container.getTopOf
		}

	}


	var docElem = document.documentElement
	var getDocY = function () { return window.scrollY || docElem.scrollTop }

	// Create a scroller for the document:
	var zenscroll = makeScroller({
		body: document.scrollingElement || document.body,
		toY: function (y) { window.scrollTo(0, y) },
		getY: getDocY,
		getHeight: function () { return window.innerHeight || docElem.clientHeight },
		getTopOf: function (elem) { return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop }
	})


	/**
	 * Creates a scroller from the provided container element (e.g., a DIV)
	 *
	 * @param {scrollContainer} The vertical position within the document.
	 * @param {defaultDuration} Optionally a value for default duration, used for each scroll method by default.
	 *        Ignored if 0 or null or undefined.
	 * @param {edgeOffset} Optionally a value for the edge offset, used by each scroll method by default. 
	 *        Ignored if null or undefined.
	 * @returns A scroller object, similar to `zenscroll` but controlling the provided element.
	 */
	zenscroll.createScroller = function (scrollContainer, defaultDuration, edgeOffset) {
		return makeScroller({
			body: scrollContainer,
			toY: function (y) { scrollContainer.scrollTop = y },
			getY: function () { return scrollContainer.scrollTop },
			getHeight: function () { return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight) },
			getTopOf: function (elem) { return elem.offsetTop }
		}, defaultDuration, edgeOffset)
	}


	// Automatic link-smoothing on achors
	// Exclude IE8- or when native is enabled or Zenscroll auto- is disabled
	if ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {


		var isScrollRestorationSupported = "scrollRestoration" in history

		// On first load & refresh make sure the browser restores the position first
		if (isScrollRestorationSupported) {
			history.scrollRestoration = "auto"
		}

		window.addEventListener("load", function () {

			if (isScrollRestorationSupported) {
				// Set it to manual
				setTimeout(function () { history.scrollRestoration = "manual" }, 9)
				window.addEventListener("popstate", function (event) {
					if (event.state && "zenscrollY" in event.state) {
						zenscroll.toY(event.state.zenscrollY)
					}
				}, false)
			}

			// Add edge offset on first load if necessary
			// This may not work on IE (or older computer?) as it requires more timeout, around 100 ms
			if (window.location.hash) {
				setTimeout(function () {
					// Adjustment is only needed if there is an edge offset:
					var edgeOffset = zenscroll.setup().edgeOffset
					if (edgeOffset) {
						var targetElem = document.getElementById(window.location.href.split("#")[1])
						if (targetElem) {
							var targetY = Math.max(0, zenscroll.getTopOf(targetElem) - edgeOffset)
							var diff = zenscroll.getY() - targetY
							// Only do the adjustment if the browser is very close to the element:
							if (0 <= diff && diff < 9 ) {
								window.scrollTo(0, targetY)
							}
						}
					}
				}, 9)
			}

		}, false)

		// Handling clicks on anchors
		var RE_noZensmooth = new RegExp("(^|\\s)noZensmooth(\\s|$)")
		window.addEventListener("click", function (event) {
			var anchor = event.target
			while (anchor && anchor.tagName !== "A") {
				anchor = anchor.parentNode
			}
			// Let the browser handle the click if it wasn't with the primary button, or with some modifier keys:
			if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
				return
			}
			// Save the current scrolling position so it can be used for scroll restoration:
			if (isScrollRestorationSupported) {
				try {
					history.replaceState({ zenscrollY: zenscroll.getY() }, "")
				} catch (e) {
					// Avoid the Chrome Security exception on file protocol, e.g., file://index.html
				}
			}
			// Find the referenced ID:
			var href = anchor.getAttribute("href") || ""
			if (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {
				var targetY = 0
				var targetElem = document.getElementById(href.substring(1))
				if (href !== "#") {
					if (!targetElem) {
						// Let the browser handle the click if the target ID is not found.
						return
					}
					targetY = zenscroll.getTopOf(targetElem)
				}
				event.preventDefault()
				// By default trigger the browser's `hashchange` event...
				var onDone = function () { window.location = href }
				// ...unless there is an edge offset specified
				var edgeOffset = zenscroll.setup().edgeOffset
				if (edgeOffset) {
					targetY = Math.max(0, targetY - edgeOffset)
					onDone = function () { history.pushState(null, "", href) }
				}
				zenscroll.toY(targetY, null, onDone)
			}
		}, false)

	}


	return zenscroll


}));

},{}]},{},[1])(1)
});