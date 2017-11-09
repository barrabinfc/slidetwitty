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

function gui_setup() {
    console.error('fuck it');

    window.gui = new dat.GUI();
    window.gui.useLocalStorage = true;
    window.gui.params = window.settings;

    var gui = window.gui;
    gui.remember(window.settings);

    var props = ['page_size', 'interval', 'offset', 'restart'];
    props.map(function (prop) {
        gui.add(window.settings, prop).onChange(function (v) {
            console.log('gui.set', prop, v);
            window.docScroller.settings.set(prop, v);
        });
    });

    /*
    var c = gui.add(window.settings, 'page_size')
    c.onChange(console.log)
    gui.add(window.settings, 'interval').min(0).max( 60 ).listen()
    gui.add(window.settings, 'offset').max(100).listen()
    gui.add(window.settings, 'restart')
    */
}

window.addEventListener('DOMContentLoaded', gui_setup);

var gui = {};

return gui;

})));

},{}]},{},[1])(1)
});