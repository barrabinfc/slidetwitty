function apply_to( obj, prop_name ) {
    return (x) => {
        obj[prop_name] = x
    } 
}
var defaultSettings = require('./Settings')
window.settings = defaultSettings



function gui_setup(){
    console.error('fuck it')
    
    window.gui = new dat.GUI()
    window.gui.useLocalStorage = true
    window.gui.params = window.settings

    let gui = window.gui
    gui.remember( window.settings );
    
    var props = ['page_size','interval','offset', 'restart'];
    props.map( (prop) => {
        gui.add(window.settings, prop).onChange( (v) => {
            console.log('gui.set', prop, v)
            window.docScroller.settings.set(prop, v)            
        })
    })

    /*
    var c = gui.add(window.settings, 'page_size')
    c.onChange(console.log)
    gui.add(window.settings, 'interval').min(0).max( 60 ).listen()
    gui.add(window.settings, 'offset').max(100).listen()
    gui.add(window.settings, 'restart')
    */

}


window.addEventListener('DOMContentLoaded', gui_setup )