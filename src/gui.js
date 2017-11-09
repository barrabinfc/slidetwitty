var defaultSettings = require('./Settings')
window.settings = defaultSettings


function gui_link( src , prop ) {
    this.to = (obj_target) => {
        return (v) => {
            obj_target.set(prop, v)            
        }
    }
    return this
}


function gui_setup(){
    
    window.gui = new dat.GUI()
    window.gui.useLocalStorage = true
    window.gui.params = window.settings
    console.group('GUI Init...')
    
    let gui = window.gui
    gui.remember( window.settings );
    console.info('Remebering GUI Presets... OK')
    
    let props = ['page_size','interval','offset', 'restart'];
    let err_c = false;

    try {
        props.map( (prop) => {
            let control = gui.add(window.settings, prop)
            control.onChange( new gui_link(window.settings,prop)
                                .to(window.docScroller.settings) )
            return control
        })
        window.docScroller.settings = window.settings;

    } catch (err) {
        err_c = true
    }

    console.info( (err_c 
                    ? 'Connecting GUI controllers... FAILED'
                    : 'Connecting GUI controllers... OK'))
    console.groupEnd('GUI Init...')
    

    /*
    var c = gui.add(window.settings, 'page_size')
    c.onChange(console.log)
    gui.add(window.settings, 'interval').min(0).max( 60 ).listen()
    gui.add(window.settings, 'offset').max(100).listen()
    gui.add(window.settings, 'restart')
    */

}


window.addEventListener('load', gui_setup )