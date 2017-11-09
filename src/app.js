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

/*
function InstallSpy( obj , spy_contact ) {
    return new Proxy( obj, {
        get: (target, name) => {
            return target[name]
        },
        set: (target, name, value) => {
            console.log("Woahh")
            target[name] = value
            spy_contact[name] = value
            return value
        }
    })
}
*/

// Alias and declarations
window.setup = function() {
    window.docScroller = new Scroller(document.body );
    let docScroller = window.docScroller;


    docScroller.start();
    setTimeout(function () {
        zenscroll.toY(70);
    }, 1000);

    /*
     * Connect docScroller to gui 
    toPairs( window.settings ).map( ([prop, value]) => {
        grampearProperty( window.settings[prop], docScroller )
    })
    */
    

    /*
    window.gui.__controllers.map( (a) => {
        let c_name = a.property
        a.onFinishChange = console.log
        a.__onChange = (x) => {
            console.log('called onChange')
            docScroller.set(c_name,x)
        }
    })
    */
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
window.addEventListener('load', setup);
