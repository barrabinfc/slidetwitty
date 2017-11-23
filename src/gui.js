import defaultSettings from './Settings'
window.settings = defaultSettings

var f = require('kambo-functional');

// target[prop] = src[prop]
function gui_link( src , prop ) {
    this.to = (obj_target) => {
        return (v) => {
            obj_target.set(prop, v)            
        }
    }
    return this
}

export function gui_setup(){
    
    if(!window.gui){
        window.gui = new dat.GUI()
        window.gui.useLocalStorage = true
    }

    console.group('GUI Init...')    
    let gui = window.gui
    gui.remember( window.settings );
    console.info('Remebering GUI Presets... OK')

    /* 
     * Connecting UI to tgt
     */
    let src = window.settings
    let tgt = window.docScroller.settings

    let props = {'enabled': true,
                 'page_size': 10, 
                 'interval': 10,
                 'offset': 0,
                 'restart': ''};

    let controls = f.toPairs(props).map( ( [prop_name,v], idx ) => {
        let gui_widget = gui.add( src, prop_name )
        gui_widget.onChange( new gui_link(src, prop_name).to( tgt ) )
        return gui_widget
    })

    // Make it hidden
    setTimeout( () => {
        window.gui.domElement.classList.toggle('transparent');        
    }, 1000)

    console.groupEnd('GUI Init...')
    /*
    var c = gui.add(window.settings, 'page_size')
    c.onChange(console.log)
    gui.add(window.settings, 'interval').min(0).max( 60 ).listen()
    gui.add(window.settings, 'offset').max(100).listen()
    gui.add(window.settings, 'restart')
    */

}
