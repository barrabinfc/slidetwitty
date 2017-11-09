(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mgui = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.radiolarian = factory());
}(this, (function () { 'use strict';

var AppSettings = function AppSettings() {
    this.interval = 5;
    this.user_id = 'zero_likes';
    this.page_size = 650.0, this.offset = 0, this.restart = function () {
        destroy();
        setup();
    };
};

var params = new AppSettings();


var Settings = Object.freeze({
	default: params
});

var defaultSettings = ( Settings && params ) || Settings;

window.settings = defaultSettings;

function gui_link(src, prop) {
    this.to = function (obj_target) {
        return function (v) {
            obj_target.set(prop, v);
        };
    };
    return this;
}

function gui_setup() {

    window.gui = new dat.GUI();
    window.gui.useLocalStorage = true;
    window.gui.params = window.settings;
    console.group('GUI Init...');

    var gui = window.gui;
    gui.remember(window.settings);
    console.info('Remebering GUI Presets... OK');

    var props = ['page_size', 'interval', 'offset', 'restart'];
    var err_c = false;

    try {
        props.map(function (prop) {
            var control = gui.add(window.settings, prop);
            control.onChange(new gui_link(window.settings, prop).to(window.docScroller.settings));
            return control;
        });
        window.docScroller.settings = window.settings;
    } catch (err) {
        err_c = true;
    }

    console.info(err_c ? 'Connecting GUI controllers... FAILED' : 'Connecting GUI controllers... OK');
    console.groupEnd('GUI Init...');

    /*
    var c = gui.add(window.settings, 'page_size')
    c.onChange(console.log)
    gui.add(window.settings, 'interval').min(0).max( 60 ).listen()
    gui.add(window.settings, 'offset').max(100).listen()
    gui.add(window.settings, 'restart')
    */
}

window.addEventListener('load', gui_setup);

var gui = {};

return gui;

})));

},{}]},{},[1])(1)
});