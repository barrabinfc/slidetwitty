var f = require('kambo-functional');
var dom = require('kambo-dom');
var zenscroll = require('zenscroll');

import { DEFAULT_POLYFILLS, applyPolyfills } from 'kambo-polyfills'

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
import Scroller from './Scroller'

function setup() {
    var docScroller = new Scroller(document.body, { 
        page_size: gui.params.window_size,
        interval: gui.params.interval
    });
    
    docScroller.start();
    setTimeout(function () {
        zenscroll.toY(70);
    }, 1000);
}

document.addEventListener('keypress', function (k) {
    if (k.key == "Enter") {
        gui.domElement.classList.toggle('transparent');
    }
});
document.addEventListener('DOMContentLoaded', setup);
