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
import { gui_setup } from './gui'

// Alias and declarations
window.setup = function() {
    console.group('App setup...')

    /* 
     * Create scroller
     */
    window.docScroller = new Scroller(document.body);
    window.docScroller.onEnd = () => {
        console.log("Arrived at end!")
        return 0; //window.settings.offset
    }

    let docScroller = window.docScroller || undefined;
    console.log( docScroller != undefined 
                 ? 'Creating scroller...OK' 
                 : 'Creating scroller...FAILED')

    /* Start GUI */
    gui_setup()
    

    /* Start */
    setTimeout(function () {
        docScroller.start();        
        zenscroll.toY(window.settings.offset);
    }, 10);

    console.groupEnd('App setup...')    
}

window.destroy = function(){
    docScroller.stop()
    docScroller = undefined;

    window.gui.destroy()
}

document.addEventListener('keypress', function (k) {
    if (k.key == "Enter") {
        window.gui.domElement.classList.toggle('transparent');
    }
});

function ignite( ){
        twttr.ready( (twttr) => {
        var msg = 'Twitter ready...'

        // Add twitter element
        let _timelineHTML = `<a class="twitter-timeline" 
        data-chrome="noheader nofooter noborders"
        href="https://twitter.com/zero_likes"></a>`
        dom.$('#slideshow').innerHTML = _timelineHTML
        twttr.widgets.load()

        twttr.events.bind('loaded', () => {
            console.log('Twitter ready... OK')
            setup()            
        })
    })        
}
document.addEventListener('DOMContentLoaded', ignite);

