let zenscroll = require('zenscroll')
window.zenscroll = zenscroll

export default class Scroller {
    constructor(el, settings={}) {
        this.el = el

        this.settings = settings
        this.scroll(0);
    }


    set settings( setts ) {
        this._settings = {
            page_size:  setts.page_size || this.el.clientHeight,
            maxHeight:  this.el.offsetHeight,
            dur:        setts.duration || 785,
            interval:   setts.interval || 3,
            dir:        (setts.direction == 'vertical' && 'Top' || 'Left' ),
            
            set: (prop_name, v) => {
                this._settings[prop_name] = v
            } 
        }
    }
    

    cycle(){
        let next_window = zenscroll.getY() + this.settings.page_size;
        this.scroll( next_window )
    }

    scroll(x) {
        console.log("Scroller:scroll", this.settings)
        zenscroll.toY(x, this.settings.dur, this.update.bind(this) )
    }

    update(){
        this.pct = zenscroll.getY() / this.settings.maxHeight 
    }

    start(){
        this._int_handler = setInterval( this.cycle.bind(this), this.settings.interval * 1000 )
    }
    stop(){
        clearInterval( this._int_handler)
        this._int_handler = undefined
    }
    toggle(){
        if(this._int_handler != undefined){ this.stop(); }
        else { this.start(); }
    }


}