let zenscroll = require('zenscroll')
window.zenscroll = zenscroll

export default class Scroller {
    constructor(el, settings={page_size: undefined, 
                              interval: 12.5, 
                              direction: 'vertical',
                              offset: 0,
                              duration: 785}) {
        this.el = el
        
        this.page_size       = settings.page_size || el.clientHeight
        this.maxHeight       = el.offsetHeight
        
        this.dur = settings.duration || 785
        this.interval = settings.interval || 3
        this.dir = (settings.direction == 'vertical' && 'Top' || 'Left' )

        this.scroll(0);
    }

    cycle(){
        let next_window = zenscroll.getY() + this.page_size;
        this.scroll( next_window )
    }

    scroll(x) {
        console.log("Scroller:scroll", x)
        zenscroll.toY(x, this.dur, this.update.bind(this) )
    }

    update(){
        this.pct = zenscroll.getY() / this.maxHeight 
    }

    start(){
        this._int_handler = setInterval( this.cycle.bind(this), this.interval * 1000 )
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