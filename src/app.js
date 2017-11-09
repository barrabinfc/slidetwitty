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
import defaultSettings from './Settings'


// Alias and declarations
window.setup = function() {
    console.group('App setup...')

    window.docScroller = new Scroller(document.body );
    let docScroller = window.docScroller || undefined;

    console.log( docScroller != undefined 
                 ? 'Creating scroller...OK' 
                 : 'Creating scroller...FAILED')

    docScroller.start();
    setTimeout(function () {
        zenscroll.toY(window.settings.offset);
    }, 1000);

    console.groupEnd('App setup...')
}

window.destroy = function(){
    docScroller.stop()
    docScroller = undefined;
}

document.addEventListener('keypress', function (k) {
    if (k.key == "Enter") {
        window.gui.domElement.classList.toggle('transparent');
    }
});
document.addEventListener('DOMContentLoaded', setup);
