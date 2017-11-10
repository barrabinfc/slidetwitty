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

window.settings = defaultSettings

// Alias and declarations
window.setup = function() {
    console.group('App setup...')

    /* 
     * Create scroller
     */
    this.docScroller = new Scroller(document.body);
    this.docScroller.onEnd = () => {
        console.log("Arrived at end!")
        return 0; //window.settings.offset
    }

    console.log( this.docScroller != undefined 
                 ? 'Creating scroller...OK' 
                 : 'Creating scroller...FAILED')


    /* Setup GUI */
    gui_setup()

    console.groupEnd('App setup...')    
    start()
    console.log("App Start...OK")
}

window.start = function(){
    /* Start */
    docScroller.settings = window.settings
    docScroller.start();
    zenscroll.toY(window.settings.offset);
}

window.destroy = function(){
    docScroller.stop()
    docScroller = undefined;

    window.gui.destroy()
}

document.addEventListener('keypress', function (k) {
    /*
    if (k.key == "Enter") {
        window.gui.domElement.classList.toggle('transparent');
    }
    */
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
            setup.call(window)            
        })
    })        
}
document.addEventListener('DOMContentLoaded', ignite);

